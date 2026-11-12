import type { DeepPartial, ChildrenSupporting } from '#types';
import type { LanguageCodes } from '#schemas';
import { mergeForValidation, validateOrderedKeys, validateSluggedConfiguratorMap } from '../../_shared__configurators';
import { contentBlockTypes } from '../../contentBlocks/contentBlock.constants';
import type { ContentBlock_Configurator } from '../../contentBlocks';
import { text_Props_Schema } from '../../contentBlocks/defineText';
import { markdown_Props_Schema } from '../../contentBlocks/defineMarkdown';
import { code_Props_Schema } from '../../contentBlocks/defineCode';
import { image_Props_Schema } from '../../contentBlocks/defineImage';
import { video_Props_Schema } from '../../contentBlocks/defineVideo';
import { audio_Props_Schema } from '../../contentBlocks/defineAudio';
import { youtube_Props_Schema } from '../../contentBlocks/defineYoutube';
import { carousel_Props_Schema } from '../../contentBlocks/defineCarousel';
import { checkpoint_Props_Schema } from '../../contentBlocks/defineCheckpoint';
import { scene_Props_Schema } from '../../contentBlocks/defineScene';

type Block = ContentBlock_Configurator;
type Fragment = Record<string, unknown>;
type Files<T> = Partial<Record<LanguageCodes, T>>;
type BlockResource = { base: Fragment; locale: Files<Fragment> | undefined };
type BlockPatch = { base: DeepPartial<Fragment>; locale: Files<Fragment> | undefined };

export type OrderedBlocks<Child = Block> = {
  items: Record<string, Child>;
  order: string[];
};
export type OrderedBlockPatch<
  Children extends Record<string, Block> = Record<string, Block>,
  Added extends Record<string, Block> = {},
  Languages extends readonly LanguageCodes[] = [],
> = {
  items?: { [Key in keyof Children]?: Parameters<Children[Key]['build']['overrides']>[0] | false };
  additionalItems?: Added &
    ChildrenSupporting<Languages, Added> & {
      [Key in keyof Children]?: never;
    };
  order?: Extract<keyof Children | keyof NoInfer<Added>, string>[];
};
/** Broad internal runtime input; public OrderedBlockPatch retains literal key and language inference. */
export type ResolvableBlockPatch = {
  items?: Record<string, unknown>;
  additionalItems?: Record<string, unknown>;
  order?: string[];
};
export type QuestionCommonContent<Child = Block> = {
  question: OrderedBlocks<Child>;
  hint?: OrderedBlocks<Child>;
  explanation?: OrderedBlocks<Child>;
};
export type QuestionCommonPatch<
  Content extends QuestionCommonContent,
  Added extends Record<string, Block> = {},
  Languages extends readonly LanguageCodes[] = [],
> = {
  question?: OrderedBlockPatch<Content['question']['items'], Added, Languages>;
  hint?: OrderedBlockPatch<NonNullable<Content['hint']>['items'], Added, Languages>;
  explanation?: OrderedBlockPatch<NonNullable<Content['explanation']>['items'], Added, Languages>;
};

export type ResolvedCollection<T> = { base: T; locale: Files<T> };
export type ComposedContent = {
  base: Record<string, unknown>;
  locale: Files<Record<string, unknown>>;
};

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** A selected scoring block must remain usable after its child overrides are applied. */
export const isEnabledBlock = (value: unknown): boolean =>
  isRecord(value) && isRecord(value.params) && value.params.disabled !== true;

export const assertEnabledBlock = (value: unknown, path: string): void => {
  if (!isEnabledBlock(value)) throw new Error(path + ' must be an enabled ContentBlock');
};

export const cloneJson = <T>(value: T): T => structuredClone(value);

/** Snapshot only the collection map/order; children stay independent configurator references. */
export const snapshotBlockCollection = <T>(value: OrderedBlocks<T>): OrderedBlocks<T> => ({
  items: { ...value.items },
  order: [...value.order],
});

export const snapshotCommonContent = <C extends QuestionCommonContent>(value: C): C =>
  ({
    ...value,
    question: snapshotBlockCollection(value.question),
    ...(value.hint !== undefined ? { hint: snapshotBlockCollection(value.hint) } : {}),
    ...(value.explanation !== undefined ? { explanation: snapshotBlockCollection(value.explanation) } : {}),
  }) as C;

