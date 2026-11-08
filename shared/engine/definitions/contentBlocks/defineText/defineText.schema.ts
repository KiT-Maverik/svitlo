import { z } from 'zod';

import {LanguageCode, NonEmptyArray} from '@svitlo/contracts';

import {createContentBlockMetaSchema, textStylingRules_Schema} from "../contentBlock.schemas";
import {ContentBlock_Text_Config} from "./defineText.types";
import {createLocaleSubsetSchema, localeText_Schema, nonTranslatableText_Schema} from "../../../schemas";

const params_Schema = z.object({
  wrap: z.object({
    wrap: z.boolean().optional(),
    /** MUI TypographyProps, checked by the authoring app before serialization. */
    typographyProps: z.object().optional(),
  }).optional(),
}).and(textStylingRules_Schema);

export const createTextConfigSchema = (l: NonEmptyArray<LanguageCode>, config: ContentBlock_Text_Config)=> {
  const base = createContentBlockMetaSchema(config).and(params_Schema);

  if (typeof config.value === 'string') return z.object({value: nonTranslatableText_Schema}).and(base)

  return z.object({ value: createLocaleSubsetSchema(l)}).and(base);
}

export const createTextPropsSchema = (config: ContentBlock_Text_Config)=> {
  const base = createContentBlockMetaSchema(config).and(params_Schema);

  return z.object({ value: localeText_Schema}).and(base);
}
