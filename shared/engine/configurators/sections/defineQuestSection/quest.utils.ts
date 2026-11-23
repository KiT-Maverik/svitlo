import type { LanguageCode } from '#schemas';
import type { DeepPartial } from '#types';
import { camelCase_Schema } from '#schemas';
import { mergeForValidation, validateRequestedPublication } from '../../_shared__configurators';

export type QuestPublication = {
  base: Record<string, unknown>;
  locale: Partial<Record<LanguageCode, Record<string, unknown>>> | undefined;
};

type Buildable = {
  id: string;
  slug: string;
  type: string;
  config: { base: { id?: string; slug?: string; type?: string }; locales: () => unknown };
  build: {
    props: (options: { readonly languages: readonly LanguageCode[] }) => QuestPublication;
    overrides: (patch: never, options: { readonly languages: readonly LanguageCode[] }) => QuestPublication;
  };
};

const record = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const buildable = (value: unknown): value is Buildable =>
  record(value) && record(value.build) && typeof value.build.props === 'function';

export function assertQuestChild(value: unknown, kind: string, at: string, key?: string): void {
  if (
    !buildable(value) ||
    value.type !== kind ||
    typeof value.id !== 'string' ||
    typeof value.slug !== 'string' ||
    !record(value.config) ||
    !record(value.config.base) ||
    typeof value.config.locales !== 'function' ||
    typeof value.build.overrides !== 'function' ||
    value.config.base.id !== value.id ||
    value.config.base.slug !== value.slug ||
    value.config.base.type !== value.type ||
    (key !== undefined && value.slug !== key)
  )
    throw new Error('Expected ' + kind + ' Build configurator at ' + at);
}

export function assertQuestMap(value: unknown, kind: string, path: string): void {
  if (!record(value) || !Object.hasOwn(value, 'start')) {
    throw new Error(path + ' must contain a start configurator');
  }
  for (const [key, child] of Object.entries(value)) {
    if (!camelCase_Schema.safeParse(key).success) throw new Error('Invalid ' + path + ' key: ' + key);
    assertQuestChild(child, kind, path + '.' + key, key);
  }
}

/** Compose keyed nested Build resources, preserving sparse per-language leaves and null audio slots. */
export function projectQuestTree(node: unknown, languages: readonly LanguageCode[], patch?: unknown): QuestPublication {
  if (buildable(node)) {
    const result =
      patch === undefined
        ? (node.build.props as (options: { languages: readonly LanguageCode[] }) => QuestPublication)({ languages })
        : (
            node.build.overrides as (
              input: unknown,
              options: { languages: readonly LanguageCode[] },
            ) => QuestPublication
          )(patch, { languages });
    return result;
  }
  if (node === null) {
    if (patch !== undefined) throw new Error('Cannot override an absent Quest media track');
    return { base: null as unknown as Record<string, unknown>, locale: undefined };
  }
  if (!record(node)) throw new Error('Expected a Quest configurator or slug map');
  if (patch !== undefined && !record(patch)) throw new Error('Expected a Quest nested override object');
  const keys = patch === undefined ? Object.keys(node) : Object.keys(patch as Record<string, unknown>);
  const base: Record<string, unknown> = {};
  const locales: Partial<Record<LanguageCode, Record<string, unknown>>> = {};
  for (const key of keys) {
    if (!Object.hasOwn(node, key)) throw new Error('Unknown Quest child: ' + key);
    const childPatch = patch === undefined ? undefined : (patch as Record<string, unknown>)[key];
    const child = projectQuestTree(node[key], languages, childPatch);
    base[key] = child.base;
    for (const [language, part] of Object.entries(child.locale ?? {})) {
      (locales[language as LanguageCode] ??= {})[key] = part;
    }
  }
  return { base, locale: Object.keys(locales).length ? locales : undefined };
}

export function nestQuestPublication(
  identity: Record<string, unknown>,
  tree: QuestPublication,
  field: string,
  own?: QuestPublication,
): QuestPublication {
  const files: Partial<Record<LanguageCode, Record<string, unknown>>> = {};
  for (const [lang, part] of Object.entries(tree.locale ?? {})) {
    (files[lang as LanguageCode] ??= {})[field] = part;
  }
  for (const [lang, part] of Object.entries(own?.locale ?? {})) {
    files[lang as LanguageCode] = mergeForValidation(files[lang as LanguageCode] ?? {}, part);
  }
  return {
    base: { ...identity, ...(own?.base ?? {}), [field]: tree.base },
    locale: Object.keys(files).length ? files : undefined,
  };
}

export function validateQuestPublication(
  schema: { parse: (value: unknown) => unknown },
  current: QuestPublication,
  languages: readonly LanguageCode[],
  patch?: QuestPublication,
): void {
  validateRequestedPublication(schema, current, languages, patch);
}

export function mergeQuestPatches(a: QuestPublication, b: QuestPublication): QuestPublication {
  const files: Partial<Record<LanguageCode, Record<string, unknown>>> = { ...a.locale };
  for (const [lang, part] of Object.entries(b.locale ?? {})) {
    files[lang as LanguageCode] = mergeForValidation(files[lang as LanguageCode] ?? {}, part);
  }
  return {
    base: mergeForValidation(a.base, b.base as DeepPartial<typeof a.base>),
    locale: Object.keys(files).length ? files : undefined,
  };
}
