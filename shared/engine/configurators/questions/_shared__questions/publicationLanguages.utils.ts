import type { LanguageCodes } from '#schemas';
import { languageCode_Schema } from '#schemas';
import { mergeForValidation } from '../../_shared__configurators';

/**
 * Mirrors the explicit Build option introduced in PR #478.
 * The integration owner should consolidate this local declaration with
 * #types.PublicationLanguageOptions when all workstreams share a base.
 */
export type PublicationLanguageOptions<Languages extends readonly LanguageCodes[] = readonly LanguageCodes[]> = {
  readonly languages: readonly ([Languages[number]] extends [never] ? LanguageCodes : Languages[number])[];
};

/** A publication scope is explicit, valid, nonempty and has no duplicate codes. */
export const resolvePublicationLanguages = (
  options: { readonly languages: readonly LanguageCodes[] },
): LanguageCodes[] => {
  if (!options || !Array.isArray(options.languages) || options.languages.length === 0) {
    throw new Error('Build requires a nonempty languages array');
  }
  const languages = options.languages.map(language => languageCode_Schema.parse(language));
  if (new Set(languages).size !== languages.length) {
    throw new Error('Build languages must be unique');
  }
  return languages;
};

export const selectPublicationLocales = <T>(
  locale: Partial<Record<LanguageCodes, T>> | undefined,
  languages: readonly LanguageCodes[],
): Partial<Record<LanguageCodes, T>> | undefined => {
  if (!locale) return undefined;
  const selected: Partial<Record<LanguageCodes, T>> = {};
  for (const language of languages) {
    if (locale[language] !== undefined) selected[language] = locale[language];
  }
  return Object.keys(selected).length ? selected : undefined;
};

type Publication = {
  base: object;
  locale: Partial<Record<LanguageCodes, object>> | undefined;
};

/** Validate each requested effective Props value, not only the authoring metadata. */
export const validateQuestionPublication = (
  schema: { parse(value: unknown): unknown },
  languages: readonly LanguageCodes[],
  resource: Publication,
  patch?: Publication,
): void => {
  for (const language of languages) {
    const localized = mergeForValidation(resource.base, resource.locale?.[language] ?? {});
    const withPatchBase = mergeForValidation(localized, patch?.base ?? {});
    const resolved = mergeForValidation(withPatchBase, patch?.locale?.[language] ?? {});
    try {
      schema.parse(resolved);
    } catch (error) {
      throw new Error(
        'Invalid Question publication for ' + language + ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
};
