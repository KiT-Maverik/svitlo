import type {
  ContentBlock,
  ContentBlock_Scene,
  Course_ContentSource,
  Course_LessonOverride,
  Course_LessonAuthoringOverride,
  Course_SectionChanges,
  Course_BlockChanges,
  DefaultLessonEvent,
  Lesson,
  LessonEventOverrides,
  Lesson_Override,
  Locale_Languages,
  Section,
  Section_Override,
} from '@svitlo/contracts/content';

// Use Lesson's canonical data shape without narrowing its custom event keys.
// A Lesson may declare only custom reactions, with no standard event handlers.
type AnyLesson = Omit<Lesson<'data', any, never>, 'events'> & { events?: unknown };
type AnySection = Section<'data', any>;
type AnyBlock = ContentBlock<'data', any>;

type LanguagesOf<L extends AnyLesson> = L['parameters']['languages'] extends Locale_Languages
  ? L['parameters']['languages']
  : never;
type SectionSlug<Sections extends readonly AnySection[]> = Sections[number]['slug'];
type SectionFor<Sections extends readonly AnySection[], Slug extends string> = Extract<
  Sections[number],
  { slug: Slug }
>;
type BlocksOf<S extends AnySection> = S extends { content: infer Blocks extends readonly AnyBlock[] }
  ? Blocks
  : readonly never[];
type BlockSlug<S extends AnySection> = BlocksOf<S>[number]['slug'];
type BlockFor<S extends AnySection, Slug extends string> = Extract<BlocksOf<S>[number], { slug: Slug }>;
type SlugOf<Item> = Item extends string ? Item : Item extends { slug: infer S extends string } ? S : never;
type SlugsOf<Items extends readonly unknown[]> = SlugOf<Items[number]>;

type DuplicateSlugs<Items extends readonly unknown[], Seen extends string = never> = Items extends readonly [
  infer Head,
  ...infer Tail,
]
  ? SlugOf<Head> extends Seen
    ? SlugOf<Head>
    : DuplicateSlugs<Tail, Seen | SlugOf<Head>>
  : never;

/** Compile-time full order and duplicate detection for literal tuples. Runtime checks all inputs. */
type CheckOrder<Current extends string, Items extends readonly unknown[]> = string extends Current
  ? // A widened string slug union cannot be exhaustively checked at compile time.
    // assertAllIncluded() still validates the complete order at runtime.
    [DuplicateSlugs<Items>] extends [never]
    ? unknown
    : { readonly __duplicateSlugs: DuplicateSlugs<Items> }
  : [Exclude<Current, SlugsOf<Items>>] extends [never]
    ? [DuplicateSlugs<Items>] extends [never]
      ? unknown
      : { readonly __duplicateSlugs: DuplicateSlugs<Items> }
    : { readonly __missingSlugs: Exclude<Current, SlugsOf<Items>> };

type OrderedSections<Old extends readonly AnySection[], Items extends readonly unknown[]> = {
  readonly [Index in keyof Items]: Items[Index] extends string ? SectionFor<Old, Items[Index]> : Items[Index];
} & readonly AnySection[];
type OrderedBlocks<Old extends AnySection, Items extends readonly unknown[]> = {
  readonly [Index in keyof Items]: Items[Index] extends string ? BlockFor<Old, Items[Index]> : Items[Index];
} & readonly AnyBlock[];
type DropSection<Sections extends readonly AnySection[], Slug extends string> = readonly Exclude<
  Sections[number],
  { slug: Slug }
>[];
type UpdatedSectionContent<
  Sections extends readonly AnySection[],
  Slug extends string,
  Content extends readonly AnyBlock[],
> = readonly (Sections[number] extends infer S
  ? S extends AnySection
    ? S['slug'] extends Slug
      ? Omit<S, 'content'> & { readonly content: Content }
      : S
    : never
  : never)[];
type DropBlock<S extends AnySection, Slug extends string> = readonly Exclude<BlocksOf<S>[number], { slug: Slug }>[];

