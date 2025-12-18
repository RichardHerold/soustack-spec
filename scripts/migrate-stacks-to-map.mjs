#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

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

function migrateStacks(data) {
  if (!data.stacks || !Array.isArray(data.stacks)) {
    return data; // Already map or missing
  }
  
  const map = {};
  for (const entry of data.stacks) {
    if (typeof entry !== 'string') {
      throw new Error(`Invalid stack entry: ${entry} (must be string)`);
    }
    const match = entry.match(/^([^@]+)@(\d+)$/);
    if (!match) {
      throw new Error(`Invalid stack format: ${entry} (must be name@major)`);
    }
    const [, name, major] = match;
    map[name] = parseInt(major, 10);
  }
  
  return { ...data, stacks: map };
}

async function main() {
  const fixtureFiles = await walk(join(repoRoot, 'fixtures'));
  let migrated = 0;
  
  for (const file of fixtureFiles) {
    const raw = await readFile(file, 'utf8');
    const data = JSON.parse(raw);
    
    if (Array.isArray(data.stacks)) {
      const migratedData = migrateStacks(data);
      await writeFile(file, JSON.stringify(migratedData, null, 2) + '\n', 'utf8');
      console.log(`Migrated: ${file}`);
      migrated++;
    }
  }
  
  console.log(`\nMigrated ${migrated} fixture file(s) to stacks map format.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

