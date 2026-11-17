# Create Course Flow

**Role:** durable Course production coordinator (not a standalone authoring persona). This is the canonical entry point for **new** Courses; existing specialized Course Skills remain available for scoped maintenance, subject to this flow's stage order. Before doing anything read root `AGENTS.md` and `README.md`, the Studio rules, the [Course entity](../../docs/entities/course.md), [UUID addressing](../../docs/architecture/entity-uuid-addressing.md), [YAML handoff](../../docs/architecture/yaml-config-scaffolding.md), current Engine Course source/tests and the current GitHub PR/Issue state.

## Principles and authoritative state

- Exactly **one immutable Course UUID** and one **parent integration Draft PR** own one Course production effort. The PR description (not Git-authored Runtime fields, chat history or a second status file) owns progress and next action. Git history, real files, child PRs, Production Issues, and independent reviews provide evidence.
- The **only temporary YAML source** for a Course is `content/<book>/data/courses/<last-hex>/<uuid>/course.yaml`, edited throughout planning and independently reviewed before materialization. It contains the complete Course authoring specification, including Config-relevant fields and production/methodology content. **There is no conversion to, generation of, or persistent handoff through `config.yaml`.** Stage 5 consumes this same approved `course.yaml` **directly** and creates the final Course/Module/Chapter/Episode TypeScript and Markdown files plus new minimal Lesson YAML handoffs. Once the complete output has been validated and safely committed, remove `course.yaml` in a subsequent commit; Git history preserves the approved input. **Never retain either `course.yaml` or `config.yaml` as a second permanent Course source.**
- Methodology decides **what, why, depth and order**. No Scenario question or mode is asked in Stages 1–2; no Episodes, Scene scripts, dialogues, UI, Questions or scoring schemes are authored there. A separate optional Screenwriter workflow may later create Experiences; it cannot hold up methodological Stage 4 solely for missing plot.
- Standalone Lessons are reusable, neutral entities with separate Lesson Production and Translation Production approvals. A **matched existing Lesson** is referenced by its verified `lessonId`; a **newly planned Lesson** is described by a complete methodology **inside its Course `course.yaml` slot**, without a mandatory `lessonId`, standalone source file or production PR. Neither kind of planning starts Lesson Production. Never embed a Course ID, storyline or Course-specific logic into a standalone Lesson Config/Props.
- **Authorization boundary:** editing a Course plan, approving Stage 3, accepting Stage 4, allocating Course/Module/Chapter structure, or saying "continue Course work" does **not** authorize opening Lesson branches/PRs. Create/reuse a Lesson PR only after an **explicit, separately scoped start of work on that specific Lesson** through [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md). Even a fully specified planned Lesson can remain unstarted indefinitely.
- **Planning is not production, but materialization creates sources:** Stage 3/4 edit and approve only the Course specification. **Stage 5 automatically creates missing Lesson identities and minimal reusable `lesson.yaml` sources** from approved in-place methodologies as part of Course materialization, without starting Lesson Production PRs or generating Lesson TypeScript. Starting Lesson authoring/reviews is a later, separately authorized task.
- **Implementation status:** this is the intended workflow, not current generator behavior. The current schema/validator, Course materializer and Course Lesson inventory must be updated in a separate implementation PR. The existing materializer currently creates an unnecessary technical `config.yaml` and omits the required new Lesson handoffs; **both deviations must be corrected** rather than standardized.
- Completion is always tied to an actual source SHA and documented evidence. A checkmark means **independently verified stage acceptance**, not an agent's optimistic status message.

## Starting or resuming by PR number

