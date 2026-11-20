# Engine scripts: mandatory agent handoff

These instructions apply to permanent scripts under `shared/engine/scripts/`. Read the repository root `AGENTS.md` and Studio rules/personas/skills first.

## Before changing ANY script

1. Open the target named workflow directory. Read its `README.md`, **the full leading JSDoc/fileoverview of the actual entrypoint**, relevant in-function JSDoc, and its adjacent `*.spec.mjs` / `*.test.*` tests **before proposing behavior changes**. Do not infer behavior from a directory or command name alone.
2. Inspect its npm-script callers, other generator/assembler consumers, and the owning Engine Config/Props schemas. Verify write destinations and overwrite safety against the implementation. Read any referenced Studio architecture/entity documents and the actual current Build API.
3. Distinguish **observed implementation**, **explicit intended contract**, **historical editorial workflows**, and **proposed changes**. When they differ, report the difference. Do not reinterpret a documented non-goal as missing functionality.
4. Keep each permanent script in a named directory with nearby tests. Never move build-only imports into `@svitlo/engine/runtime`. For temporary one-off transformations use the owning package's ignored `temp/` instead.

## Independent assessment resource publication

The new `generateAssessmentResources/` command compiles already-authored typed Question/Flashcard banks into separate generated resources and metadata manifests. It does not consume or generate `questions.yaml` or `flashcards.yaml`; those are approved editorial sources requiring separate conversion. The named `flashcardBuilder/` now supports a narrowly scoped create-only typed TS scaffold for reviewed, Engine-shaped source-language Flashcard YAML (Text/Markdown/Code and incomplete Audio/Image/Video/Subtitles placeholders). It is NOT an assessment publisher, media resolver, Question-reference resolver, translator or approval system. Every generated media draft contains a visible `TODO(asset)`, plus
a CI-visible `TODO (BLOCKER):`, and must be completed using verified existing physical files at the pinned Lesson SHA before TypeScript validation/publication. Its output is staged by textbook tooling, **not** inserted into Lesson Build Props. The Lesson Builder now consumes `lesson.yaml` exclusively. For explicitly incomplete assessment Sections it creates source-only `sectionDrafts` inside separate Questions/Flashcards YAML drafts, never independently authored assessment bank TypeScript; previously existing YAML is never overwritten. Both editorial bank YAML files are siblings at the Lesson UUID root. Stage 6 can create a **one-time empty bank YAML handoff** containing `sectionDrafts` from deferred Quiz/Flashcards Sections, but it does not author Questions or Flashcards, overwrite existing bank YAML, or publish banks. Independent bank flows complete those sources. Do not silently rewrite or migrate the user-edited #557 prototype.

## Three distinct kinds of generator

