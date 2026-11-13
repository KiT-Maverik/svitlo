import type { LanguageCode } from '#schemas';
import { mergeForValidation } from '../../_shared__configurators';
export { resolvePublicationLanguages, selectPublicationLocales } from '../../_shared__configurators';
export type { PublicationLanguageOptions } from '#types';

type Publication = {
  base: object;
  locale: Partial<Record<LanguageCode, object>> | undefined;
};

/** Validate each requested effective Props value, not only the authoring metadata. */
export const validateQuestionPublication = (
  schema: { parse(value: unknown): unknown },
  languages: readonly LanguageCode[],
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
        'Invalid Question publication for ' +
          language +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
};
