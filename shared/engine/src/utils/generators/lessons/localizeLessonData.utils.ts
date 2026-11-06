import { DEFAULT_SUPPORTED_LANGUAGES } from '../../../types/languages';
import type { LanguageCode } from '../../../types/languages';

type Partition = {
  base: unknown | typeof OMIT;
  locales: Partial<Record<LanguageCode, unknown>>;
  pointers: string[];
};

export type SparseLessonValue = {
  base: unknown;
  locales: Partial<Record<LanguageCode, unknown>>;
  /** JSON Pointers of fields which must be translated for every declared language. */
  pointers: string[];
};

const OMIT = Symbol('localized-value');
const knownLanguages = new Set<LanguageCode>(DEFAULT_SUPPORTED_LANGUAGES.map(entry => entry.language));
const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const pointer = (path: readonly string[]): string =>
  '/' + path.map(part => part.replaceAll('~', '~0').replaceAll('/', '~1')).join('/');

/**
 * Split authored Lesson Data into one shared structural value and sparse language patches.
 * Authored strings are invariant; authored locale dictionaries must be complete.
 * Array patches are numeric-key objects to avoid repeating array structure in every locale.
 */
export function splitLessonValue(input: unknown, supportedLanguages: readonly LanguageCode[]): SparseLessonValue {
  const languages = new Set(supportedLanguages);
  if (
    !languages.size ||
    languages.size !== supportedLanguages.length ||
    [...languages].some(language => !knownLanguages.has(language))
  ) {
    throw new Error('Invalid declared lesson languages');
  }

  function split(value: unknown, path: readonly string[]): Partition {
    if (Array.isArray(value)) {
      const children = value.map((item, index) => split(item, [...path, String(index)]));
      const locales: Partition['locales'] = {};
      for (const language of languages) {
        const patch = Object.fromEntries(
          children.flatMap((item, index) =>
            Object.hasOwn(item.locales, language) ? [[String(index), item.locales[language]]] : [],
          ),
        );
        if (Object.keys(patch).length) locales[language] = patch;
      }
      return {
        base: children.map(item => (item.base === OMIT ? null : item.base)),
        locales,
        pointers: children.flatMap(item => item.pointers),
      };
    }

    if (isRecord(value)) {
      const keys = Object.keys(value);
      if (
        keys.length === 2 &&
        keys.includes('language') &&
        keys.includes('value') &&
        typeof value.language === 'string' &&
        typeof value.value === 'string'
      ) {
        throw new Error('Single-language fallback is not allowed at ' + pointer(path));
      }
      if (keys.includes('fallback')) {
        throw new Error('Field-level fallback is not allowed at ' + pointer(path));
      }

      // Numeric language-keyed maps are ordinary data, not text localization.
      // Only an entire language-keyed record can be a locale dictionary.
      // In particular, ordinary content has an 'id' property (Indonesian code).
      const localized =
        keys.length > 0 &&
        keys.every(key => knownLanguages.has(key as LanguageCode)) &&
        Object.values(value).some(item => typeof item === 'string');
      if (localized) {
        const unexpected = keys.filter(key => !languages.has(key as LanguageCode));
        const missing = [...languages].filter(language => !Object.hasOwn(value, language));
        const invalid = keys.filter(key => typeof value[key] !== 'string');
        if (unexpected.length || missing.length || invalid.length) {
          throw new Error(
            'Incomplete locale dictionary at ' +
              pointer(path) +
              ' (missing: ' +
              missing.join(', ') +
              '; unexpected: ' +
              unexpected.join(', ') +
              '; invalid: ' +
              invalid.join(', ') +
              ')',
          );
        }
        return {
          base: OMIT,
          locales: Object.fromEntries([...languages].map(language => [language, value[language]])),
          pointers: [pointer(path)],
        };
      }

      const children = Object.entries(value).map(([key, item]) => [key, split(item, [...path, key])] as const);
      const locales: Partition['locales'] = {};
      for (const language of languages) {
        const patch = Object.fromEntries(
          children.flatMap(([key, child]) =>
            Object.hasOwn(child.locales, language) ? [[key, child.locales[language]]] : [],
          ),
        );
        if (Object.keys(patch).length) locales[language] = patch;
      }
      return {
        base: Object.fromEntries(children.flatMap(([key, child]) => (child.base === OMIT ? [] : [[key, child.base]]))),
        locales,
        pointers: children.flatMap(([, child]) => child.pointers),
      };
    }

    if (value === null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return { base: value, locales: {}, pointers: [] };
    }
    throw new Error('Unsupported lesson value at ' + pointer(path) + ': ' + typeof value);
  }

  const result = split(input, []);
  return {
    base: result.base === OMIT ? null : result.base,
    locales: result.locales,
    pointers: result.pointers,
  };
}
