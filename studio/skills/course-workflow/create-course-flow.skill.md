# Create Course Flow

**Role:** durable Course production coordinator (not a standalone authoring persona). This is the canonical entry point for **new** Courses; existing specialized Course Skills remain available for scoped maintenance, subject to this flow's stage order. Before doing anything read root `AGENTS.md` and `README.md`, the Studio rules, the [Course entity](../../docs/entities/course.md), [UUID addressing](../../docs/architecture/entity-uuid-addressing.md), [YAML handoff](../../docs/architecture/yaml-config-scaffolding.md), current Engine Course source/tests and the current GitHub PR/Issue state.

## Principles and authoritative state

- Exactly **one immutable Course UUID** and one **parent integration Draft PR** own one Course production effort. The PR description (not Git-authored Runtime fields, chat history or a second status file) owns progress and next action. Git history, real files, child PRs, Production Issues, and independent reviews provide evidence.
- The temporary editorial `content/<book>/data/courses/<last-hex>/<uuid>/course.yaml` holds planning methodology and structure until Stage 5. It is **not** the Config-shaped technical `config.yaml`, and it does not become permanent parallel state. After verified materialization, durable methodology lives in `methodology.md`.
- Methodology decides **what, why, depth and order**. No Scenario question or mode is asked in Stages 1–2; no Episodes, Scene scripts, dialogues, UI, Questions or scoring schemes are authored there. A separate optional Screenwriter workflow may later create Experiences; it cannot hold up methodological Stage 4 solely for missing plot.
- Standalone Lessons are reusable, neutral, UUID-addressed entities with separate Lesson Production and Translation Production approvals. Course nodes only reference their IDs. Never copy or create a Lesson implementation from Course Builder or add `courseId` to Lesson Config/Props.
- Completion is always tied to an actual source SHA and documented evidence. A checkmark means **independently verified stage acceptance**, not an agent's optimistic status message.

## Starting or resuming by PR number

1. Inspect the exact PR number, complete body, labels, head/base branches, linked subtask PRs, relevant Lesson/Translation Production Issues, comments, reviewer decisions, CI/check suites and immutable head SHA. Do not assume chat history or an old checklist is current.
2. Read the source hierarchy at the UUID bucket path. Before Stage 5 inspect `course.yaml`; after Stage 5 inspect permanent Course source and optional technical `config.yaml`. During transition compare both inventories. Inspect any claimed Lesson sources in their independent UUID directories.
3. **Reconcile** each Course stage, Module subtask and target locale against Git evidence/review approvals. Record the SHA, blocker, owner, links and exact next authorized action; check conflicts or stale authoring/review. Never auto-approve an editorial review.
4. Continue the **first authorized unfinished unit** (or an independently scoped Module/locale in an assigned agent-subtask PR). A parent coordinating agent is the only editor of the manually maintained PR checklist; do not overwrite concurrent edits. Child PRs target the parent branch and use `pr: agent-subtask`; parent has `pr: integration`.
5. Refresh the managed Lessons section **separately** from the manual checklist. The synchronizer may modify only `<!-- svitlo-course-lessons:start -->` ... `<!-- svitlo-course-lessons:end -->`, and must fail closed if sentinels are missing, repeated or imbalanced. The Course plan Stage 3 can be complete while some implementation PRs are still Draft.

## Seven-stage progression

Every stage uses five statuses: **not started** (no verified work), **in progress** (partial verified outputs), **blocked** (precise missing dependency or decision and next action), **completed** (all acceptance criteria met at a recorded SHA), **stale** (previous evidence no longer applies). Track blocking reason and next action; a Stage may be marked complete only when its declared deliverables are verified.

### 1. Create Course Methodology — whole Course

**Owner:** [Methodologist](../../personas/methodist.persona.md). **Skills:** [Create Course Methodology](./create-course-methodology.skill.md), [Skill Taxonomy Workflow](../skill-taxonomy-workflow/README.md). **Prerequisites:** approved Course intent; real target textbook/package; verified Course identity or authorization to create one.

Interview the owner about identity, target audience (preschool through adult), level, entry knowledge, outcomes, scope/depth, teaching approach, accessibility, source language, target languages and _specific_ standards versions where relevant. Do **not** ask about `scenarioMode` or choose a story. Keep legacy technical scenario fields untouched if editing an existing Course.

Use `resolveEntityPath` for Course UUID location; initialize the parent Draft PR with the tracker below and correct GitHub labels. Generate an English taxonomy view read-only with:
`node shared/engine/scripts/generateSkillsTaxonomy/generate-skills-taxonomy.mjs --package content/<book> --locale en --stdout`.
Verify exact Skill/Group/Domain UUIDs against source. Distinguish **entry prerequisites** from **skills to be taught**; Domain/Group scope signals intent, not every member's guaranteed mastery. Record standards alignment evidence (jurisdiction, version, source, intended/partial/verified) without claiming certification. Declare `documentLanguage` separately from planned `supportedLanguages`; no fake translations.

