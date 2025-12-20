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

### Profile: Equipped

**Purpose:** Declare required tools/equipment.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `equipment@1`.

---

### Profile: Prepped

**Purpose:** Prep guidance and/or mise en place tasks.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `prep@1`.

---

### Profile: Timed

**Purpose:** Step-level timing.

**Requirements**

* `level` MUST be `base`.
* `stacks[]` MUST include `structured@1` and `timed@1`.

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
| **Base** | lite | — | Minimum cookable baseline |
| **Equipped** | base | equipment | Recipe declares required tools/equipment. |
| **Illustrated** | base | illustrated | Media present |
| **Lite** | — | — | Lowest-friction publishing |
| **Prepped** | base | prep | Recipe includes prep guidance and/or mise en place tasks. |
| **Scalable** | base | quantified, scaling | Quantified + scaling |
| **Timed** | base | structured, timed | Structured + timed |

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
