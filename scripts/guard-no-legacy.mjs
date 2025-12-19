#!/usr/bin/env node
import { stat } from 'node:fs/promises';
import { join } from 'node:path';

const forbiddenPaths = [
  'profiles',
  'schemas/recipe',
  'schemas/registry'
];

async function pathExists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let violations = [];

  for (const rel of forbiddenPaths) {
    const exists = await pathExists(join(process.cwd(), rel));
    if (exists) {
      violations.push(`forbidden path present: ${rel}`);
    }
  }

  if (violations.length) {
    console.error('Legacy guard failed:');
    for (const v of violations) console.error(` - ${v}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
