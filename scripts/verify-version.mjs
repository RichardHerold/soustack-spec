import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { SOUSTACK_SPEC_VERSION } from "../src/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const [packageJson, versionFile] = await Promise.all([
  readFile(path.join(rootDir, "package.json"), "utf8"),
  readFile(path.join(rootDir, "SOUSTACK_SPEC_VERSION"), "utf8"),
]);

const packageVersion = JSON.parse(packageJson).version;
const specVersion = versionFile.trim();

assert.equal(
  SOUSTACK_SPEC_VERSION,
  packageVersion,
  "SOUSTACK_SPEC_VERSION should match package.json version"
);
assert.equal(
  SOUSTACK_SPEC_VERSION,
  specVersion,
  "SOUSTACK_SPEC_VERSION should match SOUSTACK_SPEC_VERSION file"
);
