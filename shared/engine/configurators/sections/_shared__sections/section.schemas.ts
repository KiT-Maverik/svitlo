import { z } from 'zod';
import type { Section_Type } from '../section.constants';
import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import { contentBlockLocalizationSwitch as localizationSwitch } from '../../contentBlocks';
import type { Configurator_Mode } from '../../configurator.schemas';

const sectionParams = paramsBase_Schema.shape.params.extend({
  skippable: z.literal(true).optional(),
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
  navigationLabel: localizationSwitch[mode],
});
export type Section_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;

export const createSectionBaseSchema = <const Type extends Section_Type>(type: Type) => {
  const identity = identityBase_Schema.extend({
    type: z.literal(type),
    params: sectionParams,
  });
  return {
    config: identity.extend(addUnifiedLocale(locale('config'))),
    props: identity.extend(addUnifiedLocale(locale('props'))),
  };
};
