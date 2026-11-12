import { languageCode_Schema, type LanguageCodes } from '#schemas';

/** Explicit runtime publication scope; authoring tuple constraints remain TypeScript-only. */
export const resolvePublicationLanguages = (
  options: { readonly languages: readonly LanguageCodes[] },
): LanguageCodes[] => {
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
  locale: Partial<Record<LanguageCodes, Value>> | undefined,
  languages: readonly LanguageCodes[],
): Partial<Record<LanguageCodes, Value>> | undefined => {
  if (!locale) return undefined;
  const selected: Partial<Record<LanguageCodes, Value>> = {};
  for (const language of languages) {
    if (locale[language] !== undefined) selected[language] = locale[language];
  }
  return Object.keys(selected).length ? selected : undefined;
};
