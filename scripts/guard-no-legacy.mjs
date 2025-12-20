#!/usr/bin/env node
import { stat, readdir, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

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

async function main() {
  let violations = [];

  for (const rel of forbiddenPaths) {
    const exists = await pathExists(join(process.cwd(), rel));
    if (exists) {
      violations.push(`forbidden path present: ${rel}`);
    }
  }

  const fixtureFiles = await walk(join(process.cwd(), 'fixtures'));
  for (const file of fixtureFiles) {
    const raw = await readFile(file, 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data?.stacks)) {
      violations.push(`legacy stacks array in fixture: ${file}`);
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
