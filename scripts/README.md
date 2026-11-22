# Repository tooling

Only monorepo-wide checks, CI coordination and shared textbook-host orchestration belong here. Every maintained executable lives under a named workflow directory with its tests and fixtures.

Engine entity generators belong in `shared/engine/scripts/`, UI Kit helpers in `shared/ui-kit/scripts/`, and host preparation in `apps/<app>/scripts/`. See `studio/rules/package-scripts.md` for the canonical ownership and directory policy.

## Checks after moving a script

Run `npm run repo:check:packages` and the relocated script's test suite, then run its owning workspace's typecheck/build and any dependent host/package tests. Inspect `.github/workflows/`, npm scripts, `bin` exports, and generated runtime/publish paths. An existing compiled output is not proof the new source path works from a clean checkout.

**Legacy materialization is not typed-authoring orchestration:** the active trusted Lesson and Question/Flashcard PR commands still consume YAML on SHA-pinned candidate PRs. #775 and #782–#784 describe the future typed successor but no deployed equivalent has been verified. Preserve actor authorization, immutable source checks, path confinement, no-clobber and explicit review approval. See [Studio source boundary](../studio/docs/architecture/yaml-config-scaffolding.md).

For author-authorized GitHub Actions source generation from a reviewed Draft Lesson PR, see [Lesson Stage 6 materialization](./ci/lessonMaterialization/README.md). This trusted CI orchestration never owns Question/Flashcard banks or generated media.