type EditableBlock<Block extends AnyBlock, L extends AnyLesson> = Partial<
  Omit<Extract<ContentBlock<'data', LanguagesOf<L>>, { type: Block['type'] }>, 'id' | 'slug' | 'type'>
>;
type EditableSection<L extends AnyLesson> = Omit<Section_Override<LanguagesOf<L>>, 'content'>;
type EventsOf<L extends AnyLesson> = DefaultLessonEvent | Extract<keyof NonNullable<L['events']>, string>;
type CustomEventsOf<L extends AnyLesson> = Exclude<EventsOf<L>, DefaultLessonEvent>;
type EventChanges<L extends AnyLesson> = LessonEventOverrides<CustomEventsOf<L>, LanguagesOf<L>, 'data'>;

type ContentAPI<
  L extends AnyLesson,
  Sections extends readonly AnySection[],
  SectionKey extends SectionSlug<Sections>,
> = {
  readonly bySlug: {
    readonly [BlockKey in BlockSlug<SectionFor<Sections, SectionKey>>]: {
      set(
        patch: EditableBlock<BlockFor<SectionFor<Sections, SectionKey>, BlockKey>, L>,
      ): LessonOverridesBuilder<L, Sections>;
    };
  };
  setOrder<
    const Items extends readonly (BlockSlug<SectionFor<Sections, SectionKey>> | ContentBlock<'data', LanguagesOf<L>>)[],
  >(
    order: Items & CheckOrder<BlockSlug<SectionFor<Sections, SectionKey>>, Items>,
  ): LessonOverridesBuilder<
    L,
    UpdatedSectionContent<Sections, SectionKey, OrderedBlocks<SectionFor<Sections, SectionKey>, Items>>
  >;
  remove<const BlockKey extends BlockSlug<SectionFor<Sections, SectionKey>>>(
    slug: BlockKey,
  ): LessonOverridesBuilder<
    L,
    UpdatedSectionContent<Sections, SectionKey, DropBlock<SectionFor<Sections, SectionKey>, BlockKey>>
  >;
};

type SectionsAPI<L extends AnyLesson, Sections extends readonly AnySection[]> = {
  readonly bySlug: {
    readonly [SectionKey in SectionSlug<Sections>]: {
      set(patch: EditableSection<L>): LessonOverridesBuilder<L, Sections>;
    } & (SectionFor<Sections, SectionKey> extends { type: 'quiz' }
      ? object
      : { readonly content: ContentAPI<L, Sections, SectionKey> });
  };
  setOrder<const Items extends readonly (SectionSlug<Sections> | Section<'data', LanguagesOf<L>>)[]>(
    order: Items & CheckOrder<SectionSlug<Sections>, Items>,
  ): LessonOverridesBuilder<L, OrderedSections<Sections, Items>>;
  remove<const SectionKey extends SectionSlug<Sections>>(
    slug: SectionKey,
  ): LessonOverridesBuilder<L, DropSection<Sections, SectionKey>>;
};

type Source = Course_ContentSource;
type SectionEntry = {
  section: AnySection;
  source: Source;
  blockSources: Readonly<Record<string, Source>>;
};
type State = {
  sections: readonly SectionEntry[];
  title?: unknown;
  parameters?: { sections?: Record<string, boolean> };
  events?: Record<string, ContentBlock_Scene<'data', any> | false>;
  sectionsChanged: boolean;
};

function assertUnique<T extends { slug: string; id: string }>(items: readonly T[], label: string): void {
  const slugs = new Set<string>();
  const ids = new Set<string>();
  for (const item of items) {
    if (!item.slug || !item.id || slugs.has(item.slug) || ids.has(item.id)) {
      throw new Error(`Duplicate or missing ${label} slug/id: ${item.slug}`);
    }
    slugs.add(item.slug);
    ids.add(item.id);
  }
}

