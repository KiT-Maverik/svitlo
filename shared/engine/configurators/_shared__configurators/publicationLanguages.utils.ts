import { languageCode_Schema, type LanguageCode } from '#schemas';

/** Explicit runtime publication scope; authoring tuple constraints remain TypeScript-only. */
export const resolvePublicationLanguages = (options: {
  readonly languages: readonly LanguageCode[];
}): LanguageCode[] => {
  if (!options || !Array.isArray(options.languages) || !options.languages.length) {
    throw new Error('Build requires a nonempty languages array');
  }
  const languages = options.languages.map(language => languageCode_Schema.parse(language));
  if (new Set(languages).size !== languages.length) {
    throw new Error('Build languages must be unique');
  }
  return languages;
};

/** Never emit locale files for languages outside the requested publication scope. */
export const selectPublicationLocales = <Value>(
  locale: Partial<Record<LanguageCode, Value>> | undefined,
  languages: readonly LanguageCode[],
): Partial<Record<LanguageCode, Value>> | undefined => {
  if (!locale) return undefined;
  const selected: Partial<Record<LanguageCode, Value>> = {};
  for (const language of languages) {
    if (locale[language] !== undefined) selected[language] = locale[language];
  }
  return Object.keys(selected).length ? selected : undefined;
};
