import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { answerWithText_Config_Schema, type Question_AnswerWithText_Config } from './defineAnswerWithText.schemas';

const validate = (config: Question_AnswerWithText_Config) => {
  answerWithText_Config_Schema.parse(config);
};

export function defineAnswerWithText<const Config extends Question_AnswerWithText_Config>(config: Config) {
  validate(config);

  const { id, type, slug, assessmentMethod, restrictions, question, hint, explanation, correctAnswers, placeholder } =
    config;

  const localeEntries = { correctAnswers, placeholder } as const;

  const base = {
    id,
    type,
    slug,
    assessmentMethod,
    restrictions,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Question_AnswerWithText_Config>;

  return {
    id,
    slug,
    type,
    kind: 'answerWithText' as const,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Question_AnswerWithText_Config>,
      validate,
    },
    // Nested ContentBlocks remain configurators; the publishing phase resolves them.
    question,
    hint,
    explanation,
  };
}

export type Question_AnswerWithText_Configurator = ReturnType<typeof defineAnswerWithText>;
