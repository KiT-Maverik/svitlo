# Methodologist-required Quiz and Flashcards Section scaffolding

**Status:** Implemented in PR #706. Draft-only preflight/handoff and CI-detectable Section blockers are available; individual Lessons remain subject to independent bank integration and strict production validation. **Subsequent workflow clarification:** Stage 6 is four-part source preparation; parent Stages 7/8 coordinate Questions/Flashcards child PRs, and physical assets remain separate release blockers. The earlier Stage 6 completion language below is superseded by [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md).

**Selected authoring representation:** One fenced "~~~yaml lesson-assessment-sections" block in the existing production.methodology string, with assessmentSections.quiz and assessmentSections.flashcards. Each decision is required or notRequired with explicit rationale and stable-keyed intents. Required intents carry purpose, placement and bankDependency; Quiz also requires skills and assessmentMethods. Matching Section production.productionNotes must include "Assessment intent: <key>" and "Bank integration: pending|connected". This information remains outside Engine Config and does not create new Lesson stages. Draft-only CLI modes "preflight-draft" and "handoff" retain YAML, while strict "preflight"/"finalize" remain separate. The current Engine contracts, Stage 1/2 workflow, Stage 6 finalizer and CI are the implementation baseline. This document is an authorized implementation handoff, not evidence that the new behavior exists.

## Goal and scope

A Lesson Methodologist explicitly decides whether the learner needs **Quiz Section(s)** and **Flashcards Section(s)**, zero or more of each. Both are normal, independently identified **Section** Configurators under the Lesson's existing `config.section: { items, order }`, not new stages, embedded banks or invented entity types. The Screenwriter transcribes every required Section into the canonical `lesson.yaml`, including stable UUID/slug, type, source-language UI copy and `production` guidance. The existing Lesson YAML-to-TypeScript builder emits these nodes via the same recursive Section path it uses for `type: content`.

When the corresponding Question/Flashcard resources do not yet exist, the builder still creates an honest **incomplete draft** and writes a **real CI-detectable blocker directly above each generated required Section definition**. The agent completing the separate bank workflow replaces pending selections with verified UUIDs and resolves the blockers before Ready/merge. No fake IDs, bank payloads, translations, approvals or runtime capabilities.

## Observed behavior to preserve

- `studio/skills/lesson-workflow/create-lesson-brief.skill.md`: Stage 1 Methodologist currently specifies `assessmentPlan.quizRequired` and one or more Quiz intentions (or explicitly none). It **does not** require an equally explicit decision about in-Lesson Flashcards Sections.
- `studio/skills/lesson-workflow/create-lesson-content.skill.md`: Stage 2 Screenwriter currently writes required Quiz Section(s) in `lesson.yaml`. It must be extended to honor the explicit Flashcards Section intent without authoring the Flashcards bank.
- `shared/engine/scripts/lessonBuilder/lessonModules.mjs`: `sectionTypes` already includes **`quiz` and `flashcards`**, with the normal `sections/<slug>/index.ts`, `sections/index.ts` and nested `content.items/order` generation path. **Reuse this path; do not add a parallel assessment-section generator.**
- `defineQuizSection.schemas.ts` requires `params.selection.questionIds` and other complete Quiz parameters. `defineFlashcardsSection.schemas.ts` requires `params.selection.flashcardIds`. Both selections require real unique UUIDs. Empty `params` is **draft-only**, not a valid publishable Config.
- `shared/engine/scripts/finalizeLesson/README.md`: the current Stage 6 **strict** preflight validates the entire YAML before scaffolding. This presently creates a circular dependency if bank IDs are not available yet.
- `.github/workflows/blocker-todos.yml` and `scripts/ci/checkBlockerTodos/check-blocker-todos.mjs`: the recognized marker is a **source comment** beginning `TODO (BLOCKER):`. Draft PRs permit pending blockers; non-Draft PRs targeting `main` run full tracked-source scanning. A message inside a string, a Markdown handoff, or `TODO(asset)` is **not** the same guard.

## Required changes

### 1. Explicit Methodologist decisions (Lesson Stage 1)