**Output:** commit one temporary editorial `course.yaml` containing immutable ID, broad rationale and outcomes/prerequisite taxonomy scope, language intent, audience, standards evidence and open questions. No permanent `methodology.md` and no Lesson slots yet. **Complete** only after editor confirms breadth and actual taxonomy references at a recorded SHA. **Handoff:** macrostructure.

### 2. Design Course Structure — whole Course

**Owner:** [Methodologist](../../personas/methodist.persona.md). **Skill:** [Create Course TOC](./create-course-toc.skill.md) in its **macrostructure-only** mode. **Prerequisite:** accepted Stage 1 methodological scope.

In the _same_ `course.yaml`, author ordered Course/Module/Chapter groups, stable keys/slugs, measurable outcomes, rationale, prerequisites, scope distribution and depth. Course may have direct Chapters or Lessons; Modules may have Chapters and/or Lessons; Chapters may have Lessons. Do not add wrapper Modules solely for bookkeeping. **No Lesson slots, Lesson queries, Episodes, scenario decisions or Screenwriter here.** Module/Chapter methodology is editorial, not an extra Runtime Props field.

**Complete:** accepted entire macrostructure with no unresolved ordering/coverage decision. **Handoff:** bounded Module-specific Lesson design; if no Modules, use bounded Course/Chapter units.

For the temporary editorial source, run the **read-only stage validator**:
`node shared/engine/scripts/validateCourseFlow/validate-course-flow.mjs --file content/<book>/data/courses/<bucket>/<uuid>/course.yaml --stage 2`. Stage 1 uses `--stage 1`, Stage 3 work-in-progress uses `--stage 3`, and only an entirely identified Lesson plan may use `--stage 3-complete`. The manually maintained editorial schema is `course-flow.schema.json`; Engine technical `config.yaml` is validated separately using Engine-derived schemas. YAML validity never constitutes editorial approval.

### 3. Design & Match Lessons — each Module (or bounded alternative)

**Owner:** [Methodologist](../../personas/methodist.persona.md); [Assessment Architect](../../personas/learning-assessment-architect.persona.md) reviews assessment intent. **Skills:** [Create Course TOC](./create-course-toc.skill.md) for slots, [Match Course TOC Lessons](./match-course-toc-lessons.skill.md), [Create Lesson Brief](../lesson-workflow/create-lesson-brief.skill.md), [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md) for Lesson PR handoffs; [Manage Lesson Production](../lesson-workflow/manage-lesson-production.skill.md) only for historical Issue reconciliation. **Prerequisite:** accepted Stage 2 unit structure.

For **each** Module/selected bounded unit, perform these three tasks **in order**:

1. **Design Lesson slots.** Choose stable slot keys, observable learner outcomes, depth, sequence rationale, exact verified Skill IDs and prerequisites. This is the first stage where slots exist.
2. **Match existing Lessons.** Use read-only `/get lesson by skill <uuid> --package content/<book>` on an authorized open PR. The default-branch feature from merged PR #638 also supports `/get lesson by id <uuid>` and multi-Skill `--match all`. If the workflow is unavailable or not operational, use `node shared/engine/scripts/queryLessons/query-lessons.mjs --by skill --skill <uuid> --package content/<book> --format json --stdout` and report completeness diagnostics. Compare candidate methodology, implementation vs draft status, real supported languages, prerequisite fit and assessment coverage. `complete: false` is not evidence of absence. Reuse the existing Lesson UUID; absent target translation is a Lesson Translation Production dependency, not a duplicate Lesson.
3. **Prepare missing Lesson methodologies only.** For genuinely missing Lessons, authorize unique reusable Lesson UUIDs and author/reuse complete Methodologist material in each Lesson's single temporary `lesson.yaml` under `production.methodology`, with verified Skills, independent prerequisites, educational plan and `assessmentPlan` (possibly several Quizzes). The later Lesson Stage 1 assesses that methodology for completeness; do not pre-generate a competing standalone `methodology.md` or imply an artificial `Approved` frontmatter gate. For each genuinely missing Lesson UUID, create or reuse exactly one linked Draft Lesson PR through [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md). Historical Lesson Production Issues remain evidence, not a mandatory new coordinator. Do not implement Lesson data in Course files.

The parent PR must show per-Module three checkboxes, child Draft PR/Issue links, verified SHA, unresolved blockers and the next action. Parallel Module subtasks must have disjoint paths and target the Course parent branch. The stage can complete **before** independent Lesson implementation PRs merge: that distinct status belongs in the automatically refreshed **Lessons** block.

