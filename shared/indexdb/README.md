# @svitlo/indexdb

Shared, framework-agnostic IndexedDB persistence for all learning apps.

Exports: `@svitlo/indexdb` and `/controllers` for CRUD operations, `/utils` for database transactions, `/schemas` for Zod state validators and `/config` for store constants.

Storage compatibility is intentional: database **svitlo-progress** version **1** with `lessonStates` (`lessonId` index) and `quizStates` (`quizId` index), using `id` as the primary key. No browser data migration or deletion is performed.

State models are owned by `@svitlo/contracts`. Native IndexedDB Chromium E2E tests, commands and the browser harness live in
`testing/` next to their owner, outside published `src/` and `dist/`.
The test server generates a disposable minimal Next.js application without importing
either learning app. Node controller tests remain in `src/controllers/` and use
fake-indexeddb.

From the monorepo root run `npm run test:e2e:db --workspace @svitlo/indexdb` after installing dependencies and
Chromium (`npx playwright install chromium`). CI repeats the native suite.
Browser test React/Next.js tooling is dev-only; production exports remain framework-free.
