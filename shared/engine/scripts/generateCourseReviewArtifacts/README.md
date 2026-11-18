# Course-owned Markdown review references

Generate language-scoped, read-only Markdown reference documents for Course-owned content from the authored TypeScript Course tree. Supports both modular `data/courses/<bucket>/<uuid>/index.ts` and legacy `data/courses/*.data.ts` entries.

This is **not** the Course JSON resource publisher or the Stage 5 YAML materializer. For modular Stage 5 Courses, the generator statically projects literal `defineCourse`/`defineModule`/`defineChapter`/`defineEpisode` TypeScript Configs and never imports unresolved standalone Lessons. The historical flat Course format uses the existing Course `build.props({ languages: [locale] })` API. It includes localized Course, Module, Chapter and Episode data (including Episode-owned Sections); a Lesson is emitted **only as its UUID reference**, excluding its standalone locale, Sections, Questions and Flashcards.

The Course's declared languages are used when no language is specified. If a selected language is not declared or the typed Course graph cannot yet build, the generator records a failure rather than inventing translations or treating a draft as approved. Modular Course references can be generated even while standalone Lessons exist only as `lesson.yaml`. Dynamic/nonliteral expressions that cannot be projected safely cause a scoped failure rather than guessing authored content. The low-privilege CI job builds the Engine; only validated Markdown and manifest are later committed by the separate trusted publish job.

The wrapper in `scripts/generateTranslationReviewArtifacts/` owns the artifact path and manifest. Unit tests live beside this module.

```sh
node --test shared/engine/scripts/generateCourseReviewArtifacts/generate-course-review-artifacts.spec.mjs
```
