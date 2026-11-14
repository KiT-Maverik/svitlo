# Engine scripts: mandatory agent handoff

These instructions apply to permanent scripts under `shared/engine/scripts/`. Read the repository root `AGENTS.md` and Studio rules/personas/skills first.

## Before changing ANY script

1. Open the target named workflow directory. Read its `README.md`, **the full leading JSDoc/fileoverview of the actual entrypoint**, relevant in-function JSDoc, and its adjacent `*.spec.mjs` / `*.test.*` tests **before proposing behavior changes**. Do not infer behavior from a directory or command name alone.
2. Inspect its npm-script callers, other generator/assembler consumers, and the owning Engine Config/Props schemas. Verify write destinations and overwrite safety against the implementation. Read any referenced Studio architecture/entity documents and the actual current Build API.
3. Distinguish **observed implementation**, **explicit intended contract**, **historical editorial workflows**, and **proposed changes**. When they differ, report the difference. Do not reinterpret a documented non-goal as missing functionality.
4. Keep each permanent script in a named directory with nearby tests. Never move build-only imports into `@svitlo/engine/runtime`. For temporary one-off transformations use the owning package's ignored `temp/` instead.

## Three distinct kinds of generator

| Workflow | Required first reads | Purpose | Must NOT do |
| --- | --- | --- | --- |
| `lessonBuilder/` | `lessonBuilder.mjs` JSDoc; `README.md`; `lessonBuilder.spec.mjs` | Turn technical `lesson.config.yaml` into nested `define*` **TypeScript draft** in that standalone Lesson's UUID folder | Treat `content.yaml` as Config; validate the complete Lesson; invent missing fields/translations; generate Props; create a different Lesson; overwrite manual work |
| `courseBuilder/` | `courseBuilder.mjs` JSDoc; `README.md`; `courseBuilder.spec.mjs` | Turn Config-shaped `course.yaml` or a supported partial `toc.yaml` into `defineCourse` **TypeScript draft** in the Course's UUID folder | Create/overwrite any Lesson; resolve unknown Lessons by guessing; fabricate assets/translations; publish Props; accept legacy editorial override operations or resurrect removed APIs |
| `generateYamlSchemas/` | `generateYamlSchemas.mjs` JSDoc; `README.md`; `generateYamlSchemas.spec.mjs` | Derive editor-facing JSON Schema documents from Engine's composed Zod authoring schemas | Validate scaffolder inputs; publish Props; independently redefine entity Config fields; silently reduce opaque Configurator boundaries to `{}` |
| `yamlScaffolding/` | `yamlScaffolding.mjs` JSDoc and callers' tests | Shared factory-registry discovery and source-language filtering | Add validation/translation/implicit identity resolution |
| `generateLessonProps/`, `generateCourseProps/` | Their entrypoints, README/tests, Engine generators | Separate **publication** stage | Conflate publication with draft scaffolding |

Other named workflows have their own contracts. Inspect their entrypoints and tests; do not generalize the table above to all Engine generators.

## Lesson ownership and file safety

- A standalone Lesson is an independently authored, reusable entity. A Course `type: lesson` child is a **reference via `lessonId`**, never an embedded `defineLesson` declaration.
- In Course YAML, `source.path` and `source.export` are **optional import coordinates**, not an existence flag, approval status or instruction to create a Lesson. Missing/unusable coordinates produce an explicit unresolved Lesson handoff. Creation of an absent Lesson is a separate Lesson Production workflow.
- Lesson Builder writes only to the explicitly selected Lesson UUID directory; Course Builder writes only to the Course UUID directory. **Creation is non-destructive:** if any `*.data.ts` already exists inside that entity's UUID directory, `generate`/`--write` must log `SKIP` and leave every file unchanged. No update of generated files is implicit. Separate `check`/`--check` remains read-only and strict about stale output. Do not treat editorial YAML files as existing entity data. A task about Course references or overrides **must not add writes to Lesson directories** without a separate, explicit architectural decision and safety tests.
- Course-owned overrides must not mutate standalone Lesson authoring files. **The only supported override mechanism is the stateless `build.overrides(patch, { languages })` API and its typed, slug-keyed patch shape.** Do not consume, generate, preserve as a supported alternate format, or auto-translate the former Studio operation-based `overrides.yaml` DSL; it is obsolete. Do not resurrect `createLessonOverrides` or emit `_OverrideEditorial`. Reject obsolete input explicitly rather than silently treating it as a valid patch.
- `documentLanguage` is YAML source-language provenance (required for `lesson.config.yaml`, optional for Config-shaped Course YAML); it is removed before the corresponding `defineLesson` / `defineCourse`. `params.languages` expresses intended supported locales and must not be rewritten to match available translations.
- Draft outputs may be incomplete or fail TypeScript checks **by design**. A successful scaffolder run is neither editorial approval nor validation of an Engine Config.

## Change verification

For modifications involving these workflows, update adjacent tests for their actual contract and check both positive and negative cases: nested factory selection, missing references, source-language filtering, deterministic output, immutable identity and no unintended writes. Separately run relevant schema-generation checks when changing `configurators/yaml` or the editor JSON Schema generator. Never claim a command passed unless it was executed.
