import type { LanguageCodes } from '#schemas';
import type { ContentBlock_Configurator } from '../../contentBlocks';
import { validateOrderedKeys } from '../../_shared__configurators';
import { assertEnabledBlock, cloneJson, isRecord, resolveChild, validateBlock } from './collections.utils';

type Block = ContentBlock_Configurator;
type Entry = Record<string, unknown>;
type NestedCollection = { items: Record<string, Entry>; order: string[] };
type NestedPatch = {
  items?: Record<string, Record<string, unknown> | false>;
  additionalItems?: Record<string, Entry>;
  order?: string[];
};
type Files<T> = Partial<Record<LanguageCodes, T>>;
type Plain = Record<string, unknown>;
type NestedResult<T> = { base: T; locale: Files<T> };

export const snapshotNestedCollection = <T extends NestedCollection>(source: T): T =>
  ({
    ...source,
    items: Object.fromEntries(Object.entries(source.items).map(([key, item]) => [key, { ...item }])),
    order: [...source.order],
  }) as T;

const validateNested = (collection: NestedCollection, path: string, fields: readonly string[]): void => {
  const issues = validateOrderedKeys(collection, { path });
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  if (collection.order.length === 0) throw new Error(path + ' must contain at least one item');
  for (const [key, entry] of Object.entries(collection.items)) {
    if (
      !isRecord(entry) ||
      Object.keys(entry).length !== fields.length ||
      fields.some(field => !Object.hasOwn(entry, field))
    ) {
      throw new Error('Invalid nested Question item at ' + path + '.' + key);
    }
    for (const field of fields) {
      const child = entry[field];
      validateBlock(child, isRecord(child) && typeof child.slug === 'string' ? child.slug : '');
      assertEnabledBlock((child as Block).config.base, path + '.' + key + '.' + field);
    }
  }
};

export const validateNestedBlockCollection = validateNested;

/**
 * Resolve a named collection of fixed-field ContentBlock tuples.
 * Pair maps and ordered text-slot arrays share this pure child projection only.
 */
const resolveNested = (
  source: NestedCollection,
  languages: readonly LanguageCodes[],
  patch: NestedPatch | undefined,
  fields: readonly string[],
  path: string,
): { order: string[]; base: Record<string, Plain>; locale: Files<Record<string, Plain>> } => {
  validateNested(source, path, fields);
  if (patch !== undefined && !isRecord(patch)) throw new Error(path + ' patch must be an object');
  for (const field of Object.keys(patch ?? {})) {
    if (!['items', 'additionalItems', 'order'].includes(field)) throw new Error('Unknown ' + path + ' field: ' + field);
  }
  const changed = patch?.items ?? {};
  const added = patch?.additionalItems ?? {};
  if (!isRecord(changed) || !isRecord(added)) throw new Error('Invalid ' + path + ' keyed items');
  const active: Record<string, Entry | false> = { ...source.items };
  let structural = Object.keys(added).length > 0;
  for (const [key, item] of Object.entries(added)) {
    if (Object.hasOwn(active, key)) throw new Error('Duplicate ' + path + ' slug: ' + key);
    validateNested({ items: { [key]: item }, order: [key] }, path, fields);
    active[key] = item;
  }
  for (const [key, value] of Object.entries(changed)) {
    if (!Object.hasOwn(source.items, key)) throw new Error('Unknown ' + path + ' slug: ' + key);
    if (value === false) {
      active[key] = false;
      structural = true;
    } else {
      if (!isRecord(value) || Object.keys(value).some(field => !fields.includes(field))) {
        throw new Error('Unexpected nested Question field at ' + path + '.' + key);
      }
    }
  }
  if (structural && patch?.order === undefined) throw new Error(path + '.order is required for additions/removals');
  const order = patch?.order ?? source.order;
  const issues = validateOrderedKeys({ items: active, order }, { path, allowDisabled: true });
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  if (order.length === 0) throw new Error(path + ' must contain at least one active item');
  const base: Record<string, Plain> = {};
  const locale: Files<Record<string, Plain>> = {};
  for (const key of order) {
    const entry = active[key] as Entry;
    const changes = changed[key] === false ? undefined : (changed[key] as Plain | undefined);
    const built: Record<string, ReturnType<typeof resolveChild>> = {};
    for (const field of fields) {
      built[field] = resolveChild(entry[field] as Block, languages, changes?.[field]);
      assertEnabledBlock(built[field].base, path + '.' + key + '.' + field);
    }
    base[key] = Object.fromEntries(fields.map(field => [field, built[field].base]));
    const languages = new Set<LanguageCodes>();
    for (const field of fields) {
      for (const language of Object.keys(built[field].locale)) languages.add(language as LanguageCodes);
    }
    for (const language of languages) {
      (locale[language] ??= {})[key] = Object.fromEntries(
        fields.map(field => [field, cloneJson(built[field].locale[language] ?? built[field].base)]),
      );
    }
  }
  // A language-specific collection is atomic: include every member and its fallback base.
  for (const language of Object.keys(locale) as LanguageCodes[]) {
    const records = locale[language]!;
    for (const key of order) records[key] ??= cloneJson(base[key]);
  }
  return { order: [...order], base, locale };
};

export const resolvePairMap = (
  source: NestedCollection,
  languages: readonly LanguageCodes[],
  patch?: NestedPatch,
): NestedResult<Record<string, Plain>> => {
  const built = resolveNested(source, languages, patch, ['left', 'right'], 'content.pairs');
  return { base: built.base, locale: built.locale };
};

export const resolveSlotBlocks = (
  source: NestedCollection,
  languages: readonly LanguageCodes[],
  patch?: NestedPatch,
): NestedResult<Array<{ selector: string; correctAnswer: Plain }>> => {
  const built = resolveNested(source, languages, patch, ['correctAnswer'], 'content.slots');
  const mapArray = (records: Record<string, Plain>) =>
    built.order.map(selector => ({ selector, correctAnswer: records[selector].correctAnswer as Plain }));
  const locale: Files<Array<{ selector: string; correctAnswer: Plain }>> = {};
  for (const [language, records] of Object.entries(built.locale)) {
    locale[language as LanguageCodes] = mapArray(records);
  }
  return { base: mapArray(built.base), locale };
};
