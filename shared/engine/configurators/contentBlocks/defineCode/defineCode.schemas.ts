import { z } from 'zod';
import { createContentBlockBaseSchema, localizationSwitch } from '../_shared__contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';

const contentBlockBase = createContentBlockBaseSchema('code');

const params = contentBlockBase.shape.params.extend({
  language: z.string().min(1),
  // Authored static source text; indentation and line breaks are preserved.
  codeAsText: z.string().min(1),
});

const codeBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode].optional(),
  // Code templates use %_%UPPER_SNAKE_CASE%_% placeholders. Only replacement values are localized.
  variables: z.record(z.string().regex(/^[A-Z][A-Z0-9_]*$/), localizationSwitch[mode]).optional(),
});

export type ContentBlock_Code_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const code_Config_Schema = codeBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Code_Config = z.infer<typeof code_Config_Schema>;

export const code_Props_Schema = codeBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Code_Props = z.infer<typeof code_Props_Schema>;
