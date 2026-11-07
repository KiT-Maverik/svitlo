# Lesson Production — GitHub Issue orchestration

**Status:** proposed agent-driven GitHub production protocol and review gates, not an automated Action or an already-shipped Lesson YAML-to-TS generator.

## One Issue = one bounded Lesson production scope

Use [.github/ISSUE_TEMPLATE/lesson-production.yml](../../../.github/ISSUE_TEMPLATE/lesson-production.yml) and [Manage Lesson Production](../../skills/lesson-workflow/manage-lesson-production.skill.md). An Issue represents **one or multiple Lessons**, including a frozen list from a Course Chapter/Module. Store verified Lesson UUIDs explicitly. A later Course TOC change does not automatically add/remove Lessons; discuss and record any scope change.

The GitHub Issue is the **persistent, cross-chat state and coordination record**. Lesson `methodology.md`, `content.yaml`, `questions/questions.yaml`, `flashcards/flashcards.yaml`, Scene specs, review reports and `*.data.ts` in Git remain the authoritative content. PRs and CI remain the evidence of implementation and verification. Do not paste duplicated content into the Issue or use the former chat transcript as authority.

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
5. The **Learning Assessment Architect** produces `questions/questions.yaml` after the approved Methodology and current Screenwriter content/reviews. The full Question bank and explicit default Quiz assignments receive **their own editorial approval**, tied to the current Question source revision. A Quiz-free Lesson does not automatically bypass this prerequisite for Flashcards.
6. The **Flashcard Learning Architect** produces `flashcards/flashcards.yaml` **after the Question bank is approved**, using verified Question references and the current Lesson source language. Flashcards require a **separate editorial sign-off** for their exact source revision; incomplete/unapproved banks block generation. Resolve a contradictory no-Quiz/Question-bank scope with the editor rather than generating placeholders.
7. The **deterministic YAML→TypeScript builder**, once implemented and authorized, consumes the separately approved `content.yaml`, `questions/questions.yaml` and `flashcards/flashcards.yaml` (plus verified Methodology/review references). It validates cross-source identities, Quiz assignments, Question field paths, Flashcard links and current source revisions; creates typed Lesson/Section/ContentBlock scaffolds, the **full** Question catalog and source-language Flashcards; injects curated Quiz selections without editing `content.yaml`; and records pending Scene/media requirements. Generate real Question exports **before** Flashcard TypeScript that imports those fields, and materialize two-sided Flashcard links from their single canonical YAML edges using the approved Engine contract. The script does not write new editorial content, authorize approvals or create translated locales. The current Engine provides typed Flashcard flags, nine canonical relation types and a two-sided linking helper; these are existing runtime helpers, not evidence that YAML source generation is already shipped. **Do not claim the builder is implemented until verified.**
8. **Implement Scene** follows generated scaffolds and approved Scene specs; Coding Agents implement behaviors, source-locale text, registration and tests, without duplicating the builder. **Manual Media/Asset Production** and accessible alternatives also follow scaffold generation and can run alongside independently ready Scenes. Missing assets stay visible dependencies, not fabricated outputs.
9. Translation agents independently fill the remaining supported locales after source-language generation and relevant implementations. Intermediate missing-locale TypeScript errors may remain visible, but publication is blocked.
10. Typecheck, build, Question/Flashcard source, typed-flag, stable-partner-ID and reciprocal-relation validation, content generation, QA, accessibility, resource integrity and publication checks gate completion.

Per-Lesson stages can be asynchronous: one Lesson may be awaiting Experience Review while another is ready for translation. **Within one Lesson**, Questions → Flashcards → Builder is a strict dependency chain with independent editorial approvals; Scenes and manual assets may proceed in parallel after scaffolding. Batch as many **independent ready Lessons** as the scope and role permit. Do not force the user to say "continue" for each Lesson.

## Course Workflow → Lesson Production Issue

[Match Course TOC Lessons](../../skills/course-workflow/match-course-toc-lessons.skill.md) is the explicit **Course-to-Lesson production handoff** for a bounded selected Chapter/Module/slot batch. When authorized, resolve all Course slot `key` paths into verified Lesson UUIDs, deduplicate new or reused editorial-only drafts, and create/reuse **one Lesson Production Issue** for the full still-unimplemented subset. Record the Course UUID, `toc.yaml` source commit/PR SHA, exact slot → Lesson-ID mapping, Brief paths and approval status. Already implemented suitable Lessons stay reused and should not be reproduced; missing locales on already implemented Lessons belong in Translation Production.

A Methodologist Draft creates an Issue row at `methodology` / `ready-for-review`, **not** an approved production authorization. The Course matching PR uses `Refs #N`, never closes the Issue, and the standalone Lesson remains Course-neutral. Issue membership is frozen; later Course TOC changes do not silently change scope. If matching was editorial-only or Issue creation is unavailable, report the pending UUID worklist and blocker.

[Implement Scene](../../skills/lesson-workflow/implement-scene.skill.md) **requires** the fixed-scope Lesson Production Issue before editing Scene code, independently verifies the approved Scene spec, and blocks implementation when the separate YAML→typed builder scaffold is absent. Track Scene TODOs/assets/translation blockers in both code and Issue. **Do not** implement the builder in this workflow change.

## Issue tracker state and PR relationships

The Issue Form includes a frozen UUID scope, source references, constraints, a per-Lesson state table, a scope-level checklist and a handoff block. Preserve the `svitlo-lesson-production:v1` marker so agents recognize the format in any chat.

The **per-Lesson table is authoritative for stage status** and records next action, owner/branch, linked PR and blockers. Scope-level checkboxes are true only if **all** Lessons satisfy the corresponding gate. Allowed status values are `not-started`, `in-progress`, `ready-for-review`, `changes-requested`, `approved`, `blocked` and `completed`. Verified approvals, code and artifacts outrank stale checkboxes. The coordinator records the approved current revisions of `content.yaml`, `questions/questions.yaml` and `flashcards/flashcards.yaml`; material upstream changes invalidate affected downstream approvals and generated sources until revalidated, without resetting unaffected Lessons.

A PR is an **implementation/review change set**, not the complete production Issue. Use appropriately scoped Draft PRs (a PR may cover multiple Lessons), descriptive titles, canonical labels, and `Refs #N`. Do not `Closes #N` for intermediate PRs. No required one-PR-per-Lesson convention. A large Scene/media deliverable can have its own cross-linked Issue without replacing the main Lesson scope tracker.

**Resumption:** new agent takes Issue number, reads latest Issue, relevant PRs and current files, verifies the actual source revisions and outstanding approvals, claims specific Lessons/artifacts, works the assigned skill in a batch, and updates the Issue body and links before handoff. Because GitHub Issue edits can race, read current state before writing and reconcile concurrent changes; the tracker is not a Git-level lock.

**Stop conditions:** missing or contradictory approved source; authorization/approval needed; current-owner collision; substantive factual disagreement; unresolved accessibility or safety blockers; scope limit. A blocked Lesson must not stall other independently ready Lessons.

## Future Course production

A future Course-production Issue Form may share the same immutable-scope, per-entity tracker, handoff and role protocol with **different steps and artifacts**. Do not implicitly turn a Lesson-production Issue into an unbounded Course workflow.

**Scene handoff:** track missing Scene questions, media, localization and testing with precise `TODO(scene/asset/i18n/a11y/test)` comments beside the relevant code and matching Issue blockers. Remove resolved TODOs with verified fixes. Missing-locale TypeScript errors can remain during intermediate authoring (report exactly), but must block publication; unrelated engineering/type defects must be fixed.
