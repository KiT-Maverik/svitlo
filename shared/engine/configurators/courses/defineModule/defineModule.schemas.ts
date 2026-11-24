import { z } from 'zod';

import { deepStrict_Schema } from '#schemas';
import type { DeepPartial } from '#types';

import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import type { ConfiguratorChild } from '../../../types/configuratorChild';
import type { Assessment_Stub_Configurator, Episode_Stub_Configurator, Lesson_Stub_Configurator } from '../defineCourseChildStubs/defineCourseChildStubs';
import type { Assessment_Configurator } from '../../assessments/defineAssessment/defineAssessment';
import {
  assessment_Props_Schema,
  type Assessment_Props,
} from '../../assessments/defineAssessment/defineAssessment.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Episode_Configurator } from '../../episodes/defineEpisode/defineEpisode';
import { episode_Props_Schema, type Episode_Props, type Episode_Draft_Props } from '../../episodes/defineEpisode/defineEpisode.schemas';
import type { Lesson_Configurator } from '../../lessons/defineLesson/defineLesson';
import { lesson_Props_Schema, type Lesson_Props, type Lesson_Draft_Props } from '../../lessons/defineLesson/defineLesson.schemas';
import type { Chapter_Configurator } from '../defineChapter/defineChapter';
import { chapter_Props_Schema, type Chapter_Props } from '../defineChapter/defineChapter.schemas';

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
export type Module_Child = ConfiguratorChild<
  Chapter_Configurator | Lesson_Configurator | Episode_Configurator | Assessment_Configurator | Lesson_Stub_Configurator | Episode_Stub_Configurator | Assessment_Stub_Configurator
>;
export type Module_Child_Props = Chapter_Props | Lesson_Props | Episode_Props | Assessment_Props | Lesson_Draft_Props | Episode_Draft_Props;

export const module_Config_Schema = identity.extend({
  ...addUnifiedLocale(locale('config')),
  content: z.object({
    items: z.record(z.string(), z.custom<Module_Child>()),
    order: z.array(z.string()),
  }),
});
export type Module_Config = z.infer<typeof module_Config_Schema>;

export type Module_Metadata_Overrides = {
  params?: DeepPartial<Module_Config['params']>;
  locale?: DeepPartial<Module_Config['locale']>;
};
export const module_Override_Config_Schema: z.ZodType<Module_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: module_Config_Schema.shape.params,
      locale: module_Config_Schema.shape.locale,
    }),
  ),
);
export type Module_Overrides<
  Items extends Record<string, Module_Child> = Record<string, Module_Child>,
  Added extends Record<string, Module_Child> = {},
> = Module_Metadata_Overrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};

export const module_Props_Schema = identity.extend({
  ...addUnifiedLocale(locale('props')),
  content: z.array(z.union([chapter_Props_Schema, lesson_Props_Schema, episode_Props_Schema, assessment_Props_Schema])),
});
export type Module_Props = z.infer<typeof module_Props_Schema>;
