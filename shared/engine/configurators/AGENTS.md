# Configurator architecture

**Scope:** Authoring-time entity configurators and their validation/publication API. All flat ContentBlocks (`defineText`, `defineAudio`, `defineCarousel`, `defineCode`, `defineImage`, `defineMarkdown`, `defineScene`, `defineVideo`, `defineYoutube`) now expose the stateless `build` API. Nested configurators, including Checkpoint and CheckpointItem, require separate architecture work and must not be described as migrated. Root `AGENTS.md` and applicable Studio guidance also apply.

## Ownership and public API

- Each configurator owns its authored configuration, validation, and `build` lifecycle. Entities may have different lifecycles: **do not add generic configurator/assembly factories or premature shared abstractions**. Prefer clear local code and deliberate duplication over opaque dependencies and weakened type inference.
- Expose `id`, `type`, and `slug` directly, preserving literal slug inference for typed collections.
- Retain an independent snapshot of authored input. Never store per-consumer overrides in shared mutable configurator state; the same configurator must be reusable in independent publication contexts.
- `build.props()` returns a complete publication result; `build.props({ embed: true })` returns the same `base` with Props-shaped localized fragments for nesting under a parent. The supplied `embed` flag may only be literal `true` (never `false`); overloads must preserve precise return types. Do not introduce a separate `embedded()` method.
- `build.overrides(patch)` returns only the validated sparse patch. Build results are independently owned, data-only values rather than configurator instances.
- Transitional `config.base` / `config.locales()` accessors may remain for unmigrated consumers. Do not propagate the old mutable `override`, `disable`, or `config.overrides` lifecycle to migrated configurators.

## Authored config and collection shapes

- Prefer named or slug-keyed objects for collections, and a separate `order` array when order matters. Do not model collections as positional arrays that require per-index overrides.
- **Arrays are allowed. Every array-valued override replaces the entire array**, including `order`, `applyStyle`, and any future array field; never deep-merge arrays by index or concatenate implicitly. A patch must satisfy the applicable field schema (for example, nonempty-array rules).
- Plain keyed objects can be merged recursively by key, subject to entity-specific semantics. Opaque values owned by another contract should be replaced as a unit when required; do not assume all object-like values are mergeable.
- Existing collection and array shapes in unmigrated entities are migration work, not a reason to silently break unrelated consumers.

## Validation and schema ownership

- The existing `*_Config_Schema` is the **single authored configuration schema**. Derive override validation from **only its permitted overridable fields**, for example by selecting existing schema shapes and applying `z.deepPartial(deepStrict_Schema(...))`. A named derived schema is acceptable when useful, but **do not hand-author or maintain a second, independent override field schema**.
- The derived override validator must reject unknown fields at supported schema-owned object boundaries and must not allow identity fields unless an entity explicitly supports them. `deepStrict_Schema` has documented Zod coverage limits; check them when introducing new schema wrappers.
- Parsing the sparse patch must preserve sparse publication semantics. Defaults, coercions, transforms, or refinements inherited from the Config Schema must not silently introduce fields that were absent from the supplied patch.
- Validate **twice for two purposes**: first structurally parse the sparse patch; then temporarily merge that validated patch with an isolated authored snapshot and run the entity's normal cross-field/semantic validation. Publish the first validated sparse result, **not** the temporary merged candidate.
- A localized dictionary patch may provide one language without repeating others. For temporary validation, merge specified languages by code; an invariant string intentionally replaces the dictionary for that field. Enforce entity-specific semantic rules, such as Text variable references, against the effective candidate.
- Each parent validates its own schema and collection boundaries: allowed child kinds, IDs/slugs, keys, ordering, disabled entries, and parent-child constraints. Do not duplicate internal child validation. When a parent resolves its own child overrides, it must recheck the parent invariants against the resulting child state.
- Keep deliberately opaque external fields independent from UI libraries, but require JSON-compatible publication values; allowing arbitrary object keys is not permission to publish functions or non-JSON values.

