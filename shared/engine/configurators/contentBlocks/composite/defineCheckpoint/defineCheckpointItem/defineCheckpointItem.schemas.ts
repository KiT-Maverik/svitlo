import { z } from 'zod';

import { identityBase_Schema } from '../../../../_shared__configurators/common.schemas';
import type {
  ContentBlock_Text_Configurator,
  ContentBlock_Text_Data,
  ContentBlock_Text_Overrides,
} from '../../../primitive/defineText';
import { text_Data_Schema } from '../../../primitive/defineText/defineText.schemas';
import type { ContentBlock_CheckpointAnswer_Configurator } from '../defineCheckpointAnswer';
import {
  checkpointAnswer_Child_Data_Schema,
  type Checkpoint_Allowed_Configurator,
  type Checkpoint_Allowed_Data,
  type CheckpointAnswer_Overrides,
} from '../defineCheckpointAnswer/defineCheckpointAnswer.schemas';

const checkpointItemBase = identityBase_Schema.extend({
  type: z.literal('checkpointItem'),
  check: z.literal(true).optional(),
});
export const checkpointItem_Config_Schema = checkpointItemBase.extend({
  question: z.custom<ContentBlock_Text_Configurator>(
    value => value !== null && typeof value === 'object' && 'type' in value && value.type === 'text',
    { message: 'CheckpointItem question must be a Text configurator' },
  ),
  answer: z.custom<ContentBlock_CheckpointAnswer_Configurator>(
    value => value !== null && typeof value === 'object' && 'type' in value && value.type === 'checkpointAnswer',
    { message: 'CheckpointItem answer must be a CheckpointAnswer configurator' },
  ),
});
export type ContentBlock_CheckpointItem_Config = z.infer<typeof checkpointItem_Config_Schema>;

export const checkpointItem_Data_Schema = checkpointItemBase.extend({
  question: text_Data_Schema,
  answer: z.array(checkpointAnswer_Child_Data_Schema).min(1),
});
export type ContentBlock_CheckpointItem_Data = Omit<z.infer<typeof checkpointItem_Data_Schema>, 'answer'> & {
  question: ContentBlock_Text_Data;
  answer: Checkpoint_Allowed_Data[];
};

export type CheckpointItem_Question_Overrides = Omit<ContentBlock_Text_Overrides, 'params'> & {
  params?: Omit<NonNullable<ContentBlock_Text_Overrides['params']>, 'disabled'> & { disabled?: never };
};
export type CheckpointItem_Overrides<
  Answer extends ContentBlock_CheckpointAnswer_Configurator,
  Added extends Record<string, Checkpoint_Allowed_Configurator> = {},
> = {
  check?: true;
  question?: CheckpointItem_Question_Overrides;
  answer?: CheckpointAnswer_Overrides<Answer['content']['items'], Added>;
};
