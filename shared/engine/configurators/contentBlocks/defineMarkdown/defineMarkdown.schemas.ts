import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { createContentBlockBaseSchema, localizationSwitch } from '../_shared__contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';

const contentBlockBase = createContentBlockBaseSchema('markdown');
const markdownBase = contentBlockBase.extend({ params: contentBlockBase.shape.params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  value: localizationSwitch[mode],
  // Use the same %_%UPPER_SNAKE_CASE%_% placeholders as Code.
  variables: z.record(z.string().regex(/^[A-Z][A-Z0-9_]*$/), localizationSwitch[mode]).optional(),
});

export type ContentBlock_Markdown_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const markdown_Config_Schema = markdownBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Markdown_Config = z.infer<typeof markdown_Config_Schema>;

/** Sparse overrides derive permitted fields directly from the authored Config Schema. */
export type ContentBlock_Markdown_Overrides = DeepPartial<Pick<ContentBlock_Markdown_Config, 'params' | 'locale'>>;

export const markdown_Override_Config_Schema: z.ZodType<ContentBlock_Markdown_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: markdown_Config_Schema.shape.params,
      locale: markdown_Config_Schema.shape.locale,
    }),
  ),
);

export type ContentBlock_Markdown_ResourceBase = z.infer<typeof markdownBase> & {
  locale?: DeepPartial<ContentBlock_Markdown_Locale<'props'>>;
};

export const markdown_Props_Schema = markdownBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Markdown_Props = z.infer<typeof markdown_Props_Schema>;
