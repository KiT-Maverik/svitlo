# Engine entity configurators

`configurators/` contains the `define*` authoring configurators and their Zod-backed schemas. Creation captures independent authored snapshots rather than eagerly validating the complete Config. Both Build methods validate the original Config at invocation; overrides also validate the patched effective candidate. Explicit `validate()` remains callable. Transitional `config.base` remains a plain metadata projection, produced from a typed authored snapshot without eagerly parsing the entire Config. Additional Course creators are located in `configurators_old/`.

**ContentBlock Build API:** All ContentBlock configurators, including the nested `Carousel`/`CarouselSlide` and `Checkpoint`/`CheckpointItem`, require explicit publication language options and expose `build.props({ languages })` for complete resources and `build.overrides(patch, { languages })` for validated sparse changes. A Carousel composes an ordered collection of typed CarouselSlides; a Checkpoint composes ordered CheckpointItems, each with a Text question and ordered answer blocks. Follow [the configurator rules](./AGENTS.md); [generators](../generators/AGENTS.md) serialize publication results, and [runtime assemblers](../assemblers/AGENTS.md) resolve published fragments into Props.

Private helper directories follow `_shared__<owningDirectory>` (for example `_shared__configurators` or `_shared__contentBlocks`) and are imported **only inside their owning directory**. Shared contracts needed by other groups belong in public `*.constants.ts`, `*.types.ts` or `*.schemas.ts` files, exported through the group's `index.ts`. Public indexes must not re-export a private helper directory.

Skill, SkillGroup, SkillDomain and AssessmentMethod also use the stateless Build API; transitional authored accessors expose:

- `config.base` — non-localized fields such as `id`, `slug` and methodological description.
- `config.locales()` — localized fields such as names, titles and frontend descriptions.
- SkillGroup and SkillDomain configurators expose child configurators as slug-keyed `skill` and `group` maps.
- `*_Config_Schema` and `*_Props_Schema` validate the two representations.

ContentBlock configurators share top-level identity (`id`, `slug`, `type`), nested `params` and `locale`, and Zod-backed `*_Config_Schema` / `*_Props_Schema`. `build.props({ languages })` publishes complete `{ base, locale }` resources, and `build.overrides(patch, { languages })` publishes sparse fragments in exactly the same Props-shaped language format. For example, Text publishes `locale.uk = { locale: { value: 'Привіт' } }`: the inner `locale` is the ContentBlock Props field, while `uk` identifies the published language file. Invariant values stay in `base`. Standalone ContentBlocks and CarouselSlide also expose `config.base` and `config.locales()` for authored configuration access. Their Build methods are stateless and do not mutate the original configuration or other publication contexts.

Every `define*` directory has an `index.ts` that exports its implementation and schemas; parent barrels export each directory once. Configurators expose `id` and `type` directly, plus `slug` where the authored entity has one. Validation and `config.*` accessors are specific to each entity; the presence of `config.base` does not imply a mutable override API. Migrated ContentBlocks expose top-level `validate` and `build` methods.

`configuratorArrayToSlugMap([defineText(...), ...])` converts a list of configurators into a slug-keyed object, preserving literal slug types. It is useful for AI-authored content because authors need not duplicate slugs as object keys.

Carousel authoring uses `slides: { items, order }`, not `locale.slides[]`: `items` is a slug-keyed map of `defineCarouselSlide` configurators (each with immutable `id`, `slug`, `type` and localized `src`/`alt`/optional `caption`), while `order` contains each active slide slug exactly once. `build.overrides({ slides: { items, additionalItems, order } })` can sparsely override existing slides, disable them with `false`, add configurators and reorder them; additions/disables require a complete `order`. Built Carousel UI Props still expose only full, ordered `locale.slides` arrays of plain `{ src, alt, caption? }` objects, never child identifiers, authoring maps, or `order` fields.

