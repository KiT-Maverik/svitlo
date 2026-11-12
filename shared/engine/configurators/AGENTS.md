# Configurator architecture

These rules apply to new configurators and to configurators being migrated to the Assembly API. Inspect real code and contracts rather than copying the old mutable override lifecycle. Repository-wide `AGENTS.md` and applicable Studio guidance also apply.

## Ownership and public API

- Each configurator owns its configuration, validation, and assembly lifecycle. Different entities may need substantially different lifecycles: **do not introduce generic configurator factories, assembly factories, or premature shared abstractions**. Small deliberate duplication is preferable to opaque dependencies and difficult type inference. Share only proven, truly universal utilities.
- Expose `id`, `type`, and `slug` directly; preserve literal slug inference for typed collections.
- Keep `config` for the authored original and its service methods, including validation or legacy accessors. Never store per-consumer overrides in shared mutable state. An imported configurator must be safe to reuse across courses.
- Expose `assemble.resource()` for the complete authored resource and `assemble.overrides(patch)` for **only the supplied override fields**. Both return independently owned data, not configurator instances.

## Config shape: keyed objects instead of arrays

- **Do not author array-valued configuration fields except `order`.** Represent collections as slug-keyed or otherwise named objects. Arbitrary arrays cannot be safely deep-merged by key, so avoid index-based patches and positional assumptions.
- `order` is the sole array field permitted by the target authored configuration model. It lists collection keys and is **replaced as a whole**, never deep-merged by index, when resolving overrides later.
- Existing array/tuple contracts in unmigrated configurators are legacy migration work, not examples to copy or permission to break unrelated consumers in this pilot. Opaque external library props have their own validation owner; do not generalize their internal representation into the authored config model.

## Schema and validation boundaries

- The authored `*_Config_Schema` validates the fields it declares and can remain non-strict at its top level. A configurator may also type children outside the metadata schema (for example, a keyed `content` collection); children validate their own data.
- A parent validates its own fields and child **collection boundaries** (allowed child kind, ID/slug relationships, keys, order, disabled entries). Never recursively revalidate a child that assembled and validated itself.
- Derive a **deep-strict, deep-partial override schema** from the permitted fields of the existing Config Schema: use `z.deepPartial(deepStrict_Schema(schema))`. The shared `deepStrict_Schema` helper lives in `shared/engine/schemas/misc.schemas.ts`; unknown fields must fail at their real paths. `deepPartial` makes fields optional, but does not itself make objects strict. Do not allow identity fields to be overridden unless explicitly supported.
- A sparse override of a localized dictionary may supply **one language** without repeating its siblings. Schema constraints and entity-specific semantic checks must remain meaningful.
- Preserve entity-specific semantic validation alongside Zod. For example, Text checks that configured variables occur correctly in every effective localized value.
- Keep deliberately opaque external fields independent of unrelated UI libraries, but ensure publication data is JSON-compatible. An object with arbitrary keys is not automatically JSON-safe: validate its values as JSON too.

## Assembly contract

1. Validate authored input and retain an independent snapshot. Do not depend on caller-owned mutable objects or shared mutable overrides.
2. `assemble.resource()` validates and partitions the complete authored configuration into generator-ready `{ base, locale }`.
3. `assemble.overrides(patch)` runs **two logically distinct checks**: first parse only the patch with the strict, deep-partial override schema (structural validity, types and unknown fields); then temporarily merge the validated patch with an isolated copy of the authored config and run the normal `validate()` (cross-field and semantic validity).
4. **Publish only the validated patch.** Partition the first parse's result, never the temporary merged config, into `{ base, locale }`. No inherited params or translations may be copied into override output. Validation input and publication output are deliberately different objects.
5. Neither assembly method mutates authored data, a previous assembly result, or another course's overrides. Include the entity ID and original error details in override validation errors.

Each configurator specifies its own temporary validation merge rules. A language dictionary override changes only specified languages; an invariant `locale.value` string intentionally **replaces the entire language dictionary** for that field when the published override is resolved. Neither transition should silently introduce redundant publication data. For nested collection overrides, preserve named-key semantics and explicit disabled markers; do not deep-merge child configurator instances as ordinary objects.

## Generator, runtime, and locale files

- Assembly results are **ready for the generator to write**: JSON-compatible data, no methods, functions, configurator instances, or internal mutable state. The generator is a writer, not the owner of entity validation or assembly logic.
- The output field is singular `locale`, a dictionary keyed by supported language codes. Each entry is already the content of that locale's JSON file: **no extra `locale` wrapper** inside each language entry. The generator knows the destination field/path.
- `base` has the entity's required invariant fields plus optional non-translated locale fields. Sparse override `base` contains only overridden fields. Use `locale: undefined` when no translated locale files are needed.
- Configurators and their large authored objects are **build-time only**. Next.js server, Electron, and Capacitor runtimes read published data and use a separate lightweight Props resolver. It combines base data, selected locale, and available override layers with the defined merge rules, then validates with Props schemas. Runtime code must not import heavy `define*` configurators.
- Runtime resolution replaces `order` arrays wholesale, filters intentionally disabled entries, and applies localized value overrides. The assembler validates data for publication; it does not build runtime Props.

## Migration verification

Test full resources and sparse override payloads; invariant values and individual language patches; deep unknown-key failures; semantic checks after a temporary merge; JSON safety; and independence from mutations of authored input, patch input, and prior results. Test child boundaries without recursively revalidating children. Keep legacy consumers working until their migration is authorized; do not claim an unmigrated API is already implemented.
