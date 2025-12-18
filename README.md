# Soustack Spec

This repository defines the canonical Soustack specification with a single JSON Schema entrypoint and composable stacks. 

## Layout
- `soustack.schema.json` — canonical schema entrypoint (draft 2020-12)
- `defs/` — shared primitives (quantity, duration, temperature, common helpers)
- `stacks/` — stack-specific schema fragments (quantified, structured, timed, referenced, compute claim, storage, dietary, substitutions, techniques, illustrated)
- `fixtures/` — golden fixtures grouped by `level/`, `stacks/`, and `content/`
- `scripts/` — conformance tooling (`validate-fixtures.mjs`, `guard-no-legacy.mjs`)
- `.github/workflows/validate.yml` — CI runner

## Levels and stacks
- **Levels**: `lite` keeps ingredient/step formats flexible. `base` must provide `yield.amount > 0`, `yield.unit`, and `time.total.minutes > 0`.
- **Stacks**: enable domain-specific guarantees. For example, `quantified` forces ingredient objects with quantities, `structured` forces step objects, `timed` adds timing payloads, and `referenced` wires steps to ingredient IDs. `compute` is only a claim: conformance asserts `level=base` plus both `quantified` and `timed` stacks.

## Running checks
Install dependencies once:
```bash
npm ci
```

Validate fixtures and the legacy guard together:
```bash
npm test
```

`npm test` will fail if any fixture violates the schema, the semantic conformance rules, or if legacy terminology/directories appear anywhere in the repo.
