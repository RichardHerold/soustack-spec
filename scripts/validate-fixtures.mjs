#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const ajv = new Ajv2020({ strict: false, allErrors: true, allowUnionTypes: true });
addFormats(ajv);

let registry = null;

async function loadRegistry() {
  if (!registry) {
    const registryPath = join(repoRoot, 'stacks', 'registry.json');
    registry = JSON.parse(await readFile(registryPath, 'utf8'));
  }
  return registry;
}

async function loadSchemas() {
  const schemaFiles = [];
  for (const dir of ['defs', 'stacks']) {
    const entries = await readdir(dir);
    for (const entry of entries) {
      if (entry.endsWith('.json') && entry !== 'registry.json') {
        schemaFiles.push(join(dir, entry));
      }
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

function normalizeStacksToMap(stacks) {
  // Convert array format to map format if needed
  if (Array.isArray(stacks)) {
    const map = {};
    for (const entry of stacks) {
      if (typeof entry === 'string') {
        const match = entry.match(/^([^@]+)@(\d+)$/);
        if (match) {
          const [, name, major] = match;
          map[name] = parseInt(major, 10);
        } else {
          throw new Error(`Invalid stack format: ${entry} (must be name@major)`);
        }
      }
    }
    return map;
  }
  if (typeof stacks === 'object' && stacks !== null) {
    return stacks;
  }
  return {};
}

function getStacksSet(stacksMap) {
  const set = new Set();
  for (const [name, major] of Object.entries(stacksMap)) {
    set.add(`${name}@${major}`);
  }
  return set;
}

/**
 * Check if a stack is present with any supported major version
 */
function hasStackVersion(stacksMap, stackId, registry) {
  if (!(stackId in stacksMap)) {
    return false;
  }
  const declaredMajor = stacksMap[stackId];
  const stack = registry.stacks[stackId];
  if (!stack) {
    return false;
  }
  const supportedMajors = Object.keys(stack.schema.major)
    .map(m => parseInt(m, 10));
  return supportedMajors.includes(declaredMajor);
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

function validateTemperatureRange(temp, context) {
  if (!temp || typeof temp !== 'object') return null;
  if ('minValue' in temp && 'maxValue' in temp) {
    if (!(temp.minValue <= temp.maxValue)) {
      return `${context} temperature minValue must be <= maxValue`;
    }
  }
  return null;
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

function checkConformance(data, file, reg) {
  const errors = [];
  
  // Normalize stacks to map format
  let stacksMap;
  let warnedArray = false;
  if (Array.isArray(data.stacks)) {
    warnedArray = true;
    stacksMap = normalizeStacksToMap(data.stacks);
  } else {
    stacksMap = normalizeStacksToMap(data.stacks || {});
  }
  
  // Validate stacks against registry
  const officialStacks = Object.keys(reg.stacks).filter(id => !id.startsWith('x-'));
  for (const [stackId, major] of Object.entries(stacksMap)) {
    if (stackId.startsWith('x-')) {
      // Vendor stacks are allowed
      continue;
    }
    if (!officialStacks.includes(stackId)) {
      errors.push(`Unknown official stack: ${stackId}`);
      continue;
    }
    const stack = reg.stacks[stackId];
    // Check if declared major is in supported majors
    const supportedMajors = Object.keys(stack.schema.major)
      .map(m => parseInt(m, 10));
    if (!supportedMajors.includes(major)) {
      errors.push(`Stack "${stackId}" major ${major} not supported (supported: ${supportedMajors.join(', ')})`);
    }
    // Check prerequisites - prereq must exist AND be a supported major
    for (const req of stack.requires) {
      if (!hasStackVersion(stacksMap, req, reg)) {
        const reqStack = reg.stacks[req];
        if (!reqStack) {
          errors.push(`Stack "${stackId}" requires missing stack: "${req}"`);
        } else {
          const reqSupportedMajors = Object.keys(reqStack.schema.major)
            .map(m => parseInt(m, 10));
          errors.push(`Stack "${stackId}" requires "${req}" with a supported major (${reqSupportedMajors.join(', ')}) but it is not present`);
        }
      }
    }
  }
  
  if (warnedArray) {
    console.warn(`Warning: ${file} uses array stacks format. Should migrate to map format.`);
  }
  
  const stacks = getStacksSet(stacksMap);
  const ingredients = collectIngredients(data.ingredients);
  const steps = collectSteps(data.instructions);

  for (const ingredient of ingredients) {
    const issue = validateTemperatureRange(ingredient.temperature, 'ingredient');
    if (issue) errors.push(issue);
  }
  for (const step of steps) {
    const issue = validateTemperatureRange(step.temperature, `step ${step.id || ''}`.trim());
    if (issue) errors.push(issue);
  }

  if (ingredients.length) {
    const dup = uniqueCheck(ingredients, 'id', 'ingredient');
    if (dup) errors.push(dup);
  }
  if (steps.length) {
    const dup = uniqueCheck(steps, 'id', 'step');
    if (dup) errors.push(dup);
  }

  if (hasStackVersion(stacksMap, 'structured', reg) || hasStackVersion(stacksMap, 'timed', reg) || hasStackVersion(stacksMap, 'referenced', reg)) {
    const dagIssue = validateDAG(steps);
    if (dagIssue) errors.push(dagIssue);
  }

  if (hasStackVersion(stacksMap, 'referenced', reg)) {
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

  if (hasStackVersion(stacksMap, 'timed', reg)) {
    for (const step of steps) {
      const duration = step?.timing?.duration;
      if (duration && typeof duration === 'object' && 'minMinutes' in duration && 'maxMinutes' in duration) {
        if (!(duration.minMinutes <= duration.maxMinutes)) {
          errors.push('timed duration minMinutes must be <= maxMinutes');
        }
      }
    }
  }

  if (hasStackVersion(stacksMap, 'scaling', reg)) {
    const ingredientIds = new Set(ingredients.map((i) => i.id));
    for (const ingredient of ingredients) {
      const scaling = ingredient?.scaling;
      if (scaling && scaling.mode === 'bakersPercent') {
        if (!scaling.percent || scaling.percent <= 0) {
          errors.push('bakersPercent scaling requires percent > 0');
        }
        if (!scaling.of || !ingredientIds.has(scaling.of)) {
          errors.push(`bakersPercent of references missing ingredient id: ${scaling.of || ''}`.trim());
        }
      }
    }

    const discrete = data.scaling?.discrete;
    if (discrete && typeof discrete === 'object') {
      if (discrete.min > discrete.max) {
        errors.push('scaling discrete min must be <= max');
      }
    }
  }

  if (hasStackVersion(stacksMap, 'illustrated', reg)) {
    const stepHasMedia = steps.some((s) => (Array.isArray(s.images) && s.images.length > 0) || (Array.isArray(s.videos) && s.videos.length > 0));
    const recipeHasMedia = (Array.isArray(data.images) && data.images.length > 0) ||
      (Array.isArray(data.videos) && data.videos.length > 0);
    if (!stepHasMedia && !recipeHasMedia) {
      errors.push('illustrated stack requires at least one media URI');
    }
  }

  if (hasStackVersion(stacksMap, 'dietary', reg)) {
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

  if (hasStackVersion(stacksMap, 'techniques', reg)) {
    const glossary = Array.isArray(data.techniques) ? data.techniques : [];
    const glossaryIds = new Set(glossary.map((t) => t.id));
    for (const step of steps) {
      for (const tech of step.techniqueIds || []) {
        if (!glossaryIds.has(tech)) errors.push(`technique reference missing: ${tech}`);
      }
    }
    if (glossary.length === 0) errors.push('techniques stack requires glossary');
  }

  if (hasStackVersion(stacksMap, 'storage', reg)) {
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

  if (hasStackVersion(stacksMap, 'equipment', reg)) {
    const equipment = data.equipment || [];
    const equipmentIds = new Set();
    const equipmentObjects = [];
    
    // Collect equipment ids from structured objects
    for (const item of equipment) {
      if (item && typeof item === 'object' && item.id) {
        if (equipmentIds.has(item.id)) {
          errors.push(`equipment id duplicated: ${item.id}`);
        }
        equipmentIds.add(item.id);
        equipmentObjects.push(item);
      }
    }
    
    // Validate step equipment references when structured is present
    if (hasStackVersion(stacksMap, 'structured', reg)) {
      for (const step of steps) {
        if (Array.isArray(step.usesEquipment)) {
          for (const eqId of step.usesEquipment) {
            if (!equipmentIds.has(eqId)) {
              errors.push(`step usesEquipment references missing equipment id: ${eqId}`);
            }
          }
        }
      }
    }
    
    // Validate equipment scaling fields
    for (const item of equipmentObjects) {
      // Validate threshold countScaling
      if (item.countScaling && typeof item.countScaling === 'object' && item.countScaling.mode === 'threshold') {
        const steps = item.countScaling.steps || [];
        if (steps.length === 0) {
          errors.push(`equipment ${item.id} threshold countScaling requires non-empty steps array`);
        }
        for (const step of steps) {
          if (step.maxFactor <= 0) {
            errors.push(`equipment ${item.id} threshold step maxFactor must be > 0`);
          }
          if (step.count < 1) {
            errors.push(`equipment ${item.id} threshold step count must be >= 1`);
          }
        }
      }
      
      // Validate upgrades references
      if (Array.isArray(item.upgrades)) {
        for (const upgrade of item.upgrades) {
          if (upgrade.minFactor <= 0) {
            errors.push(`equipment ${item.id} upgrade minFactor must be > 0`);
          }
          if (!upgrade.use || !equipmentIds.has(upgrade.use)) {
            errors.push(`equipment ${item.id} upgrade references missing equipment id: ${upgrade.use || ''}`.trim());
          }
        }
      }
    }
  }

  if (hasStackVersion(stacksMap, 'prep', reg)) {
    const miseEnPlace = data.miseEnPlace || [];
    
    // Validate task id uniqueness (only if present)
    const taskIds = [];
    for (const task of miseEnPlace) {
      if (task.id) {
        if (taskIds.includes(task.id)) {
          errors.push(`miseEnPlace task id duplicated: ${task.id}`);
        }
        taskIds.push(task.id);
      }
    }
    
    // Validate inputs when referenced stack is present
    if (hasStackVersion(stacksMap, 'referenced', reg)) {
      const ingredientIds = new Set(ingredients.map((i) => i.id).filter(Boolean));
      for (const task of miseEnPlace) {
        if (Array.isArray(task.inputs)) {
          for (const inputId of task.inputs) {
            if (!ingredientIds.has(inputId)) {
              errors.push(`miseEnPlace task inputs references missing ingredient id: ${inputId}`);
            }
          }
        }
      }
    }
    
    // Validate usesEquipment when equipment stack is present
    if (hasStackVersion(stacksMap, 'equipment', reg)) {
      const equipment = data.equipment || [];
      const equipmentIds = new Set();
      
      // Collect equipment ids from structured objects only
      for (const item of equipment) {
        if (item && typeof item === 'object' && item.id) {
          equipmentIds.add(item.id);
        }
      }
      
      for (const task of miseEnPlace) {
        if (Array.isArray(task.usesEquipment)) {
          for (const eqId of task.usesEquipment) {
            if (!equipmentIds.has(eqId)) {
              errors.push(`miseEnPlace task usesEquipment references missing equipment id: ${eqId}`);
            }
          }
        }
      }
    }
  }

  return errors;
}

async function main() {
  await loadSchemas();
  const reg = await loadRegistry();
  const validate = ajv.getSchema('https://soustack.spec/soustack.schema.json');
  if (!validate) throw new Error('main schema not loaded');

  const fixtureFiles = await walk('fixtures');
  let failures = 0;

  for (const file of fixtureFiles) {
    const raw = await readFile(file, 'utf8');
    let data = JSON.parse(raw);
    const expectValid = file.includes('.valid.');
    const expectInvalid = file.includes('.invalid.');

    if (!expectValid && !expectInvalid) {
      console.warn(`Skipping fixture without expectation: ${file}`);
      continue;
    }

    // Normalize stacks to map for schema validation
    if (Array.isArray(data.stacks)) {
      data = { ...data, stacks: normalizeStacksToMap(data.stacks) };
    }

    const schemaOk = validate(data);
    const schemaErrors = schemaOk ? [] : validate.errors || [];
    const conformanceErrors = checkConformance(data, file, reg);
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
