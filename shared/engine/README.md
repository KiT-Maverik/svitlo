# Svitlo Engine

`@svitlo/engine` contains framework-independent content builders, localization and generation utilities, validation, and Assessment Method data. Shared content contracts live in `@svitlo/contracts`.

## Source layout

- `lessons/` contains Lesson, Section, and ContentBlock creators, sparse localization helpers, and response assembly.
- `configurators/` contains Course configuration and publication helpers.
- `definitions/` contains schema-based content block definitions, including `defineText`.
- `utils/` contains supporting utilities, including `utils/languages/`; `data/` contains Assessment Method data. Shared language types and the locale catalog live in `@svitlo/contracts`.
- The root `index.ts` re-exports the first-level domain indexes. The only public import path is `@svitlo/engine`. Its `browser` and `react-server` conditions use `runtime.ts` to exclude Node-only publication utilities; ordinary Node authoring scripts use `index.ts`.

Lesson creators split authored data into invariant `getBase()` resources and language-specific `getLocale(language)` patches. Generators handle resource paths and serialization; consumers merge a base resource with one locale patch before assembling a Lesson response. See [Lesson](../../studio/docs/entities/lesson.md) for the publication boundary.

Internal domain imports use the `#domain` mappings declared in both `tsconfig.json` and `package.json`.
