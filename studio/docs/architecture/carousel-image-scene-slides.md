# Carousel Image/Scene slides in typed Lesson source

**Current contract:** `defineCarousel` accepts `defineImage` and `defineScene` children
in `slides: { items, order }`. The former `defineCarouselSlide` configurator
and colocated binary media are retired. See the
[typed Carousel source materializer](../../../shared/engine/generators/materializers/carousel/README.md)
and [textbook asset packaging guide](../../../scripts/textbook-tooling/buildTextbook/README.md)
for executable behavior. [PR #557](https://github.com/KiT-Maverik/svitlo/pull/557)
records a historical layout prototype, not a current source template.

## Authored and generated structure

- `slides.items` maps authored camelCase slugs to full Image or Scene
  configurators; `slides.order` fixes the sequence. Build Props preserve each
  child's identity, type and runtime data.
- The typed Stage 6.1 Lesson materializer places each child module directly beneath the Carousel
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
- Typed Stage 2 Image-slide configuration and `production` specifications retain media requirements. The concrete Image materializer may emit a visibly blocked Nil UUID / `TODO(asset)` reference when an approved physical file has not been supplied; it is never a real asset or publication-ready value. A media specialist later supplies and verifies the real UUID-named binary.
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
source-transaction create-only/no-clobber behavior, media URL publication and runtime dispatch.
Unfinished generated TypeScript is an intentional reviewed-source handoff; the
materializer must not fabricate missing binaries or Scene implementations.

Course-specific authoring and runtime work remain separate from typed Lesson
source materialization and Props media publication.