function assertAllIncluded(
  items: readonly { slug: string }[],
  known: readonly { slug: string }[],
  label: string,
): void {
  const included = new Set(items.map(item => item.slug));
  for (const item of known) {
    if (!included.has(item.slug)) throw new Error(`Missing ${label}: ${item.slug}; remove it explicitly first`);
  }
}

/** Object fields are sparse; arrays are indivisible values, never merged by indexes. */
function diffValue(previous: unknown, current: unknown): unknown {
  if (JSON.stringify(previous) === JSON.stringify(current)) return undefined;
  if (
    previous &&
    current &&
    typeof previous === 'object' &&
    typeof current === 'object' &&
    !Array.isArray(previous) &&
    !Array.isArray(current)
  ) {
    const before = previous as Record<string, unknown>;
    const after = current as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(after)) {
      const difference = diffValue(before[key], value);
      if (difference !== undefined) result[key] = difference;
    }
    return Object.keys(result).length ? result : undefined;
  }
  return current;
}

function diffContent<Languages extends Locale_Languages>(
  original: readonly AnyBlock[],
  current: readonly AnyBlock[],
  sources: Readonly<Record<string, Source>>,
): Course_BlockChanges<Languages> | undefined {
  const originalBySlug = new Map(original.map(block => [block.slug, block]));
  const currentBySlug = new Map(current.map(block => [block.slug, block]));
  const patch: Course_BlockChanges<Languages> = {};
  if (original.map(block => block.slug).join('\u0000') !== current.map(block => block.slug).join('\u0000')) {
    patch.order = current.map(block => block.slug);
  }
  const added = current.filter(block => !originalBySlug.has(block.slug));
  if (added.length) {
    for (const block of added) {
      if (sources[block.slug]?.type !== 'course') {
        throw new Error(`New ContentBlock ${block.slug} must belong to Course`);
      }
    }
    patch.added = added.map(block => ({
      block: block as ContentBlock<'data', Languages>,
      source: { type: 'course' as const },
    }));
  }
  const removed = original.filter(block => !currentBySlug.has(block.slug)).map(block => block.slug);
  if (removed.length) patch.removed = removed;
  const bySlug: Record<string, Record<string, unknown>> = {};
  for (const block of current) {
    const base = originalBySlug.get(block.slug);
    if (!base) continue;
    if (base.id !== block.id || base.type !== block.type) {
      throw new Error(`Cannot replace ContentBlock identity: ${block.slug}`);
    }
    const fields: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(block)) {
      if (['id', 'slug', 'type'].includes(key)) continue;
      if (JSON.stringify((base as Record<string, unknown>)[key]) !== JSON.stringify(value)) {
        // Whole property values stay valid authored data (including locale maps).
        // Deep merge is performed later by the publisher.
        fields[key] = value;
      }
    }
    if (Object.keys(fields).length) bySlug[block.slug] = fields;
  }
  if (Object.keys(bySlug).length) {
    patch.bySlug = bySlug as unknown as Course_BlockChanges<Languages>['bySlug'];
  }
  return Object.keys(patch).length ? patch : undefined;
}

function blocksAsSources(section: AnySection, source: Source): Readonly<Record<string, Source>> {
  if (section.type === 'quiz') return {};
  assertUnique(section.content, `ContentBlock in ${section.slug}`);
  return Object.fromEntries(section.content.map(block => [block.slug, source]));
}

/**
 * Immutable build-time API. Every edit returns a new builder, preserving the
 * original Lesson and all its Definitions. The builder is never serialized;
 * build() produces the authored Course entry instead.
 */
export class LessonOverridesBuilder<L extends AnyLesson, Sections extends readonly AnySection[] = L['sections']> {
  constructor(
    private readonly lesson: L,
    private readonly state: State,
  ) {}

  private next<NextSections extends readonly AnySection[]>(state: State): LessonOverridesBuilder<L, NextSections> {
    return new LessonOverridesBuilder<L, NextSections>(this.lesson, state);
  }

