import { z } from 'zod';

import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import { contentBlockLocalizationSwitch } from '../../contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import type { Section_Config_Content, Section_Props_Content } from '../_shared__sections';

const params = paramsBase_Schema.shape.params.extend({
  skippable: z.literal(true).optional(),
});

const sectionBase = identityBase_Schema.extend({
  type: z.literal('content'),
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: contentBlockLocalizationSwitch[mode],
  navigationLabel: contentBlockLocalizationSwitch[mode],
});
export type ContentSection_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;

export const contentSection_Config_Schema = sectionBase.extend(addUnifiedLocale(locale('config')));
export type Content_Section_Config = z.infer<typeof contentSection_Config_Schema> & Section_Config_Content;

export const contentSection_Props_Schema = sectionBase.extend(addUnifiedLocale(locale('props')));
export type Content_Section_Props = z.infer<typeof contentSection_Props_Schema> & Section_Props_Content;
