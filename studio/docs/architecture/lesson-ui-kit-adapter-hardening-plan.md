# Lesson UI Kit and Next.js Adapter — hardening work plan

> **Status:** proposed implementation scope for a stacked Draft PR targeting PR #303.
> **Parent:** [PR #303 — Extract portable Lesson UI and Next.js adapter](https://github.com/KiT-Maverik/svitlo-web/pull/303), branch `refactor-lesson-module`.
> **New work branch:** `refactor/lesson-platform-hardening-303`.
> **Branch origin:** parent head `71cf9d8778f5dbfbc18b654b836f5307fd491ec7` (2026-11-05).
> **This document is a work plan, not a claim of completed functionality.** Update the PR checklist as code is implemented.

## Why this follow-up exists

PR #303 introduced a framework-agnostic React/MUI Lesson in `@svitlo/ui-kit` and a separate `@svitlo/nextjs-adapter` to own Next.js App Router/SSR/metadata. That extraction provides a reusable foundation for standalone textbooks and future React DOM shells such as Electron or Capacitor. The initial extraction intentionally prioritizes functionality; this follow-up cleans up host bindings, localization debt across the **rest** of UI Kit, and public API/test quality without expanding into native applications.

**Do not change PR #303's base or merge this branch into `main` directly.** Open and maintain this PR against `refactor-lesson-module`; merge it into PR #303's branch only after review. The owner requested the four scopes below in a separate stacked PR.

## Current implementation to inspect before changes

- `AGENTS.md` → `studio/rules/github-labels-and-naming.md`, `studio/docs/architecture/README.md`, `studio/docs/architecture/monorepo-and-textbook.md`, `studio/docs/architecture/internationalization-and-accessibility.md`.
- `shared/ui-kit/src/components/lesson/Lesson.tsx`, `LessonNavigation.tsx`, `LessonSteps.tsx`, `Celebration.tsx`, `QuestionProgress.tsx`.
- `shared/ui-kit/src/components/layout/LearningLayout/createLessonLearningLayout.tsx` currently injects `usePathname`, `useLocale`, `useLessonNavigation`, `useColorScheme`, `linkComponent`. Some hooks can likely be owned by the UI Kit itself; retain injection only for genuinely host-specific responsibilities.
- `learningApps/playground/src/components/pages/Lesson/Lesson.tsx` currently wires Next's `usePathname`/`Link`, MUI color scheme, `useLessonLocale`, `resolveScene`, `ImageRendererProvider`/`NextImageRenderer`. Keep textbook-owned scenes outside reusable packages.
- `shared/ui-kit/src/components/widgets/ContentBlockRenderer/blocks/Image/ImageRenderer.tsx` defines the portable renderer contract.
- `shared/ui-kit/scripts/generate-locales.mjs` publishes `public/data/ui-kit/<locale>.json`. **Known gap:** `learningLayout` and `navbarPreferences` use `uk-UA` fallback, whereas some other components fall back to `uk` or `en`; Lesson itself has complete translations. Remove silent fallback for required text by authoring missing locales, not by throwing away languages.
- `shared/ui-kit/data/components/*` contains authored build-time translation data; canonical languages come from `DEFAULT_SUPPORTED_LANGUAGES` (29 at baseline, verify actual set before editing).
- `shared/nextjs-adapter/src/lesson.ts` owns `createLessonPage`, metadata, notFound handling and Suspense; `src/publishedLesson.ts` owns published JSON loading; `src/image.tsx` owns the Next-specific image renderer. Inspect `package.json` exports and `README.md`.
- `shared/engine/src/lesson.ts` and `src/lessons/assembleLessonResponse.ts` provide framework-independent JSON response assembly.
- `learningApps/playground/src/app/[language]/lesson/[lessonId]/page.tsx` remains a thin route entry; `src/lib/lessons/*` may still have duplicate loaders/assemblers inherited from PR #303. Confirm current parent state and coordinate with its mandatory fixes instead of masking incomplete migration.

## Workstream A — simplify dependency injection (React host portability)

- [ ] Audit every current Lesson/layout/image host binding; categorize as UI Kit-owned, Next.js-specific, textbook-specific, or truly platform-dependent.
- [ ] Remove redundant injection of behavior owned by UI Kit (e.g. shared lesson navigation hook). Reuse MUI provider hooks directly within framework-independent React components where appropriate; do not import `next/*` into UI Kit.
- [ ] Make the remaining host bindings minimal, cohesive, explicitly typed and documented. Avoid giant service objects, deeply generic factories, duplicate prop drilling or accidental dependencies on Playground.
- [ ] Preserve injection for Next routing/links (or framework-neutral callbacks), textbook scene registry, and any genuinely host-owned locale/update navigation. Make a plain React DOM host feasible without Next runtime.
- [ ] Keep accessibility and existing lesson interaction semantics intact; avoid temporary compatibility aliases or a second independent Lesson implementation.

**Acceptance:** API is smaller/easier to consume than the current Playground binding; UI Kit/Engine contain zero Next-specific imports; there is a tested non-Next host setup or equivalent unit contract tests.

## Workstream B — unify localization for *all other* UI Kit components

- [ ] Inventory `shared/ui-kit/data/components/*`, their current shapes, loading APIs, runtime texts and accessible labels. Do not restrict this work to Lesson alone.
- [ ] Use the canonical supported-language descriptors; author complete, meaning-preserving translations for every supported language/locale for `LearningLayout`, `NavbarPreferences`, `Flashcard`, `Checkpoint`, `QuestionFrame`, media components and any other UI Kit text discovered in audit.
- [ ] Replace build-time Ukrainian/English fallback branches in `generate-locales.mjs` **only after** all required dictionaries exist. Missing locales or malformed structures must fail generation/typecheck with an actionable error; never silently produce mixed-language UI.
- [ ] Preserve the standard authored data architecture (appropriate `*.data.ts` files, typed contracts) → build-time generation → **one selected** `public/data/ui-kit/<locale>.json` at runtime. Do not import authored TS into runtime or add client-side all-language bundles.
- [ ] Review terminology, RTL semantics (`ar`, `he`, `ur`), Crimean Tatar `qm` Latin orthography and Belarusian `be` Taraškievica. If translations cannot be verified, mark QA needed explicitly; do not fill placeholders/fake translations.

**Acceptance:** exact locale coverage, key/shape consistency, no silent fallback for textual UI, all accessibility labels localized, and tests for generation, failure modes and representative RTL/LTR output.

## Workstream C — streamline the public Next.js Adapter API

- [ ] Verify `@svitlo/nextjs-adapter` package public exports and `createLessonPage` typing. Expose supported loader/rendering APIs through deliberate entrypoints; avoid deep imports from `src`.
- [ ] Eliminate redundant app-level JSON loading/assembling when shared `loadPublishedLesson` and Engine assembly cover the same behavior. Allow explicit loader overrides for alternate storage, without hardcoding Playground.
- [ ] Reduce code in each textbook route/wrapper without coupling the adapter to a textbook or to authoring `*.data.ts`. Preserve dynamic locale/ID validation, correct Next 404 semantics, metadata, Next 16 Cache Components/Suspense, and standalone build/deployment.
- [ ] Keep server-only modules out of browser/client bundles; separate Next client integrations (image/link/router) from the server page/loaders. Preserve plain React DOM fallback for image rendering; optimize via injected Next image when available.
- [ ] Document a minimal working textbook route, custom loader, scene registry, and non-Next host integration. Do not introduce a framework abstraction for hypothetical future platforms unless needed by current code.

**Acceptance:** a textbook can consume documented public APIs without copying generic Lesson SSR/loading logic; independent production build passes; no regressions in metadata, 404, locale, renderer or offline JSON flow.

## Workstream D — expand coverage beyond critical smoke tests

- [ ] Unit/component: navigation edge cases, quiz completion, celebration, deferred answers, skipping/visiting, image renderer default and injected variants, accessibility roles/names, keyboard interaction, screen-reader-friendly feedback, reduced motion where relevant.
- [ ] Localization: all locales/keys, generator malformed/missing locale failure, no fallback, translations in layout/preferences/media and Arabic/Hebrew/Urdu RTL plus Ukrainian/English/qm LTR.
- [ ] Adapter/integration: route factory public API, published JSON path and error cases, invalid UUID/locale and missing lesson handling, metadata, page Suspense, server/client boundary, loader overrides.
- [ ] Storybook: representative Lesson, steps, navigation, completion and host injection states, including RTL.
- [ ] E2E: Playground lesson navigation, content blocks/scenes/quiz, locale switching, 404, responsive desktop/mobile and relevant keyboard cases. Use actual supported fixtures rather than test-only compatibility code.
- [ ] Verify regression-free package boundaries and independent application builds; do not delete unrelated failing tests to obtain a green CI.

## Validation / execution order

1. Read current parent PR #303 state and Studio instructions; confirm which mandatory fixes are already in parent. If parent moves, reconcile/rebase the stacked branch before changes.
2. Implement A and C incrementally with small commits; add unit tests alongside refactors.
3. Inventory and implement B through the existing generator; test all canonical locales and obtain linguistic review where required.
4. Add D coverage. Run as applicable:
   - `npm ci`
   - `npm run packages:check`
   - `npm run build --workspace @svitlo/contracts`
   - `npm run build --workspace @svitlo/engine`
   - `npm run build --workspace @svitlo/ui-kit`
   - `npm run build --workspace @svitlo/nextjs-adapter`
   - `npm run typecheck --workspace @svitlo/ui-kit`
   - `npm run typecheck --workspace @svitlo/nextjs-adapter`
   - `npm run typecheck --workspace @svitlo/playground`
   - `npm run test:components --workspace @svitlo/ui-kit`
   - `npm run test:components --workspace @svitlo/playground`
   - `npm run build --workspace @svitlo/playground`
   - `npm run build-storybook` and scoped Playground Playwright E2E.
5. Separate new regressions from existing failing Engineering Skills translation typechecks and potentially unrelated SkillsMindMap test failures seen during parent PR #303. Never silently weaken CI, suppress errors, or claim the whole suite passes when it does not.
6. Update checklist and PR description with committed files, test logs and remaining blockers. Merge **into `refactor-lesson-module` only** after review, then finalize PR #303 separately.

## Out of scope

- No Electron/Capacitor/React Native implementation; only preserve WebView/React DOM portability.
- No new content authoring or textbook taxonomy translation.
- No unrelated lesson redesign, backward-compatible aliases, broad rewriting of independently deployable textbook apps, or hidden English fallback.
- No merge to `main` from this stacked PR.

## Instructions for a new agent/chat

Use repo `KiT-Maverik/svitlo-web`; check this document and **the stacked PR description first**. The work branch is `refactor/lesson-platform-hardening-303`; its base is `refactor-lesson-module` (parent PR #303). Inspect the newest code/commits before continuing. Never treat this work plan's unchecked items as completed. Preserve independent deployment and all canonical locales, including `qm`; use typed published JSON only at runtime. Implement in small verifiable commits, update the PR body/checklist, and report any linguistic or CI blockers precisely.