  setTitle(title: NonNullable<Lesson_Override<LanguagesOf<L>>['title']>): LessonOverridesBuilder<L, Sections> {
    return this.next<Sections>({ ...this.state, title });
  }

  setParams(
    parameters: NonNullable<Lesson_Override<LanguagesOf<L>>['parameters']>,
  ): LessonOverridesBuilder<L, Sections> {
    const previous = this.state.parameters?.sections ?? {};
    return this.next<Sections>({
      ...this.state,
      parameters: { sections: { ...previous, ...parameters.sections } },
    });
  }

  setEvents(events: EventChanges<L>): LessonOverridesBuilder<L, Sections> {
    return this.next<Sections>({
      ...this.state,
      events: { ...this.state.events, ...events } as State['events'],
    });
  }

  get sections(): SectionsAPI<L, Sections> {
    const bySlug = Object.fromEntries(
      this.state.sections.map(({ section }) => [
        section.slug,
        {
          set: (patch: EditableSection<L>) => this.setSection(section.slug, patch),
          ...(section.type === 'quiz'
            ? {}
            : {
                content: {
                  bySlug: Object.fromEntries(
                    section.content.map(block => [
                      block.slug,
                      { set: (patch: Record<string, unknown>) => this.setBlock(section.slug, block.slug, patch) },
                    ]),
                  ),
                  setOrder: (order: readonly (string | AnyBlock)[]) => this.orderBlocks(section.slug, order),
                  remove: (slug: string) => this.removeBlock(section.slug, slug),
                },
              }),
        },
      ]),
    );
    return {
      bySlug,
      setOrder: (order: readonly (string | AnySection)[]) => this.orderSections(order),
      remove: (slug: string) => this.removeSection(slug),
    } as unknown as SectionsAPI<L, Sections>;
  }

  private sectionEntry(slug: string): SectionEntry {
    const section = this.state.sections.find(entry => entry.section.slug === slug);
    if (!section) throw new Error(`Unknown Section: ${slug}`);
    return section;
  }

  private replaceSection(slug: string, patch: (entry: SectionEntry) => SectionEntry): LessonOverridesBuilder<L, any> {
    const sections = this.state.sections.map(entry => (entry.section.slug === slug ? patch(entry) : entry));
    return this.next({ ...this.state, sections, sectionsChanged: true });
  }

  private setSection(slug: string, patch: EditableSection<L>): LessonOverridesBuilder<L, Sections> {
    for (const key of Object.keys(patch)) {
      if (!['title', 'navigationLabel', 'skippable'].includes(key)) {
        throw new Error(`Cannot override Section field: ${key}`);
      }
    }
    return this.replaceSection(slug, entry => {
      const section = { ...entry.section, ...patch } as AnySection;
      return { ...entry, section };
    }) as LessonOverridesBuilder<L, Sections>;
  }

  private setBlock(
    sectionSlug: string,
    blockSlug: string,
    patch: Record<string, unknown>,
  ): LessonOverridesBuilder<L, Sections> {
    for (const key of Object.keys(patch)) {
      if (['id', 'slug', 'type'].includes(key)) {
        throw new Error(`Cannot override ContentBlock identity: ${key}`);
      }
    }
    return this.replaceSection(sectionSlug, entry => {
      if (entry.section.type === 'quiz') throw new Error(`Quiz Section has no ContentBlocks: ${sectionSlug}`);
      if (!entry.section.content.some(block => block.slug === blockSlug)) {
        throw new Error(`Unknown ContentBlock: ${blockSlug}`);
      }
      const content = entry.section.content.map(block =>
        block.slug === blockSlug ? ({ ...block, ...patch } as AnyBlock) : block,
      );
      return { ...entry, section: { ...entry.section, content } };
    }) as LessonOverridesBuilder<L, Sections>;
  }

