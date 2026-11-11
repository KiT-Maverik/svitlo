import { z } from 'zod';

import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import type { Lesson_Configurator, Lesson_Props } from '../../lessons/defineLesson';

const params = paramsBase_Schema.shape.params.extend({
  iconKey: z.string().optional(),
});

const identity = identityBase_Schema.extend({
  type: z.literal('chapter'),
  params,
});

const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
});
export type Chapter_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;

export type Chapter_Content = { items: Record<string, Lesson_Configurator | false>; order: string[] };

export const chapter_Config_Schema = identity.extend(addUnifiedLocale(locale('config')));
export type Chapter_Config = z.infer<typeof chapter_Config_Schema> & { content: Chapter_Content };

export const chapter_Props_Schema = identity.extend(addUnifiedLocale(locale('props')));
export type Chapter_Props = z.infer<typeof chapter_Props_Schema> & {
  content: { items: Record<string, Lesson_Props>; order: string[] };
};
