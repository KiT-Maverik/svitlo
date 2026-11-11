import { z } from 'zod';

import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import { contentBlockLocalizationSwitch } from '../../contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import type { Section_Config_Content, Section_Props_Content } from '../_shared__sections';

const params = paramsBase_Schema.shape.params.extend({
  skippable: z.literal(true).optional(),
});

const sectionBase = identityBase_Schema.extend({
  type: z.literal('practice'),
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: contentBlockLocalizationSwitch[mode],
  navigationLabel: contentBlockLocalizationSwitch[mode],
});
export type PracticeSection_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;

export const practiceSection_Config_Schema = sectionBase.extend(addUnifiedLocale(locale('config')));
export type PracticeSection_Config = z.infer<typeof practiceSection_Config_Schema> & Section_Config_Content;

export const practiceSection_Props_Schema = sectionBase.extend(addUnifiedLocale(locale('props')));
export type PracticeSection_Props = z.infer<typeof practiceSection_Props_Schema> & Section_Props_Content;
