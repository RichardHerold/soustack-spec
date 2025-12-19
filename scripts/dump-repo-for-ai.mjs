#!/usr/bin/env node
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative, normalize, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

// Default configuration
const DEFAULTS = {
  outputFile: 'repo-pack.md',
  maxFileKB: 500,
  maxTotalMB: 50,
};

// Binary file extensions to exclude
const BINARY_EXTENSIONS = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.bmp',
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  '.mp4', '.mp3', '.avi', '.mov', '.wav', '.ogg',
  '.zip', '.tar', '.gz', '.rar', '.7z',
  '.pdf', '.doc', '.docx', '.xls', '.xlsx',
  '.exe', '.dll', '.so', '.dylib',
  '.bin', '.dat',
]);

// Directories to always ignore
const IGNORED_DIRS = new Set([
  '.git',
  'node_modules',
  'dist',
  'build',
  '.next',
  '.cache',
  'coverage',
  '.nyc_output',
  '.vscode',
  '.idea',
  '.cursor',
]);

// Files to always ignore (by basename)
const IGNORED_FILES = new Set([
  '.DS_Store',
  'Thumbs.db',
  '.gitkeep',
]);

// Lock files to exclude by default
const LOCK_FILES = new Set([
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'Cargo.lock',
]);

/**
 * Parse CLI arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const config = { ...DEFAULTS };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--out' && i + 1 < args.length) {
      config.outputFile = args[++i];
    } else if (arg === '--maxFileKB' && i + 1 < args.length) {
      config.maxFileKB = parseInt(args[++i], 10);
      if (isNaN(config.maxFileKB) || config.maxFileKB <= 0) {
        throw new Error('--maxFileKB must be a positive number');
      }
    } else if (arg === '--maxTotalMB' && i + 1 < args.length) {
      config.maxTotalMB = parseInt(args[++i], 10);
      if (isNaN(config.maxTotalMB) || config.maxTotalMB <= 0) {
        throw new Error('--maxTotalMB must be a positive number');
      }
    } else if (arg === '--help' || arg === '-h') {
      console.log(`
Usage: node scripts/dump-repo-for-ai.mjs [options]

Options:
  --out <filename>        Output file (default: repo-pack.md)
  --maxFileKB <number>    Maximum file size in KB (default: 500)
  --maxTotalMB <number>   Maximum total output size in MB (default: 50)
  --help, -h              Show this help message
`);
      process.exit(0);
    }
  }

  return config;
}

/**
 * Parse ignore patterns from a file (best-effort .gitignore semantics)
 */