1. Inspect the exact PR number, complete body, labels, head/base branches, linked subtask PRs, historical Lesson/Translation Production Issues where they actually exist, comments, reviewer decisions, CI/check suites and immutable head SHA. Do not assume chat history or an old checklist is current.
2. Read the source hierarchy at the UUID bucket path. During Course planning inspect the single `course.yaml`; after verified materialization inspect the generated TypeScript/Markdown Course tree and canonical Lesson sources, **not any `config.yaml`**. Inspect reused Lessons' actual methodology at their UUID-resolved source paths; a planned Lesson is reviewed at its Course slot before materialization. Reconcile the source plan and its generated outputs by immutable SHA/provenance during the transition; never invent missing evidence.
3. **Reconcile** each Course stage, Module subtask and target locale against Git evidence/review approvals. Record the SHA, blocker, owner, links and exact next authorized action; check conflicts or stale authoring/review. Never auto-approve an editorial review.
4. Continue the **first authorized unfinished Course planning unit** (or an independently scoped Module/locale in an assigned agent-subtask PR). A parent coordinating agent is the only editor of the manually maintained PR checklist; do not overwrite concurrent edits. The Course parent has `pr: integration`. Optional Course planning subtasks can target that branch; **Lesson Production is a separate authorization** and may later create its own PRs.
5. Refresh the managed Lessons section **separately** from the manual checklist. The synchronizer may modify only `<!-- svitlo-course-lessons:start -->` ... `<!-- svitlo-course-lessons:end -->`, and must fail closed if sentinels are missing, repeated or imbalanced. Treat a planned, unstarted Lesson as **planned**, not a failed search or a demand to open a PR. The *current* synchronizer can still report such slots as unresolved: this is an implementation gap, **not** Stage 3 pedagogical incompleteness. Stage 3 can be approved with zero Lesson Production PRs.

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