**Complete:** all Module units have approved slots, verified match decisions and complete missing Lesson methodology handoffs; ambiguities are resolved or explicitly block affected units. **Handoff:** independent Course-wide plan review.

### 4. Review Course Plan — whole Course

**Owner:** independent [Methodologist reviewer](../../personas/methodist.persona.md), not the author of the material under review. **Skill:** [Review Course Methodology and Configuration](./review-course-methodology.skill.md), narrowed to approved planning inputs. **Prerequisites:** finished Stage 3 editorial plan and verified taxonomy.

Review outcome coverage, sequencing, cognitive progression, Domain/Group/Skill granularity, standards evidence, prerequisites, target locales, duplication, missing Lesson briefs and every Lesson's assessment intent. No plot or Episode gate. Record independent approval/corrections with exact reviewed SHA and PR. Changes to pedagogical claims invalidate earlier approval until re-reviewed.

**Complete:** entire Course plan approved at a revision. **Handoff:** deterministic Course materialization; do not treat Module checkboxes as review approval.

### 5. Materialize Course — whole Course

**Owner:** [Coding Agent](../../personas/coding-agent.persona.md). **References:** [technical YAML handoff](../../docs/architecture/yaml-config-scaffolding.md), Engine `courseBuilder` and `generateYamlSchemas` entrypoints and adjacent tests. **Prerequisite:** Stage 4 source-SHA approval.

Map approved editorial `course.yaml` **explicitly** into technical `config.yaml` (`config` + optional `production` + direct sparse `overrides`). The former is a stage-aware methodological plan, _not_ the builder's Engine Config schema. Do not guess missing UUIDs, Lesson imports, language copies or generated assets. Use current Course/Module/Chapter Config Zod and Zod-derived editor schemas. Preserve stable `items/order` keys and single UUID Course identity.

Materialize the independently approved editorial plan with `node shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs --package content/<book> --course <uuid> --write`; use `--check` for reproducible verification, and after an independently inspected handoff in a subsequent commit use `--finalize` to delete the temporary `course.yaml`. The existing generic `courseBuilder` remains for other technical Config-shaped drafts, not for producing the modular layout. Target Course-owned `index.ts`, optional `constants.ts`, `modules/index.ts` + `modules/<slug>.ts`, `chapters/index.ts` + `chapters/<slug>.ts` and durable `methodology.md`. **Do not** generate Episodes automatically or create Lesson TypeScript or copy their methodology. Respect no-clobber; if files already exist, reconcile explicitly rather than overwriting. Generation may produce intentionally incomplete TypeScript, which is not automatically a generator defect. Validate correct sources/identities/imports and run scoped checks.

**Complete:** approved plan is faithfully and non-destructively materialized and provenance is recorded; delete temporary editorial `course.yaml` **only after** verifiable successful conversion in a subsequent commit, with Git history retained. **Handoff:** localization.

### 6. Translate Course — per target locale

**Owner:** [Technical Translator](../../personas/technical-translator.persona.md). **Skills:** [Manage Translation Production](../translation-workflow/manage-translation-production.skill.md), [Technical Translation](../translation-workflow/technical-translation.skill.md). **Prerequisite:** stable source-language Course/Module/Chapter code and authorized translation scope.

Inventory Course-owned learner-facing `entity × locale` fields; exclude English-only Methodologist documentation and invariants. Translate and mark **per target language** in parent PR. Target language declarations are intent, never evidence of finished translation. Coordinate one existing/new Translation Production Issue for the explicit batch and non-overlapping ownership across child PRs. Standalone Lesson locale gaps remain Lesson Translation Production dependencies.

**Complete for each locale:** independently verifiable complete authored Course-owned strings at a pinned SHA, ready for independent review. **Handoff:** one independent review per required locale.

### 7. Review Course Translations — per target locale

**Owner:** independent [Technical Translator reviewer](../../personas/technical-translator.persona.md), using [Review Translation](../translation-workflow/review-translation.skill.md) and [Manage Translation Production](../translation-workflow/manage-translation-production.skill.md). **Prerequisite:** Stage 6 locale sources and explicit reviewer assignment.

Inspect completeness, semantic fidelity, terminology, accessibility/cultural nuance, relevant RTL behavior, missing frontend fields and source alignment. Generate **Code-derived PR-scoped reference Markdown + manifest** through `/agent-artifacts` only if verified for the Course entity family; if missing, report a concrete blocker or add separately scoped support rather than substituting Lesson/Skill artifacts. Reviewer can work in the translator branch only with owner authorization and independently verified authorship/SHA. Clean temporary tracked `.agent-ci-artifacts/` before merge.

**Complete for each locale:** independent language approval with exact source SHA and review evidence plus separately resolved required Lesson locale dependencies. Stage 7 ends only when every required locale passes; never mark green merely because text exists.

