# Materialize a reviewed Course plan (Stage 5)

This Engine utility consumes **one temporary Course YAML** under content/<book>/data/courses/<bucket>/<course-uuid>/course.yaml. It creates Course-owned TypeScript/Markdown drafts and any required Lesson methodology-only YAML handoffs. It never writes intermediate config.yaml and never opens Lesson PRs. The resulting Course TS/Markdown files are the durable source of truth.

## Usage

Run the maintained script shared/engine/scripts/materializeCourseFlow/materialize-course-flow.mjs with:

- --package content/<book> --course <uuid> --write
- --package content/<book> --course <uuid> --check
- --package content/<book> --course <uuid> --finalize

## Inputs and outputs

The single Course YAML has independently reviewed pedagogy, audience and Skills, Modules, Chapters, reuse references to existing Lessons, and full inline methodologies for new Lessons. Episode nodes, when authored, include independently specified Sections and content. Source language must belong to intended languages. Reviewer approval is tracked separately in the parent Course PR: this CLI cannot grant it.

Output files include index.ts, methodology.md, constants.ts, review.ts (unapproved review skeleton), modules/_.ts, chapters/_.ts and episodes/*.ts with respective barrel files. The root index holds Course content ordering. Episodes use the established typed nested Course Builder renderer for Sections/blocks. Generated TypeScript is explicitly an authoring draft, not proof of a working build.

For each new Lesson with inline methodology and no ID, Stage 5 derives a stable UUID from the Course UUID and canonical placement path. It creates only content/<book>/data/lessons/<last-hex>/<uuid>/lesson.yaml, with a minimal Config identity/Skills/language/title/empty-Sections shell and the reviewed source-language production.methodology text. Optional quizRequired on the slot supplies initial Quiz intent; absent values are provisional authoring shells, not independent approval. No Lesson TS, Questions, Flashcards, assets, translations, review or PR is created. Later Lesson Production reuses this exact ID and YAML.

Existing matched Lessons retain their actual IDs and source ownership. Unavailable imports remain visible TODOs. The Course never owns or duplicates reusable Lesson implementations.

## Safety and lifecycle

--write validates every target before modifying files, refuses symbolic-link paths and divergent edited content, and uses exclusive creation. Derivation is deterministic: reruns after partial output use the same IDs. --check is read-only and checks the generated file bytes and TS syntax. --finalize refuses to run without exact matching materialized outputs; afterward it deletes **only the temporary Course course.yaml**. The new independent Lesson YAMLs stay until their own Lesson workflow finalizes them. Commit and independently verify the generated files before finalizing; Git history preserves the reviewed Course plan.

The general courseBuilder remains an unrelated Config-shaped draft scaffolder for older workflows, not a second mandatory YAML step. This materializer never publishes Props, fabricates media/Quiz answers/translations, or starts Lesson Production.
