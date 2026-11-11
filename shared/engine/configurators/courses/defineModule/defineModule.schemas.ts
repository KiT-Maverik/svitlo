import { z } from 'zod';

import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import type { Lesson_Configurator, Lesson_Props } from '../../lessons/defineLesson';
import type { Chapter_Configurator, Chapter_Props } from '../defineChapter';

const params = paramsBase_Schema.shape.params.extend({
  iconKey: z.string().optional(),
});

const identity = identityBase_Schema.extend({
  type: z.literal('module'),
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
});
export type Module_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;

export type Module_Child = Chapter_Configurator | Lesson_Configurator;
export type Module_Child_Props = Chapter_Props | Lesson_Props;

export type Module_Content = { items: Record<string, Module_Child | false>; order: string[] };

export const module_Config_Schema = identity.extend(addUnifiedLocale(locale('config')));
export type Module_Config = z.infer<typeof module_Config_Schema> & { content: Module_Content };

export const module_Props_Schema = identity.extend(addUnifiedLocale(locale('props')));
export type Module_Props = z.infer<typeof module_Props_Schema> & {
  content: { items: Record<string, Module_Child_Props>; order: string[] };
};