  private orderSections(order: readonly (string | AnySection)[]): LessonOverridesBuilder<L, any> {
    const lookup = new Map(this.state.sections.map(entry => [entry.section.slug, entry]));
    const sections = order.map(item => {
      if (typeof item === 'string') {
        const found = lookup.get(item);
        if (!found) throw new Error(`Unknown Section: ${item}`);
        return found;
      }
      if (lookup.has(item.slug)) throw new Error(`Use a slug to move existing Section: ${item.slug}`);
      const source: Source = { type: 'course' };
      return { section: item, source, blockSources: blocksAsSources(item, source) };
    });
    assertAllIncluded(
      sections.map(entry => entry.section),
      this.state.sections.map(entry => entry.section),
      'Section',
    );
    assertUnique(
      sections.map(entry => entry.section),
      'Section',
    );
    return this.next({ ...this.state, sections, sectionsChanged: true });
  }

  private removeSection(slug: string): LessonOverridesBuilder<L, any> {
    this.sectionEntry(slug);
    return this.next({
      ...this.state,
      sections: this.state.sections.filter(entry => entry.section.slug !== slug),
      sectionsChanged: true,
    });
  }

  private orderBlocks(sectionSlug: string, order: readonly (string | AnyBlock)[]): LessonOverridesBuilder<L, any> {
    return this.replaceSection(sectionSlug, entry => {
      if (entry.section.type === 'quiz') throw new Error(`Quiz Section has no ContentBlocks: ${sectionSlug}`);
      const lookup = new Map(entry.section.content.map(block => [block.slug, block]));
      const blockSources = { ...entry.blockSources };
      const content = order.map(item => {
        if (typeof item === 'string') {
          const found = lookup.get(item);
          if (!found) throw new Error(`Unknown ContentBlock: ${item}`);
          return found;
        }
        if (lookup.has(item.slug)) throw new Error(`Use a slug to move existing ContentBlock: ${item.slug}`);
        blockSources[item.slug] = { type: 'course' };
        return item;
      });
      assertAllIncluded(content, entry.section.content, 'ContentBlock');
      assertUnique(content, `ContentBlock in ${sectionSlug}`);
      return { ...entry, section: { ...entry.section, content }, blockSources };
    });
  }

  private removeBlock(sectionSlug: string, slug: string): LessonOverridesBuilder<L, any> {
    return this.replaceSection(sectionSlug, entry => {
      if (entry.section.type === 'quiz') throw new Error(`Quiz Section has no ContentBlocks: ${sectionSlug}`);
      if (!entry.section.content.some(block => block.slug === slug)) throw new Error(`Unknown ContentBlock: ${slug}`);
      const blockSources = { ...entry.blockSources };
      delete blockSources[slug];
      return {
        ...entry,
        section: { ...entry.section, content: entry.section.content.filter(block => block.slug !== slug) },
        blockSources,
      };
    });
  }

