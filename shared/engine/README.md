# Svitlo Engine

`@svitlo/engine` contains framework-independent content builders, localization and generation utilities, validation, and Assessment Method data. Shared content contracts live in `@svitlo/contracts`.

## Source layout

- `lessons/` contains Lesson, Section, and ContentBlock creators, sparse localization helpers, and response assembly.
- `configurators/` contains Course configuration and publication helpers.
- `definitions/` contains the newer schema-based content block definitions, including `defineText`.
- `utils/`, `data/`, and `types/` contain supporting utilities, Assessment Method data, and language types.
- `src/` contains the package entrypoints declared in `package.json`.

The older Lesson creators split authored data into invariant `getBase()` resources and language-specific `getLocale(language)` patches. Their generators handle resource paths and serialization; consumers merge a base resource with one locale patch before assembling a Lesson response. See [Lesson](../../studio/docs/entities/lesson.md) for the publication boundary.

The newer `defineText` API in `definitions/` is being developed separately. It is not yet declared as a package export.

## Current integration status

Some entrypoints in `src/` still import Lesson and Course modules using paths that no longer match their locations outside `src/`. Check the package build and typecheck before relying on `@svitlo/engine` exports; the source files alone do not establish a working published API.
