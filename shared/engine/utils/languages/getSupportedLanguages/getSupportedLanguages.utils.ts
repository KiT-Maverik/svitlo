import { DEFAULT_SUPPORTED_LANGUAGES, type LanguageDefinition } from '#schemas';

/** Optional catalog view using Engine-defined locales; no new locale registration. */
type LanguageConfiguration = {
  additionalLanguages?: readonly LanguageDefinition[];
  replaceDefaults?: boolean;
};

export function getSupportedLanguages(configuration: LanguageConfiguration = {}): readonly LanguageDefinition[] {
  const additionalLanguages = configuration.additionalLanguages ?? [];
  return configuration.replaceDefaults
    ? [...additionalLanguages]
    : [...DEFAULT_SUPPORTED_LANGUAGES, ...additionalLanguages];
}
