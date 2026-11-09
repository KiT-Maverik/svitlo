import { z } from 'zod';

import { languageCode_Schema } from '#schemas';

import { lessonConfigurator_Schema } from '../../lessons/defineLesson/defineLesson.schemas';
import {
  createHierarchyChildSchema,
  createHierarchyPropsSchema,
  hierarchyResolvedChild_Schema,
  markdownConfigurator_Schema,
  textConfigurator_Schema,
} from '../_shared/courseHierarchy.schemas';
import { episodeConfigurator_Schema } from '../defineEpisode/defineEpisode.schemas';
import { chapterConfigurator_Schema } from '../defineChapter/defineChapter.schemas';
import { moduleConfigurator_Schema } from '../defineModule/defineModule.schemas';

export const course_Config_Schema = z.strictObject({
  type: z.literal('course'),
  id: z.uuid(),
  title: textConfigurator_Schema,
  description: markdownConfigurator_Schema,
  scenarioMode: z.enum(['none', 'story']).optional(),
  prerequisites: z
    .strictObject({
      skills: z.array(z.uuid()).optional(),
      skillGroups: z.array(z.uuid()).optional(),
      skillDomains: z.array(z.uuid()).optional(),
      courses: z.array(z.uuid()).optional(),
      text: markdownConfigurator_Schema.optional(),
    })
    .optional(),
  parameters: z.strictObject({
    languages: z
      .array(languageCode_Schema)
      .nonempty()
      .refine(values => new Set(values).size === values.length, 'Course languages must be unique'),
  }),
  content: z.array(
    z.union([
      moduleConfigurator_Schema,
      chapterConfigurator_Schema,
      episodeConfigurator_Schema,
      lessonConfigurator_Schema,
    ]),
  ),
});
export type Course_Config = z.infer<typeof course_Config_Schema>;

export const course_Props_Schema = z.strictObject({
  ...createHierarchyPropsSchema('course'),
  description: z.object({ type: z.literal('markdown'), id: z.uuid() }).catchall(z.unknown()),
  scenarioMode: z.enum(['none', 'story']).optional(),
  prerequisites: z
    .strictObject({
      skills: z.array(z.uuid()).optional(),
      skillGroups: z.array(z.uuid()).optional(),
      skillDomains: z.array(z.uuid()).optional(),
      courses: z.array(z.uuid()).optional(),
      text: z
        .object({ type: z.literal('markdown'), id: z.uuid() })
        .catchall(z.unknown())
        .optional(),
    })
    .optional(),
  parameters: z.strictObject({
    languages: z.array(languageCode_Schema).nonempty(),
  }),
  content: z.array(hierarchyResolvedChild_Schema),
});
export type Course_Props = z.infer<typeof course_Props_Schema>;

export const courseConfigurator_Schema = createHierarchyChildSchema<{
  readonly config: { readonly base: { readonly type: 'course'; readonly id: string }; readonly locales: () => object };
}>('course');
