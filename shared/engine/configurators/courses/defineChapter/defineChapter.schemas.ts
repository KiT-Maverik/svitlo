import { z } from 'zod';

import { lessonConfigurator_Schema } from '../../lessons/defineLesson/defineLesson.schemas';
import { episodeConfigurator_Schema } from '../defineEpisode/defineEpisode.schemas';
import {
  createHierarchyChildSchema,
  createHierarchyIdentitySchema,
  createHierarchyPropsSchema,
  hierarchyResolvedChild_Schema,
} from '../_shared__courses/courseHierarchy.schemas';

export const chapter_Config_Schema = z.strictObject({
  ...createHierarchyIdentitySchema('chapter'),
  content: z.array(z.union([lessonConfigurator_Schema, episodeConfigurator_Schema])),
});
export type Chapter_Config = z.infer<typeof chapter_Config_Schema>;

export const chapter_Props_Schema = z.strictObject({
  ...createHierarchyPropsSchema('chapter'),
  content: z.array(hierarchyResolvedChild_Schema),
});
export type Chapter_Props = z.infer<typeof chapter_Props_Schema>;

export const chapterConfigurator_Schema = createHierarchyChildSchema<{
  readonly config: { readonly base: { readonly type: 'chapter'; readonly id: string }; readonly locales: () => object };
}>('chapter');
