# Composite Block and Scene typed source materializers

**Source contract:** five concrete, distinct source emitters, each with its own tests and owned nested source layout. They take reviewed plain Config-shaped data plus non-publishable `production` metadata and return deterministic source-file manifests and diagnostics; they never publish Props or write into unreviewed directories.

| Kind             | Build factory            | Owned nested source                                           |
| ---------------- | ------------------------ | ------------------------------------------------------------- |
| Carousel         | `defineCarousel`         | `slides/<slug>` delegates Image or Scene children       |
| Checkpoint       | `defineCheckpoint`       | `<slug>` delegates CheckpointItems              |
| CheckpointItem   | `defineCheckpointItem`   | one `question` Text and one `answer` CheckpointAnswer         |
| CheckpointAnswer | `defineCheckpointAnswer` | `content.items/<slug>` supports ordered non-Checkpoint Blocks |
| Scene            | `defineScene`            | localized Scene Config plus derived `specification.md`        |

## Source ownership and boundaries

Each kind preserves Engine's actual typed child collection (`content: { items, order }` or `slides: { items, order }`), stable UUID/slug, child order, relevant TypeScript generics, source-only locale and module import/export shape. Collection names are TS fields, not repeated filesystem folders. All Section materializers place ContentBlock sources at `<sectionSlug>/<blockSlug>/`, and Section-only educational production notes belong in the owning Lesson methodology rather than standalone `specification.md` files. Parents determine placement, validate full-tree UUID collisions and perform trusted atomic no-clobber writes; children delegate nested source generation rather than reimplementing their descendants' Markdown/Code/media/Scene policies. Only minimal shared path/UUID/writer infrastructure is permitted—no universal serializer, YAML registry, `build.files()` Configurator method or raw Props-to-TypeScript reconstruction.

Carousel children are Image or Scene, not a retired `CarouselSlide` wrapper. CheckpointItem has a **single mandatory Text** question in `question/index.ts` and an independent Answer in `answer/index.ts` containing nested Block modules. The [source layout decision](../../../../../studio/docs/architecture/checkpoint-answer-source-layout.md) documents the relative tree. Scene sidecar specifications remain faithfully source-derived; `defineScene` generation **does not implement a React Scene, register it, generate physical assets or approve it**.

The owning materialization stage supplies the verified `documentLanguage`, planned language tuple and editorial metadata. A new Lesson created at **Course Stage 5** is merely a Stage 1 typed handoff: **do not call Carousel/Checkpoint/Scene renderers** until the later reviewed Lesson Stage 6.1 or independently reviewed bank source requires them. Pending files, Nil media UUIDs, unregistered Scene and missing translations remain visible blockers. The parent must reject invalid or unsafe nested paths, identical UUIDs, unsupported children and unauthorized source changes.

## Testing and publication separation

Adjacent `*.spec.ts` files cover order, invalid child types, UUID/slug checks, source-locale behavior, explicit Scene specs, nested delegation and generated-code syntax. The deep `checkpoint/semanticSourceTypecheck.spec.ts` exercises real Engine Build typing for Checkpoint → Item → Answer → Carousel → Scene. Run against the current branch and record actual results:

```sh
npm run package:build --workspace @svitlo/engine
npm run code:check:types --workspace @svitlo/engine
npm test --workspace @svitlo/engine
```

The reviewed Stage 6.1 trusted [Lesson materialization](../../../../../scripts/ci/lessonMaterialization/README.md) enforces source/HEAD/reviewer/branch lease and no-clobber rules separately. Standalone renderer tests and Draft CI do not prove a deployed GitHub command, full locales, media, Scene registration or release readiness.
