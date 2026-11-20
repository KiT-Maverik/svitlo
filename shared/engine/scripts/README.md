# Engine build-time scripts

Entity authoring, editorial YAML builders, taxonomy migration, publishing, and review-material generation belong to `@svitlo/engine`, with one named directory per workflow. Keep tests and helpers adjacent and ensure no build-only dependencies enter the runtime Engine entrypoint. Textbook-wide orchestration stays in root `scripts/textbook-tooling/`; host tasks stay with each app.

The named Lesson and Course CLIs are in `generateLessonProps/` and `generateCourseProps/`, and delegate publication to `../generators/`. Their CLI regression tests stay beside them. The cross-generator npm smoke test is in `generatorCliIntegration/`.

## Flashcard bank TypeScript scaffolding

The independent [flashcardBuilder](./flashcardBuilder/README.md) converts one Engine-validated source-language Flashcard bank YAML to create-only typed Draft TS. It never overwrites authored banks, generates translations or publishes Props. The existing assessment-resource publisher still consumes completed typed TS separately.

## React Scene implementation handoff

See [sceneScaffolding](./sceneScaffolding/README.md) for the separate, opted-in
React Scene draft generator used when helpful in **Lesson Stage 6.3**. The required work is governed by [Implement Scene](../../../studio/skills/lesson-workflow/implement-scene.skill.md): complete the generated React drafts, register executable components and verify their behavior in the Lesson's owning package. The generator never changes the Lesson Builder's Config emission or auto-registers incomplete Scene components.

## Unused media audit

The read-only [auditTextbookMedia](./auditTextbookMedia/README.md) CLI reports possible unused textbook-wide media files without running a Lesson/Course build. It compares assets with literal UUID filename references in authored textbook source and does not delete files or fail on unused candidates.

The one-time pre-configurator `migrateSkillsConfigurators` conversion has been retired after the canonical Skills migration in PR #625. Editorial Markdown-to-Code creation continues through `implementSkillsTaxonomy`; Code-to-Markdown review uses `generateSkillsTaxonomy`.

## Independent Question Bank authoring

The [Questions Builder](./questionsBuilder/README.md) creates scoped, modular
Engine Question TypeScript drafts from a validated Lesson-root questions.yaml.
It reuses the Lesson modular renderer, does not modify Lesson or Quiz Sections,
and leaves the separate assessment resource publisher responsible for Props.
Reviewed Quiz selections belong to actual typed Section sources using stable
Question Configurator `.id` references, verified by normal TypeScript/Engine
and strict textbook resource publication; there is no separate YAML ID map.

## Read-only Lesson discovery

The [queryLessons](./queryLessons/README.md) CLI provides deterministic searches by Lesson UUID or verified Skill UUIDs, distinguishing implemented TS sources from editorial `lesson.yaml` drafts. The GitHub [Get Lessons by Skill or ID](../../../.github/workflows/get-lesson.yml) PR-comment command runs this lookup at a pinned SHA and stores its report as an Actions artifact, never in the PR tree. The historical `generateLessonsBySkill` Markdown CLI shares this static index and remains operational.

## Course Flow Stage 5

[materializeCourseFlow](./materializeCourseFlow/README.md) consumes a single reviewed temporary Course YAML and directly creates Course-owned TypeScript/Markdown drafts and new methodology-only Lesson YAMLs with stable UUIDs; it never writes an intermediate Course `config.yaml`. The dedicated Stage 5 Episode renderer is part of the materializer; no alternative Course YAML authoring or Builder CLI is supported.
