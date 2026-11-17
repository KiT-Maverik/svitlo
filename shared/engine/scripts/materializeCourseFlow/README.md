# Course editorial plan materializer (Stage 5)

This maintained utility converts an **approved** temporary Course `course.yaml` into
a single technical `config.yaml` handoff, durable `methodology.md`, and separate
Course/Module/Chapter **TypeScript drafts** under the same canonical Course UUID.
It is not a Course publisher, a review gate, a Lesson factory, or the general
`courseBuilder` replacement. The latter still handles arbitrary technical
Course/Episode Config-shaped drafts independently.

```sh
node shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs --package content/math --course <uuid> --write
node shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs --package content/math --course <uuid> --check
# In a subsequent reviewed commit, after verifying every materialized file:
node shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs --package content/math --course <uuid> --finalize
```

Preconditions: Stage 4 independently approved at an exact SHA; the Course has an
authored slug/title/description and **persistent UUIDs for every Module/Chapter and Lesson
reference**. A missing required Config locale or unresolved standalone Lesson
reference is retained as an explicit TypeScript handoff, never fabricated.
`params.outcomes`, prerequisites and EducationStandard UUIDs are mapped from
the editorial plan; standards' contextual evidence is preserved in
`methodology.md`, **not** represented as certification. No Episodes or Lesson
declarations are auto-created. Only Lesson IDs with matching statically indexed
implemented source and unambiguous exported `defineLesson` declaration are
imported; remaining identities show TODOs.

The generator refuses symlinks and divergent pre-existing outputs; `--check`
compares all outputs byte-for-byte and validates generated TypeScript syntax,
not type completeness. An existing root entrypoint causes `--write` to SKIP,
not overwrite. `--finalize` requires all materialized drafts to match before
removing the temporary editorial plan, preserving it in Git history.
`config.yaml` is a technical **draft handoff** and must not become a second
permanently maintained authored source.
