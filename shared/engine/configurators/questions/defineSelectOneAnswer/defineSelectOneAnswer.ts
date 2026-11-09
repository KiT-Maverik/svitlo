import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { selectOneAnswer_Config_Schema, type Question_SelectOneAnswer_Config } from './defineSelectOneAnswer.schemas';

export function defineSelectOneAnswer<const Config extends Question_SelectOneAnswer_Config>(config: Config) {
  selectOneAnswer_Config_Schema.parse(config);

  const { id, type, slug, assessmentMethod, restrictions, question, hint, explanation, answers } = config;

  const localeEntries = {} as const;

  const base = {
    id,
    type,
    slug,
    assessmentMethod,
    restrictions,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Question_SelectOneAnswer_Config>;

  return {
    kind: 'selectOneAnswer' as const,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Question_SelectOneAnswer_Config>,
    },
    // Nested ContentBlocks remain configurators; the publishing phase resolves them.
    question,
    hint,
    explanation,
    answers,
  };
}

export type Question_SelectOneAnswer_Configurator = ReturnType<typeof defineSelectOneAnswer>;
