# Lesson Builder coverage fixture

This **Engine-owned, permanent regression input** was promoted from the disposable staging example in [#557](https://github.com/KiT-Maverik/svitlo/pull/557). Keep it under `shared/engine/scripts/lessonBuilder/fixtures/coverageLesson/`, not a textbook or Nginx server. The Builder's automated tests copy this YAML into a temporary textbook workspace and **do not write generated source into Git**.

The fixture models one small English-only Lesson with **two Content Sections**, each with **six direct blocks**. Together they cover Text, Markdown, Code, Image, Scene, Carousel, Audio, Video, Subtitles, YouTube and Checkpoint. It also contains two native Carousel children (**Image** and **Scene** configurators), two Checkpoint Items with a real `checkpointAnswer` configurator and nested answer ContentBlocks, one Flashcard, and one multiple-choice Question.

A dedicated synthetic Skill UUID `a11ce555-0000-4000-8000-0000000000ef` is resolved inside the test workspace to an explicit `defineSkill` source symbol. IDs are stable; the fixture does not depend on Math's current Skill tree or on an approved editorial Lesson.

Local media values remain explicitly `null` as a **supported draft handoff**, with associated `production` requirements. The generator should create `specification.md` rather than invent a binary, and the resulting Lesson is **not** publishable or ready for TypeScript compilation. Unfilled Review evidence and unimplemented Scenes are also expected.

## Current contract

The Carousel fixture covers a native Image child with a pending local source and an interactive Scene child with authored localized data. Each emits a direct `<carouselSlug>/<childSlug>/index.ts` module and its own co-located production specification. The Checkpoint uses `checkpointAnswer` and a flat `question/index.ts`. No retired CarouselSlide compatibility type is permitted.

## Run

From repository root:

```sh
npm run test:unit:lesson-builder
```

The test should validate generation, exact important nested paths, authored Markdown/Code and handoff files, preserved Skill imports, source-only localization, syntax of draft modules except `review.ts`, read-only `check`, `SKIP` without overwrites and a changed-source diagnostic.

The former `content/math/staging/temporaryGeneratorCoverage` directory remains **temporary** in #557 and must be removed through [#577](https://github.com/KiT-Maverik/svitlo/pull/577) once the Engine fixture and integration tests are established. Never remove the permanent fixture in this directory as part of that cleanup.
