#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const ajv = new Ajv2020({ strict: false, allErrors: true, allowUnionTypes: true });
addFormats(ajv);

async function listSchemas() {
  const schemaFiles = [];
  for (const dir of ['defs', 'stacks', 'schemas']) {
    try {
      const entries = await readdir(dir);
      for (const entry of entries) {
        if (entry.endsWith('.json') && entry !== 'registry.json') {
          schemaFiles.push(join(dir, entry));
        }
      }
    } catch {
      // Directory doesn't exist, skip
    }
  }
  schemaFiles.push('soustack.schema.json');
  return schemaFiles;
}

async function loadSchemas(paths) {
  const loaded = [];
  for (const file of paths) {
    const json = JSON.parse(await readFile(file, 'utf8'));
    const id = json.$id || file;
    ajv.addSchema(json, id);
    loaded.push({ id, schema: json });
  }
  return loaded;
}

async function main() {
  const paths = await listSchemas();
  const schemas = await loadSchemas(paths);
  let failures = 0;

  for (const { id, schema } of schemas) {
    try {
      ajv.compile(schema);
    } catch (err) {
      failures++;
      console.error(`Failed to compile schema: ${id}`);
      if (err instanceof Error) {
        console.error(err.message);
        if (err.errors) console.error(err.errors);
      }
    }
  }

  if (failures > 0) {
    console.error(`Schema reference check failed for ${failures} file(s).`);
    process.exit(1);
  }

  console.log('All schemas compiled successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
