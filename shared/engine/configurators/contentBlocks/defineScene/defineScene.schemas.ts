import { z } from 'zod';

import { languageCode_Schema } from '#schemas';
import { createContentBlockMetaSchema } from '../contentBlock.schemas';

const sceneValue_Schema: z.ZodType<string | { [key: string]: unknown }> = z.lazy(() =>
  z.union([z.string(), z.record(z.string(), sceneValue_Schema)]),
);

function createSceneSchema<Mode extends 'config' | 'props'>(mode: Mode) {
  return z.object({
    ...createContentBlockMetaSchema('scene').shape,
    locales: mode === 'config'
      ? z.partialRecord(languageCode_Schema, sceneValue_Schema)
      : sceneValue_Schema,
  });
}

export const scene_Config_Schema = createSceneSchema('config');
export type ContentBlock_Scene_Config = z.infer<typeof scene_Config_Schema>;

export const scene_Props_Schema = createSceneSchema('props');
export type ContentBlock_Scene_Props = z.infer<typeof scene_Props_Schema>;
