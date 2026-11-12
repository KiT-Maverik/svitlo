# Configurator architecture

**Scope:** Authoring-time entity configurators and their validation/publication API. All ContentBlocks expose the stateless `build` API. `Carousel` owns `CarouselSlide` configurators, `Checkpoint` owns `CheckpointItem` configurators, and `CheckpointItem` owns its Text question and ordered answer ContentBlocks; other nested configurators may have distinct lifecycles. Root `AGENTS.md` and applicable Studio guidance also apply.

## Ownership and public API

- Each configurator owns its authored configuration, validation, and `build` lifecycle. Entities may have different lifecycles: **do not add generic configurator/assembly factories or premature shared abstractions**. Prefer clear local code and deliberate duplication over opaque dependencies and weakened type inference.
- Expose `id`, `type`, and `slug` directly, preserving literal slug inference for typed collections. **Identity is immutable:** `build.overrides()` must never accept or publish changes to `id`, `slug`, or `type` at any nesting depth. Exclude these fields from Overrides TypeScript types and reject them at runtime using strict schema validation. A newly added child is a new configurator with its own identity, not an identity override.
- Retain an independent snapshot of authored input. Never store per-consumer overrides in shared mutable configurator state; the same configurator must be reusable in independent publication contexts.
- `build.props()` always returns a complete publication result in a single Props-shaped format. There is only one published locale shape. Each language file is a Props fragment including each owning entity's nested `locale` property where appropriate.
- `build.overrides(patch)` returns only the validated sparse patch. Build results are independently owned, data-only values rather than configurator instances.
- Transitional `config.base` / `config.locales()` accessors may remain for unmigrated consumers. Do not propagate the old mutable `override`, `disable`, or `config.overrides` lifecycle to migrated configurators.

## Authored config and collection shapes

- Prefer named or slug-keyed objects for collections, and a separate `order` array when order matters. Do not model collections as positional arrays that require per-index overrides.
- **No arrays inside authored `locale` Config/Overrides for new or migrated entities**, including nested localized values: use slug-keyed/named objects. Put a collection's `order` array alongside its `items` map, outside `locale`. Resolved Props may contain already ordered arrays. Carousel authored slides are `slides: { items, order }` outside `locale`; the published UI `locale.slides` remains an already ordered array.
- Arrays are permitted outside authored `locale` (for example, `order` and `params.variables.*.applyStyle`) and in resolved Props. **Every array-valued override replaces the entire array**; never deep-merge arrays by index or concatenate implicitly. A patch must satisfy the applicable field schema (for example, nonempty-array rules).
- Plain keyed objects can be merged recursively by key, subject to entity-specific semantics. Opaque values owned by another contract should be replaced as a unit when required; do not assume all object-like values are mergeable.
- Existing collection and array shapes in unmigrated entities are migration work, not a reason to silently break unrelated consumers.

## Validation and schema ownership

- The existing `*_Config_Schema` is the **single authored configuration schema**. Derive override validation from **only its permitted overridable fields**, for example by selecting existing schema shapes and applying `z.deepPartial(deepStrict_Schema(...))`. A named derived schema is acceptable when useful, but **do not hand-author or maintain a second, independent override field schema**.
- The derived override validator must reject unknown fields at supported schema-owned object boundaries and must not allow identity fields unless an entity explicitly supports them. `deepStrict_Schema` has documented Zod coverage limits; check them when introducing new schema wrappers.
- Parsing the sparse patch must preserve sparse publication semantics. Defaults, coercions, transforms, or refinements inherited from the Config Schema must not silently introduce fields that were absent from the supplied patch.
- Validate **twice for two purposes**: first structurally parse the sparse patch; then temporarily merge that validated patch with an isolated authored snapshot and run the entity's normal cross-field/semantic validation. Publish the first validated sparse result, **not** the temporary merged candidate.
- A localized dictionary patch may provide one language without repeating others. For temporary validation, merge specified languages by code; an invariant string intentionally replaces the dictionary for that field. For Markdown whose invariant source is overridden in one language, project the relevant variable dictionary onto that effective language only **during semantic validation**; the published patch stays sparse. Enforce entity-specific semantic rules, such as Text variable references, against the effective candidate.
- Each parent validates its own schema and collection boundaries: allowed child kinds, IDs/slugs, keys, ordering, disabled entries, and parent-child constraints. Do not duplicate internal child validation. The Checkpoint Config Schema only describes the typed child map shape: do not validate `checkpointItem` with the general renderable ContentBlock discriminator (which intentionally excludes it); Checkpoint `validate()` owns that check. When a parent resolves its own child overrides, it must recheck the parent invariants against the resulting child state.
- For context-dependent restrictions such as a Checkpoint Item's mandatory Text question, exclude `params.disabled` from that **child override position** in TypeScript; do not globally remove the ability to disable ordinary Text blocks. Retain a runtime check of mandatory-child invariants for untyped/JavaScript input and authored configurations; TypeScript alone is not a runtime validation boundary.
- Keep deliberately opaque external fields independent from UI libraries, but require JSON-compatible publication values; allowing arbitrary object keys is not permission to publish functions or non-JSON values.

## Publication contract

