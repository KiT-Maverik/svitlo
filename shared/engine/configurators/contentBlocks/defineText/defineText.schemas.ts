import { z } from 'zod';
import type { DeepPartial } from '#types';

import { deepStrict_Schema } from '#schemas';
import { createContentBlockBaseSchema, localizationSwitch, textVariables_Schema } from '../_shared__contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';

const contentBlockBase = createContentBlockBaseSchema('text');

const params = contentBlockBase.shape.params.extend({
  ...textVariables_Schema.shape,
  wrap: z
    .object({
      enabled: z.literal(true),
      // UI-specific MUI props are opaque to Engine, but must be JSON-safe.
      typographyProps: z
        .record(z.string(), z.unknown())
        .refine(value => z.record(z.string(), z.json()).safeParse(value).success, {
          message: 'Typography props must be a JSON-compatible object',
        })
        .optional(),
    })
    .optional(),
});

const textBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  value: localizationSwitch[mode],
});
export type ContentBlock_Text_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const text_Config_Schema = textBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Text_Config = z.infer<typeof text_Config_Schema>;

/** Only configurable fields may be overridden; each nested object rejects unknown keys. */
export type ContentBlock_Text_Overrides = DeepPartial<Pick<ContentBlock_Text_Config, 'params' | 'locale'>>;

export const text_Override_Config_Schema: z.ZodType<ContentBlock_Text_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: text_Config_Schema.shape.params,
      locale: text_Config_Schema.shape.locale,
    }),
  ),
);

/** Required nonlocalized fields come from the Text base schema. */
export type ContentBlock_Text_ResourceBase = z.infer<typeof textBase> & {
  locale?: Partial<ContentBlock_Text_Locale<'props'>>;
};

export const text_Props_Schema = textBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Text_Props = z.infer<typeof text_Props_Schema>;
