# Svitlo Monorepo Migration

> **Historical log, not the current architecture.** This file retains dated paths and stage names from earlier, separately numbered migrations. For the canonical 2026-10-29 layout and final audit use [Monorepo & Textbook](./docs/architecture/monorepo-and-textbook.md) and [Stage 8 Audit](./docs/architecture/migration-stage-8-audit.md). Current workspaces are `content/{math,playground}`, `apps/platform`, `shared/{contracts,engine,indexdb,ui-kit}`, and `backend/server`. The formerly pending IndexedDB browser harness consolidation was completed in Stage 5; Stage 6 centralized preferences, Stage 7 bootstrapped Platform.

## Phase 01 — Workspace foundation (complete)

## Phase 02 — Relocate Next.js into Playground (complete)

Phase 01 established package boundaries. Phase 02 moves the existing application into Playground without changing its source files.

- The app now lives at `frontend/playground/` (`src/`, `public/`, `next.config.ts`, etc.). The entire original `src/` tree, including the math content and `utils/`, is temporarily preserved inside Playground.
- Existing `npm run dev`, `npm run build`, `npm run typecheck` and test commands delegate to the Playground workspace. GitHub Actions runs the same root commands.
- Playground and Engine are now buildable. Math textbook, UI Kit and Backend Server remain initialized placeholders.
- The existing npm lockfile and `npm ci` remain authoritative. The `pnpm-workspace.yaml` and `turbo.json` describe the planned layout; switching the package manager and activating Turborepo tasks requires a separate, verified migration with a reproducible lockfile and updated CI.

### Workspaces

| Path                      | Package              | Purpose                                                                            |
| ------------------------- | -------------------- | ---------------------------------------------------------------------------------- |
| `backend/server`          | `@svitlo/server`     | Future server application                                                          |
| `frontend/textbooks/math` | `@svitlo/math`       | Future mathematics Next.js textbook                                                |
| `frontend/playground`     | `@svitlo/playground` | Future independent Next.js playground                                              |
| `shared/engine`           | `@svitlo/engine`     | Framework-agnostic assessment, synchronization, generation, and other non-UI logic |
| `shared/ui-kit`           | `@svitlo/ui-kit`     | Shared React/MUI components, hooks, contexts, and frontend-specific utilities      |

### Dependency boundaries

- `engine` must not depend on React, Next.js, MUI, or the UI kit.
- `ui-kit` may consume `engine`, but neither shared package may import from an application.
- `math` and `playground` may consume shared packages, but must not depend on each other.
- `server` may consume environment-agnostic engine functionality, not frontend code.
- Import other packages through package exports (once implemented), not relative paths across workspace roots.
- Each workspace has its own `tsconfig.json` and local `@/*` alias reserved for future source code.

### Validation

- `npm ci` — installs dependencies and links all npm workspaces.
- `npm run packages:check` — checks workspace paths, manifests, aliases, and lockfile links.
- `npm run packages:list` — lists the five workspace packages.
- Root app scripts delegate to Playground. Package-wide scripts (`packages:build`, `packages:typecheck`, `packages:lint`, `packages:test`) run Playground while skipping placeholders.

### Follow-up phases

1. [Complete] Relocate the existing Next.js application to `frontend/playground` with behavior preserved.
2. Extract engine code, with contract tests and dependency audits.
3. Extract UI kit components and hooks; establish package exports.
4. Turn playground into an independent Next.js application with no subject-specific content.
5. Activate full multi-package build/test CI, and migrate to pnpm + Turborepo with a committed lockfile.

**Scope guard:** The original Next.js application was relocated intact in Phase 02. Shared utilities and content types are being extracted in subsequent phases, with CI verification.

## Phase 03 — Extract standalone Engine (first vertical slice)

- Built and typed npm package `@svitlo/engine` now owns localization definitions, localized-path generation, and Skill/SkillGroup/SkillDomain authoring validations.
- `@svitlo/playground` consumes the compiled package via a real npm dependency and public `exports`.
- Historic intermediate re-exports were removed during the subsequent direct-import migration; consumers now use Engine public entrypoints.
- No app imports from `shared/engine/src/`. No engine imports from Playground, React, or Next.js.
- Builders for lessons/resources/questions, text resources, dynamic question and assessment method configs remain in Playground until their contract dependencies are made portable. No React hooks or UI-only utilities were found in this first batch; `ui-kit` is untouched.
- Registry extraction remains an explicit later phase; `private: true` intentionally prevents accidental publication.

## Phase 04 — Shared content contracts (complete)

- Engine is the canonical owner of content contracts for Resource, Lesson, Question, Quiz, Assessment Method, Disability and shared collection utilities.
- The stable set of 16 Assessment Method UUIDs belongs to Engine, not a mathematics-specific path. No compatibility registry is retained.
- Playground's previous content-contract wrappers have been removed. Callers import canonical contracts directly from Engine.
- The Engine remains free of React and Next.js; scene `component` and lesson section `icon` are extensible, renderer-specific values typed as `unknown` by default. Frontend renderers supply/narrow their UI representation.
- Public package API: `@svitlo/engine/content`. Future textbooks can extend base contracts using TypeScript intersections or generic parameters without editing Engine.

## Layout update (2026-10-28)

Live workspace paths are now `apps/playground` and `apps/textbooks/math`. `apps/` holds independently deployable applications; `apps/textbooks/` groups textbook applications. The historical phase descriptions above retain their original paths for chronology. Existing package APIs and extraction boundaries remain unchanged.