export function validateBlock(child: unknown, key: string): asserts child is Block {
  const errors = validateSluggedConfiguratorMap({ [key]: child }, contentBlockTypes, {
    path: 'items',
    itemLabel: 'ContentBlock',
  });
  if (errors.length) throw new Error(errors.map(issue => issue.message).join('; '));
  if (
    !isRecord(child) ||
    !isRecord(child.config) ||
    !isRecord(child.config.base) ||
    child.config.base.slug !== key ||
    child.config.base.id !== child.id ||
    child.config.base.type !== child.type ||
    !isRecord(child.build) ||
    typeof child.build.props !== 'function' ||
    typeof child.build.overrides !== 'function'
  ) {
    throw new Error('Invalid ContentBlock identity or Build API: ' + key);
  }
}

export function validateBlockCollection(value: unknown, path: string, nonEmpty = false): void {
  const errors = validateOrderedKeys(value, { path, requireNonEmpty: nonEmpty });
  if (errors.length) throw new Error(errors.map(issue => issue.path + ': ' + issue.message).join('; '));
  if (!isRecord(value) || !isRecord(value.items)) return;
  for (const [key, child] of Object.entries(value.items)) validateBlock(child, key);
}

export const validateCommonContent = (content: QuestionCommonContent): void => {
  validateBlockCollection(content?.question, 'content.question', true);
  if (content.hint !== undefined) validateBlockCollection(content.hint, 'content.hint');
  if (content.explanation !== undefined) validateBlockCollection(content.explanation, 'content.explanation');
};

/** ContentBlocks have a first-class selected-language Build API; no transition adapter. */
const readResource = (child: Block, languages: readonly LanguageCodes[]): BlockResource =>
  cloneJson(child.build.props({ languages }) as BlockResource);
const readPatch = (child: Block, patch: unknown, languages: readonly LanguageCodes[]): BlockPatch =>
  cloneJson((child.build.overrides as (value: never, options: { languages: readonly LanguageCodes[] }) => BlockPatch)(patch as never, { languages }));

const propsSchemas: Record<string, { parse: (value: unknown) => unknown }> = {
  text: text_Props_Schema,
  markdown: markdown_Props_Schema,
  code: code_Props_Schema,
  image: image_Props_Schema,
  video: video_Props_Schema,
  audio: audio_Props_Schema,
  youtube: youtube_Props_Schema,
  carousel: carousel_Props_Schema,
  checkpoint: checkpoint_Props_Schema,
  scene: scene_Props_Schema,
};
const validateChildPublication = (value: Fragment, language: LanguageCodes): void => {
  const schema = propsSchemas[value.type as string];
  if (!schema) throw new Error('Unknown ContentBlock publication type: ' + String(value.type));
  try {
    schema.parse(value);
  } catch (error) {
    throw new Error(
      'Invalid ContentBlock publication for ' +
        language +
        ' (' +
        String(value.slug) +
        '): ' +
        (error instanceof Error ? error.message : String(error)),
      { cause: error },
    );
  }
};

/** Resolve a child without allowing an override to mutate its authored resource. */
export const resolveChild = (child: Block, languages: readonly LanguageCodes[], patch?: unknown) => {
  const original = readResource(child, languages);
  const builtPatch = patch === undefined ? undefined : readPatch(child, patch, languages);
  const base = builtPatch ? mergeForValidation(cloneJson(original.base), builtPatch.base) : cloneJson(original.base);
  const locale: Files<Fragment> = {};
  for (const language of languages) {
    const translated = mergeForValidation(cloneJson(original.base), original.locale?.[language] ?? {});
    const withPatchBase = mergeForValidation(translated, builtPatch?.base ?? {});
    const effective = mergeForValidation(withPatchBase, builtPatch?.locale?.[language] ?? {});
    validateChildPublication(effective, language);
    if (original.locale?.[language] !== undefined || builtPatch?.locale?.[language] !== undefined) {
      locale[language] = effective;
    }
  }
  return { base, locale };
};

/**
 * Ordered collection validation and full-array replacement.
 * This helper performs only ContentBlock child composition, not entity lifecycle.
 */
