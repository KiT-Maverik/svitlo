import { z } from 'zod';

import type { Locale_Languages } from '@svitlo/contracts';

import { createContentBlockMetaSchema, textStylingRules_Schema } from '../contentBlock.schemas';
import type { ContentBlock_Text_Config } from './defineText.types';
import { createLocaleSubsetSchema, localeText_Schema, nonTranslatableText_Schema } from '../../../schemas';

const params_Schema = z.strictObject({
  ...textStylingRules_Schema.shape,
  wrap: z
    .strictObject({
      enabled: z.literal(true).optional(),
      /** MUI TypographyProps, checked by the authoring app before serialization. */
      typographyProps: z.unknown().optional(),
    })
    .optional(),
});

export const createTextConfigSchema = <SupportedLanguages extends Locale_Languages>(
  languages: SupportedLanguages,
  config: ContentBlock_Text_Config<SupportedLanguages>,
) => {
  const base = createContentBlockMetaSchema(config.type);
  const value =
    typeof config.value === 'string' ? nonTranslatableText_Schema : createLocaleSubsetSchema(languages, true);

  return z.strictObject({ ...base.shape, params: params_Schema, value });
};

export const createTextPropsSchema = <SupportedLanguages extends Locale_Languages>(
  config: ContentBlock_Text_Config<SupportedLanguages>,
) => {
  return z.strictObject({
    ...createContentBlockMetaSchema(config.type).shape,
    params: z.strictObject({ ...params_Schema.shape, disabled: z.literal(true).optional() }),
    value: localeText_Schema,
  });
};
