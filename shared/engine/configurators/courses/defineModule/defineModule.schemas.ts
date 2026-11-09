import { z } from 'zod';

import { lessonConfigurator_Schema } from '../../lessons/defineLesson/defineLesson.schemas';
import { episodeConfigurator_Schema } from '../defineEpisode/defineEpisode.schemas';
import { chapterConfigurator_Schema } from '../defineChapter/defineChapter.schemas';
import {
  createHierarchyChildSchema,
  createHierarchyIdentitySchema,
  createHierarchyPropsSchema,
  hierarchyResolvedChild_Schema,
} from '../_shared/courseHierarchy.schemas';

export const module_Config_Schema = z.strictObject({
  ...createHierarchyIdentitySchema('module'),
  content: z.array(z.union([lessonConfigurator_Schema, episodeConfigurator_Schema, chapterConfigurator_Schema])),
});
export type Module_Config = z.infer<typeof module_Config_Schema>;

export const module_Props_Schema = z.strictObject({
  ...createHierarchyPropsSchema('module'),
  content: z.array(hierarchyResolvedChild_Schema),
});
export type Module_Props = z.infer<typeof module_Props_Schema>;

export const moduleConfigurator_Schema = createHierarchyChildSchema<{
  readonly config: { readonly base: { readonly type: 'module'; readonly id: string }; readonly locales: () => object };
}>('module');
