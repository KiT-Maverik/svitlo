# Create Course Flow

**Role:** durable Course production coordinator (not a standalone authoring persona). This is the sole supported Course production authoring workflow. Its seven stages and one `course.yaml` are the complete editorial protocol; do not create parallel TOC, methodology, matching or Config YAML workflows. Before doing anything read root `AGENTS.md` and `README.md`, the Studio rules, the [Course entity](../../docs/entities/course.md), [UUID addressing](../../docs/architecture/entity-uuid-addressing.md), [YAML handoff](../../docs/architecture/yaml-config-scaffolding.md), current Engine Course source/tests and the current GitHub PR/Issue state.

## Principles and authoritative state

- Exactly **one immutable Course UUID** and one **parent integration Draft PR** own one Course production effort. The PR description (not Git-authored Runtime fields, chat history or a second status file) owns progress and next action. Git history, real files, child PRs, Production Issues, and independent reviews provide evidence.
- The **only temporary YAML source** for a Course is `content/<book>/data/courses/<last-hex>/<uuid>/course.yaml`, edited throughout planning and independently reviewed before materialization. It contains the complete Course authoring specification, including Config-relevant fields and production/methodology content. **There is no conversion to, generation of, or persistent handoff through `config.yaml`.** Stage 5 consumes this same approved `course.yaml` **directly** and creates the final Course/Module/Chapter/Episode TypeScript and Markdown files plus new minimal Lesson YAML handoffs. Once the complete output has been validated and safely committed, remove `course.yaml` in a subsequent commit; Git history preserves the approved input. **Never retain either `course.yaml` or `config.yaml` as a second permanent Course source.**
- Methodology decides **what, why, depth and order**. No Scenario question or mode is asked in Stages 1–2. Stage 2 may place **unresolved** Lesson/Episode placeholders in the Course hierarchy, but does not author Lesson identity/methodology or Episode scripts, Sections, Scenes, dialogues, UI, Questions or scoring schemes. A separate optional Screenwriter workflow may later create Experiences; it cannot hold up methodological Stage 4 solely for missing plot.
- Standalone Lessons are reusable, neutral entities with separate Lesson Production and Translation Production approvals. A **matched existing Lesson** is referenced by its verified `lessonId`; a **newly planned Lesson** is described by a complete methodology **inside its Course `course.yaml` slot**, without a mandatory `lessonId`, standalone source file or production PR. Neither kind of planning starts Lesson Production. Never embed a Course ID, storyline or Course-specific logic into a standalone Lesson Config/Props.
- **Authorization boundary:** editing a Course plan, approving Stage 3, accepting Stage 4, allocating Course/Module/Chapter structure, or saying "continue Course work" does **not** authorize opening Lesson branches/PRs. Create/reuse a Lesson PR only after an **explicit, separately scoped start of work on that specific Lesson** through [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md). Even a fully specified planned Lesson can remain unstarted indefinitely.
- **Planning is not production, but materialization creates sources:** Stage 3/4 edit and approve only the Course specification. **Stage 5 automatically creates missing Lesson identities and minimal reusable `lesson.yaml` sources** from approved in-place methodologies as part of Course materialization, without starting Lesson Production PRs or generating Lesson TypeScript. Starting Lesson authoring/reviews is a later, separately authorized task.
- **Current implementation:** the single-source `materializeCourseFlow` CLI, Stage 3 schema and validator now support planned Lesson methodology and generate Course files directly, with stable new Lesson UUIDs and minimal `lesson.yaml` files. **No `config.yaml` is written.** Its authored Module/Chapter/Episode sources now follow a single root `content/` tree with direct slug nesting, local `index.ts` and `methodology.md`, and Course package import aliases. Lesson imports remain independent. After the verified Stage 5 source commit, the trusted materialization job registers new Lesson UUIDs once in the parent PR's managed Lessons block; it does not parse Course TypeScript or periodically resynchronize statuses.
- Completion is always tied to an actual source SHA and documented evidence. A checkmark means **verified deliverables and the approval required by that specific stage**, not an agent's optimistic status message. Stage 3 has no separate independent-review gate: independent whole-Course sign-off belongs to Stage 4.

## Starting or resuming by PR number

1. Inspect the exact PR number, complete body, labels, head/base branches, linked subtask PRs, historical Lesson/Translation Production Issues where they actually exist, comments, reviewer decisions, CI/check suites and immutable head SHA. Do not assume chat history or an old checklist is current.
2. Read the source hierarchy at the UUID bucket path. During Course planning inspect the single `course.yaml`; after verified materialization inspect the generated TypeScript/Markdown Course tree and canonical Lesson sources, **not any `config.yaml`**. Inspect reused Lessons' actual methodology at their UUID-resolved source paths; a planned Lesson is reviewed at its Course slot before materialization. Reconcile the source plan and its generated outputs by immutable SHA/provenance during the transition; never invent missing evidence.
3. **Reconcile** each Course stage, Module subtask and target locale against Git evidence and the Stage 4 review recorded in the PR. Record the SHA, blocker, owner, links and exact next authorized action; check conflicts or stale authoring/review. Never auto-approve an editorial review.
4. **On a status-only request (including a bare PR number), report the next recommended action without executing it.** When the user explicitly authorizes work, continue the **first authorized unfinished Course planning unit** (or an independently scoped Module/locale in an assigned agent-subtask PR). A parent coordinating agent is the only editor of the manually maintained PR checklist; do not overwrite concurrent edits. The Course parent has `pr: integration`. Optional Course planning subtasks can target that branch; **Lesson Production is a separate authorization** and may later create its own PRs.
5. Treat the managed `<!-- svitlo-course-lessons:start -->` ... `<!-- svitlo-course-lessons:end -->` section as a **one-time Stage 5 allocation handoff**, not an automatically refreshed Course tracker. Before materialization, planned new Lessons remain identified only by Course slot; after Stage 5 the trusted registration inserts their actual generated UUID/YAML/title with production PR `Not started`. Do not generate new Lesson IDs, rebuild the table on resume, modify another agent's PR links or open a Lesson PR without separate authorization.

## Mandatory user-facing progress report and next-action handoff

