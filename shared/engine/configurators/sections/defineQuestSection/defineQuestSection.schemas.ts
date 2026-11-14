import { z } from 'zod';
import type { DeepPartial } from '#types';
import { deepStrict_Schema, camelCase_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../../_shared__configurators/common.schemas';
import { addUnifiedLocale } from '../../_shared__configurators/addUnifiedLocale/addUnifiedLocale.utils';
import { localizationSwitch } from '../../contentBlocks/contentBlock.schemas';
import { stage_Props_Schema } from '../defineStage/defineStage.schemas';
import { task_Props_Schema } from '../defineTask/defineTask.schemas';
import type { Stage_Configurator } from '../defineStage';
import type { Task_Configurator } from '../defineTask';
const kind = <const Type extends string>(type: Type) => identityBase_Schema.extend({ type: z.literal(type) });
const section = kind('quest').extend({
  params: paramsBase_Schema.shape.params.extend({ skippable: z.boolean().optional() }),
});
export const questSection_Config_Schema = section.extend({
  ...addUnifiedLocale({ title: localizationSwitch.config, navigationLabel: localizationSwitch.config }),
  stages: z.record(camelCase_Schema, z.custom<Stage_Configurator>()),
  tasks: z.record(camelCase_Schema, z.custom<Task_Configurator>()),
}).strict();
export const questSection_Props_Schema = section.extend({
  ...addUnifiedLocale({ title: localizationSwitch.props, navigationLabel: localizationSwitch.props }),
  stages: z.record(camelCase_Schema, stage_Props_Schema),
  tasks: z.record(camelCase_Schema, task_Props_Schema),
}).strict();
export type QuestSection_Config = z.infer<typeof questSection_Config_Schema>;
export type QuestSection_Props = z.infer<typeof questSection_Props_Schema>;
export const questSection_Override_Metadata_Schema = z.deepPartial(
  deepStrict_Schema(z.object({
    params: questSection_Config_Schema.shape.params,
    locale: questSection_Config_Schema.shape.locale,
  })),
);
export type QuestSection_Metadata_Overrides = DeepPartial<Pick<QuestSection_Config, 'params' | 'locale'>>;
