# Course hierarchy — slug-addressed Data contract (PR #906)

**Scope:** Course, Module and Chapter **published Data**. This is a migration
boundary for dependent PRs #909/#910/#911/#912 and does not redefine other
entities' authored Config, their semantic roles, or presentation-specific Props.

## Exact shape and ownership

An authored Course/Module/Chapter still declares a Configurator's
`content: { items: { [placementSlug]: childConfigurator }, order: placementSlug[] }`.
That existing Config format is deliberately retained for Stage/source materializers
until workstream D migrates their rendering and verifies the static Draft Reader.

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
container alone supplies its contextual placement key. No copies of standalone
Lesson source are authored by this operation.

The allowed child kinds are:

| Owner | Direct child kinds |
| --- | --- |
| Course | Module, Chapter, Lesson, Episode, Assessment |
| Module | Chapter, Lesson, Episode, Assessment |
| Chapter | Lesson, Episode, Assessment |

Existing draft Lesson/Episode/Assessment placements remain allowed by their
respective Configurator contracts. The parent checks **only its direct
boundary** (child ID, type, slug, placement, ordering, active keys), while
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

The authored `build.overrides({ content: { items, additionalItems, order } },
{ languages, mode? })` input remains unchanged for this phase; its **output**
is a sparse, placement-keyed Data patch, not a full replacement Course array:

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

**D — Source materializers/Stage types:** Authoring Config is intentionally
still `content.items/order` here. Transform inert reviewed drafts to
valid Configurator code as a separately verified trust boundary. Do not treat
the Data migration as permission to bypass the static Draft Reader.

**E — JSON publication/runtime:** Publish `build.data()` and sparse
`build.overrides()` exactly as Data fragments; implement direct
placement-key lookup, locale-layer composition, root and nested removal
tombstones, one-time resolved tree integrity validation and URL resolution.
Build presentation arrays only in a dedicated **Props** adapter.

**F — UI/adapter integration:** Consume presentation Props built from
validated Data, not the authored Config or a synthetic `content.items/order`
Data namespace.

**Status / verification caveat:** All of the above is the PR #906 candidate
contract. It does not represent a completed end-to-end rollout; D/E/F and
independent review are still separate acceptance gates.