After **every completed or paused unit of work**, at an authorization/review blocker, and whenever asked for status (including a new-chat message containing only a Course PR number), finish with a **user-facing report**. A bare PR number means **inspect and recommend**, not execute a stage, start a Lesson or mutate files. Re-fetch the actual parent PR head/base, manual `## Workflow` checklist, source/evidence SHAs, relevant child PRs and course/lesson files; reconcile stale or contradictory checkboxes before reporting. The PR checklist remains the authoritative _workflow tracker_, but a checked box alone is not verified evidence. Do not rewrite another agent's checklist while merely reporting. This is a chat presentation contract, **not** a new Git/YAML/Engine status field.

Always provide, in this order:

1. **Course and PR**: verified Course identity, parent PR `#N`, and current evidence/head SHA (or explicitly unknown).
2. **All seven stages in their canonical order**, with name and clear state: `✅ completed`, `▶ in progress`, `⬜ not started`, `⛔ blocked` or `↻ stale`. Use a checkmark **only** for verified, SHA-backed deliverables _and_ required approvals. Include the relevant Module or locale breakdown when a stage is partially complete. Do not infer completed translations from declared locales.
3. **Last completed stage**: `Stage N — <name> completed` with the actual evidence, or say precisely that no new stage was completed. Name any blocker or stale evidence.
4. **Next Course stage**: the first remaining eligible stage (with prerequisite/authorization and blocked state), or explicitly `None — all seven Course stages are complete`. Do not silently skip Stages 6–7 when recommending Lesson work instead.
5. **Recommended next action**: _one_ concrete, separately authorized and currently feasible operation, with reason, exact PR and verified identity. Put a **single plain-text, copyable chat instruction** on its own fenced `text` line, e.g. `do course stage 6 for PR #<course-pr-number>` or `do lesson <verified-lesson-uuid> related to PR #<course-pr-number>`. This is a suggested **chat instruction**, not an existing CLI command or an instruction to the agent to execute it now. If no safe next action is verifiable, state the missing evidence/decision instead of inventing a command. Invite the user to send the command or reply `go` to the **single unambiguous proposal in the current chat**; any other clear message authorizing that same action works. A bare PR number or `go` without an unambiguous current proposal does not start work.

**Special handoff immediately after Stage 5, and on any later resume with Stage 5 complete:** explicitly recommend **pausing the Course workflow and starting the independent Lesson workflow** for one eligible Course Lesson, rather than automatically proceeding to Course translations. Explain that Stage 6 (Course-owned translations) remains the next Course stage and can be selected instead. Stage 5 creates only initial Lesson YAML/UUIDs; **it never creates Lesson PRs or begins Lesson Production**. Show the verified Lesson slug/title, UUID, canonical YAML path, relationship to the Course UUID and parent Course PR, plus its verified production PR state. Prefer the earliest pedagogically suitable not-yet-started Lesson in actual Course order, accounting for known prerequisite/assessment-bank dependencies; recommend **one** Lesson, not a batch. Give this exact copyable pattern with real values:

```text
do lesson <lesson-uuid> related to PR #<course-pr-number>
```

Before calling a Lesson eligible, reconcile actual post-materialization Course composition/TS imports, the canonical Lesson `lesson.yaml`, source/head SHA and existing open, Draft, closed and merged Lesson PR claims **by exact UUID and `svitlo-course-lesson:v1` Course/Lesson/Parent PR marker**. A matching existing Lesson PR means **resume that PR**, not start another. A matched historical/test PR with a **different** Lesson UUID is not that Lesson's production PR. Check for conflicting claims; do not infer a link from a matching slug or PR title. An absent or inconsistent one-time Lesson registration is **not evidence that there are zero Lessons**: inspect committed files, report the discrepancy and never silently regenerate or overwrite managed rows. If no verified, unstarted Lesson exists, recommend the next properly authorized Course stage or resolving the precise blocker. This suggestion grants no permission to create a Lesson PR: only the user's subsequent, **specific** instruction (or unambiguous `go` accepting the single identified Lesson) can start [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md), reusing its existing UUID and parent Course branch.

**Terminal message:** once **all seven stages** are individually verified complete, say explicitly: **"All seven Course workflow stages are complete. There is no next Course stage. You can assign new work."** Do not continue automatically, invent an eighth stage or use an uncompleted final QA/release gate to misstate stage status. Report outstanding Lesson, bank, final QA, CI, publication or merge dependencies **separately**: seven completed workflow stages do not by themselves mean the Course is published or the PR may be merged.

## Course assessment placement and assessment-only Lesson dependencies

**Approved production policy:** The Methodologist decides whether a Quiz is appropriate **in an ordinary Lesson or in a separate Lesson at a Chapter/Module/Course boundary**. A Quiz is not a new entity or Lesson type: `defineQuizSection` selects real Question UUIDs from independently authored Question Banks; it does not define Questions. This policy extends, rather than replaces, the seven stages below. The Engine's cross-Lesson UUID resolver is a separate prerequisite for publishing a Quiz that uses other Lessons' Questions.

