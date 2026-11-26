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

    SVITLO_TEXTBOOK=playground npm run app:start:dev --workspace @svitlo/desktop
    SVITLO_TEXTBOOK=playground npm run app:build --workspace @svitlo/desktop
    npm run code:check:types --workspace @svitlo/desktop
    npm run code:lint:check --workspace @svitlo/desktop
    npm run test --workspace @svitlo/desktop
    npm run test:integration --workspace @svitlo/desktop # after app:build
    npm run test:smoke --workspace @svitlo/desktop
    npm run app:pack --workspace @svitlo/desktop

Forge 8 Vite Plugin builds the Electron main bundle and React renderer using Vite 8 / Rolldown.
`app:build` calls `electron-forge package` once (including the Vite builds);
`app:pack:make:prepared` then runs `electron-forge make --from-package` on those
already-packaged artifacts without rebuilding Vite.

    npm run app:pack:make:prepared --workspace @svitlo/desktop  # already packaged: make artifacts
    npm run app:pack:win --workspace @svitlo/desktop    # Windows: Squirrel Setup.exe + .nupkg
    npm run app:pack:mac --workspace @svitlo/desktop    # macOS: zipped .app
    npm run app:pack:linux --workspace @svitlo/desktop  # Linux: deb

Run OS-specific commands on the corresponding host. Forge outputs are in `apps/desktop/out/` (ignored by Git). Linux also has a separate unpacked executable smoke test. A generated installer is **not** proof an installer was actually installed on a test machine.

**Distribution differences:** Windows Squirrel is per-user and not a drop-in replacement for NSIS; Linux deb requires a Debian-compatible package manager and is not a portable AppImage. macOS ZIP contains a standalone .app to drag into Applications; it is **not** a DMG or installer and must be manually extracted. It avoids the known high-severity, build-time `image-size` advisory chain carried by Forge's DMG maker (through `electron-installer-dmg -> appdmg -> image-size@0.7.4`). Unsigned/unnotarized builds are not ready for trusted public distribution. The workflow does not add credential-based signing, auto-updates, or a publisher. Squirrel lifecycle shortcuts are handled before the application opens its window.

The compiled bundles require no runtime Node.js packages; Forge packages only `.vite/` and `package.json` as ASAR. The dedicated artifact verifier checks maker outputs and size but does not execute an installer.

The `preapp:start:dev` and `preapp:build` hooks compile `@svitlo/playground` into its own `dist/` once,
then invoke the textbook's public `svitlo-playground publish` CLI to stage
already-built book JSON and media in `apps/desktop/public`. UI Kit locales and
flags remain independently host-staged. Vite bundles the compiled Scene registry,
lazy chunks and published CSS into `.vite/renderer/main_window`, while the Electron
main process is bundled into `.vite/build/main.cjs`. Forge manages the dev server
and hot restarts main when its bundle changes. Desktop never imports authored
`*.data.ts` at runtime or needs `apps/web`.

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
