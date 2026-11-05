# Svitlo — Monorepo & Independent Textbooks

**Canonical implementation guide (Stage 8, 2026-10-29).** Always check manifests and CI for the commit under review. [Historical migration log](../../Monorepo%20Migration.md) is **not** a current directory map. [Final audit and remaining debt](./migration-stage-8-audit.md).

**2026-11-05 implementation update:** `apps/web` is the universal Next.js host for the
build-selected textbook. `learningApps/playground` is now a React DOM textbook
package with authored `data/`, Scenes, generated static registry and explicit
`@svitlo/playground` exports. `apps/web/textbooks.json` selects a declared
workspace dependency before compilation; its build publishes textbook JSON,
UI Kit locales and assets into the host. Other textbooks and `frontend/platform`
retain their existing application architecture. The Next.js integration package
resides at `shared/adapters/nextjs`, within the `@svitlo/adapter`
workspace rooted at `shared/adapters`. It is imported as
`@svitlo/adapter/nextjs` (and its `/lesson` and `/image` subpaths). The Stage 8 map and dependency
table below document the prior baseline and should not be treated as current
Playground ownership.

## Purpose and non-negotiable extraction constraint

Svitlo **currently** combines independently deployable Next.js apps with explicit reusable library packages. A textbook has its **own package root**, curriculum, `docs/`, data, assets, configuration and tests. It must remain possible to move a textbook to a separate repository without copying another app's code or globally rewriting imports. Extracted shared packages must be installable through declared public APIs; a green monorepo build does not, on its own, prove isolated registry/tarball consumption.

## Planned direction: shared platform hosts and textbook modules

**Target architecture, not the implemented Stage 8 layout:** move toward a thin Next.js Web host, one React + Capacitor mobile host (iOS and Android), and one React + Electron desktop host. Each textbook will be a single independently extractable package holding authored `*.data.ts`, assets, Scenes and its generated static Scene registry, rather than a separately maintained Next.js app per target. **There is no requirement to split textbook definitions and runtime registries into different repositories or packages.**

At build time a host selects one or more textbook packages and statically bundles their registries/Scenes. Build-time authored-data publishing produces runtime JSON, not runtime imports of `*.data.ts`. The actual migration requires defined public package exports, stable build selection, parity tests, and review of existing server/provider coupling; no new `apps/web`, `apps/mobile`, `apps/desktop`, or `books/` directories are claimed to exist here. SSR/SSG can remain in the Web host; interactive Lesson UI belongs in reusable React DOM code.

See the canonical [Cross-Platform Lesson Runtime](./cross-platform-lesson-runtime.md) for target dependency/DI, licensing, PWA, offline, and client-state rules. The map, dependencies, scripts and Stage 8 audit below remain a **snapshot of the current standalone-app architecture** until a separate migration changes them.

## Current repository map

```text
/
├── backend/
│   └── server/           # @svitlo/server — manifest-only backend placeholder
├── frontend/
│   └── platform/         # @svitlo/platform — independent Next.js catalog app
├── content/
│   ├── geography/        # @svitlo/geography — standalone textbook scaffold
│   ├── informatics/      # @svitlo/informatics — standalone textbook scaffold
│   ├── physics/          # @svitlo/physics — standalone textbook scaffold
│   ├── math/             # @svitlo/math — standalone textbook and its docs/content
│   └── playground/       # @svitlo/playground — demo and test app, not a shared library
├── shared/
│   ├── contracts/        # @svitlo/contracts — framework-free types, IDs, locales
│   ├── engine/           # @svitlo/engine — builders, validation, generators, data
│   ├── indexdb/          # @svitlo/indexdb — IndexedDB CRUD, schemas, persistence
│   ├── ui-kit/           # @svitlo/ui-kit — reusable framework-agnostic React/MUI UI and Lesson
│   └── adapters/         # @svitlo/adapter — framework integration package
│       └── nextjs/       # /nextjs — Next.js lesson SSR and routing
├── scripts/              # package boundary, duplicate and artifact checks
├── studio/               # cross-cutting architecture, workflow and product docs
├── package.json          # npm workspaces (authoritative)
├── package-lock.json     # npm lockfile (authoritative with npm ci)
├── pnpm-workspace.yaml   # pattern mirror; not the active CI installer
└── turbo.json            # task graph reference; not used by GitHub Actions
```

