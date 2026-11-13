# YAML → TypeScript draft-scaffolder authoring handoff

**Status:** Authoring guidance for Issue #507, not an editorial approval or publication specification. The authoritative machine contract is the Engine composition in
[`configurators/yaml/`](../../../shared/engine/configurators/yaml/) and its
[generated JSON Schemas](../../../shared/engine/scripts/generateYamlSchemas/README.md).
Do not maintain an independently copied list of Config fields or enum values in Studio.

## Two intentionally distinct kinds of YAML

The existing specialist artifacts are **editorial plans**, each with its own owner, review process and JSON Schema:

| Editorial source | Owner and purpose | Mechanical handoff into Engine-shaped YAML |
| --- | --- | --- |
| Lesson `methodology.md` | Methodologist: outcomes, Skills, audience, locale plan, assessment intent and approval | Verify permanent Lesson `id`, Skills, intended `params.languages` and Quiz requirements; the Markdown itself is not a `defineLesson` Config |
| Lesson `content.yaml` | Screenwriter: ordered learner experience and media/Scene dependencies | Convert Section/block `key` and order to keyed `section.items/order` and `content.items/order`; assign stable UUIDs, camelCase slugs, required `type`, Config `params` and source-locale `locale` fields |
| Lesson `questions/questions.yaml` | Assessment Architect: full Question bank and explicit `quizAssignments` | Convert into `questions.<questionType>.<slug>`, each with its typed Config content, and deliberately map approved Quiz selection into the matching Section's `params.selection`; do not discard unselected Questions |
| Lesson `flashcards/flashcards.yaml` | Flashcard Architect: atomic recall cards after approved Questions | Convert to `flashcards.items/order`, named front/back/hint block collections and named `parameters.flags.items/order`; resolve Question-field references using real source data and imports rather than pasting or fabricating translated text |
| Course `methodology.md` and `toc.yaml` | Methodologist: rationale and ordered Skill/lesson **slots** | Convert approved resolved slots to Course/Module/Chapter typed `content.items/order`; a `type: lesson` child is only a `lessonId` reference to an **existing** standalone Lesson |
| Course `overrides.yaml` | Shared Course Methodologist/Screenwriter-owned, separately approved Course-specific patch operations | Keep separate from `toc.yaml` and from the basic Course Config tree. Apply only via the separately supported override workflow once the target Lesson's real slugs and source exports are known |

**Never feed the editorial plan directly to a scaffolder as though it were a Config.**
An authorized integration/editorial handoff creates a **separate Config-shaped YAML draft** following the generated Engine schemas, with provenance back to approved revisions. This is a projection, not a replacement for specialist artifacts. A plan may be approved while its technical projection is still partial. Conversely, a syntactically convertible projection is not pedagogically approved.

The conversion of editorial `key` arrays into `{items, order}`, stable UUID allocation, slug resolution, Quiz parameters, verified Question-field imports and Course Lesson references is **explicit handoff work**; it is not an implicit promise made by the generic Lesson/Course draft scaffolders. Ambiguities return to the responsible author or the integration coordinator, not to invented defaults.

## Engine Config shape, not published Props