## Draft CI and final gates

During Stages 1–5 a **parent Draft may be intentionally red** due to missing translation, unresolved TypeScript imports/Scenes or incomplete draft fields. Record the precise expected diagnostic and source SHA, why it is expected, the stage that will repair it and any unrelated unexpected regressions. Do not copy English into missing locales, suppress with `as any`, fabricate IDs, or repeatedly “fix” expected incompleteness. Unexpected corruption, unsafe YAML, invalid IDs, unrelated type regressions or broken workflows still require investigation.

Before **Ready for Review or merge**, every mandatory CI, format/type/build/schema check, Course/Lesson reference, approval, production readiness and required language coverage must be verified green; owner approval is required to mark Ready. Relevant real commands include:

`npm run package:build --workspace @svitlo/engine`
`npm run content:generate:yaml-schemas --workspace @svitlo/engine`
`npm run content:check:yaml-schemas --workspace @svitlo/engine`
`node --test shared/engine/scripts/courseBuilder/courseBuilder.spec.mjs`

Run the repository's canonical generator/test tasks for affected packages, and report exact outcomes; commands are not automatically proof of approval.

## Parent Draft PR template

Copy and initialize the following **once** when creating a new Course parent integration PR. Replace bracketed example placeholders with verified identities and live status. The sentinel comments are part of the machine/human contract; **do not edit/duplicate them**.

```md
<!-- svitlo-course-flow:v1 -->

## Course identity

- Course UUID: <uuid>
- Textbook: content/<book>
- Source plan: content/<book>/data/courses/<bucket>/<uuid>/course.yaml
- Target locales: <source, targets>
- Last reconciled head SHA: <sha>
- Current stage: 1
- Next authorized action: <precise action>
- Active subtask/PR: <link or none>

## Workflow

- [ ] 1. Create Course Methodology
- [ ] 2. Design Course Structure
- [ ] 3. Design & Match Lessons
  - [ ] Module <slug> (or bounded Course/Chapter unit)
    - [ ] Design Lesson slots
    - [ ] Match existing Lessons
    - [ ] Create missing Lesson methodologies
- [ ] 4. Review Course Plan
- [ ] 5. Materialize Course
- [ ] 6. Translate Course
  - [ ] <target locale>
- [ ] 7. Review Course Translations
  - [ ] <target locale>

## Handoffs / blockers

- <stage, Module or locale, source SHA, evidence link, issue, precise next action>

<!-- svitlo-course-lessons:start -->

## Lessons

Inventory SHA: <parent-course-head-sha>

Lesson inventory not allocated yet.
<!-- svitlo-course-lessons:end -->
```

## Automated Lessons inventory (different from Stage 3)

**Inventory identity:** scan only Lesson UUID references in this Course's actual source plan/composition; do not count every Lesson under `data/lessons`. During Stage 3 scan the committed temporary `course.yaml`; after Stage 5 use technical `config.yaml`/verified generated Course source. In transition compare both and surface conflicting/removed identities. Use one row per unique Lesson UUID with all Module/Chapter placements. A slot lacking UUID is an unresolved row.

**Child implementation PR marker** in a genuine Lesson implementation PR body:

```md
<!-- svitlo-course-lesson:v1 -->

Course: <course-uuid>
Lesson: <lesson-uuid>
Parent PR: #<parent-pr-number>
```

Match **only** exact validated UUIDs/parent/repository and Course membership. Pre-existing Lesson PRs may be linked explicitly after independent source verification; never infer identity from title, slug or branch. Two active PR claims mean `Needs resolution`. Closed unmerged attempts stay in history. Display **Production PR status** separately from Lesson **source/readiness**: `Not started`, `Draft · #N`, `Open · #N`, `Merged · #N`, `Closed unmerged · #N`, `Reused / existing`, `Needs resolution`. “Merged” does not imply publishable or approved; check merged branch ancestry/source and locales before final readiness.

Only a trusted synchronizer updates the managed Lessons sentinel block, under serialized PR updates and with an exact PR head SHA. The manual stages, Module tasks, locales, editorial approvals and blockers must remain byte-identical. Do not assume a GitHub PR description PATCH is atomic: compare latest body and reject concurrent non-managed edits. API errors/ambiguous inventory must show **incomplete**, not a green Lesson count; preserve the previous good manual PR body. The sync is idempotent, reports orphaned PR claims, and never executes PR-head code with a write-permission token.

**Verification:** test stage 3/5 inventory, direct/Chapter/Module references, reused Lesson, draft YAML versus typed source, duplicate placements and claims, all PR states, sentinels/idempotence, stale SHA, bounded pagination and safe GitHub permission boundaries. Check workflow availability on **default branch** before relying on `/course-status sync` as a live command.
