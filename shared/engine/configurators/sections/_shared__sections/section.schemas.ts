import { z } from 'zod';

import { paramsBase_Schema } from '../../_shared__configurators';
import { contentBlockLocalizationSwitch } from '../../contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';

export const sectionParamsBase_Schema = paramsBase_Schema.shape.params.extend({
  skippable: z.literal(true).optional(),
});

export const createSectionLocaleBase = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: contentBlockLocalizationSwitch[mode],
  navigationLabel: contentBlockLocalizationSwitch[mode],
});

export type Section_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof createSectionLocaleBase<Mode>>>
>;
