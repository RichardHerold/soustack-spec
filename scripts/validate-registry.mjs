#!/usr/bin/env node
import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const ajv = new Ajv2020({ strict: false, allErrors: true });
addFormats(ajv);

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function checkCycles(graph, name) {
  const visited = new Set();
  const stack = new Set();
  const cycles = [];

  function dfs(node, path) {
    if (stack.has(node)) {
      cycles.push([...path, node].join(' -> '));
      return;
    }
    if (visited.has(node)) return;
    visited.add(node);
    stack.add(node);
    const deps = graph.get(node) || new Set();
    for (const dep of deps) {
      dfs(dep, [...path, node]);
    }
    stack.delete(node);
  }

  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      dfs(node, []);
    }
  }

  return cycles;
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const schemaPath = join(repoRoot, 'schemas', 'stacks-registry.schema.json');

  // Load and validate schema
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
  ajv.addSchema(schema, schema.$id || schemaPath);

  // Load registry
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));

  // Schema validation
  const validate = ajv.getSchema(schema.$id || schemaPath);
  if (!validate) throw new Error('Failed to load registry schema');
  
  const valid = validate(registry);
  if (!valid) {
    console.error('Registry schema validation failed:');
    validate.errors.forEach(err => {
      console.error(`  ${err.instancePath || '/'}: ${err.message}`);
    });
    process.exit(1);
  }

  const errors = [];

  // Semantic checks
  const stackIds = new Set(Object.keys(registry.stacks));
  const profileIds = new Set(Object.keys(registry.profiles));

  // Check stack requires
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    for (const req of stack.requires) {
      if (!stackIds.has(req)) {
        errors.push(`Stack "${stackId}" requires missing stack: "${req}"`);
      }
    }
  }

  // Check profile references
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    if (!profileIds.has(stack.profile)) {
      errors.push(`Stack "${stackId}" references missing profile: "${stack.profile}"`);
    }
  }

  // Check profile requiresProfiles
  for (const [profileId, profile] of Object.entries(registry.profiles)) {
    const requiresProfiles = profile.requiresProfiles || [];
    for (const req of requiresProfiles) {
      if (!profileIds.has(req)) {
        errors.push(`Profile "${profileId}" requiresProfiles references missing profile: "${req}"`);
      }
    }
  }

  // Check profile requiresStacks
  for (const [profileId, profile] of Object.entries(registry.profiles)) {
    const requiresStacks = profile.requiresStacks || [];
    for (const req of requiresStacks) {
      if (!stackIds.has(req)) {
        errors.push(`Profile "${profileId}" requiresStacks references missing stack: "${req}"`);
      }
    }
  }

  // Check for cycles in stack dependency graph
  const stackGraph = new Map();
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    stackGraph.set(stackId, new Set(stack.requires));
  }
  const stackCycles = checkCycles(stackGraph, 'stack');
  if (stackCycles.length > 0) {
    errors.push(`Stack dependency cycles detected: ${stackCycles.join('; ')}`);
  }

  // Check for cycles in profile graph (via requiresProfiles)
  const profileGraph = new Map();
  for (const [profileId, profile] of Object.entries(registry.profiles)) {
    profileGraph.set(profileId, new Set(profile.requiresProfiles || []));
  }
  const profileCycles = checkCycles(profileGraph, 'profile');
  if (profileCycles.length > 0) {
    errors.push(`Profile dependency cycles detected: ${profileCycles.join('; ')}`);
  }

  // Check schema files exist
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    for (const [major, schemaPath] of Object.entries(stack.schema.major)) {
      const fullPath = join(repoRoot, schemaPath);
      if (!(await fileExists(fullPath))) {
        errors.push(`Stack "${stackId}" schema major "${major}" file not found: ${schemaPath}`);
      }
    }
  }

  // Check docs files exist (if present and not optional)
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    if (stack.docs) {
      for (const [major, docPath] of Object.entries(stack.docs.major)) {
        const fullPath = join(repoRoot, docPath);
        if (!(await fileExists(fullPath))) {
          errors.push(`Stack "${stackId}" docs major "${major}" file not found: ${docPath}`);
        }
      }
    }
  }

  // Check latestMajor exists in schema.major
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    const latestMajorStr = String(stack.latestMajor);
    if (!(latestMajorStr in stack.schema.major)) {
      errors.push(`Stack "${stackId}" latestMajor ${stack.latestMajor} not found in schema.major`);
    }
  }

  if (errors.length > 0) {
    console.error('Registry validation failed:');
    errors.forEach(err => console.error(`  ${err}`));
    process.exit(1);
  }

  console.log('Registry validation passed.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

