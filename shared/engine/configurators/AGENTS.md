# Configurator architecture

**Scope:** Authoring-time entity configurators and their validation/publication API. These rules are the target for new or migrated configurators; only \`defineText\` currently pilots the new Assembly API. Verify actual contracts before treating other entities as migrated. Root \`AGENTS.md\` and applicable Studio guidance also apply.

## Ownership and public API

- Each configurator owns its authored configuration, validation, and \`assemble\` lifecycle. Entities may have different lifecycles: **do not add generic configurator/assembly factories or premature shared abstractions**. Prefer clear local code and deliberate duplication over opaque dependencies and weakened type inference.
- Expose \`id\`, \`type\`, and \`slug\` directly, preserving literal slug inference for typed collections.
- Retain an independent snapshot of authored input. Never store per-consumer overrides in shared mutable configurator state; the same configurator must be reusable in independent publication contexts.
- \`assemble.resource()\` returns a complete publication result; \`assemble.overrides(patch)\` returns only the validated sparse patch. Both return independently owned, data-only results rather than configurator instances.
- Transitional \`config.base\` / \`config.locales()\` accessors may remain for unmigrated consumers. Do not propagate the old mutable \`override\`, \`disable\`, or \`config.overrides\` lifecycle to migrated configurators.

## Authored config and collection shapes

- Prefer named or slug-keyed objects for collections, and a separate \`order\` array when order matters. Do not model collections as positional arrays that require per-index overrides.
- **Arrays are allowed. Every array-valued override replaces the entire array**, including \`order\`, \`applyStyle\`, and any future array field; never deep-merge arrays by index or concatenate implicitly. A patch must satisfy the applicable field schema (for example, nonempty-array rules).
- Plain keyed objects can be merged recursively by key, subject to entity-specific semantics. Opaque values owned by another contract should be replaced as a unit when required; do not assume all object-like values are mergeable.
- Existing collection and array shapes in unmigrated entities are migration work, not a reason to silently break unrelated consumers.

## Validation and schema ownership

- The existing \`*_Config_Schema\` is the **single authored configuration schema**. Derive override validation from **only its permitted overridable fields**, for example by selecting existing schema shapes and applying \`z.deepPartial(deepStrict_Schema(...))\`. A named derived schema is acceptable when useful, but **do not hand-author or maintain a second, independent override field schema**.
- The derived override validator must reject unknown fields at supported schema-owned object boundaries and must not allow identity fields unless an entity explicitly supports them. \`deepStrict_Schema\` has documented Zod coverage limits; check them when introducing new schema wrappers.
- Parsing the sparse patch must preserve sparse publication semantics. Defaults, coercions, transforms, or refinements inherited from the Config Schema must not silently introduce fields that were absent from the supplied patch.
- Validate **twice for two purposes**: first structurally parse the sparse patch; then temporarily merge that validated patch with an isolated authored snapshot and run the entity's normal cross-field/semantic validation. Publish the first validated sparse result, **not** the temporary merged candidate.
- A localized dictionary patch may provide one language without repeating others. For temporary validation, merge specified languages by code; an invariant string intentionally replaces the dictionary for that field. Enforce entity-specific semantic rules, such as Text variable references, against the effective candidate.
- Each parent validates its own schema and collection boundaries: allowed child kinds, IDs/slugs, keys, ordering, disabled entries, and parent-child constraints. Do not duplicate internal child validation. When a parent resolves its own child overrides, it must recheck the parent invariants against the resulting child state.
- Keep deliberately opaque external fields independent from UI libraries, but require JSON-compatible publication values; allowing arbitrary object keys is not permission to publish functions or non-JSON values.

## Publication contract

1. Validate authored input and take an independent snapshot.
2. \`assemble.resource()\` yields \`{ base, locale }\` for the complete authored resource: invariant identity/parameters in \`base\`, optional invariant text in \`base.locale\`, and language-specific values under language keys in \`locale\`.
3. \`assemble.overrides(patch)\` yields the same partition but only for fields actually supplied and validated. No inherited parameters, translations, or identity fields may leak into a patch.
4. Each language entry in \`locale\` is the direct payload of that locale's published file, **not** an additional nested \`locale\` wrapper. Use \`locale: undefined\` when there is no translated payload.
5. Neither call may mutate authored input, patch input, earlier assembly results, or another context's overrides. Include the entity ID and original cause in override validation errors.
6. Both results must be JSON-compatible publication data, with no functions, configurator instances, or internal state. A generator is responsible for writing the result, not validating the entity again.

## Responsibility boundary and verification

- Configurators are **build-time only**. The planned file-writing contract lives in [\`../generators/AGENTS.md\`](../generators/AGENTS.md); runtime resolution and Props validation live in [\`../assemblers/AGENTS.md\`](../assemblers/AGENTS.md). Neither future layer is implemented merely by these documents.
- Test complete resources and sparse patches, one-language and invariant locale cases, deep unknown-field rejection, semantic validation of the temporary merged candidate, array replacement semantics where applicable, JSON safety, and mutation isolation.
- Keep current legacy consumers working until their migration is explicitly in scope; do not claim their old APIs already use Assembly.
