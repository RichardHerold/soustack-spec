
# Soustack Specification

**Soustack** is an open standard for representing recipes as **structured, interoperable, and computational data**.

The goal of Soustack is **universal adoption**: recipes should be publishable with minimal friction, while enabling progressively more powerful capabilities such as scaling, timing, scheduling, and rich UI rendering.

This repository defines the **normative specification**:

* JSON Schemas
* Profiles (adoption levels)
* Stack contracts
* Conformance rules
* Validation fixtures

Runtime behavior lives in **soustack-core**.
UI and integrations live in **Soustack Blocks**.

---

## What Soustack Is (and Is Not)

**Soustack is:**

* A stable, versioned recipe data standard
* Designed for incremental adoption
* Built to support *computational* recipes (not just descriptive ones)
* The source of truth for validation and conformance

**Soustack is not:**

* A recipe app
* A hosted service
* A runtime library
* A CMS or database schema

> **The format is the product.** Everything else is derived.

---

## Adoption Philosophy

Soustack is designed around **incremental compliance**, not all-or-nothing adoption.

A site should be able to:

* start by publishing minimal Soustack JSON
* gain immediate value (e.g. embeds, scaling)
* progressively add structure without rewriting content

This is achieved through **Profiles** and **Stacks**.

---

## Profiles (Public Contract)

**Profiles** are the human-facing compatibility levels a publisher or consumer can claim.

Examples:

* “We publish **Base** Soustack”
* “This site supports **Scalable** recipes”
* “Our embed works for **Schedulable** recipes”

Profiles define:

* what fields must exist
* what guarantees consumers can rely on

Profiles are defined normatively in **SPEC.md**.

### Common Profiles

| Profile                       | Purpose                                |
| ----------------------------- | -------------------------------------- |
| Lite                          | Lowest-friction publishing             |
| Base                          | Minimum cookable baseline              |
| Structured                    | Stable IDs and sections                |
| Referenced                    | Steps explicitly reference ingredients |
| Timed                         | Step-level timing                      |
| Schedulable                   | Dependency graph + timing              |
| Quantified                    | Machine-readable quantities            |
| Scalable                      | Interoperable scaling rules            |
| Illustrated / Nutrition / Dietary / Storage | Optional enrichment                    |

---

## Stacks (Enforcement Mechanism)

**Stacks** are the composable capability contracts that implement profiles.

They:

* activate additional schema and semantic rules
* are declared explicitly in recipe documents
* are versioned independently

Example:

```json
{
  "level": "base",
  "stacks": ["quantified@1", "scaling@1"]
}
```

Stacks are **machine-facing**.
Profiles are **human-facing**.

---

## Stack Versioning (`@1`)

Stacks are versioned using the syntax:

```
<stack-name>@<major>
```

Example:

* `quantified@1`
* `scaling@1`
* `timed@1`

### Important Rules

* **`@1` appears only in stack declarations and contract names**
* Schema filenames are **version-agnostic**
* Schema `$id`s are **version-agnostic**
* `$ref`s are **version-agnostic**

Versioning applies to the **contract**, not the implementation file.

This allows:

* safe evolution of stack semantics
* future `@2` stacks without breaking existing recipes
* stable schema paths for tooling

---

## Scaling (Why Soustack Exists)

Soustack explicitly supports **interoperable recipe scaling**, including cases where simple multipliers fail.

The `scaling@1` stack standardizes:

* linear scaling
* fixed ingredients
* discrete items (e.g. eggs)
* “to taste” quantities
* baker’s percentages

This ensures two independent implementations scale the same recipe the same way.

Scaling semantics are defined normatively in the spec and implemented in **soustack-core**.

---

## Repository Structure

```
.
├── soustack.schema.json      # Root schema
├── SPEC.md                   # Normative specification
├── README.md                 # This file
├── defs/                     # Reusable schema definitions
├── stacks/                   # Stack schemas (version-agnostic filenames)
├── fixtures/                 # Valid/invalid conformance fixtures
├── scripts/                  # Validation & policy scripts
└── .github/workflows/        # CI validation
```

---

## Validation & Conformance

This repository provides:

* JSON Schema validation
* semantic validation (DAGs, references, scaling rules)
* fixtures that define expected behavior

### Local Validation

```bash
npm install
npm test
```

This runs:

1. policy guards
2. schema reference resolution
3. fixture validation

If `npm test` passes, the spec is internally consistent.

---

## Relationship to Other Repos

* **soustack-spec**
  The authoritative definition of the standard.

* **soustack-core**
  Runtime implementation: validation, scaling, Schema.org conversion, scraping.

* **Soustack Blocks**
  UI and integration packages that drive adoption:

  * embeds
  * web components
  * CMS/framework adapters
  * conformance badges

The spec is the source of truth. All other repos consume it.

---

## Stability Guarantees

* Backwards-compatible evolution is preferred
* Breaking changes require a new major stack version (`@2`)
* Existing stack contracts (`@1`) will not be silently broken
* Migration and canonicalization belong in **soustack-core**, not the spec

---

## Contributing

Contributions should:

* preserve incremental adoption
* avoid adding complexity to Lite/Base
* respect stack versioning rules
* include fixtures for new behavior

If in doubt, **opt for clarity over cleverness**.

---

## License

MIT


<!-- BEGIN GENERATED: STACK REGISTRY -->

## Profiles

| Profile | Requires Profiles | Requires Stacks | Description |
| ------- | ---------------- | -------------- | ----------- |
| **Base** | — | — | name, ingredients, instructions |
| **Equipped** | lite | equipment | Recipe declares required tools/equipment. |
| **Illustrated** | lite | illustrated | Media present |
| **Lite** | base | — | Minimal publishable recipe |
| **Prepped** | lite | prep | Recipe includes prep guidance and/or mise en place tasks. |
| **Scalable** | lite | quantified, scaling | Quantified + scaling |
| **Timed** | lite | structured, timed | Structured + timed |

## Stacks

| Stack ID | Latest Major | Requires | Profile | Schema | Docs |
| -------- | ----------- | -------- | ------- | ------ | ---- |
| **compute** | 1 | quantified, timed | lite | `stacks/compute.schema.json` | — |
| **dietary** | 1 | — | lite | `stacks/dietary.schema.json` | — |
| **equipment** | 1 | — | lite | `stacks/equipment.schema.json` | `stacks/equipment@1.md` |
| **illustrated** | 1 | — | illustrated | `stacks/illustrated.schema.json` | — |
| **prep** | 1 | — | lite | `stacks/prep.schema.json` | `stacks/prep@1.md` |
| **quantified** | 1 | — | scalable | `stacks/quantified.schema.json` | — |
| **referenced** | 1 | structured | timed | `stacks/referenced.schema.json` | — |
| **scaling** | 1 | quantified | scalable | `stacks/scaling.schema.json` | `stacks/scaling@1.md` |
| **storage** | 1 | — | lite | `stacks/storage.schema.json` | — |
| **structured** | 1 | — | timed | `stacks/structured.schema.json` | — |
| **substitutions** | 1 | referenced | lite | `stacks/substitutions.schema.json` | — |
| **techniques** | 1 | — | lite | `stacks/techniques.schema.json` | — |
| **timed** | 1 | structured | timed | `stacks/timed.schema.json` | — |

<!-- END GENERATED: STACK REGISTRY -->
