#!/usr/bin/env node
import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));

  const missing = [];

  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    // Skip vendor stacks (x- prefix)
    if (stackId.startsWith('x-')) {
      continue;
    }

    // Check all majors in schema.major, or at least latestMajor
    const majorsToCheck = new Set();
    if (stack.schema?.major) {
      for (const major of Object.keys(stack.schema.major)) {
        majorsToCheck.add(major);
      }
    }
    // Also check latestMajor if it exists
    if (stack.latestMajor) {
      majorsToCheck.add(String(stack.latestMajor));
    }

    for (const major of majorsToCheck) {
      const expectedDocPath = `stacks/${stackId}@${major}.md`;
      const fullPath = join(repoRoot, expectedDocPath);

      if (!(await fileExists(fullPath))) {
        missing.push({
          stackId,
          major,
          expectedPath: expectedDocPath
        });
      }
    }
  }

  if (missing.length > 0) {
    console.error('Missing stack documentation files:');
    for (const { stackId, major, expectedPath } of missing) {
      console.error(`  ${expectedPath} (stack: ${stackId}@${major})`);
    }
    process.exit(1);
  }

  console.log('All stack documentation files present.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});



