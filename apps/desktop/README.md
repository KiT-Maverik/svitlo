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

Use `app:pack:win`, `app:pack:mac` or `app:pack:linux` on the corresponding build OS (via `npm run <script> --workspace @svitlo/desktop`).
Only targets actually tested on that OS should be described as verified.

predev and prebuild compile `@svitlo/playground` into its own `dist/` once,
then invoke the textbook's public `svitlo-playground publish` CLI to stage
already-built book JSON and media in `apps/desktop/public`. UI Kit locales and
flags remain independently host-staged. Vite bundles the compiled Scene registry,
lazy chunks and published CSS into `dist-renderer`, while the Electron main
process is bundled into `dist-main/main.cjs`. Desktop never imports authored
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

## Packaging toolchain migration

The packaging candidate in PR #882 is **electron-builder 27.0.0-alpha.15**.
This is a prerelease major version, not a stable release; do not consider it
production-approved until the pinned dependency tree, clean installation,
packaged offline tests and target installers are verified. It retains the
existing NSIS (Windows), DMG (macOS) and AppImage (Linux) targets without
adding an independent installer/maker pipeline. The Vite renderer, esbuild
main process and secure `svitlo://app` boundary are unchanged.

The v27 configuration nests `files` under `fileOptions` and `npmRebuild`
under `nativeModules`. ASAR packaging is enabled by default in v27, so the
obsolete `asar: true` key has been removed. The Linux packaged smoke test
expects unpacked results at `release/linux-unpacked/`. The
`app:pack:prepared` command builds **unpacked only** and does not verify
the AppImage, DMG or NSIS installers. For the installers use the appropriate
`app:pack:<platform>` workspace script on a runner of that platform and
inspect the result in `release/`. No signing, notarization, auto-update or
installer execution is implied by producing an unsigned installer.

The previous Builder 26 dependency chain included `@electron/asar@3`,
`glob@7`, `inflight@1`, `electron-winstaller -> temp -> rimraf@2` and
Builder's older `@electron/get -> global-agent -> boolean@3` dependencies.
Verify their **actual absence** from the new npm lockfile and the full npm
audit before accepting the migration; unrelated Storybook and ESLint
deprecations are outside PR #882. Node.js 22.12.0 or newer is required by
Builder 27. See https://www.electron.build/docs/migration/v26-to-v27/ .

The root `package.json` temporarily scopes `minimatch@11.0.9` to
`app-builder-lib` only. This targets GHSA-g3hv-75wg-m249 without changing
Storybook dependencies or globally forcing other `minimatch` consumers.
Electron Builder upstream has already merged the matching v27 source fix in
[PR #10539](https://github.com/electron-userland/electron-builder/pull/10539),
including FileMatcher tests, but `27.0.0-alpha.15` still locks the older
range. This scoped override is a **temporary candidate** pending clean npm
resolution, full audit and real Linux/Windows/macOS packaging verification;
remove it when a tested released upstream Builder version incorporates the
same fix. Do not change the `brace-expansion` dependency range independently:
`minimatch@11` requires its matching newer API.