Retain the existing Quiz assessment contract, including justified zero/one/multiple Quiz intentions, target Skill UUIDs and `AssessmentMethodKey` cognitive operations. Add an **equally explicit Flashcards Section decision** in the authoring-only `production.methodology` (not new Engine Config/Props fields):

- `Quiz Sections: none / required` with count, separate stable intent keys and rationale, preserving current `assessmentPlan`.
- `Flashcards Sections: none / required` with count, stable intent keys, intended learning/retrieval purpose and rationale; if present, identify the desired relative lesson placement and planned card bank dependencies.
- Explicitly distinguish **a Section being needed** from **a standalone Question Bank / Flashcards Bank being needed**. An instructional Lesson may require Questions without a Quiz Section. A Flashcards bank is not automatically forced merely by existing Questions; a bank might be useful outside an in-Lesson Section. The assessment-only Lesson case may use reviewed external Questions.
- A negative decision must be recorded as a pedagogically justified **not required / N/A** decision. Never infer N/A from the absence of YAML nodes or an unfinished bank. Keep Stage 1 about intent, not Question UUIDs, card UUIDs, grading, distractors or concrete layouts.

### 2. Canonical Lesson YAML authoring (Lesson Stage 2)

For each required Quiz/Flashcards Section, write one real node to `config.section.items.<slug>` and include its slug in `config.section.order` at the approved placement. Preserve permanent `config.id`, `slug`, `type: quiz | flashcards`, `locale`, Section-owned `content: { items, order }`, and optional nested `production` (reason, intent-key mapping, unresolved bank/selection owner). The Screenwriter must not silently omit the required Section or replace it with a generic Content Section/Scene.

Missing independent bank IDs must remain **explicitly unresolved**. Do **not** fabricate UUIDs, dummy bank entities or valid-looking selection arrays. The implementation may define a safe authoring-only pending-selector representation or tolerate a documented incomplete `params` shape at the draft boundary, but **must not change the strict production Config requirements**. Preserve source language, Section identity/order and valid YAML syntax; do not add runtime `stage`, `approved` or review flags.

Stage 3 Content Review, Stage 4 Experience Review and Stage 5 Methodology Compliance must verify every Methodologist-required Section is present at the intended position and carries sufficient accessible source-language presentation and production handoff; neither reviewer fabricates bank IDs.

### 3. Same builder, per-Section TODO blocker (Lesson Stage 6)

Extend `shared/engine/scripts/lessonBuilder/lessonModules.mjs` in the shared `emitNode(..., context='section', ...)` path (or equivalent single shared hook), **not** an additional creator. When it renders a `quiz` or `flashcards` Section that must await independently approved resources, put exactly one unambiguous TypeScript comment **immediately above** the corresponding `export const <slug> = defineQuizSection(...)` or `defineFlashcardsSection(...)` definition, inside `sections/<slug>/index.ts`.

The emitted comment must start exactly with `// TODO (BLOCKER):` so the existing guard recognizes it. Wording must explain the pedagogical requirement and the missing integration, for example:

```ts
// TODO (BLOCKER): This Quiz Section is required by the Methodologist.
// Connect independently reviewed Question UUIDs, complete Quiz params,
// and verify selected resources before merge.
export const knowledgeCheck = defineQuizSection(/* authored draft Config */);
```

```ts
// TODO (BLOCKER): This Flashcards Section is required by the Methodologist.
// Connect independently reviewed Flashcard UUIDs and verify selection
// before merge.
export const recallCards = defineFlashcardsSection(/* authored draft Config */);
```

These are **illustrative snippets only**; actual emitted source must retain the existing factory imports, generics, nested content, authored params and exact symbol names. At minimum every pending authored Quiz/Flashcards Section must have its own blocker; an absent/not-required Section must not be synthesized. Idempotent deterministic generation: no duplicated blockers, no changes to unrelated Section output, and no clobber of an edited generated draft.

When real bank IDs, all required Quiz fields and referential/locale/ownership validation are complete, the responsible specialist removes the local blocker **with verified evidence**. Never auto-delete it merely because a UUID-looking string exists. The builder must remain creation-only; its initial `check`/fidelity rules and post-generation author edits need a documented non-destructive path.

### 4. Resolve Stage 6 finalizer circularity safely

