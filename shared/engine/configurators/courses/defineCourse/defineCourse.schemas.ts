import type { ConfiguratorChild } from '../../../types/configuratorChild';
import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema, languageCode_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import { module_Props_Schema } from '../defineModule/defineModule.schemas';
import type { Module_Configurator } from '../defineModule/defineModule';
import type { Module_Props } from '../defineModule/defineModule.schemas';
import { chapter_Props_Schema } from '../defineChapter/defineChapter.schemas';
import type { Chapter_Configurator } from '../defineChapter/defineChapter';
import type { Chapter_Props } from '../defineChapter/defineChapter.schemas';
import { lesson_Props_Schema } from '../../lessons/defineLesson/defineLesson.schemas';
import type { Lesson_Configurator } from '../../lessons/defineLesson/defineLesson';
import type { Lesson_Props } from '../../lessons/defineLesson/defineLesson.schemas';
import { episode_Props_Schema } from '../../episodes/defineEpisode/defineEpisode.schemas';
import type { Episode_Configurator } from '../../episodes/defineEpisode/defineEpisode';
import type { Episode_Props } from '../../episodes/defineEpisode/defineEpisode.schemas';

const params = paramsBase_Schema.shape.params.extend({
  languages: z
    .array(languageCode_Schema)
    .nonempty()
    .refine(values => new Set(values).size === values.length, 'Course languages must be unique'),
  scenarioMode: z.enum(['none', 'story']).optional(),
  prerequisites: z
    .object({
      skills: z.array(z.uuid()).optional(),
      skillGroups: z.array(z.uuid()).optional(),
      skillDomains: z.array(z.uuid()).optional(),
      courses: z.array(z.uuid()).optional(),
    })
    .optional(),
});
const identity = identityBase_Schema.extend({
  type: z.literal('course'),
  params,
});
const locale = <Mode extends Configurator_Mode>(mode: Mode) => ({
  title: localizationSwitch[mode],
  description: localizationSwitch[mode],
  prerequisitesText: localizationSwitch[mode].optional(),
});
export type Course_Locale<Mode extends Configurator_Mode> = z.infer<z.ZodObject<ReturnType<typeof locale<Mode>>>>;
export type Course_Child = ConfiguratorChild<Module_Configurator | Chapter_Configurator | Lesson_Configurator | Episode_Configurator>;
export type Course_Child_Props = Module_Props | Chapter_Props | Lesson_Props | Episode_Props;

export const course_Config_Schema = identity.extend({
  ...addUnifiedLocale(locale('config')),
  content: z.object({
    items: z.record(z.string(), z.custom<Course_Child>()),
    order: z.array(z.string()),
  }),
});
export type Course_Config = z.infer<typeof course_Config_Schema>;

export type Course_Metadata_Overrides = {
  params?: DeepPartial<Omit<Course_Config['params'], 'languages'>>;
  locale?: DeepPartial<Course_Config['locale']>;
};
export const course_Override_Config_Schema: z.ZodType<Course_Metadata_Overrides> = z.deepPartial(
  deepStrict_Schema(
    z.object({
      params: course_Config_Schema.shape.params.omit({ languages: true }),
      locale: course_Config_Schema.shape.locale,
    }),
  ),
);
export type Course_Overrides<
  Items extends Record<string, Course_Child> = Record<string, Course_Child>,
  Added extends Record<string, Course_Child> = {},
> = Course_Metadata_Overrides & {
  content?: {
    items?: { [Key in keyof Items]?: Parameters<Items[Key]['build']['overrides']>[0] | false };
    additionalItems?: Added & { [Key in keyof Items]?: never };
    order?: Extract<keyof Items | keyof NoInfer<Added>, string>[];
  };
};

export const course_Props_Schema = identity.extend({
  ...addUnifiedLocale(locale('props')),
  content: z.array(z.union([module_Props_Schema, chapter_Props_Schema, lesson_Props_Schema, episode_Props_Schema])),
});
export type Course_Props = z.infer<typeof course_Props_Schema>;
