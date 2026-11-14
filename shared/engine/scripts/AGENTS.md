# Engine scripts: mandatory agent handoff

These instructions apply to permanent scripts under `shared/engine/scripts/`. Read the repository root `AGENTS.md` and Studio rules/personas/skills first.

## Before changing ANY script

1. Open the target named workflow directory. Read its `README.md`, **the full leading JSDoc/fileoverview of the actual entrypoint**, relevant in-function JSDoc, and its adjacent `*.spec.mjs` / `*.test.*` tests **before proposing behavior changes**. Do not infer behavior from a directory or command name alone.
2. Inspect its npm-script callers, other generator/assembler consumers, and the owning Engine Config/Props schemas. Verify write destinations and overwrite safety against the implementation. Read any referenced Studio architecture/entity documents and the actual current Build API.
3. Distinguish **observed implementation**, **explicit intended contract**, **historical editorial workflows**, and **proposed changes**. When they differ, report the difference. Do not reinterpret a documented non-goal as missing functionality.
4. Keep each permanent script in a named directory with nearby tests. Never move build-only imports into `@svitlo/engine/runtime`. For temporary one-off transformations use the owning package's ignored `temp/` instead.

## Three distinct kinds of generator

| Workflow                                       | Required first reads                                                         | Purpose                                                                                                                                 | Must NOT do                                                                                                                                                                           |
| ---------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lessonBuilder/`                               | `lessonBuilder.mjs` JSDoc; `README.md`; `lessonBuilder.spec.mjs`             | Turn technical `lesson.config.yaml` into nested `define*` **TypeScript draft** in that standalone Lesson's UUID folder                  | Treat `content.yaml` as Config; validate the complete Lesson; invent missing fields/translations; generate Props; create a different Lesson; overwrite manual work                    |
| `courseBuilder/`                               | `courseBuilder.mjs` JSDoc; `README.md`; `courseBuilder.spec.mjs`             | Turn Config-shaped `course.yaml` or a supported partial `toc.yaml` into `defineCourse` **TypeScript draft** in the Course's UUID folder | Create/overwrite any Lesson; resolve unknown Lessons by guessing; fabricate assets/translations; publish Props; accept legacy editorial override operations or resurrect removed APIs |
| `generateYamlSchemas/`                         | `generateYamlSchemas.mjs` JSDoc; `README.md`; `generateYamlSchemas.spec.mjs` | Derive editor-facing JSON Schema documents from Engine's composed Zod authoring schemas                                                 | Validate scaffolder inputs; publish Props; independently redefine entity Config fields; silently reduce opaque Configurator boundaries to `{}`                                        |
| `yamlScaffolding/`                             | `yamlScaffolding.mjs` JSDoc and callers' tests                               | Shared factory-registry discovery and source-language filtering                                                                         | Add validation/translation/implicit identity resolution                                                                                                                               |
| `generateLessonProps/`, `generateCourseProps/` | Their entrypoints, README/tests, Engine generators                           | Separate **publication** stage                                                                                                          | Conflate publication with draft scaffolding                                                                                                                                           |

Other named workflows have their own contracts. Inspect their entrypoints and tests; do not generalize the table above to all Engine generators.

## New single-file authoring boundary

- **Technical source:** `config.yaml` contains paired `config` and optional
  `production` at the root and every nested entity node. The **only ID**
  lives in `config.id` (Course Lesson references use `config.lessonId`).
  Factory dispatch is based on `config.type`. Do not leak production fields
  to `define*`, the stateless Build API, or published Props.
- Engine Config schemas are Zod-derived. Production schemas are manual and
  type-specific. A combined `*.scaffold.schema.json` is generated for editing,
  **not validated during scaffolding**.
- Use `production.documentLanguage` as source locale; incomplete media fields
  or translations must remain incomplete in generated TypeScript. Missing
  `image.src`, Scene entrypoints and other dependencies are intentionally
  actionable downstream TypeScript errors, **not grounds to reject scaffolding**.
- Emit `specification.md` for Scenes in their ID-addressed textbook Scene folder
  and for media under `data/assets/<bucket>/<uuid>/`; emit a Lesson/Course
  `methodology.md` only when authored in production and safe to create.
  Never invent source paths, create fake Scene code or overwrite edited specs.
- A Course `config.yaml` also owns its optional root `overrides` sparse Build
  patch. Only `build.overrides(patch, { languages })` is supported; do not bring
  back obsolete editorial override operations.

## Lesson ownership and file safety

- A standalone Lesson is an independently authored, reusable entity. A Course `type: lesson` child is a **reference via `lessonId`**, never an embedded `defineLesson` declaration.
- In Course YAML, `source.path` and `source.export` are **optional import coordinates**, not an existence flag, approval status or instruction to create a Lesson. Missing/unusable coordinates produce an explicit unresolved Lesson handoff. Creation of an absent Lesson is a separate Lesson Production workflow.
- Lesson Builder writes only to the explicitly selected Lesson UUID directory; Course Builder writes only to the Course UUID directory. **Creation is non-destructive:** if any `*.data.ts` already exists inside that entity's UUID directory, `generate`/`--write` must log `SKIP` and leave every file unchanged. No update of generated files is implicit. Separate `check`/`--check` remains read-only and strict about stale output. Do not treat editorial YAML files as existing entity data. A task about Course references or overrides **must not add writes to Lesson directories** without a separate, explicit architectural decision and safety tests.
- Course-owned overrides must not mutate standalone Lesson authoring files. **The only supported override mechanism is the stateless `build.overrides(patch, { languages })` API and its typed, slug-keyed patch shape.** Do not consume, generate, preserve as a supported alternate format, or auto-translate the former Studio operation-based `overrides.yaml` DSL; it is obsolete. Do not resurrect `createLessonOverrides` or emit `_OverrideEditorial`. Reject obsolete input explicitly rather than silently treating it as a valid patch.
- `documentLanguage` is YAML source-language provenance (required for `lesson.config.yaml`, optional for Config-shaped Course YAML); it is removed before the corresponding `defineLesson` / `defineCourse`. `params.languages` expresses intended supported locales and must not be rewritten to match available translations.
- Draft outputs may be incomplete or fail TypeScript checks **by design**. A successful scaffolder run is neither editorial approval nor validation of an Engine Config.

## Intentionally failing TypeScript is the expected draft handoff

- **For an incomplete YAML draft, the resulting TypeScript is expected to fail TypeScript checking by design.** Missing mandatory Config properties, unavailable media paths, unfinished Scene implementations/imports, unfilled localization dictionaries, and unresolved references are **work for the next AI agent**, not scaffolder bugs.
- The scaffolder's job is to emit a deterministic, syntactically well-formed, recognizable `define*` source draft and preserve its unresolved work. **Successful TypeScript compilation, Engine Config validation, Props generation, and publication are explicitly NOT acceptance conditions for a draft scaffolder.** The scaffolder run itself should succeed for otherwise supported incomplete draft inputs; it must not execute or gate on TypeScript checks.
- **Do not "fix" draft TypeScript diagnostics inside a scaffolder** by inventing `src`, `fileLocation`, import targets, Scene components, other language strings, default educational content, or values that pretend a pending resource exists. Do not silence errors with `as any`, `@ts-ignore`, weakened Config types, or fictitious passing fixtures. Leave unavailable required fields incomplete and make outstanding work clear to the finishing agent.
- Preserve the distinction between **expected type errors** and **generator defects**. YAML syntax/dispatch failures, incorrectly emitted TypeScript syntax, lost authored data, wrong file placement, unintended overwrites, and incorrect factory selection remain defects. If a completely authored input happens to produce valid TypeScript, do not inject artificial errors merely to make it fail; the deliberate failure applies to incomplete drafts, not every possible input.
- A later specialist agent completes media/Scene assets, translations and Config fields, then uses TypeScript diagnostics to verify and finish its own work. The separate publication pipeline runs only after those dependencies are actually resolved.

## Change verification

For modifications involving these workflows, update adjacent tests for their actual contract and check both positive and negative cases: nested factory selection, missing references, source-language filtering, deterministic output, immutable identity and no unintended writes. Separately run relevant schema-generation checks when changing `configurators/yaml` or the editor JSON Schema generator. Never claim a command passed unless it was executed.
