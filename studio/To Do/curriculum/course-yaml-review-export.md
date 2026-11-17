# Reconstruct Course Review YAML from Authored Sources

**Status:** Proposed — backlog only; not implemented.
**Area:** curriculum / course authoring / editorial review

## Goal

Provide a **read-only, deterministic export** of an existing Course's **current authored state** into one reviewable `course.yaml`. The exported file should be suitable for methodological review of the **whole Course** and its individual Lessons after initial source generation, without requiring preservation of the original planning YAML.

## Intended authoring lifecycle

1. A Methodologist authors a complete, reviewable **temporary `course.yaml`**, containing Course-level Markdown methodology, planned languages, prerequisites, the ordered Course → Module → Chapter → Lesson structure, localized structural names, verified Skill UUIDs, and **complete Lesson methodological specifications**, including assessment intent.
2. **Commit that YAML to the active Git working branch/PR** so independent agents can read and review the same file and make corrections through Git. The original authoring YAML is authoritative **until generation and verification**, not a permanently maintained second source.
3. After independent editorial approval, a separate authorized generator materializes permanent UUID identities, Course/Module/Chapter configurators and complete Course/Lesson `methodology.md` files. Lesson production proceeds independently from those approved methodological specifications; it must not silently expand their scope.
4. Verify generated destinations and handoffs. **Delete the temporary `course.yaml` in a subsequent commit**; the generated sources become authoritative. The prior YAML remains in ordinary Git history as a consequence of having been reviewed in Git, but no dedicated archived copy, snapshot, or reproduction record is required.
5. In future, run the proposed **reverse exporter** on the current Course sources to produce a fresh `course.yaml` for renewed Course-wide or targeted Lesson methodological review. It represents the current state, **not necessarily an exact reconstruction of the first draft**.

## Desired exporter behavior

- Discover the Course's actual authored configurator and recursively collect Modules, Chapters, and Lesson references in their authoritative `items/order` order. Preserve actual stable UUIDs and slugs in the exported review representation; do not mint or alter identities.
- Read the current Course and standalone Lesson `methodology.md` documents (and other **explicitly approved** methodological sources when relevant). Embed their Markdown verbatim in the appropriate YAML entries rather than losing or summarizing educational requirements.
- Include canonical Skill UUID references and any approved assessment plan, plus current Course prerequisites, scenario mode, locale titles/descriptions, and source-language/planned-language metadata **only where this information is actually available in authoritative sources**.
- Support a single read-only output for a whole Course that can also be scoped for specialist review by Module, Chapter or Lesson. Distinguish a Course-only narrative Episode from reusable Lesson methodology.
- Explicitly report missing methodology, unresolved Lesson references, inconsistent language coverage and references to unavailable Skills. Do not fabricate missing content or claim that published locale coverage follows from a planning tuple.
- Keep the output temporary and reviewable (for example stdout or an ignored/staged file). **Do not automatically commit the reconstructed YAML**, edit sources, overwrite methodological files or replace the underlying TypeScript configurators.
- Maintain separation between this future **exporter**, the proposed initial **Course planning/materialization** workflow, the existing draft-only Course Builder, and Props publication.

## Open decisions

1. Define the **minimal editorial Course YAML schema** and exactly how full Markdown Lesson methodology and `assessmentPlan` are represented without importing runtime-only fields into methodology.
2. Determine the canonical discovery/index mechanism for every Course child and for standalone Lesson methodology. Reconstruct from actual source references rather than a stale manually maintained slug-to-UUID mapping.
3. Determine where planned vs actually supported languages are sourced if current runtime Config omits the original editorial language plan.
4. Decide whether the exported review YAML should be re-importable or strictly **review-only**. Do not promise lossless round-trip until this is specified and tested.
5. Define how to report incomplete draft Lessons, absent generated Course nodes, methodological revisions and Course-specific overrides without silently mutating reusable Lessons.
6. Specify non-destructive CLI ergonomics, ordering, stable serialization, Markdown preservation, and independent approval tracking.

## Acceptance criteria for a future implementation

- The exporter reconstructs the current hierarchy, identities, ordering, locality and available methodology from real authored sources, without needing the original temporary `course.yaml`.
- A repeated export from unchanged sources is byte-for-byte stable; output has valid YAML syntax and no unintended filesystem writes.
- Fixtures cover multiple Modules/Chapters, direct Course/Module Lessons, reused Lessons, missing sources, planned-vs-available locales, and updated Lesson methodologies.
- A reviewer can examine one exported Course YAML for Course-wide coherence or inspect selected nested Lesson specifications, with missing information made explicit.
- No Engine Config, Lesson methodology, assets, review decisions or published Props are modified by export.

**Implementation note:** This is a *future* Studio/Engine tooling proposal. The current Course Builder consumes Config-shaped YAML to generate TypeScript drafts and explicitly does **not** create standalone Lessons; implementing initial planning materialization or reverse export requires separate design and authorization.

**Related:** [Course Workflow](../../skills/course-workflow/README.md), [Course Entity](../../docs/entities/course.md), [YAML Config Scaffolding](../../docs/architecture/yaml-config-scaffolding.md), [Lesson Production Workflow](../../docs/architecture/lesson-production-workflow.md).
