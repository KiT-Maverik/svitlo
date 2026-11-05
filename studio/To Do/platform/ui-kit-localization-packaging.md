# UI Kit Localization Packaging for Cross-Platform Textbook Builds

**Status:** Proposed — preferred approach identified, not implemented by this document.
**Area:** platform

## Goal

Make UI Kit component translations available to each selected textbook build and platform host without requiring access to a shared root domain at runtime. Keep the UI Kit as the single source of truth while supporting existing standalone Next.js textbook apps and the planned shared Web, Capacitor and Electron hosts.

## Context

UI Kit localization currently lives separately from the textbook applications. Each textbook must receive the UI strings it needs, and changes to shared translations must propagate consistently across builds. The existing UI Kit flag-sync prebuild/predev integration is a possible precedent, **not** proof that UI translations are already packaged this way.

## Preferred approach: package translations at build time

- Develop a shared, deterministic script or generator invoked before each target/textbook build (and as appropriate before local development). It should collect the authoritative UI Kit translations and publish/copy the required per-locale output into that host's build inputs/static assets.
- Keep translation sources centralized; do not maintain independent editable copies in each textbook. Generated copies are deployment artifacts, not new translation sources.
- Include the packaged strings in the target artifact's deployable/offline resources so the app does not depend on a root platform domain or shared localization endpoint after deployment.
- Validate all supported locales and required keys, including right-to-left languages. Missing translations must fail validation rather than silently fall back to English or another language.
- Make the operation repeatable and idempotent, remove stale generated outputs and check for missing/obsolete keys. Ensure changes to UI Kit translations are reflected in the next textbook build and detectable by CI.
- Ensure the runtime localization loader resolves textbook-local assets and that service-worker caching/offline resource versioning covers them. Avoid bundling the authoring source merely to access generated locale data.

## Alternative considered: shared runtime domain

Each textbook could fetch UI Kit translations from one central domain. This reduces duplicated deploy artifacts but introduces network/origin availability, cache coordination and offline-first complexity. **The build-time packaging approach is preferred** because translation payloads are relatively small and autonomous textbooks are an architectural priority.

## Open decisions and acceptance criteria

- Identify the canonical translation sources in the UI Kit and choose the published locale format, asset path and integration point with existing textbook locale loaders.
- Decide whether all supported UI locales or only those included in a textbook release are packaged, without violating required locale coverage.
- Specify how the script integrates with monorepo build order, existing `prebuild`/`predev` hooks and CI without introducing cycles or committing generated files unnecessarily.
- Verify that a deployed textbook experience can switch UI languages and render its shared components **without contacting the platform root domain**, including on a fresh offline launch after assets have been cached.
- Add checks that catch an added/removed UI Kit translation key or locale before publication, and verify the output is deterministic across repeated builds.

**Implementation note:** This is a backlog proposal, not authorization to implement the mechanism or a claim that an asset schema has already been selected.

**Architectural references:** [Cross-Platform Lesson Runtime](../../docs/architecture/cross-platform-lesson-runtime.md); [git-first-typed-content.md](../../docs/architecture/git-first-typed-content.md); [offline-first-and-device-compatibility.md](../../docs/architecture/offline-first-and-device-compatibility.md)
