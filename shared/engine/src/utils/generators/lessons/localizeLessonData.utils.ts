import type { LanguageCode } from '../../../types/languages';

export type LocaleSource = {
  code: LanguageCode;
  isFallback?: true;
};

export type LocalizedLessonValue = {
  value: unknown;
  sources: Record<string, LocaleSource>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const pointer = (path: readonly string[]): string =>
  `/${path.map(part => part.replaceAll('~', '~0').replaceAll('/', '~1')).join('/')}`;

/** Select each locale independently, retaining the actual language at its JSON Pointer. */
export function localizeLessonValue(
  input: unknown,
  requested: LanguageCode,
  supportedLanguages: readonly LanguageCode[],
): LocalizedLessonValue {
  const available = new Set(supportedLanguages);
  const sources: Record<string, LocaleSource> = {};

  if (!available.has(requested)) throw new Error(`Unsupported requested language: ${requested}`);

  function select(value: Record<string, unknown>, path: readonly string[]): string | undefined {
    const keys = Object.keys(value);
    const single = keys.length === 2 && keys.includes('language') && keys.includes('value');
    if (single) {
      const code = value.language;
      if (typeof code !== 'string' || !available.has(code as LanguageCode) || typeof value.value !== 'string') {
        throw new Error(`Invalid single-locale value at ${pointer(path)}`);
      }
      sources[pointer(path)] = code === requested ? { code: code as LanguageCode } : { code: code as LanguageCode, isFallback: true };
      return value.value;
    }

    const hasFallback = Object.hasOwn(value, 'fallback');
    const languageKeys = keys.filter(key => key !== 'fallback');
    const looksLocalized =
      hasFallback ||
      (keys.length > 0 &&
        keys.every(key => available.has(key as LanguageCode) && typeof value[key] === 'string'));
    if (!looksLocalized) return undefined;

    if (
      languageKeys.length === 0 ||
      languageKeys.some(key => !available.has(key as LanguageCode) || typeof value[key] !== 'string')
    ) {
      throw new Error(`Invalid locale dictionary at ${pointer(path)}`);
    }

    const fallback = value.fallback;
    if (hasFallback && (typeof fallback !== 'string' || typeof value[fallback] !== 'string')) {
      throw new Error(`Invalid fallback at ${pointer(path)}`);
    }
    const code = typeof value[requested] === 'string' ? requested : fallback;
    if (typeof code !== 'string' || typeof value[code] !== 'string') {
      throw new Error(`Missing ${requested} locale at ${pointer(path)}`);
    }
    sources[pointer(path)] = code === requested ? { code: code as LanguageCode } : { code: code as LanguageCode, isFallback: true };
    return value[code];
  }

  function visit(value: unknown, path: readonly string[]): unknown {
    if (Array.isArray(value)) return value.map((item, index) => visit(item, [...path, String(index)]));
    if (isRecord(value)) {
      const selected = select(value, path);
      if (selected !== undefined) return selected;
      return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, visit(child, [...path, key])]));
    }
    if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) return value;
    throw new Error(`Unsupported value at ${pointer(path)}: ${typeof value}`);
  }

  return { value: visit(input, []), sources };
}