The optional **supported-language tuple is type-only**. For example, `defineText<'greeting', ['uk', 'en']>(...)` accepts an invariant string or a locale dictionary with both `uk` and `en` (other known language codes remain optional). All authored localized string dictionary leaves are checked at compile time where the schema identifies them. Overrides remain sparse and do not need the full tuple. Typed nested entities must not advertise a language unsupported by any of their children. This does **not** add a runtime `supportedLanguages` argument or duplicate language-specific Zod validation. The generic appears after the slug for flat ContentBlocks and after existing collection generics for nested configurators. Default unscoped calls remain available during migration; fully typed parents should provide explicit child language scopes.

## Flashcard side configurators and unordered Lesson bank

`defineFlashcard` owns three **structural** roles: required `front`, required `back` and optional `hint`. Each role now receives `defineFlashcardSide({ items, order })` rather than a bare ordered object. Side Configurators own typed ContentBlock children, validate their slug/identity and allowed kinds, and publish ordered plain `ContentBlock[]` Props without serializing side authoring state or an invented UUID. Front/back must contain at least one block; hint may be empty. Each side supports scoped, immutable `build.props({ languages })` and `build.overrides({ items?, additionalItems?, order? }, { languages })`. Addition/removal requires a full replacement `order` list; missing or invalid slugs, identity changes and duplicate additions are rejected.

The **Lesson** recall bank is `flashcards: { items: { cardSlug: defineFlashcard(...) } }`: it has **no `order`** in Config or overrides. Cards are published in ascending slug order to keep generated JSON stable independently of JS object insertion order. The runtime Props contract is unchanged (`flashcards: Flashcard_Props[]`) and still supports atomic array replacement on Course overrides. Presentation code must not use the list position as a pedagogical sequence; Sections retain their own explicit order. Previous authored Flashcard bank orders need deliberate migration; this is a source-breaking Config change.

The YAML → TS draft scaffolder is a separate workflow owned by Agent 5. Its required migration: emit `front/index.ts`, `back/index.ts`, optional `hint/index.ts` holding `defineFlashcardSide` calls, preserve the authored order and child UUIDs underneath `<role>/<slug>/`, omit the Lesson's Flashcard bank order and keep create-only `SKIP`. Do not rewrite PR #557's manually edited Lesson or inject unfinished translations, reviews or assets. Consult `studio/docs/architecture/lesson-generated-source-layout.md` for the exact module layout.

Checkpoint authoring uses `content: { items, order }`: `items` is a slug-keyed map of `defineCheckpointItem` configurators, and `order` lists every active slug exactly once. Each CheckpointItem owns a mandatory Text question and an ordered `answer: { items, order }` collection of ContentBlocks except Checkpoint. `build.props({ languages })` publishes a complete, sorted `content` Props array. `build.overrides(patch, { languages })` accepts sparse `params`/`locale` changes and `content: { items, additionalItems, order }`; `items` patches existing items (or sets them to `false`), while `additionalItems` supplies new configurators. Adding or disabling items requires an explicit full `order` array. Validation rejects unknown, duplicated, disabled, or missing slugs, duplicate additions, incompatible children, identity changes, and an empty effective collection. Build output contains only sorted Props arrays, never configurators, `items` maps, or authoring-only `order` lists. Each Build call is stateless and leaves the authored configurators untouched.

Checkpoint Answer is a separate Build-only Configurator: `defineCheckpointAnswer({ id, slug, type: 'checkpointAnswer', content: { items, order } })`. Its permanent UUID is authored in Config/YAML, not created by the scaffolder. Each CheckpointItem receives exactly one `defineText` question and exactly one `defineCheckpointAnswer` instance. Answer owns the nonempty, ordered collection of allowed ContentBlocks, locale publication, nested overrides and child add/disable/reorder validation. Answer's overrides have `content: { items, additionalItems, order }`; CheckpointItem delegates via `answer: { content: ... }`. Runtime CheckpointItem Props deliberately preserve `answer: ContentBlock[]` (ordered flat array), so UI Kit needs no new Answer renderer. Existing bare `answer: { items, order }` authoring is no longer supported. Existing source assets must receive deliberately authored Answer UUIDs before migration.

