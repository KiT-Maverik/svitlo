import {
  skillDomain_Props_Schema,
  type SkillDomain_Props,
} from '../../configurators/skills/defineSkillDomain/defineSkillDomain.schemas';
import { languageCode_Schema, type LanguageCode } from '../../schemas/languages.schemas';
import type { DeepPartial } from '../../types/transformer.types';
import type { Skill_Props } from '../../configurators/skills/defineSkill/defineSkill.schemas';
import type { SkillGroup_Props } from '../../configurators/skills/defineSkillGroup/defineSkillGroup.schemas';

/** One published file contains the whole slug-keyed Domain tree. */
export type Skills_Base = Record<string, DeepPartial<SkillDomain_Props> & Pick<SkillDomain_Props, 'id' | 'slug'>>;
/** Scalar metadata may be sparse; published child collection arrays are complete Props replacements. */
export type SkillDomain_PublishedPatch = Omit<
  DeepPartial<SkillDomain_Props>,
  'id' | 'slug' | 'skills' | 'groups'
> & {
  id?: never;
  slug?: never;
  skills?: Skill_Props[];
  groups?: SkillGroup_Props[];
};
export type Skills_Locale = Record<string, SkillDomain_PublishedPatch>;

export type Skills_Publication = {
  base: Skills_Base;
  locale?: Partial<Record<LanguageCode, Skills_Locale>>;
};

export type Skills_Overrides = {
  base?: Skills_Locale;
  locale?: Partial<Record<LanguageCode, Skills_Locale>>;
};

export type Skills_Props = Record<string, SkillDomain_Props>;

const forbiddenKeys = new Set(['__proto__', 'prototype', 'constructor']);
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

function asRecord(value: unknown, path: string): Record<string, unknown> {
  if (!isRecord(value)) throw new Error('Expected published Skills object at ' + path);
  return value;
}

/** Published payloads must be JSON values, with no prototype-polluting keys. */
function checkJson(value: unknown, path: string): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => checkJson(item, path + '/' + index));
  } else if (isRecord(value)) {
    if (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) {
      throw new Error('Expected plain published Skills object at ' + path);
    }
    for (const [key, item] of Object.entries(value)) {
      if (forbiddenKeys.has(key)) throw new Error('Forbidden Skills key at ' + path + '/' + key);
      checkJson(item, path + '/' + key);
    }
  } else if (
    value === undefined ||
    typeof value === 'function' ||
    typeof value === 'symbol' ||
    typeof value === 'bigint' ||
    (typeof value === 'number' && !Number.isFinite(value)) ||
    (typeof value === 'object' && value !== null)
  ) {
    throw new Error('Non-JSON Skills value at ' + path);
  }
}

/** Objects merge recursively; every published Props array is replaced atomically. */
function merge(current: unknown, patch: unknown): unknown {
  if (!isRecord(current) || !isRecord(patch)) return patch;
  const result: Record<string, unknown> = { ...current };
  for (const [key, value] of Object.entries(patch)) {
    result[key] = Object.hasOwn(current, key) ? merge(current[key], value) : value;
  }
  return result;
}

/** Existing children retain their immutable ID/slug pairing across all publication layers.
 * Complete array replacement can still remove, add or reorder entries.
 */