  /** Only changed authoring fields, plus explicit list operations, are emitted. */
  build(): Course_LessonAuthoringOverride<LanguagesOf<L>, CustomEventsOf<L>> {
    type Languages = LanguagesOf<L>;
    const overrides: Course_LessonOverride<Languages, CustomEventsOf<L>>['overrides'] = {};

    const titleChange = diffValue(this.lesson.title, this.state.title ?? this.lesson.title);
    if (titleChange !== undefined) {
      // Locale maps are authored as complete values, even when a subset changed.
      overrides.title = this.state.title as NonNullable<typeof overrides.title>;
    }

    const sectionParams = diffValue(this.lesson.parameters.sections, {
      ...this.lesson.parameters.sections,
      ...this.state.parameters?.sections,
    }) as Record<string, boolean> | undefined;
    if (sectionParams !== undefined) {
      overrides.parameters = { sections: sectionParams } as NonNullable<typeof overrides.parameters>;
    }

    const eventsChange = diffValue(this.lesson.events ?? {}, {
      ...((this.lesson.events ?? {}) as Record<string, unknown>),
      ...(this.state.events ?? {}),
    });
    if (eventsChange && typeof eventsChange === 'object') {
      overrides.events = eventsChange as EventChanges<L>;
    }

    if (this.state.sectionsChanged) {
      const previous = this.lesson.sections;
      const current = this.state.sections;
      const previousBySlug = new Map(previous.map(section => [section.slug, section]));
      const currentBySlug = new Map(current.map(entry => [entry.section.slug, entry]));
      const patch: Course_SectionChanges<Languages> = {};

      assertUnique(
        current.map(entry => entry.section),
        'Section',
      );
      const quizzes = current.filter(entry => entry.section.type === 'quiz');
      if (quizzes.length > 1 || (this.lesson.parameters.requireQuiz && quizzes.length !== 1)) {
        throw new Error(`Invalid quiz Section count in override for Lesson ${this.lesson.id}`);
      }
      for (const { section } of current) {
        if (section.type === 'quiz') continue;
        assertUnique(section.content, `ContentBlock in ${section.slug}`);
      }

      const order = current.map(entry => entry.section.slug);
      if (previous.map(section => section.slug).join('\u0000') !== order.join('\u0000')) {
        patch.order = order;
      }
      const added = current.filter(entry => !previousBySlug.has(entry.section.slug));
      if (added.length) {
        for (const entry of added) {
          if (entry.source.type !== 'course') {
            throw new Error(`New Section ${entry.section.slug} must belong to Course`);
          }
        }
        patch.added = added.map(entry => ({
          section: (entry.section.type === 'quiz'
            ? { ...entry.section }
            : { ...entry.section, content: [...entry.section.content] }) as Section<'data', Languages>,
          source: { type: 'course' as const },
        }));
      }
      const removed = previous.filter(section => !currentBySlug.has(section.slug)).map(section => section.slug);
      if (removed.length) patch.removed = removed;

      const bySlug: Record<string, Record<string, unknown>> = {};
      for (const entry of current) {
        const initial = previousBySlug.get(entry.section.slug);
        if (!initial) continue;
        if (initial.id !== entry.section.id || initial.type !== entry.section.type) {
          throw new Error(`Cannot change Section identity: ${entry.section.slug}`);
        }
        const fields: Record<string, unknown> = {};
        for (const key of ['title', 'navigationLabel'] as const) {
          if (JSON.stringify(initial[key]) !== JSON.stringify(entry.section[key])) {
            fields[key] = entry.section[key];
          }
        }
        if (initial.skippable !== entry.section.skippable) {
          fields.skippable = entry.section.skippable === true;
        }
        if (initial.type !== 'quiz' && entry.section.type !== 'quiz') {
          const content = diffContent<Languages>(initial.content, entry.section.content, entry.blockSources);
          if (content) fields.content = content;
        }
        if (Object.keys(fields).length) bySlug[entry.section.slug] = fields;
      }
      if (Object.keys(bySlug).length) {
        patch.bySlug = bySlug as unknown as Course_SectionChanges<Languages>['bySlug'];
      }
      if (Object.keys(patch).length) overrides.sections = patch;
    }

    return {
      type: 'lessonOverride',
      lessonId: this.lesson.id,
      lesson: this.lesson as Lesson<'data', Languages, CustomEventsOf<L>>,
      overrides,
    };
  }

  getData(): Course_LessonAuthoringOverride<LanguagesOf<L>, CustomEventsOf<L>> {
    return this.build();
  }

  getContentEntries() {
    return { lessons: [this.lesson], groups: [], episodes: [], overrides: [this.build()] };
  }
}

/** Capture literal section/block slugs from authored Lesson Data, never from its Definition. */
export function createLessonOverrides<const L extends AnyLesson>(lesson: L): LessonOverridesBuilder<L, L['sections']> {
  assertUnique(lesson.sections, 'Section');
  const source: Source = { type: 'lesson', lessonId: lesson.id };
  const sections = lesson.sections.map(section => ({
    section,
    source,
    blockSources: blocksAsSources(section, source),
  }));
  return new LessonOverridesBuilder(lesson, { sections, sectionsChanged: false });
}
