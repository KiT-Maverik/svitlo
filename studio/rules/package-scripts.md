# npm Package Script Naming and Scope

**Status:** Target convention. Existing script names remain supported until a separate migration updates all callers, including CI. This document does not claim that any npm scripts have already been renamed.

**Applies to:** Root `package.json`, workspaces under `apps/`, `content/`, `shared/`, `backend/`, and every workflow or script invoking them.

## Core principle: same command, different scope

The **same canonical script name** means the **same operation** everywhere it is supported.

- **Workspace:** `npm run code:check:types --workspace @svitlo/ui-kit` checks only UI Kit.
- **Root:** `npm run code:check:types` checks **all applicable workspaces**. Root-owned files are included when meaningful.
- **No package-specific root aliases** like `build:math` or `typecheck:physics`; use npm's `--workspace` selector for a specific package.
- **No root package-selection arguments:** the default root invocation always covers all eligible packages. Root scripts must never quietly target only one selected app/subject.
- **Capability-based participation:** Packages declare only operations they really support. An aggregation may skip a package without that capability, but must fail if a required capability is unexpectedly missing. No placeholder no-op scripts.
- **No semantic drift:** the same name must not mean a different test suite or unrelated check in the root and a package.

**Exception:** `storybook:start` is interactive and **must never be exposed at the repository root**. It exists only in the workspace owning Storybook. `storybook:build` may exist both in owning workspaces and at the root (root builds all Storybooks).

**Long-running apps:** Root `app:start` or `app:start:dev` may only be added if an all-app process supervisor can run all supported applications, handle port collisions, logs and shutdown reliably. Until that exists, omit those root commands rather than pretending to aggregate by starting just one app.

## Names and meaning

Use lowercase kebab-case segments separated by colons:

```text
<domain>:<operation>[:<mode>[:<detail>]]
test[:<kind>[:<detail>]]           # test is its own family, no code prefix
```

| Family | Meaning |
| --- | --- |
| `code:` | Formatting, linting and static/type checks |
| `test` / `test:` | All tests: unit, integration, component, E2E, smoke, coverage |
| `package:` | Building and checking libraries/content packages as distributable units |
| `app:` | Building, starting, validating and packing deployable apps |
| `content:` | Generating, checking and publishing educational content |
| `storybook:` | Storybook builds and interactive development |
| `repo:` | Root-only architecture, workspace and tooling integrity checks |

`:check` **must not modify authored or tracked source**; ignored build outputs/caches necessary to inspect results are permitted. `:fix` explicitly permits safe source rewrites. Producing outputs belongs to `:build`, `:generate`, `:publish` or `:pack`, not `:check`.

`code:check:types` is the dedicated TypeScript check. For formatting and linting, pair `:check` with `:fix`: `code:format:check`, `code:format:fix`, `code:lint:check`, `code:lint:fix`. Do not add ambiguous aliases `code:format` / `code:lint`.

## Canonical command catalog

Only define a command in a workspace that truly implements it.

| Name | Operation |
| --- | --- |
| `code:format:check` | Validate formatting |
| `code:format:fix` | Apply formatter |
| `code:lint:check` | Run lint checks |
| `code:lint:fix` | Apply supported automatic lint fixes |
| `code:check:types` | Type-check without publishing |
| `test` | Standard, deterministic test suite |
| `test:unit` | Unit tests |
| `test:integration` | Integration tests |
| `test:components` | Component tests |
| `test:e2e` | Browser/end-to-end tests |
| `test:smoke` | Smoke tests |
| `test:coverage` | Standard test suite with coverage |
| `package:build` | Build a distributable library/content package |
| `package:check:exports` | Check public package exports/artifacts |
| `app:build` | Build a deployable app |
| `app:start` | Run a built app in production |
| `app:start:dev` | Run a development app server/watch mode |
| `app:pack` | Create an application distribution |
| `app:check:bundle` | Validate app bundle/resources |
| `content:generate` | Generate derivative authored data |
| `content:check` | Validate educational content without rewriting source |
| `content:publish` | Produce/stage publishable localized content |
| `storybook:build` | Build a static Storybook (aggregatable at root) |
| `storybook:start` | Start Storybook dev server (**workspace only; never root**) |

