# AGENTS.md — soustack-spec

## Mission
This repo is the **normative Soustack specification**: JSON Schemas, profile + stack contracts, registry, and conformance fixtures.
It is not a runtime library. Runtime behavior belongs in soustack-core.

## What to optimize for
- Deterministic, reviewable changes to the contract.
- Backwards compatibility by default; breaking changes must be deliberate and versioned.
- High signal fixtures: they are the spec’s executable truth.

## Key artifacts
- `soustack.schema.json` — root schema.
- `stacks/registry.json` — authoritative profiles + stacks dependency graph and schema/doc paths.
- `defs/` + `stacks/*.schema.json` — component schemas.
- `fixtures/` — valid/invalid test vectors (normative).
- `scripts/` — registry validation, fixture validation, schema gating generation, docs sync.

## Commands (expected to work)
- `npm test` (alias for full verify)
- `npm run verify` (version + registry + stack docs + refs + legacy guard + fixtures + generated cleanliness)
- `npm run build:schemas` (regenerates stack gating rules into root schema)
- `npm run docs:sync` (updates README/SPEC tables from registry)
- `npm run validate` (validate fixtures)

## Change rules (very important)
1. **Registry first**: if you add/rename stacks or profiles, update `stacks/registry.json` first.
2. **Schema gating must be regenerated** when registry or stack schemas change:
   - Run: `npm run build:schemas && npm run docs:sync`
   - Ensure git is clean afterward (generated files committed).
3. **Fixtures are normative**:
   - For every new rule, add at least one `.valid.` and one `.invalid.` fixture.
4. **No legacy regression**:
   - Do not reintroduce legacy stack formats or deprecated shapes.
5. Prefer additive, monotonic changes. If breaking is required:
   - bump the relevant stack major (e.g., `timed@2`), do not mutate `timed@1`.

## Style conventions
- Keep schemas small, composable, and referenced via `$ref`.
- Keep `additionalProperties: false` where possible, and use `patternProperties` for `^x-` extension lanes.
- Use deterministic ordering for registry tables and generated content.

## PR checklist
- [ ] `npm test` passes
- [ ] `npm run verify:registry` passes (no missing deps, no cycles)
- [ ] `npm run check-refs` passes (all schemas compile)
- [ ] `npm run validate` passes (fixtures match expectations)
- [ ] Generated outputs are committed (no dirty state after `build:schemas` + `docs:sync`)
