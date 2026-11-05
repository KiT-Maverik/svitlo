# Svitlo Desktop — Electron + React DOM

This host renders the existing Playground textbook with the shared Lesson UI,
learning layout, React Scenes and Engine response assembly. It does not run
Next.js or import textbook authoring data at runtime.

## Workspaces

- @svitlo/desktop: Electron bootstrap, React renderer, Vite bundle, content
  staging and distribution scripts.
- @svitlo/adapter-electron: read-only published JSON loading and a small
  Electron process adapter for secure local resources/window management.

The first release supports only SVITLO_TEXTBOOK=playground.

## Development and packaging

After npm ci at the monorepo root:

    SVITLO_TEXTBOOK=playground npm run dev --workspace @svitlo/desktop
    SVITLO_TEXTBOOK=playground npm run build --workspace @svitlo/desktop
    npm run typecheck --workspace @svitlo/desktop
    npm run lint --workspace @svitlo/desktop
    npm run test --workspace @svitlo/desktop
    npm run test:smoke --workspace @svitlo/desktop
    npm run package --workspace @svitlo/desktop

Use package:win, package:mac or package:linux on the corresponding build OS.
Only targets actually tested on that OS should be described as verified.

predev and prebuild run the canonical Engine lesson publisher and UI Kit locale
generator into apps/desktop/public. UI Kit flags and book-owned static assets
are staged there too. Vite copies those resources and builds the textbook Scene
chunks into dist-renderer. The main process is bundled to dist-main/main.cjs.
No script modifies content/playground or needs apps/web during runtime.

## Security and offline boundaries

The production app uses the standard, secure svitlo://app origin. Its protocol
can read only files in the packaged renderer tree. Client routes resolve to
index.html, allowing direct reload and language switching. All lesson JSON,
flags, locale data, JS chunks and other assets travel in the app package.

The renderer is sandboxed, context isolated, and has nodeIntegration disabled.
No preload bridge or IPC is needed for this first version. All external window
creation and navigation is denied, and permission requests are blocked.
Packaged HTML enforces a restrictive CSP; only development connects to a fixed
loopback Vite server.

The contents of local archives are inspectable; packaging is not DRM.
Learning progress remains session-only until a verified IndexedDB persistence
integration is implemented. Cloud sync, licensing and accounts are not included.

## Tests

The Node tests verify staged resource and Scene JS packaging after a build.
The Electron Playwright smoke test launches the real Electron process against
the local bundle, blocks HTTP requests and checks a lesson and reload.
A graphical session (or Xvfb on Linux) is needed for this smoke test.
