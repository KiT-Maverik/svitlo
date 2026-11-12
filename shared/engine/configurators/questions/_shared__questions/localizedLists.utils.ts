import type { LanguageCodes } from '#schemas';
import { camelCase_Schema, languageCode_Schema } from '#schemas';
import { mergeForValidation } from '../../_shared__configurators';
import { cloneJson, isRecord } from './collections.utils';

export type LocalizedText = string | Partial<Record<LanguageCodes, string>>;
export type LocalizedTextList = Record<string, LocalizedText>;
export type LocalizedSlotList = Record<string, { correctAnswers: LocalizedTextList }>;
type Files<T> = Partial<Record<LanguageCodes, T>>;
type Projection<T> = { base?: T; locale: Files<T> };

const knownLanguages = (source: unknown): LanguageCodes[] => {
  const out = new Set<LanguageCodes>();
  const walk = (value: unknown): void => {
    if (!isRecord(value)) return;
    if (Object.keys(value).length && Object.keys(value).every(key => languageCode_Schema.safeParse(key).success)) {
      for (const key of Object.keys(value)) out.add(key as LanguageCodes);
      return;
    }
    for (const nested of Object.values(value)) walk(nested);
  };
  walk(source);
  return [...out];
};
const resolve = (value: LocalizedText, language: LanguageCodes): string | undefined =>
  typeof value === 'string' ? value : value[language];

/**
 * Project a keyed set of accepted textual answers to an atomic resolved array.
 * Localized one-language overrides affect only that language's full replacement array.
 */
export const projectAnswerList = (
  original: LocalizedTextList,
  patch?: Partial<LocalizedTextList>,
): Projection<string[]> => {
  const effective = patch ? mergeForValidation(cloneJson(original), patch) : cloneJson(original);
  const keys = Object.keys(effective);
  for (const key of keys) {
    if (!camelCase_Schema.safeParse(key).success) throw new Error('Invalid answer key: ' + key);
  }
  const values = keys.map(key => effective[key]);
  const allInvariant = values.every(value => typeof value === 'string');
  const structural = patch !== undefined && Object.keys(patch).some(key => !Object.hasOwn(original, key));
  const invariantChanged = patch !== undefined && Object.values(patch).some(value => typeof value === 'string');
  const affected = !patch || structural || invariantChanged
    ? knownLanguages(effective)
    : knownLanguages(patch);
  const locale: Files<string[]> = {};
  for (const language of affected) {
    const answers = values.map(value => resolve(value, language));
    if (answers.some(value => typeof value !== 'string')) {
      throw new Error('Incomplete accepted-answer set for language ' + language);
    }
    locale[language] = answers as string[];
  }
  return {
    ...(allInvariant ? { base: values as string[] } : {}),
    locale,
  };
};

/** Named slot selectors and accepted values become resolved positional UI props only after Build. */
export const projectSlotList = (
  original: LocalizedSlotList,
  patch?: Partial<LocalizedSlotList>,
): Projection<Array<{ selector: string; correctAnswers: string[] }>> => {
  const effective = patch ? mergeForValidation(cloneJson(original), patch) : cloneJson(original);
  const entries = Object.entries(effective);
  for (const [selector, slot] of entries) {
    if (!camelCase_Schema.safeParse(selector).success || !isRecord(slot) || !isRecord(slot.correctAnswers)) {
      throw new Error('Invalid named text slot: ' + selector);
    }
  }
  const toArray = (language?: LanguageCodes) => entries.map(([selector, slot]) => ({
    selector,
    correctAnswers: Object.values(slot.correctAnswers).map(value => {
      const resolved = language ? resolve(value, language) : typeof value === 'string' ? value : undefined;
      if (resolved === undefined) throw new Error('Incomplete text slot ' + selector +
        (language ? ' for language ' + language : ' in invariant source'));
      return resolved;
    }),
  }));
  const allInvariant = entries.every(([, slot]) =>
    Object.values(slot.correctAnswers).every(value => typeof value === 'string'));
  const structural = patch !== undefined && Object.keys(patch).some(key => !Object.hasOwn(original, key));
  const invariantChanged = patch !== undefined && Object.values(patch).some(slot =>
    Object.values(slot.correctAnswers ?? {}).some(value => typeof value === 'string'));
  const affected = !patch || structural || invariantChanged
    ? knownLanguages(effective)
    : knownLanguages(patch);
  const locale: Files<Array<{ selector: string; correctAnswers: string[] }>> = {};
  for (const language of affected) locale[language] = toArray(language);
  return { ...(allInvariant ? { base: toArray() } : {}), locale };
};