- **Stage 1 — Course methodology:** describe how the Course will gather meaningful learning evidence; do not assume every Lesson requires a Quiz or attach an arbitrary Quiz quota. Formative feedback is allowed without Quiz.
- **Stage 2 — macrostructure:** identify possible assessment transitions after Chapters/Modules/Course in normal pedagogical sequence, without authoring Question UUIDs, adding automatic mandatory assessment wrappers, or creating Lesson PRs.
- **Stage 3 — Lesson placement:** ordinary, nontrivial _instructional_ Lessons should have their own meaningful independently produced Question Bank by default, even when no Quiz Section is included in the Lesson; if a bank is genuinely not pedagogically applicable (e.g. brief orientation or pure practice with different evidence), the Methodologist records a concrete rationale. No Quiz requirement is inferred from the existence of a bank. A Lesson may have zero, one or multiple justified Quiz Sections.
- **Optional assessment Lesson:** when appropriate, insert an ordinary `type: lesson` after the relevant Course/Module/Chapter content. Its complete methodology states the covered Skills, intended evidence, **specific upstream Course Lesson slots whose Question Banks it consumes**, scope boundary, audience and assessment rationale. It may have no separate Question Bank. Its Quiz selects Question IDs from the completed upstream banks. It is allowed to be **Course-context-dependent** instead of pretending to be a fully reusable standalone Lesson; it must not encode new Course IDs or a new `assessmentLesson` Runtime discriminator in Engine Config. Keep Course placement/dependency metadata in the Course methodology and the relevant Lesson PR, not an invented runtime `dependsOn` field.
- **Stage 4 — independent review:** confirm the overall assessment placement and every bank dependency, check coverage across the whole chapter/module and avoid repeated scoring. An assessment Lesson's dependency does **not** block review of the planned Course methodology simply because the upstream Question UUIDs do not exist yet.
- **Stage 5 — materialization:** continue to allocate new Lesson IDs and scaffold minimal `lesson.yaml` files from approved slots. Preserve the assessment Lesson's methodology and Course ownership/slot provenance in the authored handoff; never invent Question UUIDs, generate Questions, or create Lesson Production PRs automatically.
- **When Lesson Production is separately authorized:** record the assessment Lesson's exact upstream Lesson UUIDs, linked upstream Lesson/Question Bank PR URLs and relevant source/review SHAs in **its own Draft PR**. The agent may work on independent methodology/content, but **must not finalize Quiz `questionIds` or claim publication readiness until the required upstream Question Banks are implemented, independently reviewed, integrated into the target branch, and their referenced Questions verified in the published manifest and required locales**. Follow actual branch ancestry. A PR merely existing or having a green CI check is not sufficient. If pending, mark the Lesson PR as blocked with explicit dependencies and the next unblock step. Do not force upstream teaching PRs to depend on the downstream assessment Lesson.
- **Assessment-only banks:** `Questions: Not Applicable` is legitimate for an assessment Lesson _only if_ its approved methodology declares external Question Banks, all selected question IDs resolve with real eligible locales, and its PR tracks upstream evidence; this is different from an unfinished own bank. For a nontrivial instructional Lesson, default to a proper bank even if its own Quiz is absent. Flashcard Bank is separately optional and retains its existing prerequisite policy.

**Boundary:** this policy changes planning and downstream production gates, not Course/Quiz schemas or runtime behavior. The current Course `lesson.methodology` text is sufficient; no new `dependsOn` property, second YAML or schema validator is needed. Do not edit unrelated Course PRs or Lesson branches as a side effect. Verify actual cross-Lesson Question resolution, published banks, branch ancestry and locale support before declaring cross-Lesson Quiz publication operational.

## Seven-stage progression

Every stage uses five statuses: **not started** (no verified work), **in progress** (partial verified outputs), **blocked** (precise missing dependency or decision and next action), **completed** (all acceptance criteria met at a recorded SHA), **stale** (previous evidence no longer applies). Track blocking reason and next action; a Stage may be marked complete only when its declared deliverables are verified.

### 1. Create Course Methodology — whole Course

**Owner:** [Methodologist](../../personas/methodist.persona.md). **Reference:** [Skill Taxonomy Workflow](../skill-taxonomy-workflow/README.md). **Prerequisites:** approved Course intent; real target textbook/package; verified Course identity or authorization to create one.

Interview the owner about identity, target audience (preschool through adult), level, entry knowledge, outcomes, scope/depth, teaching approach, accessibility, source language, target languages and _specific_ standards versions where relevant. Do **not** ask about `scenarioMode` or choose a story. Do not invent a narrative decision during methodological planning.

Use `resolveEntityPath` for Course UUID location; initialize the parent Draft PR with the tracker below and correct GitHub labels. Generate an English taxonomy view read-only with:
`node shared/engine/scripts/generateSkillsTaxonomy/generate-skills-taxonomy.mjs --package content/<book> --locale en --stdout`.
Verify exact Skill/Group/Domain UUIDs against source. Distinguish **entry prerequisites** from **skills to be taught**; Domain/Group scope signals intent, not every member's guaranteed mastery. Record standards alignment evidence (jurisdiction, version, source, intended/partial/verified) without claiming certification. Declare `documentLanguage` separately from planned `supportedLanguages`; no fake translations.

**Course methodology authoring standard (all fields live in the one `course.yaml`):** State an age/learner profile, previous knowledge and real entry conditions before defining objectives. Separate **prerequisites** from competencies taught; reference verified Skill, SkillGroup, SkillDomain and Course UUIDs with explicit breadth, never infer mastery of every Domain member or invent IDs. Explain the Course's specific scope and exclusions, depth, conceptual models, recurring misconceptions, causal sequence, feedback, differentiation, accessibility/offline needs and realistic assessment evidence. For each relevant EducationStandard, identify jurisdiction, edition/version, original source and the verified/partial/intended extent of alignment; do not claim certification from a topic resemblance. Define `documentLanguage` independently from the nonempty, supported, unique `supportedLanguages` set; neither is evidence of translated text. Open taxonomy/standard gaps remain explicit named decisions with owners, not placeholder competencies. A reviewer must be able to derive a coherent learning plan without inventing subject facts or pedagogy. Do **not** create a persistent Markdown, status frontmatter, parallel YAML or make a narrative-mode choice during this stage.

**Output:** commit one temporary editorial `course.yaml` containing immutable ID, broad rationale and outcomes/prerequisite taxonomy scope, language intent, audience, standards evidence and open questions. No permanent `methodology.md` and no Lesson slots yet. **Complete** only after editor confirms breadth and actual taxonomy references at a recorded SHA. **Handoff:** macrostructure.

### 2. Design Course Structure — whole Course

**Owner:** [Methodologist](../../personas/methodist.persona.md). **Prerequisite:** accepted Stage 1 methodological scope.

In the _same_ `course.yaml`, author ordered Course/Module/Chapter groups, stable keys/slugs, measurable outcomes, rationale, prerequisites, scope distribution and depth. Course may have direct Chapters or Lessons; Modules may have Chapters and/or Lessons; Chapters may have Lessons. Do not add wrapper Modules solely for bookkeeping. **Place provisional Lesson/Episode slots only where the learning sequence justifies them.** At this stage the Methodologist uses the canonical Skill taxonomy, **does not search existing Lessons**, assign Lesson identities, invent Lesson titles/objectives or design Episode narrative. Module/Chapter methodology is editorial, not an extra Runtime Props field.