Text ContentBlocks keep visible localized fragment values inline as `%_%id: personName; value: Maria%_%`. Optional `params.variables` is a camelCase-keyed map of styling rules, e.g. `{ personName: { applyStyle: ['variable', 'bold'] } }`; its keys are checked against every supplied text locale. No array entries or repeated `id` fields are needed, and the UI Kit selects each rule by key. Unlike Code, Text does not substitute values from a separate localized variables object.

Code ContentBlocks are **static, display-only source text**. `params.codeAsText` always contains the complete source string, not a file reference. An authored definition can read its neighboring source file via `readFileSync(new URL('./example.py', import.meta.url), 'utf8')`; Node throws if the file does not exist. The configurable `config.validate(config)` checks `%_%UPPER_SNAKE_CASE%_%` markers against the keys of `locale.variables`, a map from variable names to invariant or per-language strings, directly from `params.codeAsText`. The published Code response carries `codeAsText`, and the UI Kit presents it as highlighted, non-executable text while preserving whitespace. No Node file loader is needed inside Engine.

Lesson and all six current Section configurators use the stateless Build lifecycle: immutable top-level identity, owned Config/Props/Overrides schemas, and explicit language-scoped publication. Legacy `config.base`/`config.locales()` remain transitional read-only adapters only; mutable `override.*`, `disable()` and `config.overrides` are not part of the migrated API. **Each Section owns its schemas and lifecycle directly**; no Section schema/configurator factory exists. Deliberate duplication is preferable to hiding per-section behavior behind shared factories. Lesson owns a `section: { items, order }` collection of Section configurators; every Section (including Quiz) owns `content: { items, order }` of ContentBlock configurators. Section validation checks only its metadata, collection keys, allowed child kinds and ordering; nested ContentBlocks validate themselves. `build.overrides({ content: { items, additionalItems, order } }, { languages })` updates existing children, adds new configurators, disables items with `false`, and reorders them without changing authored content. `false` disables a child only inside an override, never authored content. Lesson's independent collection helper remains unchanged.

Lessons are pedagogically Course-neutral regardless of authoring directory; Course-scoped narrative activities are independent `Episode` configurators. `programId` is not part of Lesson Config/Props. Quiz `params.screen` references named Section content items by slug, rather than embedding ContentBlock configurators.

Course, Module and Chapter use their own stateless Build lifecycles, without a shared creator or schema factory: immutable `id / slug / type`, authoring `params`/`locale`, and required `build.props({ languages })` / `build.overrides(patch, { languages })`. Transitional `config.base` / `config.locales()` remain for unmigrated consumers. Course owns `params.languages`, optional `scenarioMode` and prerequisite IDs; its `locale` owns title, Markdown description and optional prerequisites text. Module and Chapter own localized title and optional `params.iconKey`. Course content may contain Modules, Chapters, Lessons or Episodes; Modules may contain Chapters, Lessons or Episodes; Chapters may contain Lessons or Episodes. Each uses `content: { items, order }` keyed by child slug. Episode is a separate `defineEpisode` configurator with its own Config/Props/Overrides; it is not a Lesson subtype. Validators check metadata and ordered child boundaries, not child internals. Authoring code can mutate `content` directly, then call `config.validate()`; no collection mutation helpers or generic Course factory are introduced.

Publication consumers still need deliberate migration: configurator `build` methods prepare Props-shaped publication data; build-time generators serialize completed results without invoking configurators, while runtime assemblers resolve published fragments into final Props. Neither layer is implemented by the new guidance alone. Never serialize configurator functions or import build-time configurators into runtime bundles.

## Explicit publication language scope

