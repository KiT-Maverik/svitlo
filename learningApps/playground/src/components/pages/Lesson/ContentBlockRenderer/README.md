# Content block renderer

The shared dispatcher lives in `@svitlo/ui-kit/widgets`. This directory only re-exports it for existing Playground imports and keeps the Playground integration tests.

`ContentBlockCatalogRenderer` receives a localized response catalog and its explicit display order. Pass the lesson's question catalog through `questions` when the catalog contains a quiz. The `checkpoint` branch uses UI Kit's `KnowledgeCheckpoint`; nested answers are dispatched by their response `type`.

The current Playground response assembler still uses `{ type, key }` references, while the canonical Section contract uses `{ type, slug }`. That migration is separate from the renderer move.
