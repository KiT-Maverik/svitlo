# Lesson scaffolder end-to-end acceptance

**Status:** implementation plan for a Draft integration PR. It defines verification work, **not** a claim that a complete Lesson already builds. Source design evidence: [#557](https://github.com/KiT-Maverik/svitlo/pull/557).

## Why this is more than unit tests

Existing `shared/engine/scripts/lessonBuilder/lessonBuilder.spec.mjs` exercises factory dispatch, isolated module paths, source file extraction, safe paths, SKIP/no-overwrite and asset handoffs. It explicitly checks **syntactic validity** of generated draft files; it does not typecheck or assemble intentionally unfinished Lesson sources. This is the right contract for a *draft generator*.

Stage 7 adds a separate **integration acceptance** layer: generate a fresh Lesson fixture and verify that the distinct components agree from YAML through generated source and, only when dependencies have been authored, to build and published Props. Do not conflate missing Scene/media/translation approvals with generator regressions.

## Dependencies

- [#574](https://github.com/KiT-Maverik/svitlo/pull/574) Checkpoint Answer Configurator and `question/index.ts`.
- [#575](https://github.com/KiT-Maverik/svitlo/pull/575) Carousel Image/Scene children and recursive slug layout.
- [#570](https://github.com/KiT-Maverik/svitlo/pull/570) Review stage: confirm merged before relying on `review.ts` and assembled-Props digest.
- Merged #558, #559, #560, #561 and #571 form the baseline. Follow current `main` Engine contracts at implementation time.
- The manual #557 reference **must not be overwritten**; an isolated derived fixture is the test input.

## Integration work

1. Define a dedicated, isolated small but representative Lesson YAML fixture that includes Section slug siblings; Markdown localized `locale/<lang>.md` and invariant `text.md`; Code source; Scene/media with local source paths; an Image/Scene Carousel; Checkpoint with Text Question and independent Answer Configurator with nested image/markdown/media content; ordered collections; Skill symbol import; multiple languages (unresolved translations remain explicit).
2. Run `lessonBuilder generate` into a fresh temporary textbook-like workspace; compare generated file manifest and AST/import graph against the documented target, not the obsolete byte inventory of #557. Enforce exact slug paths and no type grouping; check important generics, valid unquoted keys, role-based `question/index.ts`, `answer/index.ts` and direct Carousel child folders.
3. Run read-only `check` immediately after generate. Edit a generated source/asset and show `check` reports staleness. Re-run `generate` and assert **SKIP**, without modifying already authored files. Test missing/duplicate resource, symlink/path traversal, duplicate sibling slug and unresolved Skill diagnostics.
4. Check that source-relative `import.meta.url` media/Code/Markdown works from deeply nested folders, and staged textbook assets/manifest preserve correct public URLs, poster/locale roles and no collisions.
5. In a **separate, fully completed fixture** (not the intentionally incomplete #557 YAML), supply real approved child definitions/resources/locales and validate TypeScript and `lesson.build.props({ languages })`, complete nested Props, UI Kit consumption and assembled Review digest consistency. Cover revision invalidation when localized Props change. This fixture may not need real external Scenes when proper stubs/registry are authorized specifically for tests.
6. Verify complete-Props generation and relevant package build/publish integration where current repositories support it. Keep generated Build-only file readers out of runtime bundles.
7. Preserve explicit evidence of automated commands, artifacts, failures or intentionally unexecuted stages. Stage 7 acceptance is a hard dependency for fixture-finalization PR, not automatic editorial approval.

## Suggested coverage / output

- Automated CLI integration tests under the existing `lessonBuilder` test organization, plus isolated Build/Props/media staging tests and UI Kit smoke cases if required.
- Unit tests remain for local contract edge cases; end-to-end tests assert actual *cross-package integration* and generated module graph.
- Verify `npm run test:unit:lesson-builder`, applicable Engine types/tests, targeted UI Kit tests, and owning textbook build **only for the complete fixture**. Do not claim success without execution.
- Record complete acceptance matrix: `YAML → drafts → complete authored dependencies → Props → packaged URLs → UI rendering`, separating draft-only tests from completed-resource tests.

## Guardrails

The technical builder intentionally creates incomplete TypeScript for missing resources, translations or Review evidence. **Never change the builder to make intentionally unfinished drafts pass `tsc`.** Do not use `as any`, fake URLs, invented assets or skipped validation to manufacture a green check. Preserve source identity and create-only SKIP. Do not alter the hand-edited source of #557 inside this integration PR.

## Status / coordinator handoff

This Draft PR starts with a planning document only. Later coding/review agents may open subtask Draft PRs targeting `integration/lesson-builder-e2e-acceptance`; integration merges only after the prerequisite contract PRs are merged and tests are verified.