All test variants are in `test:`, not `code:`. Prefer `test:<kind>[:<area>][:coverage]`, for instance `test:e2e:db`, `test:components:coverage`, `test:unit:db:coverage`. The plain `test` should aggregate the package's regular deterministic tests; expensive E2E runs use explicit commands.

Specialized scripts may use further meaningful segments: `app:pack:linux`, `content:check:taxonomy`, `content:generate:scenes`. `app:pack` is the canonical app distribution verb; avoid `app:package`. Root-only checks without a package equivalent can use `repo:check:workspaces`, `repo:check:boundaries`, `repo:check:artifacts`.

## Root orchestration requirements

1. Discover workspace eligibility from root `workspaces` and package manifests. Do not maintain per-subject script aliases or hand-written workspace lists at the root.
2. Ensure builds and build-dependent checks honor the **workspace dependency graph**; `npm run ... --workspaces --if-present` does **not** guarantee topological order. Build necessary shared outputs before dependent packages, without repeated work.
3. Root formatting may use one repository-wide formatter invocation if it covers the same files and semantics as the package-local scripts, including repository-owned files.
4. Report run, skipped and failed workspaces; propagate failures. Never hide them with `|| true`.
5. Do not interfere with npm lifecycle hooks such as `prebuild`, `prepack` and app content preparation or execute them twice.
6. Omitting an unsafe/unimplemented root command is better than a misleading partial aggregator. **Never put `storybook:start` in root.**
7. The repository uses **npm workspaces** and an authoritative `package-lock.json`; no implied pnpm or Turbo orchestration.

### Target usage (not implemented by this guideline)

```bash
# Root: all applicable workspaces
npm run code:format:check
npm run code:check:types
npm run test
npm run test:components
npm run package:build
npm run app:build
npm run storybook:build

# Specific workspace: only that workspace
npm run code:check:types --workspace @svitlo/ui-kit
npm run test:components --workspace @svitlo/ui-kit
npm run package:build --workspace @svitlo/physics
npm run app:start:dev --workspace @svitlo/web
npm run app:pack --workspace @svitlo/desktop
npm run storybook:start --workspace @svitlo/ui-kit
```

## Migration from current scripts

Current root/workspace commands and npm lifecycle hooks remain **legacy APIs** until their callers have been migrated. The canonical names below are a target, not commands currently guaranteed to exist.

| Current script(s) | Target |
| --- | --- |
| `format` / `format:check` | `code:format:fix` / `code:format:check` |
| `lint` | `code:lint:check` (add `code:lint:fix` only where supported) |
| `typecheck`, `packages:typecheck` | `code:check:types` |
| `test`, `packages:test` | `test`; normalize suite and aggregation semantics |
| `test:components`, `test:e2e`, `test:components:coverage` | Already canonical |
| `build` in a library/content package | `package:build` |
| `build` in an app | `app:build` |
| `dev` / `start` in an app | `app:start:dev` / `app:start` |
| `package`, `package:linux`, `package:mac`, `package:win` in Desktop | `app:pack` and `app:pack:<platform>` |
| `storybook` / `build-storybook` in UI Kit | `storybook:start` / `storybook:build` |
| `generate:scenes` / `check:scenes` in Playground | `content:generate:scenes` / `content:check:scenes` |
| `packages:check`, `packages:artifacts:check` in root | Appropriate root-only `repo:check:*` scripts |

Specialized test commands for DB controllers, portability, publish verification or packaged-app E2E must preserve their behavior and be mapped deliberately, not by blind string replacement.

**Safe migration sequence:** inventory script callers (other scripts, workflows, readmes, tooling and lifecycle hooks); add canonical workspace commands; implement and test dependency-aware root aggregation; update all callers; then remove aliases. Verify FastGate, content publishing, Web/Desktop/Mobile pipelines, Storybook, package packing and formatting.

## Review checklist

- Same operation and name at root and package level, with root covering all eligible workspaces?
- No root command selects one subject or app implicitly?
- Tests always use `test` / `test:` rather than a code prefix?
- Check/fix distinction and owner-scoped side effects respected?
- Build dependencies, CLI failures and npm lifecycle hooks handled?
- `app:pack` used for app distributions?
- `storybook:start` absent from root and `storybook:build` aggregatable?
- All consumers updated before removing any legacy name?
