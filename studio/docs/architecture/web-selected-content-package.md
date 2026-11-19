# Web Host — Explicit Content Package Selection

**Status:** Owner-approved architectural target. This document specifies intended behavior for a separate implementation agent; it does **not** assert that the current code already implements it.

## Decision and ownership

- `apps/web` is a universal Next.js content host, not a Playground application.
- `content/playground` is an **independent, non-contractual experimental environment**. Its directory structure, entities, fixtures, UUIDs, translations, Scenes and availability are free to change. Web must not rely on any of them.
- Content packages own their authored material, compiled Scene registry, static assets, published JSON and Publish CLI. The host owns generic routing, loading, rendering and the build-time integration contract.
- A specific deployment may select a content package **explicitly at build time**. This is not permission to make that package a permanent application dependency.

## Existing implementation to replace

At the time of the decision:
- `apps/web/package.json` declares `@svitlo/playground` as a runtime dependency.
- `apps/web/textbooks.json` only lists Playground.
- `apps/web/next.config.ts` and `apps/web/scripts/prepareTextbook/prepare-textbook.mjs` default `SVITLO_TEXTBOOK` to `playground`.
- `apps/web/src/app/**/*.e2e.spec.ts` assert Playground-specific UUIDs, color Skills, light-course content and locale strings; other Web test/build preparation also generates imports of the selected package.

These are observations of the current code, not architectural requirements.

## Required build contract

1. Remove the direct, permanent `@svitlo/playground` dependency from `@svitlo/web` and eliminate every Playground-specific fallback, allowlist, import, metadata assumption and fixture from **universal Web code and Web-owned tests**. Preserve Playground as a separately buildable/experimentable workspace.
2. Select the content package through an **explicit build parameter**, reusing `SVITLO_TEXTBOOK` where appropriate. Support a valid, installed/available package according to its **public contract**, not a fixed Playground entry in Web's source. Resolve and validate its package identity and source of compiled artifacts safely; maintain the repository's package-boundary rules. Do not permit unchecked path traversal or imports of private `data/` or `src/` authoring files.
3. Do not silently select Playground (or any other real content package) when the selection is absent or invalid. Fail early with an actionable diagnostic when a content-bound Web build requires a selection. A test runner may supply a **separately explicit** test selection; it must not become the default for production builds.
4. Keep the existing intended package interface: compiled public exports for metadata/Scenes/styles, package-owned Publish CLI, generated host bindings, and published JSON/assets consumed via shared Engine/UI Kit contracts. Do not couple Web to a particular package's internal structure or editor data. Preserve deterministic, clean switching of content resources and styles between selections (no stale asset/JSON bleed-through).
5. Treat the chosen package as an input to **one composed build/deployment**, not a mandatory permanent dependency of the reusable Web host. Implement resolution, manifests/lockfile/build setup and artifact verification consistently; a green monorepo install must not hide undeclared dependencies or an unpublishable standalone host.

## Web-owned test fixtures and integration coverage

- Introduce **small, controlled, Web-test-owned fixtures** exercising the stable content-publication and UI contracts. Fixtures must not import from, copy live structures out of, or assume stability of `content/playground`. Stable synthetic IDs/text may be asserted only when owned by the test fixture itself.
- Migrate all Web E2E and component/integration tests that assume Playground-specific courses, lessons, Scenes, Skills, texts or UUIDs. Check functionality instead: build selection, published base/locale data, Course/Lesson rendering, dynamic Scenes, Skills analytics, independent interface/content locales and LTR/RTL behavior, routing, accessibility-relevant controls and expected error paths where presently covered.
- Verify the host integration via the same production build path: select a fixture or other independently controlled contract-compliant content package, build/publish it, start Web, test visible behavior and published resources. Include a second distinct compliant selection or equivalent switching test to establish that selection is truly generic, including stale-content cleanup.
- Include negative tests for missing/unknown selection, malformed/unavailable package/public exports or Publish CLI, and invalid or incomplete published output. Explicit failures should be diagnostic rather than masked by a fallback.
- Keep experiments and structural assumptions exclusively in Playground-owned tests; a change in Playground's taxonomy or fixtures must **not** break Web E2E unless it actually breaks a stable public contract.

## CI and tooling requirements

- Update all affected Web lifecycle/preparation scripts, workspace/lockfile metadata, `next.config.ts`, build commands and tests, and affected FastGate/Production Quality/content-workflow callers to **explicitly** supply a deterministic test selection where needed. Preserve exhaustive root checks, independent production jobs, required `Production Quality / verify` aggregation, and fail-closed release validation.
- Confirm that build/test of `@svitlo/web` does **not** require `@svitlo/playground` source, resources or build artifacts. Preserve separate checks of Playground's own package when selected by broader repository CI; do not weaken those checks to make Web pass.
- Verify `npm ci`, package boundary checks, TypeScript, Web component tests, Web E2E, selected-package packaging/publication, relevant FastGate tests and production workflow coverage. Record **actual** executed results in the implementation PR; do not claim the full CI run passed from local-only checks.
- Update the outdated Playground-as-default description in `README.md`, `studio/docs/architecture/monorepo-and-textbook.md` and relevant package/CI documentation alongside implementation, distinguishing generic host configuration from experiments.
- This task is scoped to the **Web host and necessary shared CI tooling**. Do not implicitly refactor Mobile/Desktop or restructure Playground; raise a separate decision if their analogous defaults are to change.

## Acceptance

- [ ] No mandatory `@svitlo/playground` dependency, import or implicit selection in the Web application or its tests.
- [ ] Explicit selection integrates a valid content package via public APIs; invalid/absent selection fails predictably.
- [ ] Web tests use only Web-owned, deterministic contract fixtures; no assumptions about Playground data/order/UUID/Scenes.
- [ ] Build-time package switching and resource isolation are covered by meaningful integration tests.
- [ ] All relevant Web and CI invocations are adapted without dropping coverage or making the release aggregator permissive.
- [ ] Actual test/build results and updated architecture documentation accompany implementation.
