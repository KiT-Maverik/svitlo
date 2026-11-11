import { z } from 'zod';

import { languageCode_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema, addUnifiedLocale } from '../../_shared__configurators';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import type { Configurator_Mode } from '../../configurator.schemas';
import type { Lesson_Configurator, Lesson_Props } from '../../lessons/defineLesson';
import type { Chapter_Configurator, Chapter_Props } from '../defineChapter';
import type { Module_Configurator, Module_Props } from '../defineModule';

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

export type Course_Child = Module_Configurator | Chapter_Configurator | Lesson_Configurator;
export type Course_Child_Props = Module_Props | Chapter_Props | Lesson_Props;

/** Children are configurators, not recursively parsed Zod data. false is reserved for overrides. */
export type Course_Content = { items: Record<string, Course_Child | false>; order: string[] };

export const course_Config_Schema = identity.extend(addUnifiedLocale(locale('config')));
export type Course_Config = z.infer<typeof course_Config_Schema> & { content: Course_Content };

export const course_Props_Schema = identity.extend(addUnifiedLocale(locale('props')));
export type Course_Props = z.infer<typeof course_Props_Schema> & {
  content: { items: Record<string, Course_Child_Props>; order: string[] };
};
