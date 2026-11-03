import type { LanguageCode } from '@svitlo/engine/localization';

type LocalizedLeaves<Shape> =
  Shape extends string ? Record<LanguageCode, string> :
  Shape extends object ? { [Key in keyof Shape]: LocalizedLeaves<Shape[Key]> } : never;

/** Transpose complete authored scene translations into contract-native data. */
export function sceneLocalesToData<Shape extends object>(
  byLanguage: Record<LanguageCode, Shape>,
): LocalizedLeaves<Shape> {
  function walk(sample: unknown, path: readonly string[]): unknown {
    if (typeof sample === 'string') {
      return Object.fromEntries(
        Object.entries(byLanguage).map(([language, tree]) => [
          language,
          path.reduce<unknown>((value, key) => (value as Record<string, unknown>)[key], tree),
        ]),
      );
    }
    return Object.fromEntries(
      Object.entries(sample as Record<string, unknown>)
        .map(([key, child]) => [key, walk(child, [...path, key])]),
    );
  }
  return walk(byLanguage.en, []) as LocalizedLeaves<Shape>;
}