| Workflow                                       | Required first reads                                                         | Purpose                                                                                                                                   | Must NOT do                                                                                                                                                                           |
| ---------------------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lessonBuilder/`                               | `lessonBuilder.mjs` JSDoc; `README.md`; `lessonBuilder.spec.mjs`             | Turn a single technical `lesson.yaml` into nested `define*` **TypeScript draft** and ID-addressed production handoffs                     | Treat `content.yaml` as Config; validate the complete Lesson; invent missing fields/translations; generate Props; create a different Lesson; overwrite manual work                    |
| `courseBuilder/`                               | `courseBuilder.mjs` JSDoc; `README.md`; `courseBuilder.spec.mjs`             | Turn new `config.yaml` (or explicitly selected historical Course inputs) into `defineCourse` **TypeScript draft** and production handoffs | Create/overwrite any Lesson; resolve unknown Lessons by guessing; fabricate assets/translations; publish Props; accept legacy editorial override operations or resurrect removed APIs |
| `generateYamlSchemas/`                         | `generateYamlSchemas.mjs` JSDoc; `README.md`; `generateYamlSchemas.spec.mjs` | Derive editor-facing JSON Schema documents from Engine's composed Zod authoring schemas                                                   | Validate scaffolder inputs; publish Props; independently redefine entity Config fields; silently reduce opaque Configurator boundaries to `{}`                                        |
| `yamlScaffolding/`                             | `yamlScaffolding.mjs` JSDoc and callers' tests                               | Shared factory registry, source-language filtering and separate production handoff utilities                                              | Add validation/translation/implicit identity resolution                                                                                                                               |
| `generateLessonProps/`, `generateCourseProps/` | Their entrypoints, README/tests, Engine generators                           | Separate **publication** stage                                                                                                            | Conflate publication with draft scaffolding                                                                                                                                           |

Other named workflows have their own contracts. Inspect their entrypoints and tests; do not generalize the table above to all Engine generators.

## New single-file authoring boundary

- **Technical source:** Lesson `lesson.yaml` and Course `config.yaml` contain paired `config` and optional
  `production` at the root and every nested entity node. The **only ID**
  lives in `config.id` (Course Lesson references use `config.lessonId`).
  Factory dispatch is based on `config.type`. Do not leak production fields
  to `define*`, the stateless Build API, or published Props.
- Engine Config schemas are Zod-derived. Production schemas are manual and
  type-specific. A combined `*.scaffold.schema.json` is generated for editing,
  **not validated during scaffolding**.
- Use `production.documentLanguage` as source locale; YAML Config must
  preserve every Engine-required **non-media** field. Technical Lesson YAML must
  omit `fileName` and `posterFileName` entirely, including nested media.
  Lesson Builder inserts reserved Nil UUID filenames and TODO(asset) into
  generated TypeScript, plus one `TODO (BLOCKER):` above each media
  Configurator export. Its shared renderer covers Question Banks too; the
  separate Flashcard Builder emits equivalent blockers. The specialist later replaces these placeholders with
  actual stable UUID.extension filenames; Engine Config remains strict.
  Scene implementations, imports and untranslated locales remain separate
  downstream dependencies, not grounds to reject scaffolding.
- For **modular Lesson** drafts, emit `specification.md` beside the Scene or
  media `index.ts` source module, resolved by its authored UUID in the Config
  tree; keep the actual Scene implementation in its registered textbook Scene
  folder. Course/legacy workflows retain their ID-addressed handoffs until
  explicitly migrated. Emit a Lesson/Course `methodology.md` only when
  authored in production and safe to create. Never fabricate binary assets.
  Never invent source paths, create fake Scene code or overwrite edited specs.
- A Course `config.yaml` also owns its optional root `overrides` sparse Build
  patch. Only `build.overrides(patch, { languages })` is supported; do not bring
  back obsolete editorial override operations.

## Lesson ownership and file safety

- A standalone Lesson is an independently authored, reusable entity. A Course `type: lesson` child is a **reference via `lessonId`**, never an embedded `defineLesson` declaration.
- In Course YAML, `source.path` and `source.export` are **optional import coordinates**, not an existence flag, approval status or instruction to create a Lesson. Missing/unusable coordinates produce an explicit unresolved Lesson handoff. Creation of an absent Lesson is a separate Lesson Production workflow.
- Lesson/Course Builders write **TypeScript** only to their selected entity UUID directory, apart from approved source Markdown/specification handoffs and the Lesson Builder's one-time `questions.yaml`/`flashcards.yaml` deferred-Section handoffs; authorized `specification.md` handoffs are written to paths derived from nested `config.id`. **Creation is non-destructive:** if any `*.data.ts` already exists inside that entity's UUID directory, `generate`/`--write` must log `SKIP` and leave every file unchanged. For the modular Lesson Builder, a root `index.ts` is also an authored Lesson entrypoint that requires the same `SKIP`; pre-existing separately generated `questions/` or `flashcards/` directories must not block a Lesson-only draft; for a new Lesson, a partial Lesson-owned `sections/` tree without `index.ts` must trigger an explicit no-mixing diagnostic. Known canonical source directories skip before parsing YAML; staged file inputs derive the UUID from `config.id` before applying the exact same no-overwrite rule. No update of generated files is implicit. Separate `check`/`--check` remains read-only and strict about stale output. Do not treat editorial YAML files as existing entity data. A task about Course references or overrides **must not add writes to Lesson directories** without a separate, explicit architectural decision and safety tests.
- Course-owned overrides must not mutate standalone Lesson authoring files. **The only supported override mechanism is the stateless `build.overrides(patch, { languages })` API and its typed, slug-keyed patch shape.** Do not consume, generate, preserve as a supported alternate format, or auto-translate the former Studio operation-based `overrides.yaml` DSL; it is obsolete. Do not resurrect `createLessonOverrides` or emit `_OverrideEditorial`. Reject obsolete input explicitly rather than silently treating it as a valid patch.
- `production.documentLanguage` is source-language provenance for the technical YAML (required for Lessons, optional for Courses); it never enters `defineLesson` / `defineCourse`. Historic Course YAML may still carry root `documentLanguage`. `params.languages` expresses intended supported locales and must not be rewritten to match available translations.
- Draft outputs may be incomplete or fail TypeScript checks **by design**. A successful scaffolder run is neither editorial approval nor validation of an Engine Config.

## Intentionally failing TypeScript is the expected draft handoff

- **Unfinished media/Scene drafts may still fail TypeScript until their dependencies are resolved.** During Lesson materialization, unfinished Quiz/Flashcards Section Configurators are not emitted: their original source is preserved in bank YAML `sectionDrafts`, while the Lesson retains its exact `quizRequiredForCompletion` value and a merge-blocking root TODO. Do not modify this value to fabricate validity. Other generated source modules remain draft handoffs. Required Config structure includes reserved Nil UUID media placeholders with adjacent TODO(asset) and a real `TODO (BLOCKER):` per unresolved media Configurator, not assigned asset identities. Missing Scene implementations/imports, additional locales and unresolved references are work for the next AI agent, not scaffolder bugs.
- The scaffolder's job is to emit a deterministic, syntactically well-formed, recognizable `define*` source draft and preserve its unresolved work. **Assessment exception:** unfinished Quiz/Flashcards Sections are excluded from build-facing Lesson modules and preserved completely in temporary bank-owned `questions.yaml`/`flashcards.yaml` `sectionDrafts`, with real root `TODO (BLOCKER):` markers. The Lesson's authored `quizRequiredForCompletion` remains unchanged; only the independent bank flow may complete and integrate those Sections. **Review registers:** generated Lesson/Course `review.ts` files must parse and typecheck with named declarations and numeric `0` evidence placeholders. Lesson stage languages use the true source language for type shape only. The top-of-file `TODO (BLOCKER): Conduct review` and Ready/merge CI zero-evidence guard block unfinished reviews even if the TODO is removed prematurely. Verified PR/revision evidence remains a separate specialist responsibility. All generated modules must parse. **Successful TypeScript compilation, Engine Config validation, Props generation, and publication are explicitly NOT acceptance conditions for a draft scaffolder.** The scaffolder run itself should succeed for otherwise supported incomplete draft inputs; it must not execute or gate on TypeScript checks.
- **Do not "fix" draft TypeScript diagnostics inside a scaffolder** by inventing `src`, `fileLocation`, import targets, Scene components, other language strings, default educational content, or values that pretend a pending resource exists. Do not silence errors with `as any`, `@ts-ignore`, weakened Config types, or fictitious passing fixtures. For Lesson drafts, preserve the automatically inserted Nil UUID filenames and adjacent `TODO(asset)` markers until the specialist supplies real media; technical Lesson YAML omits these media fields entirely. Course Builder remains a separate legacy workflow until its own refactor. Make outstanding work clear to the finishing agent.
- Preserve the distinction between **expected type errors** and **generator defects**. YAML syntax/dispatch failures, incorrectly emitted TypeScript syntax, lost authored data, wrong file placement, unintended overwrites, and incorrect factory selection remain defects. If a completely authored input happens to produce valid TypeScript, do not inject artificial errors merely to make it fail; the deliberate failure applies to incomplete drafts, not every possible input.
- A later specialist agent completes media/Scene assets, translations and Config fields, then uses TypeScript diagnostics to verify and finish its own work. The separate publication pipeline runs only after those dependencies are actually resolved.

## Change verification

For modifications involving these workflows, update adjacent tests for their actual contract and check both positive and negative cases: nested factory selection, missing references, source-language filtering, deterministic output, immutable identity and no unintended writes. Separately run relevant schema-generation checks when changing `configurators/yaml` or the editor JSON Schema generator. Never claim a command passed unless it was executed.
