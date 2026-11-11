import { z } from 'zod';

import { identityBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import type { Configurator_Mode } from '../../configurator.schemas';
import {
  createSectionLocaleBase,
  sectionParamsBase_Schema,
  type Section_Config_Content,
  type Section_Locale,
  type Section_Props_Content,
} from '../_shared__sections';

const sectionBase = identityBase_Schema.extend({
  type: z.literal('codingTask'),
  params: sectionParamsBase_Schema,
});

export type CodingTaskSection_Locale<Mode extends Configurator_Mode> = Section_Locale<Mode>;

export const codingTaskSection_Config_Schema = sectionBase.extend(addUnifiedLocale(createSectionLocaleBase('config')));
export type CodingTaskSection_Config = z.infer<typeof codingTaskSection_Config_Schema> & Section_Config_Content;

export const codingTaskSection_Props_Schema = sectionBase.extend(addUnifiedLocale(createSectionLocaleBase('props')));
export type CodingTaskSection_Props = z.infer<typeof codingTaskSection_Props_Schema> & Section_Props_Content;
