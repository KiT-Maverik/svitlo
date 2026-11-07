# Review Lesson Methodology Skill

**Persona:** [Methodologist](../../personas/methodist.persona.md). Read it fully before this skill, followed by root/applicable `AGENTS.md`, Studio Learning Experience Philosophy, current Lesson, Section, Quiz, AssessmentMethod and Question contracts. This is an **independent methodological review of a completed Screenwriter plan**: check factual and methodological correctness; do not write the storyboard yourself.

## Input and boundaries

The user or a [Lesson Production Issue](./manage-lesson-production.skill.md) selects one or many exact Lesson UUIDs. For each Lesson, read:

- The **approved** original `methodology.md` (or verified approved legacy Brief) with target Skill source links/IDs, intended audience, entry prerequisites, outcomes, scope boundaries, misconceptions, verified factual references, planned languages and explicit `assessmentPlan`.
- The current `content.yaml` with full ordered Sections, authored text, prompts, Quiz placements and relevant Scene specifications; use [Lesson Content schema](./lesson-content.schema.json).
- The latest Experience Review and authorized editorial sign-off for **the same `content.yaml` Git blob**. If that gate has not passed, do not pretend that this review completes the production stage. Flag its status; continue other ready Lessons.

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

Review actual `AssessmentMethodKey` definitions in Contracts and the generated `.agent-ci-artifacts/assessment-methods/en.md` reference if it exists; the reference is **optional and derived**, never an authority that overrides canonical source. Do not invent unsupported Assessment Method IDs.

## Output

Create/update `methodology-review.md` beside the Lesson's `content.yaml` with:

- Lesson UUID/path, reviewed `content.yaml` Git blob SHA (or immutable commit+path), approved methodology source revision, previous Experience Review revision, date and Methodologist reviewer identity/role.
- Verdict: `pass` | `changes-requested` | `blocked`.
- Explicit outcome/Skill coverage matrix, correctness findings, progression/prerequisite analysis, Quiz/Assessment Method cross-check, accessibility/scoping observations and traceable sources.
- For every issue: severity (`blocker`, `major`, `minor`), exact Section/block/Quiz key, evidence, educational impact, concrete proposed correction and responsible author.
- Exact unresolved editorial decisions and what approval/re-review is necessary.

A `pass` is an **independent review recommendation**, not automatic editor approval. A verified authorized sign-off for the same `content.yaml` source revision is needed before marking the Lesson's Methodological Review stage `approved`.

The Methodologist reviewer **does not edit** `content.yaml` or silently revise the approved `methodology.md`. If the screenplay is inconsistent, return changes to its author. If the approved Brief itself is wrong/incomplete, request an explicit Methodologist editorial amendment and re-approval. Any material revision invalidates stale downstream review/approval until it is rechecked.

## Batch execution and production tracking

Process all Lessons at the requested stage that are ready, in one authorized run; do not ask the user to trigger each Lesson individually. Mark blocked/pending Lessons precisely, continue the rest. Use [Manage Lesson Production](./manage-lesson-production.skill.md) when there is a Production Issue: read latest state/PRs first, coordinate ownership, and update one per-Lesson status row and artifact links without deleting other agents' records.

Use correctly labeled Draft PRs following [GitHub rules](../../rules/github-labels-and-naming.md) and reference the parent Issue with `Refs #<number>`. Do not auto-merge or prematurely close a multi-Lesson Issue.

**Completion:** every independently ready Lesson has a traceable source-specific review and actionable handoff; approvals never rely on stale revisions or a self-reported completed checklist.
