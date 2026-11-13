import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import { lesson_Props_Schema, type Lesson_Configurator, type Lesson_Props } from '../../lessons/defineLesson';

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
export type Chapter_Child = Lesson_Configurator;
export type Chapter_Child_Props = Lesson_Props;

export const chapter_Config_Schema = identity.extend({
  ...addUnifiedLocale(locale('config')),
  content: z.object({
    items: z.record(z.string(), z.custom<Chapter_Child>()),
    order: z.array(z.string()),
  }),
});
export type Chapter_Config = z.infer<typeof chapter_Config_Schema>;

export type Chapter_Metadata_Overrides = {
  params?: DeepPartial<Chapter_Config['params']>;
  locale?: DeepPartial<Chapter_Config['locale']>;
};
export const chapter_Override_Config_Schema: z.ZodType<Chapter_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: chapter_Config_Schema.shape.params,
      locale: chapter_Config_Schema.shape.locale,
    }),
  ),
);
export type Chapter_Overrides<
  Items extends Record<string, Chapter_Child> = Record<string, Chapter_Child>,
  Added extends Record<string, Chapter_Child> = {},
> = Chapter_Metadata_Overrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};

export const chapter_Props_Schema = identity.extend({
  ...addUnifiedLocale(locale('props')),
  content: z.array(lesson_Props_Schema),
});
export type Chapter_Props = z.infer<typeof chapter_Props_Schema>;
