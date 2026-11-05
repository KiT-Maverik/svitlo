import type { Locale_Languages } from '@svitlo/engine/content';

type LocalizedLeaves<Shape, SupportedLanguages extends Locale_Languages> = Shape extends string
  ? Record<SupportedLanguages[number], string>
  : Shape extends object
    ? { [Key in keyof Shape]: LocalizedLeaves<Shape[Key], SupportedLanguages> }
    : never;

/** Transpose authored scene translations for only the languages supported by the lesson. */
export function sceneLocalesToData<SupportedLanguages extends Locale_Languages, Shape extends object>(
  languages: SupportedLanguages,
  byLanguage: Record<SupportedLanguages[number], Shape>,
): LocalizedLeaves<Shape, SupportedLanguages> {
  function walk(sample: unknown, path: readonly string[]): unknown {
    if (typeof sample === 'string') {
      return Object.fromEntries(
        languages.map(language => [
          language,
          path.reduce<unknown>(
            (value, key) => (value as Record<string, unknown>)[key],
            byLanguage[language as SupportedLanguages[number]],
          ),
        ]),
      );
    }
    return Object.fromEntries(
      Object.entries(sample as Record<string, unknown>).map(([key, child]) => [key, walk(child, [...path, key])]),
    );
  }
  return walk(byLanguage[languages[0] as SupportedLanguages[number]], []) as LocalizedLeaves<Shape, SupportedLanguages>;
}
