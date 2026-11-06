# Course composition and Lesson overrides

**Status:** Initial authored contracts and immutable Engine builder. Static publication, Scene registry generation, and runtime navigation remain future integrations.

A **Course** is a learning journey, not a Curriculum. Its tree is `Course -> Module / Chapter -> Lesson reference / Episode`. An Episode is a navigable group of `scenario` Sections; a Scene is still a ContentBlock, not an Episode. Lessons remain independently authored.

## Authored override API

```ts
const entry = createLessonOverrides(lesson)
  .setParams({ sections: { allowSkipping: false } })
  .sections.bySlug.theory.content.bySlug.intro.set({ locales: translatedMarkdown })
  .sections.bySlug.theory.content.setOrder(['intro', newHintBlock])
  .sections.setOrder(['theory', courseScenario, 'practice', 'quiz'])
  .build();
```

The builder is exported from `@svitlo/engine/builders`. Call `.build()` to obtain a serializable `Course_LessonOverride` entry accepted in authored `Course_Content<'data'>`, alongside plain Lesson IDs. Do **not** serialize the builder instance. It does not mutate the source Lesson or its Definition.

- `setTitle`, `setParams` and `setEvents` target only supported fields. Existing custom events may be disabled using `false`.
- `sections.bySlug.<slug>.set` controls section title, navigation label and skippability. `false` removes the `skippable` flag.
- `content.bySlug.<slug>.set` edits only that block's kind-specific non-identity fields.
- Both ordered collections support `setOrder([...knownSlugs, newFullData])` and `remove(slug)`. An omitted known slug is an error: delete explicitly first. Literal tuple inputs get extra compile-time diagnostics; runtime checks still enforce completeness, duplicates, unknown references, and unique IDs.
- Once a Section/Block is removed, its slug no longer appears in the returned builder's typed `bySlug`.
- A `requireQuiz` Lesson still needs one Quiz Section with one Quiz block. This is checked at `.build()`; final generator validation remains responsible for resolving referenced questions and languages.

## Ownership of sections and scenes

The authored Course override contains `Course_SectionPlacement` entries. Each has a `source` indicating whether its Definition/Scene registry belongs to the original Lesson or to the enclosing Course. Each block has its **own** source, because a Course-owned Scene can be injected into a Lesson-owned Section.

```ts
{ source: { type: 'lesson', lessonId: lesson.id } } // original
{ source: { type: 'course' } }                       // injected
```

`type: 'course'` resolves against the enclosing Course; Course ID is not repeated in every placement. Overriding an existing block's data does **not** change the ownership of its renderer. Source metadata belongs to Course composition, never to the canonical `Section` or `ContentBlock`.

The existing textbook-generated static Scene registry remains authoritative; no separate dynamic registry is introduced. Course publishing must eventually register course-owned Scenes in that same build-time mechanism. Merely serializing the override entry does not register a React component.

## Boundaries

This first version intentionally does **not** implement the Course publisher, an automatic renderer resolver, localization of composed resources, or UI navigation. Source-of-truth Lesson data and authoring-time metadata stay separate from published JSON. The content reference must be resolved and validated at build time.