async function loadIgnorePatterns(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const patterns = [];
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      // Simple pattern matching (not full git semantics)
      // Remove leading ! (negation) and / (root anchor) for simplicity
      const pattern = trimmed.replace(/^!/, '').replace(/^\//, '');
      if (pattern) {
        patterns.push(pattern);
      }
    }
    return patterns;
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

/**
 * Check if a path matches any ignore pattern
 */
function matchesPattern(path, patterns) {
  const normalizedPath = path.replace(/\\/g, '/');
  for (const pattern of patterns) {
    // Simple glob matching: * and **
    const regex = new RegExp(
      '^' +
      pattern
        .replace(/\./g, '\\.')
        .replace(/\*\*/g, '.*')
        .replace(/\*/g, '[^/]*') +
      '$'
    );
    if (regex.test(normalizedPath) || normalizedPath.includes(pattern)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if a file should be ignored
 */
function shouldIgnoreFile(relPath, ignorePatterns) {
  const basename = relPath.split(sep).pop();
  
  // Check ignored files by name
  if (IGNORED_FILES.has(basename)) {
    return true;
  }
  
  // Check lock files
  if (LOCK_FILES.has(basename)) {
    return true;
  }

  // Check binary extensions
  const ext = relPath.toLowerCase().substring(relPath.lastIndexOf('.'));
  if (BINARY_EXTENSIONS.has(ext)) {
    return true;
  }

  // Check ignore patterns
  if (matchesPattern(relPath, ignorePatterns)) {
    return true;
  }

  return false;
}

/**
 * Check if a directory should be ignored
 */
function shouldIgnoreDir(dirName, ignorePatterns) {
  if (IGNORED_DIRS.has(dirName)) {
    return true;
  }
  return matchesPattern(dirName, ignorePatterns);
}

/**
 * Check if a file is likely text/UTF-8
 */
async function isTextFile(filePath) {
  try {
    const buffer = await readFile(filePath);
    // Try to decode as UTF-8
    const text = buffer.toString('utf8');
    // Check if it's valid UTF-8 by re-encoding
    Buffer.from(text, 'utf8');
    return true;
  } catch {
    return false;
  }
}

/**
 * Get git metadata (best effort)
 */
function getGitMetadata() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    
    const sha = execSync('git rev-parse HEAD', {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    
    let dirty = false;
    try {
      execSync('git diff --quiet HEAD', {
        cwd: repoRoot,
        stdio: ['ignore', 'pipe', 'ignore'],
      });
    } catch {
      dirty = true;
    }
    
    return { branch, sha, dirty };
  } catch {
    return null;
  }
}

/**
 * Calculate SHA256 hash of file content
 */
function sha256(content) {
  return createHash('sha256').update(content, 'utf8').digest('hex');
}

/**
 * Recursively walk directory and collect files
 */
async function walkDirectory(dirPath, ignorePatterns, maxFileKB, maxTotalMB) {
  const files = [];
  const skipped = [];
  let totalBytes = 0;
  const maxTotalBytes = maxTotalMB * 1024 * 1024;
  const maxFileBytes = maxFileKB * 1024;

  async function walk(currentPath) {
    const entries = await readdir(currentPath, { withFileTypes: true });
    
    // Sort for deterministic ordering
    entries.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    for (const entry of entries) {
      const fullPath = join(currentPath, entry.name);
      const relPath = relative(repoRoot, fullPath).replace(/\\/g, '/');

      if (entry.isDirectory()) {
        // Check if directory name or any part of the path should be ignored
        const pathParts = relPath.split('/');
        const shouldIgnore = shouldIgnoreDir(entry.name, ignorePatterns) ||
          pathParts.some(part => shouldIgnoreDir(part, ignorePatterns));
        if (!shouldIgnore) {
          await walk(fullPath);
        }
      } else if (entry.isFile()) {
        // Check size limit before reading
        const stats = await stat(fullPath);
        const fileSize = stats.size;

        if (fileSize > maxFileBytes) {
          skipped.push({
            path: relPath,
            reason: `exceeds maxFileKB (${Math.round(fileSize / 1024)}KB > ${maxFileKB}KB)`,
          });
          continue;
        }

        if (totalBytes + fileSize > maxTotalBytes) {
          skipped.push({
            path: relPath,
            reason: `would exceed maxTotalMB limit`,
          });
          continue;
        }

        if (shouldIgnoreFile(relPath, ignorePatterns)) {
          skipped.push({
            path: relPath,
            reason: 'matches ignore pattern or binary extension',
          });
          continue;
        }

        if (!(await isTextFile(fullPath))) {
          skipped.push({
            path: relPath,
            reason: 'not valid UTF-8 text',
          });
          continue;
        }

        try {
          const content = await readFile(fullPath, 'utf8');
          files.push({
            path: relPath,
            content,
            size: fileSize,
          });
          totalBytes += fileSize;
        } catch (err) {
          skipped.push({
            path: relPath,
            reason: `read error: ${err.message}`,
          });
        }
      }
    }
  }

  await walk(dirPath);

  // Sort files by path for deterministic output
  files.sort((a, b) => {
    if (a.path < b.path) return -1;
    if (a.path > b.path) return 1;
    return 0;
  });

  return { files, skipped, totalBytes };
}

/**
 * Generate file tree section
 */
function generateFileTree(files) {
  const tree = files.map(f => f.path).join('\n');
  return tree;
}

/**
 * Generate files section
 */
function generateFilesSection(files) {
  const sections = [];
  for (const file of files) {
    const hash = sha256(file.content);
    sections.push(`### FILE: \`${file.path}\`

* bytes: ${file.size}
* sha256: ${hash}

\`\`\`
${file.content}
\`\`\`
`);
  }
  return sections.join('\n');
}

/**
 * Generate summary section
 */
function generateSummary(files, skipped, totalBytes) {
  const reasonCounts = new Map();
  for (const item of skipped) {
    const reason = item.reason.split(':')[0]; // Get main reason
    reasonCounts.set(reason, (reasonCounts.get(reason) || 0) + 1);
  }

  const topReasons = Array.from(reasonCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([reason, count]) => `* ${reason}: ${count} file(s)`);

  const skippedSample = skipped.slice(0, 20).map(
    item => `* \`${item.path}\`: ${item.reason}`
  );

  return `## Summary

Included files: ${files.length}
Skipped files: ${skipped.length}
Total included bytes: ${totalBytes}

### Skipped (top reasons)

${topReasons.join('\n')}

${skipped.length > 0 ? `\n### Skipped (sample)\n\n${skippedSample.join('\n')}` : ''}
`;
}

/**
 * Main function
 */
async function main() {
  const config = parseArgs();
  
  console.error('Loading ignore patterns...');
  const gitignorePatterns = await loadIgnorePatterns(join(repoRoot, '.gitignore'));
  const repoPackIgnorePatterns = await loadIgnorePatterns(join(repoRoot, '.repo-pack-ignore'));
  const allIgnorePatterns = [...gitignorePatterns, ...repoPackIgnorePatterns];

  console.error('Walking repository...');
  const { files, skipped, totalBytes } = await walkDirectory(
    repoRoot,
    allIgnorePatterns,
    config.maxFileKB,
    config.maxTotalMB
  );

  console.error(`Found ${files.length} files to include, ${skipped.length} skipped`);

  const gitInfo = getGitMetadata();
  const repoName = repoRoot.split(sep).pop() || 'repository';
  const timestamp = new Date().toISOString();

  const fileTree = generateFileTree(files);
  const filesSection = generateFilesSection(files);
  const summary = generateSummary(files, skipped, totalBytes);

  const gitLine = gitInfo
    ? `Git: branch=${gitInfo.branch} sha=${gitInfo.sha} dirty=${gitInfo.dirty}`
    : 'Git: (not available)';

  const output = `# Repo Pack: ${repoName}
Generated: ${timestamp}
${gitLine}
Limits: maxFileKB=${config.maxFileKB}, maxTotalMB=${config.maxTotalMB}

## File Tree (paths)
\`\`\`text
${fileTree}
\`\`\`

## Files (contents)

${filesSection}

${summary}
`;

  const outputPath = join(repoRoot, config.outputFile);
  await writeFile(outputPath, output, 'utf8');
  
  console.error(`\n✓ Repo pack written to: ${config.outputFile}`);
  console.error(`  Included: ${files.length} files (${Math.round(totalBytes / 1024)}KB)`);
  console.error(`  Skipped: ${skipped.length} files`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});

