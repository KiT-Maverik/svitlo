import { z } from 'zod';
import { createContentBlockBaseSchema, localizationSwitch } from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';

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

export const markdown_Props_Schema = markdownBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Markdown_Props = z.infer<typeof markdown_Props_Schema>;
