import { z } from 'zod';

import { createContentBlockBaseSchema, localizationSwitch, textVariables_Schema } from '../_shared';
import { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';

const contentBlockBase = createContentBlockBaseSchema('text');

const params = contentBlockBase.shape.params.extend({
  ...textVariables_Schema.shape,
  wrap: z
    .object({
      enabled: z.literal(true),
      typographyProps: z.unknown().optional(),
    })
    .optional(),
});

const textBase = contentBlockBase.extend({
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  value: localizationSwitch[mode],
});
export type ContentBlock_Text_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const text_Config_Schema = textBase.extend(addUnifiedLocale(locale('config')));
export type ContentBlock_Text_Config = z.infer<typeof text_Config_Schema>;

export const text_Props_Schema = textBase.extend(addUnifiedLocale(locale('props')));
export type ContentBlock_Text_Props = z.infer<typeof text_Props_Schema>;
