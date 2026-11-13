import type { DeepPartial } from '#types';
import type { LanguageCode } from '#schemas';
import { isLocaleDictionary } from './onlyLocales/onlyLocales.utils';

type FileLocales = Partial<Record<LanguageCode, Record<string, unknown>>>;
type Projection = { base?: unknown; locale: Partial<Record<LanguageCode, unknown>> };
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Pure merge for temporary validation: keyed objects merge, arrays replace. */
export function mergeForValidation<T>(source: T, patch: DeepPartial<T>): T {
  const merge = (previous: unknown, next: unknown): unknown => {
    if (next === undefined) return previous;
    if (!isRecord(previous) || !isRecord(next)) return next;
    const merged: Record<string, unknown> = { ...previous };
    for (const [key, value] of Object.entries(next)) merged[key] = merge(previous[key], value);
    return merged;
  };
  return merge(source, patch) as T;
}

/**
 * Split invariant fields from language-specific values for publication.
 * Localized arrays publish complete per-language arrays: no indexed merges.
 * Only parsed, JSON-compatible authored data should be passed to this helper.
 */
export function splitLocalizedFields<T extends object>(
  value: T,
): { base: DeepPartial<T>; locale: FileLocales | undefined } {
  const visit = (input: unknown): Projection => {
    if (isLocaleDictionary(input)) return { locale: input as Partial<Record<LanguageCode, string>> };
    if (Array.isArray(input)) {
      const parts = input.map(visit);
      const languages = new Set(parts.flatMap(part => Object.keys(part.locale)));
      if (!languages.size) return { base: input, locale: {} };
      const locale: Partial<Record<LanguageCode, unknown>> = {};
      for (const language of languages) {
        const code = language as LanguageCode;
        locale[code] = parts.map(part => mergeForValidation(part.base, part.locale[code]));
      }
      return { locale };
    }
    if (!isRecord(input)) return { base: input, locale: {} };
    const base: Record<string, unknown> = {};
    const locale: Record<string, Record<string, unknown>> = {};
    for (const [field, child] of Object.entries(input)) {
      const part = visit(child);
      if (part.base !== undefined) base[field] = part.base;
      for (const [language, translated] of Object.entries(part.locale)) {
        (locale[language] ??= {})[field] = translated;
      }
    }
    return { base: Object.keys(base).length || !Object.keys(input).length ? base : undefined, locale };
  };

  const split = visit(value);
  const locale: FileLocales = {};
  for (const [language, fields] of Object.entries(split.locale)) {
    locale[language as LanguageCode] = fields as Record<string, unknown>;
  }
  return { base: (split.base ?? {}) as DeepPartial<T>, locale: Object.keys(locale).length ? locale : undefined };
}
