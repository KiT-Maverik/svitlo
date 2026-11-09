import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import {
  fillBlanksWithBlocks_Config_Schema,
  type Question_FillBlanksWithBlocks_Config,
} from './defineFillBlanksWithBlocks.schemas';

export function defineFillBlanksWithBlocks<const Config extends Question_FillBlanksWithBlocks_Config>(config: Config) {
  fillBlanksWithBlocks_Config_Schema.parse(config);

  const {
    id,
    type,
    slug,
    assessmentMethod,
    restrictions,
    question,
    hint,
    explanation,
    slots,
    distractors,
    placeholder,
  } = config;

  const localeEntries = { placeholder, slots: slots.map(({ selector }) => ({ selector })) } as const;

  const base = {
    id,
    type,
    slug,
    assessmentMethod,
    restrictions,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Question_FillBlanksWithBlocks_Config>;

  return {
    kind: 'fillBlanksWithBlocks' as const,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Question_FillBlanksWithBlocks_Config>,
    },
    // Nested ContentBlocks remain configurators; the publishing phase resolves them.
    question,
    hint,
    explanation,
    slots,
    distractors,
  };
}

export type Question_FillBlanksWithBlocks_Configurator = ReturnType<typeof defineFillBlanksWithBlocks>;
