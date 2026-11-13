import {
  skillDomain_Props_Schema,
  type SkillDomain_Props,
} from '../../configurators/skills/defineSkillDomain/defineSkillDomain.schemas';
import { languageCode_Schema, type LanguageCodes } from '../../schemas/languages.schemas';
import type { DeepPartial } from '../../types/deepPartial';

/** One published file contains the whole slug-keyed Domain tree. */
export type Skills_Base = Record<string, DeepPartial<SkillDomain_Props> & Pick<SkillDomain_Props, 'id' | 'slug'>>;
export type Skills_Locale = Record<string, DeepPartial<SkillDomain_Props>>;

export type Skills_Publication = {
  base: Skills_Base;
  locale?: Partial<Record<LanguageCodes, Skills_Locale>>;
};

export type Skills_Overrides = {
  base?: Skills_Locale;
  locale?: Partial<Record<LanguageCodes, Skills_Locale>>;
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
  language: LanguageCodes,
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
      const merged = merge(
        merge(merge(value, resourceLocale[slug] ?? {}), overrideBase[slug] ?? {}),
        overrideLocale[slug] ?? {},
      );
      const props = skillDomain_Props_Schema.parse(merged);
      if (props.slug !== slug) throw new Error('Domain slug does not match its published key');
      result[slug] = props;
    } catch (error) {
      throw new Error(
        'Invalid assembled SkillDomain ' + slug + ' for ' + language + ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
  return result;
}
