import type { LanguageCode } from '#schemas';

import { camelCase_Schema } from '#schemas';
import { slugAddressedReservedKeys, validateOrderedKeys } from '../../_shared__configurators';
import type { ContentBlock_Primitive_Configurator } from '../../contentBlocks';
import { assertEnabledBlock, cloneJson, isRecord, resolveChild, validateBlock } from './collections.utils';

type Block = ContentBlock_Primitive_Configurator;
type Entry = Record<string, unknown>;
type NestedCollection = { children: string[] } & Record<string, unknown>;
type NestedPatch = { children?: string[] } & Record<string, unknown>;
type Files<T> = Partial<Record<LanguageCode, T>>;
type Plain = Record<string, unknown>;
type NestedResult<T> = { base: T; locale: Files<T> };
type ResolvedNested = { children: string[] } & Record<string, unknown>;

const members = (source: NestedCollection): Record<string, Entry> =>
  Object.fromEntries(Object.entries(source).filter(([key]) => key !== 'children')) as Record<string, Entry>;

export const snapshotNestedCollection = <T extends NestedCollection>(source: T): T =>
  ({
    ...source,
    children: [...source.children],
    ...Object.fromEntries(Object.entries(members(source)).map(([key, item]) => [key, { ...item }])),
  }) as T;

const validateNested = (source: NestedCollection, path: string, fields: readonly string[]): void => {
  if (!isRecord(source) || !Array.isArray(source.children)) throw new Error(path + ' requires children');
  const entries = members(source);
  const issues = validateOrderedKeys({ items: entries, order: source.children }, { path });
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  if (source.children.length === 0) throw new Error(path + ' must contain at least one item');
  for (const [key, entry] of Object.entries(entries)) {
    if (slugAddressedReservedKeys.some(value => value === key) || !camelCase_Schema.safeParse(key).success)
      throw new Error('Unsafe nested Question placement key: ' + key);
    if (!isRecord(entry) || Object.keys(entry).length !== fields.length ||
        fields.some(field => !Object.hasOwn(entry, field))) {
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

/** Pairs and slots retain meaningful left/right/correctAnswer roles within direct children. */
const resolveNested = (
  source: NestedCollection,
  languages: readonly LanguageCode[],
  patch: NestedPatch | undefined,
  fields: readonly string[],
  path: string,
): NestedResult<ResolvedNested> => {
  validateNested(source, path, fields);
  if (patch !== undefined && !isRecord(patch)) throw new Error(path + ' patch must be an object');
  const original = members(source);
  const active: Record<string, Entry | false> = { ...original };
  const changes: Record<string, Entry> = {};
  let structural = false;
  for (const [key, change] of Object.entries(patch ?? {})) {
    if (key === 'children') continue;
    if (slugAddressedReservedKeys.some(value => value === key) || !camelCase_Schema.safeParse(key).success)
      throw new Error('Unsafe ' + path + ' placement key: ' + key);
    if (Object.hasOwn(original, key)) {
      if (change === false) { active[key] = false; structural = true; }
      else {
        if (!isRecord(change) || Object.keys(change).some(field => !fields.includes(field)))
          throw new Error('Unexpected nested Question field at ' + path + '.' + key);
        changes[key] = change;
      }
    } else {
      if (!isRecord(change)) throw new Error('Invalid added nested Question item: ' + path + '.' + key);
      validateNested({ children: [key], [key]: change }, path, fields);
      active[key] = change;
      structural = true;
    }
  }
  if (structural && patch?.children === undefined) throw new Error(path + '.children is required for additions/removals');
  const order = patch?.children ?? source.children;
  if (!Array.isArray(order)) throw new Error(path + '.children must be an array');
  const issues = validateOrderedKeys({ items: active, order }, { path, allowDisabled: true });
  if (issues.length) throw new Error(issues.map(issue => issue.message).join('; '));
  if (order.length === 0) throw new Error(path + ' must contain at least one active item');
  const base: ResolvedNested = { children: [...order] };
  const locale: Files<ResolvedNested> = {};
  for (const key of order) {
    const entry = active[key] as Entry;
    const built: Record<string, ReturnType<typeof resolveChild>> = {};
    for (const field of fields) {
      built[field] = resolveChild(entry[field] as Block, languages, changes[key]?.[field]);
      assertEnabledBlock(built[field].base, path + '.' + key + '.' + field);
    }
    base[key] = Object.fromEntries(fields.map(field => [field, built[field].base]));
    const affected = new Set<LanguageCode>();
    for (const field of fields) for (const language of Object.keys(built[field].locale))
      affected.add(language as LanguageCode);
    for (const language of affected) {
      const group = (locale[language] ??= { children: [...order] });
      group[key] = Object.fromEntries(fields.map(field =>
        [field, cloneJson(built[field].locale[language] ?? built[field].base)]));
    }
  }
  for (const group of Object.values(locale)) {
    for (const key of order) if (!Object.hasOwn(group!, key)) group![key] = cloneJson(base[key]);
  }
  return { base, locale };
};

export const resolvePairMap = (
  source: NestedCollection,
  languages: readonly LanguageCode[],
  patch?: NestedPatch,
): NestedResult<ResolvedNested> => resolveNested(source, languages, patch, ['left', 'right'], 'content.pairs');

export const resolveSlotBlocks = (
  source: NestedCollection,
  languages: readonly LanguageCode[],
  patch?: NestedPatch,
): NestedResult<ResolvedNested> => resolveNested(source, languages, patch, ['correctAnswer'], 'content.slots');