**Course sequence quality rules:** Build a real prerequisite graph from canonical Skill descriptions, learner readiness, conceptual dependency and the intended scope; do not follow taxonomy folder order mechanically. Choose Modules/Chapters only for meaningful pedagogical boundaries, with no mandatory wrapper depth. Order content from required foundations to conceptual application while managing cognitive load and planned reinforcement. A Skill may recur intentionally across different eventual Lesson slots at distinct depths, but redundant repetitions need an explicit learning reason; multiple related Skills may belong in one coherent future Lesson. Audit the _entire_ progression for missing preparatory knowledge, cycles, gaps, unsupported domain coverage claims and disproportionate module depth. Stage 2 establishes the macrostructure, competency-group ownership and **provisional** Lesson/Episode placements; final Lesson matching and Episode authoring belong to later, authorized work. Keep unresolved taxonomy proposals separate from real Skill UUIDs; escalate missing or incorrectly split Skills to the Methodologist rather than fabricating names or IDs.

**Provisional placement format (Stage 2 only):** use temporary `content.items` collection keys, such as `TMP_lesson_1` and `TMP_episode_1`, in their exact `content.order` positions. A Lesson placeholder contains **only** `type: lesson` and a nonempty `skills` list of **real, verified Skill UUIDs**. It has **no** `slug`, `title`, `objective`, `lessonId`, `methodology` or invented ID. An optional Episode placeholder contains **only** `type: episode`; its story and Section/Scene design belong to separately authorized scenario work.

```yaml
content:
  items:
    TMP_lesson_1:
      type: lesson
      skills:
        - faa8f11a-cc06-42c9-8864-8151732e690a # replace with an actual verified taxonomy UUID
    TMP_episode_1:
      type: episode
  order: [TMP_lesson_1, TMP_episode_1]
```

