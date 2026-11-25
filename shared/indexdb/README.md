# @svitlo/indexdb

Shared, framework-agnostic IndexedDB persistence for learning applications.

Exports: `@svitlo/indexdb` and `/controllers` for CRUD operations, `/utils` for database transactions, `/schemas` for Zod state validators and `/config` for store constants.

Storage compatibility is intentional: database **svitlo-progress** version **1** with `lessonStates` (`lessonId` index) and `quizStates` (`quizId` index), using `id` as the primary key. No browser data migration or deletion is performed.

IndexedDB depends on the framework-independent `@svitlo/engine/runtime` entrypoint for shared types and schema contracts.

## Verification

FastGate builds, typechecks and runs Node controller/unit/integration tests on changes to `shared/indexdb/`, and also on relevant Engine runtime-contract changes. Node tests use `fake-indexeddb`.

The separate **Native IndexedDB browser controllers** workflow runs only when IndexDB or its workflow changes (and on manual dispatch). One Chromium run exercises the real production controller exports against native IndexedDB, including persistence, rollback, version changes and connection cleanup. The harness and tests live in `testing/` outside published `dist/`.

Run the browser suite locally after installing dependencies and Chromium:

```bash
npm run package:build --workspace @svitlo/engine
npm run package:build --workspace @svitlo/indexdb
npx playwright install chromium
npm run test:e2e:db --workspace @svitlo/indexdb
```

A small Node HTTP server bundles the real `@svitlo/indexdb` exports with esbuild. It does **not** create a temporary Next.js application or add a test route to Web, Mobile or Desktop. esbuild and Playwright are test-only tools; production exports remain framework-free.

End-to-end learner progress persistence belongs to the real Web/Mobile/Desktop application suites **once** each host uses IndexDB; a controller-only browser test is not proof of host integration.
