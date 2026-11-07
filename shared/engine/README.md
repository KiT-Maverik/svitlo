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

`@svitlo/engine/builders` exports `createCourse`, `createModule`,
`createChapter`, `createEpisode`, `createLesson`,
`createSection` and `createContentBlock`.

Every creator exposes `getData()` for authoring. Lesson, Section and
ContentBlock creators expose `getBase()` and `getLocale()`; Section
and ContentBlock require an explicit `{ languages }` context because
they do not own the language tuple. Course additionally exposes
`getContentEntries()` and `toToc({ language })`; nested Module,
Chapter and Episode expose `getContentEntries()` only. No creator
creates paths, files, or a combined resource. Quiz remains a Section.
Creator closures never enter runtime JSON.

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

## Creator / generator / runtime boundary

A creator returns typed, locale-complete authored data with `getData()`; it
does **not** compute filenames, write files, or manufacture a combined resource.

- `createLesson(data).getBase()` returns the invariant `config`, `flashcards`
  and `questions` documents. `getLocale(language)` returns only sparse locale
  patches and `localeSources` for the same three collections.
- `createSection` and `createContentBlock` expose `getBase({ languages })`
  and `getLocale({ languages, language })` because their creators have no
  runtime language tuple. Quiz is a Section.
- `createCourse(course).getBase()` exposes invariant `toc`, `episodes` and
  `overrides`; `getLocale(language)` provides matching sparse patches.
  `toToc({ language })` is a **Course-only authoring preview**: it traverses
  Module, Chapter, Episode and Lesson nodes and assembles localized navigation.
  Nested creators have no `toToc` method.
- `getContentEntries()` on Course/Module/Chapter/Episode flattens authoring
  references for publication validation; it never returns filesystem paths or
  serialized JSON. `createLessonOverrides(lesson)` remains a separate,
  immutable builder of Course-local patches.

The **Lesson and Course generators** select resource paths and perform JSON
serialization. The **runtime** loads `base.json` plus the selected language
patch and merges them using `mergeLessonResources` (including index-keyed
array patches). Course resources are published independently for TOC, Episode
and Lesson override; full imported Lesson data never appears in Course JSON.