**Complete:** accepted entire macrostructure, meaningful provisional placement/order and Skill coverage, with no unresolved ordering/coverage decision. The final Course must satisfy the [Course methodology completeness contract](../../docs/entities/course.md#course-methodology-completeness--pedagogical-technical-specification); Stage 1 breadth alone is not evidence of a complete educational specification. **Handoff:** Stage 3 resolves all temporary keys and carries out Lesson matching; separately authorized scenario work completes optional Episodes. Stage 2 creates **no** Lesson or Episode entities, UUIDs or PRs.

**Validation boundary:** these deliberately incomplete `TMP_*` placeholders are **not valid under the final [Course Flow JSON Schema](./course-flow.schema.json)** and must **not** be forced through it. Do not require a Stage 2 schema/CLI/CI validation run, add dummy titles/IDs, create a Stage 2 generator or weaken the final schema. Preserve normal authoring-source review; the complete Stage 3/4 plan is validated at the actual materialization boundary. No parallel YAML input is allowed.

### 3. Design & Match Lessons — each Module (or bounded alternative)

**Owner:** [Methodologist](../../personas/methodist.persona.md), working with the [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md) on Quiz intent and assessment evidence **within the same Stage 3 authoring cycle, without a second independent Stage 3 review gate**. **Prerequisite:** accepted Stage 2 Course/Module/Chapter structure. **Authoritative output:** the **same Course `course.yaml`** and the parent Course PR description. This is **Course specification work**, not Lesson Production. Apply the pedagogical completeness requirements in the [Course](../../docs/entities/course.md#course-methodology-completeness--pedagogical-technical-specification) and [Lesson](../../docs/entities/lesson.md#lesson-methodology-completeness--pedagogical-technical-specification) entity documentation.

Proceed by Module or other bounded Course/Chapter unit. **Resolve every Stage 2 `TMP_lesson_N` placement**: preserve its position and real Skill IDs, perform the matching/new-Lesson work below, replace its temporary collection key with the selected stable placement key, and update the parent `content.items`, `content.order` and any references to that placement. Resolve optional `TMP_episode_N` similarly only when Episode authorship is authorized; otherwise remove/defer the placeholder without inventing narrative. Neither a temporary key nor a placeholder may reach Stage 4 approval, typed imports, UUID allocation or Stage 5 materialization. Preserve the ordered hierarchy and follow these steps **for each required Lesson placement**:

1. **Design the slot.** Determine exact verified Skill UUIDs and prerequisite relationships, learner audience, learning outcomes, depth, coverage boundary, sequencing rationale and assessment evidence. Avoid creating slots just to exercise a nesting level unless a concrete pedagogical reason is recorded for independent review. A slot is part of the Course plan, not evidence that a Lesson entity or PR exists.
2. **Search for existing Lessons.** Query relevant Skill UUIDs with read-only `/get lesson by skill <uuid> --package content/<book>` (or `node shared/engine/scripts/queryLessons/query-lessons.mjs --by skill --skill <uuid> --package content/<book> --format json --stdout`). Inspect the query's `complete`, diagnostics, actual source SHA and language evidence: `complete: false` or missing files are **not** proof of absence. Evaluate candidates against the complete intended Skill set, target age, audience/entry conditions, conceptual depth, methodology, assessment requirements and target locale subset. Do not conflate matching Skill UUIDs with educational suitability.
3. **Read the candidate's real methodology before reuse.** For each candidate `lessonId`, resolve the canonical UUID bucket using `resolveEntityPath(id)`: `content/<book>/data/lessons/<last-hex>/<lesson-uuid>/`. **Open and read `methodology.md` there when it exists.** If the Lesson is still in the current authoring flow and `methodology.md` is absent, inspect its actual `lesson.yaml` `production.methodology` plus verified author/review evidence; if source or completeness cannot be established, mark the match as unverified and investigate rather than guessing. Inspect substantive objectives, facts/examples, misconceptions, prerequisites, desired evidence, supported languages and implementation/readiness separately. Use the candidate only if its real methodology fits the Course's specific need.
4. **Choose one of two slot outcomes in `course.yaml`:**
   - **Existing, suitable Lesson — reuse.** Store its real `lessonId` with a concise, evidence-backed matching rationale and exact methodology source path/SHA in the Course planning/review record. The Lesson is still independently owned; **do not copy its full methodology into the Course plan**, silently modify it, mint a new UUID, create another PR or treat a missing translation as a reason to clone it. Missing Course languages are a separate localization dependency.
   - **New Lesson — specify, do not produce.** Keep the slot's stable key and existing Course-level metadata, and write the **complete Lesson methodology directly at that slot** in the single `course.yaml`. This is a substantive pedagogical specification, not a one-line outline. For instructional Lessons include audience and entry conditions, exact Skill targets, observable outcomes and depth, accurate subject matter with examples/counterexamples, terminology, misconceptions, conceptual progression, assessment plan (justified zero/one/multiple Quizzes with target Skills and canonical `AssessmentMethodKey` intent), accessibility/offline considerations, references and constraints. For a separately placed **assessment-only Lesson**, specify the Skills/evidence assessed, upstream Lesson slots and bank owners, Chapter/Module/Course coverage boundary, intended Quiz, dependencies and rationale for having no own Question Bank; its methodology may depend on its **approved Course placement**. Do not claim it is a universally reusable independent teaching Lesson. Keep placement/provenance only in editorial methodology and PR descriptions, never in new Engine dependency fields. Do **not** require a `lessonId`, a standalone `lesson.yaml`, a `methodology.md` in a nonexistent Lesson directory, a Lesson branch or a Lesson PR at this stage. Review and, if editorially required, translate this specification **as part of Course planning** without inventing a production entity.

**Illustrative editorial snippet (validate the complete Course document, not this excerpt):**

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

For an **existing** Lesson the slot instead carries the verified `lessonId`, and the reviewer follows that ID to the independent methodology source. A planned assessment-only Lesson uses exactly the same `type: lesson` slot, not a new type, and its `methodology` describes upstream Lesson slot keys and the evidence to measure. Do not invent upstream Question UUIDs during planning. For a **planned** Lesson the embedded methodology, not an allocated UUID or an implementation PR, is the basis for Stage 4 review. Do not add `draft`, `approved`, `productionStatus` or artificial Lesson entity state to editorial YAML.

**Candidate matching and Lesson-slot review standard:** Search all relevant real Skill UUIDs, using the read-only query with `complete`/diagnostic information; a missing result from an incomplete index does _not_ prove no Lesson exists. A shared Skill UUID by itself does not prove sufficient age, depth, full target coverage, prerequisite suitability or language support. Read the candidate's actual pedagogy and authored source, compare all required outcomes, and prefer reuse over duplicating an adequate standalone Lesson. The Course's target languages must fit inside a reused Lesson's verified supported set; otherwise record a separate localization dependency rather than clone it. Do not reuse the same Lesson twice without pedagogical rationale. For genuinely new Lessons, author the complete in-place methodology and Skill set under that slot, without allocating an ID or opening a Lesson PR. Maintain Course-specific matching rationale in the parent source/review evidence; never write it into an independent Lesson. Document upstream Question Bank owners/assessment scope for cross-Lesson Quiz intent without inventing Question IDs.

**Course parent PR tracker:** for each Module/bounded unit record (a) designed slots and Skills, (b) complete lookup outcome and candidate method evidence, (c) existing Lesson UUID + source reference **or** completed in-place planned methodology, and (d) Stage 3 assessment-intent decisions plus any remaining editorial questions for Stage 4. For an assessment-only slot record upstream source slot keys/known Lesson IDs, owning bank intention, coverage boundary and post-materialization production dependencies; **do not require** bank/Question UUIDs for Course Stage 3 or Stage 4. **Do not create "missing Lesson methodology" PRs as a subtask of Stage 3.** Existing independently authorized Lesson PRs, if any, remain valid and may be linked as evidence; their presence is never required for Course plan completion.

**Stage 3 completion:** there are **zero `TMP_*` placeholders or references** remaining, the final `content.items/order` keys agree, and the Methodologist has completed the pedagogical specification for all actual Course Lesson slots with the Assessment Architect's assessment-intent input incorporated; placements and Skill coverage are justified; existing matches have verified methodology/source suitability; every planned slot has a complete in-place methodology appropriate to its purpose (Course-neutral for reusable instructional Lessons, with approved placement and upstream-bank rationale for assessment-only Lessons); Quiz decisions and substantive authoring questions are resolved. Record the exact Course source SHA, matching evidence, assessment decisions and successful `--stage 3-complete` structural check in the **parent Course PR**. **Do not require a separate independent review of the initial Stage 3 methodology or its corrections before Stage 3 completion.** A complete Stage 3 may contain **zero Lesson Production PRs** and **planned slots without `lessonId`**. Its handoff is the **single independent whole-Course Plan Review (Stage 4)**, which reviews all Lesson methodologies and assessment intent; Stage 3 completion is not Stage 4 approval and does not authorize Lesson Production.

**Current tooling:** the revised Stage 3 JSON Schema and read-only CLI accept in-place Lesson methodology without a `lessonId` at `--stage 3-complete`. This is **structural acceptance only**; it does not constitute independent Stage 4 Course-wide approval or a claim of a completed Lesson. The source-pinned Stage 5 registration allocates and records new Lesson identities once; no later TypeScript-source inventory generation is part of this flow.

### 4. Review Course Plan — whole Course

**Owner:** an independent reviewer agent in a **separate chat/execution context** from Stage 1–3 authoring. Apply the [Methodologist](../../personas/methodist.persona.md) and [Learning Assessment Architect](../../personas/learning-assessment-architect.persona.md) review responsibilities in **one substantive whole-Course pass**. The separate reviewer may use the **same GitHub account** as the author. **Skill:** [Review Course Methodology and Configuration](./review-course-methodology.skill.md), scoped to the editorial plan, not nonexistent Lesson production entities. **Prerequisites:** completed Stage 3 specification and verified taxonomy.

Review the **entire current Course specification** as one coherent plan: Course/Module/Chapter coverage, intended Skill depth, prerequisites, sequence, duplication or gaps, audience, accessibility, standards evidence, languages, and assessment validity. For each reused Lesson, inspect its actual verified methodology and source revision; for each planned Lesson, inspect the complete methodology and Quiz intent in its `course.yaml` slot. Check assessment-only Lesson scope, upstream bank ownership, outcome coverage and Quiz rationale across Course boundaries. Missing future Question UUIDs do not block review of a complete plan, but unidentified owners or underspecified outcomes do.

Perform real independent editorial analysis. Record findings and corrective actions in the **parent Course PR discussion/checklist**, identifying relevant Course paths, Lesson slots and reviewed source revision. The reviewer may correct the Course YAML in the separate chat, recheck those corrections and document the result; return unresolved methodological decisions to the appropriate author instead of silently approving them. Material corrections after a completed review require the parent tracker to mark Stage 4 stale/incomplete until their review has been reconciled. Do not alter independently owned Lesson sources without separate authorization.

**Independent review criteria:** Compare every Course/Module/Chapter outcome with the actual ordered Lesson slots and canonical taxonomy. Check prerequisite gaps, scientific/methodological accuracy, skill coverage, age/depth fit, planned practice and feedback, multiple/single-Quiz intent, intended assessment evidence, missed misconceptions and unreasonable repetition. For reused Lessons inspect their real methodology and locale coverage; for planned Lessons audit each complete in-place methodology and the feasibility of its bank dependencies. Verify standards claims against actual jurisdiction/version/source and their bounded evidence, plus accessible and offline-equivalent learning intent. Record exact reviewed source SHA, specific findings, authorized corrections and approval in the existing parent Course PR; a passing JSON Schema or superficial narrative summary is not approval. Stage 4 approves the Course _plan_ only: no Lesson implementation, story, media, override, translations, publication or Ready/merge is implied.

**Complete:** the separate review pass has examined the whole current Course plan, resolved requested corrections and recorded its outcome in the parent Course PR. Check **exactly one** `- [x] 4. Review Course Plan` item in that PR's `## Workflow` checklist when these requirements are met. Stage 4 completion is the pedagogical handoff for Stage 5; it does **not** require a separate GitHub identity, `APPROVED` review event, role/UUID/blob signature line or duplicate approval round. This is a trusted workflow declaration, not technical proof that a separate chat occurred. Course plan approval does not authorize standalone Lesson Production, Quiz publication, translations or Course release.

### 5. Materialize Course — whole Course

**Owner:** [Coding Agent](../../personas/coding-agent.persona.md). **Prerequisite:** completed Stage 4 review recorded by the checked parent Course PR Workflow item and a separate explicit maintainer authorization to materialize; Stage 5 still pins and verifies the Course YAML source blob and PR HEAD. **Input:** the same, approved, temporary **`course.yaml`**, containing all Course planning and authoring specifications. **Output:** generated TypeScript/Markdown Course sources plus minimal `lesson.yaml` files for newly planned Lessons. **Never create or retain a separate `config.yaml`.** The editor and builder use one YAML document, not an editorial-YAML-to-technical-YAML conversion.

**One-stage source-generation contract:**

1. **Validate once, generate directly.** Read and validate the approved `course.yaml` against the relevant Course/Module/Chapter/Episode/Section/ContentBlock authoring contracts and methodology requirements, then generate the authoring source tree **directly from that parsed document**. The materializer can perform internal in-memory normalization to Engine Config shapes; it must **not write intermediate YAML** or require a second `config.yaml` input. Distinguish correct-but-incomplete draft TypeScript from errors in the materializer.
2. **Create Course-owned files.** Generate canonical Course UUID directories and real source files: Course `index.ts`, Course `methodology.md`, Course content/composition modules, `review.ts` skeleton (without invented sign-offs), Module/Chapter source files and indexes, and **Episode directories, `defineEpisode` source and Section/content scaffolds when those Episodes were actually authored in the approved source**. Use actual Engine `define*` contracts and stable `items/order` relationships; never fabricate storyline, content, Questions, media, approval or translations. Store durable production specifications in their owning Markdown/source files, not in a permanent YAML.
3. **Reuse existing Lessons.** Preserve every real, verified `lessonId` and reference the independent Lesson source without copying its methodology or changing its identity. Generate deterministic `#lessonsData/<bucket>/<uuid>/index` imports from a known canonical Lesson UUID and authored slug (or preserve a verified existing export) **even if the future Lesson implementation does not yet exist**. The resulting TypeScript module-resolution failure is an intentional Draft handoff, not grounds to omit the child, add a fake Lesson, or claim production readiness.
4. **Materialize newly planned Lessons.** For each distinct reviewed new Lesson methodology in a `course.yaml` slot, allocate a real, unique Lesson UUID **during Stage 5**, resolve the canonical `content/<book>/data/lessons/<last-hex>/<lesson-uuid>/` directory, and create **only the minimal `lesson.yaml`** required to start future Lesson authoring: Config identity, verified Skills and intended languages plus `production.documentLanguage` and the exact approved `production.methodology`; Sections and unfinished content remain empty. Persist the assigned UUID in the generated Course references and in that new Lesson YAML. Do **not** generate Lesson TypeScript, `review.ts`, content blocks, assets, Question/Flashcard banks or a Lesson Production PR.
5. **Ensure repeatable, non-destructive operation.** Preserve one ID for repeated planned-Lesson references. Because genuinely new UUIDs require allocation, record allocations in durable generated-source evidence or an equivalent recoverable transaction before considering them committed; repeated `--write`/`--check` must reuse IDs, never reallocate or duplicate files. Respect existing authored data, use create-only/no-clobber guards, reject ambiguous collisions and partial transfers, and require a complete inventory/equivalence check over Course/Module/Chapter/Episode sources and the new Lesson YAMLs.
6. **Finalize and remove temporary input.** Run an exact `--check` against the committed generated source and approved source SHA. Once every expected TypeScript/Markdown source and new Lesson YAML exists with correct identity/provenance, **delete the temporary Course `course.yaml` in a subsequent verified commit**. No `config.yaml` is created, no YAML remains inside the materialized Course folder, and no alternative permanent Course authoring representation is introduced. The independently generated **Lesson `lesson.yaml` files remain**: they are a temporary input for their own later Lesson Production workflow, not redundant Course YAML.

**Lesson Production boundary:** materialization creates only the Lesson UUID/folder/initial `lesson.yaml`. Work on the Lesson starts later **only after explicit authorization for that specific Lesson**, through [Create Lesson Flow](../lesson-workflow/create-lesson-flow.skill.md), which must reuse the generated UUID and methodology. Neither Course approval nor source materialization opens Draft Lesson PRs.

**Implementation:** `shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs` reads the single `course.yaml` and emits Course `index.ts`, `constants.ts` (source-language-only active typed tuple plus commented planned languages), `review.ts` (unapproved skeleton using the existing shared `Review` base type; no Course-specific `CourseReview` contract currently exists), `methodology.md`, Module/Chapter TypeScript files, authored Episode TypeScript files (with nested Section/content factory calls), and initial standalone `lesson.yaml` for planned Lessons. Deterministic UUIDs are assigned to new Lesson and Course-owned nodes without altering existing Lesson IDs. `--write` is create-only/no-clobber; `--check` verifies bytes and TS syntax; `--finalize` removes only the unchanged Course YAML after source verification. No `config.yaml` is written. **One-time Lesson registration:** Stage 5 directly passes newly created Lesson UUIDs, slugs and source-language titles to its trusted post-commit PR Description updater. Each new Lesson row reserves a Lesson PR cell as `Not started`. Only the future authorized Lesson agent adds its PR link; no Course TypeScript parsing or status synchronization is required. Also, generated TypeScript remains an intentionally incomplete authoring draft, not a published Course.

**Complete:** the full reviewed Course tree and the necessary minimal independent Lesson YAMLs are safely materialized with stable identities and checked outputs; the temporary Course YAML is subsequently removed without losing authorship or review evidence. Stage 5 is source creation, **not** Lesson production, final TypeScript compilation, locale approval or release.

### 6. Translate Course — per target locale

**Owner:** [Technical Translator](../../personas/technical-translator.persona.md). **Skills:** [Manage Translation Production](../translation-workflow/manage-translation-production.skill.md), [Technical Translation](../translation-workflow/technical-translation.skill.md). **Prerequisite:** stable source-language Course/Module/Chapter code and authorized translation scope.

Inventory Course-owned learner-facing `entity × locale` fields; exclude English-only Methodologist documentation and invariants. Translate and mark **per target language** in parent PR. Target language declarations are intent, never evidence of finished translation. For **new** Course localization campaigns, coordinate one Draft translation integration PR with a frozen Course-entity × locale matrix and nonoverlapping child PRs via [Manage Translation Production](../translation-workflow/manage-translation-production.skill.md); for existing historical Translation Issues preserve/reconcile their approved state rather than force-migrating. Standalone Lesson locale gaps remain Lesson Translation Production dependencies.

**Complete for each locale:** independently verifiable complete authored Course-owned strings at a pinned SHA, ready for independent review. **Handoff:** one independent review per required locale.

### 7. Review Course Translations — per target locale

**Owner:** independent [Technical Translator reviewer](../../personas/technical-translator.persona.md), using [Review Translation](../translation-workflow/review-translation.skill.md) and [Manage Translation Production](../translation-workflow/manage-translation-production.skill.md). **Prerequisite:** Stage 6 locale sources and explicit reviewer assignment.

Inspect completeness, semantic fidelity, terminology, accessibility/cultural nuance, relevant RTL behavior, missing frontend fields and source alignment. Generate **Code-derived PR-scoped reference Markdown + manifest** through `/agent-artifacts` only if verified for the Course entity family; if missing, report a concrete blocker or add separately scoped support rather than substituting Lesson/Skill artifacts. Reviewer can work in the translator branch only with owner authorization and independently verified authorship/SHA. Clean temporary tracked `.agent-ci-artifacts/` before merge.

**Complete for each locale:** independent language approval with exact source SHA and review evidence plus separately resolved required Lesson locale dependencies. Stage 7 ends only when every required locale passes; never mark green merely because text exists.

## Course-specific experiences and Build overrides (outside the editorial stages)

The seven-stage Course Flow plans pedagogical outcomes and materializes Course-owned source. Separately authorized authoring may later add Episodes, narrative transitions, Sections, Scenes and media under Course/Module/Chapter ownership. An educational Screenwriter owns their approved story and interactive requirements; an **independent scenario reviewer** checks continuity, learning integration, event/Section semantics, accessibility, localization, safe failure/recovery, existing Lesson neutrality and actual asset/runtime support. Do not treat a proposed story as an authored Episode, or assume an Engine Quest Config means a playable Quest. Record scenario findings, exact reviewed files/SHA, corrections, unresolved physical resource blockers and independent sign-off in the Course PR, **not** a second permanent scenario report or a fictional Stage 8. A change affecting narrative after review requires focused re-review.

Any Course-local correction to a reused Lesson must be pedagogically warranted and authored against the **actual existing** Configurator with its stateless `course.build.overrides(patch, { languages })` API. The patch must use typed `content.items` / `additionalItems` / `order` collection semantics and valid current slugs, never mutate the standalone Lesson, change its identity/languages, invent Question scores or fabricate missing Scenes. Review methodological corrections independently from scenario decisions. For new Courses, write approved changes in the durable typed Course source only: **do not** create a separate `overrides.yaml`, `config.yaml`, TOC or operations-based override language. A generated Draft or typecheck is not an educational approval.

## Draft CI and final gates

During Stages 1–5 a **parent Draft may be intentionally red** due to missing translation, unresolved TypeScript imports/Scenes or incomplete draft fields. Record the precise expected diagnostic and source SHA, why it is expected, the stage that will repair it and any unrelated unexpected regressions. Do not copy English into missing locales, suppress with `as any`, fabricate IDs, or repeatedly “fix” expected incompleteness. Unexpected corruption, unsafe YAML, invalid IDs, unrelated type regressions or broken workflows still require investigation.

Before **Ready for Review or merge**, every mandatory CI, format/type/build/schema check, Course/Lesson reference, approval, production readiness and required language coverage must be verified green; owner approval is required to mark Ready. Relevant real commands include:

`npm run package:build --workspace @svitlo/engine`
`npm run content:generate:yaml-schemas --workspace @svitlo/engine`
`npm run content:check:yaml-schemas --workspace @svitlo/engine`
`node --test shared/engine/scripts/validateCourseFlow/validate-course-flow.spec.mjs shared/engine/scripts/materializeCourseFlow/materialize-course-flow.spec.mjs`

Before declaring the Course ready, verify **every Course-owned Episode** has
all required media produced (Image, Audio, Video, poster, Subtitles and nested
Carousel/Quest dependencies). The Stage 5 Course materializer emits
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

## Worked Stage 3/4 review and downstream dependency example

This is an **editorial planning example**, not published content and not a new YAML/Runtime contract. The Methodologist records the following placements and complete methodologies in the **same** Course `course.yaml` `content.items/order` tree:

| Ordered placement                                           | Lesson purpose                                                                                                                                                 | Own Question Bank                                                                                  | Own Quiz                                                         |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Module `foundations` → Chapter `dayNight` → `earthRotation` | Substantive instruction about rotation and day/night; approved Skill UUIDs and depth                                                                           | **Required by default**; independently reviewed, published full bank                               | **None**, justified because later synthesis assesses the outcome |
| Module `observations` → Chapter `moon` → `moonPhases`       | Substantive instruction on lunar phase observations                                                                                                            | **Required by default**; independently reviewed, published full bank                               | **None**, justified                                              |
| Course root → `courseKnowledgeCheck` (after both Modules)   | **Ordinary `type: lesson`**, assessment-only; methodology targets both earlier Lessons' Skills and their specific upstream slot keys; no new teaching sequence | **Not Applicable once external bank evidence is verified**; it does not author duplicate Questions | **One Quiz Section**, later selected from both upstream banks    |

**Stage 3:** the Course methodologist approves the placement, scope and explicit external bank ownership; no new Lesson UUID or Question UUID is fabricated and no Lesson PR is opened. **Stage 4:** an independent Methodologist and Assessment Architect inspect this evidence plan at the pinned Course SHA and may approve the complete plan despite the banks not yet being produced. Missing/unspecified _upstream ownership or outcome coverage_, unlike missing Question UUIDs, **does** block the review. **Stage 5:** the existing materializer assigns an immutable Lesson ID, copies its methodology into the initial `lesson.yaml` and retains the full Course authorship provenance. It creates no Lesson or bank PR automatically.

**After separate Lesson Production authorization:** both instructional Lessons and their independent bank PRs must be completed, reviewed and **integrated into the assessment Lesson's actual branch ancestry** before the Assessment Architect can finalize the Quiz's `params.selection.questionIds`. A missing or merely green-but-unmerged `moonPhases` bank blocks **that Quiz selection and dependent assessment Lesson publication**, not the `earthRotation` Lesson's production or the Course's Stage 4 planning review. A failed/missing locale or a missing published Question UUID also blocks this assessment Lesson's publication for that requested locale. Confirm real cross-Lesson Question resolver behavior, locale support, published manifests and production gates against the current implementation. A bank-owning Lesson may legitimately have no Quiz, while the assessment-only Lesson may have no own bank; these are distinct decisions recorded in each Lesson PR.

## Parent Draft PR template

Copy and initialize the following **once** when creating a new Course parent integration PR. Replace bracketed example placeholders with verified identities and live status. The sentinel comments are part of the machine/human contract; **do not edit/duplicate them**.

```md
<!-- svitlo-course-flow:v1 -->

## Course identity

- Course UUID: <uuid>
- Textbook: content/<book>
- Single temporary source plan: content/<book>/data/courses/<bucket>/<uuid>/course.yaml
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
    - [ ] Review Quiz placement, Question Bank intent, and upstream assessment-only slot dependencies
- [ ] 4. Review Course Plan
- [ ] 5. Materialize Course
- [ ] 6. Translate Course
  - [ ] <target locale>
- [ ] 7. Review Course Translations
  - [ ] <target locale>

## Handoffs / blockers

- <stage, Module or locale, source SHA, matching evidence or embedded method review, precise next action>
- <each planned Lesson: approved Course slot and methodology SHA; assessment-only slots: upstream slot keys/Skills and future Question Bank dependencies; after Stage 5, allocated Lesson UUID and verified lesson.yaml path; Lesson Production remains separately authorized>

<!-- svitlo-course-lessons:start -->

## Lessons

Inventory SHA: <parent-course-head-sha>

Lesson inventory not allocated yet.
<!-- svitlo-course-lessons:end -->
```

## One-time Stage 5 Lesson registration (not a Stage 3 tracker)

**Lesson registration identity:** Stage 3 records reused Lesson UUIDs and planned new Lessons by stable Course slot in the manually reviewed Course YAML and PR evidence. Stage 5 deterministically allocates IDs for new Lessons, produces their minimal YAML shells, commits the source and records the resulting assignments once in the parent PR. The registration does not parse generated Course TypeScript, run a recurring synchronizer or infer Lesson existence from slugs. Reused existing Lessons are independently verified from Course source; absence from the new-allocation table is not absence from the Course.

**Optional later Lesson Production PR marker**, only after explicit authorization to start that specific Lesson:

```md
<!-- svitlo-course-lesson:v1 -->

Course: <course-uuid>
Lesson: <lesson-uuid>
Parent PR: #<parent-pr-number>
```

Match **only** exact validated UUIDs/parent/repository and Course membership. **Do not fabricate a Lesson claim or PR for planned slots.** Independently started Lesson PRs may be linked after source verification; never infer identity from title, slug or branch. Two active PR claims mean `Needs resolution`; closed-unmerged attempts remain history. Distinguish editorial slot state (reused methodology verified; new methodology planned/reviewed) from **Production PR status** (`Not started`, `Draft · #N`, `Open · #N`, `Merged · #N`, `Closed unmerged · #N`, `Reused / existing`, `Needs resolution`) and actual **Lesson source/readiness**. Existing independently authorized test Lesson PRs must be preserved, not closed or merged to simplify the Course workflow. “Merged” does not imply approval, translations or publication.

**Registration safety:** the trusted Stage 5 command replaces only the initially empty, balanced managed Lessons section after verifying exact committed outputs, PR head SHA and concurrent description edits. The registration is idempotent for identical assignments and refuses unexpected body changes. Subsequently authorized Lesson agents may update verified PR links; no automatic status regeneration or PR-claim scanning is performed. All manual Course stages, locale evidence, Module tasks and review conclusions remain separate.

**Verification:** the maintained Course schema, Stage 3 validator, Stage 5 materializer and trusted registration have regression tests for planned and reused Lessons, deterministic IDs, typed Course/Episode source, one-time Lesson YAML handoffs, no-clobber, read-only checks and safe finalization. Independent editorial approval is never inferred from these tests or a green Draft status.
