# Soustack Specification (Normative)

## Levels
- **lite**: MUST include `level`, `stacks`, `name`, `ingredients`, and `instructions`. MAY omit `yield` and `time`. Ingredients and instructions MAY be strings or objects unless stacks override.
- **base**: MUST include `yield.amount > 0`, `yield.unit` (non-empty), and `time.total.minutes > 0`. All other lite rules apply.

## Canonical entrypoint
- The only schema entrypoint is `soustack.schema.json` (JSON Schema 2020-12).
- Top-level MAY include `metadata` and any `x-*` extension properties. All other properties are closed via `unevaluatedProperties: false`.
- Optional top-level collections used by stacks: `images`, `videos`, `dietary`, `storage`, `substitutions`, `techniques`, `temperatures`.

## Stack rules
- **quantified**: Ingredients MUST be objects (not strings) and MUST include `id`, `name`, and `quantity.amount` + `quantity.unit`.
- **structured**: Instructions MUST be step objects (or sections containing steps). Each step MUST include `id` and `text`. `dependsOn` MUST resolve to existing steps and form a DAG.
- **timed**: Extends structured and MUST also list the `structured` stack. Each step MUST include `timing.activity` and `timing.duration` (either exact `minutes` or range `minMinutes` + `maxMinutes` with `min <= max`). MAY include `timing.completionCue`.
- **referenced**: Requires structured and MUST list the `structured` stack. Ingredients MUST include `id` and `name` (quantity optional). Steps MUST include `inputs` (string array, min 1) that resolve to ingredient IDs.
- **compute**: Pure claim. Conformance MUST assert `level=base` with both `quantified` and `timed` stacks (timed already implies structured) and the stack list MUST include those dependencies.
- **temperature**: When temperature objects appear, they MUST use the `target` enum (`oven`, `stovetop`, `pan`, `oil`, `water`, `grill`, `broiler`, `internal`, `ambient`, `surface`) and temperature levels (`veryLow`, `low`, `medium`, `mediumHigh`, `high`, `veryHigh`). Presence is optional.
- **storage**: Storage block MUST exist. At least one of `roomTemp`, `refrigerated`, or `frozen` MUST appear. Each method MUST include `duration.iso8601`.
- **dietary**: Dietary block MUST exist. `basis` MUST be `perServing` or `perRecipe`. At least one signal MUST appear among calories, macros, diets, or allergens.
- **substitutions**: `substitutions` MUST be non-empty. Each entry MUST include `for` and `alternatives[]`. Each alternative MUST include `name` and `ratio`.
- **techniques**: Techniques glossary MUST be non-empty with `id` values. Any `techniqueIds` on steps MUST resolve to the glossary.
- **illustrated**: At least one media URI MUST appear in `images`/`videos` at the recipe level or inside steps/sections. HTTPS is not required.

## Conformance
- `scripts/validate-fixtures.mjs` is the reference runner. It MUST:
  - Validate fixtures against `soustack.schema.json`.
  - Enforce semantic checks: unique ingredient IDs, unique step IDs, resolved and acyclic `dependsOn`, resolved `inputs`, `timed` ranges with `min<=max`, `compute` prerequisites, illustrated media presence, dietary signals, storage ISO-like durations, and technique resolution.
  - Compare validation results to fixture filenames: `.valid.` MUST pass; `.invalid.` MUST fail.
- `scripts/guard-no-legacy.mjs` MUST fail if any legacy terms or directories appear.
