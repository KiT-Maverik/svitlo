# Course draft stub source guard

The required FastGate Ready-PR check runs this read-only TypeScript symbol-aware guard after installing pinned dependencies. It rejects newly introduced uses and imports of defineLessonStub, defineEpisodeStub and defineAssessmentStub, including renamed import bindings, namespace imports and transitive ESM re-exports, from production-authored files on pull requests to develop or other branches.

The checker resolves the actual Engine declaration symbol instead of scanning string matches. It checks added lines in the merge-base diff, so untouched historical source is not automatically migrated. Engine's factory implementation, tests and typecheck fixtures are excluded. Strict publishers independently reject draft: true, so content publication cannot evade this guard.

Run:

```sh
node --test scripts/ci/checkStubImports/check-stub-imports.spec.mjs
node scripts/ci/checkStubImports/check-stub-imports.mjs <base-sha> <head-sha>
```

The guard uses the pinned TypeScript compiler API installed by npm ci. It does not replace the TODO (BLOCKER) release checks.
