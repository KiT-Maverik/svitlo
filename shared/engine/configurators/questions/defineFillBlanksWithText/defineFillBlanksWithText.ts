import type { DeepPartial } from '#types';

import { onlyLocales, onlyStrings } from '../../_utils';

import { fillBlanksWithText_Config_Schema, type Question_FillBlanksWithText_Config } from './defineFillBlanksWithText.schemas';

export function defineFillBlanksWithText<const Config extends Question_FillBlanksWithText_Config>(config: Config) {
  fillBlanksWithText_Config_Schema.parse(config);

  const { id, type, slug, assessmentMethod, restrictions, question, hint, explanation, slots, placeholder } = config;

  const localeEntries = { slots, placeholder } as const;

  const base = {
    id,
    type,
    slug,
    assessmentMethod,
    restrictions,
    ...onlyStrings(localeEntries),
  } satisfies DeepPartial<Question_FillBlanksWithText_Config>;

  return {
    kind: 'fillBlanksWithText' as const,
    config: {
      base,
      locales: () => onlyLocales(localeEntries) satisfies DeepPartial<Question_FillBlanksWithText_Config>,
    },
    // Nested ContentBlocks remain configurators; the publishing phase resolves them.
    question,
    hint,
    explanation,
  };
}

export type Question_FillBlanksWithText_Configurator = ReturnType<typeof defineFillBlanksWithText>;
