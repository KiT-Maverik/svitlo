# Match Course TOC Lessons

**Mandatory first action:** Read the [Methodologist Persona](../../personas/methodist.persona.md) in full, [Course TOC](./create-course-toc.skill.md), [Create Lesson Brief](../lesson-workflow/create-lesson-brief.skill.md), [Lesson editorial ownership](../../docs/architecture/lesson-editorial-document.md) and [UUID addressing](../../docs/architecture/entity-uuid-addressing.md) and [Manage Lesson Production](../lesson-workflow/manage-lesson-production.skill.md).

## Purpose, inputs and outputs

For a **bounded group of lesson slots** (Chapter, Module or selected keys) in a Course's existing skill-based `toc.yaml`, find pedagogically suitable implemented Lessons. If none exists, prepare standalone Lesson Methodology drafts. This is a **separate Methodologist task**, not a mandatory follow-on to Course TOC generation.

**Required inputs:** the Course's existing `methodology.md` and `toc.yaml` in `content/<book>/data/courses/<bucket>/<course-id>/`, the textbook's verified English Skill Taxonomy, and actual Lesson references. The Course ID and target Skill IDs must already be known and valid. Don't silently change Course Methodology, skill scope, or sequence.

**Outputs:** update the same `toc.yaml` with one `lessonId` per selected Lesson slot (and optional suitability note); create standalone Methodologist drafts only for genuine gaps; and, for an **authorized production handoff**, create/reuse **one Lesson Production Issue** for the unique new/unimplemented Lesson UUIDs in the selected batch. No Lesson Source/Scene/Question code or new Course TOC is created by this skill.

## Downstream Course configuration

Matching selects or drafts **which** standalone Lesson belongs in each slot; it does **not** author `overrides.yaml`. Some matched Lesson UUIDs are editorial-only and have no runtime parameters or Section slugs. Once actual Lesson Data and any Course scenario sources are ready, use [Review Course Methodology and Configuration](./review-course-methodology.skill.md) to audit the assembled Course and author justified pedagogical overrides. [Scenario Review](./review-course-scenario.skill.md) is conditional on a Course-owned story layer. Neither review is launched automatically by matching.

## Lesson identity (no status flag)

- If an existing implemented Lesson actually suits the audience, depth, prerequisites and **all intended outcomes** of a slot, reuse its canonical `lessonId`.
- If no suitable Lesson exists, mint a permanent Lesson UUID once, place its **standalone** `methodology.md` under `content/<book>/data/lessons/<last-hex-digit>/<uuid>/`, and record the same UUID in `lessonId` in the Course TOC. Until a typed Lesson exists, preserve `lesson.identity.json` containing the UUID and stable slug, per [UUID addressing](../../docs/architecture/entity-uuid-addressing.md).
- If an editorial-only Lesson draft already addresses this need, assess and **reuse its UUID** rather than making another draft. Existing `methodologist-brief.md` is a legacy name for the same editorial artifact; edit it _in place_ if authorized. Never create both brief filenames in one Lesson folder.
- **No `existing`/`proposition` field and no nested methodology in `toc.yaml`.** Implementation is determined by the real Lesson `*.data.ts` source, not an extra flag. `key` is the Course slot identity; `lessonId` is the reusable Lesson identity. No inferred implementation from a folder or YAML field.

## Search helper and PR artifacts

Generate a **flat Skill UUID lookup** using the real repository tool:

```sh
# Select one Skill without writing files:
node scripts/generate-lessons-by-skill.mjs --skill <skill-uuid> --stdout

# Select multiple Skills for a Chapter or Module:
node scripts/generate-lessons-by-skill.mjs --package content/<book> \
  --skill <uuid-1> --skill <uuid-2> --output .agent-ci-artifacts/lessons-by-skill

# Generate the full available index:
node scripts/generate-lessons-by-skill.mjs --output .agent-ci-artifacts/lessons-by-skill
```

