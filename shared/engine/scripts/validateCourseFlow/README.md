# Validate temporary Course editorial YAML

This read-only Engine script validates the **temporary** Course flow plan
`content/<book>/data/courses/<bucket>/<uuid>/course.yaml` using the manually
owned editorial-only schema in `studio/skills/course-workflow/course-flow.schema.json`.
There is no alternate editable Course Config/TOC source: Stage 5 consumes this same reviewed YAML directly.

```sh
node shared/engine/scripts/validateCourseFlow/validate-course-flow.mjs \
  --file content/<book>/data/courses/<bucket>/<uuid>/course.yaml \
  --stage 1
```

`--stage 1` requires root methodology and forbids premature structure.
**Do not require this CLI for Stage 2 provisional authoring:** `TMP_lesson_N` (type + real Skill UUIDs) and `TMP_episode_N` (type only) are intentionally incomplete editor placeholders; they do **not** satisfy the full Course JSON Schema, and the schema must not be weakened to make them pass. The retained `--stage 2` option checks only structurally complete nodes against the final schema, with no special prohibition on Lessons/Episodes; it is not a Stage 2 acceptance or CI gate. Stage 3 resolves all temporary keys and authors/matches actual entities.
`--stage 3` permits fully populated Lesson slots with unallocated UUIDs during design;
`--stage 3-complete` accepts a verified existing Lesson UUID **or a complete in-place methodology** for a new Lesson slot; new IDs are allocated at Stage 5. Validation checks
typed items/order, owned nesting and identity keys; it **does not** attest
methodological approval, verified Skill IDs, standard alignment evidence
correctness, or referenced Lesson implementation. These still require
independent source/review checks. The parser rejects YAML alias expansion,
duplicate keys, invalid source, and files over 2 MiB. No writes occur.

Tests:

```sh
node --test shared/engine/scripts/validateCourseFlow/validate-course-flow.spec.mjs
```
