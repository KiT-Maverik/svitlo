import { z } from 'zod';
import { identityBase_Schema } from '../../../_shared__configurators/common.schemas';
import { scene_Props_Schema } from '../../../contentBlocks/defineScene/defineScene.schemas';
import type { ContentBlock_Scene_Configurator } from '../../../contentBlocks/defineScene';

const kind = identityBase_Schema.extend({ type: z.literal('questTask') });
export const task_Config_Schema = kind.extend({
  scene: z.custom<ContentBlock_Scene_Configurator>(),
}).strict();
export const task_Props_Schema = kind.extend({
  scene: scene_Props_Schema,
}).strict();
export type Task_Config = z.infer<typeof task_Config_Schema>;
export type Task_Props = z.infer<typeof task_Props_Schema>;

