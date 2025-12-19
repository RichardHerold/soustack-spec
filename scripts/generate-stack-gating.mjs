#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

/**
 * Recursively rewrite $ref values to make them absolute
 * When we inline a property from another schema, all $ref values need to be absolute:
 * - #/$defs/... references become schemaId#/$defs/...
 * - Relative path references like ../defs/... need to be resolved relative to schemaId
 */
function rewriteRefs(obj, schemaId, schemaBasePath) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => rewriteRefs(item, schemaId, schemaBasePath));
  }
  
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$ref' && typeof value === 'string') {
      // If it's a relative $defs reference, make it absolute
      if (value.startsWith('#/$defs/') || value.startsWith('#/')) {
        result[key] = `${schemaId}${value}`;
      } else if (value.startsWith('../') || value.startsWith('./')) {
        // Relative path reference - resolve it relative to the schema's base path
        // schemaBasePath is like "stacks/scaling.schema.json"
        // value might be "../defs/quantity.schema.json"
        // We need to resolve this to an absolute URI
        let finalPath;
        if (value.startsWith('../')) {
          // Go up one level from schema dir
          // schemaBasePath = "stacks/scaling.schema.json"
          // schemaDir = "stacks"
          // parentDir = "" (empty, we're at root)
          // value = "../defs/quantity.schema.json"
          // finalPath should be "defs/quantity.schema.json"
          const schemaDir = schemaBasePath.substring(0, schemaBasePath.lastIndexOf('/'));
          if (schemaDir) {
            const parentDir = schemaDir.substring(0, schemaDir.lastIndexOf('/'));
            finalPath = parentDir ? `${parentDir}/${value.substring(3)}` : value.substring(3);
          } else {
            finalPath = value.substring(3);
          }
        } else if (value.startsWith('./')) {
          // Same directory as schema
          const schemaDir = schemaBasePath.substring(0, schemaBasePath.lastIndexOf('/'));
          finalPath = schemaDir ? `${schemaDir}/${value.substring(2)}` : value.substring(2);
        } else {
          finalPath = value;
        }
        // Convert to absolute URI, ensuring no double slashes
        const normalized = finalPath.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/+/g, '/');
        result[key] = `https://soustack.spec/${normalized}`;
      } else if (!value.includes('://') && !value.startsWith('#')) {
        // Relative path without ./ or ../ - assume it's relative to defs or stacks
        // This shouldn't happen in our schemas, but handle it
        result[key] = `https://soustack.spec/${value}`;
      } else {
        // Already absolute or external reference
        result[key] = value;
      }
    } else {
      result[key] = rewriteRefs(value, schemaId, schemaBasePath);
    }
  }
  
  return result;
}

/**
 * Load a stack schema and extract its properties and required fields
 * 
 * When inlining a property from another schema, we need to:
 * 1. Inline the property definition
 * 2. Rewrite all $refs to be absolute (including #/$defs/ and relative paths)
 * 3. Also inline any $defs that the property depends on, since they contain
 *    relative path references that won't resolve when the property is used
 *    in a different schema context
 */
async function loadStackSchema(schemaPath) {
  const fullPath = join(repoRoot, schemaPath);
  const schema = JSON.parse(await readFile(fullPath, 'utf8'));
  
  const properties = schema.properties || {};
  const required = schema.required || [];
  
  // Use the schema's $id if available, otherwise construct from path
  const schemaId = schema.$id || `https://soustack.spec/${schemaPath.replace(/\\/g, '/')}`;
  
  // Collect all $defs names used in the properties
  const defsUsed = new Set();
  function collectDefRefs(obj) {
    if (typeof obj !== 'object' || obj === null) return;
    if (Array.isArray(obj)) {
      obj.forEach(collectDefRefs);
      return;
    }
    for (const [key, value] of Object.entries(obj)) {
      if (key === '$ref' && typeof value === 'string' && value.startsWith('#/$defs/')) {
        defsUsed.add(value.substring(8)); // Remove '#/$defs/' prefix
      } else {
        collectDefRefs(value);
      }
    }
  }
  
  for (const prop of Object.values(properties)) {
    collectDefRefs(prop);
  }
  
  // Build property refs: inline the property definition and rewrite all $refs
  const propertyRefs = {};
  for (const propName of Object.keys(properties)) {
    // Inline the property definition and rewrite all $refs to be absolute
    const propertyDef = JSON.parse(JSON.stringify(properties[propName]));
    propertyRefs[propName] = rewriteRefs(propertyDef, schemaId, schemaPath);
  }
  
  // Also collect and inline the $defs we need, with their $refs rewritten
  const inlinedDefs = {};
  if (schema.$defs) {
    for (const defName of defsUsed) {
      if (schema.$defs[defName]) {
        const defCopy = JSON.parse(JSON.stringify(schema.$defs[defName]));
        inlinedDefs[defName] = rewriteRefs(defCopy, schemaId, schemaPath);
      }
    }
  }
  
  return {
    properties: propertyRefs,
    required: required,
    defs: inlinedDefs
  };
}

/**
 * Build condition for stack presence with a specific major version
 */
