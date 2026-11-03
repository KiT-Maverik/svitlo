# Content block renderer

The shared dispatcher lives in `@svitlo/ui-kit/widgets`. This directory only re-exports it for existing Playground imports and keeps the Playground integration tests.

The lesson response assembler turns the localized catalog and its explicit order into an array of content blocks. `ContentBlockRenderer` dispatches that array by each block's `type`; checkpoint answers use the same dispatcher. Quiz content stays outside this renderer and needs its own flow.

The current Playground response assembler still uses `{ type, key }` references, while the canonical Section contract uses `{ type, slug }`. That migration is separate from the renderer move.
