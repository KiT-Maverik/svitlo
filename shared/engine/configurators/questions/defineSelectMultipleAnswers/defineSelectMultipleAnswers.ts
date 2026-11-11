import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import {
  selectMultipleAnswers_Config_Schema,
  type Question_SelectMultipleAnswers_Config,
} from './defineSelectMultipleAnswers.schemas';

const validate = (config: Question_SelectMultipleAnswers_Config) => {
  selectMultipleAnswers_Config_Schema.parse(config);
};

export function defineSelectMultipleAnswers<const Config extends Question_SelectMultipleAnswers_Config>(
  config: Config,
) {
  validate(config);

  const { id, type, slug, assessmentMethod, restrictions, question, hint, explanation, answers } = config;

  const localeEntries = {} as const;

  const base = {
    id,
    type,
    slug,
    assessmentMethod,
    restrictions,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Question_SelectMultipleAnswers_Config>;

  return {
    id,
    slug,
    type,
    kind: 'selectMultipleAnswers' as const,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Question_SelectMultipleAnswers_Config>,
      validate,
    },
    // Nested ContentBlocks remain configurators; the publishing phase resolves them.
    question,
    hint,
    explanation,
    answers,
  };
}

export type Question_SelectMultipleAnswers_Configurator = ReturnType<typeof defineSelectMultipleAnswers>;
