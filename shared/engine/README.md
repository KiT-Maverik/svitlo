# Svitlo Engine

Framework-agnostic builders, generators, validators, and shared localized assessment-method data.

- `@svitlo/engine/builders` — data builders and validation
- `@svitlo/engine/taxonomy` — taxonomy builders and validators
- `@svitlo/engine/localization` — locale resolution and localized file paths
- `@svitlo/engine/assessment-methods` — the canonical 16 localized Assessment Method descriptors
- `examples/createDynamicQuestion.example.ts` — non-production example for type exploration

Content and taxonomy **types**, locale declarations and stable Assessment Method IDs live in
`@svitlo/contracts`; Math and Playground must not duplicate Engine utilities.


## Content block authoring builder

Use one discriminated factory for authored content-block Data, except Scenes
(deferred until the Scene contract refactor):

    import { createContentBlock } from '@svitlo/engine/builders';

    export const introduction = createContentBlock({
      type: 'markdown',
      id: 'intro-uuid',
      slug: 'introduction',
      locales: { language: 'en', value: '# Introduction' },
    });

    const response = introduction.build('en');
    const disabled = introduction.disable().build('en'); // undefined

The factory infers the Data and Response variants from type. Each block
has withConfig(patch), disable(), and build(languageCode). Overrides return
independent builders and are limited to block-specific presentation or behavior,
never IDs, slugs, localized content, or Quiz questions/screens. Blocks without
configurable fields reject withConfig() at the type level.

build() requires an explicit language code, honoring single-locale and
fallback dictionaries. Missing locales throw. locale.isFallback indicates
at least one localized field used fallback.

Quiz blocks publish ordered question slugs and convert nested screens. Checkpoints
convert nested answers. File-backed Code blocks read the localized fileLocation
at build time: paths must be readable from the publisher's working directory
(or absolute). Scenes are deliberately unsupported by this builder, including
when nested in another content block.

Builder objects are authoring-only; published JSON contains Response data.
Future Section and Lesson builders can call child build(languageCode) and
omit disabled results, independently of this builder.


## Section Builder and ordering

Sections hold live, reusable Content Block Builder instances in their authoring
catalog, grouped by block kind and then alias:

    const section = createSection({
      id: 'uuid', slug: 'theory', type: 'theory',
      title: { language: 'en', value: 'Theory' },
      navigationLabel: { language: 'en', value: 'Theory' },
      content: { markdown: { intro }, text: { task } },
    });

    const customized = section
      .updateBlock('text', 'task', builder => builder.disable())
      .setOrder(['text.task', 'markdown.intro']);
    const response = customized.build('uk');

Type-safe setOrder() accepts `type.alias` paths and prioritizes them; omitted
blocks are appended in declaration order. setOrder([]) restores the default order.
Unknown paths and duplicate entries are rejected. The authoring content catalog
can contain the same alias under different block types.

addBlock(type, alias, childBuilder) inserts a new builder and extends available
setOrder paths. updateBlock(type, alias, callback) applies a child builder's
immutable API to a new Section; directly invoking an immutable child method
without storing the returned builder does not modify its parent Section.
withConfig() overrides Section presentation metadata; disable() suppresses
the entire Section Response.

build(languageCode) generates a **flat, ordered array of content responses**,
omits disabled children, and retains no separate order metadata. This is an
intentional breaking change to the Section Response contract, not a legacy
compatibility adapter. Scenes remain excluded from the builder until refactored.
