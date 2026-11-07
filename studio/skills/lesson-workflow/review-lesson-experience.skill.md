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
3. All actual ContentBlock types: `text`, `markdown`, `checkpoint`, `code`, `audio`, `video`, `youtube`, `image`, `carousel`, `scene`. Verify their pedagogical role and actual support, identify better options if justified; a `checkpoint` does not count as a scored Quiz, and a Quiz is a Section, not a block.
4. Modern and interactive experiences: whether diagrams, simulations, manipulable models, narrative pacing, multimedia or custom Scenes materially improve understanding; distinguish feasible from speculative or missing implementation.
5. Motivation and gamification: intrinsic engagement and meaningful challenge; flag distracting decoration, reward pressure, overstimulation or artificial clicking quotas.
6. Accessibility and localization: alternative interaction modes, readable text, keyboard/touch/screen-reader, accessible feedback, semantic LTR/RTL, captions/transcripts, motion control, offline/weak-device equivalence. Check that `documentLanguage` is actual authored copy and other planned locales are not invented.
7. Production readiness: media `assetRequest`, pending Scenes, interactions and Quiz/assessment dependencies are explicit and actionable. Missing assets are _legitimate planned production work_ when clearly identified; they must not masquerade as available assets or be treated as missing pedagogical design by default.

## Output and ownership

For each Lesson, create/update `experience-review.md` beside its `content.yaml`. Include:

- Lesson UUID and actual path, reviewed `content.yaml` Git blob SHA (or immutable source commit + path), reviewer role, date, verdict: `pass` | `changes-requested` | `blocked`.
- An outcome-by-outcome evaluation, concise strengths, and specific findings with severity, Section/block key, evidence, suggested correction and assigned role.
- Explicit assessment boundaries, accessibility/RTL/offline findings, missing implementation dependencies and unresolved questions.
- Verification performed and any files/Scene specs not reviewed.

**Do not silently edit `content.yaml`** as reviewer. Send proposed edits to the Screenwriter; its owner revises the plan in a separate authorized change. After revision, re-read and re-review the new blob. A report for an older `content.yaml` revision does **not** approve the newer revision.

A `pass` verdict by an independent expert means **ready for editorial sign-off**, not an automatic editorial approval. The coordinator may mark `experience-review` as `approved` only with a verifiable authorized approval, linked in the Issue.

## Batching and GitHub coordination

When assigned multiple Lessons, process **all independent, ready Lessons in the same run**. Do not stop after each checkmark to ask to continue. Record a separate verdict per Lesson; blocked Lessons must not prevent reviewing other ready Lessons. When working under a Production Issue, read the latest Issue and relevant PRs before starting, reuse or register the work PR, and update the per-Lesson matrix, artifacts, blockers and next handoff through [Manage Lesson Production](./manage-lesson-production.skill.md).

PR rules: one or more appropriately sized Draft PRs may cover the bounded review batch; follow [GitHub naming and labeling](../../rules/github-labels-and-naming.md), link each PR with `Refs #<issue-number>`, avoid `Closes` until all scoped Lessons are actually complete, and never merge automatically.

**Completion:** all ready Lessons in scope have source-revision-specific, independent review files and a correct Issue handoff. Missing or stale reviews remain pending; no self-approval or undocumented overrides.
