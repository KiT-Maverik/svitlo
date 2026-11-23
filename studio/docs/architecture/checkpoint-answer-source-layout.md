# Checkpoint Answer Configurator and typed Lesson source layout

**Current Engine Build contract:** `defineCheckpoint` owns ordered Checkpoint Items; each `defineCheckpointItem` owns one mandatory, non-disableable `defineText` question and one `defineCheckpointAnswer` child. The Answer has immutable `id`, `slug`, `type: 'checkpointAnswer'` and a validated `content: { items, order }` collection. Answer children are supported ContentBlocks, excluding recursive Checkpoint. The Item's published Props project the Answer back into ordered learner-visible answer blocks without adding an extra runtime wrapper. No legacy bare Answer collection is supported.

## Canonical authored source layout

The typed Lesson Stage 2 object holds plain `{config, production?}` nodes and delegates each concrete kind to the relevant [source materializer](../../../shared/engine/generators/materializers/checkpointAnswer/materializeCheckpointAnswer.ts) at reviewed Stage 6.1. The parent owns immutable IDs, language scope, directory placement, no-clobber writes and the final Git transaction. The expected relative modules inside a Lesson's `sections/` subtree are:

```text
sections/<sectionSlug>/<checkpointSlug>/
  index.ts                                    # defineCheckpoint
  <checkpointItemSlug>/
    index.ts                                  # defineCheckpointItem
    question/
      index.ts                                # one defineText; no extra question slug folder
    answer/
      index.ts                                # defineCheckpointAnswer
      <contentBlockSlug>/
        index.ts                              # concrete Block; may own nested modules
        specification.md / code.ts / text.md / locale/...
```

Question is a flat role folder because there is always one Text child. Answer owns a separately typed and validated child collection, whose nested Blocks can themselves own resources. Never group nested Blocks by type, invent missing IDs, flatten Answer into an untyped collection or reintroduce a YAML source renderer.

## Review and verification

The owning Lesson PR requires source-SHA-pinned independent Stages 3–5 review before trusted Stage 6.1 materialization, followed by 6.2 TypeScript/resource checks and 6.3 Scene implementation where applicable. The source emitters should preserve authored slugs/UUIDs, correct relative imports, order, locales, nesting and specifications. Their adjacent tests and generated-source semantic Build checks—not a historical snapshot—are the implementation authority. Missing media or Scene behavior remains blocked; successful source generation is not Props publication or approval.

Historical design context is preserved in [#557](https://github.com/KiT-Maverik/svitlo/pull/557), [#559](https://github.com/KiT-Maverik/svitlo/pull/559) and [#574](https://github.com/KiT-Maverik/svitlo/pull/574). These earlier PRs do not define a supported YAML authoring option.
