# Svitlo Turbo task graph integrity

This read-only, manifest-derived workflow checks the **actual** pinned Turbo
`--dry=json` output. It does not build packages, select changed files,
run authored content or publish results.

- `package:build`: build all eligible workspaces with prerequisite exports
  ordered through npm workspace dependencies and development dependencies.
  The shared textbook builder always needs compiled Engine; textbooks with
  Scene/style exports additionally need UI Kit. Both are checked against
  declared manifests to prevent nested fallback builds racing `dist/`.
- `code:lint:check`: lint all eligible workspaces after declared buildable
  package prerequisites.
- `npm run repo:check:turbo`: require pinned root npm/Turbo/lockfile,
  then validate every eligible task exactly once. Fail closed for omitted,
  executable extra or duplicate tasks, missing build edges, dangling references
  and dependency cycles. Turbo's non-executable `<NONEXISTENT>` nodes are
  accepted only when the declared workspace really lacks that script.

The DAG uses local-only execution and bounded concurrency. Both cache sources
are explicitly disabled with `--cache=local:,remote:` and `cache: false`.
`envMode: loose` preserves npm/CI and Svitlo generator environment inputs,
which could otherwise be filtered in strict mode. No cloud provider or
remote cache is required.

## Validate

```sh
node --test scripts/ci/turboTaskGraph/verify-graph.spec.mjs
npm ci --no-audit --no-fund
npm run repo:check:turbo
```

The first test is pure Node. The second/third steps require a real clean
installation; do not claim graph verification from source-only tests.
The independent Production Quality source-policy job checks synthetic graph
cases before install. The package job checks the live graph before builds
and exported-artifact verification.

## Limits and rollback

FastGate, full TypeScript scheduling, tests, selected components, app
preparation, Docker/materializer security, textbook publication and E2E
remain in their existing workflows. Preserve their required status names.
Job-local SHA-256 build reuse remains relevant to other workers whose
lifecycle hooks may request repeated builds; it is not enabled in the
standalone Turbo package worker.

To roll back, restore the two root scripts from their previous
`runWorkspaceScript` versions and remove Turbo installation, graph config,
and the package-only validation step. Never weaken the release policy,
protected final `Production Quality / verify` aggregation or app/test gates.
