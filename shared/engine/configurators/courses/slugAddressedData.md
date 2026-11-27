# Course hierarchy — authored Config and slug-addressed Data contracts (#906 / #914)

**Scope:** Course, Module and Chapter authored Config, authored overrides and
published Data within integration #902. #906 established the built Data boundary;
A2 #914 migrates the authored surface in Draft PR #916. Dependent source
materializers, publisher/runtime and UI remain separate workstreams.
This document does not redefine other entities' semantic roles or presentation Props.

## Exact shape and ownership

Canonical authored `defineCourse`, `defineModule` and `defineChapter` take
`children: [placementSlug, ...]` at the root together with direct
`placementSlug: ChildConfigurator` properties. The previous
`content: { items, order }` input is **invalid**, not a compatibility alias.

```ts
// Shape only; IDs, locale completeness and child sources are illustrative.
const chapter = defineChapter({
  id: chapterUuid, type: 'chapter', slug: 'practice', params: {},
  locale: { title: 'Practice' },
  children: ['review'], review: existingLesson,
});
const module = defineModule({
  id: moduleUuid, type: 'module', slug: 'shapes', params: {},
  locale: { title: 'Shapes' },
  children: ['practice'], practice: chapter,
});
const course = defineCourse({
  id: courseUuid, type: 'course', slug: 'intro',
  params: { languages: ['en'] as const },
  locale: { title: 'Course', description: 'Shapes' },
  children: ['shapes'], shapes: module,
});
```

**Entrypoints:** `defineCourse/defineModule/defineChapter` and their
`Course_Configurator/Module_Configurator/Chapter_Configurator` TypeScript
contracts live in `shared/engine/configurators/courses/define*/define*.ts`;
`course_Config_Schema/module_Config_Schema/chapter_Config_Schema`
validate root child placement boundaries. The corresponding
`*_Metadata_Config_Schema` parses only entity-owned authored metadata,
not child configurators. `SafePlacementMap` from
`_shared__configurators/slugAddressedContainer/slugAddressedContainer.utils.ts`
rejects reserved **literal** placement names; `validateSlugAddressedContainer`
provides runtime keys/identity/order checks. Parent Config validation checks
the direct boundary without parsing child-owned internals again.

`build.data({ languages, mode? })` emits `{ base, locale }`. The **base Data**
for each of these owners has its own `id`, `type`, `slug`, `params`,
optional own `locale`, **`children: string[]`** and each child stored
directly at its placement key. The old `content` array does not occur in these
three Data owners.

```ts
// Illustrative Data shape, not a standalone Zod-valid fixture.
{
  id: courseId, type: 'course', slug: 'course',
  params: { languages: ['en'] }, locale: { title: 'Course', description: '...' },
  children: ['shapes'],
  shapes: {
    id: moduleId, type: 'module', slug: 'shapes', params: {},
    locale: { title: 'Shapes' }, children: ['circles'],
    circles: {
      id: chapterId, type: 'chapter', slug: 'circles', params: {},
      locale: { title: 'Circles' }, children: ['practice'],
      practice: {
        id: originalLessonId, type: 'lesson', slug: 'originalLesson',
        // The owning Lesson's additional Data fields remain here.
      }
    }
  }
}
```

`children` lists **placement slugs**, not child entity IDs or reusable source
slugs. Its active keys are exhaustive and unique. The example's `practice`
key intentionally differs from the imported Lesson's immutable `slug`.
A complete Lesson retains its original `id`, `type`, and `slug`; its
container alone supplies its contextual placement key. Two **completed** Lesson
placements may point to the same UUID and authored slug, including as siblings,
without changing either immutable source identity. Draft Lesson stubs cannot
be duplicated even under different placement slugs; Module/Chapter/Episode/
Assessment identities must remain unique. Nested/global uniqueness is owned by
E #912. No copies of standalone Lesson source are authored by this operation.

The allowed child kinds are:

| Owner | Direct child kinds |
| --- | --- |
| Course | Module, Chapter, Lesson, Episode, Assessment |
| Module | Chapter, Lesson, Episode, Assessment |
| Chapter | Lesson, Episode, Assessment |

Existing draft Lesson/Episode/Assessment placements remain allowed by their
respective Configurator contracts. The parent checks **only its direct
boundary** (child UUID, camelCase authored slug, type, placement, ordering,
active keys and permitted completed-Lesson reuse), while
the child Configurator remains responsible for child-owned internal validation.

Reserved root metadata and unsafe JS keys may not be placement keys:
`id/type/slug/params/locale/children`, legacy `content/items/order`, and
`constructor/__proto__/prototype` plus other unsafe object members.
`SafePlacementMap<Items>` rejects reserved **literal** keys at authoring
sites. Dynamic JavaScript/widened string keys are always checked at runtime.
`Exclude<string, 'id'>` is not a sound guard against `id`.