**Concrete source roots:** `shared/contracts`, `shared/engine`, `shared/indexdb`, `shared/ui-kit`, `content/geography`, `content/informatics`, `content/physics`, `content/math`, `content/playground`, `frontend/platform`, `backend/server`. These paths are actual package folders; diagrams above use abbreviated names.

The **eleven** current workspaces are `@svitlo/server`, `@svitlo/platform`, `@svitlo/geography`, `@svitlo/informatics`, `@svitlo/physics`, `@svitlo/math`, `@svitlo/playground`, `@svitlo/contracts`, `@svitlo/engine`, `@svitlo/indexdb`, `@svitlo/ui-kit`. Patterns in root `package.json` and lockfile: `backend/*`, `frontend/*`, `content/*`, `shared/*`. The server is deliberately not claimed to be executable yet.

## Dependency direction and ownership

```text
@svitlo/contracts ──────────┬──> @svitlo/engine ───> @svitlo/ui-kit
                            └──> @svitlo/indexdb

@svitlo/math ──────────────┐
@svitlo/playground ────────┼──> shared public exports only (no app → app)
                           │
@svitlo/platform ──────────┘   (currently no shared or textbook dependency)
@svitlo/server: manifest scaffold, no runtime
```

Arrows above summarize **allowed consumption**, not a promise that every app imports every shared package. Specifically:

| Package                       | Owns                                                                                        | Direct production dependencies / boundaries                                                            |
| ----------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Contracts                     | Common content/state/taxonomy types, stable IDs and language descriptors                    | No runtime dependencies on Engine, UI, Next.js or apps                                                 |
| Engine                        | Builders, generation, assessment methods, localization logic                                | Depends on Contracts; no React, Next, MUI or app imports                                               |
| IndexDB                       | `svitlo-progress` v1 persistence, Zod state validation, browser controllers                 | Depends on Contracts and Zod; production does not depend on Engine/React/Next                          |
| UI Kit                        | Framework-independent React UI, Lesson, Flag assets, LearningLayout and locale dictionaries | Depends on Engine and React/MUI peer dependencies; no Next.js/application imports in production source |
| Next.js Adapter               | Next.js App Router integration, lesson SSR composition and metadata                         | Depends on public Engine and UI Kit APIs; injects app-owned lesson loader and renderer                 |
| Informatics / Physics         | Standalone Next.js textbook scaffolds, subject content in separate reviews                  | No application-to-application imports                                                                  |
| Geography / Math / Playground | Route handlers, progress/locale providers, subject content or demo fixtures                 | Declared public shared exports only; **no app-to-app imports**                                         |
| Platform                      | Standalone public site and external textbook catalog links                                  | Next.js/React/MUI; does not embed Math or Playground                                                   |
| Server                        | Future backend                                                                              | Placeholder package only; do not claim build/API/test capabilities                                     |

Next.js routing, SSR metadata, and the published-JSON loading integration belong to `@svitlo/adapter/nextjs`, a technology-specific export of `@svitlo/adapter`. Its reusable `createLessonPage` takes application data/rendering bindings. `@svitlo/ui-kit` owns the framework-independent `Lesson` React UI, including lesson navigation and localized UI messages. The UI Kit cannot import any `next/*` modules; Next links/navigation are injected by consuming applications. Framework-specific links and locale switching remain injected by the host; the reusable Lesson owns its navigation state and passes its current pathname as a prop, while the UI Kit reads MUI color-scheme context directly. Neither Next.js pathname hooks nor MUI theme hooks need to be injected by every textbook. `createLessonLearningLayout` in UI Kit accepts injected host bindings; the UI Kit itself must not import Next.js. `NavbarPreferences` and its seven specialized dictionaries are owned by UI Kit; each app supplies locale/theme state via props and hooks.

The canonical native IndexedDB browser harness, commands and Playwright suite live in `shared/indexdb/testing` and use a temporary standalone browser test host. App-local `src/testing/setup.ts` remains Vitest setup; it is **not** IndexedDB duplication. The persisted database name/version/store structure was retained across migration.

## Canonical editorial Skills Taxonomy

