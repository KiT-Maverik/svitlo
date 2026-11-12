# Runtime assembler architecture — planned

**Status:** Target contract only. No new runtime assembler or unified resolver is implemented by this document. Follow the root \`AGENTS.md\`, applicable Studio guidance, and the authoring/publication contract in [\`../configurators/AGENTS.md\`](../configurators/AGENTS.md).

## Responsibility and dependency boundary

- Assemblers are lightweight, **pure runtime functions** that accept already-loaded published resource/override data and a selected locale, resolve the effective values, and return frontend-ready Props. They do **not** open files, call \`fetch\`, or know about authoring configurator instances.
- Hosts or host-supplied loaders handle filesystem, network, offline caches, authorization and file availability. The same assembly logic must work with data supplied by Next.js, Capacitor, or Electron.
- Validate final results using the **existing entity \`*_Props_Schema\`**, which is declared alongside that entity's Config Schema. Do not create a competing Props schema in the assembler.
- Runtime imports must avoid heavy \`define*\` factories, authored \`*.data.ts\`, generator code, Node-only APIs, and UI-framework dependencies. Existing exports may need later separation to enforce this; do not assume that boundary is already implemented.

## Resolution rules

- Resolve only the resource and override data associated with the requested publication context. Independently published overrides are not automatically layered on one another.
- Merge **named plain objects recursively by key** unless an owning field defines atomic replacement. Scalar values replace previous values. **Every array override replaces the entire array** (\`order\`, \`applyStyle\`, or another array); never merge by index or concatenate.
- Apply localized values for the requested language. A locale-specific patch changes the specified language without requiring its siblings. An explicit invariant string for a localized field replaces its dictionary: stale language-specific values from the original resource must not override that decision.
- Preserve the difference between an absent override field and an explicit supported value. \`false\` can disable a collection entry only where that collection contract permits it; filter disabled items in the effective result and honor the validated \`order\`. Do not invent deletion semantics for \`null\` or \`undefined\` without a field contract.
- Parent/child relationships and constraints (such as a Checkpoint requiring an enabled question) remain owned by the relevant entity. Ensure effective Props satisfy those constraints; final \`*_Props_Schema\` parsing alone may not cover all entity-specific semantic rules.
- If a future use case genuinely requires multiple override layers for a **single resolved result**, explicitly specify their precedence and validation rules then. Do not introduce speculative multi-layer composition into the present publication contract.

## Verification when implemented

- Test every supported locale, invariant-value replacement, sparse locale patches, keyed-object merging, atomic replacement of arrays, disabled collection entries, and final Props validation.
- Include examples where an original translation must not reappear after an invariant override, and ensure loaders for Web/Mobile/Desktop can supply the same published payload to the pure assembler.
- Do not describe these checks as implemented until actual assembler code and tests exist.
