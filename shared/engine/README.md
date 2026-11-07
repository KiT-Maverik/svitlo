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

## Build-time creator APIs

`@svitlo/engine/builders` now exposes a consistent creator family:
`createCourse`, `createModule`, `createChapter`, `createEpisode`,
`createLesson`, `createSection`, and `createContentBlock`.

- All creators expose `getData()` (authored data without creator methods) and
  `toResource(context)` (an entity-specific, pure resource projection).
- Course creators additionally expose `toToc({ language })` and
  `getPublicationItems()` (nested authoring entities).
- Lesson creators expose `getPublicationItems()` (the existing three sparse
  JSON collections for **all** declared locales), and
  `toResponse({ language })` (a build-time preview using the same
  `mergeLessonResources` / `assembleLessonResponse` path as runtime).
- Section and ContentBlock creators intentionally have **no TOC or filesystem API**.
  Their `toResource({ languages })` returns a sparse partition for the
  containing Lesson rather than standalone publication paths.
- A Quiz remains `createSection({ type: 'quiz', parameters: ... })`, not a block.
  All existing ContentBlock discriminants are supported, including Scene.
- Neither creator objects nor closures are published. Scene renderer keys are
  resolved by the existing runtime assembly and static Scene registry.

For authoring, pin the Lesson's language tuple **once** and let the child
creator calls infer their specific block/section payloads and literal slugs:

```ts
const languages = ['en', 'uk'] as const;
const block = createContentBlock<typeof languages>()({
  id: 'intro-id', slug: 'intro', type: 'text',
  value: { en: 'Hello', uk: 'Привіт' },
});
const section = createSection<typeof languages>()({
  id: 'section-id', slug: 'theory', type: 'theory',
  title: 'Theory', navigationLabel: 'Theory', content: [block],
});
const lesson = createLesson<typeof languages>()({
  // all required Lesson fields, including parameters.languages: languages,
  sections: [section],
});
export const lesson_Data = lesson.getData();
```

The curried form retains literal slugs, strictly checks localization, Question
catalog keys and declared Lesson event keys. Intentional invariants remain plain
strings; missing locale map entries remain TypeScript errors. A direct
`createLesson(existingLesson)` is also available for typed legacy authoring data.

The generator only discovers/loads Lesson source and writes files. Sparse partitioning,
validating entity structure, preparing resource paths, locale sources and response
assembly belong to the Lesson creator and its existing dedicated Engine helpers.
This keeps the exact published `config` / `flashcards` / `questions`
`base.json` + `<language>.json` format and prevents source methods from
entering runtime resources.