**Complete:** accepted entire macrostructure with no unresolved ordering/coverage decision. The final Course must satisfy the [Course methodology completeness contract](../../docs/entities/course.md#course-methodology-completeness--pedagogical-technical-specification); Stage 1 breadth alone is not evidence of a complete educational specification. **Handoff:** bounded Module-specific Lesson design; if no Modules, use bounded Course/Chapter units.

For the temporary editorial source, run the **read-only stage validator**:
`node shared/engine/scripts/validateCourseFlow/validate-course-flow.mjs --file content/<book>/data/courses/<bucket>/<uuid>/course.yaml --stage 2`. Stage 1 uses `--stage 1`, Stage 3 work-in-progress uses `--stage 3`, and only an entirely identified Lesson plan may use `--stage 3-complete`. The current manually maintained `course-flow.schema.json` and Stage 3 validator are **implementation gaps to reconcile with the one-file Course authoring contract**; do not introduce another YAML file to satisfy Engine Config validation. YAML validity never constitutes editorial approval.


### 3. Design & Match Lessons — each Module (or bounded alternative)

**Owner:** [Methodologist](../../personas/methodist.persona.md), with the [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md) independently evaluating assessment intent. **Prerequisite:** accepted Stage 2 Course/Module/Chapter structure. **Authoritative output:** the **same Course `course.yaml`** and the parent Course PR description. This is **Course specification work**, not Lesson Production. Apply the pedagogical completeness requirements in the [Course](../../docs/entities/course.md#course-methodology-completeness--pedagogical-technical-specification) and [Lesson](../../docs/entities/lesson.md#lesson-methodology-completeness--pedagogical-technical-specification) entity documentation.

Proceed by Module or other bounded Course/Chapter unit. Preserve the existing `content.items/order` tree and follow these steps **for each required Lesson placement**:

1. **Design the slot.** Determine exact verified Skill UUIDs and prerequisite relationships, learner audience, learning outcomes, depth, coverage boundary, sequencing rationale and assessment evidence. Avoid creating slots just to exercise a nesting level unless the Course pilot explicitly records that decision for independent review. A slot is part of the Course plan, not evidence that a Lesson entity or PR exists.
2. **Search for existing Lessons.** Query relevant Skill UUIDs with read-only `/get lesson by skill <uuid> --package content/<book>` (or `node shared/engine/scripts/queryLessons/query-lessons.mjs --by skill --skill <uuid> --package content/<book> --format json --stdout`). Inspect the query's `complete`, diagnostics, actual source SHA and language evidence: `complete: false` or missing files are **not** proof of absence. Evaluate candidates against the complete intended Skill set, target age, audience/entry conditions, conceptual depth, methodology, assessment requirements and target locale subset. Do not conflate matching Skill UUIDs with educational suitability.
3. **Read the candidate's real methodology before reuse.** For each candidate `lessonId`, resolve the canonical UUID bucket using `resolveEntityPath(id)`: `content/<book>/data/lessons/<last-hex>/<lesson-uuid>/`. **Open and read `methodology.md` there when it exists.** If the Lesson is still in the current authoring flow and `methodology.md` is absent, inspect its actual `lesson.yaml` `production.methodology` plus verified author/review evidence; if source or completeness cannot be established, mark the match as unverified and investigate rather than guessing. Inspect substantive objectives, facts/examples, misconceptions, prerequisites, desired evidence, supported languages and implementation/readiness separately. Use the candidate only if its real methodology fits the Course's specific need.
4. **Choose one of two slot outcomes in `course.yaml`:**
   - **Existing, suitable Lesson — reuse.** Store its real `lessonId` with a concise, evidence-backed matching rationale and exact methodology source path/SHA in the Course planning/review record. The Lesson is still independently owned; **do not copy its full methodology into the Course plan**, silently modify it, mint a new UUID, create another PR or treat a missing translation as a reason to clone it. Missing Course languages are a separate localization dependency.
   - **New Lesson — specify, do not produce.** Keep the slot's stable key and existing Course-level metadata, and write the **complete, reusable Lesson methodology directly at that slot** in the single `course.yaml`. This is a substantive pedagogical specification, not a one-line outline. Include audience and entry conditions, exact Skill targets, observable outcomes and depth, accurate subject matter with examples/counterexamples, terminology, misconceptions, conceptual progression, assessment plan (justified zero/one/multiple Quizzes with target Skills and canonical `AssessmentMethodKey` intent), accessibility/offline considerations, references and constraints. Clearly distinguish the Course-specific *placement/matching rationale* from the Course-neutral *Lesson methodology*. Do **not** require a `lessonId`, a standalone `lesson.yaml`, a `methodology.md` in a nonexistent Lesson directory, a Lesson branch or a Lesson PR at this stage. Review and, if editorially required, translate this specification **as part of Course planning** without inventing a production entity.

**Conceptual editorial illustration only (not yet accepted by current JSON Schema/CLI):**

```yaml
content:
  items:
    dayAndNight:
      type: lesson
      slug: dayAndNight
      title: Day and night
      objective: Explain why daylight and darkness alternate
      skills:
        - faa8f11a-cc06-42c9-8864-8151732e690a
      methodology: |-
        Audience, prerequisites, outcomes, subject facts, misconceptions,
        progression, assessmentPlan and accessibility requirements
        are authored here as a complete reviewable Lesson specification.
        No independent Lesson entity or PR exists yet.
  order:
    - dayAndNight
```

For an **existing** Lesson the slot instead carries the verified `lessonId`, and the reviewer follows that ID to the independent methodology source. For a **planned** Lesson the embedded methodology, not an allocated UUID or an implementation PR, is the basis for Stage 4 review. Do not add `draft`, `approved`, `productionStatus` or artificial Lesson entity state to editorial YAML.

**Course parent PR tracker:** for each Module/bounded unit record (a) designed slots and Skills, (b) complete lookup outcome and candidate method evidence, (c) existing Lesson UUID + source reference **or** completed in-place planned methodology, and (d) independent assessment review/remaining decisions. **Do not create "missing Lesson methodology" PRs as a subtask of Stage 3.** Existing independently authorized Lesson PRs, if any, remain valid and may be linked as evidence; their presence is never required for Course plan completion.

**Stage 3 completion:** all placements and Skill coverage are pedagogically justified; all existing matches have verified methodology/source suitability; every planned slot has a complete in-place methodology adequate for independent review; no unresolved substantive planning question is hidden behind a future Lesson PR. Record exact Course source SHA and evidence in the **parent Course PR**. A complete Stage 3 may contain **zero Lesson Production PRs** and **planned slots without `lessonId`**. Its handoff is independent **Course Plan Review (Stage 4)**, not the start of Lesson Production.

**Current tooling compatibility (must not be misrepresented):** `studio/skills/course-workflow/course-flow.schema.json` currently rejects an inline Lesson `methodology` field, and `validate-course-flow.mjs --stage 3-complete` currently requires a UUID in every Lesson slot. The Stage 5 materializer and automatic Lesson inventory also assume UUID-addressed Lessons. Until a **separate implementation PR with schema/validator/inventory/materializer tests** aligns them with this editorial model, document exact failed checks as tooling blockers and do **not** claim that Stage 3 approval equals passing the old `--stage 3-complete` validator. Never sidestep this mismatch by creating temporary Lesson PRs or fabricating IDs.


### 4. Review Course Plan — whole Course

**Owner:** independent [Methodologist reviewer](../../personas/methodist.persona.md), **not** the Stage 3 author; the [Assessment Architect](../../personas/learning-assessment-architect.persona.md) independently assesses all proposed Quiz evidence. **Skill:** [Review Course Methodology and Configuration](./review-course-methodology.skill.md), limited to the **editorial planning specification**, not a review of nonexistent production entities. **Prerequisites:** completed Stage 3 editorial specification and verified taxonomy.

At the exact pinned Course `course.yaml` SHA, review the **entire Course specification as one coherent plan**: Course/Module/Chapter coverage, intended Skill depth, prerequisites and sequence, duplication or gaps, audience and accessibility, standards evidence, target languages and learning assessment intent. For a **reused existing Lesson**, read its actual UUID-addressed `methodology.md` (or verified current authoring source if not yet materialized), check methodological fit and record its source SHA. For a **new planned Lesson**, inspect and approve or request correction of its complete **in-place methodology** and assessment intent **within the Course plan**. No child Lesson PR or implementation is a prerequisite to this review.

Record independent findings, changes requested, affected paths/slots, reviewer and source SHA in the **parent Course PR review evidence**. The original author fixes the same Course YAML and triggers re-review; never silently patch an independent Lesson's methodology or self-approve. Optional translation of the editorial specification is a separately authorized scope; translation intent must not be presented as completed localizations.

**Complete:** independent sign-off of the full Course plan at a specific SHA, including planned Lesson methodologies and suitability of reused ones. The plan may be approved **without a single started Lesson Production PR**. Approval of a Course plan is not approval or release readiness of its eventual standalone Lessons, and does not authorize opening their PRs.


### 5. Materialize Course — whole Course

**Owner:** [Coding Agent](../../personas/coding-agent.persona.md). **Prerequisite:** independent Stage 4 Course review at an exact source SHA and separate authorization to materialize. **Input:** the same, approved, temporary **`course.yaml`**, containing all Course planning and authoring specifications. **Output:** generated TypeScript/Markdown Course sources plus minimal `lesson.yaml` files for newly planned Lessons. **Never create or retain a separate `config.yaml`.** The editor and builder use one YAML document, not an editorial-YAML-to-technical-YAML conversion.

**One-stage source-generation contract:**

1. **Validate once, generate directly.** Read and validate the approved `course.yaml` against the relevant Course/Module/Chapter/Episode/Section/ContentBlock authoring contracts and methodology requirements, then generate the authoring source tree **directly from that parsed document**. The materializer can perform internal in-memory normalization to Engine Config shapes; it must **not write intermediate YAML** or require a second `config.yaml` input. Distinguish correct-but-incomplete draft TypeScript from errors in the materializer.
2. **Create Course-owned files.** Generate canonical Course UUID directories and real source files: Course `index.ts`, Course `methodology.md`, Course content/composition modules, `review.ts` skeleton (without invented sign-offs), Module/Chapter source files and indexes, and **Episode directories, `defineEpisode` source and Section/content scaffolds when those Episodes were actually authored in the approved source**. Use actual Engine `define*` contracts and stable `items/order` relationships; never fabricate storyline, content, Questions, media, approval or translations. Store durable production specifications in their owning Markdown/source files, not in a permanent YAML.
3. **Reuse existing Lessons.** Preserve every real, verified `lessonId` and reference the independent Lesson source without copying its methodology or changing its identity. Unresolved source imports must be visible as temporary TypeScript TODOs rather than silently omitted children.
4. **Materialize newly planned Lessons.** For each distinct reviewed new Lesson methodology in a `course.yaml` slot, allocate a real, unique Lesson UUID **during Stage 5**, resolve the canonical `content/<book>/data/lessons/<last-hex>/<lesson-uuid>/` directory, and create **only the minimal `lesson.yaml`** required to start future Lesson authoring: Config identity, verified Skills and intended languages plus `production.documentLanguage` and the exact approved `production.methodology`; Sections and unfinished content remain empty. Persist the assigned UUID in the generated Course references and in that new Lesson YAML. Do **not** generate Lesson TypeScript, `review.ts`, content blocks, assets, Question/Flashcard banks or a Lesson Production PR.
5. **Ensure repeatable, non-destructive operation.** Preserve one ID for repeated planned-Lesson references. Because genuinely new UUIDs require allocation, record allocations in durable generated-source evidence or an equivalent recoverable transaction before considering them committed; repeated `--write`/`--check` must reuse IDs, never reallocate or duplicate files. Respect existing authored data, use create-only/no-clobber guards, reject ambiguous collisions and partial transfers, and require a complete inventory/equivalence check over Course/Module/Chapter/Episode sources and the new Lesson YAMLs.
6. **Finalize and remove temporary input.** Run an exact `--check` against the committed generated source and approved source SHA. Once every expected TypeScript/Markdown source and new Lesson YAML exists with correct identity/provenance, **delete the temporary Course `course.yaml` in a subsequent verified commit**. No `config.yaml` is created, no YAML remains inside the materialized Course folder, and no alternative permanent Course authoring representation is introduced. The independently generated **Lesson `lesson.yaml` files remain**: they are a temporary input for their own later Lesson Production workflow, not redundant Course YAML.

**Lesson Production boundary:** materialization creates only the Lesson UUID/folder/initial `lesson.yaml`. Work on the Lesson starts later **only after explicit authorization for that specific Lesson**, through [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md), which must reuse the generated UUID and methodology. Neither Course approval nor source materialization opens Draft Lesson PRs.

**Verified current implementation discrepancy:** `shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs` presently reads `course.yaml`, then **writes an unnecessary `config.yaml`** and Course/Module/Chapter TypeScript drafts plus `methodology.md`; it currently requires Lesson UUIDs upfront, does not create Lesson UUIDs/folders/`lesson.yaml`, and does not create the expected Episode/content/review files. The general `courseBuilder` consumes a technical `config.yaml` for its separate historical scaffolding API, but this does **not** justify retaining that YAML in the new Course Flow. Implement the **direct Course YAML → generated files → verified removal** contract in a separate coding PR and update schemas, validators, inventory and tests together. Do not claim the current scripts already satisfy it.

**Complete:** the full approved Course tree and the necessary minimal independent Lesson YAMLs are safely materialized with stable identities and checked outputs; the temporary Course YAML is subsequently removed without losing authorship or review evidence. Stage 5 is source creation, **not** Lesson production, final TypeScript compilation, locale approval or release.

### 6. Translate Course — per target locale

**Owner:** [Technical Translator](../../personas/technical-translator.persona.md). **Skills:** [Manage Translation Production](../translation-workflow/manage-translation-production.skill.md), [Technical Translation](../translation-workflow/technical-translation.skill.md). **Prerequisite:** stable source-language Course/Module/Chapter code and authorized translation scope.

Inventory Course-owned learner-facing `entity × locale` fields; exclude English-only Methodologist documentation and invariants. Translate and mark **per target language** in parent PR. Target language declarations are intent, never evidence of finished translation. For **new** Course localization campaigns, coordinate one Draft translation integration PR with a frozen Course-entity × locale matrix and nonoverlapping child PRs via [Manage Translation Production](../translation-workflow/manage-translation-production.skill.md); for existing historical Translation Issues preserve/reconcile their approved state rather than force-migrating. Standalone Lesson locale gaps remain Lesson Translation Production dependencies.

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

Before declaring the Course ready, verify **every Course-owned Episode** has
all required media produced (Image, Audio, Video, poster, Subtitles and nested
Carousel/Quest dependencies). The Course technical YAML→TS scaffolder emits
`TODO(asset)` and reserved Nil UUID media filenames for unresolved asset
requests; those are **allowed in Drafts only** and must be absent at Ready/merge.
Do not add media-generation side effects or production status fields to
`defineEpisode`; the resource lifecycle belongs to the source scaffolder,
specialists and strict production publisher. Run `generateCourseProps --preflight`
without `--draft` and the affected textbook's production `package:build`,
then inspect the generated Course/Episode resources and static manifest. The
Course PR also depends on every referenced standalone Lesson's actual release
readiness; a merged Lesson PR or generated source alone is not proof. Record
real resource paths, language coverage and build SHA/evidence.

The `Content packages build` check rejects unresolved media markers in
changed Course UUID roots on review-ready PRs; the production build also
rejects missing physical references. Configure protected-branch required
checks separately to prevent bypassing CI. Run the repository's canonical
generator/test tasks for affected packages, and report exact outcomes; commands
are not automatically proof of approval.

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
    - [ ] Specify missing Lessons in-place in course.yaml (no Lesson PR)
- [ ] 4. Review Course Plan
- [ ] 5. Materialize Course
- [ ] 6. Translate Course
  - [ ] <target locale>
- [ ] 7. Review Course Translations
  - [ ] <target locale>

## Handoffs / blockers

- <stage, Module or locale, source SHA, matching evidence or embedded method review, precise next action>
- <each planned Lesson: approved Course slot and methodology SHA; after Stage 5, allocated Lesson UUID and verified lesson.yaml path; start of Lesson Production PR remains separately authorized>

<!-- svitlo-course-lessons:start -->

## Lessons

Inventory SHA: <parent-course-head-sha>

Lesson inventory not allocated yet.
<!-- svitlo-course-lessons:end -->
```

## Automated Lessons inventory (different from Stage 3)

**Inventory identity:** inspect the Course's actual editorial/technical composition, never all directories under `data/lessons`. During Stage 3 report **existing Lessons by verified UUID** and **planned Lessons by stable Course slot with inline methodology but no UUID**. During Stage 5 newly materialized Lessons receive stable UUIDs and canonical `lesson.yaml` sources; afterward the Course inventory is derived from **generated Course TypeScript/reference evidence**, not a retained `config.yaml`, and shows these Lessons under **production not started** (even though a methodology-only YAML exists), alongside reused Lessons and genuinely active production PRs. **Current synchronizer limitation:** slots without UUID show as unresolved and it does not distinguish the new materialized-but-unstarted Lesson state. This needs a separate implementation PR. Planning review status remains in the **manual parent PR checklist**, not the managed sentinel.

**Optional later Lesson Production PR marker**, only after explicit authorization to start that specific Lesson:

```md
<!-- svitlo-course-lesson:v1 -->

Course: <course-uuid>
Lesson: <lesson-uuid>
Parent PR: #<parent-pr-number>
```

Match **only** exact validated UUIDs/parent/repository and Course membership. **Do not fabricate a Lesson claim or PR for planned slots.** Independently started Lesson PRs may be linked after source verification; never infer identity from title, slug or branch. Two active PR claims mean `Needs resolution`; closed-unmerged attempts remain history. Distinguish editorial slot state (reused methodology verified; new methodology planned/reviewed) from **Production PR status** (`Not started`, `Draft · #N`, `Open · #N`, `Merged · #N`, `Closed unmerged · #N`, `Reused / existing`, `Needs resolution`) and actual **Lesson source/readiness**. Existing independently authorized test Lesson PRs must be preserved, not closed or merged to simplify the Course workflow. “Merged” does not imply approval, translations or publication.

Only a trusted synchronizer updates the managed Lessons sentinel block, under serialized PR updates and with an exact PR head SHA. The manual stages, Module tasks, locales, editorial approvals and blockers must remain byte-identical. Do not assume a GitHub PR description PATCH is atomic: compare latest body and reject concurrent non-managed edits. API errors/ambiguous inventory must show **incomplete**, not a green Lesson count; preserve the previous good manual PR body. The sync is idempotent, reports orphaned PR claims, and never executes PR-head code with a write-permission token.

**Verification expected in the separate implementation PR:** test mixed planned/reused Lesson slots at Course/Module/Chapter placements; actual methodology.md lookup by UUID; complete/incomplete searches; Stage 3 schema/CLI and Stage 4 evidence; Stage 5 direct generation from the single course.yaml of full Course/Module/Chapter/Episode/review/content skeletons and new Lesson UUID + minimal lesson.yaml handoffs, **without creating config.yaml**; persisted ID stability across reruns; create-only behavior and partial-write recovery; no unintended Lesson PRs; synchronized inventory before and after materialization; duplicate references/claims; sentinels/idempotence, stale SHA, safe permissions and bounded pagination. This documentation-only PR does **not** claim current generators already pass these cases.
