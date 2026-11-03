import type { ContentBlock, Section, Section_Type } from '@svitlo/contracts/content';
import type { LanguageCode } from '../../types/languages';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../types/languages';
import { localizeLessonValue } from '../generators/lessons/localizeLessonData.utils';
import type { BuildableContentBlockType, ContentBlockBuilder } from './createContentBlock.utils';

/** Authoring Section content is a catalog of builders, never built Responses. */
export type SectionContentBuilders = {
  readonly [Type in BuildableContentBlockType]?: Readonly<Record<string, ContentBlockBuilder<Type>>>;
};

export type SectionBuilderConfig = Omit<Section<'data'>, 'content'>;
export type SectionBuilderConfigPatch = Partial<
  Pick<SectionBuilderConfig, 'title' | 'navigationLabel' | 'skippable'>
>;

type JoinPath<Type extends string, Alias extends string> = `${Type}.${Alias}`;

/** A dot-qualified path; duplicate aliases across different block types are valid. */
export type SectionBlockPath<Content extends SectionContentBuilders> = {
  [Type in Extract<keyof Content, BuildableContentBlockType>]:
    JoinPath<Type, Extract<keyof NonNullable<Content[Type]>, string>>;
}[Extract<keyof Content, BuildableContentBlockType>];

type WithAddedBlock<
  Content extends SectionContentBuilders,
  Type extends BuildableContentBlockType,
  Alias extends string,
> = Omit<Content, Type> & {
  readonly [Key in Type]: (
    Key extends keyof Content ? NonNullable<Content[Key]> : object
  ) & Readonly<Record<Alias, ContentBlockBuilder<Type>>>;
};

export interface SectionBuilder<Content extends SectionContentBuilders> {
  /** Read the precise nested builder by its type and alias. */
  readonly content: Readonly<Content>;

  /** Create an independent Section with changed display/behavior configuration. */
  withConfig(patch: SectionBuilderConfigPatch): SectionBuilder<Content>;

  /**
   * Place listed type.alias paths first. Omitted blocks retain insertion order
   * after them. An empty list resets the order to its default.
   */
  setOrder(order: readonly SectionBlockPath<Content>[]): SectionBuilder<Content>;

  /** Add a new, unbuilt content block under an unambiguous alias. */
  addBlock<const Type extends BuildableContentBlockType, const Alias extends string>(
    type: Type,
    alias: Alias,
    block: ContentBlockBuilder<Type>,
  ): SectionBuilder<WithAddedBlock<Content, Type, Alias>>;

  /** Safely apply a child builder's immutable methods inside a new Section. */
  updateBlock<
    Type extends Extract<keyof Content, BuildableContentBlockType>,
    Alias extends Extract<keyof NonNullable<Content[Type]>, string>,
  >(
    type: Type,
    alias: Alias,
    update: (block: NonNullable<Content[Type]>[Alias]) => NonNullable<Content[Type]>[Alias],
  ): SectionBuilder<Content>;

  disable(): SectionBuilder<Content>;
  /** Build a flat, ordered array of Responses, skipping disabled children. */
  build(language: LanguageCode): Section<'response'> | undefined;
}

type ChildReader = {
  readonly type: BuildableContentBlockType;
  readonly slug: string;
  build(language: LanguageCode): ContentBlock<'response'> | undefined;
};
type Entry = { path: string; type: BuildableContentBlockType; alias: string; child: ChildReader };

const languages = DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language);
const sectionTypes: readonly Section_Type[] = [
  'theory', 'practice', 'codingTask', 'learningFlow', 'quiz', 'flashcards', 'scenario',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function clone<Value>(value: Value): Value {
  if (Array.isArray(value)) return value.map(clone) as Value;
  if (isRecord(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, clone(child)])) as Value;
  }
  return value;
}

/** Copy and freeze catalog containers, not the reusable child builder instances. */
function snapshot<Content extends SectionContentBuilders>(content: Content): Content {
  const result: Record<string, unknown> = {};
  for (const [type, group] of Object.entries(content)) {
    if (!isRecord(group)) throw new TypeError('Section content group must be an object: ' + type);
    const entries: Record<string, unknown> = {};
    for (const [alias, block] of Object.entries(group)) {
      if (!isRecord(block) || block.type !== type ||
          typeof block.slug !== 'string' || typeof block.build !== 'function') {
        throw new TypeError('Invalid Section builder at ' + type + '.' + alias);
      }
      entries[alias] = block;
    }
    result[type] = Object.freeze(entries);
  }
  return Object.freeze(result) as Content;
}

