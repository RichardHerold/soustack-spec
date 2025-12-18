#!/usr/bin/env node
import { readdir, stat, readFile } from 'node:fs/promises';
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

async function walk(dir, visitors) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, visitors);
    } else {
      await visitors(full);
    }
  }
}

async function main() {
  let violations = [];
  const scriptPath = join(process.cwd(), 'scripts', 'guard-no-legacy.mjs');

  for (const rel of forbiddenPaths) {
    const exists = await pathExists(join(process.cwd(), rel));
    if (exists) {
      violations.push(`forbidden path present: ${rel}`);
    }
  }

  await walk(process.cwd(), async (file) => {
    if (file === scriptPath) return;
    const content = await readFile(file, 'utf8');
    for (const term of forbiddenTerms) {
      if (content.toLowerCase().includes(term.toLowerCase())) {
        violations.push(`forbidden term "${term}" found in ${file}`);
      }
    }
  });

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
