# @svitlo/indexdb

Shared, framework-agnostic IndexedDB persistence for learning applications.

The published `package.json` exports only `@svitlo/indexdb` (root). Source entrypoints `/controllers`, `/utils`, `/schemas` and `/config` exist but are **not declared as package subpath exports**; supporting those imports is an unresolved API decision, not an existing published guarantee.

Storage compatibility is intentional: database **svitlo-progress** version **1** with `lessonStates` (`lessonId` index) and `quizStates` (`quizId` index), using `id` as the primary key. No browser data migration or deletion is performed.

IndexedDB depends on the framework-independent `@svitlo/engine/runtime` entrypoint for shared types and schema contracts.

## Verification

FastGate is a **typechecking-only gate**; it does not execute Node tests. Run `npm test --workspace @svitlo/indexdb` for the transaction utility tests and the production-controller integration suite against real `fake-indexeddb` transactions. Wave 3 should decide how to route this Node suite in CI (including Engine contract changes), based on measured cost. No CI gate is changed by this consolidation.

The separate **Native IndexedDB browser controllers** workflow runs only when IndexDB or its workflow changes (and on manual dispatch). One Chromium run exercises the real production controller exports against native IndexedDB, including the v1 physical schema, reload and same-origin page persistence, controller rollback, version changes and connection cleanup. Browser context isolation remains a browser-storage property, not a current Svitlo account-isolation contract. The harness and tests live in `testing/` outside published `dist/`.

Run the browser suite locally after installing dependencies and Chromium:

```bash
npm run package:build --workspace @svitlo/engine
npm run package:build --workspace @svitlo/indexdb
npx playwright install chromium
npm run test:e2e:db --workspace @svitlo/indexdb
```

A small Node HTTP server bundles the real `@svitlo/indexdb` exports with esbuild. It does **not** create a temporary Next.js application or add a test route to Web, Mobile or Desktop. esbuild and Playwright are test-only tools; production exports remain framework-free.

End-to-end learner progress persistence belongs to the real Web/Mobile/Desktop application suites **once** each host uses IndexDB; a controller-only browser test is not proof of host integration.

## Retained regression layers

- **Utility tests:** deterministic mocked transaction completion/error/abort/close behavior, including synchronous `updateState` setup failures.
- **Node integration:** actual `fake-indexeddb` controller contracts for every exported operation, strict persisted-state validation, both indexed filters, negative finite graded results and nonfinite rejection, nonnegative `earnedWeight`, ID immutability, atomic rollback and quiz/lesson completion transitions.
- **Native Chromium (five scenarios):** physical v1 schema, reload persistence, second-page same-origin visibility, native controller rollback and `versionchange` closure.

The native suite deliberately omits raw multi-store platform tests and isolated-browser-context assertions because no current Svitlo API promises atomic multi-store writes or per-account isolation. Do not infer v1 migration, partial-schema repair or account isolation from browser behavior. Future test selection and public `/controllers`/`/utils`/`/schemas`/`/config` subpath policy belong to an explicit follow-up decision.
