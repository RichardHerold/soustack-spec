#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

function runCommand(cmd, cwd = repoRoot) {
  try {
    execSync(cmd, { cwd, stdio: 'inherit' });
  } catch (err) {
    throw new Error(`Command failed: ${cmd}`);
  }
}

function getGitStatus() {
  try {
    const output = execSync('git status --porcelain', { cwd: repoRoot, encoding: 'utf8' });
    return output.trim().split('\n').filter(line => line.trim());
  } catch (err) {
    // Not a git repo or git not available
    return [];
  }
}

async function main() {
  console.log('Running build:schemas...');
  runCommand('npm run build:schemas');
  
  console.log('Running docs:sync...');
  runCommand('npm run docs:sync');
  
  const changed = getGitStatus();
  
  if (changed.length > 0) {
    console.error('ERROR: Generated files are out of sync!');
    console.error('The following files have uncommitted changes:');
    changed.forEach(file => console.error(`  ${file}`));
    console.error('\nPlease run: npm run build:schemas && npm run docs:sync && git add -A && git commit');
    process.exit(1);
  }
  
  console.log('✓ All generated files are up to date.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