- Polymorphic nodes **at every nesting level** require `type`: Lesson, Course, Module, Chapter, Episode, Section, ContentBlock, Question, Flashcard and applicable embedded types such as Carousel slides and Checkpoint items. Use the actual `yamlFactoryByType` registry for dispatch; do not infer type from a key or a `kind` field in the editorial plan.
- Authored ordered child collections use `{ items: { slug: node }, order: [slug] }` even when the editorial plan uses arrays. The map key, child `slug` and ordering must be reconciled. Question banks are grouped by Question type and then slug; their nested block collections use `items/order`.
- The Engine source for Lesson, Course, Section, Question and Flashcard schemas is under `shared/engine/configurators/`. The seven derived files under `shared/engine/yaml-schemas/` are **editor guidance**, generated with `content:generate:yaml-schemas` and checked with `content:check:yaml-schemas`, not handwritten and not a second validation layer inside the scaffolders.
- `documentLanguage` belongs to the editorial source/provenance; it is **not** a top-level property of the Engine `defineLesson`/`defineCourse` Config. Place learner-facing copy under `locale.<field>.<documentLanguage>` (such as `locale.title.uk` or `locale.value.en`). Only use scalar invariant text when genuinely language-independent and supported by the Config field.
- `params.languages` expresses the **intended** Lesson/Course languages and can include `en`, `uk`, or other locales whose translations do not yet exist. Initial YAML contains learner-facing values in the **single** document language even where other languages are listed. Do not auto-fill, copy, invent or falsely approve translations. The Course authoring language may differ from a particular Lesson's authoring language.
- A `type: lesson` Course child contains `lessonId` referencing a real standalone Lesson, **never** an embedded Lesson Config or a newly invented Lesson. The Course's languages must ultimately be supported by referenced Lessons.
- A schema-shaped YAML draft may still fail Engine validation, TypeScript compilation, reference resolution, accessibility checks, or publication. The scaffolders mechanically emit draft `define*` source and do **not** run Zod/AJV, full TS typechecking, editorial sign-offs, localization completion or `generateLessonProps`/`generateCourseProps`. These remain independent later gates.

## Partial Lesson Config-shaped YAML example

This is an **illustrative excerpt** using schematic UUIDs and Skill IDs. It shows the nesting and source-language-only copy, not a fully approved or publishable Lesson. `documentLanguage: uk` is editorial provenance **outside** this Config. Check the canonical generated `lesson.schema.json` before adapting to a real Lesson.

```yaml
id: '11111111-1111-4111-8111-111111111111'
slug: additionIntro
type: lesson
skills: ['00b48cb0-13c2-4531-84ac-1b8d44f11055']
params:
  languages: [uk, en] # en is planned; translation intentionally absent
  requireQuiz: false
  sections: { allowNavigation: true, allowSkipping: true, showIndexes: true }
locale:
  title: { uk: 'Що означає додавання?' }
section:
  items:
    intro:
      id: '22222222-2222-4222-8222-222222222222'
      slug: intro
      type: content
      params: {}
      locale:
        title: { uk: 'Початок' }
        navigationLabel: { uk: 'Початок' }
      content:
        items:
          opening:
            id: '33333333-3333-4333-8333-333333333333'
            slug: opening
            type: text
            params: {}
            locale:
              value: { uk: 'Два яблука та ще одне — скільки разом?' }
        order: [opening]
  order: [intro]
questions:
  selectOneAnswer:
    simpleAddition:
      id: '44444444-4444-4444-8444-444444444444'
      slug: simpleAddition
      type: selectOneAnswer
      params: { assessmentMethod: retrieval, restrictions: [] }
      locale: {}
      content:
        question:
          items:
            questionText:
              id: '55555555-5555-4555-8555-555555555555'
              slug: questionText
              type: text
              params: {}
              locale: { value: { uk: 'Скільки буде 2 + 1?' } }
          order: [questionText]
        answers:
          correct:
            items:
              three:
                id: '66666666-6666-4666-8666-666666666666'
                slug: three
                type: text
                params: {}
                locale: { value: { uk: '3' } }
            order: [three]
          incorrect:
            items:
              four:
                id: '77777777-7777-4777-8777-777777777777'
                slug: four
                type: text
                params: {}
                locale: { value: { uk: '4' } }
            order: [four]
          distractors: { items: {}, order: [] }
flashcards:
  items:
    additionCard:
      id: '88888888-8888-4888-8888-888888888888'
      slug: additionCard
      type: flashcard
      parameters:
        tags: [addition]
        flags:
          items: { caution: { type: warning } }
          order: [caution]
      content:
        front:
          items:
            cardFront:
              id: '99999999-9999-4999-8999-999999999999'
              slug: cardFront
              type: text
              params: {}
              locale: { value: { uk: '2 + 1 = ?' } }
          order: [cardFront]
        back:
          items:
            cardBack:
              id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
              slug: cardBack
              type: text
              params: {}
              locale: { value: { uk: '3' } }
          order: [cardBack]
  order: [additionCard]
```

