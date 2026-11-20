# Production Quality package build reuse

This **job-local** helper deduplicates `package:build` requests from the root
workspace aggregator, npm test lifecycle hooks, and Web/Mobile/Desktop content
preparation. Do not use a cross-job cache or inherit a `dist/` directory from
the separate textbook Content Build matrix.

Production Quality sets `SVITLO_CI_PACKAGE_BUILD_STATE` to an absolute file
in the runner's temporary directory. Every build request:

1. Resolves buildable dependencies in topological order.
2. Checks that Git tracked inputs still match the checked-out commit.
3. Verifies **all** previously compiled `dist/` files by name, size and SHA-256,
   including exported files and textbook publication resources.
4. Rebuilds on missing/changed outputs, changed sources, changed dependency
   generation or missing state, and records a new state only after success.
5. Immediately propagates build/validation failures. A corrupted or foreign
   state is not trusted.

The state is **not** an npm cache and is not shared between jobs, commits,
checkouts, or runners. If the environment variable is absent, the helper
always invokes the ordinary workspace `npm run package:build` command.
Do not enable it for arbitrary parallel CI jobs: concurrent writers to the
same job state are outside its deliberately sequential contract.

Usage:

```bash
node scripts/ci/packageBuildReuse/package-build-reuse.mjs @svitlo/engine
node scripts/ci/packageBuildReuse/package-build-reuse.mjs --summary
node --test scripts/ci/packageBuildReuse/package-build-reuse.spec.mjs
```

Production Quality retains the existing typecheck, test, lint, package
artifact, application build and E2E commands. The summary reports requested,
executed and reused package builds plus measured build-command duration; it
does not manufacture a historical before/after wall-time comparison. Use
matched successful Ready `develop → main` jobs for that comparison.
