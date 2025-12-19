#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

function generateProfilesTable(registry) {
  const rows = [];
  rows.push('| Profile | Requires Profiles | Requires Stacks | Description |');
  rows.push('| ------- | ---------------- | -------------- | ----------- |');
  
  // Sort profiles for deterministic output
  const profileIds = Object.keys(registry.profiles).sort();
  
  for (const id of profileIds) {
    const profile = registry.profiles[id];
    const requiresProfiles = (profile.requiresProfiles || []).length > 0 
      ? profile.requiresProfiles.join(', ') 
      : '—';
    const requiresStacks = (profile.requiresStacks || []).length > 0 
      ? profile.requiresStacks.join(', ') 
      : '—';
    rows.push(`| **${profile.title}** | ${requiresProfiles} | ${requiresStacks} | ${profile.description} |`);
  }
  
  return rows.join('\n');
}

function generateStacksTable(registry) {
  const rows = [];
  rows.push('| Stack ID | Latest Major | Requires | Profile | Schema | Docs |');
  rows.push('| -------- | ----------- | -------- | ------- | ------ | ---- |');
  
  // Sort stacks alphabetically for deterministic output
  const stackIds = Object.keys(registry.stacks).sort();
  
  for (const id of stackIds) {
    const stack = registry.stacks[id];
    const requires = stack.requires.length > 0 ? stack.requires.join(', ') : '—';
    const schemaPath = stack.schema.major[String(stack.latestMajor)] || '—';
    const docPath = stack.docs?.major?.[String(stack.latestMajor)] || '—';
    rows.push(`| **${id}** | ${stack.latestMajor} | ${requires} | ${stack.profile} | \`${schemaPath}\` | ${docPath !== '—' ? `\`${docPath}\`` : '—'} |`);
  }
  
  return rows.join('\n');
}

function insertContent(content, markerBegin, markerEnd, newContent) {
  const beginIdx = content.indexOf(markerBegin);
  const endIdx = content.indexOf(markerEnd);
  
  if (beginIdx === -1 || endIdx === -1) {
    throw new Error(`Could not find markers ${markerBegin} / ${markerEnd}`);
  }
  
  const before = content.substring(0, beginIdx + markerBegin.length);
  const after = content.substring(endIdx);
  
  return before + '\n\n' + newContent + '\n\n' + after;
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const readmePath = join(repoRoot, 'README.md');
  const specPath = join(repoRoot, 'SPEC.md');
  
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  
  const profilesTable = generateProfilesTable(registry);
  const stacksTable = generateStacksTable(registry);
  
  const combinedContent = `## Profiles\n\n${profilesTable}\n\n## Stacks\n\n${stacksTable}`;
  
  // Update README.md
  let readme = await readFile(readmePath, 'utf8');
  if (!readme.includes('<!-- BEGIN GENERATED: STACK REGISTRY -->')) {
    // Add markers if missing (append at end)
    readme += '\n\n<!-- BEGIN GENERATED: STACK REGISTRY -->\n<!-- END GENERATED: STACK REGISTRY -->\n';
  }
  readme = insertContent(readme, '<!-- BEGIN GENERATED: STACK REGISTRY -->', '<!-- END GENERATED: STACK REGISTRY -->', combinedContent);
  await writeFile(readmePath, readme, 'utf8');
  
  // Update SPEC.md
  let spec = await readFile(specPath, 'utf8');
  if (!spec.includes('<!-- BEGIN GENERATED: STACK REGISTRY -->')) {
    // Add markers if missing (append at end)
    spec += '\n\n<!-- BEGIN GENERATED: STACK REGISTRY -->\n<!-- END GENERATED: STACK REGISTRY -->\n';
  }
  spec = insertContent(spec, '<!-- BEGIN GENERATED: STACK REGISTRY -->', '<!-- END GENERATED: STACK REGISTRY -->', combinedContent);
  await writeFile(specPath, spec, 'utf8');
  
  console.log('Generated stack registry tables in README.md and SPEC.md');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

