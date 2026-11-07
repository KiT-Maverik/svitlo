# npm Package Script Naming and Scope

**Status:** Canonical convention implemented in root and workspace manifests. The script migration, CI call-site updates and workspace aggregator are part of this same change.

**Applies to:** Root `package.json`, workspaces under `apps/`, `content/`, `shared/`, `backend/`, and every workflow or script invoking them.

## Required `package.json` section order

Keep the top-level manifest sections in the same **presentation order** in the repository root and every workspace:

1. **Package metadata first:** `name`, `version`, `description`, `private`, `type`, and other package identity metadata (for example `license`, `author`, `repository`, `packageManager`, `engines`).
2. **Scripts:** `scripts` (if the package has scripts).
3. **Runtime dependencies:** `dependencies` (if needed).
4. **Development dependencies:** `devDependencies` (if needed).
5. **All other fields:** bundler/runtime/package-publication configuration such as `main`, `types`, `imports`, `exports`, `files`, `bin`, `peerDependencies`, `typesVersions`, `workspaces`, etc., ordered as appropriate for that package.

Omit absent/irrelevant fields; never add empty `scripts` or dependency objects just for visual uniformity. Do not change the order of individual scripts or dependencies as part of a section-order cleanup.

**JSON object key order is not semantically significant for npm:** rearranging these top-level keys does **not** change build behavior, dependency resolution or lifecycle hooks. This rule exists for human readability, consistency and predictable diffs. Keep the values and the structure inside each section unchanged.

For example:

```json
{
  "name": "@svitlo/example",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "package:build": "tsc -p tsconfig.build.json",
    "code:check:types": "tsc --noEmit"
  },
  "dependencies": {
    "@svitlo/contracts": "0.0.0"
  },
  "devDependencies": {
    "typescript": "^5"
  },
  "main": "./dist/index.js",
  "exports": {
    ".": "./dist/index.js"
  }
}
```

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

| Family           | Meaning                                                                 |
| ---------------- | ----------------------------------------------------------------------- |
| `code:`          | Formatting, linting and static/type checks                              |
| `test` / `test:` | All tests: unit, integration, component, E2E, smoke, coverage           |
| `package:`       | Building and checking libraries/content packages as distributable units |
| `app:`           | Building, starting, validating and packing deployable apps              |
| `content:`       | Generating, checking and publishing educational content                 |
| `storybook:`     | Storybook builds and interactive development                            |
| `repo:`          | Root-only architecture, workspace and tooling integrity checks          |

`:check` **must not modify authored or tracked source**; ignored build outputs/caches necessary to inspect results are permitted. `:fix` explicitly permits safe source rewrites. Producing outputs belongs to `:build`, `:generate`, `:publish` or `:pack`, not `:check`.

`code:check:types` is the dedicated TypeScript check. For formatting and linting, pair `:check` with `:fix`: `code:format:check`, `code:format:fix`, `code:lint:check`, `code:lint:fix`. Do not add ambiguous aliases `code:format` / `code:lint`.

## Canonical command catalog

Only define a command in a workspace that truly implements it.

| Name                    | Operation                                                   |
| ----------------------- | ----------------------------------------------------------- |
| `code:format:check`     | Validate formatting                                         |
| `code:format:fix`       | Apply formatter                                             |
| `code:lint:check`       | Run lint checks                                             |
| `code:lint:fix`         | Apply supported automatic lint fixes                        |
| `code:check:types`      | Type-check without publishing                               |
| `test`                  | Standard, deterministic test suite                          |
| `test:unit`             | Unit tests                                                  |
| `test:integration`      | Integration tests                                           |
| `test:components`       | Component tests                                             |
| `test:e2e`              | Browser/end-to-end tests                                    |
| `test:smoke`            | Smoke tests                                                 |
| `test:coverage`         | Standard test suite with coverage                           |
| `package:build`         | Build a distributable library/content package               |
| `package:check:exports` | Check public package exports/artifacts                      |
| `app:build`             | Build a deployable app                                      |
| `app:start`             | Run a built app in production                               |
| `app:start:dev`         | Run a development app server/watch mode                     |
| `app:pack`              | Create an application distribution                          |
| `app:check:bundle`      | Validate app bundle/resources                               |
| `content:generate`      | Generate derivative authored data                           |
| `content:check`         | Validate educational content without rewriting source       |
| `content:publish`       | Produce/stage publishable localized content                 |
| `storybook:build`       | Build a static Storybook (aggregatable at root)             |
| `storybook:start`       | Start Storybook dev server (**workspace only; never root**) |

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

### Supported CLI usage

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

## Migration and compatibility

The canonical scripts have been adopted in the root and workspace manifests; the
repository's GitHub Actions workflows, app-host preparation scripts, content build
tooling, and documented invocations use the new names.

- Root aggregation is implemented by `scripts/run-workspace-script.mjs`. It
  discovers eligible workspaces dynamically and orders dependency-sensitive
  operations topologically. See its Node regression tests.
- Legacy `build`, `typecheck`, `lint`, `dev`, `start`, and
  `build-storybook` npm script names have been replaced with the respective
  `package:*`, `app:*`, `code:*` and `storybook:*` operations.
- All test commands remain in the `test` family, including specialized
  `test:publish`, `test:portability` and database/controller variants.
- npm's built-in lifecycle entrypoint `prepack` **must remain named
  `prepack`**. Its body now calls `package:build`. Explicit `prebuild`,
  `predev` and `pretypecheck` hooks were renamed with their corresponding
  scripts (e.g. `preapp:build` and `precode:check:types`) so their
  automatic npm triggering is retained.
- `storybook:start` is deliberately absent from the root; `app:start`
  and `app:start:dev` are package-only pending a multi-app supervisor.
- Specialized package-only scripts such as Desktop platform packing and Mobile
  Capacitor synchronization retain a meaningful `app:*` namespace.
- `repo:check:packages` is the repository-wide architecture and workspace
  validation; `repo:check:artifacts` checks built package exports.

When adding or changing a script in the future, update **all** call sites,
npm lifecycle hooks, CI workflows, documentation, tests and runtime tooling.
Do not reinstate package-specific root aliases or misleading partial aggregators.

## Review checklist

- Same operation and name at root and package level, with root covering all eligible workspaces?
- No root command selects one subject or app implicitly?
- Tests always use `test` / `test:` rather than a code prefix?
- Check/fix distinction and owner-scoped side effects respected?
- Build dependencies, CLI failures and npm lifecycle hooks handled?
- `app:pack` used for app distributions?
- `storybook:start` absent from root and `storybook:build` aggregatable?
- All consumers updated before removing any legacy name?