For Mathematics, [`content/math/docs/skills/taxonomy.md`](../../../content/math/docs/skills/taxonomy.md) is the **single reviewed editorial source of truth** for the Domain → Group → Skill hierarchy. Its descriptions must explain the competencies in substance, not merely repeat their titles. The linked `content/math/src/data/skillsTaxonomy/` modules are the typed, machine-readable representation; curriculum documentation points to this canonical taxonomy rather than duplicating definitions in parallel Skill files or legacy inventory reports. The separate per-Skill definition template was retired as part of the taxonomy consolidation; do not restore it or the former `src/data/skills-inventory*.md`, `skills-taxonomy-review.md` or `UUID-MIGRATION.md` documents.

Informatics and Physics have independent Next.js application shells. Informatics Skills Taxonomy is reviewed separately in Draft PR #48; no implemented Informatics Skills, lessons or curricula are implied.

Geography has its own independently configured application shell and localized landing page. Its editorial Skills Taxonomy is a separate review proposal (PR #66); no Skill Data/UUIDs, curricula, lessons, full offline capability or learner results are implemented in Geography yet.

## Standalone textbook package contract

**Current implementation (before the proposed host/module migration):** Each `content/<subject>` owns its own `package.json`, `tsconfig.json`, Next.js config, `src/app` routes, `src/data` authored content, `public` media where required, package-owned `docs/` and tests. Reusable code is accessed through declared public `@svitlo/*` exports, never `shared/*/src`, another app's `src`, aliases resolved outside the package, or `../` paths crossing package roots. The `@/*` alias is local to that package.

Git-backed typed content and authoring IDs are **not** stored in runtime user databases. `@svitlo/contracts/content` defines structural contracts; Engine supplies operations, UI Kit presentation, IndexDB persistence, each textbook its curriculum. See [Git-first typed content](./git-first-typed-content.md), [system boundaries](./system-boundaries.md), [accessibility/localization](./internationalization-and-accessibility.md) and [offline roadmap](./offline-first-and-device-compatibility.md). Do not claim offline/PWA or backend account features are implemented merely because planned in Studio.

## Development and CI

From the monorepo root:

```bash
npm ci
npm run packages:check             # structure, package APIs and clone-baseline audit
npm run typecheck
npm test
npm run test:components
npm run test:components --workspace @svitlo/math
npm run lint
npm run build
npm run packages:artifacts:check   # validates built JS/declaration/asset targets
npm run test:e2e:db                # after Playwright browser install
npm run test:e2e:platform          # after building Platform
```

Individual app entrypoints: `npm run dev:informatics`, `npm run dev:physics`, `npm run dev:geography`, `npm run dev:math`, `npm run dev:platform`, `npm run dev --workspace @svitlo/playground`. The `Questions quality` workflow runs root checks and app E2E; the `Native IndexedDB browser controllers` workflow repeats real Chromium checks; `UI Kit Storybook` builds independently.

**Evidence limitations:** these checks inspect declared packages, compiled artifacts and running apps **inside the monorepo**. Independent `npm pack`/registry installation, clean-room source extraction, production deployment and real backend/offline services are separate, not-yet-proven tasks.

## Remaining duplication after Stage 7

A Stage 8 SHA comparison found **67 byte-identical same-relative-path files in Math and Playground `src/`** (including application-owned lesson rendering, lesson progress, routes, locales and tests). These are a _known migration debt_, not evidence that Stage 4–6 failed. The full exact-path baseline lives in `scripts/known-app-duplicates.json`; `check-final-architecture.mjs` rejects **new** clone paths but allows existing baseline paths until separately reviewed. Do not blindly promote app-owned providers or content into UI Kit. Deduplicating the still-shared lesson runtime requires a separate, scoped architectural migration with explicit public APIs and regression tests.

## Review rules

A package change must declare owner, consumers, public API changes, TypeScript/build order, regression evidence and standalone extraction implications. Each stage PR is stacked on the preceding stage branch until merged; retarget in order. The 2026-10-28/29 migration series was Stage 4 → Stage 5 → Stage 6 → Stage 7 → Stage 8 (the history document includes **older, independently numbered phases**).

**Source of truth precedence:** actual current code/manifest for implementation status, canonical Studio architecture for intended invariants, textbook-local docs for editorial content, then dated migration history for context.
