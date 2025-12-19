# Repo Pack: soustack-spec
Generated: 2025-12-19T21:24:51.203Z
Git: branch=main sha=a6582b66a868ee260d55c132804da4fe908f7b64 dirty=false
Limits: maxFileKB=500, maxTotalMB=50

## File Tree (paths)
```text
.cursorrules
.github/workflows/validate.yml
LICENSE
README.md
SPEC.md
defs/common.schema.json
defs/duration.schema.json
defs/entities.schema.json
defs/ingredientQuantified.schema.json
defs/quantity.schema.json
defs/scalingRule.schema.json
defs/temperature.schema.json
fixtures/content/illustrated-step.valid.json
fixtures/invalid/equipment-unknown-reference.invalid.json
fixtures/invalid/mise-en-place-unknown-equipment.invalid.json
fixtures/invalid/mise-en-place-unknown-input.invalid.json
fixtures/invalid/storage-leftovers-missing-method.invalid.json
fixtures/invalid/storage-leftovers-wrong-type.invalid.json
fixtures/level/base-full.valid.json
fixtures/level/base-missing-yield.invalid.json
fixtures/level/lite-min.valid.json
fixtures/profile/profile-base.valid.json
fixtures/profile/profile-lite.valid.json
fixtures/profile/profile-scalable-missing-scaling.invalid.json
fixtures/profile/profile-scalable.valid.json
fixtures/profile/profile-timed-missing-structured.invalid.json
fixtures/scaling/bakers-percent-missing-ref.invalid.json
fixtures/scaling/bakers-percent.valid.json
fixtures/scaling/discrete-range.invalid.json
fixtures/scaling/missing-quantified.invalid.json
fixtures/scaling/reject-bakersPercentage.invalid.json
fixtures/stacks/compute-missing-timed.invalid.json
fixtures/stacks/dietary-no-signal.invalid.json
fixtures/stacks/illustrated-empty.invalid.json
fixtures/stacks/quantified-string.invalid.json
fixtures/stacks/referenced-missing-input.invalid.json
fixtures/stacks/storage-min.valid.json
fixtures/stacks/storage-no-duration.invalid.json
fixtures/stacks/timed-implies-structured.valid.json
fixtures/stacks/timed-range.invalid.json
fixtures/valid/equipment-scaling-rules.valid.json
fixtures/valid/equipment-strings.valid.json
fixtures/valid/equipment-structured-uses.valid.json
fixtures/valid/mise-en-place-basic.valid.json
fixtures/valid/mise-en-place-referenced-equipment.valid.json
fixtures/valid/prep-ingredient-strings.valid.json
fixtures/valid/prep-ingredient-structured.valid.json
fixtures/valid/profile-equipped.valid.json
fixtures/valid/profile-prepped.valid.json
fixtures/valid/quantified-nested-ingredient-sections.valid.json
fixtures/valid/referenced-scaling.valid.json
fixtures/valid/storage-leftovers-simple.valid.json
fixtures/valid/storage-leftovers-structured.valid.json
fixtures/valid/structured-nested-step-sections.valid.json
package.json
schemas/stacks-registry.schema.json
scripts/check-schema-refs.mjs
scripts/dump-repo-for-ai.mjs
scripts/generate-docs-from-registry.mjs
scripts/generate-stack-gating.mjs
scripts/guard-no-legacy.mjs
scripts/migrate-stacks-to-map.mjs
scripts/validate-fixtures.mjs
scripts/validate-registry.mjs
scripts/verify-generated-clean.mjs
scripts/verify-stack-docs.mjs
soustack.schema.json
stacks/compute.schema.json
stacks/compute@1.md
stacks/dietary.schema.json
stacks/dietary@1.md
stacks/equipment.schema.json
stacks/equipment@1.md
stacks/illustrated.schema.json
stacks/illustrated@1.md
stacks/prep.schema.json
stacks/prep@1.md
stacks/quantified.schema.json
stacks/quantified@1.md
stacks/referenced.schema.json
stacks/referenced@1.md
stacks/registry.json
stacks/scaling.schema.json
stacks/scaling@1.md
stacks/storage.schema.json
stacks/storage@1.md
stacks/structured.schema.json
stacks/structured@1.md
stacks/substitutions.schema.json
stacks/substitutions@1.md
stacks/techniques.schema.json
stacks/techniques@1.md
stacks/timed.schema.json
stacks/timed@1.md
test-repo-pack.md
```

## Files (contents)

### FILE: `.cursorrules`

* bytes: 3889
* sha256: d4da276b824cb03e3553d15d6a8112b87093096e501648f1052d8463e8881a09

```
{
    "project": "soustack-spec",
    "role": "This repository defines the normative Soustack JSON Schema and specification. Treat it as a standards body, not an application codebase.",
  
    "principles": [
      "The schema is the product. Stability and predictability override cleverness.",
      "Backward compatibility is mandatory unless a MAJOR version bump is explicitly requested.",
      "Examples and fixtures are conformance tests, not illustrative suggestions.",
      "If behavior is not described in SPEC.md, it does not exist."
    ],
  
    "hard_rules": [
      "DO NOT add new schema fields, enums, or definitions without explicit instruction.",
      "DO NOT rename existing fields, definitions, levels, or files unless explicitly requested.",
      "DO NOT loosen validation rules silently (e.g. removing required fields, changing types).",
      "DO NOT add vendor-specific logic, heuristics, or runtime behavior.",
      "DO NOT invent new levels or reinterpret existing ones.",
      "DO NOT modify $id URLs, version strings, or schema paths independently."
    ],
  
    "versioning": {
      "authoritative_source": "SOUSTACK_SPEC_VERSION",
      "rules": [
        "Any schema change must match the version in SOUSTACK_SPEC_VERSION.",
        "PATCH releases are documentation, examples, or fixture-only.",
        "MINOR releases may add optional fields or clarify levels or stacks.",
        "MAJOR releases are required for breaking changes."
      ]
    },
  
    "schema_editing_rules": [
      "Schemas target JSON Schema 2020-12.",
      "Preserve additionalProperties behavior exactly as defined.",
      "Use allOf / anyOf consistently with existing patterns.",
      "Do not refactor schema structure for aesthetics."
    ],

    "levels": {
      "definition": "Soustack levels are constraint layers on top of the same core schema.",
      "rules": [
        "Levels are lite and base only.",
        "Levels may only add requirements, never remove allowances."
      ]
    },

    "stacks": {
      "definition": "Stacks declare optional capability lanes on top of the level.",
      "vocabulary": [
        "quantified",
        "structured",
        "timed",
        "referenced",
        "compute",
        "dietary",
        "storage",
        "substitutions",
        "techniques",
        "illustrated"
      ],
      "notes": [
        "Temperature is a supported primitive on steps and ingredients, not a stack.",
        "Compute depends on quantified and timed; timed implies structured."
      ]
    },
  
    "examples_and_fixtures": {
      "rules": [
        "examples/ must always be valid.",
        "fixtures/valid must validate.",
        "fixtures/invalid must fail validation.",
        "Changing a fixture requires explaining the rule it proves."
      ]
    },
  
    "documentation": {
      "normative_files": [
        "SPEC.md",
        "soustack.schema.json",
        "SOUSTACK_SPEC_VERSION"
      ],
      "rules": [
        "SPEC.md is the source of truth for meaning.",
        "README.md and docs/ may explain but not redefine behavior.",
        "If schema and docs disagree, schema wins."
      ]
    },

    "conformance": {
      "rules": [
        "scripts/validate-fixtures.mjs and the fixtures directory define canonical enforcement.",
        "Keep conformance behavior aligned with schema and SPEC.md." 
      ]
    },

    "testing_expectations": [
      "Run npm run validate:all before proposing changes.",
      "Never assume tests will be updated to fit schema changes.",
      "Fix schema or docs, not tests, unless explicitly instructed."
    ],
  
    "ai_behavior_constraints": [
      "Prefer minimal diffs.",
      "Ask for clarification instead of guessing intent.",
      "Surface risks and compatibility impact before making changes.",
      "If unsure, do nothing and explain why."
    ]
  }
  
```

### FILE: `.github/workflows/validate.yml`

* bytes: 250
* sha256: 3324724b78bcb72975279c2919928e45a852ed92a5805a626fca4c1b34672f37

```
name: Validate

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test

```

### FILE: `LICENSE`

* bytes: 7048
* sha256: a2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499

```
Creative Commons Legal Code

CC0 1.0 Universal

    CREATIVE COMMONS CORPORATION IS NOT A LAW FIRM AND DOES NOT PROVIDE
    LEGAL SERVICES. DISTRIBUTION OF THIS DOCUMENT DOES NOT CREATE AN
    ATTORNEY-CLIENT RELATIONSHIP. CREATIVE COMMONS PROVIDES THIS
    INFORMATION ON AN "AS-IS" BASIS. CREATIVE COMMONS MAKES NO WARRANTIES
    REGARDING THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS
    PROVIDED HEREUNDER, AND DISCLAIMS LIABILITY FOR DAMAGES RESULTING FROM
    THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS PROVIDED
    HEREUNDER.

Statement of Purpose

The laws of most jurisdictions throughout the world automatically confer
exclusive Copyright and Related Rights (defined below) upon the creator
and subsequent owner(s) (each and all, an "owner") of an original work of
authorship and/or a database (each, a "Work").

Certain owners wish to permanently relinquish those rights to a Work for
the purpose of contributing to a commons of creative, cultural and
scientific works ("Commons") that the public can reliably and without fear
of later claims of infringement build upon, modify, incorporate in other
works, reuse and redistribute as freely as possible in any form whatsoever
and for any purposes, including without limitation commercial purposes.
These owners may contribute to the Commons to promote the ideal of a free
culture and the further production of creative, cultural and scientific
works, or to gain reputation or greater distribution for their Work in
part through the use and efforts of others.

For these and/or other purposes and motivations, and without any
expectation of additional consideration or compensation, the person
associating CC0 with a Work (the "Affirmer"), to the extent that he or she
is an owner of Copyright and Related Rights in the Work, voluntarily
elects to apply CC0 to the Work and publicly distribute the Work under its
terms, with knowledge of his or her Copyright and Related Rights in the
Work and the meaning and intended legal effect of CC0 on those rights.

1. Copyright and Related Rights. A Work made available under CC0 may be
protected by copyright and related or neighboring rights ("Copyright and
Related Rights"). Copyright and Related Rights include, but are not
limited to, the following:

  i. the right to reproduce, adapt, distribute, perform, display,
     communicate, and translate a Work;
 ii. moral rights retained by the original author(s) and/or performer(s);
iii. publicity and privacy rights pertaining to a person's image or
     likeness depicted in a Work;
 iv. rights protecting against unfair competition in regards to a Work,
     subject to the limitations in paragraph 4(a), below;
  v. rights protecting the extraction, dissemination, use and reuse of data
     in a Work;
 vi. database rights (such as those arising under Directive 96/9/EC of the
     European Parliament and of the Council of 11 March 1996 on the legal
     protection of databases, and under any national implementation
     thereof, including any amended or successor version of such
     directive); and
vii. other similar, equivalent or corresponding rights throughout the
     world based on applicable law or treaty, and any national
     implementations thereof.

2. Waiver. To the greatest extent permitted by, but not in contravention
of, applicable law, Affirmer hereby overtly, fully, permanently,
irrevocably and unconditionally waives, abandons, and surrenders all of
Affirmer's Copyright and Related Rights and associated claims and causes
of action, whether now known or unknown (including existing as well as
future claims and causes of action), in the Work (i) in all territories
worldwide, (ii) for the maximum duration provided by applicable law or
treaty (including future time extensions), (iii) in any current or future
medium and for any number of copies, and (iv) for any purpose whatsoever,
including without limitation commercial, advertising or promotional
purposes (the "Waiver"). Affirmer makes the Waiver for the benefit of each
member of the public at large and to the detriment of Affirmer's heirs and
successors, fully intending that such Waiver shall not be subject to
revocation, rescission, cancellation, termination, or any other legal or
equitable action to disrupt the quiet enjoyment of the Work by the public
as contemplated by Affirmer's express Statement of Purpose.

3. Public License Fallback. Should any part of the Waiver for any reason
be judged legally invalid or ineffective under applicable law, then the
Waiver shall be preserved to the maximum extent permitted taking into
account Affirmer's express Statement of Purpose. In addition, to the
extent the Waiver is so judged Affirmer hereby grants to each affected
person a royalty-free, non transferable, non sublicensable, non exclusive,
irrevocable and unconditional license to exercise Affirmer's Copyright and
Related Rights in the Work (i) in all territories worldwide, (ii) for the
maximum duration provided by applicable law or treaty (including future
time extensions), (iii) in any current or future medium and for any number
of copies, and (iv) for any purpose whatsoever, including without
limitation commercial, advertising or promotional purposes (the
"License"). The License shall be deemed effective as of the date CC0 was
applied by Affirmer to the Work. Should any part of the License for any
reason be judged legally invalid or ineffective under applicable law, such
partial invalidity or ineffectiveness shall not invalidate the remainder
of the License, and in such case Affirmer hereby affirms that he or she
will not (i) exercise any of his or her remaining Copyright and Related
Rights in the Work or (ii) assert any associated claims and causes of
action with respect to the Work, in either case contrary to Affirmer's
express Statement of Purpose.

4. Limitations and Disclaimers.

 a. No trademark or patent rights held by Affirmer are waived, abandoned,
    surrendered, licensed or otherwise affected by this document.
 b. Affirmer offers the Work as-is and makes no representations or
    warranties of any kind concerning the Work, express, implied,
    statutory or otherwise, including without limitation warranties of
    title, merchantability, fitness for a particular purpose, non
    infringement, or the absence of latent or other defects, accuracy, or
    the present or absence of errors, whether or not discoverable, all to
    the greatest extent permissible under applicable law.
 c. Affirmer disclaims responsibility for clearing rights of other persons
    that may apply to the Work or any use thereof, including without
    limitation any person's Copyright and Related Rights in the Work.
    Further, Affirmer disclaims responsibility for obtaining any necessary
    consents, permissions or other rights required for any use of the
    Work.
 d. Affirmer understands and acknowledges that Creative Commons is not a
    party to this document and has no duty or obligation with respect to
    this CC0 or use of the Work.

```

### FILE: `README.md`

* bytes: 8090
* sha256: f7dbc10c1e2b65041bbabfcdf2c1ef1b6532dec2f7abef548f3515f2f9e084cb

```

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
| **compute** | 1 | quantified, timed | lite | `stacks/compute.schema.json` | `stacks/compute@1.md` |
| **dietary** | 1 | — | lite | `stacks/dietary.schema.json` | `stacks/dietary@1.md` |
| **equipment** | 1 | — | lite | `stacks/equipment.schema.json` | `stacks/equipment@1.md` |
| **illustrated** | 1 | — | illustrated | `stacks/illustrated.schema.json` | `stacks/illustrated@1.md` |
| **prep** | 1 | — | lite | `stacks/prep.schema.json` | `stacks/prep@1.md` |
| **quantified** | 1 | — | scalable | `stacks/quantified.schema.json` | `stacks/quantified@1.md` |
| **referenced** | 1 | structured | timed | `stacks/referenced.schema.json` | `stacks/referenced@1.md` |
| **scaling** | 1 | quantified | scalable | `stacks/scaling.schema.json` | `stacks/scaling@1.md` |
| **storage** | 1 | — | lite | `stacks/storage.schema.json` | `stacks/storage@1.md` |
| **structured** | 1 | — | timed | `stacks/structured.schema.json` | `stacks/structured@1.md` |
| **substitutions** | 1 | referenced | lite | `stacks/substitutions.schema.json` | `stacks/substitutions@1.md` |
| **techniques** | 1 | — | lite | `stacks/techniques.schema.json` | `stacks/techniques@1.md` |
| **timed** | 1 | structured | timed | `stacks/timed.schema.json` | `stacks/timed@1.md` |

<!-- END GENERATED: STACK REGISTRY -->

```

### FILE: `SPEC.md`

* bytes: 8075
* sha256: 644c16cbcd414541bed890f603142897b28730fda1bdc8d80cdf031b97b4a926

```
# Soustack Specification

## 1. Scope and Purpose

Soustack is an open specification for representing recipes as structured, interoperable, and progressively computable data.

The primary design goal of this specification is **universal adoption**: recipes should be publishable with minimal friction, while enabling increasingly powerful capabilities (scaling, timing, scheduling, visualization) as structure is added.

Soustack achieves this by defining:

* a small, stable core document shape
* **Profiles** as human-facing conformance targets
* **Stacks** as machine-enforced capability requirements
* semantic validation rules that ensure interoperability beyond JSON Schema alone

This document is **normative** unless otherwise noted.

---

## 2. Terminology

* **Document**: A JSON object conforming to the Soustack root schema.
* **Level**: A baseline classification (`lite` or `base`) defining minimum required structure.
* **Profile**: A named, human-facing conformance target describing what a consumer may rely on.
* **Stack**: A declared capability that activates additional structural and/or semantic requirements.
* **Conformance**: Passing both schema validation and all required semantic checks.
* **Badge**: A derived, informative label emitted by tooling based on observed conformance.

---

## 3. Profiles (Normative)

Profiles are the **primary public contract** of the Soustack specification.

A Profile defines a bundle of requirements expressed in terms of:

* required `level`
* required `stacks`
* required semantic validation rules

Profiles support an **adoption ladder**: publishers may start with minimal structure and progressively add capabilities without changing the overall document shape.

### 3.1 Profile Declaration

* A document MAY declare a profile explicitly using a top-level `profile` field. The field is OPTIONAL; omission MUST NOT change document validity.
* Tools MAY infer the profile from `level` and `stacks` when `profile` is absent.
* `profile` is a single primary claim (no arrays or multi-profile declarations).
* If a document declares both a `profile` and explicit `level`/`stacks`, they MUST NOT contradict. Contradictions MUST be treated as non-conformant.

### 3.2 Stack Semantics

If a document declares a stack in `stacks[]`, it MUST satisfy all requirements of that stack as defined by this specification.

Stacks that impose no additional structural or semantic requirements are not permitted in future major versions.

---

## 4. Profile Definitions

### Profile: Lite

**Purpose:** Lowest-friction publishing and ingestion.

**Requirements**

* `level` MUST be `lite`.

**Guarantees**

* Valid Soustack container structure.
* Ingredients and instructions MAY be unstructured strings.

---

### Profile: Base

**Purpose:** Minimum cookable baseline.

**Requirements**

* `level` MUST be `base`.

**Guarantees**

* Document includes `yield` and `time`.

---

### Profile: Illustrated

**Purpose:** Visually rich, embeddable recipes.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `illustrated@1`.

**Semantic Requirements**

* At least one media item MUST be present at the recipe or step level.

---

### Profile: Structured

**Purpose:** Stable structure and node identity.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `structured@1`.

**Guarantees**

* Ingredients and steps are objects with stable IDs.

---

### Profile: Referenced

**Purpose:** Explicit linkage between steps and ingredients.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `structured@1` and `referenced@1`.

**Semantic Requirements**

* All references MUST resolve.

---

### Profile: Timed

**Purpose:** Step-level timing.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `structured@1` and `timed@1`.

---

### Profile: Schedulable

**Purpose:** Deterministic scheduling.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `structured@1` and `timed@1`.

**Semantic Requirements**

* Dependency graph MUST be acyclic.

---

### Profile: Quantified

**Purpose:** Machine-readable quantities.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `quantified@1`.

---

### Profile: Scalable

**Purpose:** Interoperable scaling.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `quantified@1` and `scaling@1`.

**Semantic Requirements**

* Baker's percentage references MUST resolve to declared ingredient ids.
* Discrete scaling ranges MUST have `min` less than or equal to `max`.

---

### Profile: Nutrition

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `nutrition@1`.

---

### Profile: Dietary

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `dietary@1`.

---

### Profile: Storage

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `storage@1`.

---

## 5. Stacks

Stacks define capability-specific structural and semantic requirements. Each stack is versioned and defined in its own schema and documentation.

High-value optional stacks include `equipment@1` for declaring required equipment with scaling-aware counts and step-level usage references.

---

## 6. Semantic Validation

In addition to schema validation, conforming tools MUST enforce semantic rules, including but not limited to:

* ID uniqueness
* Reference resolution
* Dependency graph acyclicity
* Timing coherence

---

## 7. Derived Badges (Informative)

Validators MAY emit derived badges such as:

* **Computable**
* **Schedulable**
* **Scalable**

Badges are informative and do not replace profile conformance.

---

## 8. Versioning

This specification uses semantic versioning. Schema identifiers and conformance rules are versioned and MUST be treated as immutable once published.

---

## 9. Non-Normative Notes

Non-normative guidance, examples, and adoption notes MAY be published separately and are not part of this specification.



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
| **compute** | 1 | quantified, timed | lite | `stacks/compute.schema.json` | `stacks/compute@1.md` |
| **dietary** | 1 | — | lite | `stacks/dietary.schema.json` | `stacks/dietary@1.md` |
| **equipment** | 1 | — | lite | `stacks/equipment.schema.json` | `stacks/equipment@1.md` |
| **illustrated** | 1 | — | illustrated | `stacks/illustrated.schema.json` | `stacks/illustrated@1.md` |
| **prep** | 1 | — | lite | `stacks/prep.schema.json` | `stacks/prep@1.md` |
| **quantified** | 1 | — | scalable | `stacks/quantified.schema.json` | `stacks/quantified@1.md` |
| **referenced** | 1 | structured | timed | `stacks/referenced.schema.json` | `stacks/referenced@1.md` |
| **scaling** | 1 | quantified | scalable | `stacks/scaling.schema.json` | `stacks/scaling@1.md` |
| **storage** | 1 | — | lite | `stacks/storage.schema.json` | `stacks/storage@1.md` |
| **structured** | 1 | — | timed | `stacks/structured.schema.json` | `stacks/structured@1.md` |
| **substitutions** | 1 | referenced | lite | `stacks/substitutions.schema.json` | `stacks/substitutions@1.md` |
| **techniques** | 1 | — | lite | `stacks/techniques.schema.json` | `stacks/techniques@1.md` |
| **timed** | 1 | structured | timed | `stacks/timed.schema.json` | `stacks/timed@1.md` |

<!-- END GENERATED: STACK REGISTRY -->

```

### FILE: `defs/common.schema.json`

* bytes: 1238
* sha256: 798f7a91bb9f2f59f4803a986ecfd56a6ab8158575c92bd311f87a15a59f4c13

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/common.schema.json",
  "title": "Common definitions for Soustack",
  "type": "object",
  "properties": {
    "stackId": {
      "type": "string",
      "anyOf": [
        {
          "enum": [
            "quantified@1",
            "structured@1",
            "timed@1",
            "referenced@1",
            "compute@1",
            "storage@1",
            "dietary@1",
            "substitutions@1",
            "techniques@1",
            "illustrated@1",
            "scaling@1",
            "nutrition@1"
          ]
        },
        {
          "pattern": "^x-[A-Za-z0-9_-]+@[0-9]+$",
          "description": "Extension stacks must use x- prefix and include a major version"
        }
      ]
    },
    "extensionLane": {
      "type": "string",
      "pattern": "^x-[A-Za-z0-9_-]+$"
    },
    "extensionLaneValue": {
      "description": "Accept any JSON value for extension lanes while keeping the top-level property name constrained.",
      "type": ["object", "array", "string", "number", "boolean", "null"]
    },
    "uri": {
      "type": "string",
      "format": "uri"
    }
  },
  "additionalProperties": false
}

```

### FILE: `defs/duration.schema.json`

* bytes: 1033
* sha256: 151b9efdede26e6806696734b9cdc747121638f5cf905f45073e5a25bec951f0

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/duration.schema.json",
  "title": "Durations",
  "type": "object",
  "properties": {
    "DurationMinutes": {
      "type": "object",
      "properties": {
        "minutes": { "type": "number", "exclusiveMinimum": 0 },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["minutes"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "StorageDuration": {
      "type": "object",
      "properties": {
        "iso8601": { "type": "string", "pattern": "^P" },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["iso8601"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `defs/entities.schema.json`

* bytes: 3637
* sha256: 36b1e320bfdf2cd5584dc00e17a7ef4ff1465230671b211df3fe975dc3211f7d

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/entities.schema.json",
  "title": "Soustack entity bases",
  "type": "object",
  "$defs": {
    "IngredientBase": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "quantity": { "$ref": "./quantity.schema.json" },
        "temperature": { "$ref": "./temperature.schema.json" },
        "notes": { "type": "string" },
        "prep": {
          "oneOf": [
            { "type": "string", "minLength": 1 },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "anyOf": [
                  { "type": "string", "minLength": 1 },
                  { "$ref": "../stacks/prep.schema.json#/$defs/prepItem" }
                ]
              }
            }
          ]
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["name"],
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "StepBase": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "text": { "type": "string" },
        "dependsOn": {
          "type": "array",
          "items": { "type": "string" },
          "uniqueItems": true
        },
        "inputs": {
          "type": "array",
          "items": { "type": "string" },
          "uniqueItems": true
        },
        "techniqueIds": {
          "type": "array",
          "items": { "type": "string" },
          "uniqueItems": true
        },
        "usesEquipment": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Za-z0-9._-]+$"
          },
          "uniqueItems": true
        },
        "temperature": { "$ref": "./temperature.schema.json" },
        "timing": {
          "type": "object",
          "properties": {
            "activity": { "type": "string", "enum": ["active", "passive"] },
            "duration": {
              "type": "object",
              "oneOf": [
                { "$ref": "./duration.schema.json#/properties/DurationMinutes" },
                {
                  "type": "object",
                  "properties": {
                    "minMinutes": { "type": "number", "exclusiveMinimum": 0 },
                    "maxMinutes": { "type": "number", "exclusiveMinimum": 0 }
                  },
                  "required": ["minMinutes", "maxMinutes"],
                  "additionalProperties": false
                }
              ]
            },
            "completionCue": { "type": "string" },
            "metadata": { "type": "object", "additionalProperties": true }
          },
          "anyOf": [
            { "required": ["duration"] },
            { "required": ["completionCue"] }
          ],
          "additionalProperties": false,
          "patternProperties": {
            "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
          }
        },
        "images": { "type": "array", "items": { "$ref": "./common.schema.json#/properties/uri" } },
        "videos": { "type": "array", "items": { "$ref": "./common.schema.json#/properties/uri" } },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["text"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `defs/ingredientQuantified.schema.json`

* bytes: 293
* sha256: 23222808768642b9a35dd0e02fdd92c45f41f4b4d7061badb4bfcf0ad921e44d

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/ingredientQuantified.schema.json",
  "title": "Quantified Ingredient",
  "allOf": [
    { "$ref": "./entities.schema.json#/$defs/IngredientBase" },
    { "required": ["id", "quantity"] }
  ]
}

```

### FILE: `defs/quantity.schema.json`

* bytes: 517
* sha256: 3556dd91b04c4aa85f356e572ff4bb3470ca64f3965fb7cb4764f5037cd18f17

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/quantity.schema.json",
  "title": "Quantity",
  "type": "object",
  "properties": {
    "amount": { "type": "number" },
    "unit": { "type": "string", "minLength": 1 },
    "metadata": { "type": "object", "additionalProperties": true }
  },
  "required": ["amount", "unit"],
  "additionalProperties": false,
  "patternProperties": {
    "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
  }
}

```

### FILE: `defs/scalingRule.schema.json`

* bytes: 1944
* sha256: ded6128907b832a655c556520fccf9a2e67099f3fe494a8bb0a11df32ff5011e

```
{
"$id": "https://soustack.spec/defs/scalingRule.schema.json",
"$schema": "https://json-schema.org/draft/2020-12/schema",
"title": "Soustack ScalingRule",
"type": "object",
"additionalProperties": false,
"required": ["mode"],
"properties": {
"mode": {
"type": "string",
"enum": ["linear", "fixed", "discrete", "toTaste", "bakersPercent"]
},

"step": {
  "type": "number",
  "exclusiveMinimum": 0
},
"rounding": {
  "type": "string",
  "enum": ["nearest", "ceil", "floor"]
},
"min": {
  "type": "number"
},
"max": {
  "type": "number"
},

"percent": {
  "type": "number",
  "exclusiveMinimum": 0
},
"of": {
  "type": "string",
  "minLength": 1
}

},

"allOf": [
{
"if": {
"properties": { "mode": { "const": "linear" } },
"required": ["mode"]
},
"then": {
"not": {
"anyOf": [
{ "required": ["step"] },
{ "required": ["rounding"] },
{ "required": ["min"] },
{ "required": ["max"] },
{ "required": ["percent"] },
{ "required": ["of"] }
]
}
}
},
{
"if": {
"properties": { "mode": { "const": "fixed" } },
"required": ["mode"]
},
"then": {
"not": {
"anyOf": [
{ "required": ["step"] },
{ "required": ["rounding"] },
{ "required": ["min"] },
{ "required": ["max"] },
{ "required": ["percent"] },
{ "required": ["of"] }
]
}
}
},
{
"if": {
"properties": { "mode": { "const": "toTaste" } },
"required": ["mode"]
},
"then": {
"not": {
"anyOf": [
{ "required": ["step"] },
{ "required": ["rounding"] },
{ "required": ["min"] },
{ "required": ["max"] },
{ "required": ["percent"] },
{ "required": ["of"] }
]
}
}
},
{
"if": {
"properties": { "mode": { "const": "discrete" } },
"required": ["mode"]
},
"then": {
"not": {
"anyOf": [
{ "required": ["percent"] },
{ "required": ["of"] }
]
}
}
},
{
"if": {
"properties": { "mode": { "const": "bakersPercent" } },
"required": ["mode"]
},
"then": {
"required": ["percent", "of"],
"not": {
"anyOf": [
{ "required": ["step"] },
{ "required": ["rounding"] },
{ "required": ["min"] },
{ "required": ["max"] }
]
}
}
}
]
}
```

### FILE: `defs/temperature.schema.json`

* bytes: 2199
* sha256: ff3106728fdf2ecb3354c6f66186b8888ab6d86dc32996d464b47e92a13fb115

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/temperature.schema.json",
  "title": "Temperature",
  "type": "object",
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "target": {
          "type": "string",
          "enum": ["oven", "stovetop", "pan", "oil", "water", "grill", "broiler", "internal", "ambient", "surface"]
        },
        "level": {
          "type": "string",
          "enum": ["veryLow", "low", "medium", "mediumHigh", "high", "veryHigh"]
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["target", "level"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    },
    {
      "type": "object",
      "properties": {
        "target": {
          "type": "string",
          "enum": ["oven", "stovetop", "pan", "oil", "water", "grill", "broiler", "internal", "ambient", "surface"]
        },
        "unit": { "type": "string", "enum": ["celsius", "fahrenheit"] },
        "value": { "type": "number" },
        "approximate": { "type": "boolean" },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["target", "unit", "value"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    },
    {
      "type": "object",
      "properties": {
        "target": {
          "type": "string",
          "enum": ["oven", "stovetop", "pan", "oil", "water", "grill", "broiler", "internal", "ambient", "surface"]
        },
        "unit": { "type": "string", "enum": ["celsius", "fahrenheit"] },
        "minValue": { "type": "number" },
        "maxValue": { "type": "number" },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["target", "unit", "minValue", "maxValue"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    }
  ]
}

```

### FILE: `fixtures/content/illustrated-step.valid.json`

* bytes: 420
* sha256: f58fa9d2b629512226dea6a40b420f110b9b37e684ec61db27d9da4ba1b78e6c

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "structured": 1,
    "illustrated": 1
  },
  "name": "Picture Smoothie",
  "ingredients": [
    "fruit",
    "yogurt"
  ],
  "instructions": [
    {
      "id": "s1",
      "text": "blend",
      "images": [
        "http://example.com/blend.jpg"
      ]
    }
  ],
  "images": [
    "http://example.com/cover2.jpg"
  ]
}

```

### FILE: `fixtures/invalid/equipment-unknown-reference.invalid.json`

* bytes: 601
* sha256: b05125c85f425ed963dd6ffb0649e14a890a2e52b9611b80b2efecb5035f2336

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "equipment": 1,
    "structured": 1
  },
  "name": "Recipe with Invalid Equipment Reference",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    {
      "id": "skillet",
      "name": "8-inch skillet"
    }
  ],
  "ingredients": [
    {
      "id": "meat",
      "name": "Meat"
    }
  ],
  "instructions": [
    {
      "id": "sear",
      "text": "Sear the meat",
      "usesEquipment": ["nonexistent"]
    }
  ]
}


```

### FILE: `fixtures/invalid/mise-en-place-unknown-equipment.invalid.json`

* bytes: 583
* sha256: f28b0b8c857b8e0a7d643970e38940616b4b5955f20a288a5dcd86e4fefac478

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1,
    "equipment": 1
  },
  "name": "Recipe with Unknown Equipment Reference",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    {
      "id": "knife",
      "name": "Chef's knife"
    }
  ],
  "ingredients": [
    "onion"
  ],
  "instructions": [
    "Cook"
  ],
  "miseEnPlace": [
    {
      "text": "Use the missing equipment",
      "usesEquipment": ["missing-equipment"]
    }
  ]
}


```

### FILE: `fixtures/invalid/mise-en-place-unknown-input.invalid.json`

* bytes: 628
* sha256: 63fb979942308597687573669b97352323f3810be00bdea10aba8a08cd6aad02

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1,
    "referenced": 1,
    "structured": 1
  },
  "name": "Recipe with Unknown Input Reference",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    {
      "id": "onion",
      "name": "Onion"
    }
  ],
  "instructions": [
    {
      "id": "cook",
      "text": "Cook",
      "inputs": ["onion"]
    }
  ],
  "miseEnPlace": [
    {
      "text": "Prepare the missing ingredient",
      "inputs": ["missing-ingredient"]
    }
  ]
}


```

### FILE: `fixtures/invalid/storage-leftovers-missing-method.invalid.json`

* bytes: 568
* sha256: a97f6d93a49d334c647efb0cc3b9e8854abe2e2269db0037209a1faba079e3d7

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Recipe with Invalid Reheat Instruction",
  "ingredients": [
    "food"
  ],
  "instructions": [
    "Cook the food"
  ],
  "storage": {
    "refrigerated": {
      "duration": {
        "iso8601": "P3D"
      }
    },
    "leftovers": {
      "reheat": [
        {
          "duration": {
            "minMinutes": 2,
            "maxMinutes": 3
          },
          "notes": "Missing required method field"
        }
      ]
    }
  }
}


```

### FILE: `fixtures/invalid/storage-leftovers-wrong-type.invalid.json`

* bytes: 410
* sha256: 2058d3758a75b46281d2de09a8ab099eb6e382d2dac1f1aefe3fd1a3d2345a4e

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Recipe with Wrong Reheat Type",
  "ingredients": [
    "food"
  ],
  "instructions": [
    "Cook the food"
  ],
  "storage": {
    "refrigerated": {
      "duration": {
        "iso8601": "P3D"
      }
    },
    "leftovers": {
      "reheat": "Microwave 2–3 minutes"
    }
  }
}


```

### FILE: `fixtures/level/base-full.valid.json`

* bytes: 2645
* sha256: 4265fe805c2db89b5b1f9edbcd0342b3c6c1a8d6337a2bed0a511e96b6df7f90

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "structured": 1,
    "timed": 1,
    "referenced": 1,
    "compute": 1,
    "storage": 1,
    "dietary": 1,
    "substitutions": 1,
    "techniques": 1,
    "illustrated": 1
  },
  "name": "Garlic Pasta",
  "yield": {
    "amount": 4,
    "unit": "servings"
  },
  "time": {
    "total": {
      "minutes": 45
    }
  },
  "ingredients": [
    {
      "id": "i1",
      "name": "pasta",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    },
    {
      "id": "i2",
      "name": "garlic",
      "quantity": {
        "amount": 4,
        "unit": "clove"
      }
    }
  ],
  "instructions": [
    {
      "id": "s1",
      "text": "Boil water",
      "timing": {
        "activity": "active",
        "duration": {
          "minutes": 10
        }
      },
      "inputs": [
        "i1"
      ],
      "techniqueIds": [
        "t1"
      ],
      "images": [
        "http://example.com/step1.jpg"
      ]
    },
    {
      "id": "s2",
      "text": "Cook pasta",
      "timing": {
        "activity": "active",
        "duration": {
          "minMinutes": 8,
          "maxMinutes": 10
        }
      },
      "dependsOn": [
        "s1"
      ],
      "inputs": [
        "i1"
      ],
      "techniqueIds": [
        "t2"
      ],
      "temperature": {
        "target": "water",
        "level": "high"
      },
      "videos": [
        "http://example.com/v1.mp4"
      ]
    },
    {
      "id": "s3",
      "text": "Saute garlic",
      "timing": {
        "activity": "active",
        "duration": {
          "minutes": 5
        },
        "completionCue": "fragrant"
      },
      "dependsOn": [
        "s2"
      ],
      "inputs": [
        "i2"
      ],
      "techniqueIds": [
        "t1",
        "t3"
      ],
      "temperature": {
        "target": "stovetop",
        "level": "medium"
      }
    }
  ],
  "images": [
    "http://example.com/cover.jpg"
  ],
  "videos": [
    "http://example.com/cover.mp4"
  ],
  "dietary": {
    "basis": "perServing",
    "calories": 400,
    "diets": [
      "vegetarian"
    ]
  },
  "storage": {
    "refrigerated": {
      "duration": {
        "iso8601": "P2D"
      }
    }
  },
  "substitutions": [
    {
      "for": "garlic",
      "alternatives": [
        {
          "name": "shallot",
          "ratio": "1:1"
        }
      ]
    }
  ],
  "techniques": [
    {
      "id": "t1",
      "name": "Boil"
    },
    {
      "id": "t2",
      "name": "Simmer"
    },
    {
      "id": "t3",
      "name": "Saute"
    }
  ]
}

```

### FILE: `fixtures/level/base-missing-yield.invalid.json`

* bytes: 194
* sha256: afbcf2c30fe7a9601d3bb224bf4ced3975f268d50e20472c41784e102d7e770f

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {},
  "name": "Broken Recipe",
  "ingredients": [
    "thing"
  ],
  "instructions": [
    "do"
  ]
}

```

### FILE: `fixtures/level/lite-min.valid.json`

* bytes: 243
* sha256: 0284be9aa833f2dcdd515e9877b160b00ed04953c1c5771badb19b26ce22f365

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {},
  "name": "Simple Toast",
  "ingredients": [
    "bread slice",
    "butter"
  ],
  "instructions": [
    "toast bread",
    "spread butter"
  ]
}

```

### FILE: `fixtures/profile/profile-base.valid.json`

* bytes: 292
* sha256: 3bec0d7a4ec8f8eb62ae786fbb39c469aa3d7afffab57e2168d62ef93cd87113

```
{
  "level": "base",
  "profile": "base",
  "stacks": {},
  "name": "Boiled Egg",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 10
    }
  },
  "ingredients": [
    "Egg"
  ],
  "instructions": [
    "Boil the egg for 10 minutes."
  ]
}

```

### FILE: `fixtures/profile/profile-lite.valid.json`

* bytes: 214
* sha256: 15c7358f6e9afaefa9f3504a690230b131f96c09a7ca95416d63094766bd5b33

```
{
  "level": "lite",
  "profile": "lite",
  "stacks": {},
  "name": "Simple Toast",
  "ingredients": [
    "Bread",
    "Butter"
  ],
  "instructions": [
    "Toast the bread.",
    "Spread butter on toast."
  ]
}

```

### FILE: `fixtures/profile/profile-scalable-missing-scaling.invalid.json`

* bytes: 430
* sha256: 668bd6c6989570e84fcd62c1d3d19bdf76875098e042c1fe1007bae5ba7658a8

```
{
  "level": "base",
  "profile": "scalable",
  "stacks": {
    "quantified": 1
  },
  "name": "Scaled Bread",
  "yield": {
    "amount": 2,
    "unit": "loaf"
  },
  "time": {
    "total": {
      "minutes": 180
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Bread flour",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    }
  ],
  "instructions": [
    "Mix ingredients."
  ]
}

```

### FILE: `fixtures/profile/profile-scalable.valid.json`

* bytes: 762
* sha256: 6e52deb42de533cd8056e84bad12e06626330c4a4d3b9726f7a4ebe66335cfd5

```
{
  "level": "base",
  "profile": "scalable",
  "stacks": {
    "quantified": 1,
    "scaling": 1
  },
  "name": "Scaled Bread",
  "yield": {
    "amount": 2,
    "unit": "loaf"
  },
  "time": {
    "total": {
      "minutes": 180
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Bread flour",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    },
    {
      "id": "water",
      "name": "Water",
      "quantity": {
        "amount": 325,
        "unit": "g"
      }
    }
  ],
  "scaling": {
    "discrete": {
      "min": 1,
      "max": 5,
      "step": 1
    }
  },
  "instructions": [
    {
      "text": "Combine ingredients and knead until smooth.",
      "dependsOn": [],
      "id": "step-1"
    }
  ]
}

```

### FILE: `fixtures/profile/profile-timed-missing-structured.invalid.json`

* bytes: 429
* sha256: 056249929f5f3cccf4a0a12f00e5b5af3d4593ff1dfd5f0bc2b366c7046792ec

```
{
  "level": "base",
  "profile": "timed",
  "stacks": {
    "timed": 1
  },
  "name": "Timed Roast",
  "yield": {
    "amount": 4,
    "unit": "servings"
  },
  "time": {
    "total": {
      "minutes": 90
    }
  },
  "ingredients": [
    "Beef"
  ],
  "instructions": [
    {
      "id": "step-1",
      "text": "Roast until done",
      "timing": {
        "duration": {
          "minutes": 90
        }
      }
    }
  ]
}

```

### FILE: `fixtures/scaling/bakers-percent-missing-ref.invalid.json`

* bytes: 651
* sha256: 7a144a0a3501669d1201706f02760f348e89eb8419b0aa06998f7557aa38e0bc

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "scaling": 1
  },
  "name": "Bad Baker Percent",
  "yield": {
    "amount": 1,
    "unit": "batch"
  },
  "time": {
    "total": {
      "minutes": 20
    }
  },
  "ingredients": [
    {
      "id": "salt",
      "name": "Salt",
      "quantity": {
        "amount": 10,
        "unit": "g"
      },
      "scaling": {
        "mode": "bakersPercent",
        "percent": 2,
        "of": "missing"
      }
    }
  ],
  "instructions": [
    "combine"
  ],
  "scaling": {
    "discrete": {
      "min": 2,
      "max": 6
    }
  }
}

```

### FILE: `fixtures/scaling/bakers-percent.valid.json`

* bytes: 806
* sha256: 3080e8fc2c728b21282201d296a5af6b54b7615a44b7c7c409e42f72558e6302

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "scaling": 1
  },
  "name": "Scaled Bread",
  "yield": {
    "amount": 1,
    "unit": "loaf"
  },
  "time": {
    "total": {
      "minutes": 45
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Bread flour",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    },
    {
      "id": "water",
      "name": "Water",
      "quantity": {
        "amount": 325,
        "unit": "g"
      },
      "scaling": {
        "mode": "bakersPercent",
        "percent": 65,
        "of": "flour"
      }
    }
  ],
  "instructions": [
    "mix",
    "bake"
  ],
  "scaling": {
    "discrete": {
      "min": 1,
      "max": 4,
      "step": 1
    }
  }
}

```

### FILE: `fixtures/scaling/discrete-range.invalid.json`

* bytes: 535
* sha256: a96ffcbaefb18a254a4a5cc17fc20d4f7665e7c00ff7f1bde2bf864f4fb6517e

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "scaling": 1
  },
  "name": "Bad Range",
  "yield": {
    "amount": 1,
    "unit": "tray"
  },
  "time": {
    "total": {
      "minutes": 15
    }
  },
  "ingredients": [
    {
      "id": "sugar",
      "name": "Sugar",
      "quantity": {
        "amount": 100,
        "unit": "g"
      }
    }
  ],
  "instructions": [
    "stir"
  ],
  "scaling": {
    "discrete": {
      "min": 5,
      "max": 2
    }
  }
}

```

### FILE: `fixtures/scaling/missing-quantified.invalid.json`

* bytes: 634
* sha256: aebe8cbeeef05fa4b5f67fa1f0ab83bcbe5c9e9a986adc6ff8d7c9b4f103668e

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "scaling": 1
  },
  "name": "Incomplete Scaling",
  "yield": {
    "amount": 2,
    "unit": "loaves"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    {
      "id": "starter",
      "name": "Starter",
      "quantity": {
        "amount": 150,
        "unit": "g"
      },
      "scaling": {
        "mode": "bakersPercent",
        "percent": 30,
        "of": "flour"
      }
    }
  ],
  "instructions": [
    "mix"
  ],
  "scaling": {
    "discrete": {
      "min": 1,
      "max": 3
    }
  }
}

```

### FILE: `fixtures/scaling/reject-bakersPercentage.invalid.json`

* bytes: 801
* sha256: 79dd5e7e45859b05181938b1b062724decbce1b91c5f913633025c202a9aef5d

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "scaling": 1
  },
  "name": "Reject Legacy Bakers Percentage",
  "yield": {
    "amount": 1,
    "unit": "loaf"
  },
  "time": {
    "total": {
      "minutes": 45
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Bread flour",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    },
    {
      "id": "water",
      "name": "Water",
      "quantity": {
        "amount": 325,
        "unit": "g"
      },
      "bakersPercentage": {
        "of": "flour",
        "percent": 65
      }
    }
  ],
  "instructions": [
    "mix",
    "bake"
  ],
  "scaling": {
    "discrete": {
      "min": 1,
      "max": 4,
      "step": 1
    }
  }
}

```

### FILE: `fixtures/stacks/compute-missing-timed.invalid.json`

* bytes: 488
* sha256: 61adb84e5ac227d0b2810dfe94771465be0124163e034dffeec3bc46b163464f

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "compute": 1
  },
  "name": "Compute Without Timed",
  "yield": {
    "amount": 1,
    "unit": "dish"
  },
  "time": {
    "total": {
      "minutes": 10
    }
  },
  "ingredients": [
    {
      "id": "i1",
      "name": "item",
      "quantity": {
        "amount": 1,
        "unit": "cup"
      }
    }
  ],
  "instructions": [
    {
      "text": "do"
    }
  ]
}

```

### FILE: `fixtures/stacks/dietary-no-signal.invalid.json`

* bytes: 265
* sha256: a21e74dfdb47a66a772263cec1f4010a40ca1c7e65a682550585b8e17c9c9a85

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "dietary": 1
  },
  "name": "Empty Nutrition",
  "ingredients": [
    "water"
  ],
  "instructions": [
    "drink"
  ],
  "dietary": {
    "basis": "perServing"
  }
}

```

### FILE: `fixtures/stacks/illustrated-empty.invalid.json`

* bytes: 215
* sha256: 97863daf07eb4f1f797a8d0fc6d6a4f554145e0e583b118fa2aaa5d669f96b8a

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "illustrated": 1
  },
  "name": "No Media",
  "ingredients": [
    "thing"
  ],
  "instructions": [
    "step"
  ]
}

```

### FILE: `fixtures/stacks/quantified-string.invalid.json`

* bytes: 333
* sha256: 520025e45a7b5fc373f2d9029ba4ab8e635b341decd2d926445791cf39755acc

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1
  },
  "name": "Bad Quant",
  "yield": {
    "amount": 1,
    "unit": "dish"
  },
  "time": {
    "total": {
      "minutes": 5
    }
  },
  "ingredients": [
    "1 cup mystery"
  ],
  "instructions": [
    "mix"
  ]
}

```

### FILE: `fixtures/stacks/referenced-missing-input.invalid.json`

* bytes: 473
* sha256: 1ea113eb7ab38d7f2cfc207b1adbb59d8c9ec4b225d956c84a61e877fa482659

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "structured": 1,
    "referenced": 1
  },
  "name": "Missing Input",
  "yield": {
    "amount": 1,
    "unit": "dish"
  },
  "time": {
    "total": {
      "minutes": 20
    }
  },
  "ingredients": [
    {
      "id": "i1",
      "name": "Thing"
    }
  ],
  "instructions": [
    {
      "id": "s1",
      "text": "Do it",
      "inputs": [
        "i2"
      ]
    }
  ]
}

```

### FILE: `fixtures/stacks/storage-min.valid.json`

* bytes: 329
* sha256: dab8047281427b562afeec357915889ce00c87ecde28f1b7d6f6e5530263c7d0

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Leftover Soup",
  "ingredients": [
    "soup"
  ],
  "instructions": [
    "reheat when ready"
  ],
  "storage": {
    "refrigerated": {
      "duration": {
        "iso8601": "P3D"
      }
    }
  }
}

```

### FILE: `fixtures/stacks/storage-no-duration.invalid.json`

* bytes: 251
* sha256: 8f9a8d53cb533b3b8b186bc28e24d69577cf798c663096e2b1952a6b60bdf4a1

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Bad Storage",
  "ingredients": [
    "food"
  ],
  "instructions": [
    "store"
  ],
  "storage": {
    "frozen": {}
  }
}

```

### FILE: `fixtures/stacks/timed-implies-structured.valid.json`

* bytes: 822
* sha256: 82ec06ba9d898d992490b79cb7ddc2edfaac5ee940095db5880c65407ece8adc

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "structured": 1,
    "timed": 1
  },
  "name": "Rested dough",
  "yield": {
    "amount": 2,
    "unit": "loaves"
  },
  "time": {
    "total": {
      "minutes": 180
    }
  },
  "ingredients": [
    {
      "id": "f",
      "name": "flour"
    },
    {
      "id": "w",
      "name": "water"
    }
  ],
  "instructions": [
    {
      "id": "mix",
      "text": "Mix flour and water",
      "timing": {
        "activity": "active",
        "duration": {
          "minutes": 10
        }
      }
    },
    {
      "id": "rest",
      "text": "Let the dough rest",
      "dependsOn": [
        "mix"
      ],
      "timing": {
        "activity": "passive",
        "completionCue": "doubled in size"
      }
    }
  ]
}

```

### FILE: `fixtures/stacks/timed-range.invalid.json`

* bytes: 531
* sha256: 2643e438ea00cc619f93d840e8362ffac10bde82818b66de58eab0ebb59fbad5

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "structured": 1,
    "timed": 1
  },
  "name": "Bad Range",
  "yield": {
    "amount": 2,
    "unit": "servings"
  },
  "time": {
    "total": {
      "minutes": 15
    }
  },
  "ingredients": [
    "water"
  ],
  "instructions": [
    {
      "id": "s1",
      "text": "Wait",
      "timing": {
        "activity": "passive",
        "duration": {
          "minMinutes": 10,
          "maxMinutes": 5
        }
      }
    }
  ]
}

```

### FILE: `fixtures/valid/equipment-scaling-rules.valid.json`

* bytes: 1202
* sha256: 566730146698d70c9ea0d3f1a5133b7a012268c23ff2ce287769913dbdc5fc26

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "equipment": 1
  },
  "name": "Recipe with Scaling-Aware Equipment",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    {
      "id": "pan",
      "name": "8-inch skillet",
      "count": 1,
      "countScaling": "fixed"
    },
    {
      "id": "bowl",
      "name": "Mixing bowl",
      "count": 2,
      "countScaling": "linear"
    },
    {
      "id": "sheet_pan",
      "name": "Baking sheet",
      "count": 1,
      "countScaling": {
        "mode": "threshold",
        "steps": [
          { "maxFactor": 1.0, "count": 1 },
          { "maxFactor": 2.0, "count": 2 },
          { "maxFactor": 4.0, "count": 3 }
        ]
      }
    },
    {
      "id": "skillet_small",
      "name": "8-inch skillet",
      "upgrades": [
        { "minFactor": 2.0, "use": "skillet_large" }
      ]
    },
    {
      "id": "skillet_large",
      "name": "12-inch skillet"
    }
  ],
  "ingredients": [
    {
      "id": "flour",
      "name": "Flour"
    }
  ],
  "instructions": [
    "Mix ingredients",
    "Bake"
  ]
}


```

### FILE: `fixtures/valid/equipment-strings.valid.json`

* bytes: 488
* sha256: 4492e63c7d462e2b1d7146e50c8bab599df6a1ec9606b20d0b5924afdfc7495d

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "equipment": 1
  },
  "name": "Simple Recipe with Equipment",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    "mixing bowl",
    "whisk",
    "oven"
  ],
  "ingredients": [
    {
      "id": "flour",
      "name": "Flour"
    }
  ],
  "instructions": [
    "Mix ingredients",
    "Bake in oven"
  ]
}


```

### FILE: `fixtures/valid/equipment-structured-uses.valid.json`

* bytes: 754
* sha256: f67e3fcfa88e55db4bdf222085ec26a35a6cfa381d7bded3ffceed313e4ed8d5

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "equipment": 1,
    "structured": 1
  },
  "name": "Recipe with Structured Equipment Usage",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    {
      "id": "skillet",
      "name": "8-inch skillet"
    },
    {
      "id": "spatula",
      "name": "Spatula"
    }
  ],
  "ingredients": [
    {
      "id": "meat",
      "name": "Meat"
    }
  ],
  "instructions": [
    {
      "id": "sear",
      "text": "Sear the meat in the skillet",
      "usesEquipment": ["skillet", "spatula"]
    },
    {
      "id": "rest",
      "text": "Let rest for 5 minutes"
    }
  ]
}


```

### FILE: `fixtures/valid/mise-en-place-basic.valid.json`

* bytes: 477
* sha256: 4174dffeb2b4c00c86480895ccbda7a2072b1fb8683b5dd14b2502d33a9a9256

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1
  },
  "name": "Recipe with Basic Mise En Place",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    "onion",
    "garlic"
  ],
  "instructions": [
    "Cook the ingredients"
  ],
  "miseEnPlace": [
    { "text": "Finely dice the onion" },
    { "text": "Mince the garlic" }
  ]
}


```

### FILE: `fixtures/valid/mise-en-place-referenced-equipment.valid.json`

* bytes: 767
* sha256: 8e3603d32e4241d113c5428649b7b40f3749c4fefd82465e7339648f290cf925

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1,
    "referenced": 1,
    "structured": 1,
    "equipment": 1
  },
  "name": "Recipe with Mise En Place References",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    {
      "id": "knife",
      "name": "Chef's knife"
    }
  ],
  "ingredients": [
    {
      "id": "onion",
      "name": "Onion"
    }
  ],
  "instructions": [
    {
      "id": "cook",
      "text": "Cook the onion",
      "inputs": ["onion"]
    }
  ],
  "miseEnPlace": [
    {
      "text": "Dice the onion with a sharp knife",
      "inputs": ["onion"],
      "usesEquipment": ["knife"]
    }
  ]
}


```

### FILE: `fixtures/valid/prep-ingredient-strings.valid.json`

* bytes: 780
* sha256: 267f6cdc17eabf7ed8ea46c5d723599dde1b69d2a67ef63ba025b4b8a76aea95

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1,
    "quantified": 1
  },
  "name": "Recipe with Ingredient Prep Strings",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    {
      "id": "onion",
      "name": "Onion",
      "quantity": {
        "amount": 1,
        "unit": "medium"
      },
      "prep": "finely diced"
    },
    {
      "id": "garlic",
      "name": "Garlic",
      "quantity": {
        "amount": 2,
        "unit": "cloves"
      },
      "prep": ["peeled", "minced"]
    }
  ],
  "instructions": [
    "Cook the ingredients"
  ],
  "miseEnPlace": [
    { "text": "Prepare ingredients as specified" }
  ]
}


```

### FILE: `fixtures/valid/prep-ingredient-structured.valid.json`

* bytes: 720
* sha256: 65fbf02438e9c776a5e9071fa876f977104b286fc1786d1214262770b23c117f

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1,
    "quantified": 1
  },
  "name": "Recipe with Structured Prep Items",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    {
      "id": "tomato",
      "name": "Tomato",
      "quantity": {
        "amount": 2,
        "unit": "medium"
      },
      "prep": [
        { "verb": "dice", "detail": "fine" },
        { "verb": "reserve", "detail": "half for garnish" }
      ]
    }
  ],
  "instructions": [
    "Use the prepared ingredients"
  ],
  "miseEnPlace": [
    { "text": "Prepare ingredients as specified" }
  ]
}


```

### FILE: `fixtures/valid/profile-equipped.valid.json`

* bytes: 371
* sha256: 374e31ee928d814ebafbcd1deaf7ddf67541d48fe90dfcf9a20454edf55dc2b8

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "profile": "equipped",
  "stacks": {
    "equipment": 1
  },
  "name": "Simple Recipe with Equipment",
  "equipment": [
    "mixing bowl",
    "whisk"
  ],
  "ingredients": [
    "flour",
    "eggs"
  ],
  "instructions": [
    "Mix ingredients in a bowl",
    "Whisk until smooth"
  ]
}


```

### FILE: `fixtures/valid/profile-prepped.valid.json`

* bytes: 377
* sha256: dc23a4b8a45f3680cca79d33a2c2a0d3535a73e486221b68ead0cbd67a3430f7

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "profile": "prepped",
  "stacks": {
    "prep": 1
  },
  "name": "Prepped Profile Recipe",
  "ingredients": [
    "onion",
    "garlic"
  ],
  "instructions": [
    "Cook the ingredients"
  ],
  "miseEnPlace": [
    { "text": "Finely dice the onion" },
    { "text": "Mince the garlic" }
  ]
}


```

### FILE: `fixtures/valid/quantified-nested-ingredient-sections.valid.json`

* bytes: 1180
* sha256: 5836ae5113905e96542b6be01e12ba0418e9b92d15f522f1bdc7a60cf8384a80

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1
  },
  "name": "Nested Ingredient Sections",
  "yield": {
    "amount": 1,
    "unit": "batch"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    {
      "section": "Dough",
      "ingredients": [
        {
          "section": "Dry",
          "ingredients": [
            {
              "id": "flour",
              "name": "Flour",
              "quantity": {
                "amount": 500,
                "unit": "g"
              }
            },
            {
              "id": "salt",
              "name": "Salt",
              "quantity": {
                "amount": 10,
                "unit": "g"
              }
            }
          ]
        },
        {
          "section": "Wet",
          "ingredients": [
            {
              "id": "water",
              "name": "Water",
              "quantity": {
                "amount": 300,
                "unit": "ml"
              }
            }
          ]
        }
      ]
    }
  ],
  "instructions": [
    "Mix ingredients",
    "Knead dough"
  ]
}


```

### FILE: `fixtures/valid/referenced-scaling.valid.json`

* bytes: 1041
* sha256: ff210a8e115acd3db12d1662217f462f7d571e9019198dd51159975fbc947664

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "scaling": 1,
    "structured": 1,
    "referenced": 1
  },
  "name": "Referenced with Scaling",
  "yield": {
    "amount": 1,
    "unit": "loaf"
  },
  "time": {
    "total": {
      "minutes": 60
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Bread flour",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    },
    {
      "id": "water",
      "name": "Water",
      "quantity": {
        "amount": 325,
        "unit": "g"
      },
      "scaling": {
        "mode": "bakersPercent",
        "percent": 65,
        "of": "flour"
      }
    }
  ],
  "instructions": [
    {
      "id": "mix",
      "text": "Mix flour and water",
      "inputs": ["flour", "water"]
    },
    {
      "id": "bake",
      "text": "Bake the bread",
      "inputs": ["flour", "water"]
    }
  ],
  "scaling": {
    "discrete": {
      "min": 1,
      "max": 4,
      "step": 1
    }
  }
}


```

### FILE: `fixtures/valid/storage-leftovers-simple.valid.json`

* bytes: 567
* sha256: c69b480e8b72c354314a51b23313efc935f9f68ad91b6701f8799198c5b0dbbc

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Soup with Simple Leftovers",
  "ingredients": [
    "soup"
  ],
  "instructions": [
    "Cook the soup"
  ],
  "storage": {
    "refrigerated": {
      "duration": {
        "iso8601": "P4D"
      }
    },
    "leftovers": {
      "notes": "Store in an airtight container.",
      "reheat": [
        "Microwave 2–3 minutes, stirring halfway.",
        "Or warm in a skillet over medium heat with a splash of water."
      ]
    }
  }
}


```

### FILE: `fixtures/valid/storage-leftovers-structured.valid.json`

* bytes: 888
* sha256: 8ee6536480c36db37b86bfa3691c1a818e29366cd2325b2befa1415d59e5e9a1

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Casserole with Structured Reheating",
  "ingredients": [
    "casserole ingredients"
  ],
  "instructions": [
    "Prepare the casserole"
  ],
  "storage": {
    "frozen": {
      "duration": {
        "iso8601": "P2M"
      }
    },
    "leftovers": {
      "portioning": {
        "notes": "Cool completely, then portion into containers."
      },
      "reheat": [
        {
          "method": "microwave",
          "duration": {
            "minMinutes": 2,
            "maxMinutes": 3
          },
          "notes": "Stir halfway."
        },
        {
          "method": "oven",
          "temp": {
            "value": 350,
            "unit": "F"
          },
          "notes": "Cover and heat until hot throughout."
        }
      ]
    }
  }
}


```

### FILE: `fixtures/valid/structured-nested-step-sections.valid.json`

* bytes: 1721
* sha256: 9572c447e4ca553b22a0f41a557a94bc1b9e1f51f90893ba98cecb44e1f52421

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "structured": 1,
    "timed": 1
  },
  "name": "Nested Step Sections",
  "yield": {
    "amount": 1,
    "unit": "dish"
  },
  "time": {
    "total": {
      "minutes": 90
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Flour"
    },
    {
      "id": "water",
      "name": "Water"
    }
  ],
  "instructions": [
    {
      "section": "Main",
      "steps": [
        {
          "section": "Prep",
          "steps": [
            {
              "id": "prep1",
              "text": "Prepare ingredients",
              "timing": {
                "activity": "active",
                "duration": {
                  "minutes": 10
                }
              }
            },
            {
              "id": "prep2",
              "text": "Measure everything",
              "timing": {
                "activity": "active",
                "duration": {
                  "minutes": 5
                }
              }
            }
          ]
        },
        {
          "section": "Cooking",
          "steps": [
            {
              "id": "cook1",
              "text": "Mix everything together",
              "timing": {
                "activity": "active",
                "duration": {
                  "minutes": 15
                }
              }
            },
            {
              "id": "cook2",
              "text": "Cook until done",
              "timing": {
                "activity": "active",
                "duration": {
                  "minutes": 30
                }
              }
            }
          ]
        }
      ]
    }
  ]
}


```

### FILE: `package.json`

* bytes: 956
* sha256: a2c66626b9b10f7f9206fa1793593feeb41ca3d8455cbc52255cd9c6d5f50bee

```
{
  "name": "soustack-spec",
  "version": "0.0.1",
  "type": "module",
  "private": true,
  "repository": {
    "type": "git",
    "url": "https://github.com/RichardHerold/soustack-spec.git"
  },
  "scripts": {
    "guard": "node scripts/guard-no-legacy.mjs",
    "check-refs": "node scripts/check-schema-refs.mjs",
    "validate": "node scripts/validate-fixtures.mjs",
    "verify:registry": "node scripts/validate-registry.mjs",
    "verify:stack-docs": "node scripts/verify-stack-docs.mjs",
    "build:schemas": "node scripts/generate-stack-gating.mjs",
    "docs:sync": "node scripts/generate-docs-from-registry.mjs",
    "verify:generated": "node scripts/verify-generated-clean.mjs",
    "verify": "npm run verify:registry && npm run verify:stack-docs && npm run check-refs && npm run guard && npm run validate && npm run verify:generated",
    "test": "npm run verify"
  },
  "dependencies": {
    "ajv": "^8.17.1",
    "ajv-formats": "^3.0.1"
  }
}

```

### FILE: `schemas/stacks-registry.schema.json`

* bytes: 3211
* sha256: 08c96b980e14bfdc6e8604ad3068c9770fcdcd4b995a0fcdac04ab0634462da9

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "../schemas/stacks-registry.schema.json",
  "title": "Soustack Stacks Registry Schema",
  "type": "object",
  "properties": {
    "$schema": { "type": "string" },
    "registryVersion": { "type": "integer", "minimum": 1 },
    "spec": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "currentSpecVersion": { "type": "string" },
        "canonicalStacksFormat": { "type": "string", "enum": ["map"] }
      },
      "required": ["name", "currentSpecVersion", "canonicalStacksFormat"],
      "additionalProperties": false
    },
    "profiles": {
      "type": "object",
      "propertyNames": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9-]*$"
      },
      "additionalProperties": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "description": { "type": "string" },
          "requiresProfiles": {
            "type": "array",
            "items": { "type": "string" }
          },
          "requiresStacks": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["title", "description"],
        "anyOf": [
          { "required": ["requiresProfiles"] },
          { "required": ["requiresStacks"] }
        ],
        "additionalProperties": false
      }
    },
    "stacks": {
      "type": "object",
      "propertyNames": {
        "anyOf": [
          {
            "type": "string",
            "pattern": "^[a-z][a-z0-9-]*$"
          },
          {
            "type": "string",
            "pattern": "^x-[a-z0-9-]+(?:\\.[a-z0-9-]+)*$"
          }
        ]
      },
      "additionalProperties": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "latestMajor": { "type": "integer", "minimum": 1 },
          "profile": { "type": "string" },
          "requires": {
            "type": "array",
            "items": { "type": "string" }
          },
          "schema": {
            "type": "object",
            "properties": {
              "major": {
                "type": "object",
                "propertyNames": {
                  "type": "string",
                  "pattern": "^[0-9]+$"
                },
                "additionalProperties": { "type": "string" }
              }
            },
            "required": ["major"],
            "additionalProperties": false
          },
          "docs": {
            "type": "object",
            "properties": {
              "major": {
                "type": "object",
                "propertyNames": {
                  "type": "string",
                  "pattern": "^[0-9]+$"
                },
                "additionalProperties": { "type": "string" }
              }
            },
            "required": ["major"],
            "additionalProperties": false
          }
        },
        "required": ["title", "latestMajor", "profile", "requires", "schema"],
        "additionalProperties": false
      }
    }
  },
  "required": ["registryVersion", "spec", "profiles", "stacks"],
  "additionalProperties": false
}


```

### FILE: `scripts/check-schema-refs.mjs`

* bytes: 1712
* sha256: 8f1474efc25a33ad343c2201a5ed4370f105244950a16d9448cf7ff089b8dc87

```
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

```

### FILE: `scripts/dump-repo-for-ai.mjs`

* bytes: 11673
* sha256: ce1e803598becb338f9e7799fe537a9768a3bbeb6f92e30016a6a192c1db3e38

```
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


```

### FILE: `scripts/generate-docs-from-registry.mjs`

* bytes: 3984
* sha256: 4b4e2eba131865088e315d2cefc0bfe184e3c8edc4f2d440f4b29ab6e7c5eaa9

```
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


```

### FILE: `scripts/generate-stack-gating.mjs`

* bytes: 16404
* sha256: 03013b014594a296e379fd12b0b23973253690d20550b96150e07e153bb0fcbc

```
#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

/**
 * Recursively rewrite $ref values to make them absolute
 * When we inline a property from another schema, all $ref values need to be absolute:
 * - #/$defs/... references become schemaId#/$defs/...
 * - Relative path references like ../defs/... need to be resolved relative to schemaId
 */
function rewriteRefs(obj, schemaId, schemaBasePath) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => rewriteRefs(item, schemaId, schemaBasePath));
  }
  
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$ref' && typeof value === 'string') {
      // If it's a relative $defs reference, make it absolute
      if (value.startsWith('#/$defs/') || value.startsWith('#/')) {
        result[key] = `${schemaId}${value}`;
      } else if (value.startsWith('../') || value.startsWith('./')) {
        // Relative path reference - resolve it relative to the schema's base path
        // schemaBasePath is like "stacks/scaling.schema.json"
        // value might be "../defs/quantity.schema.json"
        // We need to resolve this to an absolute URI
        let finalPath;
        if (value.startsWith('../')) {
          // Go up one level from schema dir
          // schemaBasePath = "stacks/scaling.schema.json"
          // schemaDir = "stacks"
          // parentDir = "" (empty, we're at root)
          // value = "../defs/quantity.schema.json"
          // finalPath should be "defs/quantity.schema.json"
          const schemaDir = schemaBasePath.substring(0, schemaBasePath.lastIndexOf('/'));
          if (schemaDir) {
            const parentDir = schemaDir.substring(0, schemaDir.lastIndexOf('/'));
            finalPath = parentDir ? `${parentDir}/${value.substring(3)}` : value.substring(3);
          } else {
            finalPath = value.substring(3);
          }
        } else if (value.startsWith('./')) {
          // Same directory as schema
          const schemaDir = schemaBasePath.substring(0, schemaBasePath.lastIndexOf('/'));
          finalPath = schemaDir ? `${schemaDir}/${value.substring(2)}` : value.substring(2);
        } else {
          finalPath = value;
        }
        // Convert to absolute URI, ensuring no double slashes
        const normalized = finalPath.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/+/g, '/');
        result[key] = `https://soustack.spec/${normalized}`;
      } else if (!value.includes('://') && !value.startsWith('#')) {
        // Relative path without ./ or ../ - assume it's relative to defs or stacks
        // This shouldn't happen in our schemas, but handle it
        result[key] = `https://soustack.spec/${value}`;
      } else {
        // Already absolute or external reference
        result[key] = value;
      }
    } else {
      result[key] = rewriteRefs(value, schemaId, schemaBasePath);
    }
  }
  
  return result;
}

/**
 * Load a stack schema and extract its properties and required fields
 * 
 * When inlining a property from another schema, we need to:
 * 1. Inline the property definition
 * 2. Rewrite all $refs to be absolute (including #/$defs/ and relative paths)
 * 3. Also inline any $defs that the property depends on, since they contain
 *    relative path references that won't resolve when the property is used
 *    in a different schema context
 */
async function loadStackSchema(schemaPath) {
  const fullPath = join(repoRoot, schemaPath);
  const schema = JSON.parse(await readFile(fullPath, 'utf8'));
  
  const properties = schema.properties || {};
  const required = schema.required || [];
  
  // Use the schema's $id if available, otherwise construct from path
  const schemaId = schema.$id || `https://soustack.spec/${schemaPath.replace(/\\/g, '/')}`;
  
  // Collect all $defs names used in the properties
  const defsUsed = new Set();
  function collectDefRefs(obj) {
    if (typeof obj !== 'object' || obj === null) return;
    if (Array.isArray(obj)) {
      obj.forEach(collectDefRefs);
      return;
    }
    for (const [key, value] of Object.entries(obj)) {
      if (key === '$ref' && typeof value === 'string' && value.startsWith('#/$defs/')) {
        defsUsed.add(value.substring(8)); // Remove '#/$defs/' prefix
      } else {
        collectDefRefs(value);
      }
    }
  }
  
  for (const prop of Object.values(properties)) {
    collectDefRefs(prop);
  }
  
  // Build property refs: inline the property definition and rewrite all $refs
  const propertyRefs = {};
  for (const propName of Object.keys(properties)) {
    // Inline the property definition and rewrite all $refs to be absolute
    const propertyDef = JSON.parse(JSON.stringify(properties[propName]));
    propertyRefs[propName] = rewriteRefs(propertyDef, schemaId, schemaPath);
  }
  
  // Also collect and inline the $defs we need, with their $refs rewritten
  const inlinedDefs = {};
  if (schema.$defs) {
    for (const defName of defsUsed) {
      if (schema.$defs[defName]) {
        const defCopy = JSON.parse(JSON.stringify(schema.$defs[defName]));
        inlinedDefs[defName] = rewriteRefs(defCopy, schemaId, schemaPath);
      }
    }
  }
  
  return {
    properties: propertyRefs,
    required: required,
    defs: inlinedDefs
  };
}

/**
 * Build condition for stack presence with a specific major version
 */
function buildStackMajorCondition(stackId, major) {
  return {
    required: ['stacks'],
    properties: {
      stacks: {
        required: [stackId],
        properties: {
          [stackId]: { const: major }
        }
      }
    }
  };
}

/**
 * Build condition for stack presence (any supported major)
 */
function buildStackPresenceCondition(stackId, supportedMajors) {
  return {
    required: ['stacks'],
    properties: {
      stacks: {
        required: [stackId],
        properties: {
          [stackId]: {
            type: 'integer',
            enum: supportedMajors
          }
        }
      }
    }
  };
}

/**
 * Generate gating rules for a single stack
 * Returns an object with allOf containing:
 * - Unsupported major rejection rule
 * - Per-major if/then rules (with prerequisites in then)
 */
async function generateStackGatingRule(stackId, stack, registry, allDefs) {
  const supportedMajors = Object.keys(stack.schema.major)
    .map(m => parseInt(m, 10))
    .sort((a, b) => a - b);
  
  const requires = stack.requires || [];
  
  // A2: Generate unsupported major rejection rule
  // This rule rejects unsupported majors when the stack is present
  const unsupportedMajorRule = {
    if: {
      required: ['stacks'],
      properties: {
        stacks: {
          required: [stackId]
        }
      }
    },
    then: {
      properties: {
        stacks: {
          properties: {
            [stackId]: {
              enum: supportedMajors
            }
          }
        }
      }
    }
  };
  
  // A1: Build prerequisite conditions for each prerequisite stack
  // Each prerequisite must exist AND be a supported major
  const prerequisiteConditions = [];
  for (const reqStackId of requires) {
    const reqStack = registry.stacks[reqStackId];
    if (!reqStack) {
      throw new Error(`Stack "${stackId}" requires missing stack: "${reqStackId}"`);
    }
    const reqSupportedMajors = Object.keys(reqStack.schema.major)
      .map(m => parseInt(m, 10))
      .sort((a, b) => a - b);
    prerequisiteConditions.push({
      properties: {
        stacks: {
          required: [reqStackId],
          properties: {
            [reqStackId]: {
              enum: reqSupportedMajors
            }
          }
        }
      }
    });
  }
  
  // Generate per-major if/then rules
  const majorRules = [];
  for (const major of supportedMajors) {
    const schemaPath = stack.schema.major[String(major)];
    const schemaInfo = await loadStackSchema(schemaPath);
    
    // Merge $defs into the global collection (with namespacing to avoid conflicts)
    if (schemaInfo.defs) {
      // First pass: collect all def names and create namespace mapping
      const defNameMap = new Map();
      for (const defName of Object.keys(schemaInfo.defs)) {
        const namespacedName = `${stackId}@${major}_${defName}`;
        defNameMap.set(defName, namespacedName);
        allDefs[namespacedName] = schemaInfo.defs[defName];
      }
      
      // Second pass: update $refs in properties to point to namespaced $defs
      function updateDefRefs(obj) {
        if (typeof obj !== 'object' || obj === null) return obj;
        if (Array.isArray(obj)) {
          return obj.map(updateDefRefs);
        }
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          if (key === '$ref' && typeof value === 'string') {
            // If it references one of our $defs, update to namespaced version
            const defMatch = value.match(/^https:\/\/soustack\.spec\/stacks\/[^#]+#\/\$defs\/(.+)$/);
            if (defMatch && defNameMap.has(defMatch[1])) {
              result[key] = `#/$defs/${defNameMap.get(defMatch[1])}`;
            } else {
              result[key] = value;
            }
          } else {
            result[key] = updateDefRefs(value);
          }
        }
        return result;
      }
      
      // Update all properties
      for (const propName of Object.keys(schemaInfo.properties)) {
        schemaInfo.properties[propName] = updateDefRefs(schemaInfo.properties[propName]);
      }
    }
    
    // A1: Build if condition: stack present with this specific major (no prerequisites in if)
    const ifCondition = buildStackMajorCondition(stackId, major);
    
    // A1: Build then clause: allOf with prerequisites + schema properties
    const thenClauseAllOf = [];
    
    // Add prerequisite conditions to then
    thenClauseAllOf.push(...prerequisiteConditions);
    
    // Add schema properties and required fields
    const schemaClause = {};
    if (Object.keys(schemaInfo.properties).length > 0) {
      schemaClause.properties = schemaInfo.properties;
    }
    if (schemaInfo.required.length > 0) {
      schemaClause.required = schemaInfo.required;
    }
    if (Object.keys(schemaClause).length > 0) {
      thenClauseAllOf.push(schemaClause);
    }
    
    // Build then clause
    const thenClause = thenClauseAllOf.length === 1
      ? thenClauseAllOf[0]
      : { allOf: thenClauseAllOf };
    
    majorRules.push({
      if: ifCondition,
      then: thenClause
    });
  }
  
  // A3: Return allOf with unsupported major rule + per-major rules (no oneOf)
  return {
    allOf: [
      unsupportedMajorRule,
      ...majorRules
    ]
  };
}

/**
 * Generate all stack gating rules and collect $defs to merge
 */
async function generateStackGating(registry) {
  const gatingRules = [];
  const allDefs = {}; // Collect all $defs from stack schemas
  
  // Get official stacks (exclude vendor stacks starting with x-)
  const officialStacks = Object.keys(registry.stacks)
    .filter(id => !id.startsWith('x-'))
    .sort(); // Deterministic ordering
  
  // Generate rules for each official stack
  for (const stackId of officialStacks) {
    const stack = registry.stacks[stackId];
    const rule = await generateStackGatingRule(stackId, stack, registry, allDefs);
    gatingRules.push(rule);
  }
  
  return { rules: gatingRules, defs: allDefs };
}

/**
 * Recursively collect all required stacks for a given profile
 */
function collectRequiredStacks(profileId, registry, visited = new Set()) {
  if (visited.has(profileId)) {
    return new Set(); // Cycle detected, return empty to avoid infinite recursion
  }
  visited.add(profileId);
  
  const profile = registry.profiles[profileId];
  if (!profile) {
    return new Set();
  }
  
  const allRequiredStacks = new Set();
  
  // Add direct required stacks
  const requiresStacks = profile.requiresStacks || [];
  for (const stackId of requiresStacks) {
    allRequiredStacks.add(stackId);
  }
  
  // Recursively collect stacks from required profiles
  const requiresProfiles = profile.requiresProfiles || [];
  for (const reqProfileId of requiresProfiles) {
    const reqStacks = collectRequiredStacks(reqProfileId, registry, new Set(visited));
    for (const stackId of reqStacks) {
      allRequiredStacks.add(stackId);
    }
  }
  
  return allRequiredStacks;
}

/**
 * Generate profile validation rules
 */
function generateProfileValidation(registry) {
  const profileRules = [];
  
  // Get all profiles sorted for deterministic output
  const profileIds = Object.keys(registry.profiles).sort();
  
  for (const profileId of profileIds) {
    // Collect all required stacks recursively (from this profile and all prerequisite profiles)
    const allRequiredStacks = collectRequiredStacks(profileId, registry);
    const requiresStacks = Array.from(allRequiredStacks).sort();
    
    // Only generate rule if there are required stacks
    if (requiresStacks.length > 0) {
      const thenClause = {
        required: ['stacks'],
        properties: {
          stacks: {
            required: requiresStacks,
            properties: {}
          }
        }
      };
      
      // For each required stack, require it to be present with a supported major
      for (const stackId of requiresStacks) {
        const stack = registry.stacks[stackId];
        if (!stack) {
          throw new Error(`Profile "${profileId}" requires stack "${stackId}" which is not in registry`);
        }
        const supportedMajors = Object.keys(stack.schema.major)
          .map(m => parseInt(m, 10))
          .sort((a, b) => a - b);
        thenClause.properties.stacks.properties[stackId] = {
          type: 'integer',
          enum: supportedMajors
        };
      }
      
      profileRules.push({
        if: {
          required: ['profile'],
          properties: {
            profile: { const: profileId }
          }
        },
        then: thenClause
      });
    }
  }
  
  return profileRules;
}

/**
 * Update the profile property enum in the schema to match registry
 * Option 2: Allow vendor profiles (x-*) since vendor stacks are supported
 */
function updateProfileEnum(schema, registry) {
  const profileIds = Object.keys(registry.profiles).sort();
  
  // Option 2: Allow official profiles + vendor profiles
  schema.properties.profile = {
    type: 'string',
    anyOf: [
      { enum: profileIds },
      { pattern: '^x-[a-z0-9-]+(?:\\.[a-z0-9-]+)*$' }
    ]
  };
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const schemaPath = join(repoRoot, 'soustack.schema.json');

  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'));

  // Update profile enum from registry
  updateProfileEnum(schema, registry);

  // Generate gating rules and collect $defs
  const { rules: gatingRules, defs: stackDefs } = await generateStackGating(registry);
  const profileRules = generateProfileValidation(registry);

  // Merge $defs from stack schemas into main schema
  if (!schema.$defs) {
    schema.$defs = {};
  }
  Object.assign(schema.$defs, stackDefs);

  // Find the placeholder in allOf
  const allOf = schema.allOf;
  let beginIdx = -1;
  let endIdx = -1;

  for (let i = 0; i < allOf.length; i++) {
    if (allOf[i].$comment === 'BEGIN GENERATED STACK GATING') {
      beginIdx = i;
    }
    if (allOf[i].$comment === 'END GENERATED STACK GATING') {
      endIdx = i;
    }
  }

  if (beginIdx === -1 || endIdx === -1) {
    throw new Error('Could not find stack gating markers in schema');
  }

  // Replace content between markers (profile validation before stack gating)
  const newAllOf = [
    ...allOf.slice(0, beginIdx + 1),
    ...profileRules,
    ...gatingRules,
    ...allOf.slice(endIdx)
  ];

  schema.allOf = newAllOf;

  // Write back
  await writeFile(schemaPath, JSON.stringify(schema, null, 2) + '\n', 'utf8');
  console.log(`Generated ${gatingRules.length} stack gating rules and ${profileRules.length} profile validation rules in soustack.schema.json`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

```

### FILE: `scripts/guard-no-legacy.mjs`

* bytes: 762
* sha256: d49e2fac9bc883aec61c99fa3689b11f134c64666a22d6ae2a8cce7c8aae1ce8

```
#!/usr/bin/env node
import { stat } from 'node:fs/promises';
import { join } from 'node:path';

const forbiddenPaths = [
  'profiles',
  'schemas/recipe',
  'schemas/registry'
];

async function pathExists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let violations = [];

  for (const rel of forbiddenPaths) {
    const exists = await pathExists(join(process.cwd(), rel));
    if (exists) {
      violations.push(`forbidden path present: ${rel}`);
    }
  }

  if (violations.length) {
    console.error('Legacy guard failed:');
    for (const v of violations) console.error(` - ${v}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

```

### FILE: `scripts/migrate-stacks-to-map.mjs`

* bytes: 1859
* sha256: 5b9aaac4ba0eedaea4fcaddd60fd93ef9bbffe4d858baca1cd6890ae287e9900

```
#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

async function walk(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (extname(full) === '.json') {
      files.push(full);
    }
  }
  return files;
}

function migrateStacks(data) {
  if (!data.stacks || !Array.isArray(data.stacks)) {
    return data; // Already map or missing
  }
  
  const map = {};
  for (const entry of data.stacks) {
    if (typeof entry !== 'string') {
      throw new Error(`Invalid stack entry: ${entry} (must be string)`);
    }
    const match = entry.match(/^([^@]+)@(\d+)$/);
    if (!match) {
      throw new Error(`Invalid stack format: ${entry} (must be name@major)`);
    }
    const [, name, major] = match;
    map[name] = parseInt(major, 10);
  }
  
  return { ...data, stacks: map };
}

async function main() {
  const fixtureFiles = await walk(join(repoRoot, 'fixtures'));
  let migrated = 0;
  
  for (const file of fixtureFiles) {
    const raw = await readFile(file, 'utf8');
    const data = JSON.parse(raw);
    
    if (Array.isArray(data.stacks)) {
      const migratedData = migrateStacks(data);
      await writeFile(file, JSON.stringify(migratedData, null, 2) + '\n', 'utf8');
      console.log(`Migrated: ${file}`);
      migrated++;
    }
  }
  
  console.log(`\nMigrated ${migrated} fixture file(s) to stacks map format.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


```

### FILE: `scripts/validate-fixtures.mjs`

* bytes: 17250
* sha256: 88fb43759115debc5c6ea153f2ccefaddd790db9e3f00e9d8215eed3eedd7503

```
#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const ajv = new Ajv2020({ strict: false, allErrors: true, allowUnionTypes: true });
addFormats(ajv);

let registry = null;

async function loadRegistry() {
  if (!registry) {
    const registryPath = join(repoRoot, 'stacks', 'registry.json');
    registry = JSON.parse(await readFile(registryPath, 'utf8'));
  }
  return registry;
}

async function loadSchemas() {
  const schemaFiles = [];
  for (const dir of ['defs', 'stacks']) {
    const entries = await readdir(dir);
    for (const entry of entries) {
      if (entry.endsWith('.json') && entry !== 'registry.json') {
        schemaFiles.push(join(dir, entry));
      }
    }
  }
  schemaFiles.push('soustack.schema.json');

  for (const file of schemaFiles) {
    const json = JSON.parse(await readFile(file, 'utf8'));
    ajv.addSchema(json, json.$id || file);
  }
}

async function walk(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (extname(full) === '.json') {
      files.push(full);
    }
  }
  return files;
}

function normalizeStacksToMap(stacks) {
  // Convert array format to map format if needed
  if (Array.isArray(stacks)) {
    const map = {};
    for (const entry of stacks) {
      if (typeof entry === 'string') {
        const match = entry.match(/^([^@]+)@(\d+)$/);
        if (match) {
          const [, name, major] = match;
          map[name] = parseInt(major, 10);
        } else {
          throw new Error(`Invalid stack format: ${entry} (must be name@major)`);
        }
      }
    }
    return map;
  }
  if (typeof stacks === 'object' && stacks !== null) {
    return stacks;
  }
  return {};
}

function getStacksSet(stacksMap) {
  const set = new Set();
  for (const [name, major] of Object.entries(stacksMap)) {
    set.add(`${name}@${major}`);
  }
  return set;
}

/**
 * Check if a stack is present with any supported major version
 */
function hasStackVersion(stacksMap, stackId, registry) {
  if (!(stackId in stacksMap)) {
    return false;
  }
  const declaredMajor = stacksMap[stackId];
  const stack = registry.stacks[stackId];
  if (!stack) {
    return false;
  }
  const supportedMajors = Object.keys(stack.schema.major)
    .map(m => parseInt(m, 10));
  return supportedMajors.includes(declaredMajor);
}

function collectIngredients(ingredients = []) {
  const list = [];
  for (const item of ingredients) {
    if (item && typeof item === 'object' && Array.isArray(item.ingredients)) {
      list.push(...collectIngredients(item.ingredients));
    } else if (item && typeof item === 'object') {
      list.push(item);
    }
  }
  return list;
}

function collectSteps(instructions = []) {
  const steps = [];
  for (const entry of instructions) {
    if (entry && typeof entry === 'object' && Array.isArray(entry.steps)) {
      steps.push(...collectSteps(entry.steps));
    } else if (entry && typeof entry === 'object') {
      steps.push(entry);
    }
  }
  return steps;
}

function validateTemperatureRange(temp, context) {
  if (!temp || typeof temp !== 'object') return null;
  if ('minValue' in temp && 'maxValue' in temp) {
    if (!(temp.minValue <= temp.maxValue)) {
      return `${context} temperature minValue must be <= maxValue`;
    }
  }
  return null;
}

function uniqueCheck(items, key, label) {
  const seen = new Set();
  for (const item of items) {
    if (!item[key]) continue;
    if (seen.has(item[key])) {
      return `${label} id duplicated: ${item[key]}`;
    }
    seen.add(item[key]);
  }
  return null;
}

function validateDAG(steps) {
  const graph = new Map();
  for (const step of steps) {
    graph.set(step.id, new Set(step.dependsOn || []));
  }
  for (const [id, deps] of graph.entries()) {
    for (const dep of deps) {
      if (!graph.has(dep)) {
        return `dependsOn references missing step: ${dep}`;
      }
    }
  }
  const visited = new Set();
  const stack = new Set();
  function dfs(node) {
    if (stack.has(node)) return `cycle detected at ${node}`;
    if (visited.has(node)) return null;
    stack.add(node);
    const deps = graph.get(node) || new Set();
    for (const dep of deps) {
      const res = dfs(dep);
      if (res) return res;
    }
    stack.delete(node);
    visited.add(node);
    return null;
  }
  for (const node of graph.keys()) {
    const res = dfs(node);
    if (res) return res;
  }
  return null;
}

function checkConformance(data, file, reg) {
  const errors = [];
  
  // Normalize stacks to map format
  let stacksMap;
  let warnedArray = false;
  if (Array.isArray(data.stacks)) {
    warnedArray = true;
    stacksMap = normalizeStacksToMap(data.stacks);
  } else {
    stacksMap = normalizeStacksToMap(data.stacks || {});
  }
  
  // Validate stacks against registry
  const officialStacks = Object.keys(reg.stacks).filter(id => !id.startsWith('x-'));
  for (const [stackId, major] of Object.entries(stacksMap)) {
    if (stackId.startsWith('x-')) {
      // Vendor stacks are allowed
      continue;
    }
    if (!officialStacks.includes(stackId)) {
      errors.push(`Unknown official stack: ${stackId}`);
      continue;
    }
    const stack = reg.stacks[stackId];
    // Check if declared major is in supported majors
    const supportedMajors = Object.keys(stack.schema.major)
      .map(m => parseInt(m, 10));
    if (!supportedMajors.includes(major)) {
      errors.push(`Stack "${stackId}" major ${major} not supported (supported: ${supportedMajors.join(', ')})`);
    }
    // Check prerequisites - prereq must exist AND be a supported major
    for (const req of stack.requires) {
      if (!hasStackVersion(stacksMap, req, reg)) {
        const reqStack = reg.stacks[req];
        if (!reqStack) {
          errors.push(`Stack "${stackId}" requires missing stack: "${req}"`);
        } else {
          const reqSupportedMajors = Object.keys(reqStack.schema.major)
            .map(m => parseInt(m, 10));
          errors.push(`Stack "${stackId}" requires "${req}" with a supported major (${reqSupportedMajors.join(', ')}) but it is not present`);
        }
      }
    }
  }
  
  if (warnedArray) {
    console.warn(`Warning: ${file} uses array stacks format. Should migrate to map format.`);
  }
  
  const stacks = getStacksSet(stacksMap);
  const ingredients = collectIngredients(data.ingredients);
  const steps = collectSteps(data.instructions);

  for (const ingredient of ingredients) {
    const issue = validateTemperatureRange(ingredient.temperature, 'ingredient');
    if (issue) errors.push(issue);
  }
  for (const step of steps) {
    const issue = validateTemperatureRange(step.temperature, `step ${step.id || ''}`.trim());
    if (issue) errors.push(issue);
  }

  if (ingredients.length) {
    const dup = uniqueCheck(ingredients, 'id', 'ingredient');
    if (dup) errors.push(dup);
  }
  if (steps.length) {
    const dup = uniqueCheck(steps, 'id', 'step');
    if (dup) errors.push(dup);
  }

  if (hasStackVersion(stacksMap, 'structured', reg) || hasStackVersion(stacksMap, 'timed', reg) || hasStackVersion(stacksMap, 'referenced', reg)) {
    const dagIssue = validateDAG(steps);
    if (dagIssue) errors.push(dagIssue);
  }

  if (hasStackVersion(stacksMap, 'referenced', reg)) {
    const ids = new Set(ingredients.map((i) => i.id));
    for (const step of steps) {
      if (!Array.isArray(step.inputs) || step.inputs.length === 0) {
        errors.push('referenced step missing inputs');
        continue;
      }
      for (const input of step.inputs) {
        if (!ids.has(input)) errors.push(`referenced input missing ingredient id: ${input}`);
      }
    }
  }

  if (hasStackVersion(stacksMap, 'timed', reg)) {
    for (const step of steps) {
      const duration = step?.timing?.duration;
      if (duration && typeof duration === 'object' && 'minMinutes' in duration && 'maxMinutes' in duration) {
        if (!(duration.minMinutes <= duration.maxMinutes)) {
          errors.push('timed duration minMinutes must be <= maxMinutes');
        }
      }
    }
  }

  if (hasStackVersion(stacksMap, 'compute', reg)) {
    if (data.level !== 'base' || !hasStackVersion(stacksMap, 'quantified', reg) || !hasStackVersion(stacksMap, 'timed', reg)) {
      errors.push('compute stack requires base level with quantified and timed stacks');
    }
  }

  if (hasStackVersion(stacksMap, 'scaling', reg)) {
    const ingredientIds = new Set(ingredients.map((i) => i.id));
    for (const ingredient of ingredients) {
      const scaling = ingredient?.scaling;
      if (scaling && scaling.mode === 'bakersPercent') {
        if (!scaling.percent || scaling.percent <= 0) {
          errors.push('bakersPercent scaling requires percent > 0');
        }
        if (!scaling.of || !ingredientIds.has(scaling.of)) {
          errors.push(`bakersPercent of references missing ingredient id: ${scaling.of || ''}`.trim());
        }
      }
    }

    const discrete = data.scaling?.discrete;
    if (discrete && typeof discrete === 'object') {
      if (discrete.min > discrete.max) {
        errors.push('scaling discrete min must be <= max');
      }
    }
  }

  if (hasStackVersion(stacksMap, 'illustrated', reg)) {
    const stepHasMedia = steps.some((s) => (Array.isArray(s.images) && s.images.length > 0) || (Array.isArray(s.videos) && s.videos.length > 0));
    const recipeHasMedia = (Array.isArray(data.images) && data.images.length > 0) ||
      (Array.isArray(data.videos) && data.videos.length > 0);
    if (!stepHasMedia && !recipeHasMedia) {
      errors.push('illustrated stack requires at least one media URI');
    }
  }

  if (hasStackVersion(stacksMap, 'dietary', reg)) {
    if (!data.dietary) {
      errors.push('dietary block missing');
    } else {
      const { calories, macros, diets, allergens } = data.dietary;
      const hasSignal = (calories !== undefined) ||
        (macros && Object.keys(macros).length > 0) ||
        (Array.isArray(diets) && diets.length > 0) ||
        (Array.isArray(allergens) && allergens.length > 0);
      if (!hasSignal) errors.push('dietary stack requires at least one signal');
    }
  }

  if (hasStackVersion(stacksMap, 'techniques', reg)) {
    const glossary = Array.isArray(data.techniques) ? data.techniques : [];
    const glossaryIds = new Set(glossary.map((t) => t.id));
    for (const step of steps) {
      for (const tech of step.techniqueIds || []) {
        if (!glossaryIds.has(tech)) errors.push(`technique reference missing: ${tech}`);
      }
    }
    if (glossary.length === 0) errors.push('techniques stack requires glossary');
  }

  if (hasStackVersion(stacksMap, 'storage', reg)) {
    const storage = data.storage || {};
    const methods = ['roomTemp', 'refrigerated', 'frozen'];
    const present = methods.filter((m) => storage[m]);
    if (present.length === 0) errors.push('storage stack requires at least one method');
    for (const method of present) {
      const duration = storage[method]?.duration?.iso8601;
      if (!duration || typeof duration !== 'string' || !duration.startsWith('P')) {
        errors.push(`storage method ${method} missing iso8601 duration`);
      }
    }
  }

  if (hasStackVersion(stacksMap, 'equipment', reg)) {
    const equipment = data.equipment || [];
    const equipmentIds = new Set();
    const equipmentObjects = [];
    
    // Collect equipment ids from structured objects
    for (const item of equipment) {
      if (item && typeof item === 'object' && item.id) {
        if (equipmentIds.has(item.id)) {
          errors.push(`equipment id duplicated: ${item.id}`);
        }
        equipmentIds.add(item.id);
        equipmentObjects.push(item);
      }
    }
    
    // Validate step equipment references when structured is present
    if (hasStackVersion(stacksMap, 'structured', reg)) {
      for (const step of steps) {
        if (Array.isArray(step.usesEquipment)) {
          for (const eqId of step.usesEquipment) {
            if (!equipmentIds.has(eqId)) {
              errors.push(`step usesEquipment references missing equipment id: ${eqId}`);
            }
          }
        }
      }
    }
    
    // Validate equipment scaling fields
    for (const item of equipmentObjects) {
      // Validate threshold countScaling
      if (item.countScaling && typeof item.countScaling === 'object' && item.countScaling.mode === 'threshold') {
        const steps = item.countScaling.steps || [];
        if (steps.length === 0) {
          errors.push(`equipment ${item.id} threshold countScaling requires non-empty steps array`);
        }
        for (const step of steps) {
          if (step.maxFactor <= 0) {
            errors.push(`equipment ${item.id} threshold step maxFactor must be > 0`);
          }
          if (step.count < 1) {
            errors.push(`equipment ${item.id} threshold step count must be >= 1`);
          }
        }
      }
      
      // Validate upgrades references
      if (Array.isArray(item.upgrades)) {
        for (const upgrade of item.upgrades) {
          if (upgrade.minFactor <= 0) {
            errors.push(`equipment ${item.id} upgrade minFactor must be > 0`);
          }
          if (!upgrade.use || !equipmentIds.has(upgrade.use)) {
            errors.push(`equipment ${item.id} upgrade references missing equipment id: ${upgrade.use || ''}`.trim());
          }
        }
      }
    }
  }

  if (hasStackVersion(stacksMap, 'prep', reg)) {
    const miseEnPlace = data.miseEnPlace || [];
    
    // Validate task id uniqueness (only if present)
    const taskIds = [];
    for (const task of miseEnPlace) {
      if (task.id) {
        if (taskIds.includes(task.id)) {
          errors.push(`miseEnPlace task id duplicated: ${task.id}`);
        }
        taskIds.push(task.id);
      }
    }
    
    // Validate inputs when referenced stack is present
    if (hasStackVersion(stacksMap, 'referenced', reg)) {
      const ingredientIds = new Set(ingredients.map((i) => i.id).filter(Boolean));
      for (const task of miseEnPlace) {
        if (Array.isArray(task.inputs)) {
          for (const inputId of task.inputs) {
            if (!ingredientIds.has(inputId)) {
              errors.push(`miseEnPlace task inputs references missing ingredient id: ${inputId}`);
            }
          }
        }
      }
    }
    
    // Validate usesEquipment when equipment stack is present
    if (hasStackVersion(stacksMap, 'equipment', reg)) {
      const equipment = data.equipment || [];
      const equipmentIds = new Set();
      
      // Collect equipment ids from structured objects only
      for (const item of equipment) {
        if (item && typeof item === 'object' && item.id) {
          equipmentIds.add(item.id);
        }
      }
      
      for (const task of miseEnPlace) {
        if (Array.isArray(task.usesEquipment)) {
          for (const eqId of task.usesEquipment) {
            if (!equipmentIds.has(eqId)) {
              errors.push(`miseEnPlace task usesEquipment references missing equipment id: ${eqId}`);
            }
          }
        }
      }
    }
  }

  return errors;
}

async function main() {
  await loadSchemas();
  const reg = await loadRegistry();
  const validate = ajv.getSchema('https://soustack.spec/soustack.schema.json');
  if (!validate) throw new Error('main schema not loaded');

  const fixtureFiles = await walk('fixtures');
  let failures = 0;

  for (const file of fixtureFiles) {
    const raw = await readFile(file, 'utf8');
    let data = JSON.parse(raw);
    const expectValid = file.includes('.valid.');
    const expectInvalid = file.includes('.invalid.');

    if (!expectValid && !expectInvalid) {
      console.warn(`Skipping fixture without expectation: ${file}`);
      continue;
    }

    // Normalize stacks to map for schema validation
    if (Array.isArray(data.stacks)) {
      data = { ...data, stacks: normalizeStacksToMap(data.stacks) };
    }

    const schemaOk = validate(data);
    const schemaErrors = schemaOk ? [] : validate.errors || [];
    const conformanceErrors = checkConformance(data, file, reg);
    const overallErrors = [...schemaErrors.map((e) => ajv.errorsText([e], { separator: '; ' })), ...conformanceErrors];
    const passed = schemaOk && conformanceErrors.length === 0;

    if (expectValid && !passed) {
      failures++;
      console.error(`Expected valid but failed: ${file}`);
      overallErrors.forEach((e) => console.error(` - ${e}`));
    }
    if (expectInvalid && passed) {
      failures++;
      console.error(`Expected invalid but passed: ${file}`);
    }
  }

  if (failures > 0) {
    console.error(`Conformance failed for ${failures} fixture(s).`);
    process.exit(1);
  } else {
    console.log('All fixtures conform to expectations.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

```

### FILE: `scripts/validate-registry.mjs`

* bytes: 5581
* sha256: 0a964bb03ae7aa7674675cbb31cebfac8f69b66bfd18fca1d64fde34b47ebab1

```
#!/usr/bin/env node
import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const ajv = new Ajv2020({ strict: false, allErrors: true });
addFormats(ajv);

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function checkCycles(graph, name) {
  const visited = new Set();
  const stack = new Set();
  const cycles = [];

  function dfs(node, path) {
    if (stack.has(node)) {
      cycles.push([...path, node].join(' -> '));
      return;
    }
    if (visited.has(node)) return;
    visited.add(node);
    stack.add(node);
    const deps = graph.get(node) || new Set();
    for (const dep of deps) {
      dfs(dep, [...path, node]);
    }
    stack.delete(node);
  }

  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      dfs(node, []);
    }
  }

  return cycles;
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const schemaPath = join(repoRoot, 'schemas', 'stacks-registry.schema.json');

  // Load and validate schema
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
  ajv.addSchema(schema, schema.$id || schemaPath);

  // Load registry
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));

  // Schema validation
  const validate = ajv.getSchema(schema.$id || schemaPath);
  if (!validate) throw new Error('Failed to load registry schema');
  
  const valid = validate(registry);
  if (!valid) {
    console.error('Registry schema validation failed:');
    validate.errors.forEach(err => {
      console.error(`  ${err.instancePath || '/'}: ${err.message}`);
    });
    process.exit(1);
  }

  const errors = [];

  // Semantic checks
  const stackIds = new Set(Object.keys(registry.stacks));
  const profileIds = new Set(Object.keys(registry.profiles));

  // Check stack requires
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    for (const req of stack.requires) {
      if (!stackIds.has(req)) {
        errors.push(`Stack "${stackId}" requires missing stack: "${req}"`);
      }
    }
  }

  // Check profile references
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    if (!profileIds.has(stack.profile)) {
      errors.push(`Stack "${stackId}" references missing profile: "${stack.profile}"`);
    }
  }

  // Check profile requiresProfiles
  for (const [profileId, profile] of Object.entries(registry.profiles)) {
    const requiresProfiles = profile.requiresProfiles || [];
    for (const req of requiresProfiles) {
      if (!profileIds.has(req)) {
        errors.push(`Profile "${profileId}" requiresProfiles references missing profile: "${req}"`);
      }
    }
  }

  // Check profile requiresStacks
  for (const [profileId, profile] of Object.entries(registry.profiles)) {
    const requiresStacks = profile.requiresStacks || [];
    for (const req of requiresStacks) {
      if (!stackIds.has(req)) {
        errors.push(`Profile "${profileId}" requiresStacks references missing stack: "${req}"`);
      }
    }
  }

  // Check for cycles in stack dependency graph
  const stackGraph = new Map();
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    stackGraph.set(stackId, new Set(stack.requires));
  }
  const stackCycles = checkCycles(stackGraph, 'stack');
  if (stackCycles.length > 0) {
    errors.push(`Stack dependency cycles detected: ${stackCycles.join('; ')}`);
  }

  // Check for cycles in profile graph (via requiresProfiles)
  const profileGraph = new Map();
  for (const [profileId, profile] of Object.entries(registry.profiles)) {
    profileGraph.set(profileId, new Set(profile.requiresProfiles || []));
  }
  const profileCycles = checkCycles(profileGraph, 'profile');
  if (profileCycles.length > 0) {
    errors.push(`Profile dependency cycles detected: ${profileCycles.join('; ')}`);
  }

  // Check schema files exist
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    for (const [major, schemaPath] of Object.entries(stack.schema.major)) {
      const fullPath = join(repoRoot, schemaPath);
      if (!(await fileExists(fullPath))) {
        errors.push(`Stack "${stackId}" schema major "${major}" file not found: ${schemaPath}`);
      }
    }
  }

  // Check docs files exist (if present and not optional)
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    if (stack.docs) {
      for (const [major, docPath] of Object.entries(stack.docs.major)) {
        const fullPath = join(repoRoot, docPath);
        if (!(await fileExists(fullPath))) {
          errors.push(`Stack "${stackId}" docs major "${major}" file not found: ${docPath}`);
        }
      }
    }
  }

  // Check latestMajor exists in schema.major
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    const latestMajorStr = String(stack.latestMajor);
    if (!(latestMajorStr in stack.schema.major)) {
      errors.push(`Stack "${stackId}" latestMajor ${stack.latestMajor} not found in schema.major`);
    }
  }

  if (errors.length > 0) {
    console.error('Registry validation failed:');
    errors.forEach(err => console.error(`  ${err}`));
    process.exit(1);
  }

  console.log('Registry validation passed.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


```

### FILE: `scripts/verify-generated-clean.mjs`

* bytes: 1430
* sha256: bba1d2362c9bae9dbb46439783d56f33f1de140020ea6dff43d1bbd176f39b45

```
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


```

### FILE: `scripts/verify-stack-docs.mjs`

* bytes: 1845
* sha256: 90d4abc77d47305aae7fc9cf23744f26d65931ba846fc73b1b15cdb46bbd8d22

```
#!/usr/bin/env node
import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));

  const missing = [];

  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    // Skip vendor stacks (x- prefix)
    if (stackId.startsWith('x-')) {
      continue;
    }

    // Check all majors in schema.major, or at least latestMajor
    const majorsToCheck = new Set();
    if (stack.schema?.major) {
      for (const major of Object.keys(stack.schema.major)) {
        majorsToCheck.add(major);
      }
    }
    // Also check latestMajor if it exists
    if (stack.latestMajor) {
      majorsToCheck.add(String(stack.latestMajor));
    }

    for (const major of majorsToCheck) {
      const expectedDocPath = `stacks/${stackId}@${major}.md`;
      const fullPath = join(repoRoot, expectedDocPath);

      if (!(await fileExists(fullPath))) {
        missing.push({
          stackId,
          major,
          expectedPath: expectedDocPath
        });
      }
    }
  }

  if (missing.length > 0) {
    console.error('Missing stack documentation files:');
    for (const { stackId, major, expectedPath } of missing) {
      console.error(`  ${expectedPath} (stack: ${stackId}@${major})`);
    }
    process.exit(1);
  }

  console.log('All stack documentation files present.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});




```

### FILE: `soustack.schema.json`

* bytes: 57809
* sha256: 264632a15c3b2f6838944e867f4b14a0be2d2b38c0dd7fa1fbc325048ab20a64

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/soustack.schema.json",
  "title": "Soustack Specification",
  "type": "object",
  "properties": {
    "$schema": {
      "type": "string",
      "const": "https://soustack.spec/soustack.schema.json"
    },
    "level": {
      "type": "string",
      "enum": [
        "lite",
        "base"
      ]
    },
    "profile": {
      "type": "string",
      "anyOf": [
        {
          "enum": [
            "base",
            "equipped",
            "illustrated",
            "lite",
            "prepped",
            "scalable",
            "timed"
          ]
        },
        {
          "pattern": "^x-[a-z0-9-]+(?:\\.[a-z0-9-]+)*$"
        }
      ]
    },
    "stacks": {
      "$ref": "#/$defs/stacksMap"
    },
    "name": {
      "type": "string"
    },
    "yield": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number",
          "exclusiveMinimum": 0
        },
        "unit": {
          "type": "string",
          "minLength": 1
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "amount",
        "unit"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "./defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "time": {
      "type": "object",
      "properties": {
        "total": {
          "$ref": "./defs/duration.schema.json#/properties/DurationMinutes"
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "total"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "./defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "ingredients": {
      "type": "array",
      "items": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "$ref": "#/$defs/ingredient"
          },
          {
            "$ref": "#/$defs/ingredientSection"
          }
        ]
      }
    },
    "instructions": {
      "type": "array",
      "items": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "$ref": "#/$defs/step"
          },
          {
            "$ref": "#/$defs/stepSection"
          }
        ]
      }
    },
    "metadata": {
      "type": "object",
      "additionalProperties": true
    },
    "images": {
      "type": "array",
      "items": {
        "$ref": "./defs/common.schema.json#/properties/uri"
      }
    },
    "videos": {
      "type": "array",
      "items": {
        "$ref": "./defs/common.schema.json#/properties/uri"
      }
    },
    "dietary": {
      "$ref": "./stacks/dietary.schema.json#/properties/dietary"
    },
    "storage": {
      "$ref": "./stacks/storage.schema.json#/properties/storage"
    },
    "substitutions": {
      "$ref": "./stacks/substitutions.schema.json#/properties/substitutions"
    },
    "techniques": {
      "$ref": "./stacks/techniques.schema.json#/properties/techniques"
    },
    "scaling": {
      "$ref": "./stacks/scaling.schema.json#/properties/scaling"
    }
  },
  "patternProperties": {
    "^x-": {
      "$ref": "./defs/common.schema.json#/properties/extensionLaneValue"
    }
  },
  "required": [
    "level",
    "stacks",
    "name",
    "ingredients",
    "instructions"
  ],
  "allOf": [
    {
      "if": {
        "properties": {
          "level": {
            "const": "base"
          }
        }
      },
      "then": {
        "required": [
          "yield",
          "time"
        ]
      }
    },
    {
      "$comment": "BEGIN GENERATED STACK GATING"
    },
    {
      "if": {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "const": "equipped"
          }
        }
      },
      "then": {
        "required": [
          "stacks"
        ],
        "properties": {
          "stacks": {
            "required": [
              "equipment"
            ],
            "properties": {
              "equipment": {
                "type": "integer",
                "enum": [
                  1
                ]
              }
            }
          }
        }
      }
    },
    {
      "if": {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "const": "illustrated"
          }
        }
      },
      "then": {
        "required": [
          "stacks"
        ],
        "properties": {
          "stacks": {
            "required": [
              "illustrated"
            ],
            "properties": {
              "illustrated": {
                "type": "integer",
                "enum": [
                  1
                ]
              }
            }
          }
        }
      }
    },
    {
      "if": {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "const": "prepped"
          }
        }
      },
      "then": {
        "required": [
          "stacks"
        ],
        "properties": {
          "stacks": {
            "required": [
              "prep"
            ],
            "properties": {
              "prep": {
                "type": "integer",
                "enum": [
                  1
                ]
              }
            }
          }
        }
      }
    },
    {
      "if": {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "const": "scalable"
          }
        }
      },
      "then": {
        "required": [
          "stacks"
        ],
        "properties": {
          "stacks": {
            "required": [
              "quantified",
              "scaling"
            ],
            "properties": {
              "quantified": {
                "type": "integer",
                "enum": [
                  1
                ]
              },
              "scaling": {
                "type": "integer",
                "enum": [
                  1
                ]
              }
            }
          }
        }
      }
    },
    {
      "if": {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "const": "timed"
          }
        }
      },
      "then": {
        "required": [
          "stacks"
        ],
        "properties": {
          "stacks": {
            "required": [
              "structured",
              "timed"
            ],
            "properties": {
              "structured": {
                "type": "integer",
                "enum": [
                  1
                ]
              },
              "timed": {
                "type": "integer",
                "enum": [
                  1
                ]
              }
            }
          }
        }
      }
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "compute"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "compute": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "compute"
                ],
                "properties": {
                  "compute": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "allOf": [
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "quantified"
                    ],
                    "properties": {
                      "quantified": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "timed"
                    ],
                    "properties": {
                      "timed": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              }
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "dietary"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "dietary": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "dietary"
                ],
                "properties": {
                  "dietary": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "dietary": {
                "type": "object",
                "properties": {
                  "basis": {
                    "type": "string",
                    "enum": [
                      "perServing",
                      "perRecipe"
                    ]
                  },
                  "calories": {
                    "type": "number",
                    "minimum": 0
                  },
                  "macros": {
                    "type": "object",
                    "properties": {
                      "protein": {
                        "type": "number",
                        "minimum": 0
                      },
                      "fat": {
                        "type": "number",
                        "minimum": 0
                      },
                      "carbohydrates": {
                        "type": "number",
                        "minimum": 0
                      },
                      "metadata": {
                        "type": "object",
                        "additionalProperties": true
                      }
                    },
                    "minProperties": 1,
                    "additionalProperties": false,
                    "patternProperties": {
                      "^x-": {
                        "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                      }
                    }
                  },
                  "diets": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "allergens": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "additionalProperties": true
                  }
                },
                "required": [
                  "basis"
                ],
                "additionalProperties": false,
                "anyOf": [
                  {
                    "required": [
                      "calories"
                    ]
                  },
                  {
                    "required": [
                      "macros"
                    ]
                  },
                  {
                    "required": [
                      "diets"
                    ]
                  },
                  {
                    "required": [
                      "allergens"
                    ]
                  }
                ],
                "patternProperties": {
                  "^x-": {
                    "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                  }
                }
              }
            },
            "required": [
              "dietary"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "equipment"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "equipment": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "equipment"
                ],
                "properties": {
                  "equipment": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "equipment": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "minLength": 1
                    },
                    {
                      "$ref": "#/$defs/equipment@1_equipmentItem"
                    }
                  ]
                }
              }
            },
            "required": [
              "equipment"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "illustrated"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "illustrated": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "illustrated"
                ],
                "properties": {
                  "illustrated": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "images": {
                "type": "array",
                "items": {
                  "$ref": "https://soustack.spec/defs/common.schema.json#/properties/uri"
                }
              },
              "videos": {
                "type": "array",
                "items": {
                  "$ref": "https://soustack.spec/defs/common.schema.json#/properties/uri"
                }
              },
              "instructions": {
                "type": "array",
                "items": {
                  "anyOf": [
                    {
                      "$ref": "#/$defs/illustrated@1_illustratedStep"
                    },
                    {
                      "$ref": "#/$defs/illustrated@1_illustratedSection"
                    }
                  ]
                }
              }
            }
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "prep"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "prep": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "prep"
                ],
                "properties": {
                  "prep": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "miseEnPlace": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "$ref": "#/$defs/prep@1_miseEnPlaceTask"
                }
              }
            },
            "required": [
              "miseEnPlace"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "quantified"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "quantified": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "quantified"
                ],
                "properties": {
                  "quantified": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "ingredients": {
                "type": "array",
                "items": {
                  "anyOf": [
                    {
                      "$ref": "#/$defs/quantified@1_ingredient"
                    },
                    {
                      "$ref": "#/$defs/quantified@1_ingredientSection"
                    }
                  ]
                }
              }
            },
            "required": [
              "ingredients"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "referenced"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "referenced": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "referenced"
                ],
                "properties": {
                  "referenced": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "allOf": [
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "structured"
                    ],
                    "properties": {
                      "structured": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "ingredients": {
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "$ref": "#/$defs/referenced@1_ingredient"
                        },
                        {
                          "$ref": "#/$defs/referenced@1_ingredientSection"
                        }
                      ]
                    }
                  },
                  "instructions": {
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "$ref": "#/$defs/referenced@1_referencedStep"
                        },
                        {
                          "$ref": "#/$defs/referenced@1_referencedSection"
                        }
                      ]
                    }
                  }
                },
                "required": [
                  "ingredients",
                  "instructions"
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "scaling"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "scaling": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "scaling"
                ],
                "properties": {
                  "scaling": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "allOf": [
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "quantified"
                    ],
                    "properties": {
                      "quantified": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "ingredients": {
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "$ref": "#/$defs/scaling@1_ingredient"
                        },
                        {
                          "$ref": "#/$defs/scaling@1_ingredientSection"
                        }
                      ]
                    }
                  },
                  "scaling": {
                    "type": "object",
                    "properties": {
                      "discrete": {
                        "type": "object",
                        "properties": {
                          "min": {
                            "type": "integer",
                            "minimum": 1
                          },
                          "max": {
                            "type": "integer",
                            "minimum": 1
                          },
                          "step": {
                            "type": "integer",
                            "minimum": 1
                          },
                          "metadata": {
                            "type": "object",
                            "additionalProperties": true
                          }
                        },
                        "required": [
                          "min",
                          "max"
                        ],
                        "additionalProperties": false,
                        "patternProperties": {
                          "^x-": {
                            "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                          }
                        }
                      },
                      "metadata": {
                        "type": "object",
                        "additionalProperties": true
                      }
                    },
                    "required": [
                      "discrete"
                    ],
                    "additionalProperties": false,
                    "patternProperties": {
                      "^x-": {
                        "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                      }
                    }
                  }
                },
                "required": [
                  "ingredients",
                  "scaling"
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "storage"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "storage": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "storage"
                ],
                "properties": {
                  "storage": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "storage": {
                "type": "object",
                "properties": {
                  "roomTemp": {
                    "$ref": "#/$defs/storage@1_storageMethod"
                  },
                  "refrigerated": {
                    "$ref": "#/$defs/storage@1_storageMethod"
                  },
                  "frozen": {
                    "$ref": "#/$defs/storage@1_storageMethod"
                  },
                  "leftovers": {
                    "$ref": "#/$defs/storage@1_leftovers"
                  },
                  "metadata": {
                    "type": "object",
                    "additionalProperties": true
                  }
                },
                "anyOf": [
                  {
                    "required": [
                      "roomTemp"
                    ]
                  },
                  {
                    "required": [
                      "refrigerated"
                    ]
                  },
                  {
                    "required": [
                      "frozen"
                    ]
                  }
                ],
                "additionalProperties": false,
                "patternProperties": {
                  "^x-": {
                    "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                  }
                }
              }
            },
            "required": [
              "storage"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "structured"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "structured": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "structured"
                ],
                "properties": {
                  "structured": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "instructions": {
                "type": "array",
                "items": {
                  "anyOf": [
                    {
                      "$ref": "#/$defs/structured@1_step"
                    },
                    {
                      "$ref": "#/$defs/structured@1_stepSection"
                    }
                  ]
                }
              }
            },
            "required": [
              "instructions"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "substitutions"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "substitutions": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "substitutions"
                ],
                "properties": {
                  "substitutions": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "allOf": [
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "referenced"
                    ],
                    "properties": {
                      "referenced": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "substitutions": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "for": {
                          "type": "string"
                        },
                        "alternatives": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string"
                              },
                              "ratio": {
                                "type": "string"
                              },
                              "metadata": {
                                "type": "object",
                                "additionalProperties": true
                              }
                            },
                            "required": [
                              "name",
                              "ratio"
                            ],
                            "additionalProperties": false,
                            "patternProperties": {
                              "^x-": {
                                "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                              }
                            }
                          },
                          "minItems": 1
                        },
                        "metadata": {
                          "type": "object",
                          "additionalProperties": true
                        }
                      },
                      "required": [
                        "for",
                        "alternatives"
                      ],
                      "additionalProperties": false,
                      "patternProperties": {
                        "^x-": {
                          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                        }
                      }
                    },
                    "minItems": 1
                  }
                },
                "required": [
                  "substitutions"
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "techniques"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "techniques": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "techniques"
                ],
                "properties": {
                  "techniques": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "techniques": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "metadata": {
                      "type": "object",
                      "additionalProperties": true
                    }
                  },
                  "required": [
                    "id",
                    "name"
                  ],
                  "additionalProperties": false,
                  "patternProperties": {
                    "^x-": {
                      "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                    }
                  }
                },
                "minItems": 1
              }
            },
            "required": [
              "techniques"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "timed"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "timed": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "timed"
                ],
                "properties": {
                  "timed": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "allOf": [
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "structured"
                    ],
                    "properties": {
                      "structured": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "instructions": {
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "$ref": "#/$defs/timed@1_timedStep"
                        },
                        {
                          "$ref": "#/$defs/timed@1_timedStepSection"
                        }
                      ]
                    }
                  }
                },
                "required": [
                  "instructions"
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "$comment": "END GENERATED STACK GATING"
    }
  ],
  "unevaluatedProperties": false,
  "$defs": {
    "stackName": {
      "type": "string",
      "pattern": "^(?:[a-z][a-z0-9-]*|x-[a-z0-9-]+(?:\\.[a-z0-9-]+)*)$"
    },
    "stackMajor": {
      "type": "integer",
      "minimum": 1
    },
    "stacksMap": {
      "type": "object",
      "propertyNames": {
        "$ref": "#/$defs/stackName"
      },
      "additionalProperties": {
        "$ref": "#/$defs/stackMajor"
      }
    },
    "ingredient": {
      "allOf": [
        {
          "$ref": "./defs/entities.schema.json#/$defs/IngredientBase"
        }
      ]
    },
    "ingredientSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/$defs/ingredient"
              },
              {
                "$ref": "#/$defs/ingredientSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "ingredients"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "./defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "step": {
      "$ref": "./defs/entities.schema.json#/$defs/StepBase"
    },
    "stepSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/$defs/step"
              },
              {
                "$ref": "#/$defs/stepSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "steps"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "./defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "illustrated@1_illustratedStep": {
      "allOf": [
        {
          "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase"
        },
        {
          "required": [
            "id"
          ]
        }
      ]
    },
    "illustrated@1_illustratedSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/illustrated.schema.json#/$defs/illustratedStep"
              },
              {
                "$ref": "https://soustack.spec/stacks/illustrated.schema.json#/$defs/illustratedSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "steps"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "quantified@1_ingredient": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "quantity": {
          "$ref": "https://soustack.spec/defs/quantity.schema.json"
        },
        "temperature": {
          "$ref": "https://soustack.spec/defs/temperature.schema.json"
        },
        "notes": {
          "type": "string"
        },
        "prep": {
          "oneOf": [
            {
              "type": "string",
              "minLength": 1
            },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1
                  },
                  {
                    "$ref": "https://soustack.spec/stacks/prep.schema.json#/$defs/prepItem"
                  }
                ]
              }
            }
          ]
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        },
        "scaling": {
          "$ref": "https://soustack.spec/defs/scalingRule.schema.json"
        }
      },
      "required": [
        "id",
        "name",
        "quantity"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "quantified@1_ingredientSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/quantified.schema.json#/$defs/ingredient"
              },
              {
                "$ref": "https://soustack.spec/stacks/quantified.schema.json#/$defs/ingredientSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "ingredients"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "referenced@1_ingredient": {
      "allOf": [
        {
          "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/IngredientBase"
        },
        {
          "required": [
            "id"
          ]
        }
      ]
    },
    "referenced@1_ingredientSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/referenced.schema.json#/$defs/ingredient"
              },
              {
                "$ref": "https://soustack.spec/stacks/referenced.schema.json#/$defs/ingredientSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "ingredients"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "referenced@1_referencedStep": {
      "allOf": [
        {
          "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase"
        },
        {
          "properties": {
            "inputs": {
              "allOf": [
                {
                  "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase/properties/inputs"
                },
                {
                  "minItems": 1
                }
              ]
            }
          },
          "required": [
            "id",
            "inputs"
          ]
        }
      ]
    },
    "referenced@1_referencedSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/referenced.schema.json#/$defs/referencedStep"
              },
              {
                "$ref": "https://soustack.spec/stacks/referenced.schema.json#/$defs/referencedSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "steps"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "scaling@1_ingredient": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "quantity": {
          "$ref": "https://soustack.spec/defs/quantity.schema.json"
        },
        "temperature": {
          "$ref": "https://soustack.spec/defs/temperature.schema.json"
        },
        "notes": {
          "type": "string"
        },
        "prep": {
          "oneOf": [
            {
              "type": "string",
              "minLength": 1
            },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1
                  },
                  {
                    "$ref": "https://soustack.spec/stacks/prep.schema.json#/$defs/prepItem"
                  }
                ]
              }
            }
          ]
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        },
        "scaling": {
          "$ref": "https://soustack.spec/defs/scalingRule.schema.json"
        }
      },
      "required": [
        "id",
        "name",
        "quantity"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "scaling@1_ingredientSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/scaling.schema.json#/$defs/ingredient"
              },
              {
                "$ref": "https://soustack.spec/stacks/scaling.schema.json#/$defs/ingredientSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "ingredients"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "storage@1_storageMethod": {
      "type": "object",
      "properties": {
        "duration": {
          "$ref": "https://soustack.spec/defs/duration.schema.json#/properties/StorageDuration"
        },
        "notes": {
          "type": "string"
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "duration"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "structured@1_step": {
      "allOf": [
        {
          "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase"
        },
        {
          "required": [
            "id"
          ]
        }
      ]
    },
    "structured@1_stepSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/structured.schema.json#/$defs/step"
              },
              {
                "$ref": "https://soustack.spec/stacks/structured.schema.json#/$defs/stepSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "steps"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "timed@1_timedStep": {
      "allOf": [
        {
          "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase"
        },
        {
          "properties": {
            "timing": {
              "allOf": [
                {
                  "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase/properties/timing"
                },
                {
                  "required": [
                    "activity"
                  ],
                  "anyOf": [
                    {
                      "required": [
                        "duration"
                      ]
                    },
                    {
                      "required": [
                        "completionCue"
                      ]
                    }
                  ]
                }
              ]
            }
          },
          "required": [
            "id",
            "timing"
          ]
        }
      ]
    },
    "timed@1_timedStepSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/timed.schema.json#/$defs/timedStep"
              },
              {
                "$ref": "https://soustack.spec/stacks/timed.schema.json#/$defs/timedStepSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "steps"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "equipment@1_equipmentItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9._-]+$",
          "minLength": 1
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "count": {
          "type": "integer",
          "minimum": 1
        },
        "countScaling": {
          "oneOf": [
            {
              "type": "string",
              "enum": [
                "fixed",
                "linear"
              ]
            },
            {
              "type": "object",
              "properties": {
                "mode": {
                  "const": "threshold"
                },
                "steps": {
                  "type": "array",
                  "minItems": 1,
                  "items": {
                    "type": "object",
                    "properties": {
                      "maxFactor": {
                        "type": "number",
                        "exclusiveMinimum": 0
                      },
                      "count": {
                        "type": "integer",
                        "minimum": 1
                      }
                    },
                    "required": [
                      "maxFactor",
                      "count"
                    ],
                    "additionalProperties": false
                  }
                }
              },
              "required": [
                "mode",
                "steps"
              ],
              "additionalProperties": false
            }
          ]
        },
        "upgrades": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "properties": {
              "minFactor": {
                "type": "number",
                "exclusiveMinimum": 0
              },
              "use": {
                "type": "string",
                "pattern": "^[A-Za-z0-9._-]+$",
                "minLength": 1
              }
            },
            "required": [
              "minFactor",
              "use"
            ],
            "additionalProperties": false
          }
        }
      },
      "required": [
        "id",
        "name"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "prep@1_miseEnPlaceTask": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9._-]+$"
        },
        "text": {
          "type": "string",
          "minLength": 1
        },
        "inputs": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true,
          "minItems": 1
        },
        "usesEquipment": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Za-z0-9._-]+$"
          },
          "uniqueItems": true,
          "minItems": 1
        }
      },
      "required": [
        "text"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "storage@1_leftovers": {
      "type": "object",
      "properties": {
        "notes": {
          "type": "string"
        },
        "reheat": {
          "oneOf": [
            {
              "type": "array",
              "items": {
                "type": "string"
              },
              "minItems": 1
            },
            {
              "type": "array",
              "items": {
                "$ref": "https://soustack.spec/stacks/storage.schema.json#/$defs/reheatInstruction"
              },
              "minItems": 1
            }
          ]
        },
        "portioning": {
          "$ref": "https://soustack.spec/stacks/storage.schema.json#/$defs/portioning"
        }
      },
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    }
  }
}

```

### FILE: `stacks/compute.schema.json`

* bytes: 212
* sha256: 5b40126ed039b9a75cf42ff6dcef5602f131569cf25071c7fdfc7a4707ee857a

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/compute.schema.json",
  "title": "Compute Claim Stack",
  "type": "object",
  "additionalProperties": false
}

```

### FILE: `stacks/compute@1.md`

* bytes: 771
* sha256: 47eaac6c92e6f937b7ec95b4b02566986db0375a8ebbb1831de2aca9cfbd1508

```
# compute@1

## Purpose
The `compute@1` stack declares that a recipe meets prerequisites for computational operations such as scheduling, scaling, and deterministic planning.

## Adds
- No additional structural fields (claim stack).

## Requires
- `quantified@1`
- `timed@1`

## Semantics
- MUST: Recipe must satisfy all requirements of `quantified@1` and `timed@1`.
- NOTE: This is a claim stack indicating computational readiness. Tools SHOULD enforce that all prerequisites are met.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Requires `quantified@1` for scaling inputs and `timed@1` for deterministic scheduling. Indicates recipe is ready for computational recipe planning tools.




```

### FILE: `stacks/dietary.schema.json`

* bytes: 1601
* sha256: b46ddd1bf76eae6024adeb7ad95cf2c743cea00948a9096f1dc927f12b58f638

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/dietary.schema.json",
  "title": "Dietary Stack",
  "type": "object",
  "properties": {
    "dietary": {
      "type": "object",
      "properties": {
        "basis": { "type": "string", "enum": ["perServing", "perRecipe"] },
        "calories": { "type": "number", "minimum": 0 },
        "macros": {
          "type": "object",
          "properties": {
            "protein": { "type": "number", "minimum": 0 },
            "fat": { "type": "number", "minimum": 0 },
            "carbohydrates": { "type": "number", "minimum": 0 },
            "metadata": { "type": "object", "additionalProperties": true }
          },
          "minProperties": 1,
          "additionalProperties": false,
          "patternProperties": {
            "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
          }
        },
        "diets": { "type": "array", "items": { "type": "string" } },
        "allergens": { "type": "array", "items": { "type": "string" } },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["basis"],
      "additionalProperties": false,
      "anyOf": [
        { "required": ["calories"] },
        { "required": ["macros"] },
        { "required": ["diets"] },
        { "required": ["allergens"] }
      ],
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "required": ["dietary"],
  "additionalProperties": false
}

```

### FILE: `stacks/dietary@1.md`

* bytes: 879
* sha256: e10e0f9e3356cf09f8c72009a97e79f6eb5f92f226dacbd1fa07d93bcb632a44

```
# dietary@1

## Purpose
The `dietary@1` stack enables recipes to declare nutritional information, dietary classifications, and allergen information.

## Adds
- Top-level `dietary` object with `basis` field (perServing or perRecipe).
- Optional `calories`, `macros` (protein, fat, carbohydrates), `diets`, and `allergens` fields.
- At least one of calories, macros, diets, or allergens must be present.

## Requires
- None

## Semantics
- MUST: The `dietary` object must include a `basis` field.
- MUST: At least one of `calories`, `macros`, `diets`, or `allergens` must be present.
- NOTE: Dietary tags and allergen lists are freeform strings in v1 (no controlled vocabulary).

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: No dependencies on other stacks. Can be combined with any other stack.




```

### FILE: `stacks/equipment.schema.json`

* bytes: 2642
* sha256: 92ab0e4baff8cb8bdf6573fd2cd4e21a85ad9fba6950dea90a9eb4ae2d5d8608

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/equipment.schema.json",
  "title": "Equipment Stack",
  "type": "object",
  "properties": {
    "equipment": {
      "type": "array",
      "minItems": 1,
      "items": {
        "anyOf": [
          { "type": "string", "minLength": 1 },
          { "$ref": "#/$defs/equipmentItem" }
        ]
      }
    }
  },
  "required": ["equipment"],
  "$defs": {
    "equipmentItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9._-]+$",
          "minLength": 1
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "count": {
          "type": "integer",
          "minimum": 1
        },
        "countScaling": {
          "oneOf": [
            { "type": "string", "enum": ["fixed", "linear"] },
            {
              "type": "object",
              "properties": {
                "mode": { "const": "threshold" },
                "steps": {
                  "type": "array",
                  "minItems": 1,
                  "items": {
                    "type": "object",
                    "properties": {
                      "maxFactor": {
                        "type": "number",
                        "exclusiveMinimum": 0
                      },
                      "count": {
                        "type": "integer",
                        "minimum": 1
                      }
                    },
                    "required": ["maxFactor", "count"],
                    "additionalProperties": false
                  }
                }
              },
              "required": ["mode", "steps"],
              "additionalProperties": false
            }
          ]
        },
        "upgrades": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "properties": {
              "minFactor": {
                "type": "number",
                "exclusiveMinimum": 0
              },
              "use": {
                "type": "string",
                "pattern": "^[A-Za-z0-9._-]+$",
                "minLength": 1
              }
            },
            "required": ["minFactor", "use"],
            "additionalProperties": false
          }
        }
      },
      "required": ["id", "name"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}


```

### FILE: `stacks/equipment@1.md`

* bytes: 5173
* sha256: fb7e49908e3fdbc35d3a0b0626f7786bf7f3e227de1bdca374b043c41b5c4c23

```
#equipment@1

---

## Purpose

The `equipment@1` stack enables recipes to declare required equipment, with optional scaling-aware counts and upgrade paths for different scale factors.

This stack is adoption-first: equipment can be declared as simple strings for minimal friction, or as structured objects with IDs for cross-referencing from steps.

---

## Requirements

A document that declares `equipment@1`:

• MUST satisfy all structural rules enabled by this stack.
• MUST satisfy the semantic rules described below.

---

## Data Model

When `equipment@1` is declared, the document MUST include a top-level `equipment` array.

### Equipment Array

The `equipment` array contains one or more items. Each item MAY be:

• A string (simple tool name)
• A structured equipment object

### Structured Equipment Object

Structured equipment objects support:

• `id` (required): unique identifier following pattern `^[A-Za-z0-9._-]+$`
• `name` (required): human-readable name
• `count` (optional): integer >= 1, default 1
• `countScaling` (optional): scaling behavior for count
• `upgrades` (optional): array of upgrade rules

---

## Scaling Behavior

Equipment scaling is defined in terms of a scale factor F. If no scaling factor exists in the document, implementations MUST treat F = 1.

### countScaling

The `countScaling` field controls how equipment count changes with scale:

#### fixed

Count remains unchanged regardless of scale factor.

```json
{
  "id": "pan",
  "name": "8-inch skillet",
  "count": 1,
  "countScaling": "fixed"
}
```

#### linear

Effective count = ceil(count × F)

```json
{
  "id": "mixing_bowl",
  "name": "Mixing bowl",
  "count": 2,
  "countScaling": "linear"
}
```

#### threshold

Pick the first step where F <= maxFactor, otherwise use the last step.

```json
{
  "id": "sheet_pan",
  "name": "Baking sheet",
  "count": 1,
  "countScaling": {
    "mode": "threshold",
    "steps": [
      { "maxFactor": 1.0, "count": 1 },
      { "maxFactor": 2.0, "count": 2 },
      { "maxFactor": 4.0, "count": 3 }
    ]
  }
}
```

The `steps` array MUST be non-empty. Steps SHOULD be in ascending order by `maxFactor` (semantic validation may enforce this in tooling).

### upgrades

The `upgrades` array allows swapping to a different equipment item at higher scale factors.

Choose the upgrade with the highest `minFactor` where `minFactor <= F`. If no upgrade matches, use the base equipment item.

```json
{
  "id": "skillet_small",
  "name": "8-inch skillet",
  "upgrades": [
    { "minFactor": 2.0, "use": "skillet_large" }
  ]
}
```

The `use` field MUST reference an equipment id that exists in the equipment array (semantic validation).

---

## Step Usage

When `structured@1` is present (steps are objects), steps MAY include an optional `usesEquipment` field.

Field
step.usesEquipment : array of equipment ids

Each id in `usesEquipment` MUST exist in the equipment array (semantic validation when both stacks are present).

Example:

```json
{
  "equipment": [
    { "id": "skillet", "name": "8-inch skillet" }
  ],
  "instructions": [
    {
      "id": "sear",
      "text": "Sear the meat",
      "usesEquipment": ["skillet"]
    }
  ]
}
```

---

## Composition

The equipment stack is composable with other stacks:

• No hard dependency on `scaling@1` (scaling behavior uses factor if present, but does not require scaling stack)
• Works with `structured@1` to enable step-level equipment references
• Remains monotonic: does not close objects needed by other stacks

---

## Semantic Validation Rules (Normative)

Validators MUST enforce the following rules:

1. Equipment id uniqueness
   All equipment object `id` values MUST be unique within the equipment array.

2. Step equipment references
   If both `equipment@1` and `structured@1` are present, and a step includes `usesEquipment`, all referenced ids MUST exist in the equipment array (as object ids, not string items).

3. Upgrade references
   If an equipment item includes `upgrades`, each `upgrades[].use` MUST reference an existing equipment object id.

4. Threshold steps ordering
   For `countScaling.mode == "threshold"`, the `steps` array SHOULD be in ascending order by `maxFactor` (tooling may warn but not fail validation).

---

## Examples

Simple strings

```json
{
  "equipment": ["mixing bowl", "whisk", "oven"]
}
```

Structured with scaling

```json
{
  "equipment": [
    {
      "id": "skillet",
      "name": "8-inch skillet",
      "count": 1,
      "countScaling": "fixed"
    },
    {
      "id": "bowl",
      "name": "Mixing bowl",
      "count": 2,
      "countScaling": "linear"
    }
  ]
}
```

With upgrades

```json
{
  "equipment": [
    {
      "id": "skillet_small",
      "name": "8-inch skillet",
      "upgrades": [
        { "minFactor": 2.0, "use": "skillet_large" }
      ]
    },
    {
      "id": "skillet_large",
      "name": "12-inch skillet"
    }
  ]
}
```

Step usage

```json
{
  "equipment": [
    { "id": "skillet", "name": "8-inch skillet" }
  ],
  "instructions": [
    {
      "id": "sear",
      "text": "Sear the meat in the skillet",
      "usesEquipment": ["skillet"]
    }
  ]
}
```


```

### FILE: `stacks/illustrated.schema.json`

* bytes: 1456
* sha256: 4b1b4260d441ea77fca5aaf014f5548c854e21d9a8f503d965501651ea361692

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/illustrated.schema.json",
  "title": "Illustrated Stack",
  "type": "object",
  "properties": {
    "images": {
      "type": "array",
      "items": { "$ref": "../defs/common.schema.json#/properties/uri" }
    },
    "videos": {
      "type": "array",
      "items": { "$ref": "../defs/common.schema.json#/properties/uri" }
    },
    "instructions": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/illustratedStep" },
          { "$ref": "#/$defs/illustratedSection" }
        ]
      }
    }
  },
  "$defs": {
    "illustratedStep": {
      "allOf": [
        { "$ref": "../defs/entities.schema.json#/$defs/StepBase" },
        { "required": ["id"] }
      ]
    },
    "illustratedSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/illustratedStep" },
              { "$ref": "#/$defs/illustratedSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "steps"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  }
}

```

### FILE: `stacks/illustrated@1.md`

* bytes: 825
* sha256: 4e54b4df95e12238dd69a748ca0c5c69e61aa7e9cbba70cbc0ed05d8ada82630

```
# illustrated@1

## Purpose
The `illustrated@1` stack enables recipes to include media (images and videos) at the recipe and step levels for visual guidance.

## Adds
- Top-level `images` and `videos` arrays (optional).
- Step objects may include `images` and `videos` arrays.
- Steps are structured objects with `id` fields.

## Requires
- None

## Semantics
- MUST: At least one media item (image or video) must be present at the recipe level or in at least one step.
- MUST: Step objects must include `id` fields (steps are structured).
- NOTE: Media URIs must be valid according to the URI schema definition.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Works with `structured@1` for step-level media. No dependencies on other stacks.




```

### FILE: `stacks/prep.schema.json`

* bytes: 1710
* sha256: 1cc274db5d431e0d4e75f2363d410698c135a060533319cae88386407c3d3ac4

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/prep.schema.json",
  "title": "Prep Stack",
  "type": "object",
  "properties": {
    "miseEnPlace": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/miseEnPlaceTask"
      }
    }
  },
  "required": ["miseEnPlace"],
  "$defs": {
    "miseEnPlaceTask": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9._-]+$"
        },
        "text": {
          "type": "string",
          "minLength": 1
        },
        "inputs": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true,
          "minItems": 1
        },
        "usesEquipment": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Za-z0-9._-]+$"
          },
          "uniqueItems": true,
          "minItems": 1
        }
      },
      "required": ["text"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "../defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "prepItem": {
      "type": "object",
      "properties": {
        "verb": {
          "type": "string",
          "minLength": 1
        },
        "detail": {
          "type": "string"
        }
      },
      "required": ["verb"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "../defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    }
  },
  "additionalProperties": false
}


```

### FILE: `stacks/prep@1.md`

* bytes: 5821
* sha256: 2721a7b9467c66feabde1a2d9e4f36b79b4da6c5626c22b5011f70fada3f197b

```
#prep@1

---

## Purpose

The `prep@1` stack enables recipes to include preparation guidance at both the ingredient level and as explicit mise en place tasks. This makes recipes more operational by providing clear prep instructions and planning checklists.

This stack is adoption-first: ingredient prep can be simple strings for minimal friction, or structured objects for more detailed guidance.

---

## Requirements

A document that declares `prep@1`:

• MUST satisfy all structural rules enabled by this stack.
• MUST satisfy the semantic rules described below.

---

## Data Model

When `prep@1` is declared, the document MUST include a top-level `miseEnPlace` array.

### Mise En Place Array

The `miseEnPlace` array contains one or more tasks. Each task is a structured object that describes a prep step.

### Ingredient-Level Prep

Ingredient objects MAY include an optional `prep` field that describes how the ingredient should be prepared. The `prep` field supports multiple formats:

• A single string (simple prep phrase)
• An array of strings (multiple prep notes)
• An array of structured prep items

---

## Ingredient Prep Formats

### String Format

A simple string describing the prep:

```json
{
  "id": "onion",
  "name": "Onion",
  "prep": "finely diced"
}
```

### Array of Strings

Multiple prep notes:

```json
{
  "id": "garlic",
  "name": "Garlic",
  "prep": ["peeled", "minced"]
}
```

### Structured Prep Items

More detailed prep instructions with verbs and details:

```json
{
  "id": "tomato",
  "name": "Tomato",
  "prep": [
    { "verb": "dice", "detail": "fine" },
    { "verb": "reserve", "detail": "half for garnish" }
  ]
}
```

Each prep item object includes:

• `verb` (required): string describing the action (freeform; no controlled vocabulary in v1)
• `detail` (optional): string providing additional context

---

## Mise En Place Tasks

### Minimal Task

A task with only required text:

```json
{
  "miseEnPlace": [
    { "text": "Finely dice the onion" },
    { "text": "Mince the garlic" }
  ]
}
```

### Task with ID

Tasks may include an optional `id` for cross-referencing:

```json
{
  "miseEnPlace": [
    { "id": "dice-onion", "text": "Finely dice the onion" },
    { "id": "mince-garlic", "text": "Mince the garlic" }
  ]
}
```

Task IDs MUST be unique within the `miseEnPlace` array (semantic validation).

### Task with Ingredient References

When `referenced@1` is present, tasks may reference ingredient IDs:

```json
{
  "miseEnPlace": [
    {
      "text": "Prepare the vegetables",
      "inputs": ["onion", "garlic"]
    }
  ]
}
```

Each id in `inputs` MUST exist in the ingredients array (semantic validation when both stacks are present).

### Task with Equipment References

When `equipment@1` is present, tasks may reference equipment IDs:

```json
{
  "miseEnPlace": [
    {
      "text": "Sharpen the knife",
      "usesEquipment": ["knife"]
    }
  ]
}
```

Each id in `usesEquipment` MUST exist in the equipment array (semantic validation when both stacks are present).

### Combined References

Tasks may include both `inputs` and `usesEquipment`:

```json
{
  "miseEnPlace": [
    {
      "text": "Dice the onion with a sharp knife",
      "inputs": ["onion"],
      "usesEquipment": ["knife"]
    }
  ]
}
```

---

## Semantics

### Prep Field

The ingredient `prep` field is descriptive and freeform. In v1, there is no controlled vocabulary for prep verbs or details. Tools may interpret these as hints for display or planning, but validation does not enforce specific values.

### Mise En Place

The `miseEnPlace` array is an explicit checklist of prep tasks. Tools may render this as a prep plan, separate from the main cooking instructions. Tasks are ordered and may be presented as a sequential checklist.

---

## Composition

The prep stack is composable with other stacks:

• No hard dependency on `referenced@1` or `equipment@1` (references are optional and only validated when those stacks are present)
• Works with `structured@1` to enable ingredient object definitions
• Remains monotonic: does not close objects needed by other stacks
• Ingredient `prep` is optional even when the stack is present

---

## Semantic Validation Rules (Normative)

Validators MUST enforce the following rules:

1. Mise en place task ID uniqueness
   If tasks include `id` values, all task IDs MUST be unique within the `miseEnPlace` array.

2. Ingredient reference resolution
   If both `prep@1` and `referenced@1` are present, and a task includes `inputs`, all referenced ingredient IDs MUST exist in the ingredients array.

3. Equipment reference resolution
   If both `prep@1` and `equipment@1` are present, and a task includes `usesEquipment`, all referenced equipment IDs MUST exist in the equipment array (as object ids, not string items).

---

## Examples

Minimal mise en place

```json
{
  "miseEnPlace": [
    { "text": "Finely dice the onion" },
    { "text": "Mince the garlic" }
  ]
}
```

Ingredient prep with strings

```json
{
  "ingredients": [
    {
      "id": "onion",
      "name": "Onion",
      "prep": "finely diced"
    },
    {
      "id": "garlic",
      "name": "Garlic",
      "prep": ["peeled", "minced"]
    }
  ]
}
```

Structured prep items

```json
{
  "ingredients": [
    {
      "id": "tomato",
      "name": "Tomato",
      "prep": [
        { "verb": "dice", "detail": "fine" },
        { "verb": "reserve", "detail": "half for garnish" }
      ]
    }
  ]
}
```

Mise en place with references

```json
{
  "equipment": [
    { "id": "knife", "name": "Chef's knife" }
  ],
  "ingredients": [
    { "id": "onion", "name": "Onion" }
  ],
  "miseEnPlace": [
    {
      "text": "Dice the onion with a sharp knife",
      "inputs": ["onion"],
      "usesEquipment": ["knife"]
    }
  ]
}
```


```

### FILE: `stacks/quantified.schema.json`

* bytes: 2214
* sha256: abf271ff948218dd0eb016c83d482696919eb2141c39531ab0a43b18d4f160d2

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/quantified.schema.json",
  "title": "Quantified Stack",
  "type": "object",
  "properties": {
    "ingredients": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/ingredient" },
          { "$ref": "#/$defs/ingredientSection" }
        ]
      }
    }
  },
  "required": ["ingredients"],
  "$defs": {
    "ingredient": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "quantity": { "$ref": "../defs/quantity.schema.json" },
        "temperature": { "$ref": "../defs/temperature.schema.json" },
        "notes": { "type": "string" },
        "prep": {
          "oneOf": [
            { "type": "string", "minLength": 1 },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "anyOf": [
                  { "type": "string", "minLength": 1 },
                  { "$ref": "../stacks/prep.schema.json#/$defs/prepItem" }
                ]
              }
            }
          ]
        },
        "metadata": { "type": "object", "additionalProperties": true },
        "scaling": { "$ref": "../defs/scalingRule.schema.json" }
      },
      "required": ["id", "name", "quantity"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "ingredientSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/ingredient" },
              { "$ref": "#/$defs/ingredientSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "ingredients"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `stacks/quantified@1.md`

* bytes: 880
* sha256: 40ebc533bfdabafe3b50cdf26cdf45443e12504cba67c31fa38601eac3842529

```
# quantified@1

## Purpose
The `quantified@1` stack enables recipes to declare precise ingredient quantities with units, enabling scaling and computation.

## Adds
- Top-level `ingredients` array with structured ingredient objects containing `id`, `name`, and `quantity` fields.
- Ingredients may include `temperature`, `notes`, `prep`, `scaling`, and `metadata`.
- Support for nested ingredient sections.

## Requires
- None

## Semantics
- MUST: Each ingredient object must include `id`, `name`, and `quantity` fields.
- MUST: Ingredient IDs must be unique within the ingredients array.
- NOTE: This stack is a prerequisite for `scaling@1`.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Required by `scaling@1` for scaling behavior. Works with `structured@1` for stable ingredient references.




```

### FILE: `stacks/referenced.schema.json`

* bytes: 2593
* sha256: 46b087127fe30bcdd256617efc51289cd59d4c1f97ea2b23ab326ebdbc5fdce3

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/referenced.schema.json",
  "title": "Referenced Stack",
  "type": "object",
  "properties": {
    "ingredients": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/ingredient" },
          { "$ref": "#/$defs/ingredientSection" }
        ]
      }
    },
    "instructions": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/referencedStep" },
          { "$ref": "#/$defs/referencedSection" }
        ]
      }
    }
  },
  "required": ["ingredients", "instructions"],
  "allOf": [
    { "$ref": "./structured.schema.json" }
  ],
  "$defs": {
    "ingredient": {
      "allOf": [
        { "$ref": "../defs/entities.schema.json#/$defs/IngredientBase" },
        { "required": ["id"] }
      ]
    },
    "ingredientSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/ingredient" },
              { "$ref": "#/$defs/ingredientSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "ingredients"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "referencedStep": {
      "allOf": [
        { "$ref": "../defs/entities.schema.json#/$defs/StepBase" },
        {
          "properties": {
            "inputs": {
              "allOf": [
                { "$ref": "../defs/entities.schema.json#/$defs/StepBase/properties/inputs" },
                { "minItems": 1 }
              ]
            }
          },
          "required": ["id", "inputs"]
        }
      ]
    },
    "referencedSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/referencedStep" },
              { "$ref": "#/$defs/referencedSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "steps"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  }
}

```

### FILE: `stacks/referenced@1.md`

* bytes: 858
* sha256: 6c92ceb029fd347269d5060b55e9ebec464b8d8c0fd5c8964df21c475a2b946a

```
# referenced@1

## Purpose
The `referenced@1` stack enables steps to explicitly reference ingredient IDs, creating clear input-output relationships for planning and validation.

## Adds
- Step objects must include an `inputs` array with at least one ingredient ID reference.
- Ingredient objects must include `id` fields.

## Requires
- `structured@1`

## Semantics
- MUST: Each step must include an `inputs` array with at least one element.
- MUST: All ingredient IDs referenced in step `inputs` must exist in the ingredients array.
- NOTE: This stack implies `structured@1` (steps are objects with IDs).

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Required by `substitutions@1` for substitution target resolution. Works with `prep@1` for mise en place task references.




```

### FILE: `stacks/registry.json`

* bytes: 4647
* sha256: c0fa375633817bd82b79b2bd987405558ed36edde48ff95accf6de3c7b3a11e2

```
{
  "$schema": "../schemas/stacks-registry.schema.json",
  "registryVersion": 1,
  "spec": {
    "name": "soustack",
    "currentSpecVersion": "0.3.0",
    "canonicalStacksFormat": "map"
  },
  "profiles": {
    "base": { "title": "Base", "description": "name, ingredients, instructions", "requiresProfiles": [], "requiresStacks": [] },
    "lite": { "title": "Lite", "description": "Minimal publishable recipe", "requiresProfiles": ["base"], "requiresStacks": [] },
    "scalable": { "title": "Scalable", "description": "Quantified + scaling", "requiresProfiles": ["lite"], "requiresStacks": ["quantified", "scaling"] },
    "timed": { "title": "Timed", "description": "Structured + timed", "requiresProfiles": ["lite"], "requiresStacks": ["structured", "timed"] },
    "illustrated": { "title": "Illustrated", "description": "Media present", "requiresProfiles": ["lite"], "requiresStacks": ["illustrated"] },
    "equipped": { "title": "Equipped", "description": "Recipe declares required tools/equipment.", "requiresProfiles": ["lite"], "requiresStacks": ["equipment"] },
    "prepped": { "title": "Prepped", "description": "Recipe includes prep guidance and/or mise en place tasks.", "requiresProfiles": ["lite"], "requiresStacks": ["prep"] }
  },
  "stacks": {
    "quantified": {
      "title": "Quantified",
      "latestMajor": 1,
      "profile": "scalable",
      "requires": [],
      "schema": { "major": { "1": "stacks/quantified.schema.json" } },
      "docs": { "major": { "1": "stacks/quantified@1.md" } }
    },
    "scaling": {
      "title": "Scaling",
      "latestMajor": 1,
      "profile": "scalable",
      "requires": ["quantified"],
      "schema": { "major": { "1": "stacks/scaling.schema.json" } },
      "docs": { "major": { "1": "stacks/scaling@1.md" } }
    },
    "structured": {
      "title": "Structured",
      "latestMajor": 1,
      "profile": "timed",
      "requires": [],
      "schema": { "major": { "1": "stacks/structured.schema.json" } },
      "docs": { "major": { "1": "stacks/structured@1.md" } }
    },
    "timed": {
      "title": "Timed",
      "latestMajor": 1,
      "profile": "timed",
      "requires": ["structured"],
      "schema": { "major": { "1": "stacks/timed.schema.json" } },
      "docs": { "major": { "1": "stacks/timed@1.md" } }
    },
    "referenced": {
      "title": "Referenced",
      "latestMajor": 1,
      "profile": "timed",
      "requires": ["structured"],
      "schema": { "major": { "1": "stacks/referenced.schema.json" } },
      "docs": { "major": { "1": "stacks/referenced@1.md" } }
    },
    "illustrated": {
      "title": "Illustrated",
      "latestMajor": 1,
      "profile": "illustrated",
      "requires": [],
      "schema": { "major": { "1": "stacks/illustrated.schema.json" } },
      "docs": { "major": { "1": "stacks/illustrated@1.md" } }
    },
    "dietary": {
      "title": "Dietary",
      "latestMajor": 1,
      "profile": "lite",
      "requires": [],
      "schema": { "major": { "1": "stacks/dietary.schema.json" } },
      "docs": { "major": { "1": "stacks/dietary@1.md" } }
    },
    "substitutions": {
      "title": "Substitutions",
      "latestMajor": 1,
      "profile": "lite",
      "requires": ["referenced"],
      "schema": { "major": { "1": "stacks/substitutions.schema.json" } },
      "docs": { "major": { "1": "stacks/substitutions@1.md" } }
    },
    "techniques": {
      "title": "Techniques",
      "latestMajor": 1,
      "profile": "lite",
      "requires": [],
      "schema": { "major": { "1": "stacks/techniques.schema.json" } },
      "docs": { "major": { "1": "stacks/techniques@1.md" } }
    },
    "storage": {
      "title": "Storage",
      "latestMajor": 1,
      "profile": "lite",
      "requires": [],
      "schema": { "major": { "1": "stacks/storage.schema.json" } },
      "docs": { "major": { "1": "stacks/storage@1.md" } }
    },
    "compute": {
      "title": "Compute",
      "latestMajor": 1,
      "profile": "lite",
      "requires": ["quantified", "timed"],
      "schema": { "major": { "1": "stacks/compute.schema.json" } },
      "docs": { "major": { "1": "stacks/compute@1.md" } }
    },
    "equipment": {
      "title": "Equipment",
      "latestMajor": 1,
      "profile": "lite",
      "requires": [],
      "schema": { "major": { "1": "stacks/equipment.schema.json" } },
      "docs": { "major": { "1": "stacks/equipment@1.md" } }
    },
    "prep": {
      "title": "Prep",
      "latestMajor": 1,
      "profile": "lite",
      "requires": [],
      "schema": { "major": { "1": "stacks/prep.schema.json" } },
      "docs": { "major": { "1": "stacks/prep@1.md" } }
    }
  }
}
  
```

### FILE: `stacks/scaling.schema.json`

* bytes: 3121
* sha256: 781ad1aebdd6c366839abac53c0ed7f9fa37483d8d9a43a80327d3dd87623ba3

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/scaling.schema.json",
  "title": "Scaling Stack",
  "type": "object",
  "properties": {
    "ingredients": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/ingredient" },
          { "$ref": "#/$defs/ingredientSection" }
        ]
      }
    },
    "scaling": {
      "type": "object",
      "properties": {
        "discrete": {
          "type": "object",
          "properties": {
            "min": { "type": "integer", "minimum": 1 },
            "max": { "type": "integer", "minimum": 1 },
            "step": { "type": "integer", "minimum": 1 },
            "metadata": { "type": "object", "additionalProperties": true }
          },
          "required": ["min", "max"],
          "additionalProperties": false,
          "patternProperties": {
            "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["discrete"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "required": ["ingredients", "scaling"],
  "$defs": {
    "ingredient": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "quantity": { "$ref": "../defs/quantity.schema.json" },
        "temperature": { "$ref": "../defs/temperature.schema.json" },
        "notes": { "type": "string" },
        "prep": {
          "oneOf": [
            { "type": "string", "minLength": 1 },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "anyOf": [
                  { "type": "string", "minLength": 1 },
                  { "$ref": "../stacks/prep.schema.json#/$defs/prepItem" }
                ]
              }
            }
          ]
        },
        "metadata": { "type": "object", "additionalProperties": true },
        "scaling": { "$ref": "../defs/scalingRule.schema.json" }
      },
      "required": ["id", "name", "quantity"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "ingredientSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/ingredient" },
              { "$ref": "#/$defs/ingredientSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "ingredients"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `stacks/scaling@1.md`

* bytes: 4608
* sha256: 0e17577b4124e78dfce60efa5d2f9591fcf9607c83d5c0aab3d7f1fca252ea67

```
#scaling@1

---

## Purpose

The `scaling@1` stack standardizes how ingredient quantities change when a recipe is scaled, so independent implementations produce consistent results.

This stack is intended to support the **Scalable** profile.

---

## Requirements

A document that declares `scaling@1`:

• MUST declare `quantified@1`.
• SHOULD declare `structured@1` (recommended for stable ingredient IDs).
• MUST satisfy all structural rules enabled by this stack.
• MUST satisfy the semantic rules described below.

---

## Data Model

When `scaling@1` is declared, quantified ingredients MAY include an optional `scaling` field.

Field
ingredient.scaling : ScalingRule

ScalingRule is defined in `defs/scalingRule.schema.json` and is a closed object with a required `mode`.

---

## Scaling Modes

### linear

Multiply the ingredient quantity by the scale factor.

mode = "linear"

If `scaling` is omitted, implementations MUST treat the ingredient as linear by default.

---

### fixed

Do not scale this ingredient quantity.

Examples:
• 1 bay leaf
• 1 cinnamon stick
• 1 pan

mode = "fixed"

---

### discrete

Scale using discrete increments (for example, whole eggs), with optional rounding and bounds.

Fields
• mode = "discrete"
• step (optional, > 0): discrete increment size
• rounding (optional): nearest | ceil | floor
• min (optional): minimum allowed result
• max (optional): maximum allowed result

Semantic defaults
• If step is not present, default is 1
• If rounding is not present, default is nearest

---

### toTaste

Quantity is informational and MUST NOT be mechanically scaled.

Examples:
• salt to taste
• pepper to taste

mode = "toTaste"

---

### bakersPercent

Represents the ingredient quantity as a baker’s percentage of a base ingredient (typically flour).

Fields
• mode = "bakersPercent"
• percent (> 0): percentage value (for example, 70 for 70%)
• of (string): ingredient id of the base ingredient

---

## Scale Factor

Scaling is applied using a scale factor F.

How F is selected depends on the consumer implementation:

• Some consumers may accept an explicit factor (for example, “2x”).
• Some consumers may compute F from yield changes (for example, “scale from 4 servings to 6 servings”).

This stack standardizes how ingredient rules respond to F, not how F is chosen.

---

## Semantic Validation Rules (Normative)

Validators MUST enforce the following rules:

1. Prerequisite
   If `scaling@1` is declared, `quantified@1` MUST also be declared.

2. Baker’s percent reference
   For mode = "bakersPercent", the `of` field MUST resolve to an existing ingredient id.

3. Discrete sanity
   For mode = "discrete", if both `min` and `max` are present, min MUST be less than or equal to max.

4. Closed rule objects
   ScalingRule MUST NOT contain unspecified fields. This is enforced by schema.

Consumers MUST apply the following semantic defaults:

• Missing `scaling` ⇒ treat as linear
• discrete.step default = 1
• discrete.rounding default = nearest

---

## Scaling Behavior (Normative)

Given an ingredient with base quantity amount A and scale factor F:

• linear
scaled amount = A × F

• fixed
scaled amount = A

• toTaste
scaled amount = A (informational only)
Consumers MAY hide numeric scaling UI for this item.

• discrete

1. raw = A × F
2. if step is present, units = raw ÷ step
3. apply rounding to units
4. scaled = units × step
5. clamp to min / max if present

• bakersPercent

1. let B be the amount of the ingredient referenced by `of`
2. scaled amount = B × (percent ÷ 100)

---

## Examples

Linear (default)

Ingredient
id: i_sugar
name: Sugar
quantity: 100 g
(no scaling field → treated as linear)

---

Fixed

Ingredient
id: i_bayleaf
name: Bay leaf
quantity: 1 leaf
scaling: mode = fixed

---

Discrete (eggs)

Ingredient
id: i_eggs
name: Eggs
quantity: 2 egg
scaling: mode = discrete, rounding = ceil

---

To taste

Ingredient
id: i_salt
name: Salt
quantity: 1 tsp
scaling: mode = toTaste

---

Baker’s percent

Ingredient A
id: i_flour
name: Flour
quantity: 500 g

Ingredient B
id: i_water
name: Water
quantity: 350 g
scaling: mode = bakersPercent, percent = 70, of = i_flour

---

## Fixtures

Implementations SHOULD include fixtures covering:

Valid cases
• linear default (no scaling rule)
• discrete with rounding
• fixed
• toTaste
• bakersPercent with resolvable `of`

Invalid cases
• scaling declared without quantified
• bakersPercent with missing or invalid `of`
• invalid rounding value
• discrete with min greater than max

```

### FILE: `stacks/storage.schema.json`

* bytes: 4162
* sha256: cd4536cfc7ba51f0690d88db184f599dc68d9e6b16d90cba4fcbfe4365882835

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/storage.schema.json",
  "title": "Storage Stack",
  "type": "object",
  "properties": {
    "storage": {
      "type": "object",
      "properties": {
        "roomTemp": { "$ref": "#/$defs/storageMethod" },
        "refrigerated": { "$ref": "#/$defs/storageMethod" },
        "frozen": { "$ref": "#/$defs/storageMethod" },
        "leftovers": { "$ref": "#/$defs/leftovers" },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "anyOf": [
        { "required": ["roomTemp"] },
        { "required": ["refrigerated"] },
        { "required": ["frozen"] }
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "required": ["storage"],
  "$defs": {
    "storageMethod": {
      "type": "object",
      "properties": {
        "duration": { "$ref": "../defs/duration.schema.json#/properties/StorageDuration" },
        "notes": { "type": "string" },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["duration"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "reheatDuration": {
      "type": "object",
      "properties": {
        "minMinutes": { "type": "integer", "minimum": 0 },
        "maxMinutes": { "type": "integer", "minimum": 0 }
      },
      "anyOf": [
        { "required": ["minMinutes"] },
        { "required": ["maxMinutes"] }
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "reheatInstruction": {
      "type": "object",
      "properties": {
        "method": { "type": "string", "minLength": 1 },
        "temp": {
          "type": "object",
          "properties": {
            "value": { "type": "number" },
            "unit": { "type": "string", "enum": ["F", "C"] }
          },
          "required": ["value", "unit"],
          "additionalProperties": false,
          "patternProperties": {
            "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
          }
        },
        "duration": { "$ref": "#/$defs/reheatDuration" },
        "notes": { "type": "string" }
      },
      "required": ["method"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "portioning": {
      "type": "object",
      "properties": {
        "notes": { "type": "string" },
        "recommendedPortion": {
          "type": "object",
          "properties": {
            "quantity": { "type": "number" },
            "unit": { "type": "string" }
          },
          "required": ["quantity", "unit"],
          "additionalProperties": false,
          "patternProperties": {
            "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
          }
        }
      },
      "required": ["notes"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "leftovers": {
      "type": "object",
      "properties": {
        "notes": { "type": "string" },
        "reheat": {
          "oneOf": [
            {
              "type": "array",
              "items": { "type": "string" },
              "minItems": 1
            },
            {
              "type": "array",
              "items": { "$ref": "#/$defs/reheatInstruction" },
              "minItems": 1
            }
          ]
        },
        "portioning": { "$ref": "#/$defs/portioning" }
      },
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `stacks/storage@1.md`

* bytes: 6194
* sha256: 8426e911695e47cccf43b2e44a04412926709c5254f452804428fbc6521615c1

```
#storage@1

---

## Purpose

The `storage@1` stack enables recipes to declare storage conditions and duration for prepared dishes, with optional leftovers and reheating guidance.

This stack is adoption-first: storage can be declared with minimal information, or extended with detailed leftovers and reheating instructions.

---

## Requirements

A document that declares `storage@1`:

• MUST satisfy all structural rules enabled by this stack.
• MUST satisfy the semantic rules described below.

---

## Data Model

When `storage@1` is declared, the document MUST include a top-level `storage` object.

### Storage Object

The `storage` object MUST include exactly one of:
• `roomTemp`: storage at room temperature
• `refrigerated`: storage in refrigeration
• `frozen`: storage in freezing conditions

Each storage method is a `storageMethod` object with:
• `duration` (required): ISO 8601 duration string (pattern `^P`)
• `notes` (optional): string
• `metadata` (optional): object

### Leftovers and Reheating

The `storage` object MAY include an optional `leftovers` field for leftovers and reheating guidance.

---

## Leftovers and Reheating

The `leftovers` object supports:

• `notes` (optional): string with general guidance
• `reheat` (optional): array of reheating instructions (see below)
• `portioning` (optional): portion guidance object

### Reheat Field

The `reheat` field supports two formats:

#### Simple (Array of Strings)

An array of freeform string instructions:

```json
{
  "storage": {
    "refrigerated": {
      "duration": { "iso8601": "P4D" }
    },
    "leftovers": {
      "notes": "Store in an airtight container.",
      "reheat": [
        "Microwave 2–3 minutes, stirring halfway.",
        "Or warm in a skillet over medium heat with a splash of water."
      ]
    }
  }
}
```

#### Structured (Array of Objects)

An array of structured reheating instruction objects:

```json
{
  "storage": {
    "frozen": {
      "duration": { "iso8601": "P2M" }
    },
    "leftovers": {
      "portioning": { "notes": "Cool completely, then portion into containers." },
      "reheat": [
        {
          "method": "microwave",
          "duration": { "minMinutes": 2, "maxMinutes": 3 },
          "notes": "Stir halfway."
        },
        {
          "method": "oven",
          "temp": { "value": 350, "unit": "F" },
          "notes": "Cover and heat until hot throughout."
        }
      ]
    }
  }
}
```

### Reheat Instruction Object

Each structured reheating instruction includes:

• `method` (required): string describing the reheating method (freeform in v1)
• `temp` (optional): object with `value` (number) and `unit` ("F" or "C")
• `duration` (optional): object with `minMinutes` and/or `maxMinutes` (integers >= 0)
• `notes` (optional): string

### Reheat Duration

The `duration` object supports:
• `minMinutes` (optional): integer >= 0
• `maxMinutes` (optional): integer >= 0
• At least one of `minMinutes` or `maxMinutes` must be present

If both are present, `minMinutes` should be <= `maxMinutes` (semantic validation may enforce this in tooling).

### Portioning

The `portioning` object includes:
• `notes` (required): string with portioning guidance
• `recommendedPortion` (optional): object with `quantity` (number) and `unit` (string)

---

## Semantics

### Storage Methods

Storage methods (`roomTemp`, `refrigerated`, `frozen`) are mutually exclusive. Exactly one must be present.

### Reheat Method

The `method` field in structured reheating instructions is freeform in v1. Consumers may map common values (e.g., "microwave", "oven", "stovetop") to display or planning features, but validation does not enforce specific values.

### Scaling

If no scaling factor exists in the document, leftovers guidance does not change. Leftovers guidance is not scaled by recipe scale factors.

---

## Composition

The storage stack is composable with other stacks:

• No hard dependency on other stacks
• Remains monotonic: does not close objects needed by other stacks
• `leftovers` is optional even when the stack is present

---

## Semantic Validation Rules (Normative)

Validators MUST enforce the following rules:

1. Storage method requirement
   The `storage` object MUST include exactly one of `roomTemp`, `refrigerated`, or `frozen`.

2. Duration requirement
   Each storage method object MUST include a `duration` field.

3. Reheat instruction method requirement
   If `leftovers.reheat` includes structured instruction objects, each object MUST include a `method` field.

4. Reheat duration validation
   If a `reheatInstruction.duration` includes both `minMinutes` and `maxMinutes`, `minMinutes` SHOULD be <= `maxMinutes` (tooling may warn but not fail validation).

---

## Examples

Minimal storage

```json
{
  "storage": {
    "refrigerated": {
      "duration": { "iso8601": "P3D" }
    }
  }
}
```

Storage with simple leftovers

```json
{
  "storage": {
    "refrigerated": {
      "duration": { "iso8601": "P4D" }
    },
    "leftovers": {
      "notes": "Store in an airtight container.",
      "reheat": [
        "Microwave 2–3 minutes, stirring halfway.",
        "Or warm in a skillet over medium heat with a splash of water."
      ]
    }
  }
}
```

Storage with structured reheating

```json
{
  "storage": {
    "frozen": {
      "duration": { "iso8601": "P2M" }
    },
    "leftovers": {
      "portioning": { "notes": "Cool completely, then portion into containers." },
      "reheat": [
        {
          "method": "microwave",
          "duration": { "minMinutes": 2, "maxMinutes": 3 },
          "notes": "Stir halfway."
        },
        {
          "method": "oven",
          "temp": { "value": 350, "unit": "F" },
          "notes": "Cover and heat until hot throughout."
        }
      ]
    }
  }
}
```

Storage with portioning

```json
{
  "storage": {
    "refrigerated": {
      "duration": { "iso8601": "P5D" }
    },
    "leftovers": {
      "portioning": {
        "notes": "Portion into individual servings before storing.",
        "recommendedPortion": {
          "quantity": 1,
          "unit": "cup"
        }
      }
    }
  }
}
```


```

### FILE: `stacks/structured.schema.json`

* bytes: 1229
* sha256: 35c0c38647c1e3ccbe1f522c861cc0f72ca0d2675339a1e90cc5e159d121eec2

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/structured.schema.json",
  "title": "Structured Stack",
  "type": "object",
  "properties": {
    "instructions": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/step" },
          { "$ref": "#/$defs/stepSection" }
        ]
      }
    }
  },
  "required": ["instructions"],
  "$defs": {
    "step": {
      "allOf": [
        { "$ref": "../defs/entities.schema.json#/$defs/StepBase" },
        { "required": ["id"] }
      ]
    },
    "stepSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/step" },
              { "$ref": "#/$defs/stepSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "steps"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `stacks/structured@1.md`

* bytes: 936
* sha256: 0145ab1101443210a0385c33b63af1c9eab632fd2f058f8c705d3ef6ce76489c

```
# structured@1

## Purpose
The `structured@1` stack requires that instruction steps are structured objects with stable IDs, enabling cross-referencing, timing, and programmatic manipulation.

## Adds
- Top-level `instructions` array with structured step objects containing `id` and `text` fields.
- Steps may include `dependsOn`, `inputs`, `techniqueIds`, `usesEquipment`, `temperature`, `timing`, `images`, `videos`, and `metadata`.
- Support for nested step sections.

## Requires
- None

## Semantics
- MUST: Each step object must include `id` and `text` fields.
- MUST: Step IDs must be unique within the instructions array.
- NOTE: This stack is a prerequisite for `timed@1` and `referenced@1`.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Required by `timed@1` and `referenced@1`. Enables equipment references when combined with `equipment@1`.




```

### FILE: `stacks/substitutions.schema.json`

* bytes: 1382
* sha256: 6a44148c4e4b63732c8db377e148d270c6b3f472b9c3b97e62f8d2149318f888

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/substitutions.schema.json",
  "title": "Substitutions Stack",
  "type": "object",
  "properties": {
    "substitutions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "for": { "type": "string" },
          "alternatives": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": { "type": "string" },
                "ratio": { "type": "string" },
                "metadata": { "type": "object", "additionalProperties": true }
              },
              "required": ["name", "ratio"],
              "additionalProperties": false,
              "patternProperties": {
                "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
              }
            },
            "minItems": 1
          },
          "metadata": { "type": "object", "additionalProperties": true }
        },
        "required": ["for", "alternatives"],
        "additionalProperties": false,
        "patternProperties": {
          "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
        }
      },
      "minItems": 1
    }
  },
  "required": ["substitutions"],
  "additionalProperties": false
}

```

### FILE: `stacks/substitutions@1.md`

* bytes: 895
* sha256: e4e2bcee3348607eb0855ed6da5faa339500f1e8941c753c51f98ed48846bd52

```
# substitutions@1

## Purpose
The `substitutions@1` stack enables recipes to declare ingredient substitutions with alternatives and ratios.

## Adds
- Top-level `substitutions` array with substitution objects.
- Each substitution includes `for` (ingredient ID) and `alternatives` array.
- Each alternative includes `name` and `ratio` fields.

## Requires
- `referenced@1`

## Semantics
- MUST: The `for` field must reference an ingredient ID that exists in the ingredients array.
- MUST: Each substitution must include at least one alternative.
- NOTE: This stack requires `referenced@1` to ensure ingredient IDs are available for reference.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Requires `referenced@1` for ingredient ID resolution. Substitutions are informational and do not affect recipe structure.




```

### FILE: `stacks/techniques.schema.json`

* bytes: 824
* sha256: a72da1bfcb91d8422e4ae934fe9be38d2a20b728b9eaa5374b8017c09c70f999

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/techniques.schema.json",
  "title": "Techniques Stack",
  "type": "object",
  "properties": {
    "techniques": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "description": { "type": "string" },
          "metadata": { "type": "object", "additionalProperties": true }
        },
        "required": ["id", "name"],
        "additionalProperties": false,
        "patternProperties": {
          "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
        }
      },
      "minItems": 1
    }
  },
  "required": ["techniques"],
  "additionalProperties": false
}

```

### FILE: `stacks/techniques@1.md`

* bytes: 806
* sha256: abc987c050761481754873d31969b10260f8672b5325e08d664fec17a4b11776

```
# techniques@1

## Purpose
The `techniques@1` stack enables recipes to declare cooking techniques used in the recipe, with optional descriptions.

## Adds
- Top-level `techniques` array with technique objects.
- Each technique includes `id` and `name` fields, with optional `description` and `metadata`.

## Requires
- None

## Semantics
- MUST: The `techniques` array must contain at least one technique.
- MUST: Each technique must include `id` and `name` fields.
- NOTE: Technique IDs may be referenced in step `techniqueIds` arrays when `structured@1` is present.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Works with `structured@1` to enable step-level technique references. No hard dependencies on other stacks.




```

### FILE: `stacks/timed.schema.json`

* bytes: 1640
* sha256: d3a1b610f9de9f844d859fbfd5ca7c3f7fb9ea30a7b29c4a40bda001e4ab0229

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/timed.schema.json",
  "title": "Timed Stack",
  "type": "object",
  "properties": {
    "instructions": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/timedStep" },
          { "$ref": "#/$defs/timedStepSection" }
        ]
      }
    }
  },
  "required": ["instructions"],
  "allOf": [
    { "$ref": "./structured.schema.json" }
  ],
  "$defs": {
    "timedStep": {
      "allOf": [
        { "$ref": "../defs/entities.schema.json#/$defs/StepBase" },
        {
          "properties": {
            "timing": {
              "allOf": [
                { "$ref": "../defs/entities.schema.json#/$defs/StepBase/properties/timing" },
                { "required": ["activity"], "anyOf": [ { "required": ["duration"] }, { "required": ["completionCue"] } ] }
              ]
            }
          },
          "required": ["id", "timing"]
        }
      ]
    },
    "timedStepSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/timedStep" },
              { "$ref": "#/$defs/timedStepSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "steps"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  }
}

```

### FILE: `stacks/timed@1.md`

* bytes: 868
* sha256: 0cd02b105ac17a9ae250ff49613c6e149a9bbf3f836131d9c049e94ab82b12a6

```
# timed@1

## Purpose
The `timed@1` stack enables recipes to include timing information for steps, supporting scheduling and time-based planning.

## Adds
- Step objects must include a `timing` field with `activity` (active/passive) and either `duration` or `completionCue`.
- Timing may include duration ranges (minMinutes/maxMinutes) or completion cues.

## Requires
- `structured@1`

## Semantics
- MUST: Each step must include a `timing` object with `activity` field.
- MUST: Each timing object must include either `duration` or `completionCue`.
- NOTE: This stack implies `structured@1` (steps are objects with IDs).

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Required by `compute@1` for deterministic scheduling. Works with `quantified@1` for computational recipe planning.




```

### FILE: `test-repo-pack.md`

* bytes: 266501
* sha256: f9acecd741e09e2153f888be4990474ea184c027309df913a7a456bf1f914b3e

```
# Repo Pack: soustack-spec
Generated: 2025-12-19T21:24:45.590Z
Git: branch=main sha=a6582b66a868ee260d55c132804da4fe908f7b64 dirty=false
Limits: maxFileKB=100, maxTotalMB=5

## File Tree (paths)
```text
.cursorrules
.github/workflows/validate.yml
LICENSE
README.md
SPEC.md
defs/common.schema.json
defs/duration.schema.json
defs/entities.schema.json
defs/ingredientQuantified.schema.json
defs/quantity.schema.json
defs/scalingRule.schema.json
defs/temperature.schema.json
fixtures/content/illustrated-step.valid.json
fixtures/invalid/equipment-unknown-reference.invalid.json
fixtures/invalid/mise-en-place-unknown-equipment.invalid.json
fixtures/invalid/mise-en-place-unknown-input.invalid.json
fixtures/invalid/storage-leftovers-missing-method.invalid.json
fixtures/invalid/storage-leftovers-wrong-type.invalid.json
fixtures/level/base-full.valid.json
fixtures/level/base-missing-yield.invalid.json
fixtures/level/lite-min.valid.json
fixtures/profile/profile-base.valid.json
fixtures/profile/profile-lite.valid.json
fixtures/profile/profile-scalable-missing-scaling.invalid.json
fixtures/profile/profile-scalable.valid.json
fixtures/profile/profile-timed-missing-structured.invalid.json
fixtures/scaling/bakers-percent-missing-ref.invalid.json
fixtures/scaling/bakers-percent.valid.json
fixtures/scaling/discrete-range.invalid.json
fixtures/scaling/missing-quantified.invalid.json
fixtures/scaling/reject-bakersPercentage.invalid.json
fixtures/stacks/compute-missing-timed.invalid.json
fixtures/stacks/dietary-no-signal.invalid.json
fixtures/stacks/illustrated-empty.invalid.json
fixtures/stacks/quantified-string.invalid.json
fixtures/stacks/referenced-missing-input.invalid.json
fixtures/stacks/storage-min.valid.json
fixtures/stacks/storage-no-duration.invalid.json
fixtures/stacks/timed-implies-structured.valid.json
fixtures/stacks/timed-range.invalid.json
fixtures/valid/equipment-scaling-rules.valid.json
fixtures/valid/equipment-strings.valid.json
fixtures/valid/equipment-structured-uses.valid.json
fixtures/valid/mise-en-place-basic.valid.json
fixtures/valid/mise-en-place-referenced-equipment.valid.json
fixtures/valid/prep-ingredient-strings.valid.json
fixtures/valid/prep-ingredient-structured.valid.json
fixtures/valid/profile-equipped.valid.json
fixtures/valid/profile-prepped.valid.json
fixtures/valid/quantified-nested-ingredient-sections.valid.json
fixtures/valid/referenced-scaling.valid.json
fixtures/valid/storage-leftovers-simple.valid.json
fixtures/valid/storage-leftovers-structured.valid.json
fixtures/valid/structured-nested-step-sections.valid.json
package.json
schemas/stacks-registry.schema.json
scripts/check-schema-refs.mjs
scripts/dump-repo-for-ai.mjs
scripts/generate-docs-from-registry.mjs
scripts/generate-stack-gating.mjs
scripts/guard-no-legacy.mjs
scripts/migrate-stacks-to-map.mjs
scripts/validate-fixtures.mjs
scripts/validate-registry.mjs
scripts/verify-generated-clean.mjs
scripts/verify-stack-docs.mjs
soustack.schema.json
stacks/compute.schema.json
stacks/compute@1.md
stacks/dietary.schema.json
stacks/dietary@1.md
stacks/equipment.schema.json
stacks/equipment@1.md
stacks/illustrated.schema.json
stacks/illustrated@1.md
stacks/prep.schema.json
stacks/prep@1.md
stacks/quantified.schema.json
stacks/quantified@1.md
stacks/referenced.schema.json
stacks/referenced@1.md
stacks/registry.json
stacks/scaling.schema.json
stacks/scaling@1.md
stacks/storage.schema.json
stacks/storage@1.md
stacks/structured.schema.json
stacks/structured@1.md
stacks/substitutions.schema.json
stacks/substitutions@1.md
stacks/techniques.schema.json
stacks/techniques@1.md
stacks/timed.schema.json
stacks/timed@1.md
```

## Files (contents)

### FILE: `.cursorrules`

* bytes: 3889
* sha256: d4da276b824cb03e3553d15d6a8112b87093096e501648f1052d8463e8881a09

```
{
    "project": "soustack-spec",
    "role": "This repository defines the normative Soustack JSON Schema and specification. Treat it as a standards body, not an application codebase.",
  
    "principles": [
      "The schema is the product. Stability and predictability override cleverness.",
      "Backward compatibility is mandatory unless a MAJOR version bump is explicitly requested.",
      "Examples and fixtures are conformance tests, not illustrative suggestions.",
      "If behavior is not described in SPEC.md, it does not exist."
    ],
  
    "hard_rules": [
      "DO NOT add new schema fields, enums, or definitions without explicit instruction.",
      "DO NOT rename existing fields, definitions, levels, or files unless explicitly requested.",
      "DO NOT loosen validation rules silently (e.g. removing required fields, changing types).",
      "DO NOT add vendor-specific logic, heuristics, or runtime behavior.",
      "DO NOT invent new levels or reinterpret existing ones.",
      "DO NOT modify $id URLs, version strings, or schema paths independently."
    ],
  
    "versioning": {
      "authoritative_source": "SOUSTACK_SPEC_VERSION",
      "rules": [
        "Any schema change must match the version in SOUSTACK_SPEC_VERSION.",
        "PATCH releases are documentation, examples, or fixture-only.",
        "MINOR releases may add optional fields or clarify levels or stacks.",
        "MAJOR releases are required for breaking changes."
      ]
    },
  
    "schema_editing_rules": [
      "Schemas target JSON Schema 2020-12.",
      "Preserve additionalProperties behavior exactly as defined.",
      "Use allOf / anyOf consistently with existing patterns.",
      "Do not refactor schema structure for aesthetics."
    ],

    "levels": {
      "definition": "Soustack levels are constraint layers on top of the same core schema.",
      "rules": [
        "Levels are lite and base only.",
        "Levels may only add requirements, never remove allowances."
      ]
    },

    "stacks": {
      "definition": "Stacks declare optional capability lanes on top of the level.",
      "vocabulary": [
        "quantified",
        "structured",
        "timed",
        "referenced",
        "compute",
        "dietary",
        "storage",
        "substitutions",
        "techniques",
        "illustrated"
      ],
      "notes": [
        "Temperature is a supported primitive on steps and ingredients, not a stack.",
        "Compute depends on quantified and timed; timed implies structured."
      ]
    },
  
    "examples_and_fixtures": {
      "rules": [
        "examples/ must always be valid.",
        "fixtures/valid must validate.",
        "fixtures/invalid must fail validation.",
        "Changing a fixture requires explaining the rule it proves."
      ]
    },
  
    "documentation": {
      "normative_files": [
        "SPEC.md",
        "soustack.schema.json",
        "SOUSTACK_SPEC_VERSION"
      ],
      "rules": [
        "SPEC.md is the source of truth for meaning.",
        "README.md and docs/ may explain but not redefine behavior.",
        "If schema and docs disagree, schema wins."
      ]
    },

    "conformance": {
      "rules": [
        "scripts/validate-fixtures.mjs and the fixtures directory define canonical enforcement.",
        "Keep conformance behavior aligned with schema and SPEC.md." 
      ]
    },

    "testing_expectations": [
      "Run npm run validate:all before proposing changes.",
      "Never assume tests will be updated to fit schema changes.",
      "Fix schema or docs, not tests, unless explicitly instructed."
    ],
  
    "ai_behavior_constraints": [
      "Prefer minimal diffs.",
      "Ask for clarification instead of guessing intent.",
      "Surface risks and compatibility impact before making changes.",
      "If unsure, do nothing and explain why."
    ]
  }
  
```

### FILE: `.github/workflows/validate.yml`

* bytes: 250
* sha256: 3324724b78bcb72975279c2919928e45a852ed92a5805a626fca4c1b34672f37

```
name: Validate

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test

```

### FILE: `LICENSE`

* bytes: 7048
* sha256: a2010f343487d3f7618affe54f789f5487602331c0a8d03f49e9a7c547cf0499

```
Creative Commons Legal Code

CC0 1.0 Universal

    CREATIVE COMMONS CORPORATION IS NOT A LAW FIRM AND DOES NOT PROVIDE
    LEGAL SERVICES. DISTRIBUTION OF THIS DOCUMENT DOES NOT CREATE AN
    ATTORNEY-CLIENT RELATIONSHIP. CREATIVE COMMONS PROVIDES THIS
    INFORMATION ON AN "AS-IS" BASIS. CREATIVE COMMONS MAKES NO WARRANTIES
    REGARDING THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS
    PROVIDED HEREUNDER, AND DISCLAIMS LIABILITY FOR DAMAGES RESULTING FROM
    THE USE OF THIS DOCUMENT OR THE INFORMATION OR WORKS PROVIDED
    HEREUNDER.

Statement of Purpose

The laws of most jurisdictions throughout the world automatically confer
exclusive Copyright and Related Rights (defined below) upon the creator
and subsequent owner(s) (each and all, an "owner") of an original work of
authorship and/or a database (each, a "Work").

Certain owners wish to permanently relinquish those rights to a Work for
the purpose of contributing to a commons of creative, cultural and
scientific works ("Commons") that the public can reliably and without fear
of later claims of infringement build upon, modify, incorporate in other
works, reuse and redistribute as freely as possible in any form whatsoever
and for any purposes, including without limitation commercial purposes.
These owners may contribute to the Commons to promote the ideal of a free
culture and the further production of creative, cultural and scientific
works, or to gain reputation or greater distribution for their Work in
part through the use and efforts of others.

For these and/or other purposes and motivations, and without any
expectation of additional consideration or compensation, the person
associating CC0 with a Work (the "Affirmer"), to the extent that he or she
is an owner of Copyright and Related Rights in the Work, voluntarily
elects to apply CC0 to the Work and publicly distribute the Work under its
terms, with knowledge of his or her Copyright and Related Rights in the
Work and the meaning and intended legal effect of CC0 on those rights.

1. Copyright and Related Rights. A Work made available under CC0 may be
protected by copyright and related or neighboring rights ("Copyright and
Related Rights"). Copyright and Related Rights include, but are not
limited to, the following:

  i. the right to reproduce, adapt, distribute, perform, display,
     communicate, and translate a Work;
 ii. moral rights retained by the original author(s) and/or performer(s);
iii. publicity and privacy rights pertaining to a person's image or
     likeness depicted in a Work;
 iv. rights protecting against unfair competition in regards to a Work,
     subject to the limitations in paragraph 4(a), below;
  v. rights protecting the extraction, dissemination, use and reuse of data
     in a Work;
 vi. database rights (such as those arising under Directive 96/9/EC of the
     European Parliament and of the Council of 11 March 1996 on the legal
     protection of databases, and under any national implementation
     thereof, including any amended or successor version of such
     directive); and
vii. other similar, equivalent or corresponding rights throughout the
     world based on applicable law or treaty, and any national
     implementations thereof.

2. Waiver. To the greatest extent permitted by, but not in contravention
of, applicable law, Affirmer hereby overtly, fully, permanently,
irrevocably and unconditionally waives, abandons, and surrenders all of
Affirmer's Copyright and Related Rights and associated claims and causes
of action, whether now known or unknown (including existing as well as
future claims and causes of action), in the Work (i) in all territories
worldwide, (ii) for the maximum duration provided by applicable law or
treaty (including future time extensions), (iii) in any current or future
medium and for any number of copies, and (iv) for any purpose whatsoever,
including without limitation commercial, advertising or promotional
purposes (the "Waiver"). Affirmer makes the Waiver for the benefit of each
member of the public at large and to the detriment of Affirmer's heirs and
successors, fully intending that such Waiver shall not be subject to
revocation, rescission, cancellation, termination, or any other legal or
equitable action to disrupt the quiet enjoyment of the Work by the public
as contemplated by Affirmer's express Statement of Purpose.

3. Public License Fallback. Should any part of the Waiver for any reason
be judged legally invalid or ineffective under applicable law, then the
Waiver shall be preserved to the maximum extent permitted taking into
account Affirmer's express Statement of Purpose. In addition, to the
extent the Waiver is so judged Affirmer hereby grants to each affected
person a royalty-free, non transferable, non sublicensable, non exclusive,
irrevocable and unconditional license to exercise Affirmer's Copyright and
Related Rights in the Work (i) in all territories worldwide, (ii) for the
maximum duration provided by applicable law or treaty (including future
time extensions), (iii) in any current or future medium and for any number
of copies, and (iv) for any purpose whatsoever, including without
limitation commercial, advertising or promotional purposes (the
"License"). The License shall be deemed effective as of the date CC0 was
applied by Affirmer to the Work. Should any part of the License for any
reason be judged legally invalid or ineffective under applicable law, such
partial invalidity or ineffectiveness shall not invalidate the remainder
of the License, and in such case Affirmer hereby affirms that he or she
will not (i) exercise any of his or her remaining Copyright and Related
Rights in the Work or (ii) assert any associated claims and causes of
action with respect to the Work, in either case contrary to Affirmer's
express Statement of Purpose.

4. Limitations and Disclaimers.

 a. No trademark or patent rights held by Affirmer are waived, abandoned,
    surrendered, licensed or otherwise affected by this document.
 b. Affirmer offers the Work as-is and makes no representations or
    warranties of any kind concerning the Work, express, implied,
    statutory or otherwise, including without limitation warranties of
    title, merchantability, fitness for a particular purpose, non
    infringement, or the absence of latent or other defects, accuracy, or
    the present or absence of errors, whether or not discoverable, all to
    the greatest extent permissible under applicable law.
 c. Affirmer disclaims responsibility for clearing rights of other persons
    that may apply to the Work or any use thereof, including without
    limitation any person's Copyright and Related Rights in the Work.
    Further, Affirmer disclaims responsibility for obtaining any necessary
    consents, permissions or other rights required for any use of the
    Work.
 d. Affirmer understands and acknowledges that Creative Commons is not a
    party to this document and has no duty or obligation with respect to
    this CC0 or use of the Work.

```

### FILE: `README.md`

* bytes: 8090
* sha256: f7dbc10c1e2b65041bbabfcdf2c1ef1b6532dec2f7abef548f3515f2f9e084cb

```

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
| **compute** | 1 | quantified, timed | lite | `stacks/compute.schema.json` | `stacks/compute@1.md` |
| **dietary** | 1 | — | lite | `stacks/dietary.schema.json` | `stacks/dietary@1.md` |
| **equipment** | 1 | — | lite | `stacks/equipment.schema.json` | `stacks/equipment@1.md` |
| **illustrated** | 1 | — | illustrated | `stacks/illustrated.schema.json` | `stacks/illustrated@1.md` |
| **prep** | 1 | — | lite | `stacks/prep.schema.json` | `stacks/prep@1.md` |
| **quantified** | 1 | — | scalable | `stacks/quantified.schema.json` | `stacks/quantified@1.md` |
| **referenced** | 1 | structured | timed | `stacks/referenced.schema.json` | `stacks/referenced@1.md` |
| **scaling** | 1 | quantified | scalable | `stacks/scaling.schema.json` | `stacks/scaling@1.md` |
| **storage** | 1 | — | lite | `stacks/storage.schema.json` | `stacks/storage@1.md` |
| **structured** | 1 | — | timed | `stacks/structured.schema.json` | `stacks/structured@1.md` |
| **substitutions** | 1 | referenced | lite | `stacks/substitutions.schema.json` | `stacks/substitutions@1.md` |
| **techniques** | 1 | — | lite | `stacks/techniques.schema.json` | `stacks/techniques@1.md` |
| **timed** | 1 | structured | timed | `stacks/timed.schema.json` | `stacks/timed@1.md` |

<!-- END GENERATED: STACK REGISTRY -->

```

### FILE: `SPEC.md`

* bytes: 8075
* sha256: 644c16cbcd414541bed890f603142897b28730fda1bdc8d80cdf031b97b4a926

```
# Soustack Specification

## 1. Scope and Purpose

Soustack is an open specification for representing recipes as structured, interoperable, and progressively computable data.

The primary design goal of this specification is **universal adoption**: recipes should be publishable with minimal friction, while enabling increasingly powerful capabilities (scaling, timing, scheduling, visualization) as structure is added.

Soustack achieves this by defining:

* a small, stable core document shape
* **Profiles** as human-facing conformance targets
* **Stacks** as machine-enforced capability requirements
* semantic validation rules that ensure interoperability beyond JSON Schema alone

This document is **normative** unless otherwise noted.

---

## 2. Terminology

* **Document**: A JSON object conforming to the Soustack root schema.
* **Level**: A baseline classification (`lite` or `base`) defining minimum required structure.
* **Profile**: A named, human-facing conformance target describing what a consumer may rely on.
* **Stack**: A declared capability that activates additional structural and/or semantic requirements.
* **Conformance**: Passing both schema validation and all required semantic checks.
* **Badge**: A derived, informative label emitted by tooling based on observed conformance.

---

## 3. Profiles (Normative)

Profiles are the **primary public contract** of the Soustack specification.

A Profile defines a bundle of requirements expressed in terms of:

* required `level`
* required `stacks`
* required semantic validation rules

Profiles support an **adoption ladder**: publishers may start with minimal structure and progressively add capabilities without changing the overall document shape.

### 3.1 Profile Declaration

* A document MAY declare a profile explicitly using a top-level `profile` field. The field is OPTIONAL; omission MUST NOT change document validity.
* Tools MAY infer the profile from `level` and `stacks` when `profile` is absent.
* `profile` is a single primary claim (no arrays or multi-profile declarations).
* If a document declares both a `profile` and explicit `level`/`stacks`, they MUST NOT contradict. Contradictions MUST be treated as non-conformant.

### 3.2 Stack Semantics

If a document declares a stack in `stacks[]`, it MUST satisfy all requirements of that stack as defined by this specification.

Stacks that impose no additional structural or semantic requirements are not permitted in future major versions.

---

## 4. Profile Definitions

### Profile: Lite

**Purpose:** Lowest-friction publishing and ingestion.

**Requirements**

* `level` MUST be `lite`.

**Guarantees**

* Valid Soustack container structure.
* Ingredients and instructions MAY be unstructured strings.

---

### Profile: Base

**Purpose:** Minimum cookable baseline.

**Requirements**

* `level` MUST be `base`.

**Guarantees**

* Document includes `yield` and `time`.

---

### Profile: Illustrated

**Purpose:** Visually rich, embeddable recipes.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `illustrated@1`.

**Semantic Requirements**

* At least one media item MUST be present at the recipe or step level.

---

### Profile: Structured

**Purpose:** Stable structure and node identity.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `structured@1`.

**Guarantees**

* Ingredients and steps are objects with stable IDs.

---

### Profile: Referenced

**Purpose:** Explicit linkage between steps and ingredients.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `structured@1` and `referenced@1`.

**Semantic Requirements**

* All references MUST resolve.

---

### Profile: Timed

**Purpose:** Step-level timing.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `structured@1` and `timed@1`.

---

### Profile: Schedulable

**Purpose:** Deterministic scheduling.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `structured@1` and `timed@1`.

**Semantic Requirements**

* Dependency graph MUST be acyclic.

---

### Profile: Quantified

**Purpose:** Machine-readable quantities.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `quantified@1`.

---

### Profile: Scalable

**Purpose:** Interoperable scaling.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `quantified@1` and `scaling@1`.

**Semantic Requirements**

* Baker's percentage references MUST resolve to declared ingredient ids.
* Discrete scaling ranges MUST have `min` less than or equal to `max`.

---

### Profile: Nutrition

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `nutrition@1`.

---

### Profile: Dietary

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `dietary@1`.

---

### Profile: Storage

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `storage@1`.

---

## 5. Stacks

Stacks define capability-specific structural and semantic requirements. Each stack is versioned and defined in its own schema and documentation.

High-value optional stacks include `equipment@1` for declaring required equipment with scaling-aware counts and step-level usage references.

---

## 6. Semantic Validation

In addition to schema validation, conforming tools MUST enforce semantic rules, including but not limited to:

* ID uniqueness
* Reference resolution
* Dependency graph acyclicity
* Timing coherence

---

## 7. Derived Badges (Informative)

Validators MAY emit derived badges such as:

* **Computable**
* **Schedulable**
* **Scalable**

Badges are informative and do not replace profile conformance.

---

## 8. Versioning

This specification uses semantic versioning. Schema identifiers and conformance rules are versioned and MUST be treated as immutable once published.

---

## 9. Non-Normative Notes

Non-normative guidance, examples, and adoption notes MAY be published separately and are not part of this specification.



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
| **compute** | 1 | quantified, timed | lite | `stacks/compute.schema.json` | `stacks/compute@1.md` |
| **dietary** | 1 | — | lite | `stacks/dietary.schema.json` | `stacks/dietary@1.md` |
| **equipment** | 1 | — | lite | `stacks/equipment.schema.json` | `stacks/equipment@1.md` |
| **illustrated** | 1 | — | illustrated | `stacks/illustrated.schema.json` | `stacks/illustrated@1.md` |
| **prep** | 1 | — | lite | `stacks/prep.schema.json` | `stacks/prep@1.md` |
| **quantified** | 1 | — | scalable | `stacks/quantified.schema.json` | `stacks/quantified@1.md` |
| **referenced** | 1 | structured | timed | `stacks/referenced.schema.json` | `stacks/referenced@1.md` |
| **scaling** | 1 | quantified | scalable | `stacks/scaling.schema.json` | `stacks/scaling@1.md` |
| **storage** | 1 | — | lite | `stacks/storage.schema.json` | `stacks/storage@1.md` |
| **structured** | 1 | — | timed | `stacks/structured.schema.json` | `stacks/structured@1.md` |
| **substitutions** | 1 | referenced | lite | `stacks/substitutions.schema.json` | `stacks/substitutions@1.md` |
| **techniques** | 1 | — | lite | `stacks/techniques.schema.json` | `stacks/techniques@1.md` |
| **timed** | 1 | structured | timed | `stacks/timed.schema.json` | `stacks/timed@1.md` |

<!-- END GENERATED: STACK REGISTRY -->

```

### FILE: `defs/common.schema.json`

* bytes: 1238
* sha256: 798f7a91bb9f2f59f4803a986ecfd56a6ab8158575c92bd311f87a15a59f4c13

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/common.schema.json",
  "title": "Common definitions for Soustack",
  "type": "object",
  "properties": {
    "stackId": {
      "type": "string",
      "anyOf": [
        {
          "enum": [
            "quantified@1",
            "structured@1",
            "timed@1",
            "referenced@1",
            "compute@1",
            "storage@1",
            "dietary@1",
            "substitutions@1",
            "techniques@1",
            "illustrated@1",
            "scaling@1",
            "nutrition@1"
          ]
        },
        {
          "pattern": "^x-[A-Za-z0-9_-]+@[0-9]+$",
          "description": "Extension stacks must use x- prefix and include a major version"
        }
      ]
    },
    "extensionLane": {
      "type": "string",
      "pattern": "^x-[A-Za-z0-9_-]+$"
    },
    "extensionLaneValue": {
      "description": "Accept any JSON value for extension lanes while keeping the top-level property name constrained.",
      "type": ["object", "array", "string", "number", "boolean", "null"]
    },
    "uri": {
      "type": "string",
      "format": "uri"
    }
  },
  "additionalProperties": false
}

```

### FILE: `defs/duration.schema.json`

* bytes: 1033
* sha256: 151b9efdede26e6806696734b9cdc747121638f5cf905f45073e5a25bec951f0

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/duration.schema.json",
  "title": "Durations",
  "type": "object",
  "properties": {
    "DurationMinutes": {
      "type": "object",
      "properties": {
        "minutes": { "type": "number", "exclusiveMinimum": 0 },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["minutes"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "StorageDuration": {
      "type": "object",
      "properties": {
        "iso8601": { "type": "string", "pattern": "^P" },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["iso8601"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `defs/entities.schema.json`

* bytes: 3637
* sha256: 36b1e320bfdf2cd5584dc00e17a7ef4ff1465230671b211df3fe975dc3211f7d

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/entities.schema.json",
  "title": "Soustack entity bases",
  "type": "object",
  "$defs": {
    "IngredientBase": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "quantity": { "$ref": "./quantity.schema.json" },
        "temperature": { "$ref": "./temperature.schema.json" },
        "notes": { "type": "string" },
        "prep": {
          "oneOf": [
            { "type": "string", "minLength": 1 },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "anyOf": [
                  { "type": "string", "minLength": 1 },
                  { "$ref": "../stacks/prep.schema.json#/$defs/prepItem" }
                ]
              }
            }
          ]
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["name"],
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "StepBase": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "text": { "type": "string" },
        "dependsOn": {
          "type": "array",
          "items": { "type": "string" },
          "uniqueItems": true
        },
        "inputs": {
          "type": "array",
          "items": { "type": "string" },
          "uniqueItems": true
        },
        "techniqueIds": {
          "type": "array",
          "items": { "type": "string" },
          "uniqueItems": true
        },
        "usesEquipment": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Za-z0-9._-]+$"
          },
          "uniqueItems": true
        },
        "temperature": { "$ref": "./temperature.schema.json" },
        "timing": {
          "type": "object",
          "properties": {
            "activity": { "type": "string", "enum": ["active", "passive"] },
            "duration": {
              "type": "object",
              "oneOf": [
                { "$ref": "./duration.schema.json#/properties/DurationMinutes" },
                {
                  "type": "object",
                  "properties": {
                    "minMinutes": { "type": "number", "exclusiveMinimum": 0 },
                    "maxMinutes": { "type": "number", "exclusiveMinimum": 0 }
                  },
                  "required": ["minMinutes", "maxMinutes"],
                  "additionalProperties": false
                }
              ]
            },
            "completionCue": { "type": "string" },
            "metadata": { "type": "object", "additionalProperties": true }
          },
          "anyOf": [
            { "required": ["duration"] },
            { "required": ["completionCue"] }
          ],
          "additionalProperties": false,
          "patternProperties": {
            "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
          }
        },
        "images": { "type": "array", "items": { "$ref": "./common.schema.json#/properties/uri" } },
        "videos": { "type": "array", "items": { "$ref": "./common.schema.json#/properties/uri" } },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["text"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `defs/ingredientQuantified.schema.json`

* bytes: 293
* sha256: 23222808768642b9a35dd0e02fdd92c45f41f4b4d7061badb4bfcf0ad921e44d

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/ingredientQuantified.schema.json",
  "title": "Quantified Ingredient",
  "allOf": [
    { "$ref": "./entities.schema.json#/$defs/IngredientBase" },
    { "required": ["id", "quantity"] }
  ]
}

```

### FILE: `defs/quantity.schema.json`

* bytes: 517
* sha256: 3556dd91b04c4aa85f356e572ff4bb3470ca64f3965fb7cb4764f5037cd18f17

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/quantity.schema.json",
  "title": "Quantity",
  "type": "object",
  "properties": {
    "amount": { "type": "number" },
    "unit": { "type": "string", "minLength": 1 },
    "metadata": { "type": "object", "additionalProperties": true }
  },
  "required": ["amount", "unit"],
  "additionalProperties": false,
  "patternProperties": {
    "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
  }
}

```

### FILE: `defs/scalingRule.schema.json`

* bytes: 1944
* sha256: ded6128907b832a655c556520fccf9a2e67099f3fe494a8bb0a11df32ff5011e

```
{
"$id": "https://soustack.spec/defs/scalingRule.schema.json",
"$schema": "https://json-schema.org/draft/2020-12/schema",
"title": "Soustack ScalingRule",
"type": "object",
"additionalProperties": false,
"required": ["mode"],
"properties": {
"mode": {
"type": "string",
"enum": ["linear", "fixed", "discrete", "toTaste", "bakersPercent"]
},

"step": {
  "type": "number",
  "exclusiveMinimum": 0
},
"rounding": {
  "type": "string",
  "enum": ["nearest", "ceil", "floor"]
},
"min": {
  "type": "number"
},
"max": {
  "type": "number"
},

"percent": {
  "type": "number",
  "exclusiveMinimum": 0
},
"of": {
  "type": "string",
  "minLength": 1
}

},

"allOf": [
{
"if": {
"properties": { "mode": { "const": "linear" } },
"required": ["mode"]
},
"then": {
"not": {
"anyOf": [
{ "required": ["step"] },
{ "required": ["rounding"] },
{ "required": ["min"] },
{ "required": ["max"] },
{ "required": ["percent"] },
{ "required": ["of"] }
]
}
}
},
{
"if": {
"properties": { "mode": { "const": "fixed" } },
"required": ["mode"]
},
"then": {
"not": {
"anyOf": [
{ "required": ["step"] },
{ "required": ["rounding"] },
{ "required": ["min"] },
{ "required": ["max"] },
{ "required": ["percent"] },
{ "required": ["of"] }
]
}
}
},
{
"if": {
"properties": { "mode": { "const": "toTaste" } },
"required": ["mode"]
},
"then": {
"not": {
"anyOf": [
{ "required": ["step"] },
{ "required": ["rounding"] },
{ "required": ["min"] },
{ "required": ["max"] },
{ "required": ["percent"] },
{ "required": ["of"] }
]
}
}
},
{
"if": {
"properties": { "mode": { "const": "discrete" } },
"required": ["mode"]
},
"then": {
"not": {
"anyOf": [
{ "required": ["percent"] },
{ "required": ["of"] }
]
}
}
},
{
"if": {
"properties": { "mode": { "const": "bakersPercent" } },
"required": ["mode"]
},
"then": {
"required": ["percent", "of"],
"not": {
"anyOf": [
{ "required": ["step"] },
{ "required": ["rounding"] },
{ "required": ["min"] },
{ "required": ["max"] }
]
}
}
}
]
}
```

### FILE: `defs/temperature.schema.json`

* bytes: 2199
* sha256: ff3106728fdf2ecb3354c6f66186b8888ab6d86dc32996d464b47e92a13fb115

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/defs/temperature.schema.json",
  "title": "Temperature",
  "type": "object",
  "oneOf": [
    {
      "type": "object",
      "properties": {
        "target": {
          "type": "string",
          "enum": ["oven", "stovetop", "pan", "oil", "water", "grill", "broiler", "internal", "ambient", "surface"]
        },
        "level": {
          "type": "string",
          "enum": ["veryLow", "low", "medium", "mediumHigh", "high", "veryHigh"]
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["target", "level"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    },
    {
      "type": "object",
      "properties": {
        "target": {
          "type": "string",
          "enum": ["oven", "stovetop", "pan", "oil", "water", "grill", "broiler", "internal", "ambient", "surface"]
        },
        "unit": { "type": "string", "enum": ["celsius", "fahrenheit"] },
        "value": { "type": "number" },
        "approximate": { "type": "boolean" },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["target", "unit", "value"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    },
    {
      "type": "object",
      "properties": {
        "target": {
          "type": "string",
          "enum": ["oven", "stovetop", "pan", "oil", "water", "grill", "broiler", "internal", "ambient", "surface"]
        },
        "unit": { "type": "string", "enum": ["celsius", "fahrenheit"] },
        "minValue": { "type": "number" },
        "maxValue": { "type": "number" },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["target", "unit", "minValue", "maxValue"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "./common.schema.json#/properties/extensionLaneValue" }
      }
    }
  ]
}

```

### FILE: `fixtures/content/illustrated-step.valid.json`

* bytes: 420
* sha256: f58fa9d2b629512226dea6a40b420f110b9b37e684ec61db27d9da4ba1b78e6c

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "structured": 1,
    "illustrated": 1
  },
  "name": "Picture Smoothie",
  "ingredients": [
    "fruit",
    "yogurt"
  ],
  "instructions": [
    {
      "id": "s1",
      "text": "blend",
      "images": [
        "http://example.com/blend.jpg"
      ]
    }
  ],
  "images": [
    "http://example.com/cover2.jpg"
  ]
}

```

### FILE: `fixtures/invalid/equipment-unknown-reference.invalid.json`

* bytes: 601
* sha256: b05125c85f425ed963dd6ffb0649e14a890a2e52b9611b80b2efecb5035f2336

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "equipment": 1,
    "structured": 1
  },
  "name": "Recipe with Invalid Equipment Reference",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    {
      "id": "skillet",
      "name": "8-inch skillet"
    }
  ],
  "ingredients": [
    {
      "id": "meat",
      "name": "Meat"
    }
  ],
  "instructions": [
    {
      "id": "sear",
      "text": "Sear the meat",
      "usesEquipment": ["nonexistent"]
    }
  ]
}


```

### FILE: `fixtures/invalid/mise-en-place-unknown-equipment.invalid.json`

* bytes: 583
* sha256: f28b0b8c857b8e0a7d643970e38940616b4b5955f20a288a5dcd86e4fefac478

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1,
    "equipment": 1
  },
  "name": "Recipe with Unknown Equipment Reference",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    {
      "id": "knife",
      "name": "Chef's knife"
    }
  ],
  "ingredients": [
    "onion"
  ],
  "instructions": [
    "Cook"
  ],
  "miseEnPlace": [
    {
      "text": "Use the missing equipment",
      "usesEquipment": ["missing-equipment"]
    }
  ]
}


```

### FILE: `fixtures/invalid/mise-en-place-unknown-input.invalid.json`

* bytes: 628
* sha256: 63fb979942308597687573669b97352323f3810be00bdea10aba8a08cd6aad02

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1,
    "referenced": 1,
    "structured": 1
  },
  "name": "Recipe with Unknown Input Reference",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    {
      "id": "onion",
      "name": "Onion"
    }
  ],
  "instructions": [
    {
      "id": "cook",
      "text": "Cook",
      "inputs": ["onion"]
    }
  ],
  "miseEnPlace": [
    {
      "text": "Prepare the missing ingredient",
      "inputs": ["missing-ingredient"]
    }
  ]
}


```

### FILE: `fixtures/invalid/storage-leftovers-missing-method.invalid.json`

* bytes: 568
* sha256: a97f6d93a49d334c647efb0cc3b9e8854abe2e2269db0037209a1faba079e3d7

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Recipe with Invalid Reheat Instruction",
  "ingredients": [
    "food"
  ],
  "instructions": [
    "Cook the food"
  ],
  "storage": {
    "refrigerated": {
      "duration": {
        "iso8601": "P3D"
      }
    },
    "leftovers": {
      "reheat": [
        {
          "duration": {
            "minMinutes": 2,
            "maxMinutes": 3
          },
          "notes": "Missing required method field"
        }
      ]
    }
  }
}


```

### FILE: `fixtures/invalid/storage-leftovers-wrong-type.invalid.json`

* bytes: 410
* sha256: 2058d3758a75b46281d2de09a8ab099eb6e382d2dac1f1aefe3fd1a3d2345a4e

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Recipe with Wrong Reheat Type",
  "ingredients": [
    "food"
  ],
  "instructions": [
    "Cook the food"
  ],
  "storage": {
    "refrigerated": {
      "duration": {
        "iso8601": "P3D"
      }
    },
    "leftovers": {
      "reheat": "Microwave 2–3 minutes"
    }
  }
}


```

### FILE: `fixtures/level/base-full.valid.json`

* bytes: 2645
* sha256: 4265fe805c2db89b5b1f9edbcd0342b3c6c1a8d6337a2bed0a511e96b6df7f90

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "structured": 1,
    "timed": 1,
    "referenced": 1,
    "compute": 1,
    "storage": 1,
    "dietary": 1,
    "substitutions": 1,
    "techniques": 1,
    "illustrated": 1
  },
  "name": "Garlic Pasta",
  "yield": {
    "amount": 4,
    "unit": "servings"
  },
  "time": {
    "total": {
      "minutes": 45
    }
  },
  "ingredients": [
    {
      "id": "i1",
      "name": "pasta",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    },
    {
      "id": "i2",
      "name": "garlic",
      "quantity": {
        "amount": 4,
        "unit": "clove"
      }
    }
  ],
  "instructions": [
    {
      "id": "s1",
      "text": "Boil water",
      "timing": {
        "activity": "active",
        "duration": {
          "minutes": 10
        }
      },
      "inputs": [
        "i1"
      ],
      "techniqueIds": [
        "t1"
      ],
      "images": [
        "http://example.com/step1.jpg"
      ]
    },
    {
      "id": "s2",
      "text": "Cook pasta",
      "timing": {
        "activity": "active",
        "duration": {
          "minMinutes": 8,
          "maxMinutes": 10
        }
      },
      "dependsOn": [
        "s1"
      ],
      "inputs": [
        "i1"
      ],
      "techniqueIds": [
        "t2"
      ],
      "temperature": {
        "target": "water",
        "level": "high"
      },
      "videos": [
        "http://example.com/v1.mp4"
      ]
    },
    {
      "id": "s3",
      "text": "Saute garlic",
      "timing": {
        "activity": "active",
        "duration": {
          "minutes": 5
        },
        "completionCue": "fragrant"
      },
      "dependsOn": [
        "s2"
      ],
      "inputs": [
        "i2"
      ],
      "techniqueIds": [
        "t1",
        "t3"
      ],
      "temperature": {
        "target": "stovetop",
        "level": "medium"
      }
    }
  ],
  "images": [
    "http://example.com/cover.jpg"
  ],
  "videos": [
    "http://example.com/cover.mp4"
  ],
  "dietary": {
    "basis": "perServing",
    "calories": 400,
    "diets": [
      "vegetarian"
    ]
  },
  "storage": {
    "refrigerated": {
      "duration": {
        "iso8601": "P2D"
      }
    }
  },
  "substitutions": [
    {
      "for": "garlic",
      "alternatives": [
        {
          "name": "shallot",
          "ratio": "1:1"
        }
      ]
    }
  ],
  "techniques": [
    {
      "id": "t1",
      "name": "Boil"
    },
    {
      "id": "t2",
      "name": "Simmer"
    },
    {
      "id": "t3",
      "name": "Saute"
    }
  ]
}

```

### FILE: `fixtures/level/base-missing-yield.invalid.json`

* bytes: 194
* sha256: afbcf2c30fe7a9601d3bb224bf4ced3975f268d50e20472c41784e102d7e770f

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {},
  "name": "Broken Recipe",
  "ingredients": [
    "thing"
  ],
  "instructions": [
    "do"
  ]
}

```

### FILE: `fixtures/level/lite-min.valid.json`

* bytes: 243
* sha256: 0284be9aa833f2dcdd515e9877b160b00ed04953c1c5771badb19b26ce22f365

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {},
  "name": "Simple Toast",
  "ingredients": [
    "bread slice",
    "butter"
  ],
  "instructions": [
    "toast bread",
    "spread butter"
  ]
}

```

### FILE: `fixtures/profile/profile-base.valid.json`

* bytes: 292
* sha256: 3bec0d7a4ec8f8eb62ae786fbb39c469aa3d7afffab57e2168d62ef93cd87113

```
{
  "level": "base",
  "profile": "base",
  "stacks": {},
  "name": "Boiled Egg",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 10
    }
  },
  "ingredients": [
    "Egg"
  ],
  "instructions": [
    "Boil the egg for 10 minutes."
  ]
}

```

### FILE: `fixtures/profile/profile-lite.valid.json`

* bytes: 214
* sha256: 15c7358f6e9afaefa9f3504a690230b131f96c09a7ca95416d63094766bd5b33

```
{
  "level": "lite",
  "profile": "lite",
  "stacks": {},
  "name": "Simple Toast",
  "ingredients": [
    "Bread",
    "Butter"
  ],
  "instructions": [
    "Toast the bread.",
    "Spread butter on toast."
  ]
}

```

### FILE: `fixtures/profile/profile-scalable-missing-scaling.invalid.json`

* bytes: 430
* sha256: 668bd6c6989570e84fcd62c1d3d19bdf76875098e042c1fe1007bae5ba7658a8

```
{
  "level": "base",
  "profile": "scalable",
  "stacks": {
    "quantified": 1
  },
  "name": "Scaled Bread",
  "yield": {
    "amount": 2,
    "unit": "loaf"
  },
  "time": {
    "total": {
      "minutes": 180
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Bread flour",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    }
  ],
  "instructions": [
    "Mix ingredients."
  ]
}

```

### FILE: `fixtures/profile/profile-scalable.valid.json`

* bytes: 762
* sha256: 6e52deb42de533cd8056e84bad12e06626330c4a4d3b9726f7a4ebe66335cfd5

```
{
  "level": "base",
  "profile": "scalable",
  "stacks": {
    "quantified": 1,
    "scaling": 1
  },
  "name": "Scaled Bread",
  "yield": {
    "amount": 2,
    "unit": "loaf"
  },
  "time": {
    "total": {
      "minutes": 180
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Bread flour",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    },
    {
      "id": "water",
      "name": "Water",
      "quantity": {
        "amount": 325,
        "unit": "g"
      }
    }
  ],
  "scaling": {
    "discrete": {
      "min": 1,
      "max": 5,
      "step": 1
    }
  },
  "instructions": [
    {
      "text": "Combine ingredients and knead until smooth.",
      "dependsOn": [],
      "id": "step-1"
    }
  ]
}

```

### FILE: `fixtures/profile/profile-timed-missing-structured.invalid.json`

* bytes: 429
* sha256: 056249929f5f3cccf4a0a12f00e5b5af3d4593ff1dfd5f0bc2b366c7046792ec

```
{
  "level": "base",
  "profile": "timed",
  "stacks": {
    "timed": 1
  },
  "name": "Timed Roast",
  "yield": {
    "amount": 4,
    "unit": "servings"
  },
  "time": {
    "total": {
      "minutes": 90
    }
  },
  "ingredients": [
    "Beef"
  ],
  "instructions": [
    {
      "id": "step-1",
      "text": "Roast until done",
      "timing": {
        "duration": {
          "minutes": 90
        }
      }
    }
  ]
}

```

### FILE: `fixtures/scaling/bakers-percent-missing-ref.invalid.json`

* bytes: 651
* sha256: 7a144a0a3501669d1201706f02760f348e89eb8419b0aa06998f7557aa38e0bc

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "scaling": 1
  },
  "name": "Bad Baker Percent",
  "yield": {
    "amount": 1,
    "unit": "batch"
  },
  "time": {
    "total": {
      "minutes": 20
    }
  },
  "ingredients": [
    {
      "id": "salt",
      "name": "Salt",
      "quantity": {
        "amount": 10,
        "unit": "g"
      },
      "scaling": {
        "mode": "bakersPercent",
        "percent": 2,
        "of": "missing"
      }
    }
  ],
  "instructions": [
    "combine"
  ],
  "scaling": {
    "discrete": {
      "min": 2,
      "max": 6
    }
  }
}

```

### FILE: `fixtures/scaling/bakers-percent.valid.json`

* bytes: 806
* sha256: 3080e8fc2c728b21282201d296a5af6b54b7615a44b7c7c409e42f72558e6302

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "scaling": 1
  },
  "name": "Scaled Bread",
  "yield": {
    "amount": 1,
    "unit": "loaf"
  },
  "time": {
    "total": {
      "minutes": 45
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Bread flour",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    },
    {
      "id": "water",
      "name": "Water",
      "quantity": {
        "amount": 325,
        "unit": "g"
      },
      "scaling": {
        "mode": "bakersPercent",
        "percent": 65,
        "of": "flour"
      }
    }
  ],
  "instructions": [
    "mix",
    "bake"
  ],
  "scaling": {
    "discrete": {
      "min": 1,
      "max": 4,
      "step": 1
    }
  }
}

```

### FILE: `fixtures/scaling/discrete-range.invalid.json`

* bytes: 535
* sha256: a96ffcbaefb18a254a4a5cc17fc20d4f7665e7c00ff7f1bde2bf864f4fb6517e

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "scaling": 1
  },
  "name": "Bad Range",
  "yield": {
    "amount": 1,
    "unit": "tray"
  },
  "time": {
    "total": {
      "minutes": 15
    }
  },
  "ingredients": [
    {
      "id": "sugar",
      "name": "Sugar",
      "quantity": {
        "amount": 100,
        "unit": "g"
      }
    }
  ],
  "instructions": [
    "stir"
  ],
  "scaling": {
    "discrete": {
      "min": 5,
      "max": 2
    }
  }
}

```

### FILE: `fixtures/scaling/missing-quantified.invalid.json`

* bytes: 634
* sha256: aebe8cbeeef05fa4b5f67fa1f0ab83bcbe5c9e9a986adc6ff8d7c9b4f103668e

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "scaling": 1
  },
  "name": "Incomplete Scaling",
  "yield": {
    "amount": 2,
    "unit": "loaves"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    {
      "id": "starter",
      "name": "Starter",
      "quantity": {
        "amount": 150,
        "unit": "g"
      },
      "scaling": {
        "mode": "bakersPercent",
        "percent": 30,
        "of": "flour"
      }
    }
  ],
  "instructions": [
    "mix"
  ],
  "scaling": {
    "discrete": {
      "min": 1,
      "max": 3
    }
  }
}

```

### FILE: `fixtures/scaling/reject-bakersPercentage.invalid.json`

* bytes: 801
* sha256: 79dd5e7e45859b05181938b1b062724decbce1b91c5f913633025c202a9aef5d

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "scaling": 1
  },
  "name": "Reject Legacy Bakers Percentage",
  "yield": {
    "amount": 1,
    "unit": "loaf"
  },
  "time": {
    "total": {
      "minutes": 45
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Bread flour",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    },
    {
      "id": "water",
      "name": "Water",
      "quantity": {
        "amount": 325,
        "unit": "g"
      },
      "bakersPercentage": {
        "of": "flour",
        "percent": 65
      }
    }
  ],
  "instructions": [
    "mix",
    "bake"
  ],
  "scaling": {
    "discrete": {
      "min": 1,
      "max": 4,
      "step": 1
    }
  }
}

```

### FILE: `fixtures/stacks/compute-missing-timed.invalid.json`

* bytes: 488
* sha256: 61adb84e5ac227d0b2810dfe94771465be0124163e034dffeec3bc46b163464f

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "compute": 1
  },
  "name": "Compute Without Timed",
  "yield": {
    "amount": 1,
    "unit": "dish"
  },
  "time": {
    "total": {
      "minutes": 10
    }
  },
  "ingredients": [
    {
      "id": "i1",
      "name": "item",
      "quantity": {
        "amount": 1,
        "unit": "cup"
      }
    }
  ],
  "instructions": [
    {
      "text": "do"
    }
  ]
}

```

### FILE: `fixtures/stacks/dietary-no-signal.invalid.json`

* bytes: 265
* sha256: a21e74dfdb47a66a772263cec1f4010a40ca1c7e65a682550585b8e17c9c9a85

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "dietary": 1
  },
  "name": "Empty Nutrition",
  "ingredients": [
    "water"
  ],
  "instructions": [
    "drink"
  ],
  "dietary": {
    "basis": "perServing"
  }
}

```

### FILE: `fixtures/stacks/illustrated-empty.invalid.json`

* bytes: 215
* sha256: 97863daf07eb4f1f797a8d0fc6d6a4f554145e0e583b118fa2aaa5d669f96b8a

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "illustrated": 1
  },
  "name": "No Media",
  "ingredients": [
    "thing"
  ],
  "instructions": [
    "step"
  ]
}

```

### FILE: `fixtures/stacks/quantified-string.invalid.json`

* bytes: 333
* sha256: 520025e45a7b5fc373f2d9029ba4ab8e635b341decd2d926445791cf39755acc

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1
  },
  "name": "Bad Quant",
  "yield": {
    "amount": 1,
    "unit": "dish"
  },
  "time": {
    "total": {
      "minutes": 5
    }
  },
  "ingredients": [
    "1 cup mystery"
  ],
  "instructions": [
    "mix"
  ]
}

```

### FILE: `fixtures/stacks/referenced-missing-input.invalid.json`

* bytes: 473
* sha256: 1ea113eb7ab38d7f2cfc207b1adbb59d8c9ec4b225d956c84a61e877fa482659

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "structured": 1,
    "referenced": 1
  },
  "name": "Missing Input",
  "yield": {
    "amount": 1,
    "unit": "dish"
  },
  "time": {
    "total": {
      "minutes": 20
    }
  },
  "ingredients": [
    {
      "id": "i1",
      "name": "Thing"
    }
  ],
  "instructions": [
    {
      "id": "s1",
      "text": "Do it",
      "inputs": [
        "i2"
      ]
    }
  ]
}

```

### FILE: `fixtures/stacks/storage-min.valid.json`

* bytes: 329
* sha256: dab8047281427b562afeec357915889ce00c87ecde28f1b7d6f6e5530263c7d0

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Leftover Soup",
  "ingredients": [
    "soup"
  ],
  "instructions": [
    "reheat when ready"
  ],
  "storage": {
    "refrigerated": {
      "duration": {
        "iso8601": "P3D"
      }
    }
  }
}

```

### FILE: `fixtures/stacks/storage-no-duration.invalid.json`

* bytes: 251
* sha256: 8f9a8d53cb533b3b8b186bc28e24d69577cf798c663096e2b1952a6b60bdf4a1

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Bad Storage",
  "ingredients": [
    "food"
  ],
  "instructions": [
    "store"
  ],
  "storage": {
    "frozen": {}
  }
}

```

### FILE: `fixtures/stacks/timed-implies-structured.valid.json`

* bytes: 822
* sha256: 82ec06ba9d898d992490b79cb7ddc2edfaac5ee940095db5880c65407ece8adc

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "structured": 1,
    "timed": 1
  },
  "name": "Rested dough",
  "yield": {
    "amount": 2,
    "unit": "loaves"
  },
  "time": {
    "total": {
      "minutes": 180
    }
  },
  "ingredients": [
    {
      "id": "f",
      "name": "flour"
    },
    {
      "id": "w",
      "name": "water"
    }
  ],
  "instructions": [
    {
      "id": "mix",
      "text": "Mix flour and water",
      "timing": {
        "activity": "active",
        "duration": {
          "minutes": 10
        }
      }
    },
    {
      "id": "rest",
      "text": "Let the dough rest",
      "dependsOn": [
        "mix"
      ],
      "timing": {
        "activity": "passive",
        "completionCue": "doubled in size"
      }
    }
  ]
}

```

### FILE: `fixtures/stacks/timed-range.invalid.json`

* bytes: 531
* sha256: 2643e438ea00cc619f93d840e8362ffac10bde82818b66de58eab0ebb59fbad5

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "structured": 1,
    "timed": 1
  },
  "name": "Bad Range",
  "yield": {
    "amount": 2,
    "unit": "servings"
  },
  "time": {
    "total": {
      "minutes": 15
    }
  },
  "ingredients": [
    "water"
  ],
  "instructions": [
    {
      "id": "s1",
      "text": "Wait",
      "timing": {
        "activity": "passive",
        "duration": {
          "minMinutes": 10,
          "maxMinutes": 5
        }
      }
    }
  ]
}

```

### FILE: `fixtures/valid/equipment-scaling-rules.valid.json`

* bytes: 1202
* sha256: 566730146698d70c9ea0d3f1a5133b7a012268c23ff2ce287769913dbdc5fc26

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "equipment": 1
  },
  "name": "Recipe with Scaling-Aware Equipment",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    {
      "id": "pan",
      "name": "8-inch skillet",
      "count": 1,
      "countScaling": "fixed"
    },
    {
      "id": "bowl",
      "name": "Mixing bowl",
      "count": 2,
      "countScaling": "linear"
    },
    {
      "id": "sheet_pan",
      "name": "Baking sheet",
      "count": 1,
      "countScaling": {
        "mode": "threshold",
        "steps": [
          { "maxFactor": 1.0, "count": 1 },
          { "maxFactor": 2.0, "count": 2 },
          { "maxFactor": 4.0, "count": 3 }
        ]
      }
    },
    {
      "id": "skillet_small",
      "name": "8-inch skillet",
      "upgrades": [
        { "minFactor": 2.0, "use": "skillet_large" }
      ]
    },
    {
      "id": "skillet_large",
      "name": "12-inch skillet"
    }
  ],
  "ingredients": [
    {
      "id": "flour",
      "name": "Flour"
    }
  ],
  "instructions": [
    "Mix ingredients",
    "Bake"
  ]
}


```

### FILE: `fixtures/valid/equipment-strings.valid.json`

* bytes: 488
* sha256: 4492e63c7d462e2b1d7146e50c8bab599df6a1ec9606b20d0b5924afdfc7495d

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "equipment": 1
  },
  "name": "Simple Recipe with Equipment",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    "mixing bowl",
    "whisk",
    "oven"
  ],
  "ingredients": [
    {
      "id": "flour",
      "name": "Flour"
    }
  ],
  "instructions": [
    "Mix ingredients",
    "Bake in oven"
  ]
}


```

### FILE: `fixtures/valid/equipment-structured-uses.valid.json`

* bytes: 754
* sha256: f67e3fcfa88e55db4bdf222085ec26a35a6cfa381d7bded3ffceed313e4ed8d5

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "equipment": 1,
    "structured": 1
  },
  "name": "Recipe with Structured Equipment Usage",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    {
      "id": "skillet",
      "name": "8-inch skillet"
    },
    {
      "id": "spatula",
      "name": "Spatula"
    }
  ],
  "ingredients": [
    {
      "id": "meat",
      "name": "Meat"
    }
  ],
  "instructions": [
    {
      "id": "sear",
      "text": "Sear the meat in the skillet",
      "usesEquipment": ["skillet", "spatula"]
    },
    {
      "id": "rest",
      "text": "Let rest for 5 minutes"
    }
  ]
}


```

### FILE: `fixtures/valid/mise-en-place-basic.valid.json`

* bytes: 477
* sha256: 4174dffeb2b4c00c86480895ccbda7a2072b1fb8683b5dd14b2502d33a9a9256

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1
  },
  "name": "Recipe with Basic Mise En Place",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    "onion",
    "garlic"
  ],
  "instructions": [
    "Cook the ingredients"
  ],
  "miseEnPlace": [
    { "text": "Finely dice the onion" },
    { "text": "Mince the garlic" }
  ]
}


```

### FILE: `fixtures/valid/mise-en-place-referenced-equipment.valid.json`

* bytes: 767
* sha256: 8e3603d32e4241d113c5428649b7b40f3749c4fefd82465e7339648f290cf925

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1,
    "referenced": 1,
    "structured": 1,
    "equipment": 1
  },
  "name": "Recipe with Mise En Place References",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "equipment": [
    {
      "id": "knife",
      "name": "Chef's knife"
    }
  ],
  "ingredients": [
    {
      "id": "onion",
      "name": "Onion"
    }
  ],
  "instructions": [
    {
      "id": "cook",
      "text": "Cook the onion",
      "inputs": ["onion"]
    }
  ],
  "miseEnPlace": [
    {
      "text": "Dice the onion with a sharp knife",
      "inputs": ["onion"],
      "usesEquipment": ["knife"]
    }
  ]
}


```

### FILE: `fixtures/valid/prep-ingredient-strings.valid.json`

* bytes: 780
* sha256: 267f6cdc17eabf7ed8ea46c5d723599dde1b69d2a67ef63ba025b4b8a76aea95

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1,
    "quantified": 1
  },
  "name": "Recipe with Ingredient Prep Strings",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    {
      "id": "onion",
      "name": "Onion",
      "quantity": {
        "amount": 1,
        "unit": "medium"
      },
      "prep": "finely diced"
    },
    {
      "id": "garlic",
      "name": "Garlic",
      "quantity": {
        "amount": 2,
        "unit": "cloves"
      },
      "prep": ["peeled", "minced"]
    }
  ],
  "instructions": [
    "Cook the ingredients"
  ],
  "miseEnPlace": [
    { "text": "Prepare ingredients as specified" }
  ]
}


```

### FILE: `fixtures/valid/prep-ingredient-structured.valid.json`

* bytes: 720
* sha256: 65fbf02438e9c776a5e9071fa876f977104b286fc1786d1214262770b23c117f

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "prep": 1,
    "quantified": 1
  },
  "name": "Recipe with Structured Prep Items",
  "yield": {
    "amount": 1,
    "unit": "serving"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    {
      "id": "tomato",
      "name": "Tomato",
      "quantity": {
        "amount": 2,
        "unit": "medium"
      },
      "prep": [
        { "verb": "dice", "detail": "fine" },
        { "verb": "reserve", "detail": "half for garnish" }
      ]
    }
  ],
  "instructions": [
    "Use the prepared ingredients"
  ],
  "miseEnPlace": [
    { "text": "Prepare ingredients as specified" }
  ]
}


```

### FILE: `fixtures/valid/profile-equipped.valid.json`

* bytes: 371
* sha256: 374e31ee928d814ebafbcd1deaf7ddf67541d48fe90dfcf9a20454edf55dc2b8

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "profile": "equipped",
  "stacks": {
    "equipment": 1
  },
  "name": "Simple Recipe with Equipment",
  "equipment": [
    "mixing bowl",
    "whisk"
  ],
  "ingredients": [
    "flour",
    "eggs"
  ],
  "instructions": [
    "Mix ingredients in a bowl",
    "Whisk until smooth"
  ]
}


```

### FILE: `fixtures/valid/profile-prepped.valid.json`

* bytes: 377
* sha256: dc23a4b8a45f3680cca79d33a2c2a0d3535a73e486221b68ead0cbd67a3430f7

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "profile": "prepped",
  "stacks": {
    "prep": 1
  },
  "name": "Prepped Profile Recipe",
  "ingredients": [
    "onion",
    "garlic"
  ],
  "instructions": [
    "Cook the ingredients"
  ],
  "miseEnPlace": [
    { "text": "Finely dice the onion" },
    { "text": "Mince the garlic" }
  ]
}


```

### FILE: `fixtures/valid/quantified-nested-ingredient-sections.valid.json`

* bytes: 1180
* sha256: 5836ae5113905e96542b6be01e12ba0418e9b92d15f522f1bdc7a60cf8384a80

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1
  },
  "name": "Nested Ingredient Sections",
  "yield": {
    "amount": 1,
    "unit": "batch"
  },
  "time": {
    "total": {
      "minutes": 30
    }
  },
  "ingredients": [
    {
      "section": "Dough",
      "ingredients": [
        {
          "section": "Dry",
          "ingredients": [
            {
              "id": "flour",
              "name": "Flour",
              "quantity": {
                "amount": 500,
                "unit": "g"
              }
            },
            {
              "id": "salt",
              "name": "Salt",
              "quantity": {
                "amount": 10,
                "unit": "g"
              }
            }
          ]
        },
        {
          "section": "Wet",
          "ingredients": [
            {
              "id": "water",
              "name": "Water",
              "quantity": {
                "amount": 300,
                "unit": "ml"
              }
            }
          ]
        }
      ]
    }
  ],
  "instructions": [
    "Mix ingredients",
    "Knead dough"
  ]
}


```

### FILE: `fixtures/valid/referenced-scaling.valid.json`

* bytes: 1041
* sha256: ff210a8e115acd3db12d1662217f462f7d571e9019198dd51159975fbc947664

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "quantified": 1,
    "scaling": 1,
    "structured": 1,
    "referenced": 1
  },
  "name": "Referenced with Scaling",
  "yield": {
    "amount": 1,
    "unit": "loaf"
  },
  "time": {
    "total": {
      "minutes": 60
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Bread flour",
      "quantity": {
        "amount": 500,
        "unit": "g"
      }
    },
    {
      "id": "water",
      "name": "Water",
      "quantity": {
        "amount": 325,
        "unit": "g"
      },
      "scaling": {
        "mode": "bakersPercent",
        "percent": 65,
        "of": "flour"
      }
    }
  ],
  "instructions": [
    {
      "id": "mix",
      "text": "Mix flour and water",
      "inputs": ["flour", "water"]
    },
    {
      "id": "bake",
      "text": "Bake the bread",
      "inputs": ["flour", "water"]
    }
  ],
  "scaling": {
    "discrete": {
      "min": 1,
      "max": 4,
      "step": 1
    }
  }
}


```

### FILE: `fixtures/valid/storage-leftovers-simple.valid.json`

* bytes: 567
* sha256: c69b480e8b72c354314a51b23313efc935f9f68ad91b6701f8799198c5b0dbbc

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Soup with Simple Leftovers",
  "ingredients": [
    "soup"
  ],
  "instructions": [
    "Cook the soup"
  ],
  "storage": {
    "refrigerated": {
      "duration": {
        "iso8601": "P4D"
      }
    },
    "leftovers": {
      "notes": "Store in an airtight container.",
      "reheat": [
        "Microwave 2–3 minutes, stirring halfway.",
        "Or warm in a skillet over medium heat with a splash of water."
      ]
    }
  }
}


```

### FILE: `fixtures/valid/storage-leftovers-structured.valid.json`

* bytes: 888
* sha256: 8ee6536480c36db37b86bfa3691c1a818e29366cd2325b2befa1415d59e5e9a1

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "lite",
  "stacks": {
    "storage": 1
  },
  "name": "Casserole with Structured Reheating",
  "ingredients": [
    "casserole ingredients"
  ],
  "instructions": [
    "Prepare the casserole"
  ],
  "storage": {
    "frozen": {
      "duration": {
        "iso8601": "P2M"
      }
    },
    "leftovers": {
      "portioning": {
        "notes": "Cool completely, then portion into containers."
      },
      "reheat": [
        {
          "method": "microwave",
          "duration": {
            "minMinutes": 2,
            "maxMinutes": 3
          },
          "notes": "Stir halfway."
        },
        {
          "method": "oven",
          "temp": {
            "value": 350,
            "unit": "F"
          },
          "notes": "Cover and heat until hot throughout."
        }
      ]
    }
  }
}


```

### FILE: `fixtures/valid/structured-nested-step-sections.valid.json`

* bytes: 1721
* sha256: 9572c447e4ca553b22a0f41a557a94bc1b9e1f51f90893ba98cecb44e1f52421

```
{
  "$schema": "https://soustack.spec/soustack.schema.json",
  "level": "base",
  "stacks": {
    "structured": 1,
    "timed": 1
  },
  "name": "Nested Step Sections",
  "yield": {
    "amount": 1,
    "unit": "dish"
  },
  "time": {
    "total": {
      "minutes": 90
    }
  },
  "ingredients": [
    {
      "id": "flour",
      "name": "Flour"
    },
    {
      "id": "water",
      "name": "Water"
    }
  ],
  "instructions": [
    {
      "section": "Main",
      "steps": [
        {
          "section": "Prep",
          "steps": [
            {
              "id": "prep1",
              "text": "Prepare ingredients",
              "timing": {
                "activity": "active",
                "duration": {
                  "minutes": 10
                }
              }
            },
            {
              "id": "prep2",
              "text": "Measure everything",
              "timing": {
                "activity": "active",
                "duration": {
                  "minutes": 5
                }
              }
            }
          ]
        },
        {
          "section": "Cooking",
          "steps": [
            {
              "id": "cook1",
              "text": "Mix everything together",
              "timing": {
                "activity": "active",
                "duration": {
                  "minutes": 15
                }
              }
            },
            {
              "id": "cook2",
              "text": "Cook until done",
              "timing": {
                "activity": "active",
                "duration": {
                  "minutes": 30
                }
              }
            }
          ]
        }
      ]
    }
  ]
}


```

### FILE: `package.json`

* bytes: 956
* sha256: a2c66626b9b10f7f9206fa1793593feeb41ca3d8455cbc52255cd9c6d5f50bee

```
{
  "name": "soustack-spec",
  "version": "0.0.1",
  "type": "module",
  "private": true,
  "repository": {
    "type": "git",
    "url": "https://github.com/RichardHerold/soustack-spec.git"
  },
  "scripts": {
    "guard": "node scripts/guard-no-legacy.mjs",
    "check-refs": "node scripts/check-schema-refs.mjs",
    "validate": "node scripts/validate-fixtures.mjs",
    "verify:registry": "node scripts/validate-registry.mjs",
    "verify:stack-docs": "node scripts/verify-stack-docs.mjs",
    "build:schemas": "node scripts/generate-stack-gating.mjs",
    "docs:sync": "node scripts/generate-docs-from-registry.mjs",
    "verify:generated": "node scripts/verify-generated-clean.mjs",
    "verify": "npm run verify:registry && npm run verify:stack-docs && npm run check-refs && npm run guard && npm run validate && npm run verify:generated",
    "test": "npm run verify"
  },
  "dependencies": {
    "ajv": "^8.17.1",
    "ajv-formats": "^3.0.1"
  }
}

```

### FILE: `schemas/stacks-registry.schema.json`

* bytes: 3211
* sha256: 08c96b980e14bfdc6e8604ad3068c9770fcdcd4b995a0fcdac04ab0634462da9

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "../schemas/stacks-registry.schema.json",
  "title": "Soustack Stacks Registry Schema",
  "type": "object",
  "properties": {
    "$schema": { "type": "string" },
    "registryVersion": { "type": "integer", "minimum": 1 },
    "spec": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "currentSpecVersion": { "type": "string" },
        "canonicalStacksFormat": { "type": "string", "enum": ["map"] }
      },
      "required": ["name", "currentSpecVersion", "canonicalStacksFormat"],
      "additionalProperties": false
    },
    "profiles": {
      "type": "object",
      "propertyNames": {
        "type": "string",
        "pattern": "^[a-z][a-z0-9-]*$"
      },
      "additionalProperties": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "description": { "type": "string" },
          "requiresProfiles": {
            "type": "array",
            "items": { "type": "string" }
          },
          "requiresStacks": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "required": ["title", "description"],
        "anyOf": [
          { "required": ["requiresProfiles"] },
          { "required": ["requiresStacks"] }
        ],
        "additionalProperties": false
      }
    },
    "stacks": {
      "type": "object",
      "propertyNames": {
        "anyOf": [
          {
            "type": "string",
            "pattern": "^[a-z][a-z0-9-]*$"
          },
          {
            "type": "string",
            "pattern": "^x-[a-z0-9-]+(?:\\.[a-z0-9-]+)*$"
          }
        ]
      },
      "additionalProperties": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "latestMajor": { "type": "integer", "minimum": 1 },
          "profile": { "type": "string" },
          "requires": {
            "type": "array",
            "items": { "type": "string" }
          },
          "schema": {
            "type": "object",
            "properties": {
              "major": {
                "type": "object",
                "propertyNames": {
                  "type": "string",
                  "pattern": "^[0-9]+$"
                },
                "additionalProperties": { "type": "string" }
              }
            },
            "required": ["major"],
            "additionalProperties": false
          },
          "docs": {
            "type": "object",
            "properties": {
              "major": {
                "type": "object",
                "propertyNames": {
                  "type": "string",
                  "pattern": "^[0-9]+$"
                },
                "additionalProperties": { "type": "string" }
              }
            },
            "required": ["major"],
            "additionalProperties": false
          }
        },
        "required": ["title", "latestMajor", "profile", "requires", "schema"],
        "additionalProperties": false
      }
    }
  },
  "required": ["registryVersion", "spec", "profiles", "stacks"],
  "additionalProperties": false
}


```

### FILE: `scripts/check-schema-refs.mjs`

* bytes: 1712
* sha256: 8f1474efc25a33ad343c2201a5ed4370f105244950a16d9448cf7ff089b8dc87

```
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

```

### FILE: `scripts/dump-repo-for-ai.mjs`

* bytes: 11673
* sha256: ce1e803598becb338f9e7799fe537a9768a3bbeb6f92e30016a6a192c1db3e38

```
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


```

### FILE: `scripts/generate-docs-from-registry.mjs`

* bytes: 3984
* sha256: 4b4e2eba131865088e315d2cefc0bfe184e3c8edc4f2d440f4b29ab6e7c5eaa9

```
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


```

### FILE: `scripts/generate-stack-gating.mjs`

* bytes: 16404
* sha256: 03013b014594a296e379fd12b0b23973253690d20550b96150e07e153bb0fcbc

```
#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

/**
 * Recursively rewrite $ref values to make them absolute
 * When we inline a property from another schema, all $ref values need to be absolute:
 * - #/$defs/... references become schemaId#/$defs/...
 * - Relative path references like ../defs/... need to be resolved relative to schemaId
 */
function rewriteRefs(obj, schemaId, schemaBasePath) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => rewriteRefs(item, schemaId, schemaBasePath));
  }
  
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$ref' && typeof value === 'string') {
      // If it's a relative $defs reference, make it absolute
      if (value.startsWith('#/$defs/') || value.startsWith('#/')) {
        result[key] = `${schemaId}${value}`;
      } else if (value.startsWith('../') || value.startsWith('./')) {
        // Relative path reference - resolve it relative to the schema's base path
        // schemaBasePath is like "stacks/scaling.schema.json"
        // value might be "../defs/quantity.schema.json"
        // We need to resolve this to an absolute URI
        let finalPath;
        if (value.startsWith('../')) {
          // Go up one level from schema dir
          // schemaBasePath = "stacks/scaling.schema.json"
          // schemaDir = "stacks"
          // parentDir = "" (empty, we're at root)
          // value = "../defs/quantity.schema.json"
          // finalPath should be "defs/quantity.schema.json"
          const schemaDir = schemaBasePath.substring(0, schemaBasePath.lastIndexOf('/'));
          if (schemaDir) {
            const parentDir = schemaDir.substring(0, schemaDir.lastIndexOf('/'));
            finalPath = parentDir ? `${parentDir}/${value.substring(3)}` : value.substring(3);
          } else {
            finalPath = value.substring(3);
          }
        } else if (value.startsWith('./')) {
          // Same directory as schema
          const schemaDir = schemaBasePath.substring(0, schemaBasePath.lastIndexOf('/'));
          finalPath = schemaDir ? `${schemaDir}/${value.substring(2)}` : value.substring(2);
        } else {
          finalPath = value;
        }
        // Convert to absolute URI, ensuring no double slashes
        const normalized = finalPath.replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/+/g, '/');
        result[key] = `https://soustack.spec/${normalized}`;
      } else if (!value.includes('://') && !value.startsWith('#')) {
        // Relative path without ./ or ../ - assume it's relative to defs or stacks
        // This shouldn't happen in our schemas, but handle it
        result[key] = `https://soustack.spec/${value}`;
      } else {
        // Already absolute or external reference
        result[key] = value;
      }
    } else {
      result[key] = rewriteRefs(value, schemaId, schemaBasePath);
    }
  }
  
  return result;
}

/**
 * Load a stack schema and extract its properties and required fields
 * 
 * When inlining a property from another schema, we need to:
 * 1. Inline the property definition
 * 2. Rewrite all $refs to be absolute (including #/$defs/ and relative paths)
 * 3. Also inline any $defs that the property depends on, since they contain
 *    relative path references that won't resolve when the property is used
 *    in a different schema context
 */
async function loadStackSchema(schemaPath) {
  const fullPath = join(repoRoot, schemaPath);
  const schema = JSON.parse(await readFile(fullPath, 'utf8'));
  
  const properties = schema.properties || {};
  const required = schema.required || [];
  
  // Use the schema's $id if available, otherwise construct from path
  const schemaId = schema.$id || `https://soustack.spec/${schemaPath.replace(/\\/g, '/')}`;
  
  // Collect all $defs names used in the properties
  const defsUsed = new Set();
  function collectDefRefs(obj) {
    if (typeof obj !== 'object' || obj === null) return;
    if (Array.isArray(obj)) {
      obj.forEach(collectDefRefs);
      return;
    }
    for (const [key, value] of Object.entries(obj)) {
      if (key === '$ref' && typeof value === 'string' && value.startsWith('#/$defs/')) {
        defsUsed.add(value.substring(8)); // Remove '#/$defs/' prefix
      } else {
        collectDefRefs(value);
      }
    }
  }
  
  for (const prop of Object.values(properties)) {
    collectDefRefs(prop);
  }
  
  // Build property refs: inline the property definition and rewrite all $refs
  const propertyRefs = {};
  for (const propName of Object.keys(properties)) {
    // Inline the property definition and rewrite all $refs to be absolute
    const propertyDef = JSON.parse(JSON.stringify(properties[propName]));
    propertyRefs[propName] = rewriteRefs(propertyDef, schemaId, schemaPath);
  }
  
  // Also collect and inline the $defs we need, with their $refs rewritten
  const inlinedDefs = {};
  if (schema.$defs) {
    for (const defName of defsUsed) {
      if (schema.$defs[defName]) {
        const defCopy = JSON.parse(JSON.stringify(schema.$defs[defName]));
        inlinedDefs[defName] = rewriteRefs(defCopy, schemaId, schemaPath);
      }
    }
  }
  
  return {
    properties: propertyRefs,
    required: required,
    defs: inlinedDefs
  };
}

/**
 * Build condition for stack presence with a specific major version
 */
function buildStackMajorCondition(stackId, major) {
  return {
    required: ['stacks'],
    properties: {
      stacks: {
        required: [stackId],
        properties: {
          [stackId]: { const: major }
        }
      }
    }
  };
}

/**
 * Build condition for stack presence (any supported major)
 */
function buildStackPresenceCondition(stackId, supportedMajors) {
  return {
    required: ['stacks'],
    properties: {
      stacks: {
        required: [stackId],
        properties: {
          [stackId]: {
            type: 'integer',
            enum: supportedMajors
          }
        }
      }
    }
  };
}

/**
 * Generate gating rules for a single stack
 * Returns an object with allOf containing:
 * - Unsupported major rejection rule
 * - Per-major if/then rules (with prerequisites in then)
 */
async function generateStackGatingRule(stackId, stack, registry, allDefs) {
  const supportedMajors = Object.keys(stack.schema.major)
    .map(m => parseInt(m, 10))
    .sort((a, b) => a - b);
  
  const requires = stack.requires || [];
  
  // A2: Generate unsupported major rejection rule
  // This rule rejects unsupported majors when the stack is present
  const unsupportedMajorRule = {
    if: {
      required: ['stacks'],
      properties: {
        stacks: {
          required: [stackId]
        }
      }
    },
    then: {
      properties: {
        stacks: {
          properties: {
            [stackId]: {
              enum: supportedMajors
            }
          }
        }
      }
    }
  };
  
  // A1: Build prerequisite conditions for each prerequisite stack
  // Each prerequisite must exist AND be a supported major
  const prerequisiteConditions = [];
  for (const reqStackId of requires) {
    const reqStack = registry.stacks[reqStackId];
    if (!reqStack) {
      throw new Error(`Stack "${stackId}" requires missing stack: "${reqStackId}"`);
    }
    const reqSupportedMajors = Object.keys(reqStack.schema.major)
      .map(m => parseInt(m, 10))
      .sort((a, b) => a - b);
    prerequisiteConditions.push({
      properties: {
        stacks: {
          required: [reqStackId],
          properties: {
            [reqStackId]: {
              enum: reqSupportedMajors
            }
          }
        }
      }
    });
  }
  
  // Generate per-major if/then rules
  const majorRules = [];
  for (const major of supportedMajors) {
    const schemaPath = stack.schema.major[String(major)];
    const schemaInfo = await loadStackSchema(schemaPath);
    
    // Merge $defs into the global collection (with namespacing to avoid conflicts)
    if (schemaInfo.defs) {
      // First pass: collect all def names and create namespace mapping
      const defNameMap = new Map();
      for (const defName of Object.keys(schemaInfo.defs)) {
        const namespacedName = `${stackId}@${major}_${defName}`;
        defNameMap.set(defName, namespacedName);
        allDefs[namespacedName] = schemaInfo.defs[defName];
      }
      
      // Second pass: update $refs in properties to point to namespaced $defs
      function updateDefRefs(obj) {
        if (typeof obj !== 'object' || obj === null) return obj;
        if (Array.isArray(obj)) {
          return obj.map(updateDefRefs);
        }
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
          if (key === '$ref' && typeof value === 'string') {
            // If it references one of our $defs, update to namespaced version
            const defMatch = value.match(/^https:\/\/soustack\.spec\/stacks\/[^#]+#\/\$defs\/(.+)$/);
            if (defMatch && defNameMap.has(defMatch[1])) {
              result[key] = `#/$defs/${defNameMap.get(defMatch[1])}`;
            } else {
              result[key] = value;
            }
          } else {
            result[key] = updateDefRefs(value);
          }
        }
        return result;
      }
      
      // Update all properties
      for (const propName of Object.keys(schemaInfo.properties)) {
        schemaInfo.properties[propName] = updateDefRefs(schemaInfo.properties[propName]);
      }
    }
    
    // A1: Build if condition: stack present with this specific major (no prerequisites in if)
    const ifCondition = buildStackMajorCondition(stackId, major);
    
    // A1: Build then clause: allOf with prerequisites + schema properties
    const thenClauseAllOf = [];
    
    // Add prerequisite conditions to then
    thenClauseAllOf.push(...prerequisiteConditions);
    
    // Add schema properties and required fields
    const schemaClause = {};
    if (Object.keys(schemaInfo.properties).length > 0) {
      schemaClause.properties = schemaInfo.properties;
    }
    if (schemaInfo.required.length > 0) {
      schemaClause.required = schemaInfo.required;
    }
    if (Object.keys(schemaClause).length > 0) {
      thenClauseAllOf.push(schemaClause);
    }
    
    // Build then clause
    const thenClause = thenClauseAllOf.length === 1
      ? thenClauseAllOf[0]
      : { allOf: thenClauseAllOf };
    
    majorRules.push({
      if: ifCondition,
      then: thenClause
    });
  }
  
  // A3: Return allOf with unsupported major rule + per-major rules (no oneOf)
  return {
    allOf: [
      unsupportedMajorRule,
      ...majorRules
    ]
  };
}

/**
 * Generate all stack gating rules and collect $defs to merge
 */
async function generateStackGating(registry) {
  const gatingRules = [];
  const allDefs = {}; // Collect all $defs from stack schemas
  
  // Get official stacks (exclude vendor stacks starting with x-)
  const officialStacks = Object.keys(registry.stacks)
    .filter(id => !id.startsWith('x-'))
    .sort(); // Deterministic ordering
  
  // Generate rules for each official stack
  for (const stackId of officialStacks) {
    const stack = registry.stacks[stackId];
    const rule = await generateStackGatingRule(stackId, stack, registry, allDefs);
    gatingRules.push(rule);
  }
  
  return { rules: gatingRules, defs: allDefs };
}

/**
 * Recursively collect all required stacks for a given profile
 */
function collectRequiredStacks(profileId, registry, visited = new Set()) {
  if (visited.has(profileId)) {
    return new Set(); // Cycle detected, return empty to avoid infinite recursion
  }
  visited.add(profileId);
  
  const profile = registry.profiles[profileId];
  if (!profile) {
    return new Set();
  }
  
  const allRequiredStacks = new Set();
  
  // Add direct required stacks
  const requiresStacks = profile.requiresStacks || [];
  for (const stackId of requiresStacks) {
    allRequiredStacks.add(stackId);
  }
  
  // Recursively collect stacks from required profiles
  const requiresProfiles = profile.requiresProfiles || [];
  for (const reqProfileId of requiresProfiles) {
    const reqStacks = collectRequiredStacks(reqProfileId, registry, new Set(visited));
    for (const stackId of reqStacks) {
      allRequiredStacks.add(stackId);
    }
  }
  
  return allRequiredStacks;
}

/**
 * Generate profile validation rules
 */
function generateProfileValidation(registry) {
  const profileRules = [];
  
  // Get all profiles sorted for deterministic output
  const profileIds = Object.keys(registry.profiles).sort();
  
  for (const profileId of profileIds) {
    // Collect all required stacks recursively (from this profile and all prerequisite profiles)
    const allRequiredStacks = collectRequiredStacks(profileId, registry);
    const requiresStacks = Array.from(allRequiredStacks).sort();
    
    // Only generate rule if there are required stacks
    if (requiresStacks.length > 0) {
      const thenClause = {
        required: ['stacks'],
        properties: {
          stacks: {
            required: requiresStacks,
            properties: {}
          }
        }
      };
      
      // For each required stack, require it to be present with a supported major
      for (const stackId of requiresStacks) {
        const stack = registry.stacks[stackId];
        if (!stack) {
          throw new Error(`Profile "${profileId}" requires stack "${stackId}" which is not in registry`);
        }
        const supportedMajors = Object.keys(stack.schema.major)
          .map(m => parseInt(m, 10))
          .sort((a, b) => a - b);
        thenClause.properties.stacks.properties[stackId] = {
          type: 'integer',
          enum: supportedMajors
        };
      }
      
      profileRules.push({
        if: {
          required: ['profile'],
          properties: {
            profile: { const: profileId }
          }
        },
        then: thenClause
      });
    }
  }
  
  return profileRules;
}

/**
 * Update the profile property enum in the schema to match registry
 * Option 2: Allow vendor profiles (x-*) since vendor stacks are supported
 */
function updateProfileEnum(schema, registry) {
  const profileIds = Object.keys(registry.profiles).sort();
  
  // Option 2: Allow official profiles + vendor profiles
  schema.properties.profile = {
    type: 'string',
    anyOf: [
      { enum: profileIds },
      { pattern: '^x-[a-z0-9-]+(?:\\.[a-z0-9-]+)*$' }
    ]
  };
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const schemaPath = join(repoRoot, 'soustack.schema.json');

  const registry = JSON.parse(await readFile(registryPath, 'utf8'));
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'));

  // Update profile enum from registry
  updateProfileEnum(schema, registry);

  // Generate gating rules and collect $defs
  const { rules: gatingRules, defs: stackDefs } = await generateStackGating(registry);
  const profileRules = generateProfileValidation(registry);

  // Merge $defs from stack schemas into main schema
  if (!schema.$defs) {
    schema.$defs = {};
  }
  Object.assign(schema.$defs, stackDefs);

  // Find the placeholder in allOf
  const allOf = schema.allOf;
  let beginIdx = -1;
  let endIdx = -1;

  for (let i = 0; i < allOf.length; i++) {
    if (allOf[i].$comment === 'BEGIN GENERATED STACK GATING') {
      beginIdx = i;
    }
    if (allOf[i].$comment === 'END GENERATED STACK GATING') {
      endIdx = i;
    }
  }

  if (beginIdx === -1 || endIdx === -1) {
    throw new Error('Could not find stack gating markers in schema');
  }

  // Replace content between markers (profile validation before stack gating)
  const newAllOf = [
    ...allOf.slice(0, beginIdx + 1),
    ...profileRules,
    ...gatingRules,
    ...allOf.slice(endIdx)
  ];

  schema.allOf = newAllOf;

  // Write back
  await writeFile(schemaPath, JSON.stringify(schema, null, 2) + '\n', 'utf8');
  console.log(`Generated ${gatingRules.length} stack gating rules and ${profileRules.length} profile validation rules in soustack.schema.json`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

```

### FILE: `scripts/guard-no-legacy.mjs`

* bytes: 762
* sha256: d49e2fac9bc883aec61c99fa3689b11f134c64666a22d6ae2a8cce7c8aae1ce8

```
#!/usr/bin/env node
import { stat } from 'node:fs/promises';
import { join } from 'node:path';

const forbiddenPaths = [
  'profiles',
  'schemas/recipe',
  'schemas/registry'
];

async function pathExists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  let violations = [];

  for (const rel of forbiddenPaths) {
    const exists = await pathExists(join(process.cwd(), rel));
    if (exists) {
      violations.push(`forbidden path present: ${rel}`);
    }
  }

  if (violations.length) {
    console.error('Legacy guard failed:');
    for (const v of violations) console.error(` - ${v}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

```

### FILE: `scripts/migrate-stacks-to-map.mjs`

* bytes: 1859
* sha256: 5b9aaac4ba0eedaea4fcaddd60fd93ef9bbffe4d858baca1cd6890ae287e9900

```
#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

async function walk(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (extname(full) === '.json') {
      files.push(full);
    }
  }
  return files;
}

function migrateStacks(data) {
  if (!data.stacks || !Array.isArray(data.stacks)) {
    return data; // Already map or missing
  }
  
  const map = {};
  for (const entry of data.stacks) {
    if (typeof entry !== 'string') {
      throw new Error(`Invalid stack entry: ${entry} (must be string)`);
    }
    const match = entry.match(/^([^@]+)@(\d+)$/);
    if (!match) {
      throw new Error(`Invalid stack format: ${entry} (must be name@major)`);
    }
    const [, name, major] = match;
    map[name] = parseInt(major, 10);
  }
  
  return { ...data, stacks: map };
}

async function main() {
  const fixtureFiles = await walk(join(repoRoot, 'fixtures'));
  let migrated = 0;
  
  for (const file of fixtureFiles) {
    const raw = await readFile(file, 'utf8');
    const data = JSON.parse(raw);
    
    if (Array.isArray(data.stacks)) {
      const migratedData = migrateStacks(data);
      await writeFile(file, JSON.stringify(migratedData, null, 2) + '\n', 'utf8');
      console.log(`Migrated: ${file}`);
      migrated++;
    }
  }
  
  console.log(`\nMigrated ${migrated} fixture file(s) to stacks map format.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


```

### FILE: `scripts/validate-fixtures.mjs`

* bytes: 17250
* sha256: 88fb43759115debc5c6ea153f2ccefaddd790db9e3f00e9d8215eed3eedd7503

```
#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const ajv = new Ajv2020({ strict: false, allErrors: true, allowUnionTypes: true });
addFormats(ajv);

let registry = null;

async function loadRegistry() {
  if (!registry) {
    const registryPath = join(repoRoot, 'stacks', 'registry.json');
    registry = JSON.parse(await readFile(registryPath, 'utf8'));
  }
  return registry;
}

async function loadSchemas() {
  const schemaFiles = [];
  for (const dir of ['defs', 'stacks']) {
    const entries = await readdir(dir);
    for (const entry of entries) {
      if (entry.endsWith('.json') && entry !== 'registry.json') {
        schemaFiles.push(join(dir, entry));
      }
    }
  }
  schemaFiles.push('soustack.schema.json');

  for (const file of schemaFiles) {
    const json = JSON.parse(await readFile(file, 'utf8'));
    ajv.addSchema(json, json.$id || file);
  }
}

async function walk(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (extname(full) === '.json') {
      files.push(full);
    }
  }
  return files;
}

function normalizeStacksToMap(stacks) {
  // Convert array format to map format if needed
  if (Array.isArray(stacks)) {
    const map = {};
    for (const entry of stacks) {
      if (typeof entry === 'string') {
        const match = entry.match(/^([^@]+)@(\d+)$/);
        if (match) {
          const [, name, major] = match;
          map[name] = parseInt(major, 10);
        } else {
          throw new Error(`Invalid stack format: ${entry} (must be name@major)`);
        }
      }
    }
    return map;
  }
  if (typeof stacks === 'object' && stacks !== null) {
    return stacks;
  }
  return {};
}

function getStacksSet(stacksMap) {
  const set = new Set();
  for (const [name, major] of Object.entries(stacksMap)) {
    set.add(`${name}@${major}`);
  }
  return set;
}

/**
 * Check if a stack is present with any supported major version
 */
function hasStackVersion(stacksMap, stackId, registry) {
  if (!(stackId in stacksMap)) {
    return false;
  }
  const declaredMajor = stacksMap[stackId];
  const stack = registry.stacks[stackId];
  if (!stack) {
    return false;
  }
  const supportedMajors = Object.keys(stack.schema.major)
    .map(m => parseInt(m, 10));
  return supportedMajors.includes(declaredMajor);
}

function collectIngredients(ingredients = []) {
  const list = [];
  for (const item of ingredients) {
    if (item && typeof item === 'object' && Array.isArray(item.ingredients)) {
      list.push(...collectIngredients(item.ingredients));
    } else if (item && typeof item === 'object') {
      list.push(item);
    }
  }
  return list;
}

function collectSteps(instructions = []) {
  const steps = [];
  for (const entry of instructions) {
    if (entry && typeof entry === 'object' && Array.isArray(entry.steps)) {
      steps.push(...collectSteps(entry.steps));
    } else if (entry && typeof entry === 'object') {
      steps.push(entry);
    }
  }
  return steps;
}

function validateTemperatureRange(temp, context) {
  if (!temp || typeof temp !== 'object') return null;
  if ('minValue' in temp && 'maxValue' in temp) {
    if (!(temp.minValue <= temp.maxValue)) {
      return `${context} temperature minValue must be <= maxValue`;
    }
  }
  return null;
}

function uniqueCheck(items, key, label) {
  const seen = new Set();
  for (const item of items) {
    if (!item[key]) continue;
    if (seen.has(item[key])) {
      return `${label} id duplicated: ${item[key]}`;
    }
    seen.add(item[key]);
  }
  return null;
}

function validateDAG(steps) {
  const graph = new Map();
  for (const step of steps) {
    graph.set(step.id, new Set(step.dependsOn || []));
  }
  for (const [id, deps] of graph.entries()) {
    for (const dep of deps) {
      if (!graph.has(dep)) {
        return `dependsOn references missing step: ${dep}`;
      }
    }
  }
  const visited = new Set();
  const stack = new Set();
  function dfs(node) {
    if (stack.has(node)) return `cycle detected at ${node}`;
    if (visited.has(node)) return null;
    stack.add(node);
    const deps = graph.get(node) || new Set();
    for (const dep of deps) {
      const res = dfs(dep);
      if (res) return res;
    }
    stack.delete(node);
    visited.add(node);
    return null;
  }
  for (const node of graph.keys()) {
    const res = dfs(node);
    if (res) return res;
  }
  return null;
}

function checkConformance(data, file, reg) {
  const errors = [];
  
  // Normalize stacks to map format
  let stacksMap;
  let warnedArray = false;
  if (Array.isArray(data.stacks)) {
    warnedArray = true;
    stacksMap = normalizeStacksToMap(data.stacks);
  } else {
    stacksMap = normalizeStacksToMap(data.stacks || {});
  }
  
  // Validate stacks against registry
  const officialStacks = Object.keys(reg.stacks).filter(id => !id.startsWith('x-'));
  for (const [stackId, major] of Object.entries(stacksMap)) {
    if (stackId.startsWith('x-')) {
      // Vendor stacks are allowed
      continue;
    }
    if (!officialStacks.includes(stackId)) {
      errors.push(`Unknown official stack: ${stackId}`);
      continue;
    }
    const stack = reg.stacks[stackId];
    // Check if declared major is in supported majors
    const supportedMajors = Object.keys(stack.schema.major)
      .map(m => parseInt(m, 10));
    if (!supportedMajors.includes(major)) {
      errors.push(`Stack "${stackId}" major ${major} not supported (supported: ${supportedMajors.join(', ')})`);
    }
    // Check prerequisites - prereq must exist AND be a supported major
    for (const req of stack.requires) {
      if (!hasStackVersion(stacksMap, req, reg)) {
        const reqStack = reg.stacks[req];
        if (!reqStack) {
          errors.push(`Stack "${stackId}" requires missing stack: "${req}"`);
        } else {
          const reqSupportedMajors = Object.keys(reqStack.schema.major)
            .map(m => parseInt(m, 10));
          errors.push(`Stack "${stackId}" requires "${req}" with a supported major (${reqSupportedMajors.join(', ')}) but it is not present`);
        }
      }
    }
  }
  
  if (warnedArray) {
    console.warn(`Warning: ${file} uses array stacks format. Should migrate to map format.`);
  }
  
  const stacks = getStacksSet(stacksMap);
  const ingredients = collectIngredients(data.ingredients);
  const steps = collectSteps(data.instructions);

  for (const ingredient of ingredients) {
    const issue = validateTemperatureRange(ingredient.temperature, 'ingredient');
    if (issue) errors.push(issue);
  }
  for (const step of steps) {
    const issue = validateTemperatureRange(step.temperature, `step ${step.id || ''}`.trim());
    if (issue) errors.push(issue);
  }

  if (ingredients.length) {
    const dup = uniqueCheck(ingredients, 'id', 'ingredient');
    if (dup) errors.push(dup);
  }
  if (steps.length) {
    const dup = uniqueCheck(steps, 'id', 'step');
    if (dup) errors.push(dup);
  }

  if (hasStackVersion(stacksMap, 'structured', reg) || hasStackVersion(stacksMap, 'timed', reg) || hasStackVersion(stacksMap, 'referenced', reg)) {
    const dagIssue = validateDAG(steps);
    if (dagIssue) errors.push(dagIssue);
  }

  if (hasStackVersion(stacksMap, 'referenced', reg)) {
    const ids = new Set(ingredients.map((i) => i.id));
    for (const step of steps) {
      if (!Array.isArray(step.inputs) || step.inputs.length === 0) {
        errors.push('referenced step missing inputs');
        continue;
      }
      for (const input of step.inputs) {
        if (!ids.has(input)) errors.push(`referenced input missing ingredient id: ${input}`);
      }
    }
  }

  if (hasStackVersion(stacksMap, 'timed', reg)) {
    for (const step of steps) {
      const duration = step?.timing?.duration;
      if (duration && typeof duration === 'object' && 'minMinutes' in duration && 'maxMinutes' in duration) {
        if (!(duration.minMinutes <= duration.maxMinutes)) {
          errors.push('timed duration minMinutes must be <= maxMinutes');
        }
      }
    }
  }

  if (hasStackVersion(stacksMap, 'compute', reg)) {
    if (data.level !== 'base' || !hasStackVersion(stacksMap, 'quantified', reg) || !hasStackVersion(stacksMap, 'timed', reg)) {
      errors.push('compute stack requires base level with quantified and timed stacks');
    }
  }

  if (hasStackVersion(stacksMap, 'scaling', reg)) {
    const ingredientIds = new Set(ingredients.map((i) => i.id));
    for (const ingredient of ingredients) {
      const scaling = ingredient?.scaling;
      if (scaling && scaling.mode === 'bakersPercent') {
        if (!scaling.percent || scaling.percent <= 0) {
          errors.push('bakersPercent scaling requires percent > 0');
        }
        if (!scaling.of || !ingredientIds.has(scaling.of)) {
          errors.push(`bakersPercent of references missing ingredient id: ${scaling.of || ''}`.trim());
        }
      }
    }

    const discrete = data.scaling?.discrete;
    if (discrete && typeof discrete === 'object') {
      if (discrete.min > discrete.max) {
        errors.push('scaling discrete min must be <= max');
      }
    }
  }

  if (hasStackVersion(stacksMap, 'illustrated', reg)) {
    const stepHasMedia = steps.some((s) => (Array.isArray(s.images) && s.images.length > 0) || (Array.isArray(s.videos) && s.videos.length > 0));
    const recipeHasMedia = (Array.isArray(data.images) && data.images.length > 0) ||
      (Array.isArray(data.videos) && data.videos.length > 0);
    if (!stepHasMedia && !recipeHasMedia) {
      errors.push('illustrated stack requires at least one media URI');
    }
  }

  if (hasStackVersion(stacksMap, 'dietary', reg)) {
    if (!data.dietary) {
      errors.push('dietary block missing');
    } else {
      const { calories, macros, diets, allergens } = data.dietary;
      const hasSignal = (calories !== undefined) ||
        (macros && Object.keys(macros).length > 0) ||
        (Array.isArray(diets) && diets.length > 0) ||
        (Array.isArray(allergens) && allergens.length > 0);
      if (!hasSignal) errors.push('dietary stack requires at least one signal');
    }
  }

  if (hasStackVersion(stacksMap, 'techniques', reg)) {
    const glossary = Array.isArray(data.techniques) ? data.techniques : [];
    const glossaryIds = new Set(glossary.map((t) => t.id));
    for (const step of steps) {
      for (const tech of step.techniqueIds || []) {
        if (!glossaryIds.has(tech)) errors.push(`technique reference missing: ${tech}`);
      }
    }
    if (glossary.length === 0) errors.push('techniques stack requires glossary');
  }

  if (hasStackVersion(stacksMap, 'storage', reg)) {
    const storage = data.storage || {};
    const methods = ['roomTemp', 'refrigerated', 'frozen'];
    const present = methods.filter((m) => storage[m]);
    if (present.length === 0) errors.push('storage stack requires at least one method');
    for (const method of present) {
      const duration = storage[method]?.duration?.iso8601;
      if (!duration || typeof duration !== 'string' || !duration.startsWith('P')) {
        errors.push(`storage method ${method} missing iso8601 duration`);
      }
    }
  }

  if (hasStackVersion(stacksMap, 'equipment', reg)) {
    const equipment = data.equipment || [];
    const equipmentIds = new Set();
    const equipmentObjects = [];
    
    // Collect equipment ids from structured objects
    for (const item of equipment) {
      if (item && typeof item === 'object' && item.id) {
        if (equipmentIds.has(item.id)) {
          errors.push(`equipment id duplicated: ${item.id}`);
        }
        equipmentIds.add(item.id);
        equipmentObjects.push(item);
      }
    }
    
    // Validate step equipment references when structured is present
    if (hasStackVersion(stacksMap, 'structured', reg)) {
      for (const step of steps) {
        if (Array.isArray(step.usesEquipment)) {
          for (const eqId of step.usesEquipment) {
            if (!equipmentIds.has(eqId)) {
              errors.push(`step usesEquipment references missing equipment id: ${eqId}`);
            }
          }
        }
      }
    }
    
    // Validate equipment scaling fields
    for (const item of equipmentObjects) {
      // Validate threshold countScaling
      if (item.countScaling && typeof item.countScaling === 'object' && item.countScaling.mode === 'threshold') {
        const steps = item.countScaling.steps || [];
        if (steps.length === 0) {
          errors.push(`equipment ${item.id} threshold countScaling requires non-empty steps array`);
        }
        for (const step of steps) {
          if (step.maxFactor <= 0) {
            errors.push(`equipment ${item.id} threshold step maxFactor must be > 0`);
          }
          if (step.count < 1) {
            errors.push(`equipment ${item.id} threshold step count must be >= 1`);
          }
        }
      }
      
      // Validate upgrades references
      if (Array.isArray(item.upgrades)) {
        for (const upgrade of item.upgrades) {
          if (upgrade.minFactor <= 0) {
            errors.push(`equipment ${item.id} upgrade minFactor must be > 0`);
          }
          if (!upgrade.use || !equipmentIds.has(upgrade.use)) {
            errors.push(`equipment ${item.id} upgrade references missing equipment id: ${upgrade.use || ''}`.trim());
          }
        }
      }
    }
  }

  if (hasStackVersion(stacksMap, 'prep', reg)) {
    const miseEnPlace = data.miseEnPlace || [];
    
    // Validate task id uniqueness (only if present)
    const taskIds = [];
    for (const task of miseEnPlace) {
      if (task.id) {
        if (taskIds.includes(task.id)) {
          errors.push(`miseEnPlace task id duplicated: ${task.id}`);
        }
        taskIds.push(task.id);
      }
    }
    
    // Validate inputs when referenced stack is present
    if (hasStackVersion(stacksMap, 'referenced', reg)) {
      const ingredientIds = new Set(ingredients.map((i) => i.id).filter(Boolean));
      for (const task of miseEnPlace) {
        if (Array.isArray(task.inputs)) {
          for (const inputId of task.inputs) {
            if (!ingredientIds.has(inputId)) {
              errors.push(`miseEnPlace task inputs references missing ingredient id: ${inputId}`);
            }
          }
        }
      }
    }
    
    // Validate usesEquipment when equipment stack is present
    if (hasStackVersion(stacksMap, 'equipment', reg)) {
      const equipment = data.equipment || [];
      const equipmentIds = new Set();
      
      // Collect equipment ids from structured objects only
      for (const item of equipment) {
        if (item && typeof item === 'object' && item.id) {
          equipmentIds.add(item.id);
        }
      }
      
      for (const task of miseEnPlace) {
        if (Array.isArray(task.usesEquipment)) {
          for (const eqId of task.usesEquipment) {
            if (!equipmentIds.has(eqId)) {
              errors.push(`miseEnPlace task usesEquipment references missing equipment id: ${eqId}`);
            }
          }
        }
      }
    }
  }

  return errors;
}

async function main() {
  await loadSchemas();
  const reg = await loadRegistry();
  const validate = ajv.getSchema('https://soustack.spec/soustack.schema.json');
  if (!validate) throw new Error('main schema not loaded');

  const fixtureFiles = await walk('fixtures');
  let failures = 0;

  for (const file of fixtureFiles) {
    const raw = await readFile(file, 'utf8');
    let data = JSON.parse(raw);
    const expectValid = file.includes('.valid.');
    const expectInvalid = file.includes('.invalid.');

    if (!expectValid && !expectInvalid) {
      console.warn(`Skipping fixture without expectation: ${file}`);
      continue;
    }

    // Normalize stacks to map for schema validation
    if (Array.isArray(data.stacks)) {
      data = { ...data, stacks: normalizeStacksToMap(data.stacks) };
    }

    const schemaOk = validate(data);
    const schemaErrors = schemaOk ? [] : validate.errors || [];
    const conformanceErrors = checkConformance(data, file, reg);
    const overallErrors = [...schemaErrors.map((e) => ajv.errorsText([e], { separator: '; ' })), ...conformanceErrors];
    const passed = schemaOk && conformanceErrors.length === 0;

    if (expectValid && !passed) {
      failures++;
      console.error(`Expected valid but failed: ${file}`);
      overallErrors.forEach((e) => console.error(` - ${e}`));
    }
    if (expectInvalid && passed) {
      failures++;
      console.error(`Expected invalid but passed: ${file}`);
    }
  }

  if (failures > 0) {
    console.error(`Conformance failed for ${failures} fixture(s).`);
    process.exit(1);
  } else {
    console.log('All fixtures conform to expectations.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

```

### FILE: `scripts/validate-registry.mjs`

* bytes: 5581
* sha256: 0a964bb03ae7aa7674675cbb31cebfac8f69b66bfd18fca1d64fde34b47ebab1

```
#!/usr/bin/env node
import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

const ajv = new Ajv2020({ strict: false, allErrors: true });
addFormats(ajv);

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function checkCycles(graph, name) {
  const visited = new Set();
  const stack = new Set();
  const cycles = [];

  function dfs(node, path) {
    if (stack.has(node)) {
      cycles.push([...path, node].join(' -> '));
      return;
    }
    if (visited.has(node)) return;
    visited.add(node);
    stack.add(node);
    const deps = graph.get(node) || new Set();
    for (const dep of deps) {
      dfs(dep, [...path, node]);
    }
    stack.delete(node);
  }

  for (const node of graph.keys()) {
    if (!visited.has(node)) {
      dfs(node, []);
    }
  }

  return cycles;
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const schemaPath = join(repoRoot, 'schemas', 'stacks-registry.schema.json');

  // Load and validate schema
  const schema = JSON.parse(await readFile(schemaPath, 'utf8'));
  ajv.addSchema(schema, schema.$id || schemaPath);

  // Load registry
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));

  // Schema validation
  const validate = ajv.getSchema(schema.$id || schemaPath);
  if (!validate) throw new Error('Failed to load registry schema');
  
  const valid = validate(registry);
  if (!valid) {
    console.error('Registry schema validation failed:');
    validate.errors.forEach(err => {
      console.error(`  ${err.instancePath || '/'}: ${err.message}`);
    });
    process.exit(1);
  }

  const errors = [];

  // Semantic checks
  const stackIds = new Set(Object.keys(registry.stacks));
  const profileIds = new Set(Object.keys(registry.profiles));

  // Check stack requires
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    for (const req of stack.requires) {
      if (!stackIds.has(req)) {
        errors.push(`Stack "${stackId}" requires missing stack: "${req}"`);
      }
    }
  }

  // Check profile references
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    if (!profileIds.has(stack.profile)) {
      errors.push(`Stack "${stackId}" references missing profile: "${stack.profile}"`);
    }
  }

  // Check profile requiresProfiles
  for (const [profileId, profile] of Object.entries(registry.profiles)) {
    const requiresProfiles = profile.requiresProfiles || [];
    for (const req of requiresProfiles) {
      if (!profileIds.has(req)) {
        errors.push(`Profile "${profileId}" requiresProfiles references missing profile: "${req}"`);
      }
    }
  }

  // Check profile requiresStacks
  for (const [profileId, profile] of Object.entries(registry.profiles)) {
    const requiresStacks = profile.requiresStacks || [];
    for (const req of requiresStacks) {
      if (!stackIds.has(req)) {
        errors.push(`Profile "${profileId}" requiresStacks references missing stack: "${req}"`);
      }
    }
  }

  // Check for cycles in stack dependency graph
  const stackGraph = new Map();
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    stackGraph.set(stackId, new Set(stack.requires));
  }
  const stackCycles = checkCycles(stackGraph, 'stack');
  if (stackCycles.length > 0) {
    errors.push(`Stack dependency cycles detected: ${stackCycles.join('; ')}`);
  }

  // Check for cycles in profile graph (via requiresProfiles)
  const profileGraph = new Map();
  for (const [profileId, profile] of Object.entries(registry.profiles)) {
    profileGraph.set(profileId, new Set(profile.requiresProfiles || []));
  }
  const profileCycles = checkCycles(profileGraph, 'profile');
  if (profileCycles.length > 0) {
    errors.push(`Profile dependency cycles detected: ${profileCycles.join('; ')}`);
  }

  // Check schema files exist
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    for (const [major, schemaPath] of Object.entries(stack.schema.major)) {
      const fullPath = join(repoRoot, schemaPath);
      if (!(await fileExists(fullPath))) {
        errors.push(`Stack "${stackId}" schema major "${major}" file not found: ${schemaPath}`);
      }
    }
  }

  // Check docs files exist (if present and not optional)
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    if (stack.docs) {
      for (const [major, docPath] of Object.entries(stack.docs.major)) {
        const fullPath = join(repoRoot, docPath);
        if (!(await fileExists(fullPath))) {
          errors.push(`Stack "${stackId}" docs major "${major}" file not found: ${docPath}`);
        }
      }
    }
  }

  // Check latestMajor exists in schema.major
  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    const latestMajorStr = String(stack.latestMajor);
    if (!(latestMajorStr in stack.schema.major)) {
      errors.push(`Stack "${stackId}" latestMajor ${stack.latestMajor} not found in schema.major`);
    }
  }

  if (errors.length > 0) {
    console.error('Registry validation failed:');
    errors.forEach(err => console.error(`  ${err}`));
    process.exit(1);
  }

  console.log('Registry validation passed.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});


```

### FILE: `scripts/verify-generated-clean.mjs`

* bytes: 1430
* sha256: bba1d2362c9bae9dbb46439783d56f33f1de140020ea6dff43d1bbd176f39b45

```
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


```

### FILE: `scripts/verify-stack-docs.mjs`

* bytes: 1845
* sha256: 90d4abc77d47305aae7fc9cf23744f26d65931ba846fc73b1b15cdb46bbd8d22

```
#!/usr/bin/env node
import { readFile, access } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = join(__dirname, '..');

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const registryPath = join(repoRoot, 'stacks', 'registry.json');
  const registry = JSON.parse(await readFile(registryPath, 'utf8'));

  const missing = [];

  for (const [stackId, stack] of Object.entries(registry.stacks)) {
    // Skip vendor stacks (x- prefix)
    if (stackId.startsWith('x-')) {
      continue;
    }

    // Check all majors in schema.major, or at least latestMajor
    const majorsToCheck = new Set();
    if (stack.schema?.major) {
      for (const major of Object.keys(stack.schema.major)) {
        majorsToCheck.add(major);
      }
    }
    // Also check latestMajor if it exists
    if (stack.latestMajor) {
      majorsToCheck.add(String(stack.latestMajor));
    }

    for (const major of majorsToCheck) {
      const expectedDocPath = `stacks/${stackId}@${major}.md`;
      const fullPath = join(repoRoot, expectedDocPath);

      if (!(await fileExists(fullPath))) {
        missing.push({
          stackId,
          major,
          expectedPath: expectedDocPath
        });
      }
    }
  }

  if (missing.length > 0) {
    console.error('Missing stack documentation files:');
    for (const { stackId, major, expectedPath } of missing) {
      console.error(`  ${expectedPath} (stack: ${stackId}@${major})`);
    }
    process.exit(1);
  }

  console.log('All stack documentation files present.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});




```

### FILE: `soustack.schema.json`

* bytes: 57809
* sha256: 264632a15c3b2f6838944e867f4b14a0be2d2b38c0dd7fa1fbc325048ab20a64

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/soustack.schema.json",
  "title": "Soustack Specification",
  "type": "object",
  "properties": {
    "$schema": {
      "type": "string",
      "const": "https://soustack.spec/soustack.schema.json"
    },
    "level": {
      "type": "string",
      "enum": [
        "lite",
        "base"
      ]
    },
    "profile": {
      "type": "string",
      "anyOf": [
        {
          "enum": [
            "base",
            "equipped",
            "illustrated",
            "lite",
            "prepped",
            "scalable",
            "timed"
          ]
        },
        {
          "pattern": "^x-[a-z0-9-]+(?:\\.[a-z0-9-]+)*$"
        }
      ]
    },
    "stacks": {
      "$ref": "#/$defs/stacksMap"
    },
    "name": {
      "type": "string"
    },
    "yield": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number",
          "exclusiveMinimum": 0
        },
        "unit": {
          "type": "string",
          "minLength": 1
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "amount",
        "unit"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "./defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "time": {
      "type": "object",
      "properties": {
        "total": {
          "$ref": "./defs/duration.schema.json#/properties/DurationMinutes"
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "total"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "./defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "ingredients": {
      "type": "array",
      "items": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "$ref": "#/$defs/ingredient"
          },
          {
            "$ref": "#/$defs/ingredientSection"
          }
        ]
      }
    },
    "instructions": {
      "type": "array",
      "items": {
        "anyOf": [
          {
            "type": "string"
          },
          {
            "$ref": "#/$defs/step"
          },
          {
            "$ref": "#/$defs/stepSection"
          }
        ]
      }
    },
    "metadata": {
      "type": "object",
      "additionalProperties": true
    },
    "images": {
      "type": "array",
      "items": {
        "$ref": "./defs/common.schema.json#/properties/uri"
      }
    },
    "videos": {
      "type": "array",
      "items": {
        "$ref": "./defs/common.schema.json#/properties/uri"
      }
    },
    "dietary": {
      "$ref": "./stacks/dietary.schema.json#/properties/dietary"
    },
    "storage": {
      "$ref": "./stacks/storage.schema.json#/properties/storage"
    },
    "substitutions": {
      "$ref": "./stacks/substitutions.schema.json#/properties/substitutions"
    },
    "techniques": {
      "$ref": "./stacks/techniques.schema.json#/properties/techniques"
    },
    "scaling": {
      "$ref": "./stacks/scaling.schema.json#/properties/scaling"
    }
  },
  "patternProperties": {
    "^x-": {
      "$ref": "./defs/common.schema.json#/properties/extensionLaneValue"
    }
  },
  "required": [
    "level",
    "stacks",
    "name",
    "ingredients",
    "instructions"
  ],
  "allOf": [
    {
      "if": {
        "properties": {
          "level": {
            "const": "base"
          }
        }
      },
      "then": {
        "required": [
          "yield",
          "time"
        ]
      }
    },
    {
      "$comment": "BEGIN GENERATED STACK GATING"
    },
    {
      "if": {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "const": "equipped"
          }
        }
      },
      "then": {
        "required": [
          "stacks"
        ],
        "properties": {
          "stacks": {
            "required": [
              "equipment"
            ],
            "properties": {
              "equipment": {
                "type": "integer",
                "enum": [
                  1
                ]
              }
            }
          }
        }
      }
    },
    {
      "if": {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "const": "illustrated"
          }
        }
      },
      "then": {
        "required": [
          "stacks"
        ],
        "properties": {
          "stacks": {
            "required": [
              "illustrated"
            ],
            "properties": {
              "illustrated": {
                "type": "integer",
                "enum": [
                  1
                ]
              }
            }
          }
        }
      }
    },
    {
      "if": {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "const": "prepped"
          }
        }
      },
      "then": {
        "required": [
          "stacks"
        ],
        "properties": {
          "stacks": {
            "required": [
              "prep"
            ],
            "properties": {
              "prep": {
                "type": "integer",
                "enum": [
                  1
                ]
              }
            }
          }
        }
      }
    },
    {
      "if": {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "const": "scalable"
          }
        }
      },
      "then": {
        "required": [
          "stacks"
        ],
        "properties": {
          "stacks": {
            "required": [
              "quantified",
              "scaling"
            ],
            "properties": {
              "quantified": {
                "type": "integer",
                "enum": [
                  1
                ]
              },
              "scaling": {
                "type": "integer",
                "enum": [
                  1
                ]
              }
            }
          }
        }
      }
    },
    {
      "if": {
        "required": [
          "profile"
        ],
        "properties": {
          "profile": {
            "const": "timed"
          }
        }
      },
      "then": {
        "required": [
          "stacks"
        ],
        "properties": {
          "stacks": {
            "required": [
              "structured",
              "timed"
            ],
            "properties": {
              "structured": {
                "type": "integer",
                "enum": [
                  1
                ]
              },
              "timed": {
                "type": "integer",
                "enum": [
                  1
                ]
              }
            }
          }
        }
      }
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "compute"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "compute": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "compute"
                ],
                "properties": {
                  "compute": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "allOf": [
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "quantified"
                    ],
                    "properties": {
                      "quantified": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "timed"
                    ],
                    "properties": {
                      "timed": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              }
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "dietary"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "dietary": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "dietary"
                ],
                "properties": {
                  "dietary": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "dietary": {
                "type": "object",
                "properties": {
                  "basis": {
                    "type": "string",
                    "enum": [
                      "perServing",
                      "perRecipe"
                    ]
                  },
                  "calories": {
                    "type": "number",
                    "minimum": 0
                  },
                  "macros": {
                    "type": "object",
                    "properties": {
                      "protein": {
                        "type": "number",
                        "minimum": 0
                      },
                      "fat": {
                        "type": "number",
                        "minimum": 0
                      },
                      "carbohydrates": {
                        "type": "number",
                        "minimum": 0
                      },
                      "metadata": {
                        "type": "object",
                        "additionalProperties": true
                      }
                    },
                    "minProperties": 1,
                    "additionalProperties": false,
                    "patternProperties": {
                      "^x-": {
                        "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                      }
                    }
                  },
                  "diets": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "allergens": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  },
                  "metadata": {
                    "type": "object",
                    "additionalProperties": true
                  }
                },
                "required": [
                  "basis"
                ],
                "additionalProperties": false,
                "anyOf": [
                  {
                    "required": [
                      "calories"
                    ]
                  },
                  {
                    "required": [
                      "macros"
                    ]
                  },
                  {
                    "required": [
                      "diets"
                    ]
                  },
                  {
                    "required": [
                      "allergens"
                    ]
                  }
                ],
                "patternProperties": {
                  "^x-": {
                    "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                  }
                }
              }
            },
            "required": [
              "dietary"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "equipment"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "equipment": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "equipment"
                ],
                "properties": {
                  "equipment": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "equipment": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "anyOf": [
                    {
                      "type": "string",
                      "minLength": 1
                    },
                    {
                      "$ref": "#/$defs/equipment@1_equipmentItem"
                    }
                  ]
                }
              }
            },
            "required": [
              "equipment"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "illustrated"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "illustrated": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "illustrated"
                ],
                "properties": {
                  "illustrated": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "images": {
                "type": "array",
                "items": {
                  "$ref": "https://soustack.spec/defs/common.schema.json#/properties/uri"
                }
              },
              "videos": {
                "type": "array",
                "items": {
                  "$ref": "https://soustack.spec/defs/common.schema.json#/properties/uri"
                }
              },
              "instructions": {
                "type": "array",
                "items": {
                  "anyOf": [
                    {
                      "$ref": "#/$defs/illustrated@1_illustratedStep"
                    },
                    {
                      "$ref": "#/$defs/illustrated@1_illustratedSection"
                    }
                  ]
                }
              }
            }
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "prep"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "prep": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "prep"
                ],
                "properties": {
                  "prep": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "miseEnPlace": {
                "type": "array",
                "minItems": 1,
                "items": {
                  "$ref": "#/$defs/prep@1_miseEnPlaceTask"
                }
              }
            },
            "required": [
              "miseEnPlace"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "quantified"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "quantified": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "quantified"
                ],
                "properties": {
                  "quantified": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "ingredients": {
                "type": "array",
                "items": {
                  "anyOf": [
                    {
                      "$ref": "#/$defs/quantified@1_ingredient"
                    },
                    {
                      "$ref": "#/$defs/quantified@1_ingredientSection"
                    }
                  ]
                }
              }
            },
            "required": [
              "ingredients"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "referenced"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "referenced": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "referenced"
                ],
                "properties": {
                  "referenced": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "allOf": [
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "structured"
                    ],
                    "properties": {
                      "structured": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "ingredients": {
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "$ref": "#/$defs/referenced@1_ingredient"
                        },
                        {
                          "$ref": "#/$defs/referenced@1_ingredientSection"
                        }
                      ]
                    }
                  },
                  "instructions": {
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "$ref": "#/$defs/referenced@1_referencedStep"
                        },
                        {
                          "$ref": "#/$defs/referenced@1_referencedSection"
                        }
                      ]
                    }
                  }
                },
                "required": [
                  "ingredients",
                  "instructions"
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "scaling"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "scaling": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "scaling"
                ],
                "properties": {
                  "scaling": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "allOf": [
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "quantified"
                    ],
                    "properties": {
                      "quantified": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "ingredients": {
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "$ref": "#/$defs/scaling@1_ingredient"
                        },
                        {
                          "$ref": "#/$defs/scaling@1_ingredientSection"
                        }
                      ]
                    }
                  },
                  "scaling": {
                    "type": "object",
                    "properties": {
                      "discrete": {
                        "type": "object",
                        "properties": {
                          "min": {
                            "type": "integer",
                            "minimum": 1
                          },
                          "max": {
                            "type": "integer",
                            "minimum": 1
                          },
                          "step": {
                            "type": "integer",
                            "minimum": 1
                          },
                          "metadata": {
                            "type": "object",
                            "additionalProperties": true
                          }
                        },
                        "required": [
                          "min",
                          "max"
                        ],
                        "additionalProperties": false,
                        "patternProperties": {
                          "^x-": {
                            "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                          }
                        }
                      },
                      "metadata": {
                        "type": "object",
                        "additionalProperties": true
                      }
                    },
                    "required": [
                      "discrete"
                    ],
                    "additionalProperties": false,
                    "patternProperties": {
                      "^x-": {
                        "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                      }
                    }
                  }
                },
                "required": [
                  "ingredients",
                  "scaling"
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "storage"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "storage": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "storage"
                ],
                "properties": {
                  "storage": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "storage": {
                "type": "object",
                "properties": {
                  "roomTemp": {
                    "$ref": "#/$defs/storage@1_storageMethod"
                  },
                  "refrigerated": {
                    "$ref": "#/$defs/storage@1_storageMethod"
                  },
                  "frozen": {
                    "$ref": "#/$defs/storage@1_storageMethod"
                  },
                  "leftovers": {
                    "$ref": "#/$defs/storage@1_leftovers"
                  },
                  "metadata": {
                    "type": "object",
                    "additionalProperties": true
                  }
                },
                "anyOf": [
                  {
                    "required": [
                      "roomTemp"
                    ]
                  },
                  {
                    "required": [
                      "refrigerated"
                    ]
                  },
                  {
                    "required": [
                      "frozen"
                    ]
                  }
                ],
                "additionalProperties": false,
                "patternProperties": {
                  "^x-": {
                    "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                  }
                }
              }
            },
            "required": [
              "storage"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "structured"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "structured": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "structured"
                ],
                "properties": {
                  "structured": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "instructions": {
                "type": "array",
                "items": {
                  "anyOf": [
                    {
                      "$ref": "#/$defs/structured@1_step"
                    },
                    {
                      "$ref": "#/$defs/structured@1_stepSection"
                    }
                  ]
                }
              }
            },
            "required": [
              "instructions"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "substitutions"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "substitutions": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "substitutions"
                ],
                "properties": {
                  "substitutions": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "allOf": [
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "referenced"
                    ],
                    "properties": {
                      "referenced": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "substitutions": {
                    "type": "array",
                    "items": {
                      "type": "object",
                      "properties": {
                        "for": {
                          "type": "string"
                        },
                        "alternatives": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "name": {
                                "type": "string"
                              },
                              "ratio": {
                                "type": "string"
                              },
                              "metadata": {
                                "type": "object",
                                "additionalProperties": true
                              }
                            },
                            "required": [
                              "name",
                              "ratio"
                            ],
                            "additionalProperties": false,
                            "patternProperties": {
                              "^x-": {
                                "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                              }
                            }
                          },
                          "minItems": 1
                        },
                        "metadata": {
                          "type": "object",
                          "additionalProperties": true
                        }
                      },
                      "required": [
                        "for",
                        "alternatives"
                      ],
                      "additionalProperties": false,
                      "patternProperties": {
                        "^x-": {
                          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                        }
                      }
                    },
                    "minItems": 1
                  }
                },
                "required": [
                  "substitutions"
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "techniques"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "techniques": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "techniques"
                ],
                "properties": {
                  "techniques": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "properties": {
              "techniques": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "string"
                    },
                    "name": {
                      "type": "string"
                    },
                    "description": {
                      "type": "string"
                    },
                    "metadata": {
                      "type": "object",
                      "additionalProperties": true
                    }
                  },
                  "required": [
                    "id",
                    "name"
                  ],
                  "additionalProperties": false,
                  "patternProperties": {
                    "^x-": {
                      "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
                    }
                  }
                },
                "minItems": 1
              }
            },
            "required": [
              "techniques"
            ]
          }
        }
      ]
    },
    {
      "allOf": [
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "timed"
                ]
              }
            }
          },
          "then": {
            "properties": {
              "stacks": {
                "properties": {
                  "timed": {
                    "enum": [
                      1
                    ]
                  }
                }
              }
            }
          }
        },
        {
          "if": {
            "required": [
              "stacks"
            ],
            "properties": {
              "stacks": {
                "required": [
                  "timed"
                ],
                "properties": {
                  "timed": {
                    "const": 1
                  }
                }
              }
            }
          },
          "then": {
            "allOf": [
              {
                "properties": {
                  "stacks": {
                    "required": [
                      "structured"
                    ],
                    "properties": {
                      "structured": {
                        "enum": [
                          1
                        ]
                      }
                    }
                  }
                }
              },
              {
                "properties": {
                  "instructions": {
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "$ref": "#/$defs/timed@1_timedStep"
                        },
                        {
                          "$ref": "#/$defs/timed@1_timedStepSection"
                        }
                      ]
                    }
                  }
                },
                "required": [
                  "instructions"
                ]
              }
            ]
          }
        }
      ]
    },
    {
      "$comment": "END GENERATED STACK GATING"
    }
  ],
  "unevaluatedProperties": false,
  "$defs": {
    "stackName": {
      "type": "string",
      "pattern": "^(?:[a-z][a-z0-9-]*|x-[a-z0-9-]+(?:\\.[a-z0-9-]+)*)$"
    },
    "stackMajor": {
      "type": "integer",
      "minimum": 1
    },
    "stacksMap": {
      "type": "object",
      "propertyNames": {
        "$ref": "#/$defs/stackName"
      },
      "additionalProperties": {
        "$ref": "#/$defs/stackMajor"
      }
    },
    "ingredient": {
      "allOf": [
        {
          "$ref": "./defs/entities.schema.json#/$defs/IngredientBase"
        }
      ]
    },
    "ingredientSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/$defs/ingredient"
              },
              {
                "$ref": "#/$defs/ingredientSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "ingredients"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "./defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "step": {
      "$ref": "./defs/entities.schema.json#/$defs/StepBase"
    },
    "stepSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "$ref": "#/$defs/step"
              },
              {
                "$ref": "#/$defs/stepSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "steps"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "./defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "illustrated@1_illustratedStep": {
      "allOf": [
        {
          "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase"
        },
        {
          "required": [
            "id"
          ]
        }
      ]
    },
    "illustrated@1_illustratedSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/illustrated.schema.json#/$defs/illustratedStep"
              },
              {
                "$ref": "https://soustack.spec/stacks/illustrated.schema.json#/$defs/illustratedSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "steps"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "quantified@1_ingredient": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "quantity": {
          "$ref": "https://soustack.spec/defs/quantity.schema.json"
        },
        "temperature": {
          "$ref": "https://soustack.spec/defs/temperature.schema.json"
        },
        "notes": {
          "type": "string"
        },
        "prep": {
          "oneOf": [
            {
              "type": "string",
              "minLength": 1
            },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1
                  },
                  {
                    "$ref": "https://soustack.spec/stacks/prep.schema.json#/$defs/prepItem"
                  }
                ]
              }
            }
          ]
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        },
        "scaling": {
          "$ref": "https://soustack.spec/defs/scalingRule.schema.json"
        }
      },
      "required": [
        "id",
        "name",
        "quantity"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "quantified@1_ingredientSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/quantified.schema.json#/$defs/ingredient"
              },
              {
                "$ref": "https://soustack.spec/stacks/quantified.schema.json#/$defs/ingredientSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "ingredients"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "referenced@1_ingredient": {
      "allOf": [
        {
          "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/IngredientBase"
        },
        {
          "required": [
            "id"
          ]
        }
      ]
    },
    "referenced@1_ingredientSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/referenced.schema.json#/$defs/ingredient"
              },
              {
                "$ref": "https://soustack.spec/stacks/referenced.schema.json#/$defs/ingredientSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "ingredients"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "referenced@1_referencedStep": {
      "allOf": [
        {
          "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase"
        },
        {
          "properties": {
            "inputs": {
              "allOf": [
                {
                  "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase/properties/inputs"
                },
                {
                  "minItems": 1
                }
              ]
            }
          },
          "required": [
            "id",
            "inputs"
          ]
        }
      ]
    },
    "referenced@1_referencedSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/referenced.schema.json#/$defs/referencedStep"
              },
              {
                "$ref": "https://soustack.spec/stacks/referenced.schema.json#/$defs/referencedSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "steps"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "scaling@1_ingredient": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "quantity": {
          "$ref": "https://soustack.spec/defs/quantity.schema.json"
        },
        "temperature": {
          "$ref": "https://soustack.spec/defs/temperature.schema.json"
        },
        "notes": {
          "type": "string"
        },
        "prep": {
          "oneOf": [
            {
              "type": "string",
              "minLength": 1
            },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "anyOf": [
                  {
                    "type": "string",
                    "minLength": 1
                  },
                  {
                    "$ref": "https://soustack.spec/stacks/prep.schema.json#/$defs/prepItem"
                  }
                ]
              }
            }
          ]
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        },
        "scaling": {
          "$ref": "https://soustack.spec/defs/scalingRule.schema.json"
        }
      },
      "required": [
        "id",
        "name",
        "quantity"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "scaling@1_ingredientSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/scaling.schema.json#/$defs/ingredient"
              },
              {
                "$ref": "https://soustack.spec/stacks/scaling.schema.json#/$defs/ingredientSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "ingredients"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "storage@1_storageMethod": {
      "type": "object",
      "properties": {
        "duration": {
          "$ref": "https://soustack.spec/defs/duration.schema.json#/properties/StorageDuration"
        },
        "notes": {
          "type": "string"
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "duration"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "structured@1_step": {
      "allOf": [
        {
          "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase"
        },
        {
          "required": [
            "id"
          ]
        }
      ]
    },
    "structured@1_stepSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/structured.schema.json#/$defs/step"
              },
              {
                "$ref": "https://soustack.spec/stacks/structured.schema.json#/$defs/stepSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "steps"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "timed@1_timedStep": {
      "allOf": [
        {
          "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase"
        },
        {
          "properties": {
            "timing": {
              "allOf": [
                {
                  "$ref": "https://soustack.spec/defs/entities.schema.json#/$defs/StepBase/properties/timing"
                },
                {
                  "required": [
                    "activity"
                  ],
                  "anyOf": [
                    {
                      "required": [
                        "duration"
                      ]
                    },
                    {
                      "required": [
                        "completionCue"
                      ]
                    }
                  ]
                }
              ]
            }
          },
          "required": [
            "id",
            "timing"
          ]
        }
      ]
    },
    "timed@1_timedStepSection": {
      "type": "object",
      "properties": {
        "section": {
          "type": "string"
        },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              {
                "$ref": "https://soustack.spec/stacks/timed.schema.json#/$defs/timedStep"
              },
              {
                "$ref": "https://soustack.spec/stacks/timed.schema.json#/$defs/timedStepSection"
              }
            ]
          }
        },
        "metadata": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": [
        "section",
        "steps"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "equipment@1_equipmentItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9._-]+$",
          "minLength": 1
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "count": {
          "type": "integer",
          "minimum": 1
        },
        "countScaling": {
          "oneOf": [
            {
              "type": "string",
              "enum": [
                "fixed",
                "linear"
              ]
            },
            {
              "type": "object",
              "properties": {
                "mode": {
                  "const": "threshold"
                },
                "steps": {
                  "type": "array",
                  "minItems": 1,
                  "items": {
                    "type": "object",
                    "properties": {
                      "maxFactor": {
                        "type": "number",
                        "exclusiveMinimum": 0
                      },
                      "count": {
                        "type": "integer",
                        "minimum": 1
                      }
                    },
                    "required": [
                      "maxFactor",
                      "count"
                    ],
                    "additionalProperties": false
                  }
                }
              },
              "required": [
                "mode",
                "steps"
              ],
              "additionalProperties": false
            }
          ]
        },
        "upgrades": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "properties": {
              "minFactor": {
                "type": "number",
                "exclusiveMinimum": 0
              },
              "use": {
                "type": "string",
                "pattern": "^[A-Za-z0-9._-]+$",
                "minLength": 1
              }
            },
            "required": [
              "minFactor",
              "use"
            ],
            "additionalProperties": false
          }
        }
      },
      "required": [
        "id",
        "name"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "prep@1_miseEnPlaceTask": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9._-]+$"
        },
        "text": {
          "type": "string",
          "minLength": 1
        },
        "inputs": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true,
          "minItems": 1
        },
        "usesEquipment": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Za-z0-9._-]+$"
          },
          "uniqueItems": true,
          "minItems": 1
        }
      },
      "required": [
        "text"
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "storage@1_leftovers": {
      "type": "object",
      "properties": {
        "notes": {
          "type": "string"
        },
        "reheat": {
          "oneOf": [
            {
              "type": "array",
              "items": {
                "type": "string"
              },
              "minItems": 1
            },
            {
              "type": "array",
              "items": {
                "$ref": "https://soustack.spec/stacks/storage.schema.json#/$defs/reheatInstruction"
              },
              "minItems": 1
            }
          ]
        },
        "portioning": {
          "$ref": "https://soustack.spec/stacks/storage.schema.json#/$defs/portioning"
        }
      },
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "https://soustack.spec/defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    }
  }
}

```

### FILE: `stacks/compute.schema.json`

* bytes: 212
* sha256: 5b40126ed039b9a75cf42ff6dcef5602f131569cf25071c7fdfc7a4707ee857a

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/compute.schema.json",
  "title": "Compute Claim Stack",
  "type": "object",
  "additionalProperties": false
}

```

### FILE: `stacks/compute@1.md`

* bytes: 771
* sha256: 47eaac6c92e6f937b7ec95b4b02566986db0375a8ebbb1831de2aca9cfbd1508

```
# compute@1

## Purpose
The `compute@1` stack declares that a recipe meets prerequisites for computational operations such as scheduling, scaling, and deterministic planning.

## Adds
- No additional structural fields (claim stack).

## Requires
- `quantified@1`
- `timed@1`

## Semantics
- MUST: Recipe must satisfy all requirements of `quantified@1` and `timed@1`.
- NOTE: This is a claim stack indicating computational readiness. Tools SHOULD enforce that all prerequisites are met.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Requires `quantified@1` for scaling inputs and `timed@1` for deterministic scheduling. Indicates recipe is ready for computational recipe planning tools.




```

### FILE: `stacks/dietary.schema.json`

* bytes: 1601
* sha256: b46ddd1bf76eae6024adeb7ad95cf2c743cea00948a9096f1dc927f12b58f638

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/dietary.schema.json",
  "title": "Dietary Stack",
  "type": "object",
  "properties": {
    "dietary": {
      "type": "object",
      "properties": {
        "basis": { "type": "string", "enum": ["perServing", "perRecipe"] },
        "calories": { "type": "number", "minimum": 0 },
        "macros": {
          "type": "object",
          "properties": {
            "protein": { "type": "number", "minimum": 0 },
            "fat": { "type": "number", "minimum": 0 },
            "carbohydrates": { "type": "number", "minimum": 0 },
            "metadata": { "type": "object", "additionalProperties": true }
          },
          "minProperties": 1,
          "additionalProperties": false,
          "patternProperties": {
            "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
          }
        },
        "diets": { "type": "array", "items": { "type": "string" } },
        "allergens": { "type": "array", "items": { "type": "string" } },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["basis"],
      "additionalProperties": false,
      "anyOf": [
        { "required": ["calories"] },
        { "required": ["macros"] },
        { "required": ["diets"] },
        { "required": ["allergens"] }
      ],
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "required": ["dietary"],
  "additionalProperties": false
}

```

### FILE: `stacks/dietary@1.md`

* bytes: 879
* sha256: e10e0f9e3356cf09f8c72009a97e79f6eb5f92f226dacbd1fa07d93bcb632a44

```
# dietary@1

## Purpose
The `dietary@1` stack enables recipes to declare nutritional information, dietary classifications, and allergen information.

## Adds
- Top-level `dietary` object with `basis` field (perServing or perRecipe).
- Optional `calories`, `macros` (protein, fat, carbohydrates), `diets`, and `allergens` fields.
- At least one of calories, macros, diets, or allergens must be present.

## Requires
- None

## Semantics
- MUST: The `dietary` object must include a `basis` field.
- MUST: At least one of `calories`, `macros`, `diets`, or `allergens` must be present.
- NOTE: Dietary tags and allergen lists are freeform strings in v1 (no controlled vocabulary).

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: No dependencies on other stacks. Can be combined with any other stack.




```

### FILE: `stacks/equipment.schema.json`

* bytes: 2642
* sha256: 92ab0e4baff8cb8bdf6573fd2cd4e21a85ad9fba6950dea90a9eb4ae2d5d8608

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/equipment.schema.json",
  "title": "Equipment Stack",
  "type": "object",
  "properties": {
    "equipment": {
      "type": "array",
      "minItems": 1,
      "items": {
        "anyOf": [
          { "type": "string", "minLength": 1 },
          { "$ref": "#/$defs/equipmentItem" }
        ]
      }
    }
  },
  "required": ["equipment"],
  "$defs": {
    "equipmentItem": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9._-]+$",
          "minLength": 1
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "count": {
          "type": "integer",
          "minimum": 1
        },
        "countScaling": {
          "oneOf": [
            { "type": "string", "enum": ["fixed", "linear"] },
            {
              "type": "object",
              "properties": {
                "mode": { "const": "threshold" },
                "steps": {
                  "type": "array",
                  "minItems": 1,
                  "items": {
                    "type": "object",
                    "properties": {
                      "maxFactor": {
                        "type": "number",
                        "exclusiveMinimum": 0
                      },
                      "count": {
                        "type": "integer",
                        "minimum": 1
                      }
                    },
                    "required": ["maxFactor", "count"],
                    "additionalProperties": false
                  }
                }
              },
              "required": ["mode", "steps"],
              "additionalProperties": false
            }
          ]
        },
        "upgrades": {
          "type": "array",
          "minItems": 1,
          "items": {
            "type": "object",
            "properties": {
              "minFactor": {
                "type": "number",
                "exclusiveMinimum": 0
              },
              "use": {
                "type": "string",
                "pattern": "^[A-Za-z0-9._-]+$",
                "minLength": 1
              }
            },
            "required": ["minFactor", "use"],
            "additionalProperties": false
          }
        }
      },
      "required": ["id", "name"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}


```

### FILE: `stacks/equipment@1.md`

* bytes: 5173
* sha256: fb7e49908e3fdbc35d3a0b0626f7786bf7f3e227de1bdca374b043c41b5c4c23

```
#equipment@1

---

## Purpose

The `equipment@1` stack enables recipes to declare required equipment, with optional scaling-aware counts and upgrade paths for different scale factors.

This stack is adoption-first: equipment can be declared as simple strings for minimal friction, or as structured objects with IDs for cross-referencing from steps.

---

## Requirements

A document that declares `equipment@1`:

• MUST satisfy all structural rules enabled by this stack.
• MUST satisfy the semantic rules described below.

---

## Data Model

When `equipment@1` is declared, the document MUST include a top-level `equipment` array.

### Equipment Array

The `equipment` array contains one or more items. Each item MAY be:

• A string (simple tool name)
• A structured equipment object

### Structured Equipment Object

Structured equipment objects support:

• `id` (required): unique identifier following pattern `^[A-Za-z0-9._-]+$`
• `name` (required): human-readable name
• `count` (optional): integer >= 1, default 1
• `countScaling` (optional): scaling behavior for count
• `upgrades` (optional): array of upgrade rules

---

## Scaling Behavior

Equipment scaling is defined in terms of a scale factor F. If no scaling factor exists in the document, implementations MUST treat F = 1.

### countScaling

The `countScaling` field controls how equipment count changes with scale:

#### fixed

Count remains unchanged regardless of scale factor.

```json
{
  "id": "pan",
  "name": "8-inch skillet",
  "count": 1,
  "countScaling": "fixed"
}
```

#### linear

Effective count = ceil(count × F)

```json
{
  "id": "mixing_bowl",
  "name": "Mixing bowl",
  "count": 2,
  "countScaling": "linear"
}
```

#### threshold

Pick the first step where F <= maxFactor, otherwise use the last step.

```json
{
  "id": "sheet_pan",
  "name": "Baking sheet",
  "count": 1,
  "countScaling": {
    "mode": "threshold",
    "steps": [
      { "maxFactor": 1.0, "count": 1 },
      { "maxFactor": 2.0, "count": 2 },
      { "maxFactor": 4.0, "count": 3 }
    ]
  }
}
```

The `steps` array MUST be non-empty. Steps SHOULD be in ascending order by `maxFactor` (semantic validation may enforce this in tooling).

### upgrades

The `upgrades` array allows swapping to a different equipment item at higher scale factors.

Choose the upgrade with the highest `minFactor` where `minFactor <= F`. If no upgrade matches, use the base equipment item.

```json
{
  "id": "skillet_small",
  "name": "8-inch skillet",
  "upgrades": [
    { "minFactor": 2.0, "use": "skillet_large" }
  ]
}
```

The `use` field MUST reference an equipment id that exists in the equipment array (semantic validation).

---

## Step Usage

When `structured@1` is present (steps are objects), steps MAY include an optional `usesEquipment` field.

Field
step.usesEquipment : array of equipment ids

Each id in `usesEquipment` MUST exist in the equipment array (semantic validation when both stacks are present).

Example:

```json
{
  "equipment": [
    { "id": "skillet", "name": "8-inch skillet" }
  ],
  "instructions": [
    {
      "id": "sear",
      "text": "Sear the meat",
      "usesEquipment": ["skillet"]
    }
  ]
}
```

---

## Composition

The equipment stack is composable with other stacks:

• No hard dependency on `scaling@1` (scaling behavior uses factor if present, but does not require scaling stack)
• Works with `structured@1` to enable step-level equipment references
• Remains monotonic: does not close objects needed by other stacks

---

## Semantic Validation Rules (Normative)

Validators MUST enforce the following rules:

1. Equipment id uniqueness
   All equipment object `id` values MUST be unique within the equipment array.

2. Step equipment references
   If both `equipment@1` and `structured@1` are present, and a step includes `usesEquipment`, all referenced ids MUST exist in the equipment array (as object ids, not string items).

3. Upgrade references
   If an equipment item includes `upgrades`, each `upgrades[].use` MUST reference an existing equipment object id.

4. Threshold steps ordering
   For `countScaling.mode == "threshold"`, the `steps` array SHOULD be in ascending order by `maxFactor` (tooling may warn but not fail validation).

---

## Examples

Simple strings

```json
{
  "equipment": ["mixing bowl", "whisk", "oven"]
}
```

Structured with scaling

```json
{
  "equipment": [
    {
      "id": "skillet",
      "name": "8-inch skillet",
      "count": 1,
      "countScaling": "fixed"
    },
    {
      "id": "bowl",
      "name": "Mixing bowl",
      "count": 2,
      "countScaling": "linear"
    }
  ]
}
```

With upgrades

```json
{
  "equipment": [
    {
      "id": "skillet_small",
      "name": "8-inch skillet",
      "upgrades": [
        { "minFactor": 2.0, "use": "skillet_large" }
      ]
    },
    {
      "id": "skillet_large",
      "name": "12-inch skillet"
    }
  ]
}
```

Step usage

```json
{
  "equipment": [
    { "id": "skillet", "name": "8-inch skillet" }
  ],
  "instructions": [
    {
      "id": "sear",
      "text": "Sear the meat in the skillet",
      "usesEquipment": ["skillet"]
    }
  ]
}
```


```

### FILE: `stacks/illustrated.schema.json`

* bytes: 1456
* sha256: 4b1b4260d441ea77fca5aaf014f5548c854e21d9a8f503d965501651ea361692

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/illustrated.schema.json",
  "title": "Illustrated Stack",
  "type": "object",
  "properties": {
    "images": {
      "type": "array",
      "items": { "$ref": "../defs/common.schema.json#/properties/uri" }
    },
    "videos": {
      "type": "array",
      "items": { "$ref": "../defs/common.schema.json#/properties/uri" }
    },
    "instructions": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/illustratedStep" },
          { "$ref": "#/$defs/illustratedSection" }
        ]
      }
    }
  },
  "$defs": {
    "illustratedStep": {
      "allOf": [
        { "$ref": "../defs/entities.schema.json#/$defs/StepBase" },
        { "required": ["id"] }
      ]
    },
    "illustratedSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/illustratedStep" },
              { "$ref": "#/$defs/illustratedSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "steps"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  }
}

```

### FILE: `stacks/illustrated@1.md`

* bytes: 825
* sha256: 4e54b4df95e12238dd69a748ca0c5c69e61aa7e9cbba70cbc0ed05d8ada82630

```
# illustrated@1

## Purpose
The `illustrated@1` stack enables recipes to include media (images and videos) at the recipe and step levels for visual guidance.

## Adds
- Top-level `images` and `videos` arrays (optional).
- Step objects may include `images` and `videos` arrays.
- Steps are structured objects with `id` fields.

## Requires
- None

## Semantics
- MUST: At least one media item (image or video) must be present at the recipe level or in at least one step.
- MUST: Step objects must include `id` fields (steps are structured).
- NOTE: Media URIs must be valid according to the URI schema definition.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Works with `structured@1` for step-level media. No dependencies on other stacks.




```

### FILE: `stacks/prep.schema.json`

* bytes: 1710
* sha256: 1cc274db5d431e0d4e75f2363d410698c135a060533319cae88386407c3d3ac4

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/prep.schema.json",
  "title": "Prep Stack",
  "type": "object",
  "properties": {
    "miseEnPlace": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/$defs/miseEnPlaceTask"
      }
    }
  },
  "required": ["miseEnPlace"],
  "$defs": {
    "miseEnPlaceTask": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9._-]+$"
        },
        "text": {
          "type": "string",
          "minLength": 1
        },
        "inputs": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "uniqueItems": true,
          "minItems": 1
        },
        "usesEquipment": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Za-z0-9._-]+$"
          },
          "uniqueItems": true,
          "minItems": 1
        }
      },
      "required": ["text"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "../defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    },
    "prepItem": {
      "type": "object",
      "properties": {
        "verb": {
          "type": "string",
          "minLength": 1
        },
        "detail": {
          "type": "string"
        }
      },
      "required": ["verb"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": {
          "$ref": "../defs/common.schema.json#/properties/extensionLaneValue"
        }
      }
    }
  },
  "additionalProperties": false
}


```

### FILE: `stacks/prep@1.md`

* bytes: 5821
* sha256: 2721a7b9467c66feabde1a2d9e4f36b79b4da6c5626c22b5011f70fada3f197b

```
#prep@1

---

## Purpose

The `prep@1` stack enables recipes to include preparation guidance at both the ingredient level and as explicit mise en place tasks. This makes recipes more operational by providing clear prep instructions and planning checklists.

This stack is adoption-first: ingredient prep can be simple strings for minimal friction, or structured objects for more detailed guidance.

---

## Requirements

A document that declares `prep@1`:

• MUST satisfy all structural rules enabled by this stack.
• MUST satisfy the semantic rules described below.

---

## Data Model

When `prep@1` is declared, the document MUST include a top-level `miseEnPlace` array.

### Mise En Place Array

The `miseEnPlace` array contains one or more tasks. Each task is a structured object that describes a prep step.

### Ingredient-Level Prep

Ingredient objects MAY include an optional `prep` field that describes how the ingredient should be prepared. The `prep` field supports multiple formats:

• A single string (simple prep phrase)
• An array of strings (multiple prep notes)
• An array of structured prep items

---

## Ingredient Prep Formats

### String Format

A simple string describing the prep:

```json
{
  "id": "onion",
  "name": "Onion",
  "prep": "finely diced"
}
```

### Array of Strings

Multiple prep notes:

```json
{
  "id": "garlic",
  "name": "Garlic",
  "prep": ["peeled", "minced"]
}
```

### Structured Prep Items

More detailed prep instructions with verbs and details:

```json
{
  "id": "tomato",
  "name": "Tomato",
  "prep": [
    { "verb": "dice", "detail": "fine" },
    { "verb": "reserve", "detail": "half for garnish" }
  ]
}
```

Each prep item object includes:

• `verb` (required): string describing the action (freeform; no controlled vocabulary in v1)
• `detail` (optional): string providing additional context

---

## Mise En Place Tasks

### Minimal Task

A task with only required text:

```json
{
  "miseEnPlace": [
    { "text": "Finely dice the onion" },
    { "text": "Mince the garlic" }
  ]
}
```

### Task with ID

Tasks may include an optional `id` for cross-referencing:

```json
{
  "miseEnPlace": [
    { "id": "dice-onion", "text": "Finely dice the onion" },
    { "id": "mince-garlic", "text": "Mince the garlic" }
  ]
}
```

Task IDs MUST be unique within the `miseEnPlace` array (semantic validation).

### Task with Ingredient References

When `referenced@1` is present, tasks may reference ingredient IDs:

```json
{
  "miseEnPlace": [
    {
      "text": "Prepare the vegetables",
      "inputs": ["onion", "garlic"]
    }
  ]
}
```

Each id in `inputs` MUST exist in the ingredients array (semantic validation when both stacks are present).

### Task with Equipment References

When `equipment@1` is present, tasks may reference equipment IDs:

```json
{
  "miseEnPlace": [
    {
      "text": "Sharpen the knife",
      "usesEquipment": ["knife"]
    }
  ]
}
```

Each id in `usesEquipment` MUST exist in the equipment array (semantic validation when both stacks are present).

### Combined References

Tasks may include both `inputs` and `usesEquipment`:

```json
{
  "miseEnPlace": [
    {
      "text": "Dice the onion with a sharp knife",
      "inputs": ["onion"],
      "usesEquipment": ["knife"]
    }
  ]
}
```

---

## Semantics

### Prep Field

The ingredient `prep` field is descriptive and freeform. In v1, there is no controlled vocabulary for prep verbs or details. Tools may interpret these as hints for display or planning, but validation does not enforce specific values.

### Mise En Place

The `miseEnPlace` array is an explicit checklist of prep tasks. Tools may render this as a prep plan, separate from the main cooking instructions. Tasks are ordered and may be presented as a sequential checklist.

---

## Composition

The prep stack is composable with other stacks:

• No hard dependency on `referenced@1` or `equipment@1` (references are optional and only validated when those stacks are present)
• Works with `structured@1` to enable ingredient object definitions
• Remains monotonic: does not close objects needed by other stacks
• Ingredient `prep` is optional even when the stack is present

---

## Semantic Validation Rules (Normative)

Validators MUST enforce the following rules:

1. Mise en place task ID uniqueness
   If tasks include `id` values, all task IDs MUST be unique within the `miseEnPlace` array.

2. Ingredient reference resolution
   If both `prep@1` and `referenced@1` are present, and a task includes `inputs`, all referenced ingredient IDs MUST exist in the ingredients array.

3. Equipment reference resolution
   If both `prep@1` and `equipment@1` are present, and a task includes `usesEquipment`, all referenced equipment IDs MUST exist in the equipment array (as object ids, not string items).

---

## Examples

Minimal mise en place

```json
{
  "miseEnPlace": [
    { "text": "Finely dice the onion" },
    { "text": "Mince the garlic" }
  ]
}
```

Ingredient prep with strings

```json
{
  "ingredients": [
    {
      "id": "onion",
      "name": "Onion",
      "prep": "finely diced"
    },
    {
      "id": "garlic",
      "name": "Garlic",
      "prep": ["peeled", "minced"]
    }
  ]
}
```

Structured prep items

```json
{
  "ingredients": [
    {
      "id": "tomato",
      "name": "Tomato",
      "prep": [
        { "verb": "dice", "detail": "fine" },
        { "verb": "reserve", "detail": "half for garnish" }
      ]
    }
  ]
}
```

Mise en place with references

```json
{
  "equipment": [
    { "id": "knife", "name": "Chef's knife" }
  ],
  "ingredients": [
    { "id": "onion", "name": "Onion" }
  ],
  "miseEnPlace": [
    {
      "text": "Dice the onion with a sharp knife",
      "inputs": ["onion"],
      "usesEquipment": ["knife"]
    }
  ]
}
```


```

### FILE: `stacks/quantified.schema.json`

* bytes: 2214
* sha256: abf271ff948218dd0eb016c83d482696919eb2141c39531ab0a43b18d4f160d2

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/quantified.schema.json",
  "title": "Quantified Stack",
  "type": "object",
  "properties": {
    "ingredients": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/ingredient" },
          { "$ref": "#/$defs/ingredientSection" }
        ]
      }
    }
  },
  "required": ["ingredients"],
  "$defs": {
    "ingredient": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "quantity": { "$ref": "../defs/quantity.schema.json" },
        "temperature": { "$ref": "../defs/temperature.schema.json" },
        "notes": { "type": "string" },
        "prep": {
          "oneOf": [
            { "type": "string", "minLength": 1 },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "anyOf": [
                  { "type": "string", "minLength": 1 },
                  { "$ref": "../stacks/prep.schema.json#/$defs/prepItem" }
                ]
              }
            }
          ]
        },
        "metadata": { "type": "object", "additionalProperties": true },
        "scaling": { "$ref": "../defs/scalingRule.schema.json" }
      },
      "required": ["id", "name", "quantity"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "ingredientSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/ingredient" },
              { "$ref": "#/$defs/ingredientSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "ingredients"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `stacks/quantified@1.md`

* bytes: 880
* sha256: 40ebc533bfdabafe3b50cdf26cdf45443e12504cba67c31fa38601eac3842529

```
# quantified@1

## Purpose
The `quantified@1` stack enables recipes to declare precise ingredient quantities with units, enabling scaling and computation.

## Adds
- Top-level `ingredients` array with structured ingredient objects containing `id`, `name`, and `quantity` fields.
- Ingredients may include `temperature`, `notes`, `prep`, `scaling`, and `metadata`.
- Support for nested ingredient sections.

## Requires
- None

## Semantics
- MUST: Each ingredient object must include `id`, `name`, and `quantity` fields.
- MUST: Ingredient IDs must be unique within the ingredients array.
- NOTE: This stack is a prerequisite for `scaling@1`.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Required by `scaling@1` for scaling behavior. Works with `structured@1` for stable ingredient references.




```

### FILE: `stacks/referenced.schema.json`

* bytes: 2593
* sha256: 46b087127fe30bcdd256617efc51289cd59d4c1f97ea2b23ab326ebdbc5fdce3

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/referenced.schema.json",
  "title": "Referenced Stack",
  "type": "object",
  "properties": {
    "ingredients": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/ingredient" },
          { "$ref": "#/$defs/ingredientSection" }
        ]
      }
    },
    "instructions": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/referencedStep" },
          { "$ref": "#/$defs/referencedSection" }
        ]
      }
    }
  },
  "required": ["ingredients", "instructions"],
  "allOf": [
    { "$ref": "./structured.schema.json" }
  ],
  "$defs": {
    "ingredient": {
      "allOf": [
        { "$ref": "../defs/entities.schema.json#/$defs/IngredientBase" },
        { "required": ["id"] }
      ]
    },
    "ingredientSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/ingredient" },
              { "$ref": "#/$defs/ingredientSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "ingredients"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "referencedStep": {
      "allOf": [
        { "$ref": "../defs/entities.schema.json#/$defs/StepBase" },
        {
          "properties": {
            "inputs": {
              "allOf": [
                { "$ref": "../defs/entities.schema.json#/$defs/StepBase/properties/inputs" },
                { "minItems": 1 }
              ]
            }
          },
          "required": ["id", "inputs"]
        }
      ]
    },
    "referencedSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/referencedStep" },
              { "$ref": "#/$defs/referencedSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "steps"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  }
}

```

### FILE: `stacks/referenced@1.md`

* bytes: 858
* sha256: 6c92ceb029fd347269d5060b55e9ebec464b8d8c0fd5c8964df21c475a2b946a

```
# referenced@1

## Purpose
The `referenced@1` stack enables steps to explicitly reference ingredient IDs, creating clear input-output relationships for planning and validation.

## Adds
- Step objects must include an `inputs` array with at least one ingredient ID reference.
- Ingredient objects must include `id` fields.

## Requires
- `structured@1`

## Semantics
- MUST: Each step must include an `inputs` array with at least one element.
- MUST: All ingredient IDs referenced in step `inputs` must exist in the ingredients array.
- NOTE: This stack implies `structured@1` (steps are objects with IDs).

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Required by `substitutions@1` for substitution target resolution. Works with `prep@1` for mise en place task references.




```

### FILE: `stacks/registry.json`

* bytes: 4647
* sha256: c0fa375633817bd82b79b2bd987405558ed36edde48ff95accf6de3c7b3a11e2

```
{
  "$schema": "../schemas/stacks-registry.schema.json",
  "registryVersion": 1,
  "spec": {
    "name": "soustack",
    "currentSpecVersion": "0.3.0",
    "canonicalStacksFormat": "map"
  },
  "profiles": {
    "base": { "title": "Base", "description": "name, ingredients, instructions", "requiresProfiles": [], "requiresStacks": [] },
    "lite": { "title": "Lite", "description": "Minimal publishable recipe", "requiresProfiles": ["base"], "requiresStacks": [] },
    "scalable": { "title": "Scalable", "description": "Quantified + scaling", "requiresProfiles": ["lite"], "requiresStacks": ["quantified", "scaling"] },
    "timed": { "title": "Timed", "description": "Structured + timed", "requiresProfiles": ["lite"], "requiresStacks": ["structured", "timed"] },
    "illustrated": { "title": "Illustrated", "description": "Media present", "requiresProfiles": ["lite"], "requiresStacks": ["illustrated"] },
    "equipped": { "title": "Equipped", "description": "Recipe declares required tools/equipment.", "requiresProfiles": ["lite"], "requiresStacks": ["equipment"] },
    "prepped": { "title": "Prepped", "description": "Recipe includes prep guidance and/or mise en place tasks.", "requiresProfiles": ["lite"], "requiresStacks": ["prep"] }
  },
  "stacks": {
    "quantified": {
      "title": "Quantified",
      "latestMajor": 1,
      "profile": "scalable",
      "requires": [],
      "schema": { "major": { "1": "stacks/quantified.schema.json" } },
      "docs": { "major": { "1": "stacks/quantified@1.md" } }
    },
    "scaling": {
      "title": "Scaling",
      "latestMajor": 1,
      "profile": "scalable",
      "requires": ["quantified"],
      "schema": { "major": { "1": "stacks/scaling.schema.json" } },
      "docs": { "major": { "1": "stacks/scaling@1.md" } }
    },
    "structured": {
      "title": "Structured",
      "latestMajor": 1,
      "profile": "timed",
      "requires": [],
      "schema": { "major": { "1": "stacks/structured.schema.json" } },
      "docs": { "major": { "1": "stacks/structured@1.md" } }
    },
    "timed": {
      "title": "Timed",
      "latestMajor": 1,
      "profile": "timed",
      "requires": ["structured"],
      "schema": { "major": { "1": "stacks/timed.schema.json" } },
      "docs": { "major": { "1": "stacks/timed@1.md" } }
    },
    "referenced": {
      "title": "Referenced",
      "latestMajor": 1,
      "profile": "timed",
      "requires": ["structured"],
      "schema": { "major": { "1": "stacks/referenced.schema.json" } },
      "docs": { "major": { "1": "stacks/referenced@1.md" } }
    },
    "illustrated": {
      "title": "Illustrated",
      "latestMajor": 1,
      "profile": "illustrated",
      "requires": [],
      "schema": { "major": { "1": "stacks/illustrated.schema.json" } },
      "docs": { "major": { "1": "stacks/illustrated@1.md" } }
    },
    "dietary": {
      "title": "Dietary",
      "latestMajor": 1,
      "profile": "lite",
      "requires": [],
      "schema": { "major": { "1": "stacks/dietary.schema.json" } },
      "docs": { "major": { "1": "stacks/dietary@1.md" } }
    },
    "substitutions": {
      "title": "Substitutions",
      "latestMajor": 1,
      "profile": "lite",
      "requires": ["referenced"],
      "schema": { "major": { "1": "stacks/substitutions.schema.json" } },
      "docs": { "major": { "1": "stacks/substitutions@1.md" } }
    },
    "techniques": {
      "title": "Techniques",
      "latestMajor": 1,
      "profile": "lite",
      "requires": [],
      "schema": { "major": { "1": "stacks/techniques.schema.json" } },
      "docs": { "major": { "1": "stacks/techniques@1.md" } }
    },
    "storage": {
      "title": "Storage",
      "latestMajor": 1,
      "profile": "lite",
      "requires": [],
      "schema": { "major": { "1": "stacks/storage.schema.json" } },
      "docs": { "major": { "1": "stacks/storage@1.md" } }
    },
    "compute": {
      "title": "Compute",
      "latestMajor": 1,
      "profile": "lite",
      "requires": ["quantified", "timed"],
      "schema": { "major": { "1": "stacks/compute.schema.json" } },
      "docs": { "major": { "1": "stacks/compute@1.md" } }
    },
    "equipment": {
      "title": "Equipment",
      "latestMajor": 1,
      "profile": "lite",
      "requires": [],
      "schema": { "major": { "1": "stacks/equipment.schema.json" } },
      "docs": { "major": { "1": "stacks/equipment@1.md" } }
    },
    "prep": {
      "title": "Prep",
      "latestMajor": 1,
      "profile": "lite",
      "requires": [],
      "schema": { "major": { "1": "stacks/prep.schema.json" } },
      "docs": { "major": { "1": "stacks/prep@1.md" } }
    }
  }
}
  
```

### FILE: `stacks/scaling.schema.json`

* bytes: 3121
* sha256: 781ad1aebdd6c366839abac53c0ed7f9fa37483d8d9a43a80327d3dd87623ba3

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/scaling.schema.json",
  "title": "Scaling Stack",
  "type": "object",
  "properties": {
    "ingredients": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/ingredient" },
          { "$ref": "#/$defs/ingredientSection" }
        ]
      }
    },
    "scaling": {
      "type": "object",
      "properties": {
        "discrete": {
          "type": "object",
          "properties": {
            "min": { "type": "integer", "minimum": 1 },
            "max": { "type": "integer", "minimum": 1 },
            "step": { "type": "integer", "minimum": 1 },
            "metadata": { "type": "object", "additionalProperties": true }
          },
          "required": ["min", "max"],
          "additionalProperties": false,
          "patternProperties": {
            "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["discrete"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "required": ["ingredients", "scaling"],
  "$defs": {
    "ingredient": {
      "type": "object",
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "quantity": { "$ref": "../defs/quantity.schema.json" },
        "temperature": { "$ref": "../defs/temperature.schema.json" },
        "notes": { "type": "string" },
        "prep": {
          "oneOf": [
            { "type": "string", "minLength": 1 },
            {
              "type": "array",
              "minItems": 1,
              "items": {
                "anyOf": [
                  { "type": "string", "minLength": 1 },
                  { "$ref": "../stacks/prep.schema.json#/$defs/prepItem" }
                ]
              }
            }
          ]
        },
        "metadata": { "type": "object", "additionalProperties": true },
        "scaling": { "$ref": "../defs/scalingRule.schema.json" }
      },
      "required": ["id", "name", "quantity"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "ingredientSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "ingredients": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/ingredient" },
              { "$ref": "#/$defs/ingredientSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "ingredients"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `stacks/scaling@1.md`

* bytes: 4608
* sha256: 0e17577b4124e78dfce60efa5d2f9591fcf9607c83d5c0aab3d7f1fca252ea67

```
#scaling@1

---

## Purpose

The `scaling@1` stack standardizes how ingredient quantities change when a recipe is scaled, so independent implementations produce consistent results.

This stack is intended to support the **Scalable** profile.

---

## Requirements

A document that declares `scaling@1`:

• MUST declare `quantified@1`.
• SHOULD declare `structured@1` (recommended for stable ingredient IDs).
• MUST satisfy all structural rules enabled by this stack.
• MUST satisfy the semantic rules described below.

---

## Data Model

When `scaling@1` is declared, quantified ingredients MAY include an optional `scaling` field.

Field
ingredient.scaling : ScalingRule

ScalingRule is defined in `defs/scalingRule.schema.json` and is a closed object with a required `mode`.

---

## Scaling Modes

### linear

Multiply the ingredient quantity by the scale factor.

mode = "linear"

If `scaling` is omitted, implementations MUST treat the ingredient as linear by default.

---

### fixed

Do not scale this ingredient quantity.

Examples:
• 1 bay leaf
• 1 cinnamon stick
• 1 pan

mode = "fixed"

---

### discrete

Scale using discrete increments (for example, whole eggs), with optional rounding and bounds.

Fields
• mode = "discrete"
• step (optional, > 0): discrete increment size
• rounding (optional): nearest | ceil | floor
• min (optional): minimum allowed result
• max (optional): maximum allowed result

Semantic defaults
• If step is not present, default is 1
• If rounding is not present, default is nearest

---

### toTaste

Quantity is informational and MUST NOT be mechanically scaled.

Examples:
• salt to taste
• pepper to taste

mode = "toTaste"

---

### bakersPercent

Represents the ingredient quantity as a baker’s percentage of a base ingredient (typically flour).

Fields
• mode = "bakersPercent"
• percent (> 0): percentage value (for example, 70 for 70%)
• of (string): ingredient id of the base ingredient

---

## Scale Factor

Scaling is applied using a scale factor F.

How F is selected depends on the consumer implementation:

• Some consumers may accept an explicit factor (for example, “2x”).
• Some consumers may compute F from yield changes (for example, “scale from 4 servings to 6 servings”).

This stack standardizes how ingredient rules respond to F, not how F is chosen.

---

## Semantic Validation Rules (Normative)

Validators MUST enforce the following rules:

1. Prerequisite
   If `scaling@1` is declared, `quantified@1` MUST also be declared.

2. Baker’s percent reference
   For mode = "bakersPercent", the `of` field MUST resolve to an existing ingredient id.

3. Discrete sanity
   For mode = "discrete", if both `min` and `max` are present, min MUST be less than or equal to max.

4. Closed rule objects
   ScalingRule MUST NOT contain unspecified fields. This is enforced by schema.

Consumers MUST apply the following semantic defaults:

• Missing `scaling` ⇒ treat as linear
• discrete.step default = 1
• discrete.rounding default = nearest

---

## Scaling Behavior (Normative)

Given an ingredient with base quantity amount A and scale factor F:

• linear
scaled amount = A × F

• fixed
scaled amount = A

• toTaste
scaled amount = A (informational only)
Consumers MAY hide numeric scaling UI for this item.

• discrete

1. raw = A × F
2. if step is present, units = raw ÷ step
3. apply rounding to units
4. scaled = units × step
5. clamp to min / max if present

• bakersPercent

1. let B be the amount of the ingredient referenced by `of`
2. scaled amount = B × (percent ÷ 100)

---

## Examples

Linear (default)

Ingredient
id: i_sugar
name: Sugar
quantity: 100 g
(no scaling field → treated as linear)

---

Fixed

Ingredient
id: i_bayleaf
name: Bay leaf
quantity: 1 leaf
scaling: mode = fixed

---

Discrete (eggs)

Ingredient
id: i_eggs
name: Eggs
quantity: 2 egg
scaling: mode = discrete, rounding = ceil

---

To taste

Ingredient
id: i_salt
name: Salt
quantity: 1 tsp
scaling: mode = toTaste

---

Baker’s percent

Ingredient A
id: i_flour
name: Flour
quantity: 500 g

Ingredient B
id: i_water
name: Water
quantity: 350 g
scaling: mode = bakersPercent, percent = 70, of = i_flour

---

## Fixtures

Implementations SHOULD include fixtures covering:

Valid cases
• linear default (no scaling rule)
• discrete with rounding
• fixed
• toTaste
• bakersPercent with resolvable `of`

Invalid cases
• scaling declared without quantified
• bakersPercent with missing or invalid `of`
• invalid rounding value
• discrete with min greater than max

```

### FILE: `stacks/storage.schema.json`

* bytes: 4162
* sha256: cd4536cfc7ba51f0690d88db184f599dc68d9e6b16d90cba4fcbfe4365882835

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/storage.schema.json",
  "title": "Storage Stack",
  "type": "object",
  "properties": {
    "storage": {
      "type": "object",
      "properties": {
        "roomTemp": { "$ref": "#/$defs/storageMethod" },
        "refrigerated": { "$ref": "#/$defs/storageMethod" },
        "frozen": { "$ref": "#/$defs/storageMethod" },
        "leftovers": { "$ref": "#/$defs/leftovers" },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "anyOf": [
        { "required": ["roomTemp"] },
        { "required": ["refrigerated"] },
        { "required": ["frozen"] }
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "required": ["storage"],
  "$defs": {
    "storageMethod": {
      "type": "object",
      "properties": {
        "duration": { "$ref": "../defs/duration.schema.json#/properties/StorageDuration" },
        "notes": { "type": "string" },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["duration"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "reheatDuration": {
      "type": "object",
      "properties": {
        "minMinutes": { "type": "integer", "minimum": 0 },
        "maxMinutes": { "type": "integer", "minimum": 0 }
      },
      "anyOf": [
        { "required": ["minMinutes"] },
        { "required": ["maxMinutes"] }
      ],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "reheatInstruction": {
      "type": "object",
      "properties": {
        "method": { "type": "string", "minLength": 1 },
        "temp": {
          "type": "object",
          "properties": {
            "value": { "type": "number" },
            "unit": { "type": "string", "enum": ["F", "C"] }
          },
          "required": ["value", "unit"],
          "additionalProperties": false,
          "patternProperties": {
            "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
          }
        },
        "duration": { "$ref": "#/$defs/reheatDuration" },
        "notes": { "type": "string" }
      },
      "required": ["method"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "portioning": {
      "type": "object",
      "properties": {
        "notes": { "type": "string" },
        "recommendedPortion": {
          "type": "object",
          "properties": {
            "quantity": { "type": "number" },
            "unit": { "type": "string" }
          },
          "required": ["quantity", "unit"],
          "additionalProperties": false,
          "patternProperties": {
            "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
          }
        }
      },
      "required": ["notes"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    },
    "leftovers": {
      "type": "object",
      "properties": {
        "notes": { "type": "string" },
        "reheat": {
          "oneOf": [
            {
              "type": "array",
              "items": { "type": "string" },
              "minItems": 1
            },
            {
              "type": "array",
              "items": { "$ref": "#/$defs/reheatInstruction" },
              "minItems": 1
            }
          ]
        },
        "portioning": { "$ref": "#/$defs/portioning" }
      },
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `stacks/storage@1.md`

* bytes: 6194
* sha256: 8426e911695e47cccf43b2e44a04412926709c5254f452804428fbc6521615c1

```
#storage@1

---

## Purpose

The `storage@1` stack enables recipes to declare storage conditions and duration for prepared dishes, with optional leftovers and reheating guidance.

This stack is adoption-first: storage can be declared with minimal information, or extended with detailed leftovers and reheating instructions.

---

## Requirements

A document that declares `storage@1`:

• MUST satisfy all structural rules enabled by this stack.
• MUST satisfy the semantic rules described below.

---

## Data Model

When `storage@1` is declared, the document MUST include a top-level `storage` object.

### Storage Object

The `storage` object MUST include exactly one of:
• `roomTemp`: storage at room temperature
• `refrigerated`: storage in refrigeration
• `frozen`: storage in freezing conditions

Each storage method is a `storageMethod` object with:
• `duration` (required): ISO 8601 duration string (pattern `^P`)
• `notes` (optional): string
• `metadata` (optional): object

### Leftovers and Reheating

The `storage` object MAY include an optional `leftovers` field for leftovers and reheating guidance.

---

## Leftovers and Reheating

The `leftovers` object supports:

• `notes` (optional): string with general guidance
• `reheat` (optional): array of reheating instructions (see below)
• `portioning` (optional): portion guidance object

### Reheat Field

The `reheat` field supports two formats:

#### Simple (Array of Strings)

An array of freeform string instructions:

```json
{
  "storage": {
    "refrigerated": {
      "duration": { "iso8601": "P4D" }
    },
    "leftovers": {
      "notes": "Store in an airtight container.",
      "reheat": [
        "Microwave 2–3 minutes, stirring halfway.",
        "Or warm in a skillet over medium heat with a splash of water."
      ]
    }
  }
}
```

#### Structured (Array of Objects)

An array of structured reheating instruction objects:

```json
{
  "storage": {
    "frozen": {
      "duration": { "iso8601": "P2M" }
    },
    "leftovers": {
      "portioning": { "notes": "Cool completely, then portion into containers." },
      "reheat": [
        {
          "method": "microwave",
          "duration": { "minMinutes": 2, "maxMinutes": 3 },
          "notes": "Stir halfway."
        },
        {
          "method": "oven",
          "temp": { "value": 350, "unit": "F" },
          "notes": "Cover and heat until hot throughout."
        }
      ]
    }
  }
}
```

### Reheat Instruction Object

Each structured reheating instruction includes:

• `method` (required): string describing the reheating method (freeform in v1)
• `temp` (optional): object with `value` (number) and `unit` ("F" or "C")
• `duration` (optional): object with `minMinutes` and/or `maxMinutes` (integers >= 0)
• `notes` (optional): string

### Reheat Duration

The `duration` object supports:
• `minMinutes` (optional): integer >= 0
• `maxMinutes` (optional): integer >= 0
• At least one of `minMinutes` or `maxMinutes` must be present

If both are present, `minMinutes` should be <= `maxMinutes` (semantic validation may enforce this in tooling).

### Portioning

The `portioning` object includes:
• `notes` (required): string with portioning guidance
• `recommendedPortion` (optional): object with `quantity` (number) and `unit` (string)

---

## Semantics

### Storage Methods

Storage methods (`roomTemp`, `refrigerated`, `frozen`) are mutually exclusive. Exactly one must be present.

### Reheat Method

The `method` field in structured reheating instructions is freeform in v1. Consumers may map common values (e.g., "microwave", "oven", "stovetop") to display or planning features, but validation does not enforce specific values.

### Scaling

If no scaling factor exists in the document, leftovers guidance does not change. Leftovers guidance is not scaled by recipe scale factors.

---

## Composition

The storage stack is composable with other stacks:

• No hard dependency on other stacks
• Remains monotonic: does not close objects needed by other stacks
• `leftovers` is optional even when the stack is present

---

## Semantic Validation Rules (Normative)

Validators MUST enforce the following rules:

1. Storage method requirement
   The `storage` object MUST include exactly one of `roomTemp`, `refrigerated`, or `frozen`.

2. Duration requirement
   Each storage method object MUST include a `duration` field.

3. Reheat instruction method requirement
   If `leftovers.reheat` includes structured instruction objects, each object MUST include a `method` field.

4. Reheat duration validation
   If a `reheatInstruction.duration` includes both `minMinutes` and `maxMinutes`, `minMinutes` SHOULD be <= `maxMinutes` (tooling may warn but not fail validation).

---

## Examples

Minimal storage

```json
{
  "storage": {
    "refrigerated": {
      "duration": { "iso8601": "P3D" }
    }
  }
}
```

Storage with simple leftovers

```json
{
  "storage": {
    "refrigerated": {
      "duration": { "iso8601": "P4D" }
    },
    "leftovers": {
      "notes": "Store in an airtight container.",
      "reheat": [
        "Microwave 2–3 minutes, stirring halfway.",
        "Or warm in a skillet over medium heat with a splash of water."
      ]
    }
  }
}
```

Storage with structured reheating

```json
{
  "storage": {
    "frozen": {
      "duration": { "iso8601": "P2M" }
    },
    "leftovers": {
      "portioning": { "notes": "Cool completely, then portion into containers." },
      "reheat": [
        {
          "method": "microwave",
          "duration": { "minMinutes": 2, "maxMinutes": 3 },
          "notes": "Stir halfway."
        },
        {
          "method": "oven",
          "temp": { "value": 350, "unit": "F" },
          "notes": "Cover and heat until hot throughout."
        }
      ]
    }
  }
}
```

Storage with portioning

```json
{
  "storage": {
    "refrigerated": {
      "duration": { "iso8601": "P5D" }
    },
    "leftovers": {
      "portioning": {
        "notes": "Portion into individual servings before storing.",
        "recommendedPortion": {
          "quantity": 1,
          "unit": "cup"
        }
      }
    }
  }
}
```


```

### FILE: `stacks/structured.schema.json`

* bytes: 1229
* sha256: 35c0c38647c1e3ccbe1f522c861cc0f72ca0d2675339a1e90cc5e159d121eec2

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/structured.schema.json",
  "title": "Structured Stack",
  "type": "object",
  "properties": {
    "instructions": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/step" },
          { "$ref": "#/$defs/stepSection" }
        ]
      }
    }
  },
  "required": ["instructions"],
  "$defs": {
    "step": {
      "allOf": [
        { "$ref": "../defs/entities.schema.json#/$defs/StepBase" },
        { "required": ["id"] }
      ]
    },
    "stepSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/step" },
              { "$ref": "#/$defs/stepSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "steps"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  },
  "additionalProperties": false
}

```

### FILE: `stacks/structured@1.md`

* bytes: 936
* sha256: 0145ab1101443210a0385c33b63af1c9eab632fd2f058f8c705d3ef6ce76489c

```
# structured@1

## Purpose
The `structured@1` stack requires that instruction steps are structured objects with stable IDs, enabling cross-referencing, timing, and programmatic manipulation.

## Adds
- Top-level `instructions` array with structured step objects containing `id` and `text` fields.
- Steps may include `dependsOn`, `inputs`, `techniqueIds`, `usesEquipment`, `temperature`, `timing`, `images`, `videos`, and `metadata`.
- Support for nested step sections.

## Requires
- None

## Semantics
- MUST: Each step object must include `id` and `text` fields.
- MUST: Step IDs must be unique within the instructions array.
- NOTE: This stack is a prerequisite for `timed@1` and `referenced@1`.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Required by `timed@1` and `referenced@1`. Enables equipment references when combined with `equipment@1`.




```

### FILE: `stacks/substitutions.schema.json`

* bytes: 1382
* sha256: 6a44148c4e4b63732c8db377e148d270c6b3f472b9c3b97e62f8d2149318f888

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/substitutions.schema.json",
  "title": "Substitutions Stack",
  "type": "object",
  "properties": {
    "substitutions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "for": { "type": "string" },
          "alternatives": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "name": { "type": "string" },
                "ratio": { "type": "string" },
                "metadata": { "type": "object", "additionalProperties": true }
              },
              "required": ["name", "ratio"],
              "additionalProperties": false,
              "patternProperties": {
                "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
              }
            },
            "minItems": 1
          },
          "metadata": { "type": "object", "additionalProperties": true }
        },
        "required": ["for", "alternatives"],
        "additionalProperties": false,
        "patternProperties": {
          "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
        }
      },
      "minItems": 1
    }
  },
  "required": ["substitutions"],
  "additionalProperties": false
}

```

### FILE: `stacks/substitutions@1.md`

* bytes: 895
* sha256: e4e2bcee3348607eb0855ed6da5faa339500f1e8941c753c51f98ed48846bd52

```
# substitutions@1

## Purpose
The `substitutions@1` stack enables recipes to declare ingredient substitutions with alternatives and ratios.

## Adds
- Top-level `substitutions` array with substitution objects.
- Each substitution includes `for` (ingredient ID) and `alternatives` array.
- Each alternative includes `name` and `ratio` fields.

## Requires
- `referenced@1`

## Semantics
- MUST: The `for` field must reference an ingredient ID that exists in the ingredients array.
- MUST: Each substitution must include at least one alternative.
- NOTE: This stack requires `referenced@1` to ensure ingredient IDs are available for reference.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Requires `referenced@1` for ingredient ID resolution. Substitutions are informational and do not affect recipe structure.




```

### FILE: `stacks/techniques.schema.json`

* bytes: 824
* sha256: a72da1bfcb91d8422e4ae934fe9be38d2a20b728b9eaa5374b8017c09c70f999

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/techniques.schema.json",
  "title": "Techniques Stack",
  "type": "object",
  "properties": {
    "techniques": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "description": { "type": "string" },
          "metadata": { "type": "object", "additionalProperties": true }
        },
        "required": ["id", "name"],
        "additionalProperties": false,
        "patternProperties": {
          "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
        }
      },
      "minItems": 1
    }
  },
  "required": ["techniques"],
  "additionalProperties": false
}

```

### FILE: `stacks/techniques@1.md`

* bytes: 806
* sha256: abc987c050761481754873d31969b10260f8672b5325e08d664fec17a4b11776

```
# techniques@1

## Purpose
The `techniques@1` stack enables recipes to declare cooking techniques used in the recipe, with optional descriptions.

## Adds
- Top-level `techniques` array with technique objects.
- Each technique includes `id` and `name` fields, with optional `description` and `metadata`.

## Requires
- None

## Semantics
- MUST: The `techniques` array must contain at least one technique.
- MUST: Each technique must include `id` and `name` fields.
- NOTE: Technique IDs may be referenced in step `techniqueIds` arrays when `structured@1` is present.

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Works with `structured@1` to enable step-level technique references. No hard dependencies on other stacks.




```

### FILE: `stacks/timed.schema.json`

* bytes: 1640
* sha256: d3a1b610f9de9f844d859fbfd5ca7c3f7fb9ea30a7b29c4a40bda001e4ab0229

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://soustack.spec/stacks/timed.schema.json",
  "title": "Timed Stack",
  "type": "object",
  "properties": {
    "instructions": {
      "type": "array",
      "items": {
        "anyOf": [
          { "$ref": "#/$defs/timedStep" },
          { "$ref": "#/$defs/timedStepSection" }
        ]
      }
    }
  },
  "required": ["instructions"],
  "allOf": [
    { "$ref": "./structured.schema.json" }
  ],
  "$defs": {
    "timedStep": {
      "allOf": [
        { "$ref": "../defs/entities.schema.json#/$defs/StepBase" },
        {
          "properties": {
            "timing": {
              "allOf": [
                { "$ref": "../defs/entities.schema.json#/$defs/StepBase/properties/timing" },
                { "required": ["activity"], "anyOf": [ { "required": ["duration"] }, { "required": ["completionCue"] } ] }
              ]
            }
          },
          "required": ["id", "timing"]
        }
      ]
    },
    "timedStepSection": {
      "type": "object",
      "properties": {
        "section": { "type": "string" },
        "steps": {
          "type": "array",
          "items": {
            "anyOf": [
              { "$ref": "#/$defs/timedStep" },
              { "$ref": "#/$defs/timedStepSection" }
            ]
          }
        },
        "metadata": { "type": "object", "additionalProperties": true }
      },
      "required": ["section", "steps"],
      "additionalProperties": false,
      "patternProperties": {
        "^x-": { "$ref": "../defs/common.schema.json#/properties/extensionLaneValue" }
      }
    }
  }
}

```

### FILE: `stacks/timed@1.md`

* bytes: 868
* sha256: 0cd02b105ac17a9ae250ff49613c6e149a9bbf3f836131d9c049e94ab82b12a6

```
# timed@1

## Purpose
The `timed@1` stack enables recipes to include timing information for steps, supporting scheduling and time-based planning.

## Adds
- Step objects must include a `timing` field with `activity` (active/passive) and either `duration` or `completionCue`.
- Timing may include duration ranges (minMinutes/maxMinutes) or completion cues.

## Requires
- `structured@1`

## Semantics
- MUST: Each step must include a `timing` object with `activity` field.
- MUST: Each timing object must include either `duration` or `completionCue`.
- NOTE: This stack implies `structured@1` (steps are objects with IDs).

## Composition Notes
- This stack is monotonic: it adds requirements or fields without removing expressiveness.
- Interaction: Required by `compute@1` for deterministic scheduling. Works with `quantified@1` for computational recipe planning.




```


## Summary

Included files: 94
Skipped files: 2
Total included bytes: 248522

### Skipped (top reasons)

* matches ignore pattern or binary extension: 2 file(s)


### Skipped (sample)

* `.DS_Store`: matches ignore pattern or binary extension
* `package-lock.json`: matches ignore pattern or binary extension


```


## Summary

Included files: 95
Skipped files: 2
Total included bytes: 515023

### Skipped (top reasons)

* matches ignore pattern or binary extension: 2 file(s)


### Skipped (sample)

* `.DS_Store`: matches ignore pattern or binary extension
* `package-lock.json`: matches ignore pattern or binary extension

