# UUID-based entity addressing

**Canonical owner:** `shared/engine`, exported as `resolveEntityPath(id)` from `@svitlo/engine/utils`.

## Contract

For large **independently addressed** entity collections, a valid canonical UUID determines the entity's physical directory. All consumers call the Engine utility; no consumer reimplements the bucket algorithm or reads a separate `id → bucket` mapping.

```ts
import { resolveEntityPath } from '@svitlo/engine/utils';

const relative = resolveEntityPath('d3048d21-8690-5255-b62c-984c69ac272c');
// 'c/d3048d21-8690-5255-b62c-984c69ac272c'

const lessonDirectory = `data/lessons/${relative}`;
const publishedDirectory = `public/data/pages/lessons/${relative}`;
```

- Accept **one UUID** and return a normalized POSIX-style `<bucket>/<uuid>` string.
- Normalize uppercase hex digits to lowercase. Reject malformed UUIDs and path traversal; never silently search alternative folders.
- **Bucket:** final **one** hexadecimal digit (`0-9, a-f`): 16 possible buckets. This avoids the timestamp-heavy UUIDv7 prefix and is also suitable for UUIDv4 and UUIDv5.
- The entity folder name is the complete immutable UUID, _not_ the slug. Slugs are human-readable metadata; they may change without moving the entity.
- The collection name and project root (`lessons`, `questions`, etc.) are supplied by the caller. The Engine knows neither entity type nor filesystem, API routes, Next.js or published resource formats.
- The same algorithm works for build-time generators, server endpoints, runtime loaders and CLI tools. It **does not** replace catalog/query indexes for filtering by subject, status or Skills, or a compile-time registry for UI components.
- Keep the bucket depth central and versioned. Moving from one to two trailing hex digits is deterministic but requires a single coordinated filesystem migration, source-reference updates, regeneration of published JSON, and cache/route compatibility review. Do not change the algorithm without migration.

## Lesson convention

**Typed authoring:** Course Stage 5 creates a new Lesson's UUID-addressed `draft.ts satisfies LessonWorkflowStage1` with only reviewed methodology/assessment intent, not an implemented `defineLesson`, Sections or a Lesson PR. The authorized standalone workflow advances that same typed source. Historical `lesson.yaml` and `lesson.identity.json` may remain untouched source provenance for separately authorized migrations, not supported new-production inputs.

```text
content/<book>/data/lessons/<last-hex-digit>/<uuid>/
  draft.ts                       # Stage 1/2 editorial source, consumed at materialization
  index.ts                       # materialized Lesson Configurator (not alongside draft.ts)
  <slug>.data.ts                 # existing implemented Lesson convention
  <slug>.definition.ts           # when implemented
  lesson.identity.json           # editorial-only drafts without typed Lesson data
  methodology.md                # derived from reviewed typed Stage 1/2 methodology at Stage 6.1
  methodologist-brief.md         # existing legacy Briefs; do not duplicate
  content.md                     # when applicable
  sections/                      # when applicable
```

**Implemented legacy-layout Lesson:** `<slug>.data.ts` owns `id` and `slug`. The authored Lesson stores no `group`: `resolveEntityPath(id)` derives the bucket, and the source directory must match it. The build-time generator emits localized JSON at `public/data/pages/lessons/<bucket>/<uuid>/<collection>/<language>.json`; the runtime reads **published JSON only**.

**Editorial draft (e.g. Math):** until a typed `<slug>.data.ts` exists, a `lesson.identity.json` file stores the permanent UUID and human-readable slug in each Lesson directory. It is _not_ runtime data. On implementation, transfer that UUID into the typed Lesson data and remove the editorial identity file only when the canonical typed identity exists. Never regenerate an ID from a renamed slug.

The UUID is minted once upon creation (UUIDv4/v5/v7 supported); scripts may use deterministic UUIDv5 for a **one-time migration** only, then persist the result. The generator/validator must check that the path matches the declared ID, UUIDs are unique within the collection, slugs have expected shape, and files are well formed. Path uniqueness alone does **not** prove global UUID uniqueness.

**Skills are explicitly excluded from the filesystem migration.** Skills retain their Domain → Group → Skill authored hierarchy and published domain/locale resources. This utility can be reused wherever an ID-addressed collection is intentionally adopted; do not relocate Skills merely because they have UUIDs.

## Scene convention

Textbook-owned React Scenes use `content/<book>/scenes/<bucket>/<uuid>/`, with the path returned by `resolveEntityPath(scene.id)`. The generated static Scene registry uses that same UUID as its key and validates every Scene directory against the canonical path. The authored Scene block and localized response retain the UUID; there is no separate renderer key. The Scene's slug remains human-readable metadata and does not determine its path.

## Editorial workflows

- Create Lesson: assign its immutable UUID and resolve its directory with Engine; author one typed Stage 1 `draft.ts`. Preserve earlier Brief/Content/YAML as historical provenance when explicitly reviewing an unconverted Lesson, not as an alternate new source. Never pick a numbered bucket based on capacity or assign a manually stored `group`.
- Existing Lesson: find by UUID through the resolver; IDE repository search remains convenient for slug/title. Do not add a custom slug-to-path search utility.
- Move between bucket depths only with a dedicated migration PR and verification of all imports and generated/public URLs.

## Course methodology storage

New Course methodological content is authored in the single staged Course `draft.ts` and materialized at Stage 5 to a **derived** `content/<textbook>/data/courses/<bucket>/<uuid>/methodology.md`, with `<bucket>/<uuid>` resolved by `resolveEntityPath(courseId)`. This Markdown is not a parallel editable methodology source. Materialization atomically consumes `draft.ts` and creates `index.ts`; existing supported flat `data/courses/*.data.ts` Configurators remain valid.
