import { z } from 'zod';

import { identityBase_Schema } from '../../../_shared__configurators/common.schemas';
import type { ContentBlock_Scene_Configurator } from '../../../contentBlocks/primitive/defineScene';
import { scene_Data_Schema } from '../../../contentBlocks/primitive/defineScene/defineScene.schemas';

const kind = identityBase_Schema.extend({ type: z.literal('questTask') });
export const task_Config_Schema = kind
  .extend({
    scene: z.custom<ContentBlock_Scene_Configurator>(),
  })
  .strict();
export const task_Data_Schema = kind
  .extend({
    scene: scene_Data_Schema,
  })
  .strict();
export type Task_Config = z.infer<typeof task_Config_Schema>;
export type Task_Data = z.infer<typeof task_Data_Schema>;
