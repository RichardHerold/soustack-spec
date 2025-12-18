#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Stack-specific gating rules - maps stack ID to the schema properties/requirements
const STACK_SCHEMA_PATHS = {
  quantified: { properties: { ingredients: './stacks/quantified.schema.json#/properties/ingredients' }, required: ['ingredients'] },
  scaling: { properties: { ingredients: './stacks/scaling.schema.json#/properties/ingredients', scaling: './stacks/scaling.schema.json#/properties/scaling' }, required: ['ingredients', 'scaling'] },
  structured: { properties: { instructions: './stacks/structured.schema.json#/properties/instructions' } },
  timed: { properties: { instructions: './stacks/timed.schema.json#/properties/instructions' } },
  referenced: { properties: { ingredients: './stacks/referenced.schema.json#/properties/ingredients', instructions: './stacks/referenced.schema.json#/properties/instructions' }, required: ['ingredients', 'instructions'] },
  storage: { required: ['storage'] },
  dietary: { required: ['dietary'] },
  substitutions: { required: ['substitutions'] },
  techniques: { required: ['techniques'] },
  illustrated: {},
  compute: {}
};

function buildStackCondition(stackId, major, requires) {
  const conditions = [
    {
      required: ['stacks'],
      properties: {
        stacks: {
          required: [stackId],
          properties: {
            [stackId]: { const: major }
          }
        }
      }
    }
  ];

  // Add required stack conditions
  for (const req of requires) {
    conditions.push({
      required: ['stacks'],
      properties: {
        stacks: {
          required: [req],
          properties: {
            [req]: { const: 1 } // Assuming all required stacks are at major 1 for now
          }
        }
      }
    });
  }

  return conditions.length === 1 ? conditions[0] : { allOf: conditions };
}

function generateStackGating(registry) {
  const gatingRules = [];
  const officialStacks = Object.keys(registry.stacks).filter(id => !id.startsWith('x-'));

  // Generate validation for each official stack
  for (const stackId of officialStacks) {
    const stack = registry.stacks[stackId];
    const latestMajor = stack.latestMajor;
    const requires = stack.requires || [];

    // Build if condition: stack present with correct major + all required stacks
    let ifCondition = buildStackCondition(stackId, latestMajor, requires);

    // Special case: quantified should NOT apply when scaling is present
    // (scaling includes quantified, so we don't want both rules to apply)
    if (stackId === 'quantified') {
      ifCondition = {
        allOf: [
          ifCondition,
          {
            not: {
              required: ['stacks'],
              properties: {
                stacks: {
                  required: ['scaling'],
                  properties: {
                    scaling: { const: 1 }
                  }
                }
              }
            }
          }
        ]
      };
    }

    // Build then clause from schema paths
    const schemaInfo = STACK_SCHEMA_PATHS[stackId] || {};
    const thenClause = {};
    
    if (schemaInfo.properties) {
      thenClause.properties = {};
      for (const [prop, ref] of Object.entries(schemaInfo.properties)) {
        thenClause.properties[prop] = { $ref: ref };
      }
    }
    if (schemaInfo.required) {
      thenClause.required = schemaInfo.required;
    }

    // Special cases
    if (stackId === 'compute') {
      ifCondition.properties = ifCondition.properties || {};
      ifCondition.properties.level = { const: 'base' };
    }

    // Build else clause: reject unsupported major (only if stack is present)
    // We only reject if the stack property exists but has wrong value
    const elseClause = {
      if: {
        required: ['stacks'],
        properties: {
          stacks: {
            required: [stackId],
            properties: {
              [stackId]: { not: { const: latestMajor } }
            }
          }
        }
      },
      then: { not: {} } // Reject unsupported major
    };

    const gatingRule = {
      if: ifCondition,
      then: Object.keys(thenClause).length > 0 ? thenClause : {},
      else: elseClause
    };

    gatingRules.push(gatingRule);
  }

  return gatingRules;
}

function generateProfileValidation(registry) {
  const profileRules = [];
  
  // Basic profile validation: lite and base profiles
  profileRules.push({
    if: { required: ['profile'], properties: { profile: { const: 'lite' } } },
    then: { properties: { level: { const: 'lite' } } }
  });
  
  profileRules.push({
    if: { required: ['profile'], properties: { profile: { const: 'base' } } },
    then: { properties: { level: { const: 'base' } } }
  });
  
  // Scalable profile requires quantified + scaling stacks
  profileRules.push({
    if: { required: ['profile'], properties: { profile: { const: 'scalable' } } },
    then: {
      required: ['stacks'],
      properties: {
        stacks: {
          required: ['quantified', 'scaling'],
          properties: {
            quantified: { const: 1 },
            scaling: { const: 1 }
          }
        },
        level: { const: 'base' }
      }
    }
  });
  
  // Timed profile requires structured + timed stacks
  profileRules.push({
    if: { required: ['profile'], properties: { profile: { const: 'timed' } } },
    then: {
      required: ['stacks'],
      properties: {
        stacks: {
          required: ['structured', 'timed'],
          properties: {
            structured: { const: 1 },
            timed: { const: 1 }
          }
        },
        level: { const: 'base' }
      }
    }
  });
  
  // Illustrated profile requires illustrated stack
  profileRules.push({
    if: { required: ['profile'], properties: { profile: { const: 'illustrated' } } },
    then: {
      required: ['stacks'],
      properties: {
        stacks: {
          required: ['illustrated'],
          properties: {
            illustrated: { const: 1 }
          }
        },
        level: { const: 'base' }
      }
    }
  });
  
  return profileRules;
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const schemaPath = join(repoRoot, 'soustack.schema.json');

  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'));

  // Generate gating rules
  const gatingRules = generateStackGating(registry);
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

  // Replace content between markers (include profile validation before stack gating)
  const newAllOf = [
    ...allOf.slice(0, beginIdx + 1),
    ...profileRules,
    ...gatingRules,
    ...allOf.slice(endIdx)
  ];

  schema.allOf = newAllOf;

  // Write back
  await writeFile(schemaPath, JSON.stringify(schema, null, 2) + '\n', 'utf8');
  console.log(`Generated ${gatingRules.length} stack gating rules in soustack.schema.json`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

