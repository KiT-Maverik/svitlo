# Lesson Production — GitHub Issue orchestration

**Status:** proposed agent-driven GitHub production protocol and review gates, not an automated Action or an already-shipped Lesson YAML-to-TS generator.

## One Issue = one bounded Lesson production scope

Use [.github/ISSUE_TEMPLATE/lesson-production.yml](../../../.github/ISSUE_TEMPLATE/lesson-production.yml) and [Manage Lesson Production](../../skills/lesson-workflow/manage-lesson-production.skill.md). An Issue represents **one or multiple Lessons**, including a frozen list from a Course Chapter/Module. Store verified Lesson UUIDs explicitly. A later Course TOC change does not automatically add/remove Lessons; discuss and record any scope change.

The GitHub Issue is the **persistent, cross-chat state and coordination record**. Lesson `methodology.md`, `content.yaml`, Scene specs, review reports and `*.data.ts` in Git remain the authoritative content. PRs and CI remain the evidence of implementation and verification. Do not paste duplicated content into the Issue or use the former chat transcript as authority.

## Three new specialist operations

- [Review Lesson Experience](../../skills/lesson-workflow/review-lesson-experience.skill.md), performed independently by the [Learning Experience Expert](../../personas/learning-experience-expert.persona.md), evaluates pedagogical effectiveness, modern appropriate interactivity, cognitive load, motivation/gamification, accessibility/RTL, technical practicality and concrete block-by-block learning benefit.
- [Review Lesson Methodology](../../skills/lesson-workflow/review-lesson-methodology.skill.md), performed by the existing [Methodologist Persona](../../personas/methodist.persona.md), checks fidelity to approved Skills, outcomes, prerequisites, subject correctness, and the exact multi-Quiz `assessmentPlan` with typed Assessment Methods.
- [Manage Lesson Production](../../skills/lesson-workflow/manage-lesson-production.skill.md) coordinates **batched work** under a fixed GitHub Issue, not a per-Lesson Issue or an extra autonomous content-authoring persona.

Both reviews are independent of the Screenwriter and of each other. The reviewers return specific, traceable findings; the Screenwriter revises `content.yaml`. An independent `pass` verdict is **not an editorial approval**: authorized sign-off must be linked. Each review identifies the exact `content.yaml` Git blob/revision. Content revisions require rechecking stale reviews; Methodology amendments may also invalidate approvals.

## Typical stage lifecycle

1. Methodologist authors `methodology.md`; editor approves including the Quiz and Assessment Method plan.
2. Screenwriter authors machine-readable `content.yaml` in one source language; editor determines draft readiness and required approval.
3. Learning Experience Expert independently reviews and requests corrections until a source-specific pass and editorial sign-off.
4. Methodologist independently reviews the **same latest source revision** and requests corrections until sign-off. Any correction sends the affected Lesson back through required reviews; do not mechanically re-run unaffected Lessons.
5. When implemented, an authorized generator produces typed Lesson/Section/ContentBlock sources **and resource requirements for unfinished media and Scenes**. Do not claim this generator exists merely because the stage appears in the tracker.
6. Specialized agents produce Quiz Questions, Scenes, media and accessibility alternatives; translation agents fill the remaining approved locales. Incomplete source-locale scaffolds may intentionally have TypeScript errors, but cannot pass production publication.
7. Typecheck, build, content-generation validation, QA and publisher checks gate completion.

Per-Lesson stages can be asynchronous: one Lesson may be awaiting Experience Review while another is ready for translation. Batch as many **independent ready Lessons** as the scope and role permit. Do not force the user to say "continue" for each Lesson.

## Issue tracker state and PR relationships

The Issue Form includes a frozen UUID scope, source references, constraints, a per-Lesson state table, a scope-level checklist and a handoff block. Preserve the `svitlo-lesson-production:v1` marker so agents recognize the format in any chat.

The **per-Lesson table is authoritative for stage status** and records next action, owner/branch, linked PR and blockers. Scope-level checkboxes are true only if **all** Lessons satisfy the corresponding gate. Allowed status values are `not-started`, `in-progress`, `ready-for-review`, `changes-requested`, `approved`, `blocked` and `completed`. Verified approvals, code and artifacts outrank stale checkboxes.

A PR is an **implementation/review change set**, not the complete production Issue. Use appropriately scoped Draft PRs (a PR may cover multiple Lessons), descriptive titles, canonical labels, and `Refs #N`. Do not `Closes #N` for intermediate PRs. No required one-PR-per-Lesson convention. A large Scene/media deliverable can have its own cross-linked Issue without replacing the main Lesson scope tracker.

**Resumption:** new agent takes Issue number, reads latest Issue, relevant PRs and current files, verifies the actual source revisions and outstanding approvals, claims specific Lessons/artifacts, works the assigned skill in a batch, and updates the Issue body and links before handoff. Because GitHub Issue edits can race, read current state before writing and reconcile concurrent changes; the tracker is not a Git-level lock.

**Stop conditions:** missing or contradictory approved source; authorization/approval needed; current-owner collision; substantive factual disagreement; unresolved accessibility or safety blockers; scope limit. A blocked Lesson must not stall other independently ready Lessons.

## Future Course production

A future Course-production Issue Form may share the same immutable-scope, per-entity tracker, handoff and role protocol with **different steps and artifacts**. Do not implicitly turn a Lesson-production Issue into an unbounded Course workflow.
