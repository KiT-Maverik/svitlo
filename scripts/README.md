# Repository tooling

Only monorepo-wide checks, CI coordination and shared textbook-host orchestration belong here. Every maintained executable lives under a named workflow directory with its tests and fixtures.

Engine entity generators belong in `shared/engine/scripts/`, UI Kit helpers in `shared/ui-kit/scripts/`, and host preparation in `apps/<app>/scripts/`. See `studio/rules/package-scripts.md` for the canonical ownership and directory policy.

## Checks after moving a script

Run `npm run repo:check:packages` and the relocated script's test suite, then run its owning workspace's typecheck/build and any dependent host/package tests. Inspect `.github/workflows/`, npm scripts, `bin` exports, and generated runtime/publish paths. An existing compiled output is not proof the new source path works from a clean checkout.

**Typed materialization is a trusted, source-SHA-pinned operation.** Course Stage 5, Lesson Stage 6.1, and independent Question/Flashcard Bank Stage 5 commands use the reviewed TypeScript source and default-branch trusted code. Verify the trusted workflow on default `develop` before invoking it on a live PR; Draft CI success does not prove deployment. Preserve authorization, immutable source checks, path confinement and no-clobber. None of the five materializers parses editorial PR descriptions, review evidence, checklists or markers. Preserve independent editorial review responsibilities and actual technical ownership/path/transaction checks. See [typed-production boundary](../studio/docs/architecture/typed-production-materialization.md).

For author-authorized GitHub Actions source generation from a reviewed Draft Lesson PR, see [Lesson Stage 6 materialization](./ci/lessonMaterialization/README.md). This trusted CI orchestration never owns Question/Flashcard banks or generated media.

## Materialization PR commands

Use the exact entity-specific command as a top-level comment on its existing Draft PR: `/course materialize`, `/lesson materialize`, `/episode materialize`, `/questions materialize`, or `/flashcards materialize`. TypeScript is the sole authoring format; no format-selection parameter is needed. Verify deployment on the default branch and the resulting authorized Actions run and commit before reporting success. See the corresponding [Course](./ci/courseMaterialization/README.md), [Lesson](./ci/lessonMaterialization/README.md), [Episode](./ci/episodeMaterialization/README.md), and [bank](./ci/bankMaterialization/README.md) runbooks.
