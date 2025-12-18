# Soustack Specification (Normative)

## Levels
- **lite**: MUST include `level`, `stacks`, `name`, `ingredients`, and `instructions`. MAY omit `yield` and `time`. Ingredients and instructions MAY be strings or objects unless stacks override. Sections at the lite level MAY also contain strings or nested sections.
- **base**: MUST include `yield.amount > 0`, `yield.unit` (non-empty), and `time.total.minutes > 0`. All other lite rules apply.

## Canonical entrypoint
- The only schema entrypoint is `soustack.schema.json` (JSON Schema 2020-12). Instance `$schema` is optional; when present it MUST be `https://soustack.spec/soustack.schema.json`.
- Top-level MAY include `metadata` and any `x-*` extension properties. Nested objects (ingredients, steps, sections, techniques, substitutions, storage methods, quantities, durations, etc.) MAY also carry `metadata` and `x-*` lanes while remaining otherwise closed.
- Optional top-level collections used by stacks: `images`, `videos`, `dietary`, `storage`, `substitutions`, `techniques`.
- `temperature` is a supported primitive on steps and ingredients; when present it MUST follow the schema’s allowed targets and qualitative or numeric shapes.
- Stack identifiers are a closed Soustack vocabulary. Future namespacing (for example, `soustack:timed`) remains a compatible option without changing current IDs.

## Stack rules
- **quantified**: Ingredients MUST be objects (not strings) and MUST include `id`, `name`, and `quantity.amount` + `quantity.unit`.
- **structured**: Instructions MUST be step objects (or sections containing steps). Each step MUST include `id` and `text`. `dependsOn` MUST resolve to existing steps and form a DAG.
- **timed**: Extends structured. Each step MUST include `timing.activity` (`active` or `passive`) and EITHER `timing.duration` (exact `minutes` or range `minMinutes` + `maxMinutes` with `min <= max`) OR `timing.completionCue` (or both).
- **referenced**: Requires structured semantics. Ingredients MUST include `id` and `name` (quantity optional). Steps MUST include `inputs` (string array, min 1) that resolve to ingredient IDs.
- **compute**: Pure claim. Conformance MUST assert `level=base` with both `quantified` and `timed` stacks (timed already implies structured) and the stack list MUST include those dependencies.
- **storage**: Storage block MUST exist. At least one of `roomTemp`, `refrigerated`, or `frozen` MUST appear. Each method MUST include `duration.iso8601`.
- **dietary**: Dietary block MUST exist. `basis` MUST be `perServing` or `perRecipe`. At least one signal MUST appear among calories, macros, diets, or allergens.
- **substitutions**: `substitutions` MUST be non-empty. Each entry MUST include `for` and `alternatives[]`. Each alternative MUST include `name` and `ratio`.
- **techniques**: Techniques glossary MUST be non-empty with `id` values. Any `techniqueIds` on steps MUST resolve to the glossary.
- **illustrated**: At least one media URI MUST appear in `images`/`videos` at the recipe level or inside steps/sections. HTTPS is not required; schema enforcement defers to conformance checks.

## Conformance
- `scripts/validate-fixtures.mjs` is the reference runner. It MUST:
  - Validate fixtures against `soustack.schema.json`.
  - Enforce semantic checks: unique ingredient IDs, unique step IDs, resolved and acyclic `dependsOn`, resolved `inputs`, `timed` ranges with `min<=max`, `compute` prerequisites, illustrated media presence, dietary signals, storage ISO-like durations, and technique resolution.
  - Compare validation results to fixture filenames: `.valid.` MUST pass; `.invalid.` MUST fail.
- `scripts/guard-no-legacy.mjs` MUST fail if any legacy terms or directories appear.