## Stage 2 — Shared UI Kit extraction

- Reusable question input widgets, question controller/registry, navigation primitives,
  Flashcard, KnowledgeCheckpoint, MarkdownContent and VerticalSpace now live in
  `shared/ui-kit` (package `@svitlo/ui-kit`).
- The public package API exposes `@svitlo/ui-kit`, `/questions`, `/widgets`, and
  `/navigation` plus exported, typed subpaths. Dist includes JavaScript, declarations
  and CSS Module assets; Playground builds after Engine and UI Kit.
- Consumers import the package directly. No application compatibility re-exports
  or relative imports across workspace roots are retained.
- Component and question-logic regression tests live beside their source in UI Kit.
  Application integration tests remain in Playground.
- Next.js routing, lesson-state-dependent LearningLayout, LocaleProvider, and the
  Next Image flag asset adapter remain app-owned because they depend on the host.
- Stage 3 (standalone Math application) is not included here.

## Stage 2 completion — reusable layout and flags (2026-10-28)

- UI Kit owns the `Flag` component, locale-to-country mapping, and canonical scalable SVG flag assets. All applications use `@svitlo/ui-kit/widgets`. A public package asset sync entrypoint installs static assets under the consuming Next.js public directory during dev/build.
- UI Kit owns `LearningLayout`, its reusable presentation, navigation controls, state-independent public props, and localized labels. Textbooks provide lesson state, callbacks, route links, and preferences through their app adapter. UI Kit does not import the application, Next.js router, or lesson persistence.
- `LocaleProvider` remains application-scoped by explicit decision.

## Stage 3 — standalone mathematics textbook (2026-10-28)

- `apps/textbooks/math` is a standalone Next.js workspace, initialized from the working Playground. It retains all reusable demonstrations, localized content, testing infrastructure and its mathematics-specific skills taxonomy.
- `math/` at repository root moved into `apps/textbooks/math/docs/` so package-scoped agents can read educational specifications.
- `apps/playground/src/math/` and subject-specific taxonomy regression tests are removed from the Playground, while the Math app keeps the complete authored taxonomy and tests.
- Each app builds and typechecks via its own npm workspace scripts; shared code is consumed through public Engine/UI Kit exports. Publishing remains out of scope.

## Stage 4 — Subject-neutral Playground

- Removed the old light-science authored content, local route and the deprecated mathematics taxonomy migration script from Playground. Math textbook source and documentation remain unchanged.
- Playground now hosts a small static, subject-neutral lesson fixture under `src/data/demoLesson/demoLesson.ts` and `/topics/demo`, plus generic UI Kit question/API examples.
- Removed obsolete `@layout` and `@pages` aliases and app re-export barrels; application imports are explicit. Shared packages remain accessible only through their public package exports.
- Playground remains separately buildable and its lesson persistence, quiz workflow, localization and browser coverage use stable locally owned demo IDs rather than textbook-specific content.

## Stage 5 — Architecture extraction readiness (2026-10-28)

- Keep npm workspaces and a single repository for current development. Independent registries, releases, deployments, and actual extraction are **not** part of this stage.
- Every textbook remains self-contained: no application-to-application imports, cross-package relative paths, or direct imports into shared package source trees.
- Shared Engine and UI Kit are consumed through explicit, typed public exports. Each package declares its production dependencies and owns the code and assets needed by its public API.
- Engine remains framework-independent. UI Kit remains independent of Next.js and of application code; application-specific adapters and `LocaleProvider` remain in each app.
- `npm run packages:check` includes the `check-extraction-readiness.mjs` guard for package import boundaries, dependency declarations, public entrypoint sources and UI Kit's packaged flag synchronization script and SVG assets.
- A future decision to extract or distribute a package will still require a real package-artifact installation test (`npm pack` and isolated consumer). Passing static checks and monorepo CI is architectural preparation, **not** proof of distributable artifact functionality.

### Stage 5 follow-up — autonomous UI Kit Storybook

- Storybook configuration and preview live in `shared/ui-kit/.storybook`, with locally owned demo fixtures in `.storybook/fixtures`. Stories only target UI Kit widgets.
- `npm run storybook` and `npm run build-storybook` delegate from the root to `@svitlo/ui-kit` after building shared dependencies. No app-level Storybook configs, scripts, or direct stories sourced from other workspaces remain.
- Flag assets are served from the UI Kit's own `assets/flags`. Storybook tooling currently retains the existing Next.js Storybook framework as a **development-only** dependency; UI Kit's production API and compiled artifacts must not import Next.js.
- Any future stories needing page-like state must create fixtures under UI Kit's own `.storybook/fixtures`, never depend on Playground/Math source or curriculum.
- The Storybook build is verified by the dedicated `UI Kit Storybook` GitHub Actions workflow.

## Stage 4 — IndexedDB package

The canonical browser persistence implementation is `shared/indexdb` (`@svitlo/indexdb`), with public controllers, utils, schemas and configuration exports. Both `content/math` and `content/playground` consume the compiled package instead of owning `src/db`. The database name `svitlo-progress`, schema version `1`, store keys and indexes are unchanged. Browser harnesses remain in each app's `src/testing` pending Stage 5 centralization. If standalone apps share one browser origin, identical database names continue to share the same storage scope; extraction does not change that behavior.
