# Engine build-time scripts

Entity authoring, editorial YAML builders, taxonomy migration, publishing, and review-material generation belong to `@svitlo/engine`, with one named directory per workflow. Keep tests and helpers adjacent and ensure no build-only dependencies enter the runtime Engine entrypoint. Textbook-wide orchestration stays in root `scripts/textbook-tooling/`; host tasks stay with each app.

The named Lesson and Course CLIs are in `generateLessonProps/` and `generateCourseProps/`, and delegate publication to `../generators/`. Their CLI regression tests stay beside them. The cross-generator npm smoke test is in `generatorCliIntegration/`.
