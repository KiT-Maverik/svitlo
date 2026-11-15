# Review Lesson Methodology Skill

**Persona:** [Methodologist](../../personas/methodist.persona.md). Read it fully before this skill, followed by root/applicable `AGENTS.md`, Studio Learning Experience Philosophy, current Lesson, Section, Quiz, AssessmentMethod and Question contracts. This is an **independent methodological review of a completed Screenwriter plan**: check factual and methodological correctness; do not write the storyboard yourself.

## Input and boundaries

The user or a [Lesson Production Issue](./manage-lesson-production.skill.md) selects one or many exact Lesson UUIDs. For each Lesson, read:

- The **approved** original `methodology.md` (or verified approved legacy Brief) with target Skill source links/IDs, intended audience, entry prerequisites, outcomes, scope boundaries, misconceptions, verified factual references, planned languages and explicit `assessmentPlan`.
- The current `content.yaml` with full ordered Sections, authored text, prompts, Quiz placements and relevant Scene specifications; use [Lesson Content schema](./lesson-content.schema.json).
- The latest Experience Review PR/Issue evidence and authorized editorial sign-off for **the same `content.yaml` Git blob**. If that gate has not passed, do not pretend that this review completes the production stage. Flag its status; continue other ready Lessons.

Work from **canonical source files**, not just previous agents' summaries or the Issue checklist. Never assert methodological approval from a created document alone. One Issue can contain several Lessons at different stages.

## Methodological audit

Assess every Section against the original approved goals and verified references:

1. **Subject correctness:** facts, examples, explanations, analogies, diagrams and interactive Scene behavior are scientifically/academically correct within stated simplifications; identify unverified or contested claims.
2. **Coverage:** all and only intended Skills and observable outcomes are appropriately taught. Distinguish exposure, active practice, assessment evidence and actual demonstrated mastery; no accidental omissions or unauthorized learning goals.
3. **Prerequisites and progression:** assumed knowledge matches the approved learner profile, progression makes conceptual sense, misconceptions are corrected, and depth/complexity remains appropriate.
4. **Assessment contract:** the Methodologist's `assessmentPlan.quizRequired` is respected. A Lesson may have zero, one, or multiple Quiz Sections. Every `assessmentPlan.quizzes[].key` corresponds to exactly one approved `content.yaml` Quiz `assessmentPlanKey`; each targets the approved Skill IDs and **all** specified `AssessmentMethodKey` values. Check that the cognitive operations are pedagogically appropriate and not confused with the Question UI type. A `checkpoint` is not a Quiz. Actual Questions/answers, validity of distractors, retry/grading/mastery policy belong to the Assessment Architect.
5. **Role and autonomy boundaries:** Lesson remains usable independently of its Course, mascot, storyline or surrounding Lessons unless prerequisites were explicitly approved; Course-specific sequencing does not redefine a reusable Lesson's scope.
6. **Accessibility/localization relevance:** meaningful learner outcomes remain attainable through the specified accommodations and language plan; note conceptual/cultural assumptions, but leave UI/engineering QA to specialists.
7. **Production gaps:** missing media and scenes may remain explicit production dependencies when the educational specification is complete. Do not reject a draft merely because the asset does not exist yet. Do flag assets whose educational meaning, accuracy or acceptance criteria are too vague to implement.

Review actual `AssessmentMethodKey` definitions in Engine and the generated `.agent-ci-artifacts/assessment-methods/en.md` reference if it exists; the reference is **optional and derived**, never an authority that overrides canonical source. Do not invent unsupported Assessment Method IDs.

## Output

For each Lesson, report in the review PR and coordination Issue: the Lesson UUID/path, reviewed `content.yaml` blob/commit, methodology revision, prerequisite Experience Review PR/revision, reviewer role, verdict (`pass` | `changes-requested` | `blocked`), explicit Skill/outcome coverage, correctness and Quiz/Assessment Method findings, exact affected Sections/blocks, severity, evidence, required corrections and sign-off blockers. **Do not generate a separate `methodology-review.md`.**

## Review evidence and revision binding

For a Lesson, the durable per-entity review register is `review.ts` beside the Lesson root `index.ts`, typed as Engine `LessonReview` when Stage 6 is implemented. **Do not create or maintain `experience-review.md`, `methodology-review.md` or other standalone Lesson review narratives.** A review result points to its actual GitHub PR; detailed findings, corrections, the reviewed source commit/blob and responsible approver remain in that PR conversation and the coordination Issue, not a duplicate Markdown file.

When the assembled Lesson Props revision is available and the relevant review/approval has actually been verified for **that revision**, record the PR in the matching `ai.stages` entry (for example `experience-review` or `methodology-review`) with `{ pr: number, language: LanguageCode }`. The review file does not export any value. Do not infer approval from a PR number alone, do not fill unrelated fields, and never carry results forward to changed Props without re-review.

**Early editorial review is allowed before a Lesson can produce Props.** In that case `review.ts` may not exist or may still be a deliberately incomplete draft. Keep source-revision-specific review evidence and outstanding approval in the already required PR and Lesson Production Issue; do not invent a hash, PR number, approval, or substitute Markdown review document. After the reviewed compiled Lesson revision becomes available, the coordinator explicitly reconciles the earlier evidence with that revision before populating the corresponding `review.ts` field.

Where a **review-specific decision** affects this Lesson or locale only, add a short TypeScript comment **immediately above the relevant PR-valued entry** in `review.ts` when recording it, explaining the actual decision and reason. General policy belongs in canonical Studio rules, not in repeated per-Lesson comments. Keep review failures, blockers, and recommendations in the PR/Issue until they are resolved; never turn an unapproved review into a completed entry.

A `pass` is an **independent recommendation**, not editorial approval. Verified authorized sign-off for the reviewed source and its eventual assembled Props revision is required before the coordinator may mark `methodology-review` as approved.

The Methodologist reviewer **does not edit** `content.yaml` or silently revise an approved `methodology.md`. Return content changes to the author and substantive Brief amendments for explicit approval. Any material revision invalidates stale review evidence until it is checked again.

## Batch execution and production tracking

Process all Lessons at the requested stage that are ready, in one authorized run; do not ask the user to trigger each Lesson individually. Mark blocked/pending Lessons precisely, continue the rest. Use [Manage Lesson Production](./manage-lesson-production.skill.md) when there is a Production Issue: read latest state/PRs first, coordinate ownership, and update one per-Lesson status row and artifact links without deleting other agents' records.

Use correctly labeled Draft PRs following [GitHub rules](../../rules/github-labels-and-naming.md) and reference the parent Issue with `Refs #<number>`. Do not auto-merge or prematurely close a multi-Lesson Issue.

**Completion:** every independently ready Lesson has traceable PR/Issue review evidence and an actionable handoff; approved compiled revisions are recorded in `review.ts` when supported. Approvals never rely on stale revisions or a self-reported completed checklist.
