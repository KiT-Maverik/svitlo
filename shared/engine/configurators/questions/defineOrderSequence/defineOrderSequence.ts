import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { orderSequence_Config_Schema, type Question_OrderSequence_Config } from './defineOrderSequence.schemas';

export function defineOrderSequence<const Config extends Question_OrderSequence_Config>(config: Config) {
  orderSequence_Config_Schema.parse(config);

  const { id, type, slug, assessmentMethod, restrictions, question, hint, explanation, sequence } = config;

  const localeEntries = {} as const;

  const base = {
    id,
    type,
    slug,
    assessmentMethod,
    restrictions,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Question_OrderSequence_Config>;

  return {
    kind: 'orderSequence' as const,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Question_OrderSequence_Config>,
    },
    // Nested ContentBlocks remain configurators; the publishing phase resolves them.
    question,
    hint,
    explanation,
    sequence,
  };
}

export type Question_OrderSequence_Configurator = ReturnType<typeof defineOrderSequence>;
