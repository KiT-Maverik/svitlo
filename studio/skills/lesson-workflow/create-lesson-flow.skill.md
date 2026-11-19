# Create Lesson Flow

**Authority:** the primary Git-first workflow for one standalone or Course-originated Lesson. One **Draft Lesson PR** is the sole canonical progress tracker; Git owns authored files and independent reviewer evidence. Do not introduce workflow status to Engine Config/Props or preserve competing Issue/YAML progress trackers. Before every action read root `AGENTS.md` and `README.md`, the applicable Studio rules, Persona(s), Skill(s), architecture/entity docs and current code/tests.

## 0. Resolve identity, provenance, and current state

- **Resume by PR:** fetch the latest PR body, head/base SHA, comments/reviews, statuses, all child PRs and canonical Lesson files. Reconcile source and verified approvals. A bare PR number requests a stage report and next-action proposal only; execute the first authorized unfinished stage **after** a separate, clear user instruction. Never duplicate the PR or rely on a prior chat.
- **Resume by UUID:** use Engine's UUID resolver for `content/<book>/data/lessons/<bucket>/<uuid>/`; search active and historical PRs, old Lesson Production Issues, Course associations and real files. Reuse existing identity/branch/PR. Missing languages on an implemented Lesson require localization, not a new Lesson.
- **Course-originated:** verify actual Course PR, Course UUID, Lesson slot and Lesson UUID from the Course inventory (#639). New Lesson PR targets that Course PR's **actual integration branch** and includes the linkage marker `<!-- svitlo-course-lesson:v1 -->` with literal `Course: <uuid>`, `Lesson: <uuid>`, `Parent PR: #N` on separate lines. Do not invent link from a slug/title. Parent Course PR owns Course inventory; Lesson PR owns Lesson stage evidence. #639's automatic status sync works only after its workflow reaches the default branch; use verified manual links until then.
- **Standalone:** if authorized and truly absent, allocate one immutable UUID/slug and open one new Draft Lesson PR targeting `main` or the designated integration parent. If existing material already exists, inspect it first. The presence of methodology alone **does not** imply Course provenance.
- **Historical Issues:** read and preserve their full evidence, approvals and links, but **do not create mandatory new Lesson Production Issues**. Map each distinct UUID to its actual Lesson PR. The separate Translation Production Issue protocol remains unchanged.

An **instructional** Lesson remains Course-neutral and reusable. An explicitly approved **assessment-only** Lesson may require preceding Course Lessons' Skills and Question Banks, as specified in its Course-originated methodology; it is still an ordinary `defineLesson` and must **not** embed a Course UUID, storyline, mascot, plot, new Runtime subtype or `dependsOn` field in Engine Config/Props. Preserve Course origin and upstream dependencies in the existing Course plan and PR tracker. Use repository naming/labels: a Lesson PR subordinated to a Course uses `pr: agent-subtask`; a standalone Lesson coordinating child bank PRs can use `pr: integration`. Both roles are **never assigned together**: even if a Course's Lesson PR receives Question/Flashcard children, its `pr: agent-subtask` role is retained and real nested ancestry gives context. All agent PRs start Draft.

## Mandatory user-facing progress report and next-action handoff

After **every completed or paused stage**, at a review/authorization blocker and on every status/resume request (including a new chat containing only a Lesson PR number), first reconcile the current Lesson PR head/base, immutable UUID, source files, stage checklist, independent reviewer/source SHAs and child PRs. A bare PR number asks for **status plus recommendation**, not immediate stage execution or a new PR. Do not treat a checked box alone, a source-only scaffold or a previous chat as proof of completion. The PR description remains the sole workflow tracker; **no** stage/status fields belong in YAML, Engine Config/Props or a parallel ledger.

Always finish with a compact, explicit report containing:

1. **Lesson identity**: exact Lesson UUID, verified Lesson PR and, if Course-originated, the Course parent PR/UUID and verified `svitlo-course-lesson:v1` linkage; source/head SHA when available.
2. **All eight stages in order**, marking each `✅ completed`, `▶ in progress`, `⬜ not started`, `⛔ blocked`, or `↻ stale`. A `✅` requires the actual stage's deliverables, review evidence and pinned source revision. Show per-locale coverage under Stages 7 and 8 when partial. Show independent Questions, Flashcards and upstream banks in a **separate** line, never as ninth/tenth Lesson stages.
3. **Last completed stage**: explicitly `Stage N — <name> completed` with verified evidence (or `No new stage completed`), plus blockers/stale reviews.
4. **Recommended next stage**: the first authorized eligible incomplete stage, with its prerequisite, or `None — all eight Lesson stages are complete`.
5. **Recommended next action**: a single concrete copyable **chat instruction** on its own fenced `text` line, e.g. `do lesson stage 2 for PR #<lesson-pr-number>`. When starting an independently authorized, materialized Course Lesson that has no Lesson PR yet, use **exactly** `do lesson <verified-lesson-uuid> related to PR #<course-pr-number>` and resolve/reuse the existing Course parent integration branch; do not create a duplicate PR. For a standalone Lesson, identify its UUID and actual intended base branch. The command is a recommendation, **not** something to execute as a side effect of reporting. Invite the user to send it, or reply `go` to an unambiguous single proposal made in this chat; other clear instructions work too. Vague `go` without a concrete current target and a bare PR number cannot cross the separately scoped Lesson-authorization boundary.

Only recommend an action justified by verified sources and current approval/branch boundaries. If the next stage needs an independent reviewer, owner decision, Questions/Flashcards completion or upstream published banks, state the specific blocker and propose the appropriate **authorized** handoff instead of quietly writing or self-approving. Keep the PR progress checklist current when performing authorized work, but preserve concurrent edits and exact evidence. A Course Stage 5 materialization is **not** Lesson Stage 1 completion or a Lesson Production PR.

**Terminal message:** when **all eight Lesson stages** are individually complete at current evidence SHAs, explicitly say: **"All eight Lesson workflow stages are complete. There is no next Lesson stage. You can assign new work."** Stop rather than continuing without instruction. Report any outstanding independent bank, final QA, publication, CI or merge gates separately; none is a ninth stage, and workflow completion alone does not authorize Ready/merge.

### Independent bank handoff from Lesson resource production

**Decision point, not a ninth Lesson stage:** after Lesson Stage 5's independent Methodology Compliance and during Stage 6, once the Lesson has verified persistent typed source, canonical identity, approved actual instructional/assessment content, and the current **derived Lesson Markdown reference** required by the [Questions Flow](./create-questions-flow.skill.md) and [Flashcards Flow](./create-flashcards-flow.skill.md), evaluate the two **independent** banks. Do not recommend designing bank content solely from a methodology-only `lesson.yaml` scaffold or before checking the exact bank prerequisites. A complete Stage 6 is not always possible yet: local Quiz UUID selections may depend on a separately produced Question Bank. When the real source/reference is ready but bank linking remains open, report `Stage 6 — in progress (bank-dependent)` rather than falsely checking it off. Once bank work is integrated, resume the remaining Stage 6 work/verification, then Stages 7–8 when authorized.

At this handoff, **recommend pausing the Lesson workflow** to address the first eligible independent bank, but never begin or create a child PR without a distinct user instruction:

- **Own Questions required, not complete:** recommend the [Create Questions Flow](./create-questions-flow.skill.md) for this exact Lesson, **even if it has no Quiz Section**. Prefer resuming an existing matching Questions child PR; otherwise show a single copyable command `do questions for lesson <lesson-uuid> related to PR #<lesson-pr-number>`. This covers full-bank design and any approved **local Quiz Section selection**, not an invented standalone Quiz workflow. Track completion/review/actual parent-branch integration before considering Flashcards.
- **Own Questions explicitly `Not Applicable`:** require the owning Lesson PR to cite a real **Methodologist decision and rationale**. Then (and only then), if useful Flashcards are pedagogically justified and the verified Lesson source/reference is ready, recommend `do flashcards for lesson <lesson-uuid> related to PR #<lesson-pr-number>`. The Flashcards workflow must not fabricate Question links. **Neither the absence of a Quiz nor a missing/unfinished Questions bank is `Not Applicable`.**
- **Questions completed, reviewed and integrated:** if useful Flashcards are pending, recommend their existing child PR or the same `do flashcards ...` command. If Flashcards are `Not Applicable` with a documented rationale, or already completed/reviewed/integrated, resume the first eligible Lesson stage (often unfinished Stage 6, then 7/8); do not invent mandatory card creation. A Question Bank existing does not force Flashcards or a Flashcards Section.
- **Assessment-only Lesson using external banks:** keep `Questions: pending external banks` while upstream resources/Quiz selection are unresolved; do not treat this as a completed own-bank N/A or recommend authoring a duplicate bank. Report the exact upstream Lesson/Question PR and source/locale dependencies; recommend a verified upstream unblock action. Only a genuinely justified, independently documented own Questions N/A changes the Flashcards gate.

The parent Lesson PR owns separate **Questions** and **Flashcards** statuses and their evidence/PR links, **not new Lesson stage numbers**. On a bare Lesson PR number, verify both bank states and the stage-6 handoff before choosing one recommended action; the canonical _next Lesson stage_ may differ from the _recommended next action_. Use the current PR/UUID relationship, not a guessed slug or the historical test PR. Replying `go` accepts only one explicitly proposed, still eligible task in this chat. An independent bank PR may target the Lesson head branch, but source readiness or a checked Stage 5/6 does **not** itself authorize starting it.

## Single authoring source

Stages 1–5 progressively author exactly one temporary `lesson.yaml` with root/nested `config` (Engine Config, one immutable UUID per entity) and optional `production` (Methodologist source, learner purpose, specs, prompts, scripts and source `documentLanguage`). Its `config.params.languages` contains the full intended locale tuple; source-language copy lives only in the actual `production.documentLanguage` locale. Missing translations remain missing. Ordered entities use the real Engine `items/order` contracts, not invented arrays or a second `content.yaml`.

**Effective language scope (handoff to #639, #646, #647):** a standalone Lesson builds against its own declared languages. A Course requesting that Lesson must pass its actual effective requested languages to the Lesson Build, and validate that the requested scope is a subset of the Lesson-supported languages; do not shrink the persisted standalone Lesson tuple or embed the Course in Lesson Config. A Flashcard Build receives the **Lesson's actual effective language scope**, without Course-specific persisted coupling or silent fallback. The existing Lesson Markdown generator enhancement in [#645](https://github.com/KiT-Maverik/svitlo/pull/645) is an external dependency to verify, not a generator to duplicate in this PR.

**No** `draft`, `approved`, `stage`, `reviewStatus` fields, approval frontmatter, Methodologist-approved strings, or stage-specific Zod/JSON Schema families. YAML must stay syntactically sound while editorially incomplete. Legacy `methodology.md`, `methodologist-brief.md`, `content.yaml` or other approved inputs require explicit, non-destructive migration into `lesson.yaml`, retaining the full authored prose and original review/source SHA. Never silently delete legacy files, overwrite hand-authored sources or invent missing content. Separate `questions.yaml`/`flashcards.yaml` sibling files are owned by their own independent workflows, not Lesson Config.

## Stages (record role, source SHA, evidence, verdict and next action after each)

### 1. Methodology

**Persona:** [Methodologist](../../personas/methodist.persona.md). **Skill:** [Create Lesson Brief](./create-lesson-brief.skill.md). Verify real Skill UUID/source links, learner audience/entry knowledge, prerequisites, aims, conceptual scope, source references, misconceptions, accuracy, desired depth, supported locales/accessibility and `assessmentPlan` including whether and why zero/one/multiple Quiz Sections are needed and required cognitive `AssessmentMethodKey` values.

For a **Course-originated** Lesson, first inspect its _already-authored_ methodology (Lesson YAML and proven Course handoff), including whether it is an approved assessment-only Lesson and which earlier Course Lesson slots/banks it requires. Evaluate **completeness and adequacy**; reuse if sufficient, repair real gaps in the same `production.methodology`, and record the updated SHA. For a **standalone** Lesson with no existing Methodology, author it substantively from scratch; if it exists, review/improve it just as for Course work. Do not require a storyboard or a literal `Methodologist status: Approved` frontmatter. Missing actual pedagogical substance or unverified Skills block stage; no extra progress property belongs in YAML. **Output:** complete pedagogical method and stage evidence in Lesson PR.

### 2. Content Creation

**Persona:** [Educational Screenwriter](../../personas/educational-screenwriter.persona.md). **Skill:** [Create Lesson Content](./create-lesson-content.skill.md). Enrich the **same** `lesson.yaml` with ordered Sections/blocks; actual intelligible source-language explanations, examples/counterexamples, worked demonstrations, learner actions, meaningful feedback, misconceptions, transitions and reflections. Specify `production.purpose`/`pedagogicalIntent` and complete implementable `production.specification`/`prompt`/`script`/`storyboard` for Scenes, media and any Quest, with accessibility, offline and weak-device equivalents. Follow real registered Config and renderer support; draft-only features are not shipped. No arbitrary minimum block counts, fake locales or Quiz answer banks. One short passive Text-only Section is a review warning, not an automatic schema failure. **Output:** full instructional blueprint, or for an approved assessment-only Lesson a complete accessible Quiz/evidence experience without invented teaching material, and production requirements in Git with Screenwriter SHA/handoff; unresolved material gaps block.

### 3. Content Review

**Persona:** an independent content/editorial specialist (a qualified Educational Screenwriter **other than the author**). **Skill:** [Review Lesson Content](./review-lesson-content.skill.md). Inspect every Section/ContentBlock, correctness, explanation depth, examples and common mistakes, age-appropriate terminology, transitions, feedback and accessibility of the copy. Flag empty/filler/thin material and concrete factual deficiencies; avoid count quotas. Findings identify severity, exact node path, reason, fix, role and **reviewed `lesson.yaml` SHA**. Reviewer does not edit/self-approve source. Screenwriter owns corrections, which invalidate dependent reviews. **Output:** independent findings, verdict and re-review evidence in PR; no stage-3 schema/status field.

### 4. Experience Review

**Persona:** independent [Learning Experience Expert](../../personas/learning-experience-expert.persona.md). **Skill:** [Review Lesson Experience](./review-lesson-experience.skill.md). Examine latest full `lesson.yaml` _and complete production specifications_ for pedagogically useful interaction, pacing/cognitive load, feedback, keyboard/touch/screen reader/semantic RTL/reduced motion, captions/nonvisual alternatives, offline and low-end devices. Identify pointless interactive theatre or infeasible Scene/Quest features. A planned interaction does not prove a functioning renderer. Record node-specific findings and exact reviewed SHA in Lesson PR. Author makes corrections; refresh affected review evidence. **Output:** independently verified experience verdict; blocked if requirements are vague, inaccessible or technologically unsupported with no suitable alternative.

### 5. Methodology Compliance

**Persona:** independent [Methodologist](../../personas/methodist.persona.md) **other than Stage 1 author**. **Skill:** [Review Lesson Methodology](./review-lesson-methodology.skill.md). Compare the whole latest Lesson YAML (all Sections, learner-facing copy, explanations, worked examples, misconception coverage and **complete** Scene/image/audio/video/Quest specs) to Stage 1 methodological scope, target Skills, prerequisite assumptions, progression, factual references, accessibility and `assessmentPlan`. Quiz intents must be present and justified; Question/answer correctness remains with Assessment Architect. Missing substantive source or production specification blocks; a not-yet-produced binary/locale does not itself fail methodological compliance. For instructional Lessons ensure Course neutrality; for an approved assessment-only Lesson verify its declared upstream Course Lesson evidence and do not require fabricated standalone teaching material. **Output:** independent outcome coverage, exact SHA, findings and sign-off in Lesson PR; no frontmatter approval token.

### 6. Resource Production

**Persona:** [Coding Agent](../../personas/coding-agent.persona.md), with actual Scene/media specialists. **Skills:** [Implement Scene](./implement-scene.skill.md), [Finalize Lesson](../../../shared/engine/scripts/finalizeLesson/README.md). This **single** stage includes scaffold generation **and** implementation. “Generate Sources” is **not** another workflow stage.

At the **Stage 6 entry**, perform a single complete **structural** validation against the existing Engine-Zod-derived `lesson.scaffold.schema.json` composed with `production.schema.json`. Verify YAML 1.2, stable UUID path/slug, collections, mandatory fields, source language in planned language tuple and production requirements with actionable paths. Stage 1–5 intentionally do **not** require a complete schema. The existing `generateYamlSchemas` command produces editor guides; it is not validation. The current `lessonBuilder` alone neither performs full validation nor declares readiness.

Run `node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs preflight --source <path/lesson.yaml>`. For the accepted final source, run `node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs finalize --source <path/lesson.yaml>` (which orchestrates the existing create-only `lessonBuilder.mjs generate`, checks expected generated inventory and source fidelity, verifies persistent methodological/production handoffs, and deletes only the unchanged temporary `lesson.yaml` on verified complete transfer). Never remove YAML on a skipped/partial/mismatched builder, pre-existing edited source, missing Markdown/Code/spec, invalid schema, stale SHA or incomplete transfer. Preserve sibling `questions.yaml` and `flashcards.yaml`. No overwrites or invented translations/resources. Once code exists, implement/coordinate actual Scenes/registry, physical media UUID filenames, captions/transcripts, accessibility/offline, references, tests and child bank Quiz links. Source-locale-only generated TypeScript may intentionally fail until resources/locales are finished; document **expected** versus **unexpected** Draft CI failures without `as any` or fake values. **Stage 6 completion requires implemented, verified source-language resources**, not merely successful scaffolding. Real media, Scene registrations, captions/transcripts, accessibility and offline behavior are part of this handoff. Record any additional locale-dependent assets still awaiting Stages 7–8 as explicit PR blockers; do not pretend they exist. **Final PR acceptance (after Translation/Review)** requires full declared-locale Lesson Props from the production-mode `generateLessonProps --preflight`, independently generated Question/Flashcard banks through `generateAssessmentResources --kind all` when applicable, and a successful textbook `package:build` that actually writes/stages the complete generated JSON and static manifest. Use current Engine CLI contracts and exact textbook scope. Neither `--draft` nor `SVITLO_MEDIA_MODE=draft` is valid final release evidence. A source-only draft, green YAML finalizer or passing Config validator never substitutes for complete publication.

### 7. Translation

**Persona:** [Technical Translator](../../personas/technical-translator.persona.md). **Skills:** [Technical Translation](../translation-workflow/technical-translation.skill.md), [Manage Translation Production](../translation-workflow/manage-translation-production.skill.md). Translate real persistent generated source — typed locale dictionaries, Markdown/Code-derived text, Scenes, media captions and blocks — after YAML finalization, per entity×locale under the planned language tuple. Use the existing/new authorized fixed-scope Translation Production Issue and verified child ownership. Do not fake target-language coverage, copy English as translation or lower `params.languages`. **Output:** real translated source and precise per-locale PR/SHA/progress; outstanding locales remain blocked.

### 8. Translation Review

**Persona:** an independent Technical Translator reviewer. **Skill:** [Review Translation](../translation-workflow/review-translation.skill.md). Review correct **Lesson-family Code-derived** per-locale Markdown and manifest, pinned source SHA, exact entity coverage, terminology, fidelity, scientific meaning, RTL, accessibility and captions. A Skills Markdown artifact does _not_ review a Lesson. Missing/stale/incomplete artifact blocks affected locale; owner controls reviewer start and chosen source PR/SHA. Remove tracked temporary `.agent-ci-artifacts` before merge. **Output:** independent per-locale verdict/sign-off tied to source revisions.

## Independent Questions and Flashcards

Record **separate** Questions/Flashcards states in the Lesson PR (`Not Started` / `PR #N @ SHA` / `Completed @ SHA` / `Not Applicable` with verified Methodologist rationale), not as Lesson stages. **A substantive instructional Lesson normally owns a real full Question Bank even if its own Quiz count is zero.** Questions N/A requires specific Methodologist evidence that its learning evidence does not warrant an own bank (e.g. a trivial orientation), **or** an approved assessment-only Lesson whose Quiz uses only verified external Question Banks. In the latter case **N/A means no _own_ bank**, not no Question resources: the Quiz still requires verified upstream banks and selected UUIDs. During planning, use `Questions: pending external banks` rather than prematurely recording completed N/A. An unfinished or missing expected own bank is **never** N/A. **Questions must be completed, integrated and independently reviewed before Flashcards authoring begins**, except when the Lesson PR explicitly records valid Questions N/A; do not manufacture Question references for Flashcards. Each independently authorized bank has its own Draft child PR targeting the active Lesson branch and its own workflow/reviews; for an already merged Lesson use a separately verified integration base. The detailed seven-stage [Questions Flow, PR #647](https://github.com/KiT-Maverik/svitlo/pull/647) and seven-stage [Flashcards Flow, PR #646](https://github.com/KiT-Maverik/svitlo/pull/646) are **sibling specifications**, not workflows to recreate inside #643. Flashcards may reference actual completed Question fields; neither child PR may overwrite unrelated Lesson sources or declare acceptance from the parent checkbox. Preserve `questions.yaml` and `flashcards.yaml` until their own verified materialization. Neither bank belongs in Lesson Config.

### Assessment-only Lesson upstream dependencies

An assessment-only Lesson Production PR is opened **only when that exact Lesson is separately authorized**, and for Course-originated work retains its existing `svitlo-course-lesson:v1` identity marker and real parent Course integration branch. Before selecting or finalizing Quiz candidates, the Lesson agent must:

1. Read the approved Course `course.yaml` source revision (or its Stage 5 materialized Course sources/methodology), resolve the exact **upstream Lesson slot keys, UUIDs, Skills and intended Question Bank owners**, and record the Course review SHA. Never infer dependency edges from titles or create additional Engine fields.
2. Record **each upstream Lesson PR, Question Bank child PR URL, head/source and independent review SHA, actual target/base branch, merge/integration status and required locales** in this Lesson PR. If a branch/PR does not yet exist, record that as a dependency, not as an invented ID or approval. The upstream Lessons are allowed to contain their own Questions with **no Quiz Section**.
3. Verify that each required bank was authored and independently reviewed, is **actually present in the assessment Lesson branch ancestry**, and that its Questions have been published with the expected owning Lesson UUID and complete selected resource/locale files. A successful GitHub check on an unmerged child branch is not integration. When bank selection spans Lessons, the global UUID resolver and locale/build gates from [PR #668](https://github.com/KiT-Maverik/svitlo/pull/668) must be integrated and **verified**, not merely described in a Draft PR.
4. Until all gates are satisfied, leave final `params.selection.questionIds`, Quiz resource validation and publication **blocked** with the precise missing owner/PR/SHA/locale. Independent methodology/content work may continue if it does not falsify a completed Quiz; the earlier Course Stage 4 methodology approval is unaffected. If the actual `defineQuizSection` requires nonempty UUIDs, leave the authored Quiz config as an explicitly incomplete draft rather than fabricating placeholders or claiming the Lesson builds.
5. Only the Assessment Architect approves the small deliberate Question UUID candidate set and scoring/coverage; the Section owner changes only the approved Quiz Section. Validate actual IDs, ownership, availability per requested locale and real rendered loading/build results, retaining the complete upstream banks unchanged.

This is a **downstream-only dependency**: never block or rewrite a source Lesson's own valid bank production because the Course assessment Lesson is pending. No new Lesson status file, approval YAML or Runtime dependency resolver is part of this policy.

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

- Questions (own bank): <state; PR; SHA; Methodologist rationale if N/A; pending external banks is NOT completed N/A>
- Flashcards: <state; PR; SHA; blocker or N/A reason>
- Upstream assessment dependencies (when applicable): <source Course slots and Lesson UUIDs; owning Lesson PRs; Question Bank PR URLs; source/review/integration SHAs; branch ancestry; requested locales; exact blocker and next actor>

## Final QA / Development Review — NOT a ninth stage

- [ ] Verified YAML source materialization; no stale temporary YAML
- [ ] Own Questions completed before Flashcards (or Methodologist-verified own Questions N/A); all relevant external Question Bank dependencies and source/review/integration SHAs reconciled
- [ ] Independent Content/Experience/Compliance evidence current
- [ ] Actual Scenes, media, offline/a11y behavior verified
- [ ] No `TODO(asset)` or reserved Nil UUID filenames remain anywhere in this Lesson's typed source, including Question/Flashcard banks; every required physical media file, poster, subtitle/transcript and Scene is implemented and verified
- [ ] Production-mode Lesson and any **owned or externally referenced** Question/Flashcard resources are built/staged for the complete required locale scope; verify actual `package:build` output and manifest, **every Quiz candidate's owner Lesson, UUID and locale via the global resolver (#668)**, and actual client loading rather than relying on successful scaffolding, a green unrelated PR or `--draft`
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

Final QA and independent Development Review are **not stage nine**. After actual persistent source/resources/locales exist, verify scoped Engine build/tests, Lesson Builder/finalizer regression tests, YAML schema `--check` after Engine build, source/artifact validation, textbook build/typecheck, formatting and mandatory PR CI; record executed command, branch SHA, results and honest blockers. During early Draft stages explain narrowly expected CI failures; investigate unrelated regressions. The `Content packages build` workflow checks touched Lesson/Course UUID roots for unresolved `TODO(asset)`, Nil media UUIDs and temporary YAML before a PR becomes review-ready; its strict production textbook build handles physical media and generated Props. This scoped check is **not** an approval registry and must not fail an unrelated Draft merely for containing unproduced assets. Record the exact committed head SHA and generated resource inventory in the Lesson PR. Configure protected-branch required status checks separately: GitHub Actions alone cannot make a check non-bypassable. Owner explicitly controls Ready and merge. Do not silently alter #639's Course flow, unrelated banks, Engine Runtime Props or translation review policy.