function checkNestedIdentities(previous: unknown, next: unknown, path: string): void {
  if (!isRecord(previous) || !isRecord(next)) return;
  for (const collection of ['skills', 'groups'] as const) {
    const prior = previous[collection];
    const current = next[collection];
    if (!Array.isArray(current)) continue;
    const bySlug = new Map<string, Record<string, unknown>>();
    const byId = new Map<string, Record<string, unknown>>();
    if (Array.isArray(prior)) {
      for (const item of prior) {
        if (isRecord(item) && typeof item.slug === 'string' && typeof item.id === 'string') {
          bySlug.set(item.slug, item);
          byId.set(item.id, item);
        }
      }
    }
    const usedSlugs = new Set<string>();
    const usedIds = new Set<string>();
    for (const item of current) {
      if (!isRecord(item) || typeof item.slug !== 'string' || typeof item.id !== 'string') {
        continue; // The existing SkillDomain Props schema rejects malformed entries.
      }
      const at = path + '/' + collection + '/' + item.slug;
      if (usedSlugs.has(item.slug) || usedIds.has(item.id)) {
        throw new Error('Duplicate published Skills identity at ' + at);
      }
      usedSlugs.add(item.slug);
      usedIds.add(item.id);
      const oldSlug = bySlug.get(item.slug);
      const oldId = byId.get(item.id);
      if ((oldSlug && oldSlug.id !== item.id) || (oldId && oldId.slug !== item.slug)) {
        throw new Error('Cannot change published Skills identity at ' + at);
      }
      if (collection === 'groups' && oldSlug) {
        checkNestedIdentities(oldSlug, item, at);
      }
    }
  }
}

function checkLayerKeys(base: Record<string, unknown>, layer: Record<string, unknown>, path: string): void {
  for (const [slug, value] of Object.entries(layer)) {
    if (!Object.hasOwn(base, slug)) throw new Error('Unknown SkillDomain at ' + path + '/' + slug);
    const fields = asRecord(value, path + '/' + slug);
    for (const identity of ['id', 'slug', 'type']) {
      if (Object.hasOwn(fields, identity)) {
        throw new Error('Cannot override SkillDomain identity at ' + path + '/' + slug + '/' + identity);
      }
    }
  }
}

/**
 * Resolve a single publication context to frontend-ready Domain Props.
 *
 * The host reads base.json and the selected <language>.json. Generators have
 * already resolved authoring collections into ordered Props arrays. This pure
 * function never fetches files or imports authoring configurators.
 *
 * Precedence: resource.base -> resource.locale[language] ->
 *             overrides.base -> overrides.locale[language].
 */
export function assembleSkills(
  resource: Skills_Publication,
  language: LanguageCode,
  overrides?: Skills_Overrides,
): Skills_Props {
  languageCode_Schema.parse(language);
  const base = asRecord(resource.base, 'base');
  const resourceLocale = asRecord(resource.locale?.[language] ?? {}, 'locale/' + language);
  const overrideBase = asRecord(overrides?.base ?? {}, 'overrides/base');
  const overrideLocale = asRecord(overrides?.locale?.[language] ?? {}, 'overrides/locale/' + language);

  for (const [path, layer] of [
    ['base', base],
    ['locale/' + language, resourceLocale],
    ['overrides/base', overrideBase],
    ['overrides/locale/' + language, overrideLocale],
  ] as const) {
    checkJson(layer, path);
  }
  if (!Object.keys(base).length) throw new Error('Empty published Skills taxonomy');
  checkLayerKeys(base, resourceLocale, 'locale/' + language);
  checkLayerKeys(base, overrideBase, 'overrides/base');
  checkLayerKeys(base, overrideLocale, 'overrides/locale/' + language);

  const result: Skills_Props = {};
  for (const [slug, value] of Object.entries(base)) {
    try {
      let merged: unknown = value;
      for (const [path, layer] of [
        ['locale/' + language, resourceLocale[slug]],
        ['overrides/base', overrideBase[slug]],
        ['overrides/locale/' + language, overrideLocale[slug]],
      ] as const) {
        if (layer === undefined) continue;
        const next = merge(merged, layer);
        checkNestedIdentities(merged, next, path + '/' + slug);
        checkNestedIdentities(value, next, 'base/' + slug);
        merged = next;
      }
      const props = skillDomain_Props_Schema.parse(merged);
      if (props.slug !== slug) throw new Error('Domain slug does not match its published key');
      result[slug] = props;
    } catch (error) {
      throw new Error(
        'Invalid assembled SkillDomain ' +
          slug +
          ' for ' +
          language +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
  return result;
}
