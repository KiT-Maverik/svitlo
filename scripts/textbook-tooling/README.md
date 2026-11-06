# Shared textbook build and publication

All content textbooks use the same Node.js build and validation pipeline.
The implementation lives here, **not** in UI Kit (rendering) or Engine
(content contracts and generators).

- build.mjs compiles metadata, optional Scenes/styles, TypeScript declarations
  and Engine-based JSON from real authored .data.ts files, then installs the
  standalone CLI in dist/publish.mjs and writes an ownership manifest.
- publish.mjs is copied into each textbook's dist and included in npm pack.
  It discovers package identity from the packed package.json and works without
  the monorepo, Engine, or source code at publication time.
- check-portability.mjs validates tarballs in an isolated ESM consumer.
- test-publish.mjs covers security, ownership, repeat runs, and host assets.

Each textbook preserves its npm scripts and svitlo-<textbook> CLI bin name.
Only Playground's Scene registry generator and Geography's specialized
localization test remain textbook-owned.

Changing the shared pipeline affects every textbook. Verify metadata-only,
Scene-enabled and Playground builds, Web/Mobile, and packed CLI portability.
