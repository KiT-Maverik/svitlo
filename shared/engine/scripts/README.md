# Engine build-time scripts

Entity authoring, editorial YAML builders, taxonomy migration, publishing, and review-material generation belong to `@svitlo/engine`, with one named directory per workflow. Keep tests and helpers adjacent and ensure no build-only dependencies enter the runtime Engine entrypoint. Textbook-wide orchestration stays in root `scripts/textbook-tooling/`; host tasks stay with each app.
