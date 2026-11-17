# Create Lesson Flow

**Authority:** the primary Git-first workflow for one standalone or Course-originated Lesson. One **Draft Lesson PR** is the sole canonical progress tracker; Git owns authored files and independent reviewer evidence. Do not introduce workflow status to Engine Config/Props or preserve competing Issue/YAML progress trackers. Before every action read root `AGENTS.md` and `README.md`, the applicable Studio rules, Persona(s), Skill(s), architecture/entity docs and current code/tests.

## 0. Resolve identity, provenance, and current state

- **Resume by PR:** fetch the latest PR body, head/base SHA, comments/reviews, statuses, all child PRs and canonical Lesson files. Reconcile source and verified approvals. Continue the first authorized unfinished stage; never duplicate the PR or rely on a prior chat.
- **Resume by UUID:** use Engine's UUID resolver for `content/<book>/data/lessons/<bucket>/<uuid>/`; search active and historical PRs, old Lesson Production Issues, Course associations and real files. Reuse existing identity/branch/PR. Missing languages on an implemented Lesson require localization, not a new Lesson.
- **Course-originated:** verify actual Course PR, Course UUID, Lesson slot and Lesson UUID from the Course inventory (#639). New Lesson PR targets that Course PR's **actual integration branch** and includes the linkage marker `<!-- svitlo-course-lesson:v1 -->` with literal `Course: <uuid>`, `Lesson: <uuid>`, `Parent PR: #N` on separate lines. Do not invent link from a slug/title. Parent Course PR owns Course inventory; Lesson PR owns Lesson stage evidence. #639's automatic status sync works only after its workflow reaches the default branch; use verified manual links until then.
- **Standalone:** if authorized and truly absent, allocate one immutable UUID/slug and open one new Draft Lesson PR targeting `main` or the designated integration parent. If existing material already exists, inspect it first. The presence of methodology alone **does not** imply Course provenance.
- **Historical Issues:** read and preserve their full evidence, approvals and links, but **do not create mandatory new Lesson Production Issues**. Map each distinct UUID to its actual Lesson PR. The separate Translation Production Issue protocol remains unchanged.

A Lesson remains Course-neutral and reusable; no Course UUID, storyline, mascot or plot in `defineLesson`. Use repository naming/labels: a Lesson PR subordinated to a Course uses `pr: agent-subtask`; a standalone Lesson coordinating child bank PRs can use `pr: integration`. Both roles are **never assigned together**: even if a Course's Lesson PR receives Question/Flashcard children, its `pr: agent-subtask` role is retained and real nested ancestry gives context. All agent PRs start Draft.

## Single authoring source

Stages 1–5 progressively author exactly one temporary `lesson.yaml` with root/nested `config` (Engine Config, one immutable UUID per entity) and optional `production` (Methodologist source, learner purpose, specs, prompts, scripts and source `documentLanguage`). Its `config.params.languages` contains the full intended locale tuple; source-language copy lives only in the actual `production.documentLanguage` locale. Missing translations remain missing. Ordered entities use the real Engine `items/order` contracts, not invented arrays or a second `content.yaml`.

**Effective language scope (handoff to #639, #646, #647):** a standalone Lesson builds against its own declared languages. A Course requesting that Lesson must pass its actual effective requested languages to the Lesson Build, and validate that the requested scope is a subset of the Lesson-supported languages; do not shrink the persisted standalone Lesson tuple or embed the Course in Lesson Config. A Flashcard Build receives the **Lesson's actual effective language scope**, without Course-specific persisted coupling or silent fallback. The existing Lesson Markdown generator enhancement in [#645](https://github.com/KiT-Maverik/svitlo/pull/645) is an external dependency to verify, not a generator to duplicate in this PR.

**No** `draft`, `approved`, `stage`, `reviewStatus` fields, approval frontmatter, Methodologist-approved strings, or stage-specific Zod/JSON Schema families. YAML must stay syntactically sound while editorially incomplete. Legacy `methodology.md`, `methodologist-brief.md`, `content.yaml` or other approved inputs require explicit, non-destructive migration into `lesson.yaml`, retaining the full authored prose and original review/source SHA. Never silently delete legacy files, overwrite hand-authored sources or invent missing content. Separate `questions.yaml`/`flashcards.yaml` sibling files are owned by their own independent workflows, not Lesson Config.

## Stages (record role, source SHA, evidence, verdict and next action after each)

### 1. Methodology

**Persona:** [Methodologist](../../personas/methodist.persona.md). **Skill:** [Create Lesson Brief](./create-lesson-brief.skill.md). Verify real Skill UUID/source links, learner audience/entry knowledge, prerequisites, aims, conceptual scope, source references, misconceptions, accuracy, desired depth, supported locales/accessibility and `assessmentPlan` including whether and why zero/one/multiple Quiz Sections are needed and required cognitive `AssessmentMethodKey` values.

For a **Course-originated** Lesson, first inspect its _already-authored_ methodology (Lesson YAML and proven Course handoff). Evaluate **completeness and adequacy**; reuse if sufficient, repair real gaps in the same `production.methodology`, and record the updated SHA. For a **standalone** Lesson with no existing Methodology, author it substantively from scratch; if it exists, review/improve it just as for Course work. Do not require a storyboard or a literal `Methodologist status: Approved` frontmatter. Missing actual pedagogical substance or unverified Skills block stage; no extra progress property belongs in YAML. **Output:** complete pedagogical method and stage evidence in Lesson PR.

### 2. Content Creation

**Persona:** [Educational Screenwriter](../../personas/educational-screenwriter.persona.md). **Skill:** [Create Lesson Content](./create-lesson-content.skill.md). Enrich the **same** `lesson.yaml` with ordered Sections/blocks; actual intelligible source-language explanations, examples/counterexamples, worked demonstrations, learner actions, meaningful feedback, misconceptions, transitions and reflections. Specify `production.purpose`/`pedagogicalIntent` and complete implementable `production.specification`/`prompt`/`script`/`storyboard` for Scenes, media and any Quest, with accessibility, offline and weak-device equivalents. Follow real registered Config and renderer support; draft-only features are not shipped. No arbitrary minimum block counts, fake locales or Quiz answer banks. One short passive Text-only Section is a review warning, not an automatic schema failure. **Output:** full teaching blueprint and production requirements in Git with Screenwriter SHA/handoff; unresolved material gaps block.

### 3. Content Review

**Persona:** an independent content/editorial specialist (a qualified Educational Screenwriter **other than the author**). **Skill:** [Review Lesson Content](./review-lesson-content.skill.md). Inspect every Section/ContentBlock, correctness, explanation depth, examples and common mistakes, age-appropriate terminology, transitions, feedback and accessibility of the copy. Flag empty/filler/thin material and concrete factual deficiencies; avoid count quotas. Findings identify severity, exact node path, reason, fix, role and **reviewed `lesson.yaml` SHA**. Reviewer does not edit/self-approve source. Screenwriter owns corrections, which invalidate dependent reviews. **Output:** independent findings, verdict and re-review evidence in PR; no stage-3 schema/status field.

### 4. Experience Review

**Persona:** independent [Learning Experience Expert](../../personas/learning-experience-expert.persona.md). **Skill:** [Review Lesson Experience](./review-lesson-experience.skill.md). Examine latest full `lesson.yaml` _and complete production specifications_ for pedagogically useful interaction, pacing/cognitive load, feedback, keyboard/touch/screen reader/semantic RTL/reduced motion, captions/nonvisual alternatives, offline and low-end devices. Identify pointless interactive theatre or infeasible Scene/Quest features. A planned interaction does not prove a functioning renderer. Record node-specific findings and exact reviewed SHA in Lesson PR. Author makes corrections; refresh affected review evidence. **Output:** independently verified experience verdict; blocked if requirements are vague, inaccessible or technologically unsupported with no suitable alternative.

### 5. Methodology Compliance

**Persona:** independent [Methodologist](../../personas/methodist.persona.md) **other than Stage 1 author**. **Skill:** [Review Lesson Methodology](./review-lesson-methodology.skill.md). Compare the whole latest Lesson YAML (all Sections, learner-facing copy, explanations, worked examples, misconception coverage and **complete** Scene/image/audio/video/Quest specs) to Stage 1 methodological scope, target Skills, prerequisite assumptions, progression, factual references, accessibility and `assessmentPlan`. Quiz intents must be present and justified; Question/answer correctness remains with Assessment Architect. Missing substantive source or production specification blocks; a not-yet-produced binary/locale does not itself fail methodological compliance. Ensure Course neutrality. **Output:** independent outcome coverage, exact SHA, findings and sign-off in Lesson PR; no frontmatter approval token.

### 6. Resource Production

**Persona:** [Coding Agent](../../personas/coding-agent.persona.md), with actual Scene/media specialists. **Skills:** [Implement Scene](./implement-scene.skill.md), [Finalize Lesson](../../../shared/engine/scripts/finalizeLesson/README.md). This **single** stage includes scaffold generation **and** implementation. “Generate Sources” is **not** another workflow stage.

At the **Stage 6 entry**, perform a single complete **structural** validation against the existing Engine-Zod-derived `lesson.scaffold.schema.json` composed with `production.schema.json`. Verify YAML 1.2, stable UUID path/slug, collections, mandatory fields, source language in planned language tuple and production requirements with actionable paths. Stage 1–5 intentionally do **not** require a complete schema. The existing `generateYamlSchemas` command produces editor guides; it is not validation. The current `lessonBuilder` alone neither performs full validation nor declares readiness.

Run `node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs preflight --source <path/lesson.yaml>`. For the accepted final source, run `node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs finalize --source <path/lesson.yaml>` (which orchestrates the existing create-only `lessonBuilder.mjs generate`, checks expected generated inventory and source fidelity, verifies persistent methodological/production handoffs, and deletes only the unchanged temporary `lesson.yaml` on verified complete transfer). Never remove YAML on a skipped/partial/mismatched builder, pre-existing edited source, missing Markdown/Code/spec, invalid schema, stale SHA or incomplete transfer. Preserve sibling `questions.yaml` and `flashcards.yaml`. No overwrites or invented translations/resources. Once code exists, implement/coordinate actual Scenes/registry, physical media UUID filenames, captions/transcripts, accessibility/offline, references, tests and child bank Quiz links. Source-locale-only generated TypeScript may intentionally fail until resources/locales are finished; document **expected** versus **unexpected** Draft CI failures without `as any` or fake values. **Completion requires real resources verified**, not merely a successful scaffold.

### 7. Translation

**Persona:** [Technical Translator](../../personas/technical-translator.persona.md). **Skills:** [Technical Translation](../translation-workflow/technical-translation.skill.md), [Manage Translation Production](../translation-workflow/manage-translation-production.skill.md). Translate real persistent generated source — typed locale dictionaries, Markdown/Code-derived text, Scenes, media captions and blocks — after YAML finalization, per entity×locale under the planned language tuple. Use the existing/new authorized fixed-scope Translation Production Issue and verified child ownership. Do not fake target-language coverage, copy English as translation or lower `params.languages`. **Output:** real translated source and precise per-locale PR/SHA/progress; outstanding locales remain blocked.

### 8. Translation Review

**Persona:** an independent Technical Translator reviewer. **Skill:** [Review Translation](../translation-workflow/review-translation.skill.md). Review correct **Lesson-family Code-derived** per-locale Markdown and manifest, pinned source SHA, exact entity coverage, terminology, fidelity, scientific meaning, RTL, accessibility and captions. A Skills Markdown artifact does _not_ review a Lesson. Missing/stale/incomplete artifact blocks affected locale; owner controls reviewer start and chosen source PR/SHA. Remove tracked temporary `.agent-ci-artifacts` before merge. **Output:** independent per-locale verdict/sign-off tied to source revisions.

## Independent Questions and Flashcards

Record **separate** Questions/Flashcards states in the Lesson PR (`Not Started` / `PR #N @ SHA` / `Completed @ SHA` / `Not Applicable` with verified Methodologist rationale), not as Lesson stages. **Questions must be completed, integrated and independently reviewed before Flashcards authoring begins**, except when the Lesson PR explicitly records **Questions: Not Applicable** with verified Methodologist rationale; an unfinished or missing bank is **not** N/A. A required Quiz forbids Questions N/A. Each independently authorized bank has its own Draft child PR targeting the active Lesson branch and its own workflow/reviews; for an already merged Lesson use a separately verified integration base. The detailed seven-stage [Questions Flow, PR #647](https://github.com/KiT-Maverik/svitlo/pull/647) and six-stage [Flashcards Flow, PR #646](https://github.com/KiT-Maverik/svitlo/pull/646) are **sibling specifications**, not workflows to recreate inside #643. Flashcards may reference actual completed Question fields; neither child PR may overwrite unrelated Lesson sources or declare acceptance from the parent checkbox. Preserve `questions.yaml` and `flashcards.yaml` until their own verified materialization. Neither bank belongs in Lesson Config.

## PR body tracker and resumability

Place a stable section in each Lesson PR (preserving existing unrelated body), for example:

```md
<!-- svitlo-create-lesson-flow:v1 -->

## Lesson identity

- Lesson UUID / textbook / slug: <verified values>
- Parent Course PR, Course UUID and slot: <verified | none>
- Source path: content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml
- Reconciled head SHA: <sha>
- Current stage / active child PR / next authorized action: <values>

## Lesson stages

- [ ] 1. Methodology
- [ ] 2. Content Creation
- [ ] 3. Content Review
- [ ] 4. Experience Review
- [ ] 5. Methodology Compliance
- [ ] 6. Resource Production
- [ ] 7. Translation (record per locale)
- [ ] 8. Translation Review (record per locale)

## Independent banks

- Questions: <state; PR; SHA; blocker or N/A reason>
- Flashcards: <state; PR; SHA; blocker or N/A reason>

## Final QA / Development Review — NOT a ninth stage

- [ ] Verified YAML source materialization; no stale temporary YAML
- [ ] Questions completed before Flashcards (or verified Questions N/A); bank acceptance/PR SHAs reconciled
- [ ] Independent Content/Experience/Compliance evidence current
- [ ] Actual Scenes, media, offline/a11y behavior verified
- [ ] Full target locale coverage and independent reviews verified
- [ ] No tracked temporary review artifacts
- [ ] Scoped tests, typecheck, build, formatting and mandatory CI green
- [ ] Independent QA/Development Review and owner acceptance

## Evidence, blockers, next action

- <stage; source SHA; author/reviewer; verdict; evidence URL; unresolved fix; next actor>
- <locale; entity; source SHA; translator/reviewer PR; verdict>
```

A Course-originated Lesson PR must also carry the `svitlo-course-lesson:v1` link marker and fields exactly as prescribed by #639. Before updating, refetch PR and reconcile independent agents' concurrent changes; GitHub body PATCH is not an atomic compare-and-swap. Never drop another review or status region. Completion is based on actual files, independent reviews and SHAs, not the checkbox itself. Material changes invalidate affected prior evidence. Existing `review.ts` and Engine `LessonReviewStage` are a **separate typed Props-digest review register**, not an eight-stage operational status machine. Reconcile actual consumers before editing their contract, and never fabricate an accepted review PR or digest.

## Final quality gate

Final QA and independent Development Review are **not stage nine**. After actual persistent source/resources/locales exist, verify scoped Engine build/tests, Lesson Builder/finalizer regression tests, YAML schema `--check` after Engine build, source/artifact validation, textbook build/typecheck, formatting and mandatory PR CI; record executed command, branch SHA, results and honest blockers. During early Draft stages explain narrowly expected CI failures; investigate unrelated regressions. Owner explicitly controls Ready and merge. Do not silently alter #639's Course flow, unrelated banks, Engine Runtime Props or translation review policy.