The existing **Agent CI Artifacts** workflow generates `.agent-ci-artifacts/lessons-by-skill/<skill-id>.md` files in PR branches. They are ephemeral and removed before merge; they are **not** a production database. The generator statically parses Skill and Lesson TypeScript source without executing Lesson code. Each file contains candidate Lesson IDs, textbook paths, canonical source links and multi-Skill membership. A Lesson appears in **every** applicable Skill lookup. Use the full Lesson data and Methodology to decide suitability: a shared Skill ID is **not** proof of equal depth, readiness, language availability or pedagogical fit. Index excludes editorial-only Lesson drafts; search the actual draft directories separately before proposing new ones. Treat generator warnings about unsupported dynamic expressions as coverage gaps in the index, not as evidence of no Lesson.

The PR-scoped reference `.agent-ci-artifacts/assessment-methods/<language>.md` can help evaluate whether existing Lessons' Quiz Sections capture the **specific Skills and outcomes** needed by a Course slot. Its frontend labels follow the chosen locale, while detailed methodological explanations remain English. Compare canonical `AssessmentMethodKey` values with the target cognitive evidence: a Question type alone does not establish pedagogical coverage. For new Lesson drafts, use the [Create Lesson Brief](../lesson-workflow/create-lesson-brief.skill.md) Quiz assessment intent section to explain the need for assessment, selected Methods, targeted Skills and why different Methods may be necessary. This reference is temporary, not the source of truth; if missing, inspect Contracts, Engine methodological descriptions and UI Kit labels. Do not implement or invent Questions as part of matching.

## Method