This Question belongs to the full bank despite `requireQuiz: false`: the example intentionally has no Quiz Section. An approved Quiz would require its own `type: quiz` Section, `content.items/order`, and complete current `params.selection/layout/feedbackMode/interaction/results` fields; do not infer these from the Question type or fabricate an assessment requirement.

## Partial Course Config-shaped YAML example

The `lessonId` below references the existing Playground `lightDiscovery` Lesson source; real Course editors must verify its availability, locale coverage, intent and authoring imports before using it. Schematic Course/Module/Chapter/Episode IDs are illustrative. The source language is `uk` and only the `uk` locale is authored.

```yaml
id: '11111111-1111-4111-8111-111111111111'
slug: sampleLightCourse
type: course
params:
  languages: [uk, en]
  scenarioMode: story
locale:
  title: { uk: 'Досліджуємо світло' }
  description: { uk: 'Приклад структури курсу.' }
content:
  items:
    openingModule:
      id: '22222222-2222-4222-8222-222222222222'
      slug: openingModule
      type: module
      params: {}
      locale:
        title: { uk: 'Відкриття' }
      content:
        items:
          chapterOne:
            id: '33333333-3333-4333-8333-333333333333'
            slug: chapterOne
            type: chapter
            params: {}
            locale:
              title: { uk: 'Перше дослідження' }
            content:
              items:
                introduction:
                  id: '44444444-4444-4444-8444-444444444444'
                  slug: introduction
                  type: episode
                  params: { languages: [uk, en] }
                  locale:
                    title: { uk: 'Починаємо дослід' }
                  section:
                    items:
                      welcome:
                        id: '55555555-5555-4555-8555-555555555555'
                        slug: welcome
                        type: content
                        params: {}
                        locale:
                          title: { uk: 'Знайомство' }
                          navigationLabel: { uk: 'Знайомство' }
                        content:
                          items:
                            introText:
                              id: '66666666-6666-4666-8666-666666666666'
                              slug: introText
                              type: text
                              params: {}
                              locale: { value: { uk: 'Розпочнімо дослідження світла.' } }
                          order: [introText]
                    order: [welcome]
                existingLesson:
                  type: lesson
                  lessonId: 'f760e7b7-9f77-5027-89ce-4e40d9d031a1'
                  slug: lightDiscovery
              order: [introduction, existingLesson]
        order: [chapterOne]
  order: [openingModule]
```

The Course Config cannot contain editorial `skills` lesson-slot descriptions or `overrides.yaml` operations in place of these nodes. They require a distinct approved mapping. New Episodes are Course-owned, may contain Sections/ContentBlocks, and are not a subtype of Lesson.

## Ownership and checks

1. Specialists produce and independently review their **own** files, including the Lesson Methodology, Screenwriter plan, Question bank, Flashcards and Course TOC/overrides. Confirm the approved **source revisions** and applicable Lesson/Course Production Issue before technical conversion.
2. The integration editor/Coding Agent projects those inputs into a Config-shaped **draft** with stable UUIDs and `type` at all polymorphic boundaries. Keep a revision-to-revision handoff note and unresolved mapping decisions. Do not silently rewrite the approved originals.
3. Generate editor JSON Schemas from **Engine** rather than writing Studio copies:

   ```sh
   npm run package:build --workspace @svitlo/engine
   npm run content:generate:yaml-schemas --workspace @svitlo/engine
   npm run content:check:yaml-schemas --workspace @svitlo/engine
   ```

4. The Lesson/Course scaffolders are code-shaping conveniences, **not** approval, validation, typecheck, translation, resource publishing or full Lesson/Course Props generators. A later AI Coding Agent and the normal editorial, TypeScript, assets, localization, accessibility and publication gates finish the work.

If a necessary Config field or nested case is not representable by the current Engine YAML composition, report the exact field/variant to the integration coordinator. **Do not edit Engine Config schemas, hand-maintain JSON Schema stand-ins, or add a permissive fallback in Studio.**
