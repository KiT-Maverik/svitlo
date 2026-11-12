# Configurator architecture

These rules apply to new configurators and to configurators being migrated to the new assembly API. Inspect the actual code and contracts before changing a configurator. Most existing implementations still use the older mutable override lifecycle; their presence does not make that lifecycle the target design. The repository-wide `AGENTS.md` and applicable Studio guidance also apply.

## Public shape

- Expose `id`, `type`, and `slug` directly on the configurator. Preserve literal slug inference where callers need typed child keys.
- Keep a nested `config` object for the authored, original configuration and its service methods, such as validation and access to its base and localized values. It must not be a shared mutable store for overrides.
- Expose `assemble.resource()` to build the resource from the original authored configuration.
- Expose `assemble.overrides(patch)` to build a **complete, independent resource variant** for the supplied override. The caller passes only the override patch; the method combines it with a private snapshot of the original configuration. It must not modify the original configuration, a previous result, or a later result.

## Schema and validation boundaries

- The authored `*_Config_Schema` validates the fields it declares and remains non-strict at the top level. Some configurator types extend `z.infer<typeof *_Config_Schema>` with typed fields such as `content` that hold child configurators. The metadata schema deliberately does not parse those children. A child configurator validates its own configuration.
- A parent may validate its child collection boundary: allowed child kind, identity/slug matching, keys, order, and the meaning of disabled entries. This is separate from recursively validating child metadata.
- For override assembly, use a strict version of the parent metadata schema. Make its schema-defined nested metadata objects strict too, so an unknown key is rejected at its actual path. Exclude separately typed child fields from the metadata parse; keep their own boundary checks. A deliberately opaque field may remain open when another layer owns its validation. For example, Engine leaves Text `typographyProps` as `unknown` so it does not depend on MUI; the consuming application validates those props.
- Keep entity-specific semantic checks alongside Zod validation. A successful Zod parse alone may not prove relationships between fields, localized variants, or child collection order.

## Assembly

1. Validate the authored input and retain an independent snapshot of the fields owned by the configurator. Do not rely on a caller-owned mutable object or a shared mutable override state.
2. `assemble.resource()` partitions the original snapshot into generator-ready `base` and `locales`.
3. `assemble.overrides(patch)` copies the original snapshot, merges the patch according to that configurator's explicit rules, and validates the complete resolved configuration with the strict override schema and semantic checks. Partition the **validated result**, not the raw patch, into `base` and `locales`.
4. Return the full resolved variant from `assemble.overrides()`. A sparse input patch does not imply a sparse output resource. Repeated calls with different patches must be independent.
5. Include the configurator's ID in override validation errors. Preserve Zod issue details and the original error as the cause so the failing path and reason remain available.

Define merge behavior per configurator. In particular, specify how arrays, keyed child collections, localized dictionaries, disabled entries, and opaque values behave before reusing a merge helper. Do not recursively merge child configurator instances as ordinary data objects.

## Resource shape

- Return `base` and language-keyed `locales` in the shape the future resource generator will write. Do not add an extra `locale` wrapper inside each language's value merely for the assembler's convenience; the generator knows the destination field.
- Put invariant, non-translated values in `base`. Put translated values under their language keys. For a field with no translated values, return `locales: undefined` as the explicit signal that no locale files are needed; ensure its required invariant value is present in `base`.
- The returned resource contains data for publication, not configurator methods or nested configurator objects. The owning configurator decides how its typed children are assembled without serializing functions.

## Verification when migrating a configurator

Check the original and overridden resource shapes, invariant and localized values, strict unknown-key errors, entity-specific semantic rules, and isolation from mutations of the input and other assembly results. Test child boundaries without duplicating child validation. Keep legacy consumers working until their own migration is authorized; do not describe an unmigrated API as already implemented.
