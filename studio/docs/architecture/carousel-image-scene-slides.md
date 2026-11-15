# Carousel Image/Scene slides and recursive Lesson generation

**Status:** approved implementation scope for a separate Draft PR; this commit only captures the work contract. Design fixture: [PR #557](https://github.com/KiT-Maverik/svitlo/pull/557).

## Verified current behavior

- `defineCarousel` currently requires `defineCarouselSlide` children; its `slides.items` collection is slug-keyed and `slides.order` is explicit. A `CarouselSlide` is specialized authored media with `src`, `alt` and optional `caption`; published carousel slides are **not full Image/Scene ContentBlock Props**.
- `shared/ui-kit/src/components/widgets/ContentBlockRenderer/blocks/Carousel/Carousel.tsx` renders every slide through the Image widget with synthetic `slug: 'carouselImage' + number`. It has no Scene slide dispatch.
- `shared/engine/scripts/lessonBuilder/lessonModules.mjs` currently nests CarouselSlide modules under each Carousel but does not implement the proposed Image/Scene polymorphism. Its media resolver supports CarouselSlide assets and emits source modules by authored slug. The editor must not treat that as evidence of Scene playback support.

## Approved target architecture

The Carousel accepts **typed Image and Scene ContentBlock configurators** as slides; the UI Kit must actually render either kind, not merely accept the types. Preserve authored order, stable identity, existing carousel controls, accessibility and localization. A specialized `defineCarouselSlide` is no longer the desired core abstraction; audit existing uses and migrate deliberately instead of leaving an undocumented mixed runtime contract.

Every nested entity lives directly under the **Carousel's own slug folder**, inside a distinct folder named after its **authored slug**, with its own colocated files. Do not add a redundant `image/`, `scene/`, `slides/`, or block-type layer for the child modules:

```text
sections/<sectionSlug>/<carouselSlug>/
  index.ts                                  # defineCarousel
  <imageSlideSlug>/
    index.ts                                # defineImage
    <imageSlideSlug>.svg / locale/...       # independent asset/resources
  <sceneSlideSlug>/
    index.ts                                # defineScene
    specification.md                       # source-local Scene handoff
    locale/...                             # any authored source resources
```

The logical Config field can remain `slides: { items: {...}, order: [...] }`; a structural collection does **not** require an intermediate `slides/` directory. Children are independent Configurators, not flattened inline slide dictionaries. The same recursive owner/slugs rule applies to future supported nested children.

## Implementation scope in a later chat

1. Redesign the Engine `defineCarousel` signature, Config/Props Zod schemas, localization and `build.props`/`build.overrides` to accept an explicit Image/Scene discriminated union. Preserve slug-specific generics and ordered collection semantics; use full child Props or a justified lossless projection retaining `type`, `id`, `slug` and data required to render a Scene.
2. Audit the legacy `defineCarouselSlide` references, callers, editorial YAML, fixtures, sample content and serializable Props. Migrate to `defineImage` as appropriate; avoid silent fallbacks, unsupported compatibility aliases or discarded IDs.
3. Update the UI Kit Carousel renderer to **dispatch by child `type`** and integrate Scene rendering with the existing Scene registry/context rather than fabricating a Scene implementation. Preserve keyboard arrows, touch, focus, indicator semantics, RTL, fullscreen, autoplay, reduced-motion, visual transitions, paused offscreen states, accessibility labels and offline behavior. Validate whether Scene interaction should pause autoplay and avoid a disappearing active Scene on automatic advance.
4. Update the YAML factory registry/scaffolded Config projection. Emit children inside `<carouselSlug>/<childSlug>/index.ts`; keep local media files and `specification.md` beside their owning child. Use correct imports/generics and `resolveLessonMedia(import.meta.url, ...)` from each child module. Preserve source-only locale authoring, no-overwrite SKIP, deterministic checks and strict path safety.
5. Update Studio architecture/entity docs and appropriate tests. Separate runtime and Build imports and validate published JSON/Scene registry packaging.

## Acceptance tests and review gates

- Engine type tests prove Image and Scene accepted, unsupported children rejected, matching map keys/slugs, unique child paths, nonempty order, overrides/additions/removals and locale completeness; serialization preserves typed discriminants.
- Generator fixture asserts `<carouselSlug>/<imageSlug>/index.ts` and `<carouselSlug>/<sceneSlug>/index.ts` **without intermediate type/collection folders**, plus each asset/specification file resolving relative to that exact child.
- UI Kit tests and a component story actually render both kinds, including interactive Scene handling and accessibility controls; no faux Scene placeholder is treated as a working implementation.
- Determinism, YAML-to-draft parseability, no-overwrite, media bundle URLs and supported completed-Props checks are covered. Generated unfinished drafts may intentionally fail TypeScript.
- Run relevant Engine/UI Kit/testbook build tests and independent review; record any intentional migration break explicitly before Ready/merge.

## Non-goals and dependencies

This is a **planning-only Draft** until a later chat adds implementation. It is not a request to finish/fix intentionally unresolved Scene or media assets in #557. Stage 7 integration acceptance must run after this and the Checkpoint Answer change land. PR #570 review-record changes are separate.