## Publication contract

1. Validate authored input and take an independent snapshot.
2. `build.props()` yields `{ base, locale }` for the complete authored resource: invariant identity/parameters in `base`, optional invariant text in `base.locale`, and language-specific values under language keys in `locale`.
3. `build.props({ embed: true })` retains the same `base` but wraps each language's **own** translated fields as `{ locale: fields }` (Props-shaped fragments). For instance, Text returns `locale.en = { locale: { value: 'Hello' } }` instead of `{ value: 'Hello' }`. The shared `wrapLocale` utility in `_shared__configurators` performs only this wrapper conversion; never hide entity validation or assembly in it.
4. `build.overrides(patch)` yields the same publication partition but only for fields actually supplied and validated. No inherited parameters, translations, or identity fields may leak into a patch.
5. Without `embed`, each language entry in `locale` is the direct payload of that locale's published file, **not** an additional nested `locale` wrapper. In either resource mode, use `locale: undefined` when there is no translated payload.
6. Neither call may mutate authored input, patch input, earlier assembly results, or another context's overrides. Include the entity ID and original cause in override validation errors.
7. Results must be JSON-compatible Props-shaped data, with no functions, configurator instances, or internal state. Config-only collection organization (`items`, `order`) and override-only additions/disables must be fully resolved by `build`: published Props expose only the collection's sorted array of active child Props. Generators serialize completed results without entity-specific logic.

## Nested resource assembly

- A parent calls `child.build.props({ embed: true })` for each child, regardless of whether its own call is embedded. Children validate their own authored data; the parent validates collection boundaries, allowed children and cross-child constraints.
- Place every child's `base` under its actual Props path in the parent's `base`, and each child's `locale[language]` under the corresponding path in the parent's `locale[language]`. Language codes exist only at the outer assembly envelope; do not serialize nested `base`/`locale` envelopes or child configurator instances.
- The parent's `embed` mode wraps **its own** localized fields, not its descendant Props fragments. Invariant localized values remain under `base.locale`; they do not create translated locale entries.
- These rules apply to `build.props` only. **Do not invent embedded override behavior** until its API is designed separately.

## Responsibility boundary and verification

- `Config` holds authored data (including nested configurators where applicable), `Props` holds UI-ready values, and `Overrides` is an independently typed sparse patch. For nested collections, existing children receive their own typed overrides, and new children are supplied as configurators through an explicitly typed `additional*` slug map; author them with `configuratorArrayToSlugMap`. The parent alone validates keys/order, filters disabled entries, and materializes sorted Props arrays. These nested APIs are planned and are **not implemented by the flat ContentBlocks**.
- When a collection changes, publish its full replacement Props array, not positional sparse array fragments. For scalar/object fields, continue publishing only supplied sparse overrides. **Do not generate locale files merely to repeat invariant replacement arrays:** locale-specific publications contain only real translated data. A removed localized child may leave an override with `base.answer = [invariantChild]` and `locale: undefined`; the required runtime layering is specified in [`../assemblers/AGENTS.md`](../assemblers/AGENTS.md) and must apply `override.base` after `resource.locale[language]` so the removed child cannot reappear.
- Configurators are **build-time only**. The planned file-writing contract lives in [`../generators/AGENTS.md`](../generators/AGENTS.md); runtime resolution and Props validation live in [`../assemblers/AGENTS.md`](../assemblers/AGENTS.md). Neither future layer is implemented merely by these documents.
- Test complete resources and sparse patches, one-language and invariant locale cases, direct and embedded resource shapes, overload type inference, deep unknown-field rejection, semantic validation of the temporary merged candidate, array replacement semantics where applicable, JSON safety, and mutation isolation.
- Keep transitional accessors for legacy consumers until their migration is explicitly in scope; do not claim nested configurators already implement Build.
