import type { LanguageCode } from '#schemas';

import { mergeForValidation } from '../../_shared__configurators';

export { resolvePublicationLanguages, selectPublicationLocales } from '../../_shared__configurators';
export type { PublicationLanguageOptions } from '#types';

type Publication = {
  base: object;
  locale: Partial<Record<LanguageCode, object>> | undefined;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Keyed sibling collections are atomic on an override: no stale removed keys survive. */
const mergeQuestionLayer = (original: object, patch: object) => {
  const merged = mergeForValidation(original, patch);
  const own = isRecord(patch) ? patch : {};
  if (isRecord(merged) && isRecord(merged.content) && isRecord(own.content)) {
    for (const field of [
      'question',
      'hint',
      'explanation',
      'pairs',
      'slots',
      'sequence',
      'correctSequence',
      'distractors',
    ] as const) {
      if (isRecord(own.content[field]) && Array.isArray(own.content[field].children)) {
        merged.content[field] = structuredClone(own.content[field]);
      }
    }
    if (isRecord(own.content.answers) && isRecord(merged.content.answers)) {
      for (const field of ['correct', 'incorrect', 'distractors'] as const) {
        const group = own.content.answers[field];
        if (isRecord(group) && Array.isArray(group.children)) {
          merged.content.answers[field] = structuredClone(group);
        }
      }
    }
  }
  if (
    isRecord(merged) &&
    isRecord(merged.locale) &&
    isRecord(own.locale) &&
    isRecord(own.locale.slots) &&
    Array.isArray(own.locale.slots.children)
  ) {
    merged.locale.slots = structuredClone(own.locale.slots);
  }
  return merged;
};

/** Validate each requested effective Props value, not only the authoring metadata. */
export const validateQuestionPublication = (
  schema: { parse(value: unknown): unknown },
  languages: readonly LanguageCode[],
  resource: Publication,
  patch?: Publication,
): void => {
  for (const language of languages) {
    const localized = mergeQuestionLayer(resource.base, resource.locale?.[language] ?? {});
    const withPatchBase = mergeQuestionLayer(localized, patch?.base ?? {});
    const resolved = mergeQuestionLayer(withPatchBase, patch?.locale?.[language] ?? {});
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
