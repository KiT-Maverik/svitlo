import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { buildAnswerWithBlocks_Config_Schema, type Question_BuildAnswerWithBlocks_Config } from './defineBuildAnswerWithBlocks.schemas';

export function defineBuildAnswerWithBlocks<const Config extends Question_BuildAnswerWithBlocks_Config>(config: Config) {
  buildAnswerWithBlocks_Config_Schema.parse(config);

  const { id, type, slug, assessmentMethod, restrictions, question, hint, explanation, correctSequence, distractors, placeholder } = config;

  const localeEntries = { placeholder } as const;

  const base = {
    id,
    type,
    slug,
    assessmentMethod,
    restrictions,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Question_BuildAnswerWithBlocks_Config>;

  return {
    kind: 'buildAnswerWithBlocks' as const,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Question_BuildAnswerWithBlocks_Config>,
    },
    // Nested ContentBlocks remain configurators; the publishing phase resolves them.
    question,
    hint,
    explanation,
    correctSequence, distractors,
  };
}

export type Question_BuildAnswerWithBlocks_Configurator = ReturnType<typeof defineBuildAnswerWithBlocks>;
