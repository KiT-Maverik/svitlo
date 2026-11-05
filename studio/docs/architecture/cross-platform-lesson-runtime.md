# Cross-Platform Lesson Runtime & Build-Time Textbook Composition

**Status:** **Partially implemented.** Playground now builds a framework-independent compiled textbook package consumed by the build-selected `apps/web` Next.js host and the initial `apps/mobile` Capacitor and `apps/desktop` Electron hosts. Other textbooks remain standalone applications. Cross-device offline verification, content licensing and the proposed session operations architecture remain future work. See [Monorepo & Independent Textbooks](./monorepo-and-textbook.md) for the repository map; do not assume proposed APIs already exist.


## Compiled textbook distribution contract (Playground)

Playground's source build now emits compiled ESM, TypeScript declarations, lazy Scene
chunks, CSS Modules, localized lesson and Skills Analytics JSON and book-owned assets
under `content/playground/dist/`. The package exports `@svitlo/playground`,
`@svitlo/playground/scenes`, `/demo-questions` and `/styles`; hosts use the
compiled npm exports instead of the textbook's source TypeScript paths.

After `npm run build --workspace @svitlo/playground`, an installed host invokes
`svitlo-playground publish --output <directory>` via npm. Publish reads the
package-local manifest and copies prebuilt `/data/pages/lessons/…` and
`/data/pages/skillAnalytics/…` plus optional `/textbooks/playground/…` assets.
It never runs generators. An ownership manifest in the destination prevents
stale-file deletion from affecting UI Kit, host, or other textbook resources.
UI Kit flags and global UI Kit translation JSON remain host-owned staging.

The source build still uses shared, repository-level generators and Engine APIs;
the *installed distribution and publisher* do not require the authoring source
tree, compiler aliases or Next.js. Web, Capacitor and Electron hosts now stage
book resources via the same CLI and import compiled Scenes/styles. Independent
React DOM tarball consumption is tested with esbuild; installed native behavior,
Web offline precaching and device accessibility remain host-specific release gates.

## Goal

Write the Lesson UI, its React Context providers, session operations, question widgets and interactive Scenes **once**, then compile them into multiple distribution targets. Prefer one monorepo and one source package per textbook, **not** a repository or independent React implementation per textbook/platform combination.

| Concern                   | Target responsibility                                                                              |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| Web host                  | Next.js: routes/domains, optional SSR/SSG, server-side assembly and entitlement gating, deployment |
| Mobile host               | One React + Capacitor source app with iOS and Android native projects; device APIs via adapters    |
| Desktop host              | React + Electron source app; desktop integrations via adapters                                     |
| Textbook module           | Authored content/configs, locale resources/assets, React DOM Scenes and generated Scene registry   |
| Shared Contracts/Engine   | Versioned content/state contracts, builders, validators and build-time JSON publishing             |
| Shared UI Kit / Lesson UI | Platform-neutral React DOM rendering, accessible UI, state views and operations integration        |
| Backend/content delivery  | Access control, licensed delivery and sync where applicable; not React rendering logic             |

A release can select **one textbook** or **a catalog of textbooks** at build time. Deployments may target distinct domains; a domain known only at request time does not configure a completed build. Choose textbook(s) with a deterministic build input or manifest, then map the resulting artifact to its domain(s).

## Dependency rules

- Hosts depend on shared public packages and textbook modules. **Textbook packages do not depend on a Web/Mobile/Desktop host or another textbook's application source.**
- Do not require `next/navigation`, `next/headers`, Next.js Image, Electron or Capacitor inside shared UI, Scenes, or Lesson Engine. Implement navigation, storage, content loading, authentication, native device access and sync behind typed host-provided adapters.
- UI Kit renders using **React DOM** in all three targets (Next.js browser, Capacitor WebView, Electron Chromium). This design intentionally **does not promise compatibility with React Native's native component renderer**.
- There is no requirement to split a textbook into separate `definition` and `runtime` repositories/packages. Distinguish **authoring/build inputs** from **runtime deliverables** within a single independently extractable textbook package.
- Keep platform-specific bootstrapping and framework tooling in the host. UI Kit and Scenes must not import app-local `@/*` aliases or app-owned context providers. Shared locale/session providers may be supplied explicitly where required.
- **Shared UI static assets:** UI Kit is the source of truth for flags and other reusable static UI assets. Each host stages its own deployable copy during app preparation, independently of the selected textbook. For Web, `npm run prepare:assets --workspace @svitlo/web` puts flags in `apps/web/public/flags/` (served as `/flags/*.svg`); `prepare-textbook.mjs` handles selected-book data and does not copy these files. Mobile and Desktop stage UI Kit assets into their own public directories.

## Build-time composition and offline behavior

