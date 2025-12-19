#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

/**
 * Load a stack schema and extract its properties and required fields
 */
async function loadStackSchema(schemaPath) {
  const fullPath = join(repoRoot, schemaPath);
  const schema = JSON.parse(await readFile(fullPath, 'utf8'));
  
  const properties = schema.properties || {};
  const required = schema.required || [];
  
  // Use the schema's $id if available, otherwise construct from path
  const schemaId = schema.$id || `https://soustack.spec/${schemaPath.replace(/\\/g, '/')}`;
  
  // Build property refs: each property references the schema at that property path
  const propertyRefs = {};
  for (const propName of Object.keys(properties)) {
    // Reference the property using the schema's $id
    propertyRefs[propName] = { $ref: `${schemaId}#/properties/${propName}` };
  }
  
  return {
    properties: propertyRefs,
    required: required
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
 */
async function generateStackGatingRule(stackId, stack, registry) {
  const supportedMajors = Object.keys(stack.schema.major)
    .map(m => parseInt(m, 10))
    .sort((a, b) => a - b);
  
  const requires = stack.requires || [];
  
  // Build prerequisite conditions: require all prerequisite stacks to be present
  // with any supported major (not a specific version)
  const prerequisiteConditions = [];
  for (const reqStackId of requires) {
    const reqStack = registry.stacks[reqStackId];
    if (!reqStack) {
      throw new Error(`Stack "${stackId}" requires missing stack: "${reqStackId}"`);
    }
    const reqSupportedMajors = Object.keys(reqStack.schema.major)
      .map(m => parseInt(m, 10))
      .sort((a, b) => a - b);
    prerequisiteConditions.push(buildStackPresenceCondition(reqStackId, reqSupportedMajors));
  }
  
  // Generate oneOf for each supported major version
  const majorRules = [];
  for (const major of supportedMajors) {
    const schemaPath = stack.schema.major[String(major)];
    const schemaInfo = await loadStackSchema(schemaPath);
    
    // Build if condition: stack present with this major + all prerequisites
    const ifConditions = [
      buildStackMajorCondition(stackId, major),
      ...prerequisiteConditions
    ];
    
    const ifCondition = ifConditions.length === 1 
      ? ifConditions[0] 
      : { allOf: ifConditions };
    
    // Build then clause: apply schema properties and required fields
    const thenClause = {};
    if (Object.keys(schemaInfo.properties).length > 0) {
      thenClause.properties = schemaInfo.properties;
    }
    if (schemaInfo.required.length > 0) {
      thenClause.required = schemaInfo.required;
    }
    
    // Build else clause: reject unsupported major (only if stack is present)
    const elseClause = {
      if: {
        required: ['stacks'],
        properties: {
          stacks: {
            required: [stackId],
            properties: {
              [stackId]: { 
                type: 'integer',
                not: { enum: supportedMajors }
              }
            }
          }
        }
      },
      then: { not: {} } // Reject unsupported major
    };
    
    majorRules.push({
      if: ifCondition,
      then: Object.keys(thenClause).length > 0 ? thenClause : {},
      else: elseClause
    });
  }
  
  // If multiple majors, wrap in oneOf
  if (majorRules.length === 1) {
    return majorRules[0];
  } else {
    return { oneOf: majorRules };
  }
}

/**
 * Generate all stack gating rules
 */
async function generateStackGating(registry) {
  const gatingRules = [];
  
  // Get official stacks (exclude vendor stacks starting with x-)
  const officialStacks = Object.keys(registry.stacks)
    .filter(id => !id.startsWith('x-'))
    .sort(); // Deterministic ordering
  
  // Generate rules for each official stack
  for (const stackId of officialStacks) {
    const stack = registry.stacks[stackId];
    const rule = await generateStackGatingRule(stackId, stack, registry);
    gatingRules.push(rule);
  }
  
  return gatingRules;
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

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const schemaPath = join(repoRoot, 'soustack.schema.json');

  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'));

  // Generate gating rules
  const gatingRules = await generateStackGating(registry);
  const profileRules = generateProfileValidation(registry);

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
