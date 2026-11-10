import { z } from 'zod';
import { createContentBlockBaseSchema, localizationSwitch,  } from '../_shared';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared';

const contentBlockBase = createContentBlockBaseSchema('code');
const params = contentBlockBase.shape.params.extend({
  language: z.string().min(1),
});
const codeBase = contentBlockBase.extend({ params });

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode].optional(),
  code: localizationSwitch[mode].optional(),
  fileLocation: localizationSwitch[mode].optional(),
  variables: z.array(z.object({ id: z.string().min(1), value: localizationSwitch[mode] })).optional(),
});
export type ContentBlock_Code_Locale<Mode extends Configurator_Mode> = z.infer<
  z.ZodObject<ReturnType<typeof locale<Mode>>>
>;

export const code_Config_Schema = codeBase.extend(addUnifiedLocale(locale('config'))).refine(value => Number(value.locale.code !== undefined) + Number(value.locale.fileLocation !== undefined) === 1, {
    message: 'Provide exactly one of code or fileLocation',
  });
export type ContentBlock_Code_Config = z.infer<typeof code_Config_Schema>;

export const code_Props_Schema = codeBase.extend(addUnifiedLocale(locale('props'))).refine(value => Number(value.locale.code !== undefined) + Number(value.locale.fileLocation !== undefined) === 1, {
    message: 'Provide exactly one of code or fileLocation',
  });
export type ContentBlock_Code_Props = z.infer<typeof code_Props_Schema>;