Every active Engine configurator, including flat ContentBlocks, `CarouselSlide`, `CheckpointItem`, Questions, Sections, Flashcards, and the Course/Skill hierarchy, requires `build.props({ languages })` and `build.overrides(patch, { languages })`. The runtime list must be nonempty, unique and contain valid language codes. The typed authoring `Languages` tuple restricts permitted publication codes at compile time; each requested effective Props must also validate at runtime. Invariant content does not create redundant language files, while localized atomic collections publish complete ordered arrays for affected requested languages. Child builders receive the same scope; their extra translations never leak into parent output.

Nested Course/Module/Chapter and SkillGroup/SkillDomain overrides validate both the sparse authored patch and the final Props for **each** requested language. Final validation uses `resource.base → resource.locale[language] → override.base → override.locale[language]`; localized arrays are replaced atomically, and no fully resolved values are inserted into the sparse patch. The same rule applies to other nested Build lifecycles. Cross-level regression tests cover localization boundaries, additions/removals, and independent Build calls.

Question configurators reuse the shared publication language options and helpers; ContentBlocks use first-class typed options, not the earlier Question-specific compatibility adapter. Generators serialize the completed data without inferring languages from authored locale dictionaries.

## Placement-local reuse of an existing Lesson

Use `placeLesson` from `@svitlo/engine/build` directly inside the owning
Course, Module or Chapter `content.items` map. The first argument is the
**original imported `defineLesson` Configurator**, not its `build.props()`
result. The second argument is a **plain authored Config override** suitable
for the original Lesson's `build.overrides(rawPatch, { languages })`:

```ts
import { defineChapter, placeLesson } from '@svitlo/engine/build';
import { howLightMoves } from '../../lessons/howLightMoves';

const chapter = defineChapter({
  id: chapterId,
  type: 'chapter',
  slug: 'lightPractice',
  params: {},
  locale: { title: 'Light practice' },
  content: {
    items: {
      original: howLightMoves,
      shadowPractice: placeLesson(howLightMoves, {
        params: { sections: { allowSkipping: false } },
        locale: { title: { uk: 'Вправи з тінями' } },
      }),
    },
    order: ['original', 'shadowPractice'],
  },
});
```

The two placements preserve the **same source Lesson UUID** but have distinct
contextual keys; `howLightMoves` remains unchanged. `placeLesson` delegates
the plain patch to the real Lesson Build API at each stateless Build call, so
invalid identity/unknown fields and unsupported publication languages fail
closed. The Course Build still resolves complete Props hierarchies; the compact
Course publisher instead stores only the Lesson ID and sparse validated
override Props at each placement (per-language changes stay in locale JSON).
Do not pass built `{ id, base, locale }` override results as authored Config,
or author a separate Course-root patch tree. Section additions requiring
Configurator instances are not plain JSON patches and do not belong in this
placement-local helper.

## Reserved Course child previews

`defineLessonStub({ id, slug })`, `defineEpisodeStub({ id, slug })` and `defineAssessmentStub({ id, slug })` are build-only draft placement previews, not finished entities. They preserve the reviewed immutable UUID, camelCase slug and parent `content.order`; each renders a genuine ContentSection with a Text ContentBlock displaying `Not implemented`. Only the original Course source language need be selected for a preview; the displayed text is invariant and no Questions, Quiz, banks, Episode events or finished Lesson methodology is invented. `defineAssessmentStub` reuses the existing `defineAssessmentDraft` preview contract.

Each Configurator and published preview carries `draft: true`; completed Configurators carry a distinct `draft: false` type brand. The draft-only Props schemas are separate from completed Props schemas. Stub overrides always throw. The strict Course/Lesson publishers reject drafts independently of the required, symbol-aware FastGate CI guard that blocks newly introduced stub imports/usages from production-authored source on Ready PRs. These placeholders must be replaced with separately reviewed completed Configurators before production publication; a successful preview Build never certifies release readiness.
