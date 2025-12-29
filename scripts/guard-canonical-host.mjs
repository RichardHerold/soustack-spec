#!/usr/bin/env node
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';

const OLD_HOST = 'https://soustack.spec/';
const TARGET_PATHS = [
  'soustack.schema.json',
  'defs',
  'stacks',
  'fixtures',
  'SPEC.md',
  'README.md'
];

async function walk(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function checkFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    if (content.includes(OLD_HOST)) {
      return true;
    }
  } catch (err) {
    // Skip files that can't be read (e.g., binary files)
    if (err.code !== 'EISDIR') {
      console.warn(`Warning: Could not read ${filePath}: ${err.message}`);
    }
  }
  return false;
}

async function main() {
  const violations = [];
  const repoRoot = process.cwd();

  for (const target of TARGET_PATHS) {
    const fullPath = join(repoRoot, target);
    try {
      const stats = await stat(fullPath);
      if (stats.isDirectory()) {
        const files = await walk(fullPath);
        for (const file of files) {
          if (await checkFile(file)) {
            violations.push(file);
          }
        }
      } else if (stats.isFile()) {
        if (await checkFile(fullPath)) {
          violations.push(fullPath);
        }
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.warn(`Warning: Could not access ${target}: ${err.message}`);
      }
      // Skip missing files/directories (e.g., README.md might not exist)
    }
  }

  if (violations.length > 0) {
    console.error('Guard failed: Found legacy host references:');
    for (const file of violations) {
      console.error(`  - ${file}`);
    }
    console.error(`\nAll references to "${OLD_HOST}" must be migrated to "https://spec.soustack.org/"`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

