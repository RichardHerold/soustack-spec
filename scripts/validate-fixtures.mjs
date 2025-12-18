#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const ajv = new Ajv2020({ strict: false, allErrors: true, allowUnionTypes: true });
addFormats(ajv);

async function loadSchemas() {
  const schemaFiles = [];
  for (const dir of ['defs', 'stacks']) {
    const entries = await readdir(dir);
    for (const entry of entries) {
      if (entry.endsWith('.json')) schemaFiles.push(join(dir, entry));
    }
  }
  schemaFiles.push('soustack.schema.json');

  for (const file of schemaFiles) {
    const json = JSON.parse(await readFile(file, 'utf8'));
    ajv.addSchema(json, json.$id || file);
  }
}

async function walk(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (extname(full) === '.json') {
      files.push(full);
    }
  }
  return files;
}

function collectIngredients(ingredients = []) {
  const list = [];
  for (const item of ingredients) {
    if (item && typeof item === 'object' && Array.isArray(item.ingredients)) {
      list.push(...collectIngredients(item.ingredients));
    } else if (item && typeof item === 'object') {
      list.push(item);
    }
  }
  return list;
}

function collectSteps(instructions = []) {
  const steps = [];
  for (const entry of instructions) {
    if (entry && typeof entry === 'object' && Array.isArray(entry.steps)) {
      steps.push(...collectSteps(entry.steps));
    } else if (entry && typeof entry === 'object') {
      steps.push(entry);
    }
  }
  return steps;
}

function uniqueCheck(items, key, label) {
  const seen = new Set();
  for (const item of items) {
    if (!item[key]) continue;
    if (seen.has(item[key])) {
      return `${label} id duplicated: ${item[key]}`;
    }
    seen.add(item[key]);
  }
  return null;
}

function validateDAG(steps) {
  const graph = new Map();
  for (const step of steps) {
    graph.set(step.id, new Set(step.dependsOn || []));
  }
  for (const [id, deps] of graph.entries()) {
    for (const dep of deps) {
      if (!graph.has(dep)) {
        return `dependsOn references missing step: ${dep}`;
      }
    }
  }
  const visited = new Set();
  const stack = new Set();
  function dfs(node) {
    if (stack.has(node)) return `cycle detected at ${node}`;
    if (visited.has(node)) return null;
    stack.add(node);
    const deps = graph.get(node) || new Set();
    for (const dep of deps) {
      const res = dfs(dep);
      if (res) return res;
    }
    stack.delete(node);
    visited.add(node);
    return null;
  }
  for (const node of graph.keys()) {
    const res = dfs(node);
    if (res) return res;
  }
  return null;
}

function checkConformance(data, file) {
  const errors = [];
  const stacks = new Set(data.stacks || []);
  const ingredients = collectIngredients(data.ingredients);
  const steps = collectSteps(data.instructions);

  if (ingredients.length) {
    const dup = uniqueCheck(ingredients, 'id', 'ingredient');
    if (dup) errors.push(dup);
  }
  if (steps.length) {
    const dup = uniqueCheck(steps, 'id', 'step');
    if (dup) errors.push(dup);
  }

  if (stacks.has('structured') || stacks.has('timed') || stacks.has('referenced')) {
    const dagIssue = validateDAG(steps);
    if (dagIssue) errors.push(dagIssue);
  }

  if (stacks.has('referenced')) {
    const ids = new Set(ingredients.map((i) => i.id));
    for (const step of steps) {
      if (!Array.isArray(step.inputs) || step.inputs.length === 0) {
        errors.push('referenced step missing inputs');
        continue;
      }
      for (const input of step.inputs) {
        if (!ids.has(input)) errors.push(`referenced input missing ingredient id: ${input}`);
      }
    }
  }

  if (stacks.has('timed')) {
    for (const step of steps) {
      const duration = step?.timing?.duration;
      if (duration && typeof duration === 'object' && 'minMinutes' in duration && 'maxMinutes' in duration) {
        if (!(duration.minMinutes <= duration.maxMinutes)) {
          errors.push('timed duration minMinutes must be <= maxMinutes');
        }
      }
    }
  }

  if (stacks.has('compute')) {
    if (data.level !== 'base' || !stacks.has('quantified') || !stacks.has('timed')) {
      errors.push('compute stack requires base level with quantified and timed stacks');
    }
  }

  if (stacks.has('illustrated')) {
    const stepHasMedia = steps.some((s) => Array.isArray(s.images)?.length || Array.isArray(s.videos)?.length);
    const recipeHasMedia = (Array.isArray(data.images) && data.images.length > 0) ||
      (Array.isArray(data.videos) && data.videos.length > 0);
    if (!stepHasMedia && !recipeHasMedia) {
      errors.push('illustrated stack requires at least one media URI');
    }
  }

  if (stacks.has('dietary')) {
    if (!data.dietary) {
      errors.push('dietary block missing');
    } else {
      const { calories, macros, diets, allergens } = data.dietary;
      const hasSignal = (calories !== undefined) ||
        (macros && Object.keys(macros).length > 0) ||
        (Array.isArray(diets) && diets.length > 0) ||
        (Array.isArray(allergens) && allergens.length > 0);
      if (!hasSignal) errors.push('dietary stack requires at least one signal');
    }
  }

  if (stacks.has('techniques')) {
    const glossary = Array.isArray(data.techniques) ? data.techniques : [];
    const glossaryIds = new Set(glossary.map((t) => t.id));
    for (const step of steps) {
      for (const tech of step.techniqueIds || []) {
        if (!glossaryIds.has(tech)) errors.push(`technique reference missing: ${tech}`);
      }
    }
    if (glossary.length === 0) errors.push('techniques stack requires glossary');
  }

  if (stacks.has('storage')) {
    const storage = data.storage || {};
    const methods = ['roomTemp', 'refrigerated', 'frozen'];
    const present = methods.filter((m) => storage[m]);
    if (present.length === 0) errors.push('storage stack requires at least one method');
    for (const method of present) {
      const duration = storage[method]?.duration?.iso8601;
      if (!duration || typeof duration !== 'string' || !duration.startsWith('P')) {
        errors.push(`storage method ${method} missing iso8601 duration`);
      }
    }
  }

  return errors;
}

async function main() {
  await loadSchemas();
  const validate = ajv.getSchema('https://soustack.spec/soustack.schema.json');
  if (!validate) throw new Error('main schema not loaded');

  const fixtureFiles = await walk('fixtures');
  let failures = 0;

  for (const file of fixtureFiles) {
    const raw = await readFile(file, 'utf8');
    const data = JSON.parse(raw);
    const expectValid = file.includes('.valid.');
    const expectInvalid = file.includes('.invalid.');

    if (!expectValid && !expectInvalid) {
      console.warn(`Skipping fixture without expectation: ${file}`);
      continue;
    }

    const schemaOk = validate(data);
    const schemaErrors = schemaOk ? [] : validate.errors || [];
    const conformanceErrors = checkConformance(data, file);
    const overallErrors = [...schemaErrors.map((e) => ajv.errorsText([e], { separator: '; ' })), ...conformanceErrors];
    const passed = schemaOk && conformanceErrors.length === 0;

    if (expectValid && !passed) {
      failures++;
      console.error(`Expected valid but failed: ${file}`);
      overallErrors.forEach((e) => console.error(` - ${e}`));
    }
    if (expectInvalid && passed) {
      failures++;
      console.error(`Expected invalid but passed: ${file}`);
    }
  }

  if (failures > 0) {
    console.error(`Conformance failed for ${failures} fixture(s).`);
    process.exit(1);
  } else {
    console.log('All fixtures conform to expectations.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
