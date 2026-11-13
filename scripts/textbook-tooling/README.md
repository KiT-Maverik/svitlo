# Shared textbook build and publication

This directory owns **repository-wide orchestration** shared by all textbook packages. Engine-owned content generators live under `shared/engine/scripts/`, and UI Kit asset/localization tooling stays under `shared/ui-kit/scripts/`. Hosts prepare their own deployments.

- `buildTextbook/build.mjs` compiles textbook metadata, optional Scenes/styles, declarations, and calls Engine generators to stage authored JSON.
- `generateScenes/generate-scenes.mjs` builds each textbook's static, lazy Scene Registry; its regression tests are adjacent.
- `publishTextbook/publish.mjs` is copied into a package as `dist/publish.mjs`. It operates independently of the source monorepo, Engine and network at publish time. `publishTextbook/test-publish.mjs` covers ownership, security and reruns.
- `checkPortability/check-portability.mjs` validates packed textbook packages in an isolated ESM consumer.

Every script stays in its named folder with its supporting files. Textbook-owned Scenes and their generated registry remain in their textbook package; UI Kit flags remain UI Kit-owned.

Changing these scripts affects multiple textbooks. Verify a metadata-only and a Scene-enabled package, Web/Mobile/Desktop preparation, publication and packed tarball portability.
