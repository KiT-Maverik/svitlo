# Svitlo Engine

`@svitlo/engine` has two explicit public entrypoints:

- **`@svitlo/engine/build`**: Node-only authoring-time configurators, validators and publishers; this API can depend on runtime utilities.
- **`@svitlo/engine/runtime`**: cross-platform Props schemas, resolved types, pure assemblers and locale helpers. Must never import Node-only APIs, generators, authoring files, or `define*` implementations through its transitive graph.

There is deliberately **no root package export**. All consumers must select one of the two APIs. Build-time authored `*.data.ts` modules use `/build`; apps, renderers, adapters and mobile/desktop hosts use `/runtime`. Engine's schema definitions remain the single source of truth for Config and Props validation; runtime reexports the canonical Props schemas without implementing parallel validators.

The repository enforces this via a static runtime dependency-graph guard and shared ESLint restrictions for every app. The build-time migration deliberately does not preserve an alias for `@svitlo/engine`.
