# Quiet CI command execution

Use `node scripts/ci/quietRun/quiet-run.mjs -- <command> [args...]` for test, lint, typecheck, build, and dependency-install commands. A successful command emits one status line and elapsed time. On failure, it retains the exit code and emits bounded diagnostics; `SVITLO_CI_VERBOSE=1` enables complete streaming output.

Do **not** wrap commands whose stdout is consumed as a protocol, e.g., generators emitting JSON, commands feeding shell pipelines, GitHub API calls, or credential/token output. `GITHUB_OUTPUT` and `GITHUB_ENV` files are inherited. Full successful output is intentionally not archived or uploaded because it may contain sensitive data; re-run with verbose explicitly when needed. CI assertions are never disabled.

Tests: `node --test scripts/ci/quietRun/quiet-run.spec.mjs`.

For especially verbose content matrix builds, wrap the entire `build-changed-content.mjs` CLI, not its individual structured JSON inputs; keep `GITHUB_OUTPUT` and per-package exit codes unchanged. A bounded early-diagnostic buffer preserves first TypeScript/build errors even after a large tail of output.
