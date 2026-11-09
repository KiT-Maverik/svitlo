import { z } from 'zod';

import { languageCode_Schema } from '#schemas';
import { createContentBlockMetaSchema } from '../contentBlock.schemas';

const sceneValue_Schema: z.ZodType<string | { [key: string]: unknown }> = z.lazy(() =>
  z.union([z.string(), z.record(z.string(), sceneValue_Schema)]),
);

const sceneLocalizationSwitch = {
  config: z.partialRecord(languageCode_Schema, sceneValue_Schema),
  props: sceneValue_Schema,
} as const;

function createSceneSchema<Mode extends keyof typeof sceneLocalizationSwitch>(mode: Mode) {
  return z.object({
    ...createContentBlockMetaSchema('scene').shape,
    locales: sceneLocalizationSwitch[mode],
  });
}

export const scene_Config_Schema = createSceneSchema('config');
export type ContentBlock_Scene_Config = z.infer<typeof scene_Config_Schema>;

export const scene_Props_Schema = createSceneSchema('props');
export type ContentBlock_Scene_Props = z.infer<typeof scene_Props_Schema>;