function flatten(content: SectionContentBuilders): Entry[] {
  const result: Entry[] = [];
  for (const [type, group] of Object.entries(content)) {
    for (const [alias, builder] of Object.entries(group ?? {})) {
      result.push({
        type: type as BuildableContentBlockType,
        alias,
        path: type + '.' + alias,
        child: builder as ChildReader,
      });
    }
  }
  return result;
}

function makeSection<Content extends SectionContentBuilders>(
  config: SectionBuilderConfig,
  authored: Content,
  priority: readonly string[] = [],
  disabled = false,
): SectionBuilder<Content> {
  const current = clone(config);
  const content = snapshot(authored);
  if (!sectionTypes.includes(current.type)) throw new Error('Unknown Section type: ' + current.type);
  if (!current.id || !current.slug) throw new Error('Section requires id and slug');

  const result: SectionBuilder<Content> = {
    content,
    withConfig(patch) {
      if (!isRecord(patch)) throw new TypeError('Section config patch must be an object');
      for (const key of Object.keys(patch)) {
        if (!['title', 'navigationLabel', 'skippable'].includes(key)) {
          throw new TypeError('Cannot override Section configuration: ' + key);
        }
      }
      return makeSection({ ...current, ...clone(patch) }, content, priority, disabled);
    },
    setOrder(order) {
      if (!Array.isArray(order)) throw new TypeError('Section order must be an array');
      const available = new Set(flatten(content).map(entry => entry.path));
      const selected = new Set<string>();
      for (const key of order) {
        if (typeof key !== 'string' || !available.has(key)) {
          throw new Error('Unknown Section order key: ' + key);
        }
        if (selected.has(key)) throw new Error('Duplicate Section order key: ' + key);
        selected.add(key);
      }
      return makeSection(current, content, [...order], disabled);
    },
    addBlock(type, alias, block) {
      if (!alias || !block || block.type !== type) {
        throw new Error('Section block type, alias and builder must match');
      }
      if (Object.hasOwn(content[type] ?? {}, alias)) {
        throw new Error('Duplicate Section block alias: ' + type + '.' + alias);
      }
      const next = {
        ...content,
        [type]: { ...content[type], [alias]: block },
      } as WithAddedBlock<Content, typeof type, typeof alias>;
      return makeSection(current, next, priority, disabled);
    },
    updateBlock(type, alias, update) {
      const block = content[type]?.[alias];
      if (!block) throw new Error('Unknown Section block: ' + String(type) + '.' + alias);
      const updated = update(block);
      if (!updated || updated.type !== type || updated.slug !== block.slug) {
        throw new Error('Section updateBlock cannot replace block identity');
      }
      const next = {
        ...content,
        [type]: { ...content[type], [alias]: updated },
      } as Content;
      return makeSection(current, next, priority, disabled);
    },
    disable() {
      return makeSection(current, content, priority, true);
    },
    build(language) {
      if (disabled) return undefined;
      const { value, sources } = localizeLessonValue(
        { title: current.title, navigationLabel: current.navigationLabel },
        language,
        languages,
      );
      const localized = value as { title: string; navigationLabel: string };
      const fallback = Object.values(sources).some(source => source.isFallback === true);

      const entries = flatten(content);
      const byPath = new Map(entries.map(entry => [entry.path, entry]));
      const chosen = new Set(priority);
      const ordered = [
        ...priority.map(key => byPath.get(key)!),
        ...entries.filter(entry => !chosen.has(entry.path)),
      ];
      const built: ContentBlock<'response'>[] = [];
      const ids = new Set<string>();
      for (const { path, child } of ordered) {
        const response = child.build(language);
        if (response === undefined) continue;
        if (ids.has(response.id)) {
          throw new Error('Duplicate built Section block id at ' + path + ': ' + response.id);
        }
        ids.add(response.id);
        built.push(response);
      }

      return {
        id: current.id,
        slug: current.slug,
        type: current.type,
        title: localized.title,
        navigationLabel: localized.navigationLabel,
        ...(current.skippable ? { skippable: true as const } : {}),
        locale: fallback
          ? { code: language, isFallback: true as const }
          : { code: language },
        content: built,
      };
    },
  };
  return Object.freeze(result);
}

/** Create an independent authoring Section from typed child builders. */
export function createSection<const Content extends SectionContentBuilders>(
  config: SectionBuilderConfig & { content: Content },
): SectionBuilder<Content> {
  const { content, ...meta } = config;
  return makeSection(meta, content);
}