Today `finalizeLesson preflight` requires a complete schema while the bank workflows intentionally start **after** a persistent Lesson source and Markdown reference exist. Implement an explicit, narrowly scoped **bank-pending source-draft handoff** that permits creating reviewed Section TypeScript drafts with unresolved selection/Quiz-only parameters without pretending they are publishable. It must:

- validate every other existing structural, UUID, locale, source-copy, collection and production-spec invariant;
- fail if a required Methodologist Section was omitted or mismatched;
- preserve all reviewed authored copy, production handoffs and independent `questions.yaml` / `flashcards.yaml`;
- preserve creation-only, source-SHA, no-overwrite and safe YAML deletion guarantees, including recovery after partial failure;
- leave blocker comments and incomplete TypeScript visible, never insert `as any`, nil/fake Question or Flashcard IDs, bogus defaults or disabled CI;
- require final strict `define*Section` Config/Zod checks and actual UUID/locale/ownership publication validation at **Stages 7/8 and final acceptance**, not as Stage 6 source-preparation checks.

Select the precise CLI/API shape after reading existing finalizer and builder tests, but **do not globally weaken** the Engine schemas or declare bank Stage 7/8 or final publication ready while local or external banks remain unresolved.

### 5. Workflow/tracker coordination

Keep the current **ten parent Lesson stages** (including Questions Stage 7 and Flashcards Stage 8) and separate seven-stage Questions/Flashcards **child** workflows. Make the handoff **explicit** in the Lesson PR at Stages 1, 2 and 6: required Section inventory (type, slug, stable intent key, placement, owning bank type and pending/connected state), separate bank PR/status/SHA, next action and blockers. The first eligible bank is normally Questions; Flashcards are authored only after approved Questions or the documented allowed own-Questions N/A branch. No automatic launching of other agents or unauthorized PRs.

Update at least the Methodologist persona and Create Lesson Brief, Create Lesson Content, Create Lesson Flow, Section entity reference, relevant architecture index/contract notes and Lesson Builder/finalizer README/JSDoc to reflect final implemented behavior.

## Acceptance tests for the implementing agent

1. No assessment Sections: Methodologist records justified no-Quiz/no-Flashcards Section decisions; builder creates none and emits no assessment-specific TODO blockers. A separately required Question Bank remains independently tracked.
2. Quiz only; Flashcards only; both; **multiple instances** of either: one normal Section module per YAML node, correct unique UUIDs/slugs, ordered `section.items/order`, nested Section screen ContentBlocks, all source-language copy and existing import/generic styles preserved.
3. Pending bank for each authored assessment Section: **one real `// TODO (BLOCKER):` at the corresponding generated definition**; scanner's existing tests show comments are discovered (not strings), Draft CI tolerates them, and Ready-to-main/full scan rejects them. No new marker syntax, workflow bypass or special scanner exemption.
4. Bank integration: approved Question/Flashcard UUIDs and completed Quiz parameters pass their real Engine strict Config validations and resource reference/locale checks; absent, forged, duplicate, unauthorized-owner or unavailable-locale IDs fail; explicitly approved cross-Lesson Quiz selections remain supported. Only then can the blocker be removed. Removing it prematurely must not make incomplete publication succeed.
5. Source-only Stage 6 handoff: reviewed YAML with pending selections can scaffold safely; full production remains gated, no YAML loss on skipped/partial/changed-source runs. Repeated builder runs never overwrite manually integrated bank selections/blocks.
6. Builder tests and fixture assertions cover deterministic output, exact blocker placement, source fidelity and unaffected ordinary Sections; finalizer regressions cover strict vs pending paths. Execute documented scoped tests and check mandatory CI before requesting Ready.

## Ownership and non-goals

Implementing roles: Methodologist/editorial Skill maintainer (decisions), Educational Screenwriter Skill maintainer (YAML Sections), Engine Coding Agent (builder/finalizer), independent Development/QA reviewers (validation). **This implementation provides only the source-draft handoff.** It does not author Question/Flashcard banks, choose Quiz scores/retries, create placeholder records, change the Section type union, produce translations or approve any particular Lesson.

**Related evidence:** the Lesson #666 discussion exposed the unclear handoff, but implementation is repo-wide and must target `main`, **not** the Course #653 integration branch or Lesson #666's child branch.