1. Validate authored input and take an independent snapshot.
2. `build.props()` yields `{ base, locale }` for the complete authored resource: invariant identity/parameters in `base`, optional invariant text in `base.locale`, and language-specific values under language keys in `locale`.
3. Every language payload is already a Props-shaped fragment: for Text, `locale.en = { locale: { value: 'Hello' } }`. Nested children preserve their own Props paths without any further `locale` wrapping. Never add an extra wrapper around an already composed child fragment.
4. `build.overrides(patch)` yields the same publication partition but only for fields actually supplied and validated. No inherited parameters, translations, or identity fields may leak into a patch.
5. Each `locale[language]` value is the direct JSON payload of that language's published file, already in Props shape. Use `locale: undefined` when there is no translated payload; invariant values stay only in `base`.
6. Neither call may mutate authored input, patch input, earlier assembly results, or another context's overrides. Include the entity ID and original cause in override validation errors.
7. Results must be JSON-compatible Props-shaped data, with no functions, configurator instances, or internal state. Config-only collection organization (`items`, `order`) and override-only additions/disables must be fully resolved by `build`: published Props expose only the collection's sorted array of active child Props. Generators serialize completed results without entity-specific logic.

## Nested resource assembly

- A parent calls `child.build.props()` for each child. Children validate their own authored data; the parent validates collection boundaries, allowed children and cross-child constraints.
- Place every child's `base` under its actual Props path in the parent's `base`, and each child's `locale[language]` under the corresponding path in the parent's `locale[language]`. Language codes exist only at the outer assembly envelope; do not serialize nested `base`/`locale` envelopes or child configurator instances.
- Each parent wraps only its **own** localized fields in its Props `locale` field and places child locale fragments directly under the child's Props path. Invariant localized values remain under `base.locale` and do not create translated files.
- The same Props-shaped locale contract applies to `build.props()` and `build.overrides(patch)`. Override fragments remain sparse, but a child's published locale fragment is already correctly nested; never assume it is a flat collection of localized fields.

## Responsibility boundary and verification

## Compile-time supported languages

- Supported-language tuples are **TypeScript-only**, not runtime function parameters, Zod refinements, or published data. For flat configurators, use the second generic after the literal slug, for example `defineText<'greeting', ['uk', 'en']>(...)`. Nested configurators preserve the child map generics and take the optional language tuple after their existing generic parameters. Empty/default tuples preserve unconstrained existing authoring until a typed parent requires a declared scope.
- Any localized string dictionary in the authored Config must contain **every** language from its type-level tuple, with any additional known language codes optional. An invariant string remains allowed. The shared `ConfigWithLanguages` helper applies this to nested keyed localization fields. Overrides are independently typed and **remain sparse**: one-language patches never have to restate other languages.
- Language compatibility between typed parent and children is contravariant in coverage: `Languages<Parent> ⊆ Languages<Child>`. `ChildrenSupporting` / `ChildSupporting` carry this constraint through nested configurator collections. Preserve their phantom language scope and the literal slug keys: widening child configurators prematurely defeats this check.
- TypeScript is the intended authoring boundary. Generic metadata is erased at runtime; **do not add a duplicate Zod requirement for the tuple**. Ordinary Zod structural validation, cross-field invariants and actual published Props validation still apply. Untyped external JSON requires a separate explicit boundary if later introduced.
- Recursive Scene dictionaries and opaque user-owned records require special care: unlike known schema-localized leaves, a free-form record is not always distinguishable from a locale dictionary by static type alone. Do not claim exhaustive coverage for those opaque structures without focused compile-time tests.

## Responsibility boundary and verification

- `Config` holds authored data (including nested configurators where applicable), `Props` holds UI-ready values, and `Overrides` is an independently typed sparse patch. For nested collections, existing children receive their own typed overrides, and new children are supplied as configurators through an explicitly typed `additional*` slug map; author them with `configuratorArrayToSlugMap`. The parent alone validates keys/order, filters disabled entries, and materializes sorted Props arrays. Checkpoint, CheckpointItem and Carousel implement these ordered nested collection APIs; flat ContentBlocks and individual CarouselSlides do not own child configurator collections.
- When a collection changes, publish its full replacement Props array, not positional sparse array fragments. For scalar/object fields, continue publishing only supplied sparse overrides.
- Do **not** generate locale files merely to repeat invariant replacement arrays: locale-specific publications contain only real translated data. A removed localized child may leave an override with `base.answer = [invariantChild]` and `locale: undefined`; the required runtime layering is specified in [`../assemblers/AGENTS.md`](../assemblers/AGENTS.md) and must apply `override.base` after `resource.locale[language]` so the removed child cannot reappear.
- Configurators are **build-time only**. The planned file-writing contract lives in [`../generators/AGENTS.md`](../generators/AGENTS.md); runtime resolution and Props validation live in [`../assemblers/AGENTS.md`](../assemblers/AGENTS.md). Neither future layer is implemented merely by these documents.
- Test complete resources and sparse patches, one-language and invariant locale cases, unified resource/override locale shapes, single-signature Build API types, deep unknown-field rejection, semantic validation of the temporary merged candidate, array replacement semantics where applicable, JSON safety, and mutation isolation.
- Keep transitional accessors for consumers that still need them; do not claim unrelated nested configurators implement Build.
