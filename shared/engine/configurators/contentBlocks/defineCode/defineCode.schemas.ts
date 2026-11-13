import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { createContentBlockBaseSchema, localizationSwitch } from '../contentBlock.schemas';

import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';

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

/** Sparse overrides derive permitted fields directly from the authored Config Schema. */
export type ContentBlock_Code_Overrides = DeepPartial<Pick<ContentBlock_Code_Config, 'params' | 'locale'>>;

export const code_Override_Config_Schema: z.ZodType<ContentBlock_Code_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: code_Config_Schema.shape.params,
      locale: code_Config_Schema.shape.locale,
    }),
  ),
);

export type ContentBlock_Code_PropsBase = z.infer<typeof codeBase> & {
  locale?: DeepPartial<ContentBlock_Code_Locale<'props'>>;
};

// Code can contain only params.codeAsText, with neither title nor replacements.
// An invariant-only resource therefore legitimately omits its optional locale.
export const code_Props_Schema = codeBase.extend({ locale: z.object(locale('props')).optional() });
export type ContentBlock_Code_Props = z.infer<typeof code_Props_Schema>;
