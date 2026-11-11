import { z } from 'zod';

import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import { contentBlockLocalizationSwitch } from '../../contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import type { Section_Config_Content, Section_Props_Content } from '../_shared__sections';

const params = paramsBase_Schema.shape.params.extend({
  skippable: z.literal(true).optional(),
});

const sectionBase = identityBase_Schema.extend({
  type: z.literal('codingTask'),
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: contentBlockLocalizationSwitch[mode],
  navigationLabel: contentBlockLocalizationSwitch[mode],
});
export type CodingTaskSection_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const codingTaskSection_Config_Schema = sectionBase.extend(addUnifiedLocale(locale('config')));
export type CodingTaskSection_Config = z.infer<typeof codingTaskSection_Config_Schema> & Section_Config_Content;

export const codingTaskSection_Props_Schema = sectionBase.extend(addUnifiedLocale(locale('props')));
export type CodingTaskSection_Props = z.infer<typeof codingTaskSection_Props_Schema> & Section_Props_Content;