export const resolveBlockCollection = (
  source: OrderedBlocks,
  languages: readonly LanguageCodes[],
  patch?: ResolvableBlockPatch,
  path = 'content',
  nonEmpty = false,
): ResolvedCollection<Fragment[]> & { order: string[] } => {
  validateBlockCollection(source, path, nonEmpty);
  if (patch !== undefined && !isRecord(patch)) throw new Error(path + ' override must be an object');
  for (const key of Object.keys(patch ?? {})) {
    if (!['items', 'additionalItems', 'order'].includes(key))
      throw new Error('Unknown ' + path + ' override field: ' + key);
  }
  const changes = patch?.items ?? {};
  const additions = patch?.additionalItems ?? {};
  if (!isRecord(changes) || !isRecord(additions)) throw new Error(path + ' items must be slug-keyed objects');
  const items: Record<string, Block | false> = { ...source.items };
  const childPatches: Record<string, unknown> = {};
  let structural = Object.keys(additions).length > 0;
  for (const [key, child] of Object.entries(additions)) {
    if (Object.hasOwn(items, key)) throw new Error('Duplicate ' + path + ' slug: ' + key);
    validateBlock(child, key);
    items[key] = child;
  }
  for (const [key, change] of Object.entries(changes)) {
    if (!Object.hasOwn(source.items, key)) throw new Error('Unknown existing ' + path + ' slug: ' + key);
    if (change === false) {
      items[key] = false;
      structural = true;
    } else {
      if (!isRecord(change)) throw new Error('Invalid child override at ' + path + '.' + key);
      childPatches[key] = change;
    }
  }
  if (structural && patch?.order === undefined) throw new Error(path + '.order is required when changing members');
  const order = patch?.order ?? source.order;
  const errors = validateOrderedKeys({ items, order }, { path, allowDisabled: true, requireNonEmpty: nonEmpty });
  if (errors.length) throw new Error(errors.map(issue => issue.path + ': ' + issue.message).join('; '));
  if (nonEmpty && order.length === 0) throw new Error(path + ' must contain at least one active item');
  const entries = order.map(key => resolveChild(items[key] as Block, languages, childPatches[key]));
  if (nonEmpty && entries.every(entry => isRecord(entry.base.params) && entry.base.params.disabled === true)) {
    throw new Error(path + ' must contain an enabled ContentBlock');
  }
  const locale: Files<Fragment[]> = {};
  for (const entry of entries) {
    for (const language of Object.keys(entry.locale)) {
      const code = language as LanguageCodes;
      locale[code] ??= [];
    }
  }
  for (const language of Object.keys(locale) as LanguageCodes[]) {
    locale[language] = entries.map(entry => cloneJson(entry.locale[language] ?? entry.base));
  }
  return { base: entries.map(entry => entry.base), locale, order: [...order] };
};

export const resolveBlockMap = (
  source: OrderedBlocks,
  languages: readonly LanguageCodes[],
  patch?: ResolvableBlockPatch,
  path = 'content',
): ResolvedCollection<Record<string, Fragment>> => {
  const result = resolveBlockCollection(source, languages, patch, path);
  const base: Record<string, Fragment> = {};
  const locale: Files<Record<string, Fragment>> = {};
  result.order.forEach((key, index) => {
    base[key] = result.base[index];
    for (const language of Object.keys(result.locale) as LanguageCodes[]) {
      (locale[language] ??= {})[key] = result.locale[language]![index];
    }
  });
  return { base, locale };
};

export const resolveCommonContent = (
  source: QuestionCommonContent,
  languages: readonly LanguageCodes[],
  patch?: { question?: ResolvableBlockPatch; hint?: ResolvableBlockPatch; explanation?: ResolvableBlockPatch },
): ComposedContent => {
  if (patch !== undefined && !isRecord(patch)) throw new Error('content must be an object');
  const base: Record<string, unknown> = {};
  const locale: Files<Record<string, unknown>> = {};
  for (const field of ['question', 'hint', 'explanation'] as const) {
    if (patch && patch[field] === undefined) continue;
    const original = source[field] ?? { items: {}, order: [] };
    if (!patch && field !== 'question' && source[field] === undefined) continue;
    const result = resolveBlockCollection(
      original,
      languages,
      patch?.[field],
      'content.' + field,
      field === 'question',
    );
    base[field] = result.base;
    for (const [language, translated] of Object.entries(result.locale)) {
      (locale[language as LanguageCodes] ??= {})[field] = translated;
    }
  }
  return { base, locale };
};

export const addContentLocales = (
  files: Files<Record<string, unknown>>,
  field: string,
  translations: Files<unknown>,
): void => {
  for (const [language, translated] of Object.entries(translations)) {
    (files[language as LanguageCodes] ??= {}).content ??= {};
    const content = files[language as LanguageCodes]!.content as Record<string, unknown>;
    content[field] = cloneJson(translated);
  }
};

export const mergeContentFiles = (target: Files<Record<string, unknown>>, content: ComposedContent): void => {
  for (const [language, fields] of Object.entries(content.locale)) {
    (target[language as LanguageCodes] ??= {}).content = cloneJson(fields);
  }
};
