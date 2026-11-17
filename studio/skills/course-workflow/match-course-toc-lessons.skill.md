# Match Course TOC Lessons

> **Current Lesson production handoff:** [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md) uses one verified UUID-linked Draft Lesson PR and #639's Course–Lesson marker. New Lesson Production Issues are retired; historical Issue evidence is preserved. The current Course Flow governs Course inventory; historical Issue evidence remains recoverable and cannot create a new production tracker.

> **New Course production:** [Create Course Flow](./create-course-flow.skill.md) is the authoritative seven-stage coordinator. For a new Course, Stage 1–2 use the temporary editorial `course.yaml`, Stage 3 introduces Lesson slots, and Stage 5 materializes durable `methodology.md` and technical Course sources. The legacy paths and prerequisites described below remain for independent maintenance of previously authored Courses; they do not override the new flow.

**Mandatory first action:** Read the [Methodologist Persona](../../personas/methodist.persona.md) in full, [Course TOC](./create-course-toc.skill.md), [Create Lesson Brief](../lesson-workflow/create-lesson-brief.skill.md), [Lesson editorial ownership](../../docs/architecture/lesson-editorial-document.md) and [UUID addressing](../../docs/architecture/entity-uuid-addressing.md) and [Manage Lesson Production](../lesson-workflow/manage-lesson-production.skill.md).

## Purpose, inputs and outputs

For a **bounded group of lesson slots** (Chapter, Module or selected keys) in a Course's existing skill-based `toc.yaml`, find pedagogically suitable implemented Lessons. If none exists, prepare standalone Lesson Methodology drafts. This is a **separate Methodologist task**, not a mandatory follow-on to Course TOC generation.

**Required inputs:** the Course's existing `methodology.md` and `toc.yaml` in `content/<book>/data/courses/<bucket>/<course-id>/`, the textbook's verified English Skill Taxonomy, and actual Lesson references. The Course ID and target Skill IDs must already be known and valid. Don't silently change Course Methodology, skill scope, or sequence.

**Outputs:** update the same `toc.yaml` with one `lessonId` per selected Lesson slot (and optional suitability note); create standalone Methodologist drafts only for genuine gaps; and, for any new implementation, create/reuse a UUID-linked **Draft Lesson PR** via the current Create Lesson Flow; existing historical Production Issues remain evidence only. No Lesson Source/Scene/Question code or new Course TOC is created by this skill.

## Downstream Course configuration

Matching selects or drafts **which** standalone Lesson belongs in each slot; it does **not** author `overrides.yaml`. Some matched Lesson UUIDs are editorial-only and have no runtime parameters or Section slugs. Once actual Lesson Data and any Course scenario sources are ready, use [Review Course Methodology and Configuration](./review-course-methodology.skill.md) to audit the assembled Course and author justified pedagogical overrides. [Scenario Review](./review-course-scenario.skill.md) is conditional on a Course-owned story layer. Neither review is launched automatically by matching.

## Lesson identity (no status flag)

- If an existing implemented Lesson actually suits the audience, depth, prerequisites and **all intended outcomes** of a slot, reuse its canonical `lessonId`.
- If no suitable Lesson exists, mint a permanent Lesson UUID once, place its **standalone** `methodology.md` under `content/<book>/data/lessons/<last-hex-digit>/<uuid>/`, and record the same UUID in `lessonId` in the Course TOC. Until a typed Lesson exists, preserve `lesson.identity.json` containing the UUID and stable slug, per [UUID addressing](../../docs/architecture/entity-uuid-addressing.md).
- If an editorial-only Lesson draft already addresses this need, assess and **reuse its UUID** rather than making another draft. Existing `methodologist-brief.md` is a legacy name for the same editorial artifact; edit it _in place_ if authorized. Never create both brief filenames in one Lesson folder.
- **No `existing`/`proposition` field and no nested methodology in `toc.yaml`.** Implementation is determined by the real Lesson `*.data.ts` source, not an extra flag. `key` is the Course slot identity; `lessonId` is the reusable Lesson identity. No inferred implementation from a folder or YAML field.

## Search helper and PR artifacts

For an **open same-repository PR**, a contributor with verified repository write access may post **exactly one** of these commands as a PR comment:

```text
/get lesson by id <lesson-uuid>
/get lesson by id <lesson-uuid> --package content/math
/get lesson by skill <skill-uuid>
/get lesson by skill <skill-uuid> <skill-uuid> --package content/math
/get lesson by skill <skill-uuid> <skill-uuid> --match all --package content/math
```

The on-demand [Get Lessons by Skill or ID](../../../.github/workflows/get-lesson.yml) workflow checks the exact PR head commit read-only and updates **one bot comment** with matched candidate IDs, status, Skill membership and source links. It also retains a machine-readable JSON artifact for seven days. It becomes available for PR comments **only after the workflow has been merged into the default branch**. The lookup is not automatically executed by Course work and is not a Course or age/standard/title query.

CLI equivalent (no GitHub comments or filesystem writes):

```sh
node shared/engine/scripts/queryLessons/query-lessons.mjs --by skill --skill <uuid> --skill <uuid> --match all --package content/math --format json --stdout
node shared/engine/scripts/queryLessons/query-lessons.mjs --by id --lesson <uuid> --format json --stdout
```

The existing legacy Skill Markdown CLI remains available at `shared/engine/scripts/generateLessonsBySkill/generate-lessons-by-skill.mjs` and shares the improved static index, but lists only implemented Lessons. **Do not assume** the `Agent CI Artifacts` workflow automatically produces `.agent-ci-artifacts/lessons-by-skill` files: the current `.github/workflows/translation-review.yml` does not generate that family. The lookup never adds these files to the PR branch.

