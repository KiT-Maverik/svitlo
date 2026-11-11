import { z } from 'zod';
import { createContentBlockBaseSchema, localizationSwitch } from '../_shared__contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';

const contentBlockBase = createContentBlockBaseSchema('markdown');

const params = contentBlockBase.shape.params.extend({});

const markdownBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  value: localizationSwitch[mode],
});
export type ContentBlock_Markdown_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const markdown_Config_Schema = markdownBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Markdown_Config = z.infer<typeof markdown_Config_Schema>;

export const markdown_Props_Schema = markdownBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Markdown_Props = z.infer<typeof markdown_Props_Schema>;
