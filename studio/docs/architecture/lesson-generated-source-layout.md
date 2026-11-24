# Lesson generated source layout

**Current typed source contract.** Lesson authoring progresses in a single UUID-addressed `content/<book>/data/lessons/<bucket>/<lesson-uuid>/draft.ts`, first `LessonWorkflowStage1`, then `LessonWorkflowStage2`. The Stage 2 object is not a `Lesson_Configurator`; it contains plain `{config, production?}` nodes and ordered `items/order` collections.

After the Stage 3 independent review and Stage 4–5 specialist audits and a trusted SHA-pinned Stage 6.1 command, the reviewed `draft.ts` is deleted in the same atomic Git commit that creates the completed source tree. Exact reviewed bytes remain recoverable from the pinned parent commit and blob. The generated canonical `index.ts` contains the `defineLesson` imports and exports, with independently materialized `sections/<slug>/index.ts` and nested Section/Block modules. The **same Section renderer** produces equivalent relative source layouts for Lesson and Episode. Course Stage 5 creates only the minimal new Lesson Stage 1 `draft.ts`, not completed Sections.

Media and Scene specifications are colocated with the relevant nested module. Actual media files, registered executable Scenes, bank Questions/Flashcards, approved translations and complete Props must be authored/verified separately. Unresolved dependencies are explicit `TODO(asset)`/`TODO (BLOCKER):` and cannot be published. All generated file paths are constrained to their owner UUID directory, with symlink/traversal, collision, stale SHA and no-clobber checks. Deterministic IDs are persisted in generated source.

See the real source emitters in `shared/engine/generators/materializers/lesson/`, the trusted command in `scripts/ci/lessonMaterialization/`, and [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md) for Stage 6.2/6.3 acceptance.

## Historical PR #557 reference

The original experimental YAML-to-TS Lesson prototype is preserved in immutable Git commits [`a3735dff`](https://github.com/KiT-Maverik/svitlo/commit/a3735dff24be4445c36fedd38997165732c67bfd) and [`9e500e1f`](https://github.com/KiT-Maverik/svitlo/commit/9e500e1f521e6eebf86f0e556f93f5f673e212f3). It was never a directly executable current source layout. Its generated source snapshots and builder files were retired in #797 and are recoverable from Git history; do not reintroduce a YAML authoring pipeline or infer present behavior from those old examples.
