# Фізика textbook package

Follow the root `AGENTS.md` and the Studio architecture / GitHub rules.
This package follows `content/playground` for compiled ESM distribution and a prebuilt-resource Publish CLI.
Do not introduce Next.js routes, host-owned providers or runtime imports of `*.data.ts`.
Treat authored `data/` and `docs/` as immutable educational sources during structural migrations.
Only publish real authored lessons and Skills; metadata-only states are valid.
Do not create placeholder Scenes or duplicate Engine generators.
Run build, typecheck, publish and isolated tarball portability checks for changes to the package.
