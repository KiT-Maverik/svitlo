import type { DeepPartial } from '#types';
import type { LanguageCode } from '#schemas';

import { mergeForValidation } from './assemblyFields.utils';

/** Validate the effective Props for every explicitly selected publication locale. */
export const validateRequestedPublication = (
  schema: { parse(value: unknown): unknown },
  resource: { base: unknown; locale?: Partial<Record<LanguageCode, unknown>> },
  languages: readonly LanguageCode[],
  patch?: { base: unknown; locale?: Partial<Record<LanguageCode, unknown>> },
): void => {
  for (const language of languages) {
    const original = mergeForValidation(resource.base, (resource.locale?.[language] ?? {}) as DeepPartial<unknown>);
    const base = patch ? mergeForValidation(original, patch.base as DeepPartial<unknown>) : original;
    const effective = patch ? mergeForValidation(base, (patch.locale?.[language] ?? {}) as DeepPartial<unknown>) : base;
    try {
      schema.parse(effective);
    } catch (error) {
      throw new Error(
        'Invalid publication for language ' +
          language +
          ': ' +
          (error instanceof Error ? error.message : String(error)),
        { cause: error },
      );
    }
  }
};
