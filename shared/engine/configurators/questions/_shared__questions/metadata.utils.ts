import type { DeepPartial } from '#types';
import type { LanguageCodes } from '#schemas';
import { mergeForValidation, splitLocalizedFields } from '../../_shared__configurators';
import { cloneJson, isRecord } from './collections.utils';

export type QuestionFiles = Partial<Record<LanguageCodes, Record<string, unknown>>>;
export type QuestionPublication<Base> = { base: Base; locale: QuestionFiles | undefined };

export const projectQuestionLocale = (input: Record<string, unknown>) => {
  const own = splitLocalizedFields(input);
  const files: QuestionFiles = {};
  for (const [language, fields] of Object.entries(own.locale ?? {})) {
    files[language as LanguageCodes] = { locale: cloneJson(fields) };
  }
  return { base: cloneJson(own.base), files };
};

export const ensureQuestionPatchShape = (patch: unknown): asserts patch is Record<string, unknown> => {
  if (!isRecord(patch)) throw new Error('Question overrides must be a plain object');
  for (const key of Object.keys(patch)) {
    if (!['params', 'locale', 'content'].includes(key)) {
      throw new Error('Unknown Question override field: ' + key);
    }
  }
};

export const validateEffectiveQuestionMetadata = <T extends object>(
  source: T,
  patch: DeepPartial<T>,
  parse: (candidate: unknown) => unknown,
): void => {
  parse(mergeForValidation(cloneJson(source), cloneJson(patch)));
};

export const mergeQuestionContent = (
  files: QuestionFiles,
  own: Record<string, unknown>,
  extra: Record<string, unknown> = {},
): void => {
  for (const [language, fields] of Object.entries(own)) {
    (files[language as LanguageCodes] ??= {}).content = cloneJson(fields);
  }
  for (const [language, fields] of Object.entries(extra)) {
    const file = (files[language as LanguageCodes] ??= {});
    file.content = mergeForValidation(
      (file.content ?? {}) as Record<string, unknown>,
      fields as DeepPartial<Record<string, unknown>>,
    );
  }
};

export const finishFiles = (files: QuestionFiles): QuestionFiles | undefined =>
  Object.keys(files).length ? files : undefined;