function buildStackMajorCondition(stackId, major) {
  return {
    required: ['stacks'],
    properties: {
      stacks: {
        required: [stackId],
        properties: {
          [stackId]: { const: major }
        }
      }
    }
  };
}

/**
 * Build condition for stack presence (any supported major)
 */
function buildStackPresenceCondition(stackId, supportedMajors) {
  return {
    required: ['stacks'],
    properties: {
      stacks: {
        required: [stackId],
        properties: {
          [stackId]: {
            type: 'integer',
            enum: supportedMajors
          }
        }
      }
    }
  };
}

/**
 * Generate gating rules for a single stack
 * Returns an object with allOf containing:
 * - Unsupported major rejection rule
 * - Per-major if/then rules (with prerequisites in then)
 */
async function generateStackGatingRule(stackId, stack, registry, allDefs) {
  const supportedMajors = Object.keys(stack.schema.major)
    .map(m => parseInt(m, 10))
    .sort((a, b) => a - b);
  
  const requires = stack.requires || [];
  
  // A2: Generate unsupported major rejection rule
  // This rule rejects unsupported majors when the stack is present
  const unsupportedMajorRule = {
    if: {
      required: ['stacks'],
      properties: {
        stacks: {
          required: [stackId]
        }
      }
    },
    then: {
      properties: {
        stacks: {
          properties: {
            [stackId]: {
              enum: supportedMajors
            }
          }
        }
      }
    }
  };
  
  // A1: Build prerequisite conditions for each prerequisite stack
  // Each prerequisite must exist AND be a supported major
  const prerequisiteConditions = [];
  for (const reqStackId of requires) {
    const reqStack = registry.stacks[reqStackId];
    if (!reqStack) {
      throw new Error(`Stack "${stackId}" requires missing stack: "${reqStackId}"`);
    }
    const reqSupportedMajors = Object.keys(reqStack.schema.major)
      .map(m => parseInt(m, 10))
      .sort((a, b) => a - b);
    prerequisiteConditions.push({
      properties: {
        stacks: {
          required: [reqStackId],
          properties: {
            [reqStackId]: {
              enum: reqSupportedMajors
            }
          }
        }
      }
    });
  }
  
  // Generate per-major if/then rules
  const majorRules = [];
  for (const major of supportedMajors) {
    const schemaPath = stack.schema.major[String(major)];
    const schemaInfo = await loadStackSchema(schemaPath);
    
    // Merge $defs into the global collection (with namespacing to avoid conflicts)
    if (schemaInfo.defs) {
      // First pass: collect all def names and create namespace mapping
      const defNameMap = new Map();
      for (const defName of Object.keys(schemaInfo.defs)) {
        const namespacedName = `${stackId}@${major}_${defName}`;
        defNameMap.set(defName, namespacedName);
        allDefs[namespacedName] = schemaInfo.defs[defName];
      }
      
      // Second pass: update $refs in properties to point to namespaced $defs
      function updateDefRefs(obj) {
        if (typeof obj !== 'object' || obj === null) return obj;
        if (Array.isArray(obj)) {
          return obj.map(updateDefRefs);
        }
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          if (key === '$ref' && typeof value === 'string') {
            // If it references one of our $defs, update to namespaced version
            const defMatch = value.match(/^https:\/\/soustack\.spec\/stacks\/[^#]+#\/\$defs\/(.+)$/);
            if (defMatch && defNameMap.has(defMatch[1])) {
              result[key] = `#/$defs/${defNameMap.get(defMatch[1])}`;
            } else {
              result[key] = value;
            }
          } else {
            result[key] = updateDefRefs(value);
          }
        }
        return result;
      }
      
      // Update all properties
      for (const propName of Object.keys(schemaInfo.properties)) {
        schemaInfo.properties[propName] = updateDefRefs(schemaInfo.properties[propName]);
      }
    }
    
    // A1: Build if condition: stack present with this specific major (no prerequisites in if)
    const ifCondition = buildStackMajorCondition(stackId, major);
    
    // A1: Build then clause: allOf with prerequisites + schema properties
    const thenClauseAllOf = [];
    
    // Add prerequisite conditions to then
    thenClauseAllOf.push(...prerequisiteConditions);
    
    // Add schema properties and required fields
    const schemaClause = {};
    if (Object.keys(schemaInfo.properties).length > 0) {
      schemaClause.properties = schemaInfo.properties;
    }
    if (schemaInfo.required.length > 0) {
      schemaClause.required = schemaInfo.required;
    }
    if (Object.keys(schemaClause).length > 0) {
      thenClauseAllOf.push(schemaClause);
    }
    
    // Build then clause
    const thenClause = thenClauseAllOf.length === 1
      ? thenClauseAllOf[0]
      : { allOf: thenClauseAllOf };
    
    majorRules.push({
      if: ifCondition,
      then: thenClause
    });
  }
  
  // A3: Return allOf with unsupported major rule + per-major rules (no oneOf)
  return {
    allOf: [
      unsupportedMajorRule,
      ...majorRules
    ]
  };
}

/**
 * Generate all stack gating rules and collect $defs to merge
 */
async function generateStackGating(registry) {
  const gatingRules = [];
  const allDefs = {}; // Collect all $defs from stack schemas
  
  // Get official stacks (exclude vendor stacks starting with x-)
  const officialStacks = Object.keys(registry.stacks)
    .filter(id => !id.startsWith('x-'))
    .sort(); // Deterministic ordering
  
  // Generate rules for each official stack
  for (const stackId of officialStacks) {
    const stack = registry.stacks[stackId];
    const rule = await generateStackGatingRule(stackId, stack, registry, allDefs);
    gatingRules.push(rule);
  }
  
  return { rules: gatingRules, defs: allDefs };
}

/**
 * Recursively collect all required stacks for a given profile
 */
function collectRequiredStacks(profileId, registry, visited = new Set()) {
  if (visited.has(profileId)) {
    return new Set(); // Cycle detected, return empty to avoid infinite recursion
  }
  visited.add(profileId);
  
  const profile = registry.profiles[profileId];
  if (!profile) {
    return new Set();
  }
  
  const allRequiredStacks = new Set();
  
  // Add direct required stacks
  const requiresStacks = profile.requiresStacks || [];
  for (const stackId of requiresStacks) {
    allRequiredStacks.add(stackId);
  }
  
  // Recursively collect stacks from required profiles
  const requiresProfiles = profile.requiresProfiles || [];
  for (const reqProfileId of requiresProfiles) {
    const reqStacks = collectRequiredStacks(reqProfileId, registry, new Set(visited));
    for (const stackId of reqStacks) {
      allRequiredStacks.add(stackId);
    }
  }
  
  return allRequiredStacks;
}

/**
 * Generate profile validation rules
 */
function generateProfileValidation(registry) {
  const profileRules = [];
  
  // Get all profiles sorted for deterministic output
  const profileIds = Object.keys(registry.profiles).sort();
  
  for (const profileId of profileIds) {
    // Collect all required stacks recursively (from this profile and all prerequisite profiles)
    const allRequiredStacks = collectRequiredStacks(profileId, registry);
    const requiresStacks = Array.from(allRequiredStacks).sort();
    
    // Only generate rule if there are required stacks
    if (requiresStacks.length > 0) {
      const thenClause = {
        required: ['stacks'],
        properties: {
          stacks: {
            required: requiresStacks,
            properties: {}
          }
        }
      };
      
      // For each required stack, require it to be present with a supported major
      for (const stackId of requiresStacks) {
        const stack = registry.stacks[stackId];
        if (!stack) {
          throw new Error(`Profile "${profileId}" requires stack "${stackId}" which is not in registry`);
        }
        const supportedMajors = Object.keys(stack.schema.major)
          .map(m => parseInt(m, 10))
          .sort((a, b) => a - b);
        thenClause.properties.stacks.properties[stackId] = {
          type: 'integer',
          enum: supportedMajors
        };
      }
      
      profileRules.push({
        if: {
          required: ['profile'],
          properties: {
            profile: { const: profileId }
          }
        },
        then: thenClause
      });
    }
  }
  
  return profileRules;
}

/**
 * Update the profile property enum in the schema to match registry
 * Option 2: Allow vendor profiles (x-*) since vendor stacks are supported
 */
function updateProfileEnum(schema, registry) {
  const profileIds = Object.keys(registry.profiles).sort();
  
  // Option 2: Allow official profiles + vendor profiles
  schema.properties.profile = {
    type: 'string',
    anyOf: [
      { enum: profileIds },
      { pattern: '^x-[a-z0-9-]+(?:\\.[a-z0-9-]+)*$' }
    ]
  };
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const schemaPath = join(repoRoot, 'soustack.schema.json');

  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'));

  // Update profile enum from registry
  updateProfileEnum(schema, registry);

  // Generate gating rules and collect $defs
  const { rules: gatingRules, defs: stackDefs } = await generateStackGating(registry);
  const profileRules = generateProfileValidation(registry);

  // Merge $defs from stack schemas into main schema
  if (!schema.$defs) {
    schema.$defs = {};
  }
  Object.assign(schema.$defs, stackDefs);

  // Find the placeholder in allOf
  const allOf = schema.allOf;
  let beginIdx = -1;
  let endIdx = -1;

  for (let i = 0; i < allOf.length; i++) {
    if (allOf[i].$comment === 'BEGIN GENERATED STACK GATING') {
      beginIdx = i;
    }
    if (allOf[i].$comment === 'END GENERATED STACK GATING') {
      endIdx = i;
    }
  }

  if (beginIdx === -1 || endIdx === -1) {
    throw new Error('Could not find stack gating markers in schema');
  }

  // Replace content between markers (profile validation before stack gating)
  const newAllOf = [
    ...allOf.slice(0, beginIdx + 1),
    ...profileRules,
    ...gatingRules,
    ...allOf.slice(endIdx)
  ];

  schema.allOf = newAllOf;

  // Write back
  await writeFile(schemaPath, JSON.stringify(schema, null, 2) + '\n', 'utf8');
  console.log(`Generated ${gatingRules.length} stack gating rules and ${profileRules.length} profile validation rules in soustack.schema.json`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
