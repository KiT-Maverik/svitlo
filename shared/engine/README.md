# Svitlo Engine

Framework-agnostic builders, generators, validators, and shared localized assessment-method data.

- `@svitlo/engine/builders` — data builders and validation
- `@svitlo/engine/taxonomy` — taxonomy builders and validators
- `@svitlo/engine/localization` — locale resolution and localized file paths
- `@svitlo/engine/assessment-methods` — the canonical 16 localized Assessment Method descriptors
- `examples/createDynamicQuestion.example.ts` — non-production example for type exploration

Content and taxonomy **types**, locale declarations and stable Assessment Method IDs live in
`@svitlo/contracts`; Math and Playground must not duplicate Engine utilities.

## Sparse Lesson localization

Each published Lesson contains three collections: `config`, `flashcards`,
and `questions`. Each collection publishes a single `base.json` of invariant
structure and non-localizable strings, plus a sparse `<language>.json` patch for
every language declared by `lesson.parameters.languages`.

In authored `Locale_Options`, a plain string is invariant and goes in
`base.json`; a language-keyed dictionary must have a genuine string for
**every** declared language. Missing keys and field-level fallbacks fail the
generator. Numeric-key objects in locale patches target existing array indexes,
so neither sections nor nested blocks have their order duplicated or changed.

Web, Mobile and other consumers read the common base and the selected locale
only, merge them with `mergeLessonResources` from `@svitlo/engine/lesson`,
then call `assembleLessonResponse`. The resulting Lesson Response is unchanged.
No field-level runtime fallback is performed.
