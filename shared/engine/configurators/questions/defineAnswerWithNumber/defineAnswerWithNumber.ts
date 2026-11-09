import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { answerWithNumber_Config_Schema, type Question_AnswerWithNumber_Config } from './defineAnswerWithNumber.schemas';

export function defineAnswerWithNumber<const Config extends Question_AnswerWithNumber_Config>(config: Config) {
  answerWithNumber_Config_Schema.parse(config);

  const { id, type, slug, assessmentMethod, restrictions, question, hint, explanation, correctAnswers, placeholder } = config;

  const localeEntries = { placeholder } as const;

  const base = {
    id,
    type,
    slug,
    assessmentMethod,
    restrictions,
    correctAnswers,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Question_AnswerWithNumber_Config>;

  return {
    kind: 'answerWithNumber' as const,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Question_AnswerWithNumber_Config>,
    },
    // Nested ContentBlocks remain configurators; the publishing phase resolves them.
    question,
    hint,
    explanation,
  };
}

export type Question_AnswerWithNumber_Configurator = ReturnType<typeof defineAnswerWithNumber>;