1. Read the full Course Methodology and TOC for context, then focus on the requested Chapter/Module/slot subset; do not load hundreds of unrelated Lessons into the prompt. Verify actual Skill definitions and the required learning depth.
2. Query candidate Lessons **by each planned Skill ID**. For multi-Skill slots evaluate the complete required set, not just one matching ID. Read relevant real Lesson source, approved Methodologist brief and sufficient content to judge audience/depth/outcomes/prerequisites/locale suitability. **Check actual `Lesson.parameters.languages`: `Course.supportedLanguages` must be a subset of Lesson-supported languages.** If any Course locale is missing, do not claim the Lesson is usable as-is: record `openIssues.kind: lesson-languages-missing` and exact missing codes. Recommend localizing an otherwise pedagogically suitable existing Lesson rather than unnecessarily duplicating it.
3. Choose an existing Lesson only where evidence supports it. Prefer a reusable Lesson instead of duplicating one; if several Lessons are required, seek permission to split/refine the planned slot rather than dropping a Skill. Avoid reusing the same Lesson multiple times in a Course without pedagogical justification.
4. For a true gap create the independent Lesson `methodology.md`, following the existing [Create Lesson Brief](../lesson-workflow/create-lesson-brief.skill.md) educational content requirements: learner profile, required competencies, direct verified Skill `*.data.ts` links, observable objectives, conceptual subject matter, dependencies, misconceptions, valid examples, exclusions, accessibility, evidence and open decisions. **Also decide and record `assessmentPlan` as the mandatory Methodologist frontmatter field**, using [its schema](../lesson-workflow/lesson-methodology-frontmatter.schema.json): explicitly `quizRequired: false` with `quizzes: []`, or one or more distinct pedagogically justified Quiz requirements each with verified target Skills and typed `requiredAssessmentMethods` (`AssessmentMethodKey` from Contracts). A Lesson may require multiple Quiz Sections. Do not fabricate assessment method UUIDs, Question types, correct answers, retries or scoring. Preserve Lesson autonomy and do not simply copy the Course's assessment assumptions. Mark `Methodologist status: Draft`. The assessment plan is also **Draft** until Methodologist/editor approval; a Screenwriter must not infer that it is approved from the existence of the Lesson directory. Record editorial YAML frontmatter in the new Lesson `methodology.md`: `documentLanguage` (its actual editorial language, usually English under Create Lesson Brief) and `supportedLanguages` (planned Lesson languages containing **all** Course languages, with extras allowed if explicitly intended). These are **not** proof of implemented translations. Use the intended Course depth to guide the design, but **do not hard-code this Course, its plot or characters** into the Lesson. Record Course-specific fit rationale in `toc.yaml` instead.
5. Write back only the selected `lessonId` fields, optional `lessonSelectionNote` and genuine unresolved `openIssues` (including missing candidate Lesson locales); retain original ordered structure, Skill arrays, stable keys and unprocessed slots. Do not add a per-lesson status field.
6. Verify that every new UUID resolves to the correct bucket with `resolveEntityPath`; every reused UUID resolves to a real implemented Lesson whose languages cover the Course; and every new draft has `methodology.md` and `lesson.identity.json`, with planned Lesson languages and a valid assessment plan declared. Validate YAML against [course-toc.schema.json](./course-toc.schema.json). **Do not** implement Lessons or edit the catalog automatically.
7. **Issue handoff for authorized production:** after verifying the matching worklist, apply the [handoff procedure below](#course--lesson-production-issue-handoff). The handoff is one Issue for the selected new Lesson batch, never an Issue per Lesson or slot. Editorial-only matching ends with an explicit proposed handoff and no auto-start of downstream specialists.

## Course → Lesson Production Issue handoff

**Explicit scope:** The matching operation is independent of Course methodology and TOC authoring. Create/reuse a production Issue **when Lesson production coordination is authorized**, not as an unrequested side effect of course planning. An Issue records the batch and its approvals; it does not authorize Screenwriter, builder, Scene coding, translation or publication to begin.

1. Resolve **all** Lesson slots in the selected Course Chapter/Module/slot subset, then construct a **deduplicated list of existing verified Lesson UUIDs still requiring new Lesson production** (new Lesson drafts and reused editorial-only drafts). Check each `lesson.identity.json`, `methodology.md`, actual implementation state, and bucket path. Multiple Course slots using one standalone Lesson map to **one** Issue row. Exclude already implemented suitable Lessons, even when reused across several slots. A suitable existing Lesson with missing target languages belongs to [Translation Production](../translation-workflow/manage-translation-production.skill.md); retain its exact locale gaps in Course `openIssues` rather than reproducing the Lesson.
2. If the new-production worklist is empty, **do not create an empty Issue**. Report reused Lessons, existing-language gaps, and remaining Course slot blockers. Otherwise, search existing open Lesson Production Issues for overlapping UUIDs and **reuse matching scope** via [Manage Lesson Production](../lesson-workflow/manage-lesson-production.skill.md). Never create duplicate competing Issues or silently expand an established frozen scope; request owner reconciliation for partial overlaps.
3. If no matching Issue exists, create **one standard [Lesson Production Issue](../../../.github/ISSUE_TEMPLATE/lesson-production.yml)** for the entire authorized batch. Populate exact textbook package, ordered unique UUIDs, stable identity paths, Course UUID, Course Methodology and `toc.yaml` **source commit/PR SHA**, matched Module/Chapter/Lesson slot `key` paths → Lesson UUID mapping, links to Methodologist Briefs and matching Draft PR. Course-only fitness rationale stays in `toc.yaml` and provenance, not in standalone Lesson methodology.
4. Initialize each Lesson row from **actual evidence**: a new `Methodologist status: Draft` Brief is `methodology` / `ready-for-review` (or `blocked` if something is missing), **not** approved. An already approved Brief may be queued for the next authorized step. Record approval decision URLs and precise next-action handoff. No automatic approval, no unverified `completed` checkmark.
5. Add the production Issue reference to the Course matching **Draft PR** (use `Refs #N`; never close the Issue with the matching PR), and link that PR/revision back in the Issue. The Issue's frozen UUID scope is independent of later Course TOC revisions. Multiple selected matching batches may have separate nonoverlapping Issues; there is no requirement to create one Issue for the entire Course.
6. After the Issue is linked, stop at the relevant editorial/production gate and hand off to [Lesson Workflow](../lesson-workflow/README.md). **If the user authorized only matching**, or if issue permissions are missing, **report the exact UUID worklist and pending handoff** instead of claiming an Issue was created. Do not ask for a separate user prompt for **each** Lesson within an otherwise authorized batch.

## Example

```yaml
- type: lesson
  key: addition-meaning
  title: 'Додавання'
  objective: "Зрозуміти об'єднання множин"
  skills:
    - id: '00b48cb0-13c2-4531-84ac-1b8d44f11055'
      name: 'Addition — Meaning and models'
      source: content/math/data/skills/arithmetic/addition/skills/addMeaning.data.ts
  lessonId: '<verified-existing-or-new-draft-uuid>'
  lessonSelectionNote: 'Foundational scope and audience fit confirmed'
```

Replace the illustrative placeholder with a real, stable UUID; the final YAML must pass schema validation. The slot's Lesson may be a new editorial draft but is never considered implemented merely because its ID has been allocated.
