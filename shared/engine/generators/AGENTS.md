# Generator architecture — planned

**Status:** Target contract only. No universal generator is implemented by this document. Follow the root \`AGENTS.md\`, applicable Studio guidance, and the authoring contract in [\`../configurators/AGENTS.md\`](../configurators/AGENTS.md).

## Responsibility

- Generators run at **build/publish time**, accept a configurator and the publication context, invoke \`assemble.resource()\` for complete resources or \`assemble.overrides(patch)\` for that context's sparse overrides, and write the returned data to the correct destination files.
- The configurator owns entity validation, semantic rules, and splitting publication data. Generators **must not recreate Config Schemas, reimplement entity-specific assembly, or build runtime Props**.
- Treat each independent override context as its own publication artifact. Never mutate the imported configurator or combine unrelated contexts merely because they use the same original resource.
- Define paths, file naming, ownership and cleanup rules with the actual resource/index contracts before implementing a generator. Do not invent a universal directory layout from this document alone.

## File publication contract

- An assembly result has \`{ base, locale }\`. Write \`base\` as its publication payload. For \`locale\`, each language key already contains the **direct JSON body** of that language's file; never nest a second \`locale\` property.
- A resource's \`base\` is complete for the invariant fields; an override's \`base\` contains **only overridden fields**. Preserve the distinction when generating file paths and names.
- \`locale: undefined\` means there is no translated locale file to write for that result. Do not serialize an \`undefined\` property into JSON or create empty translation files by default.
- Preserve every explicit sparse value and collection marker (including \`false\` for a supported disabled entry). Do not fill missing override fields with original resource values.
- Keep output deterministic, JSON-compatible, and reproducible from Git-authored inputs. Report publication failures with enough resource and file context to diagnose them.

## Boundary and verification

- This layer may use build-time filesystem APIs; it must not become a runtime import or require Next.js, Electron, or Capacitor to generate content when serving a request.
- The separate [runtime assemblers](../assemblers/AGENTS.md) consume the **published data**, not configurators. Their merge behavior is not a generator responsibility.
- When this layer is implemented, test exact output contents and paths, multiple independent publication contexts, locales, omissions, deterministic reruns, and stale-file handling according to the chosen publication layout. These are future verification requirements, not claims of existing tests.