## Data publication and sparse overrides

`build.data()` keeps the operation-scoped Build Context and the requested
language subset. Each `locale[language]` is already a Data-shaped fragment;
a localized child lives at `locale[language][placementSlug]`. A parent owner
wraps **only its own** localized fields as `locale[language].locale`.

The canonical authored `build.overrides()` patch uses direct keys:

```ts
course.build.overrides(
  { shapes: { locale: { title: 'New shapes' } } },
  { languages: ['en'] },
);
course.build.overrides(
  { children: ['shapes', 'extra'], extra: additionalModule },
  { languages: ['en'] },
);
course.build.overrides(
  { children: ['extra'], shapes: false, extra: additionalModule },
  { languages: ['en'] },
);
```

Existing placements accept the child's own sparse authored override or
`false` tombstone; additional placements accept whole child Configurator
objects. New and disabled placements require an exhaustive replacement
`children` array. A pure child patch does not require `children`.
Unknown/reused/reserved names, altered identity, unsupported child types and
invalid locale scopes are rejected. The original Config is never mutated.
The authored input has **no** `content.items`, `additionalItems` or
`order` wrapper, but its **output** is still a sparse direct placement Data
patch:

- Changed existing children publish their **own** sparse fragments at the
  placement key; unchanged siblings do not reappear.
- Added children publish complete child Data at their new placement keys.
- Disabling a child publishes `placementSlug: false` as an explicit
  **Data-layer deletion tombstone** and a replacement `children` order.
- Reordering, adding or disabling publishes the complete replacement
  `children` array; metadata-only or a simple existing-child patch does not.
- An array-valued field in any patch still replaces the whole array.

**Workstream E requirement:** While assembling the four Data layers
(original base → original locale → patch base → patch locale), apply false
placement tombstones as deletions **before** validating the resolved
Course/Module/Chapter Data. Do not expose false placements to consumers. The
workstream-A `validateSlugAddressedPublication` already validates this
specific rule at the current owner's root. Nested Course/Module/Chapter patches
also require correct tombstone handling when E composes multi-level trees.

These three Data schemas accept direct dynamic placement properties, validate
the direct boundary and do **not** recursively reparse child-owned internals.
Build calls validate the child via the child Configurator and preserve draft
versus production selection, multilingual scope and origin identity.

## Dependency handoff

**B — Lesson/Episode/Sections/ContentBlocks:** Follow the above `children` +
direct keyed Data layout *only* for genuinely ordered child collections.
Do not introduce this Course-specific Config helper as a universal factory.
Keep fixed Checkpoint/Carousel/Quiz/Quest roles and child-kind restrictions.

**C — Assessment/Question/Flashcard:** Flashcard front/back/hint,
Question prompt/explanation/group, assessment scoring and explicit Quiz
references are semantically named fields, not generic dynamic children.
Preserve bank identity and selection contracts independently.

**A2 — Course authored Config/overrides (#914 / Draft PR #916):** Direct
root child keys, Config schemas and sparse authored overrides are introduced
in the Course Configurator family only. Changes to the existing Course Stage 3
source renderer, typed Course editor and Playground authored Course are
separate explicit consumer migrations. Do not treat a direct Data producer
as proof that every authored call site has migrated.

**D — Source materializers/Stage types (#911):** Consume A2's finalized
Config API and transform inert reviewed drafts to valid Configurator code
without bypassing the static Draft Reader or trusted Git transaction.
D owns generated Stage/source emitters, **not** Course Configurator API migration.

**E — JSON publication/runtime:** Publish `build.data()` and sparse
`build.overrides()` exactly as Data fragments; implement direct
placement-key lookup, locale-layer composition, root and nested removal
tombstones, one-time resolved tree integrity validation and URL resolution.
Build presentation arrays only in a dedicated **Props** adapter.

**F — UI/adapter integration:** Consume presentation Props built from
validated Data, not the authored Config or a synthetic `content.items/order`
Data namespace.

**Status / verification caveat:** #906's Data contract is merged into the
integration branch; #914's authored API is proposed in child PR #916 pending
focused verification and independent review. The Course Stage 3 materializer,
typed editor/fixtures, Playground authored Course and older Course-specific
test call sites must migrate their declarations before the integrated
typecheck and source-generation suites can be green. D #911 must generate
direct `children` and placement properties without executing inert drafts;
E #912 must keep the compact published Lesson reference distinction and
apply `false` tombstones. No change is authorized to D/E files here. Entire
end-to-end rollout still depends on B/C/D/E/F and owner-approved integration.
