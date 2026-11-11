import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { matchBlocks_Config_Schema, type Question_MatchBlocks_Config } from './defineMatchBlocks.schemas';

const validate = (config: Question_MatchBlocks_Config) => {
  matchBlocks_Config_Schema.parse(config);
};

export function defineMatchBlocks<const Config extends Question_MatchBlocks_Config>(config: Config) {
  validate(config);

  const { id, type, slug, assessmentMethod, restrictions, question, hint, explanation, pairs } = config;

  const localeEntries = {} as const;

  const base = {
    id,
    type,
    slug,
    assessmentMethod,
    restrictions,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Question_MatchBlocks_Config>;

  return {
    id,
    slug,
    type,
    kind: 'matchBlocks' as const,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Question_MatchBlocks_Config>,
      validate,
    },
    // Nested ContentBlocks remain configurators; the publishing phase resolves them.
    question,
    hint,
    explanation,
    pairs,
  };
}

export type Question_MatchBlocks_Configurator = ReturnType<typeof defineMatchBlocks>;
