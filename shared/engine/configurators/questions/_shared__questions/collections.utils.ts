import type { LanguageCode } from '#schemas';
import type { ChildrenSupporting, DeepPartial } from '#types';

import {
  mergeForValidation,
  slugAddressedReservedKeys,
  validateSlugAddressedContainer,
  validateSluggedConfiguratorMap,
  type SafePlacementMap,
} from '../../_shared__configurators';
import type { ContentBlock_Primitive_Configurator } from '../../contentBlocks';
import { primitiveContentBlockTypes } from '../../contentBlocks/contentBlock.constants';
import { audio_Data_Schema } from '../../contentBlocks/primitive/defineAudio';
import { code_Data_Schema } from '../../contentBlocks/primitive/defineCode';
import { image_Data_Schema } from '../../contentBlocks/primitive/defineImage';
import { markdown_Data_Schema } from '../../contentBlocks/primitive/defineMarkdown';
import { scene_Data_Schema } from '../../contentBlocks/primitive/defineScene';
import { subtitles_Data_Schema } from '../../contentBlocks/primitive/defineSubtitles';
import { text_Data_Schema } from '../../contentBlocks/primitive/defineText';
import { video_Data_Schema } from '../../contentBlocks/primitive/defineVideo';
import { youtube_Data_Schema } from '../../contentBlocks/primitive/defineYoutube';

type Block = ContentBlock_Primitive_Configurator;
type Fragment = Record<string, unknown>;
type Files<T> = Partial<Record<LanguageCode, T>>;
type BlockResource = { base: Fragment; locale: Files<Fragment> | undefined };
type BlockPatch = { base: DeepPartial<Fragment>; locale: Files<Fragment> | undefined };

export type OrderedBlocks<Child = Block> = { children: string[] } & Record<string, unknown>;
export type BlockMembers<Group extends { children: string[] }> = {
  [Key in Exclude<keyof Group, 'children'>]: Group[Key] extends Block ? Group[Key] : Block;
};

export type OrderedBlockPatch<
  Children extends Record<string, Block> = Record<string, Block>,
  Added extends Record<string, Block> = {},
  Languages extends readonly LanguageCode[] = [],
> = {
  children?: Extract<keyof Children | keyof NoInfer<Added>, string>[];
} & { [Key in keyof Children]?: Parameters<Children[Key]['build']['overrides']>[0] | false } &
  Added & ChildrenSupporting<Languages, Added> & SafePlacementMap<Added> &
  { [Key in Extract<keyof Children, keyof Added>]?: never };

export type ResolvableBlockPatch = { children?: string[] } & Record<string, unknown>;

export type QuestionCommonContent<Child = Block> = {
  question: OrderedBlocks<Child>;
  hint?: OrderedBlocks<Child>;
  explanation?: OrderedBlocks<Child>;
};
export type QuestionCommonPatch<
  Content extends QuestionCommonContent,
  Added extends Record<string, Block> = {},
  Languages extends readonly LanguageCode[] = [],