1. Reviewed Git-authored `*.data.ts` is processed **at build time** into versioned, localized published JSON; runtime does not import authored data modules.
2. Each textbook owns its React Scene source and **generated, statically analyzable registry**. Hosts build/import the selected textbook registry; do not generate a second competing scene registration system.
3. `import('./known-scene')` in a static registry and `React.lazy` are allowed for bundler-managed splitting. They produce build-owned JS chunks, **not remote plugin/code delivery**. For offline readiness, package/cache all required chunks and assets and test a cold offline launch after download.
4. Do not copy Scene source into an app's `src/` merely to make it compile; consume workspace/package exports or generate only a build-selection entrypoint with static imports.
5. A static JavaScript registry **does not imply** that every lesson's HTML is prerendered. SSR/SSG, client rendering, and on-demand content access are separate choices; verify each build target.
6. Public static output cannot keep bundled content secret. Restricted lessons should not be placed in publicly accessible JSON/HTML/build artifacts merely because they are generated at build time. Decide entitlement-aware content delivery, encryption, license renewal and local storage independently; client-side keys and UI gates are not strong access controls.

## Server boundary and client Lesson application

For the Web host, a **thin Server Component or server route** may assemble and authorize a complete `LessonResponse`, then pass serializable props to a **client LessonPage**. This avoids a second lesson-config fetch on hydration without discarding SSR/SSG benefits. Next.js still serializes payloads over the server/client boundary; functions and host adapters must be constructed on the client side. Client Components can be prerendered on the server.

The same client LessonPage can receive a complete response from local storage or a host data service in Capacitor/Electron. It must not care whether configuration came from server HTML/RSC payload, protected API, or an offline package.

**Target responsibility model:**

- `LessonResponse`: immutable, complete, selected-locale instructional configuration (data, not functions/React elements).
- `LessonSessionStore`: per-lesson mutable state, independent from React/Next storage and with one consistent update path.
- Contexts: narrowly scoped reading surfaces (e.g. progress/section) and a stable `LessonOperations` command interface. Top/bottom bars may have dedicated **UI-only** state when needed; do not copy authoritative progress/section state into them.
- Dependency injection: client-created platform adapters provided via props/Context; an operations call updates the common store rather than directly mutating multiple provider states.
- Persistence/sync: asynchronous, host-supplied adapters (IndexedDB where appropriate, native storage where justified), independent from the immediate UI update. Restore saved session state **before** showing an inconsistent default view; handle errors, versioning and offline reconciliation.

React Context is a dependency-distribution mechanism, **not automatically a performant fine-grained store**. Avoid broad frequently-changing context values; use stable providers and selector-based subscriptions/store where update frequency warrants it.

## Rendering and performance

Server-assembled props remove an extra client API fetch for Lesson configuration, **not** network transfer, serialization or hydration cost. Use stable initial markup, preloaded selected-locale data, reserved media/Scene dimensions, correct SSR/client initial values and bounded asynchronous effects to prevent layout shifts. Authored JSON, Scene JS, font/media resources and session state have distinct readiness and caching concerns.

## Offline, PWA and licensing

- **Offline learning for content explicitly available/downloaded on a device remains a product objective.** Required locale packs, Scene chunks, media, UI translations and exercise feedback must be locally available before marking a package offline-ready.
- **PWA installation is optional**, not an architectural dependency or a fourth application. The Web host may add a service worker/cache later. Mobile/Desktop can use packaged code and platform-specific storage.
- Platform-specific key stores can deter copying of downloaded content but cannot guarantee secrecy once content is decrypted in an authorized client. A time-limited offline entitlement requires a stated renewal policy and cannot provide perfect tamper-proof expiry without contact with a trusted service. Product/license rules remain an open design area.

## Migration approach (planned, not implemented by this document)

1. Audit current Next.js-only imports/providers in UI Kit, Lesson UI and textbook Scenes; preserve the already-generated Scene loader where reusable.
2. Extract the client LessonPage, session/operations and adapter interfaces behind shared package public exports; retain a thin Next.js host with SSR/SSG where useful.
3. Define deterministic build selection for textbook packages, localized outputs and scene registries without runtime-authored-data imports.
4. Validate one textbook under Web and one ordinary React DOM bundler before creating the full Capacitor/Electron packaging pipeline. Add offline, hydration, locale/RTL, accessible navigation and persistent-session tests.
5. Plan migration of independently deployed textbooks to content+Scene packages only after parity checks; do not delete existing Next.js apps or replace their routes as an undocumented side effect.

**Observed example to preserve and generalize:** [Playground `sceneLoader.ts`](../../../content/playground/src/components/scenes/sceneLoader.ts) uses a static registry, `React.lazy` and a cache. Individual Scenes may still import Playground-specific providers; that is migration debt, not a reason to introduce a parallel loader.

**Related:** [System Boundaries](./system-boundaries.md), [Offline & Device Compatibility](./offline-first-and-device-compatibility.md), [Git-First Typed Content](./git-first-typed-content.md), [Internationalization & Inclusive Access](./internationalization-and-accessibility.md), [Monorepo](./monorepo-and-textbook.md), [UI Kit agent instructions](../../../shared/ui-kit/AGENTS.md).
