# Carousel Image/Scene slides and recursive Lesson generation

**Current contract:** `defineCarousel` accepts `defineImage` and `defineScene` children
in `slides: { items, order }`. The former `defineCarouselSlide` configurator
and colocated binary media are retired. See the
[Lesson Builder README](../../../shared/engine/scripts/lessonBuilder/README.md)
and [textbook asset packaging guide](../../../scripts/textbook-tooling/buildTextbook/README.md)
for executable behavior. [PR #557](https://github.com/KiT-Maverik/svitlo/pull/557)
records a historical layout prototype, not a current source template.

## Authored and generated structure

- `slides.items` maps authored camelCase slugs to full Image or Scene
  configurators; `slides.order` fixes the sequence. Build Props preserve each
  child's identity, type and runtime data.
- The Lesson Builder places each child module directly beneath the Carousel
  slug, with no intermediate `slides/`, `images/` or `scenes/` grouping:

```text
sections/<sectionSlug>/<carouselSlug>/
  index.ts                         # defineCarousel
  <imageSlideSlug>/
    index.ts                       # defineImage with fileName
    specification.md               # media handoff, if supplied
  <sceneSlideSlug>/
    index.ts                       # defineScene
    specification.md               # Scene handoff, if supplied
```

- Physical images are **textbook-wide**, under
  `content/<book>/assets/images/<UUID>.<extension>`, not beside their
  Configurator module. A single resource may be reused across slides,
  Sections, Lessons and locales; no per-locale binary directory is required.
- Technical `lesson.yaml` omits `locale.fileName` for Image slides.
  Lesson Builder generates a reserved Nil UUID placeholder plus `TODO(asset)`
  in TypeScript. A media specialist later replaces that reference and
  supplies the real binary.
- The Lesson Props publisher projects local UUID filenames to
  `/textbooks/<book>/assets/images/<UUID>.<extension>` URLs. Draft permits
  missing/Nil media with warnings; Production rejects unresolved references.
- Markdown/Code source files and executable Scene implementations keep
  their independent module-local and Scene-registry contracts.

## Runtime and accessibility

UI Kit dispatches each slide by child `type`: Image children use the Image
widget, while Scene children use the shared Scene registry/context. The
implemented interactive Scene behavior prevents swipe/autoplay from
silently replacing an active interactive Scene; image-only slides retain
Carousel controls and transitions.

Preserve keyboard, touch, RTL, focus management, reduced motion, fullscreen
and accessible labels when editing the renderer. Component tests and
Storybook are useful evidence, but are not a replacement for checking
actual production Scene implementations and accessibility.

## Verification boundaries

Keep regression coverage for discriminated Image/Scene children, ordered
collections, localized Props and overrides, nested Lesson module placement,
source-only `SKIP` behavior, media URL publication and runtime dispatch.
Unfinished generated TypeScript is an intentional draft handoff; the
scaffolder must not fabricate missing binaries or Scene implementations.

Course-specific authoring and runtime work remain separate from Lesson
Builder media publication and must not be inferred from this contract.
