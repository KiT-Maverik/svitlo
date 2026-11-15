# Lesson source layout: Stage 1 contract and reference fixture

**Status:** Stage 1 target contract; Stages 2–3 modular source and Markdown/Code plus Stage 4 colocated Scene/media handoffs and URL staging are implemented on dependent Draft PR branches. Review and full end-to-end acceptance remain planned.  
**Scope:** YAML-to-TypeScript **Lesson draft scaffolder** and downstream source/asset handoffs, using [PR #557](https://github.com/KiT-Maverik/svitlo/pull/557) as experimental evidence.  
**Out of scope:** changing the generator, implementing media/Scenes, publishing Lesson Props, changing existing Lesson Configs, migrating all mathematics lessons, translating content, or granting review approvals.

## Reproducible baseline and edited prototype

Canonical source:
`content/math/data/lessons/0/92177be3-97a1-5ca4-b21a-07f0dac27f50/config.yaml`
(`equalsMeansSameValue`).

The [machine-readable snapshot inventory](../../../shared/engine/scripts/lessonBuilder/fixtures/pr557-lesson-layout.snapshots.json) pins **Git commit SHAs and blob SHAs** for every added file in two historical snapshots:

| Snapshot                       | Immutable commit                                                                                                                    | Added files | Meaning                                                                                                     |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ----------: | ----------------------------------------------------------------------------------------------------------- |
| Original Lesson Builder output | [`a3735dff24be4445c36fedd38997165732c67bfd`](https://github.com/KiT-Maverik/svitlo/commit/a3735dff24be4445c36fedd38997165732c67bfd) |          14 | One `equalsMeansSameValue.data.ts`, methodology and UUID-addressed `specification.md` handoffs              |
| User-edited prototype          | [`9e500e1f521e6eebf86f0e556f93f5f673e212f3`](https://github.com/KiT-Maverik/svitlo/commit/9e500e1f521e6eebf86f0e556f93f5f673e212f3) |          51 | `index.ts`, `constants.ts`, `review.ts`, modular Sections/blocks, localized Markdown and illustrative media |

These are **historical inventories, not runnable generated trees**: `config.yaml` existed before the first commit; the prototype deliberately contains TODO expressions, potentially invalid imports, illustrative assets and the temporary `demonstrationalSection`. The **later structure in this document**, not the prototype's literal paths, is the intended generator contract. In particular, the prototype still has type groupings (`texts/`, `scenes/`, `audio/`, etc.) that the user subsequently rejected. Do not copy them into the final generated layout. Do not mistake the 51-file snapshot for an exact future-output count.

## Source-of-truth and scope

1. **Input:** one technical `lesson.yaml` with paired `config` and optional `production` at every Configurator node. `config.id` is the permanent ID; `production.documentLanguage` is source-language provenance. This is the current Lesson-only contract; Course `config.yaml` is unchanged.
2. **Mechanical output:** reproducible, statically typed `define*` **source drafts**, source-relative content files and explicit specialist handoffs. The scaffolder must not infer educational semantics, approve content, translate, fabricate assets or call `build.props()`.
3. **Publication:** a separate Engine Props generator validates completed configurators, and textbook tooling stages JSON and media. Engine `runtime` must never import authoring source, Node file readers or `@svitlo/engine/build`.
4. **Safety:** existing authored work is immutable by default; maintain creation-only / `SKIP` behavior until a separately designed overwrite/migration contract replaces it.

This contract is a target for future follow-up PRs. Current behavior is described by [Lesson Builder](../../../shared/engine/scripts/lessonBuilder/README.md), [Lesson YAML architecture](./lesson-yaml-builder.md), and the actual code, **not** by this target-layout document.

## Desired source tree (illustrative, not a literal generated fixture)

```text
content/<book>/data/lessons/<last-uuid-digit>/<lesson-uuid>/
  lesson.yaml                   # Lesson-only authored technical source
  questions.yaml                # independent editorial bank; created only when approved
  flashcards.yaml               # independent editorial bank; created only when approved
  index.ts                      # exports the Lesson configurator
  constants.ts                  # supported languages tuple and derived types
  review.ts                     # intentionally unfinished typed Review register; no exports
  methodology.md                # if supplied by production
  sections/
    index.ts                    # exports section: { items, order }
    <sectionSlug>/
      index.ts                  # section definition
      <blockSlug>/
        index.ts                # ContentBlock/Checkpoint/Carousel definition
        specification.md        # only for Scene or pending media, when required
        text.md                 # invariant Markdown (alternative to locale/)
        code.<extension>        # Code source (when this block is Code)
        <blockSlug>.<extension>  # invariant media file, when produced
        locale/
          <language>.md         # localized Markdown (alternative to text.md)
          <language>.<extension> # localized media, when produced
        <nestedSlug>/
          index.ts              # recursively nested entities
```

The examples in one directory describe **alternative entity-specific cases**, not a requirement to emit all files for every block. `<blockSlug>` directories replace `<type>/<slug>` grouping. Direct siblings in the same collection have distinct, safe camelCase slugs. `sections/index.ts` assembles the ordered section collection, and the Lesson imports it with `section` property shorthand. At further nesting boundaries, emit appropriately named local `index.ts`/barrel exports and use shorthand items when it preserves type safety and clarity.

**Names vs identity:** the generator preserves the source YAML's permanent UUIDs and authored slug values. Semantic renaming (`text1` → `sameValueExplanation`) is **upstream editorial work** on the YAML. A deterministic builder must not guess a new name, change an ID, or silently renumber keys. Normalize folder paths according to source slugs and explicit hierarchy.

**TypeScript style:** use bare valid identifier property keys (`id`, `slug`, `locale`, `en`, `items`, `order`) instead of `JSON.stringify(key)` on every property. Quote only keys requiring string-literal syntax; quoted _values_ are unaffected. Use ordered `{ items, order }` collections where the sequence is meaningful (Sections, ContentBlocks within a Flashcard side). Question and Flashcard bank collections are not Lesson Config fields; their future source generation is independent. Do not reintroduce authored positional arrays. Emit the actual `define*` generic arguments: literal slug, child-map type, and derived Lesson languages type according to each current signature.

**Languages:** generate a readonly `LanguageCode`-checked tuple in `constants.ts`, with a derived type shared by nested configurators. Keep `params.languages` exactly as authored in YAML; no fabricated locale values. The example requires `en`, `pl`, `uk`, `qm`, while the initial source-locale-only draft is intentionally incomplete.

**Skills:** resolve YAML Skill UUIDs against existing textbook Skill definitions and import their exported symbols at build time, e.g. `skills: [equalityMeaning_Skill_Data.id]`; never guess a Skill or replace an unresolved UUID with an invented reference. Immutable IDs remain in YAML and published JSON. This must be verified against actual export paths and compiled TypeScript in the later generator PR.

## Separate Question and Flashcard source generation (future work)

Approved editorial sources `questions.yaml` and `flashcards.yaml` are flat sibling
files beside `lesson.yaml`, not inside `questions/` or `flashcards/` directories.
The Lesson Builder neither creates those folders nor generates bank TypeScript.
A later independent bank generator may create slug-organized `questions/` and
`flashcards/` module trees without changing the Lesson root `index.ts`.

## File-backed source content and media

| Kind                     | Invariant source            | Localized source                                       | Specialist specification                                      |
| ------------------------ | --------------------------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| Text                     | ordinary `defineText` data  | field-level `locale` config                            | **No** auto-generated specification for finished text         |
| Markdown                 | `<slug>/text.md`            | `<slug>/locale/<language>.md`                          | **No** specification instead of real learner-facing Markdown  |
| Code                     | `<slug>/code.<extension>`   | only if Code contract explicitly supports localization | **No** substitute for real code                               |
| Scene                    | authored configurator       | Scene's actual typed localized data                    | `<slug>/specification.md` next to Scene definition, if needed |
| Audio/Image/Video        | `<slug>/<slug>.<extension>` | `<slug>/locale/<language>.<extension>`                 | `<slug>/specification.md` while pending                       |
| Subtitles                | `<slug>/<slug>.<extension>` | `<slug>/locale/<language>.<extension>`                 | if production needs a separate caption authoring handoff      |
| External media (YouTube) | explicit authored URL       | per current Config schema                              | no local file resolution                                      |

- **Invariant is not fallback:** never generate a fake `default`/`fallback` language. A string-valued Markdown source maps to `text.md`; a language map maps to `locale/<language>.md`.
- Source files should be read by a **deterministic build-time, module-local mechanism**. Generated callers should not manually repeat paths; however, a plain imported function cannot reliably discover its caller's source folder or YAML property key on its own. Choose a source-bound wrapper, generated `import.meta.url` binding or explicit compilation transform in the implementation PR. Do not use stack-trace inspection or browser runtime `fs`.
- `code.<extension>` uses an explicit/supported source-language and extension convention; `codeAsText` remains the final Engine Config value after resolving the authored file.
- No fictional binary assets, placeholder URL values, or manually embedded filesystem paths in runtime Props. The authoring contract and publication contract are **distinct**: existing Engine `src`/`fileLocation` requirements can only be removed from generated _authoring source_ once a separate resolver reliably populates valid public resource paths for publication.
- Multiple media roles (main video, poster, captions, carousel images) require unambiguous naming and collision checks. Exact supported extensions, multi-role rules, and locale completeness checks remain open until the relevant Engine/UI Kit contracts are audited.
- User-facing Markdown must be _finished content before technical scaffolding_. A technical builder cannot turn a Scene-like specification for Markdown into good instructional copy. Fix the upstream Lesson Production handoff instead.
- Media and Scene specifications are _authoring instructions_, not runtime copy. Their new co-located addresses conflict with current UUID-addressed Scene/asset handoff rules: the responsible workflows, lazy Scene registry expectations and eventual packaged media paths must be updated together. Do not silently discard UUID identity or unrelated real assets.

## Stage 3 implemented source handoff (dependent Draft branch)

The Lesson scaffolder extracts actual authored `config.locale.value` Markdown strings into `text.md` (invariant) or source-language `locale/<language>.md` (localized) and generates build-time `defineMarkdown` file-mode configuration. It does **not** generate other planned languages, infer learner copy from `production`, or change Review/media publication.

Authored Code `params.codeAsText` is materialized exactly to `code.<extension>`, with a supported extension derived from `params.language`; generated TypeScript uses `readCodeSource(import.meta.url, extension)` from the Engine Build API. Unknown language/extension mappings are explicit errors, not guesses. These file readers resolve their defining module via `import.meta.url`; published Config/Props contain only the bytes read.

The **Stage 3 contract changes the historical Markdown file-mode folder from `locales/` to `locale/`**. Existing authored definitions with that older path must be migrated explicitly rather than silently inferred. The creation-only `SKIP` safety boundary remains. Markdown/Code source files are ordinary UTF-8 files without a generated TypeScript checksum header; `check` compares exact source bytes against YAML and reports manual divergence.

## Composite structures

**Checkpoint:** organize each nested Item, Question, Answer and allowed ContentBlock recursively in its parent's slug directory. Collection order stays explicit. Avoid central folders of blocks by type.

**Carousel:** the prototype still uses `defineCarouselSlide`. Replacing Slides with arbitrary `defineImage` or Scene children is **not approved as already supported**: current Engine Carousel Config/Props and UI Kit renderer must be redesigned and tested before that change. Treat polymorphic slides as an explicit follow-up decision, not Stage 1 implementation.

**Follow-up in PR #575:** the preceding paragraph describes the historical Stage 1 baseline. The approved [Carousel Image/Scene design](./carousel-image-scene-slides.md) supersedes that baseline: `defineCarouselSlide` is retired in the Draft implementation, children now use typed Image/Scene configurators, and the builder places each child directly under its Carousel slug. This is **not** evidence of production readiness until the schema, build, CI and accessibility gates in #575 pass.

**Quest:** Stage/Task are special nested configurators with their own required structure, not generic `{ items, order }` collections. Source layout should support their actual typed hierarchy without inventing a second order field. Quest runtime support remains separate.

## Review metadata and assembled-Props revision identity

**Stage 6 implementation:** the Lesson YAML scaffolder creates a non-exported `review.ts` beside `index.ts`, importing the strict Engine `LessonReview` type. Its variable identifier and required PR/language expressions are intentionally **missing**, so the generated Draft fails TypeScript parsing until actual completed Lesson Props and review evidence exist. Never fabricate a temporary successful identifier, placeholder PR numbers or approvals.

The general `Review` type requires `ai.locales` (one integrated AI localization-review PR) and `human.acceptance` (owner-authorized PR) plus a required `human.locales` map (individual optional language→human review PRs). `human.scientific` is optional with `{ pr: number; language: LanguageCode }`. `LessonReview` adds mandatory direct `ai.<camelCaseStage>` properties using the same canonical identifiers as the Lesson Production Issue tracker. Every stage entry stores `{ pr: number; language: LanguageCode }`. These are **Lesson Production**, never Quest, stages. The staged review file initially provides all required property keys with missing mandatory values, but does not write the optional scientific record.

When a finished Lesson can actually produce `lesson.build.props({ languages })` for **all supported languages**, use the Build-only Engine function `hashLessonReviewProps` on that complete assembled structure. Canonically serialize JSON keys while retaining array order, compute SHA-256 and take the first 20 lowercase hex digits. This is a digest of **assembled Lesson Props**, **not** the intermediary YAML Config nor its production specifications. It includes all ordered nested Lesson content and localized Props. Bind that revision to the local `review.ts` variable, using **only** the digest as its identifier; prepend `_` if the first character is a digit, as TypeScript requires. Use `lessonReviewIdentifier` for the syntax-safe representation. The record itself is not part of Props. No separate review digest for every child is needed.

Changes to external Scene implementation files or actual binary media may not change the Lesson Props digest if their references stay identical. Track their implementation and content independently; do not claim this digest covers them. Do not transfer review PR evidence from an older digest automatically. PR references indicate review evidence, **not** automatic editorial approval. Preserve detailed findings and exact pre-Props source revisions in the review PR and Production Issue until the coordinator verifies them against the assembled revision. For a decision narrowly affecting one reviewed Lesson/locale, include a short TypeScript comment immediately above its PR-valued entry. General policy belongs in Studio guidance. Do not create duplicate `experience-review.md`, `methodology-review.md` or per-locale review logs.

## Existing implementation compatibility: mandatory follow-up checks

| Current component                                                   | Observed behavior                                                                         | Stage 2+ obligation                                                                                              |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `shared/engine/scripts/lessonBuilder/lessonBuilder.mjs`             | One `<slug>.data.ts` and UUID-addressed specialist handoffs; no validation/Props          | Generate modular source without changing the draft-only and creation-only semantics                              |
| `shared/engine/scripts/generateLessonProps/generateLessonProps.mjs` | Finds one `*.data.ts`, falling back to `index.ts`; requires a real `build.props()` Lesson | Ensure new root entrypoint can be discovered and loaded; fail on ambiguity; do not publish incomplete drafts     |
| `scripts/textbook-tooling/buildTextbook/build.mjs`                  | `authored('data/lessons')` recognizes only `*.data.ts`                                    | Update detection for canonical `index.ts` Lesson entrypoints so compiled text books do not silently omit Lessons |
| `shared/engine/scripts/yamlScaffolding/productionScaffolding.mjs`   | Emits Scene and media handoffs to UUID-addressed folders                                  | Change output ownership and non-destructive write/skip/check behavior together with layout                       |
| Current Engine media schemas and textbook static packaging          | Expects explicit resolved file paths and packaged static resources                        | Preserve Props and runtime URLs until the new build-time resolver and manifest pipeline are verified             |
| Current Carousel and Quest schemas                                  | Specialized child kinds/shape                                                             | Do not force generic block recursion where schemas intentionally restrict children                               |

**Non-goals and safeguards:** no mass rewriting of other Math lessons in Stage 1; no schema loosenings or fake success from TypeScript suppression; no execution of generated incomplete samples as trusted code; no single-stage migration of Scenes, asset packaging, review types and production workflow. Update README/JSDoc/tests and affected architecture references in the _implementing_ PR, not by pretending they already implement this document.

## Stage 1 exit criteria and follow-up test contract

1. The two snapshot inventories are immutable and traceable to exact Git blobs and commits; all 14 original and 51 experimental additions are represented.
2. The normalized folder tree and immutable UUID/slug rules explicitly distinguish the **final decision** (slug-only recursive layout) from the intermediate prototype (type grouping).
3. The style and data dependency contract includes unquoted valid TS keys, short imports/barrels, typed generics/languages, and Skill symbol references.
4. File-backed Markdown/Code, media/Scene specifications, localization and Review revision goals are recorded without claiming implementation.
5. Existing entrypoint/discovery/safety/runtime contracts and unresolved architecture decisions are documented.
6. Stage 2 can add **local executable test fixtures** for generated source and assert directory tree, AST-level imports/exports, unresolved dependency handoffs, stable output bytes, no clobber, and build-tool discovery. The historical 51-file prototype must **not** be used as a byte-for-byte expected output.

Next implementation stages: (2) source modules, imports and TypeScript types; (3) Markdown/Code; (4) media/Scenes/publication; (5) composite blocks; (6) Review; (7) end-to-end verification and removal of the temporary demo section.

## Stage 2 implementation notes (Draft PR)

The Stage 2 follow-up builds **one TypeScript `index.ts` per Configurator**, plus
`sections/index.ts` collection module, a root `index.ts`, and `constants.ts` when the YAML
provides a nonempty language tuple. It uses correctly ordered generics
from the existing Engine factories and resolves Skill IDs to real authored
Skill imports where possible; unresolved Skill dependencies are reported
instead of fabricated. The draft-only, source-language-only and no-overwrite
constraints remain in force.

Where a schema includes **role-discriminated** children rather than a single
slug-keyed collection, folders may retain role names to avoid collisions:
`stages/` and `tasks/` for Quest; `front/`, `back/`, `hint/`
for Flashcards; `correct/`, `incorrect/`, `distractors/` for
Question answer groups. This is **not** the legacy content-type grouping
under Sections: direct Section ContentBlocks remain `<blockSlug>/`.

The Lesson Props publisher already discovers a canonical `index.ts`;
the textbook build must also recognize an index-only Lesson so no content
is silently omitted. Mixing the legacy `*.data.ts` entrypoint with
`index.ts` in the same UUID directory is unsupported.

## Open decisions (not silently implemented)

1. Carousel child polymorphism and precise Scene registration boundary.
2. Media format/extension and multi-role naming; source-local vs published asset addresses; missing-asset behavior.
3. Exact pathless build-time file-reading API and bundler integration.
4. Review shape, permissible PR value types, canonical stage slugs, hashing length and review invalidation policy.
5. Semantic slug normalization **upstream** and mapping existing scoped names to meaningful ones without changing IDs.

Record any decision against the appropriate current Engine code, schema, tests and Studio source before implementing the corresponding stage.
