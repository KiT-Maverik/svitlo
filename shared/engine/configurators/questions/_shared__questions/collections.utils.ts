import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';
import { mergeForValidation, validateOrderedKeys, validateSluggedConfiguratorMap } from '../../_shared__configurators';
import { contentBlockTypes } from '../../contentBlocks/contentBlock.constants';
import type { ContentBlock_Configurator } from '../../contentBlocks';

type Block = ContentBlock_Configurator;
type Fragment = Record<string, unknown>;
type Files<T> = Partial<Record<LanguageCodes, T>>;
type BlockResource = { base: Fragment; locale: Files<Fragment> | undefined };
type BlockPatch = { base: DeepPartial<Fragment>; locale: Files<Fragment> | undefined };

export type OrderedBlocks<Child = Block> = {
  items: Record<string, Child>;
  order: string[];
};
export type OrderedBlockPatch<Children extends Record<string, Block> = Record<string, Block>> = {
  items?: { [Key in keyof Children]?: Parameters<Children[Key]['build']['overrides']>[0] | false };
  additionalItems?: Record<string, Block>;
  order?: string[];
};
export type QuestionCommonContent<Child = Block> = {
  question: OrderedBlocks<Child>;
  hint?: OrderedBlocks<Child>;
  explanation?: OrderedBlocks<Child>;
};
export type QuestionCommonPatch<Content extends QuestionCommonContent> = {
  question?: OrderedBlockPatch<Content['question']['items']>;
  hint?: OrderedBlockPatch<NonNullable<Content['hint']>['items']>;
  explanation?: OrderedBlockPatch<NonNullable<Content['explanation']>['items']>;
};

export type ResolvedCollection<T> = { base: T; locale: Files<T> };
export type ComposedContent = {
  base: Record<string, unknown>;
  locale: Files<Record<string, unknown>>;
};

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

export const cloneJson = <T>(value: T): T => structuredClone(value);

/** Snapshot only the collection map/order; children stay independent configurator references. */
export const snapshotBlockCollection = <T>(value: OrderedBlocks<T>): OrderedBlocks<T> => ({
  items: { ...value.items },
  order: [...value.order],
});

export const snapshotCommonContent = <C extends QuestionCommonContent>(value: C): C => ({
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
    !isRecord(child) || !isRecord(child.config) || !isRecord(child.config.base) ||
    child.config.base.slug !== key || child.config.base.id !== child.id ||
    child.config.base.type !== child.type || !isRecord(child.build) ||
    typeof child.build.props !== 'function' || typeof child.build.overrides !== 'function'
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

const readResource = (child: Block): BlockResource => cloneJson(child.build.props()) as unknown as BlockResource;
const readPatch = (child: Block, patch: unknown): BlockPatch =>
  cloneJson((child.build.overrides as (input: never) => unknown)(patch as never)) as BlockPatch;

/** Resolve a child without allowing an override to mutate its authored resource. */
export const resolveChild = (child: Block, patch?: unknown) => {
  const original = readResource(child);
  const builtPatch = patch === undefined ? undefined : readPatch(child, patch);
  const base = builtPatch
    ? mergeForValidation(cloneJson(original.base), builtPatch.base)
    : cloneJson(original.base);
  const languages = new Set<LanguageCodes>();
  for (const code of Object.keys(original.locale ?? {})) languages.add(code as LanguageCodes);
  for (const code of Object.keys(builtPatch?.locale ?? {})) languages.add(code as LanguageCodes);
  const locale: Files<Fragment> = {};
  for (const language of languages) {
    const translated = mergeForValidation(cloneJson(original.base), original.locale?.[language] ?? {});
    const withPatchBase = mergeForValidation(translated, builtPatch?.base ?? {});
    locale[language] = mergeForValidation(withPatchBase, builtPatch?.locale?.[language] ?? {});
  }
  return { base, locale };
};

/**
 * Ordered collection validation and full-array replacement.
 * This helper performs only ContentBlock child composition, not entity lifecycle.
 */
export const resolveBlockCollection = (
  source: OrderedBlocks,
  patch?: OrderedBlockPatch,
  path = 'content',
  nonEmpty = false,
): ResolvedCollection<Fragment[]> & { order: string[] } => {
  validateBlockCollection(source, path, nonEmpty);
  if (patch !== undefined && !isRecord(patch)) throw new Error(path + ' override must be an object');
  for (const key of Object.keys(patch ?? {})) {
    if (!['items', 'additionalItems', 'order'].includes(key)) throw new Error('Unknown ' + path + ' override field: ' + key);
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
  const entries = order.map(key => resolveChild(items[key] as Block, childPatches[key]));
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
  patch?: OrderedBlockPatch,
  path = 'content',
): ResolvedCollection<Record<string, Fragment>> => {
  const result = resolveBlockCollection(source, patch, path);
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
  patch?: QuestionCommonPatch<QuestionCommonContent>,
): ComposedContent => {
  if (patch !== undefined && !isRecord(patch)) throw new Error('content must be an object');
  const base: Record<string, unknown> = {};
  const locale: Files<Record<string, unknown>> = {};
  for (const field of ['question', 'hint', 'explanation'] as const) {
    if (patch && patch[field] === undefined) continue;
    const original = source[field] ?? { items: {}, order: [] };
    if (!patch && field !== 'question' && source[field] === undefined) continue;
    const result = resolveBlockCollection(original, patch?.[field], 'content.' + field, field === 'question');
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
    ((files[language as LanguageCodes] ??= {}).content ??= {});
    const content = files[language as LanguageCodes]!.content as Record<string, unknown>;
    content[field] = cloneJson(translated);
  }
};

export const mergeContentFiles = (target: Files<Record<string, unknown>>, content: ComposedContent): void => {
  for (const [language, fields] of Object.entries(content.locale)) {
    (target[language as LanguageCodes] ??= {}).content = cloneJson(fields);
  }
};
