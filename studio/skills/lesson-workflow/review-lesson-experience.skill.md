# Review Lesson Experience Skill

**Persona:** [Learning Experience Expert](../../personas/learning-experience-expert.persona.md). Read it fully, then applicable `AGENTS.md`, Studio architecture, existing Lesson/Section/ContentBlock contracts and renderer implementations. This is an **independent review**, not Screenwriter authoring.

## Scope and prerequisites

Review an explicitly assigned Lesson or batch of Lesson UUIDs. Prefer the immutable scope in a [Lesson Production Issue](./manage-lesson-production.skill.md), when provided. Never invent Lessons or silently include other Lessons in the same Chapter. Independently inspect for **each** Lesson:

- Approved `methodology.md` (or explicitly accepted legacy Brief), including learning objectives, Skills, audience, factual constraints, source/target locales and Quiz/`assessmentPlan` requirements.
- Screenwriter `content.yaml`, its [schema](./lesson-content.schema.json), individual Scene specs, relevant actual UI Kit components and current ContentBlock contracts. An unmerged content.yaml workflow change is a dependency, not permission to guess the format.
- The current source revision and review history, including previous requested changes.

This stage follows Screenwriter completion. If Methodology is missing/unapproved, `content.yaml` is absent, or crucial source material is inaccessible, mark the Lesson `blocked` with exact reason; continue other independent Lessons in scope.

## Audit criteria

Evaluate **every** Section and its ContentBlocks, not only the introduction:

1. Alignment with goals and learner readiness: coherent concept progression, minimal misconceptions, audience-native explanations and appropriate cognitive load.
2. Evidence-informed instructional effectiveness: purposeful explanation, worked examples/fading, prediction and exploration, opportunities for feedback/retrieval/application/transfer when warranted, useful learner control and appropriate pacing. Do not impose a universal recipe.
3. All actual ContentBlock types: `text`, `markdown`, `checkpoint`, `code`, `audio`, `video`, `youtube`, `image`, `carousel`, `scene`, `subtitles`. Subtitles is a new Build-only ContentBlock; review production readiness honestly until its renderer and YAML handoff exist. Verify their pedagogical role and actual support, identify better options if justified; a `checkpoint` does not count as a scored Quiz, and a Quiz is a Section, not a block.
4. Modern and interactive experiences: whether diagrams, simulations, manipulable models, narrative pacing, multimedia or custom Scenes materially improve understanding; distinguish feasible from speculative or missing implementation.
5. Motivation and gamification: intrinsic engagement and meaningful challenge; flag distracting decoration, reward pressure, overstimulation or artificial clicking quotas.
6. Accessibility and localization: alternative interaction modes, readable text, keyboard/touch/screen-reader, accessible feedback, semantic LTR/RTL, captions/transcripts, motion control, offline/weak-device equivalence. Check that `documentLanguage` is actual authored copy and other planned locales are not invented.
7. Production readiness: media `assetRequest`, pending Scenes, interactions and Quiz/assessment dependencies are explicit and actionable. Missing assets are _legitimate planned production work_ when clearly identified; they must not masquerade as available assets or be treated as missing pedagogical design by default.

## Output and ownership

For each Lesson, report the actual UUID/path and reviewed `content.yaml` blob SHA (or commit + path), role, verdict (`pass` | `changes-requested` | `blocked`), concrete Section/ContentBlock findings, severity, accessibility/RTL/offline and assessment limitations, files not reviewed, and proposed corrections **in the review PR and coordination Issue**. Do not write a new per-Lesson Markdown report.

## Review evidence and revision binding

For a Lesson, the durable per-entity review register is `review.ts` beside the Lesson root `index.ts`, typed as Engine `LessonReview` when Stage 6 is implemented. **Do not create or maintain `experience-review.md`, `methodology-review.md` or other standalone Lesson review narratives.** A review result points to its actual GitHub PR; detailed findings, corrections, the reviewed source commit/blob and responsible approver remain in that PR conversation and the coordination Issue, not a duplicate Markdown file.

When the assembled Lesson Props revision is available and the relevant review/approval has actually been verified for **that revision**, record the PR in the matching direct `ai` field (for example `experienceReview` or `methodologyReview`) with `{ pr: number, language: LanguageCode }`. The review file does not export any value. Do not infer approval from a PR number alone, do not fill unrelated fields, and never carry results forward to changed Props without re-review.

**Early editorial review is allowed before a Lesson can produce Props.** In that case `review.ts` may not exist or may still be a deliberately incomplete draft. Keep source-revision-specific review evidence and outstanding approval in the already required PR and Lesson Production Issue; do not invent a hash, PR number, approval, or substitute Markdown review document. After the reviewed compiled Lesson revision becomes available, the coordinator explicitly reconciles the earlier evidence with that revision before populating the corresponding `review.ts` field.

Where a **review-specific decision** affects this Lesson or locale only, add a short TypeScript comment **immediately above the relevant PR-valued entry** in `review.ts` when recording it, explaining the actual decision and reason. General policy belongs in canonical Studio rules, not in repeated per-Lesson comments. Keep review failures, blockers, and recommendations in the PR/Issue until they are resolved; never turn an unapproved review into a completed entry.

**Do not silently edit `content.yaml`** as reviewer. Send proposed edits to the Screenwriter; its owner revises the plan in a separate authorized change. After revision, re-read and re-review the changed source. A review of an older `content.yaml` blob does **not** approve a newer one.

A `pass` verdict by an independent expert means **ready for editorial sign-off**, not automatic editorial approval. The coordinator may mark `experienceReview` as `approved` only with independently verifiable, authorized approval linked in the Issue.

## Batching and GitHub coordination

When assigned multiple Lessons, process **all independent, ready Lessons in the same run**. Do not stop after each checkmark to ask to continue. Record a separate verdict per Lesson in its PR/Issue evidence; blocked Lessons must not prevent reviewing other ready Lessons. When working under a Production Issue, read the latest Issue and relevant PRs before starting, reuse or register the work PR, and update the per-Lesson matrix, review evidence/PR links, blockers and next handoff through [Manage Lesson Production](./manage-lesson-production.skill.md).

PR rules: one or more appropriately sized Draft PRs may cover the bounded review batch; follow [GitHub naming and labeling](../../rules/github-labels-and-naming.md), link each PR with `Refs #<issue-number>`, avoid `Closes` until all scoped Lessons are actually complete, and never merge automatically.

**Completion:** all ready Lessons in scope have source-revision-specific PR/Issue evidence and the correct `review.ts` entry only when the assembled Props revision can be verified. Missing or stale review evidence remains pending; no self-approval or undocumented overrides.

## Quest plan review

For proposed `type: quest` Sections, consult [Quest](../../docs/entities/quest.md) and inspect each Stage/Task branch, retry and completion path. Verify learning value of interventions, understandable failure feedback, no trap/loop without recovery, meaningful engagement without forced entertainment, and parity for captions, transcripts, narration, nonvisual Task controls, touch/keyboard, RTL, cognitive load, reduced motion and offline. Review Quest proposed media and Scenes as _planned_ resources, not working renderer behavior. Flag missing Quest runtime integration as a production dependency; do not conflate Task completion with a graded Quiz.
