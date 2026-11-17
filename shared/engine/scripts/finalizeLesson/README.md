# Complete Lesson blueprint preflight and finalization

This is a **separate, opt-in Stage 6 handoff** for the [Create Lesson Flow](../../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md). It is not the Lesson Builder, schema generator, Props publisher, assessment-bank creator, editor or approval gate. The existing `lessonBuilder.mjs` remains a **create-only draft scaffolder** that does not validate complete YAML.

## Preconditions and commands

Run only when Content Review, Experience Review and Methodology Compliance have independently accepted the exact authored `lesson.yaml` SHA in the Lesson Draft PR. Use the **canonical Lesson UUID path**; the builder can accept staged input, but this finalizer intentionally requires a canonical source so it can safely remove exactly one file. First build or check current Engine-derived YAML schema in the owning package and confirm it is not stale.

Read-only structural preflight:

```sh
node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs preflight --source content/math/data/lessons/<last-hex>/<lesson-uuid>/lesson.yaml
```

When editorial acceptance is recorded, perform **preflight → create-only Lesson Builder → read-only Builder check → complete generated inventory/source verification → persistent production handoff → delete unchanged YAML**:

```sh
node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs finalize --source content/math/data/lessons/<last-hex>/<lesson-uuid>/lesson.yaml
```

The preflight validates strict YAML 1.2 with unique keys, full `shared/engine/yaml-schemas/lesson.scaffold.schema.json` (derived from Engine Zod Config plus manual production schema) using the existing Ajv 2020 dependency, canonical Lesson UUID/slug, ordered enabled keys, unique nested Configurator IDs, complete Methodology, and source `production.documentLanguage` in planned `config.params.languages`. It refuses real non-source locale values which the source-only Builder would otherwise silently prune, **and empty locale dictionaries that would silently emit no authored source-language content**. It **does not** run on incomplete editorial drafts in Stages 1–5, judge scientific/pedagogical quality, or alter the Zod Config schema.

The finalizer preserves all nested `production` fields in deterministic **`production-handoff.json`** (no Config duplication or workflow statuses), while the existing Builder creates `methodology.md`, TypeScript modules, source Markdown/Code and Scene/media `specification.md`. The handoff file is permanent source-production guidance, not a new canonical Lesson blueprint or a review acceptance token. Use that guidance to complete real Scene/media/accessibility work. Generated TypeScript may legitimately be incomplete or fail TypeScript until assets, imports, locales and real Questions/Flashcards are finished.

**Safety:** existing `index.ts` always blocks finalization, even if the Builder would SKIP. Existing divergent specs/handoffs block without overwrite. A skipped, partial, stale or inconsistent Builder check, missing output/methodology, noncanonical/symlink path, source changed during generation or incomplete transfer **never deletes `lesson.yaml`**. Partial generated files can remain after a failure; compare/reconcile manually rather than retrying blindly or overwriting authored source. The only removed file on success is the exact `lesson.yaml`; `questions.yaml`/`flashcards.yaml` and their separate approval/materialization processes are untouched.

## Tests

```sh
node --test shared/engine/scripts/finalizeLesson/finalizeLesson.spec.mjs
node --test shared/engine/scripts/lessonBuilder/lessonBuilder.spec.mjs
npm run content:check:yaml-schemas --workspace @svitlo/engine
```

The schema check requires the actual Engine build output; run `npm run package:build --workspace @svitlo/engine` first when necessary. Test coverage includes representative full YAML/real Builder source handoff, source locale safety, distinct production fields, duplicate UUID/order validation, create-only skip, missing/partial/divergent outputs, changed YAML and independent assessment sidecars. This tool deliberately does not verify the final runtime publisher, Lesson Props digest, independent reviewer acceptance or production media availability.