> = {
  question?: OrderedBlockPatch<BlockMembers<Content['question']>, Added, Languages>;
  hint?: OrderedBlockPatch<BlockMembers<NonNullable<Content['hint']>>, Added, Languages>;
  explanation?: OrderedBlockPatch<BlockMembers<NonNullable<Content['explanation']>>, Added, Languages>;
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

/** Snapshot only placement keys; the child Configurators remain independent. */
export const snapshotBlockCollection = <T extends OrderedBlocks>(value: T): T =>
  ({ ...value, children: [...value.children] }) as T;

export const snapshotCommonContent = <C extends QuestionCommonContent>(value: C): C =>
  ({
    ...value,
    question: snapshotBlockCollection(value.question),
    ...(value.hint !== undefined ? { hint: snapshotBlockCollection(value.hint) } : {}),
    ...(value.explanation !== undefined ? { explanation: snapshotBlockCollection(value.explanation) } : {}),
  }) as C;

export function validateBlock(child: unknown, key: string): asserts child is Block {
  const errors = validateSluggedConfiguratorMap({ [key]: child }, primitiveContentBlockTypes, {
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
    typeof child.build.data !== 'function' ||
    typeof child.build.overrides !== 'function'
  ) {
    throw new Error('Invalid ContentBlock identity or Build API: ' + key);
  }
}

const directChildren = (source: Record<string, unknown>): Record<string, Block> =>
  Object.fromEntries(Object.entries(source).filter(([key]) => key !== 'children')) as Record<string, Block>;

export function validateBlockCollection(value: unknown, path: string, nonEmpty = false): void {
  if (!isRecord(value)) throw new Error(path + ': expected ordered slug-addressed object');
  const issues = validateSlugAddressedContainer(value, primitiveContentBlockTypes);
  if (issues.length) throw new Error(issues.map(issue => path + '.' + issue.path.join('.') + ': ' + issue.message).join('; '));
  const order = value.children as string[];
  if (nonEmpty && order.length === 0) throw new Error(path + ' must contain at least one active item');
  for (const [key, child] of Object.entries(directChildren(value))) validateBlock(child, key);
}

export const validateCommonContent = (content: QuestionCommonContent): void => {
  validateBlockCollection(content?.question, 'content.question', true);
  if (content.hint !== undefined) validateBlockCollection(content.hint, 'content.hint');
  if (content.explanation !== undefined) validateBlockCollection(content.explanation, 'content.explanation');
};

/** ContentBlocks have a first-class selected-language Build API; no transition adapter. */
const readResource = (child: Block, languages: readonly LanguageCode[]): BlockResource =>
  cloneJson(child.build.data({ languages }) as BlockResource);
const readPatch = (child: Block, patch: unknown, languages: readonly LanguageCode[]): BlockPatch =>
  cloneJson(
    (child.build.overrides as (value: never, options: { languages: readonly LanguageCode[] }) => BlockPatch)(
      patch as never,
      { languages },
    ),
  );

const propsSchemas: Record<string, { parse: (value: unknown) => unknown }> = {
  text: text_Data_Schema,
  markdown: markdown_Data_Schema,
  code: code_Data_Schema,
  image: image_Data_Schema,
  video: video_Data_Schema,
  audio: audio_Data_Schema,
  youtube: youtube_Data_Schema,
  scene: scene_Data_Schema,
  subtitles: subtitles_Data_Schema,
};
const validateChildPublication = (value: Fragment, language: LanguageCode): void => {
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
export const resolveChild = (child: Block, languages: readonly LanguageCode[], patch?: unknown) => {
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
 * Ordered collection validation and atomic keyed-group replacement.
 * This helper performs only ContentBlock child composition, not entity lifecycle.
 */
type ResolvedBlockGroup = { children: string[] } & Record<string, unknown>;
export const resolveBlockCollection = (
  source: OrderedBlocks,
  languages: readonly LanguageCode[],
  patch?: ResolvableBlockPatch,
  path = 'content',
  nonEmpty = false,
): ResolvedCollection<ResolvedBlockGroup> & { order: string[] } => {
  validateBlockCollection(source, path, nonEmpty);
  if (patch !== undefined && !isRecord(patch)) throw new Error(path + ' override must be an object');
  const original = directChildren(source);
  const enabled: Record<string, Block | false> = { ...original };
  const childPatches: Record<string, unknown> = {};
  let structural = false;
  for (const [key, change] of Object.entries(patch ?? {})) {
    if (key === 'children') continue;
    if (slugAddressedReservedKeys.some(reserved => reserved === key))
      throw new Error('Reserved ' + path + ' child slug: ' + key);
    if (Object.hasOwn(original, key)) {
      if (change === false) { enabled[key] = false; structural = true; }
      else if (isRecord(change) && !isRecord(change.build)) childPatches[key] = change;
      else throw new Error('Invalid child override at ' + path + '.' + key);
    } else {
      validateBlock(change, key);
      enabled[key] = change;
      structural = true;
    }
  }
  if (structural && patch?.children === undefined)
    throw new Error(path + '.children is required when changing members');
  const order = patch?.children ?? source.children;
  if (!Array.isArray(order)) throw new Error(path + '.children must be an array');
  const active = Object.fromEntries(
    Object.entries(enabled).filter((entry): entry is [string, Block] => entry[1] !== false),
  );
  validateBlockCollection({ children: [...order], ...active }, path, nonEmpty);
  const entries = order.map(key => ({ key, ...resolveChild(active[key], languages, childPatches[key]) }));
  if (nonEmpty && entries.every(entry => isRecord(entry.base.params) && entry.base.params.disabled === true))
    throw new Error(path + ' must contain an enabled ContentBlock');
  const base: ResolvedBlockGroup = {
    children: [...order],
    ...Object.fromEntries(entries.map(({ key, base }) => [key, base])),
  };
  const locale: Files<ResolvedBlockGroup> = {};
  for (const language of languages) {
    if (!entries.some(entry => entry.locale[language] !== undefined)) continue;
    locale[language] = {
      children: [...order],
      ...Object.fromEntries(entries.map(entry => [
        entry.key, cloneJson(entry.locale[language] ?? entry.base),
      ])),
    };
  }
  return { base, locale, order: [...order] };
};

export const resolveBlockMap = (
  source: OrderedBlocks,
  languages: readonly LanguageCode[],
  patch?: ResolvableBlockPatch,
  path = 'content',
): ResolvedCollection<ResolvedBlockGroup> =>
  resolveBlockCollection(source, languages, patch, path);

export const resolveCommonContent = (
  source: QuestionCommonContent,
  languages: readonly LanguageCode[],
  patch?: { question?: ResolvableBlockPatch; hint?: ResolvableBlockPatch; explanation?: ResolvableBlockPatch },
): ComposedContent => {
  if (patch !== undefined && !isRecord(patch)) throw new Error('content must be an object');
  const base: Record<string, unknown> = {};
  const locale: Files<Record<string, unknown>> = {};
  for (const field of ['question', 'hint', 'explanation'] as const) {
    if (patch && patch[field] === undefined) continue;
    const original = source[field] ?? { children: [] };
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
      (locale[language as LanguageCode] ??= {})[field] = translated;
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
    (files[language as LanguageCode] ??= {}).content ??= {};
    const content = files[language as LanguageCode]!.content as Record<string, unknown>;
    content[field] = cloneJson(translated);
  }
};

export const mergeContentFiles = (target: Files<Record<string, unknown>>, content: ComposedContent): void => {
  for (const [language, fields] of Object.entries(content.locale)) {
    (target[language as LanguageCode] ??= {}).content = cloneJson(fields);
  }
};
