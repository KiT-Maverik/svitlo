import {
  DEFAULT_SUPPORTED_LANGUAGES,
  type LanguageConfiguration,
  type LanguageDefinition,
} from '@svitlo/contracts/localization';

export function getSupportedLanguages(configuration: LanguageConfiguration = {}): readonly LanguageDefinition[] {
  const additionalLanguages = configuration.additionalLanguages ?? [];
  return configuration.replaceDefaults
    ? [...additionalLanguages]
    : [...DEFAULT_SUPPORTED_LANGUAGES, ...additionalLanguages];
}
