# Stage 8 — Final Monorepo Architecture Audit

**Audit snapshot:** Stage 7 head `782ef983` (PR #61), 2026-10-29. Stage 8 is stacked on Stage 7; PRs #59, #60 and #61 were open at the beginning of the audit. This is a **reviewable source and CI audit**, not a claim that all packages have been published or extracted.

## Completed migrations (code and ownership)

| Stage | Status in stacked branch              | Evidence / owner                                                                                       |
| ----- | ------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 0–1   | Earlier foundation and content split  | Math owns its taxonomy and docs; Playground owns its demo fixtures                                     |
| 2     | Common type extraction               | Initial shared content, locale and state definitions                                                   |
| 3     | Engine utilities + assessment methods | `shared/engine` owns generic builders and the 16 methods                                               |
| 4     | IndexedDB extraction                  | `shared/indexdb` owns CRUD, schemas and database configuration; original app `src/db` removed          |
| 5     | Browser integration tests             | `shared/indexdb/testing` owns Chromium harness/commands/Playwright suite; app Vitest setup retained    |
| 6     | Shared navigation and preferences     | UI Kit owns LearningLayout, NavbarPreferences, 7 dictionaries; app-specific hook bindings remain local |
| 7     | Platform bootstrap                    | `apps/platform` is a standalone Next.js workspace with catalog and desktop/mobile smoke test           |
| 8     | Audit + regression guards             | This change: authoritative docs, duplicate baseline, built-export checks and CI integration            |

## Current audit results

- **Workspace set:** eight packages, including the not-yet-implemented `@svitlo/server` placeholder, verified against `package.json` and `package-lock.json`.
- **Known cloned application files:** 67 exact same-relative-path `content/math/src` ↔ `content/playground/src` blob pairs at audit time. See `scripts/known-app-duplicates.json`. Most are lesson composition, demo/API pages, locale adapters and related tests. **Not fully deduplicated.** New identical paths outside the reviewed baseline must fail `repo:check:packages`.
- **No obsolete owners:** `src/db`, app-local NavbarPreferences and app-local DB-browser harness/config should not reappear.
- **Dependency graph:** Engine supplies shared build/runtime APIs; UI Kit and IndexedDB consume public runtime interfaces; apps do not import each other's sources. Platform has no `@svitlo/*` runtime dependencies; Server is a manifest-only placeholder.
- **Data compatibility:** IndexedDB `svitlo-progress` version 1, `lessonStates` and `quizStates` are unchanged across extraction.
- **CI coverage:** Questions quality runs typecheck, tests, lint, builds, E2E (including Platform); IndexedDB workflow runs native Chromium twice and general Playwright; Storybook has its own independent workflow. Built-artifact guard verifies dist JS/typings after build.

## Boundaries that remain deliberately unproven or out of scope

1. The 67 remaining cloned app-source paths require **their own** deduplication stage. A code-matching count is not proof that semantically similar but non-identical code is absent.
2. No clean-room consumer install of `npm pack` tarballs or registry publishing has been executed here. Private workspace packages and monorepo-linked builds are not release certification.
3. No actual extraction of Math into a separate Git repository has been executed. The import/boundary guards establish prerequisites, not end-to-end portability.
4. Platform is a catalog skeleton; no auth, profiles, purchases, federated data/backend integration, production domain or deployed textbook URL is assumed.
5. Server remains a placeholder, not a running HTTP service. PWA/offline/synchronization requirements remain separate product work.
6. The repository currently uses npm workspaces / `npm ci`, **not** pnpm or Turborepo execution despite their checked-in configuration files.

## Verification / review commands

```bash
npm ci
npm run repo:check:packages
npm run code:check:types
npm test
npm run test:components
npm run test:components --workspace @svitlo/math
npm run code:lint:check
npm run package:build
npm run app:build
npm run repo:check:artifacts
npx playwright install chromium
npm run test:e2e:db --workspace @svitlo/indexdb
npm run test:e2e --workspace @svitlo/platform
```

Each stage PR must pass its own CI on its own head; earlier green runs do **not** prove this PR. Do not merge a stacked child before its parent. Re-run audits if the base is changed. See [canonical monorepo guide](./monorepo-and-textbook.md).
