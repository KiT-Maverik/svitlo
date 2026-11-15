# TEMPORARY generator coverage fixture — DELETE

> **Disposable, test-only Lesson.** Do not publish, approve as curriculum, or migrate into a real Lesson. Created for [PR #557](https://github.com/KiT-Maverik/svitlo/pull/557) and later [integration acceptance #576](https://github.com/KiT-Maverik/svitlo/pull/576). Cleanup is tracked in [PR #577](https://github.com/KiT-Maverik/svitlo/pull/577).

## Coverage

This separate `config.yaml` deliberately keeps its own immutable test UUID and English source-language content. There are **exactly two Content Sections with six direct ContentBlocks each**.

| Section | Direct ContentBlocks |
| --- | --- |
| `exploreEquality` | Text, Markdown, Code, Image, Scene, Carousel |
| `reviewEquality` | Image, Audio, Video, Subtitles, YouTube, Checkpoint |

The Carousel has two independently named `carouselSlide` children. The Checkpoint has two `checkpointItem` children, each with a mandatory Text question and ordered Answer ContentBlocks (including an invariant Markdown answer and nested Image). The Lesson additionally contains one Flashcard with front/back/hint and typed flags, plus one `selectOneAnswer` Question with prompt, hint, explanation, correct and incorrect blocks.

All eleven currently registered ContentBlock types are represented. This is *representative* coverage of current Config shapes, not every Question/Section type and not a Cartesian product of all optional parameters.

Required schema **keys** are present. The `null` and `{ en: null }` local-media values are intentional draft-generation sentinels: the resulting TypeScript must still await physical Image/Audio/Video/Subtitles/CarouselSlide assets; the Scene implementation and Review evidence also remain pending. Therefore this input is intended for the **YAML-to-TypeScript draft scaffolder**, not direct final Config validation or Lesson publication. Media are never silently replaced with fabricated URLs.

## Generation

Run from the repository root in a disposable worktree or when you explicitly accept source generation:

```sh
node shared/engine/scripts/lessonBuilder/lessonBuilder.mjs generate --source content/math/staging/temporaryGeneratorCoverage/config.yaml
```

The builder derives this *test-only* canonical destination from `config.id`:

```text
content/math/data/lessons/f/a11ce555-0000-4000-8000-0000000000ff/
```

Inspect the generated Sections for direct slug-named folders and source-local `code.ts`, `locale/en.md`, invariant `text.md`, media `specification.md`, nested Carousel/Checkpoint modules, and proper TypeScript imports. A deliberately unfilled `review.ts` and missing media/Scene dependencies are expected. A second `generate` run is intentionally creation-only / `SKIP` and must not overwrite previously generated or edited work.

**Current vs planned contract:** This source targets the *currently implemented* `carouselSlide` and bare Checkpoint Item `answer: { items, order }` shapes. [#574](https://github.com/KiT-Maverik/svitlo/pull/574) and [#575](https://github.com/KiT-Maverik/svitlo/pull/575) will introduce a dedicated Answer Configurator, flat `question/index.ts`, polymorphic Image/Scene Carousel slides and direct child-slug layouts. Update the fixture to those actual schemas after they land before relying on it as Stage 7 acceptance.

## Mandatory cleanup TODO

- [ ] **Delete this entire `content/math/staging/temporaryGeneratorCoverage/` directory** (including `config.yaml` and this README) after successful #576 generator acceptance.
- [ ] If the generator was executed, inspect and then delete **`content/math/data/lessons/f/a11ce555-0000-4000-8000-0000000000ff/`**, provided it contains only fixture-generated files. Do not delete independently authored work.
- [ ] Preserve the real Lesson `92177be3-97a1-5ca4-b21a-07f0dac27f50` and all its actual learning content.

No generator execution, media creation, Lesson publication, or TypeScript compilation is asserted merely by adding this fixture.