Treat the result as a **candidate list**, not a pedagogical acceptance decision. Status `implemented` means a typed Lesson entrypoint was statically resolved; `editorial-draft` means **only `lesson.yaml` was found**, not publishability or approval. Compare Lesson source and methodology against learner audience, prerequisite/depth/outcomes and Course-supported language set. Unknown language coverage is **not** complete language coverage. If `complete: false` or diagnostics are present, **no result is not proof of absence**: inspect the affected package/source before creating a Lesson. Shared Skill IDs do not prove teaching depth, assessment validity or Course suitability.

The PR-scoped reference `.agent-ci-artifacts/assessment-methods/<language>.md` can help evaluate whether existing Lessons' Quiz Sections capture the **specific Skills and outcomes** needed by a Course slot. Its frontend labels follow the chosen locale, while detailed methodological explanations remain English. Compare canonical `AssessmentMethodKey` values with the target cognitive evidence: a Question type alone does not establish pedagogical coverage. For new Lesson drafts, use the [Create Lesson Brief](../lesson-workflow/create-lesson-brief.skill.md) Quiz assessment intent section to explain the need for assessment, selected Methods, targeted Skills and why different Methods may be necessary. This reference is temporary, not the source of truth; if missing, inspect Engine Build contracts and methodological descriptions and UI Kit labels. Do not implement or invent Questions as part of matching.

## Method

1. Read the full Course Methodology and TOC for context, then focus on the requested Chapter/Module/slot subset; do not load hundreds of unrelated Lessons into the prompt. Verify actual Skill definitions and the required learning depth.
2. Query candidate Lessons **by each planned Skill ID**. For multi-Skill slots evaluate the complete required set, not just one matching ID. Read relevant real Lesson source, approved Methodologist brief and sufficient content to judge audience/depth/outcomes/prerequisites/locale suitability. **Check actual `Lesson.parameters.languages`: `Course.supportedLanguages` must be a subset of Lesson-supported languages.** If any Course locale is missing, do not claim the Lesson is usable as-is: record `openIssues.kind: lesson-languages-missing` and exact missing codes. Recommend localizing an otherwise pedagogically suitable existing Lesson rather than unnecessarily duplicating it.
3. Choose an existing Lesson only where evidence supports it. Prefer a reusable Lesson instead of duplicating one; if several Lessons are required, seek permission to split/refine the planned slot rather than dropping a Skill. Avoid reusing the same Lesson multiple times in a Course without pedagogical justification.
4. For a genuine gap, reserve the standalone Lesson UUID once and create/reuse its **Draft Lesson PR** through [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md). The Methodologist authors a **complete** `production.methodology` in the Lesson's **single** temporary `lesson.yaml` using the [methodology completeness contract](../../docs/entities/lesson.md#lesson-methodology-completeness--pedagogical-technical-specification): verified Skill source identities, learner profile, outcomes, substantive concepts/examples/counterexamples, dependencies, misconceptions, depth, accessibility and references. Specify justified `assessmentPlan.quizRequired` with zero/one/more distinct Quiz intents, canonical `AssessmentMethodKey` cognitive operations and exact target Skills. Do **not** create new `methodology.md`, `lesson.identity.json`, old status frontmatter, `content.yaml` or Course narrative. Preserve reviewed older files only as non-destructive migration evidence; retain Course-specific matching rationale in the Course plan.
5. Write back only the selected `lessonId` fields, optional `lessonSelectionNote` and genuine unresolved `openIssues` (including missing candidate Lesson locales); retain original ordered structure, Skill arrays, stable keys and unprocessed slots. Do not add a per-lesson status field.
6. Verify every UUID resolves to its correct bucket; reused Lessons are actually implemented and support the Course locale subset; new Lesson UUIDs have a real `lesson.yaml` and owning Draft PR with adequate `production.methodology`, a supported source locale, intended full language tuple and valid Quiz intent. Validate [course-toc.schema.json](./course-toc.schema.json) only for historical `toc.yaml` work; the new Course Flow uses stage-aware `course.yaml` validation. Do not implement Lessons or edit the catalog automatically.
7. **Draft Lesson PR handoff:** after verifying the matching worklist, apply the [handoff procedure below](#course--lesson-draft-pr-handoff). One reusable Lesson UUID has one linked Draft Lesson PR; matching never automatically starts downstream production.

## Course → Lesson Draft PR handoff

**Current procedure (also for legacy Course matching):** deduplicate genuinely missing standalone Lesson UUIDs across selected slots and create or reuse exactly one Draft Lesson PR per UUID through [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md). Record the Course UUID, matched slot → Lesson UUID map, approved methodology source SHA and the parent Course PR relationship in each Lesson PR. Child PRs target the active Course integration branch when appropriate; use repository labels and existing ownership. The Course coordinator tracks implementation state and exact PR links in its own PR body; do not start a parallel Lesson Production Issue ledger.

An already implemented and pedagogically suitable Lesson is reused without cloning its Source or opening an Issue. Locale-only gaps go through the applicable Translation workflow. Previously opened Lesson Production Issues are historical evidence: inspect and link their real decision/source SHA, reconcile with the Lesson PR, and do not delete their history. If no Lesson implementation is required, create no empty PR. **This handoff does not authorize Screenwriting, generation, translation or publication automatically.** Validate actual source/identity, method completeness and owner authority separately.

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
