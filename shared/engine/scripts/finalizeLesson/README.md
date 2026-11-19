# Complete Lesson blueprint preflight and finalization

This is a **separate, opt-in Stage 6 handoff** for the [Create Lesson Flow](../../../../studio/skills/lesson-workflow/create-lesson-flow.skill.md). It is not the Lesson Builder, schema generator, Props publisher, assessment-bank creator, editor or approval gate. The existing `lessonBuilder.mjs` remains a **create-only draft scaffolder** that does not validate complete YAML.

## Explicit bank-pending source-draft handoff

The Methodologist records independent Quiz and Flashcards Section decisions in production.methodology using exactly one fenced "~~~yaml lesson-assessment-sections" block. Its assessmentSections map contains quiz and flashcards, each with decision: required | notRequired, a nonempty rationale, and a keyed intents map (empty when notRequired). Each required intent has purpose, placement and bankDependency; a Quiz intent also has actual Skill UUIDs in skills and actual AssessmentMethodKeys in assessmentMethods. Each matching Section carries two separate production.productionNotes lines: "Assessment intent: <key>" and "Bank integration: pending" (later "connected" after evidence). Missing/duplicate/mismatched Sections are rejected. No new Config/Props field or standalone plan file is introduced.

For already independently reviewed Lesson YAML whose required Section's bank selections or Quiz-only params are intentionally pending, run:

    node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs preflight-draft --source content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml
    node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs handoff --source content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml

The draft-only preflight uses the same Engine-derived schema, but relaxes the required assessment-specific params only at this isolated source-draft boundary. Every other existing structural, UUID, collection/order, production and source-locale check remains enforced. It requires an explicit two-type inventory and an actual pending Section; only explicitly pending Sections may have incomplete bank-dependent params. The "handoff" command invokes the **existing** creation-only Lesson Builder and its read-only fidelity check, verifies every generated file and production handoff, and **preserves unchanged lesson.yaml** as well as its independent questions.yaml/flashcards.yaml sidecars. It does not imply Stage 6 completion, a passing TypeScript check, a real Question/Flashcard Bank or permission to publish.

After bank integration, complete the actual typed Section source, verify reviewed Question/Flashcard UUIDs, locale availability, approved cross-Lesson references, resource ownership and published metadata, and remove each local TODO (BLOCKER) only when evidence permits. The standard "preflight" remains strictly schema-validated and rejects pending Section markers. Because the generated entrypoint already exists, the original create-only "finalize" command **must not** be rerun against an edited draft: it will reject overwrite and retain YAML. Retain the source for manual SHA-pinned reconciliation; never delete YAML merely to bypass the guard. Production completion is verified through strict Engine Config/Props plus external bank checks and actual package publication, not by this draft handoff.

## Source-preserving strict finalize and remote PR command

For a completely specified Lesson being scaffolded for the **first time**, use the existing strict validation and full source-fidelity checks but retain the unchanged YAML:

~~~sh
node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs preflight --source content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml
node shared/engine/scripts/finalizeLesson/finalizeLesson.mjs finalize --source content/<book>/data/lessons/<bucket>/<uuid>/lesson.yaml --preserve-config
~~~

The `--preserve-config` flag is valid **only with `finalize`** and does not alter `preflight`, `preflight-draft` or `handoff`. The bank-pending `handoff` always preserves YAML and rejects this redundant flag. Without the flag, strict first-time `finalize` keeps its existing safe-delete behavior. Both modes reject an existing edited `index.ts` rather than overwriting. For an interrupted/partial handoff, retain YAML, inspect SHA-pinned source and outputs, and reconcile manually; never rerun create-only generation over existing authored TS. After a successful source-preserving handoff, independent bank integration and strict Props/publication checks do not authorize automatically deleting YAML.

When the [Lesson Stage 6 PR-command workflow](../../../../scripts/ci/lessonMaterialization/README.md) has been deployed to `main`, prefer exact `/lesson materialize` on the existing Draft Lesson PR. It invokes trusted preflight and source-preserving generation against pinned PR data and commits verified new Lesson files. The optional `/lesson finalize` is disabled until a safe post-materialization existing-source verification/retirement mechanism exists. Neither command completes Stage 6 by itself.

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
