import { z } from 'zod';

import { identityBase_Schema } from '../../../_shared__configurators/common.schemas';
import type {
  ContentBlock_Text_Configurator,
  ContentBlock_Text_Overrides,
  ContentBlock_Text_Props,
} from '../../defineText';
import { text_Props_Schema } from '../../defineText/defineText.schemas';
import type { ContentBlock_CheckpointAnswer_Configurator } from '../defineCheckpointAnswer';
import {
  checkpointAnswer_Child_Props_Schema,
  type Checkpoint_Allowed_Configurator,
  type Checkpoint_Allowed_Props,
  type CheckpointAnswer_Overrides,
} from '../defineCheckpointAnswer/defineCheckpointAnswer.schemas';

const checkpointItemBase = identityBase_Schema.extend({
  type: z.literal('checkpointItem'),
  check: z.literal(true).optional(),
});
export const checkpointItem_Config_Schema = checkpointItemBase.extend({
  question: z.custom<ContentBlock_Text_Configurator>(value => value !== undefined && value !== null),
  answer: z.custom<ContentBlock_CheckpointAnswer_Configurator>(value => value !== undefined && value !== null),
});
export type ContentBlock_CheckpointItem_Config = z.infer<typeof checkpointItem_Config_Schema>;

export const checkpointItem_Props_Schema = checkpointItemBase.extend({
  question: text_Props_Schema,
  answer: z.array(checkpointAnswer_Child_Props_Schema).min(1),
});
export type ContentBlock_CheckpointItem_Props = Omit<z.infer<typeof checkpointItem_Props_Schema>, 'answer'> & {
  question: ContentBlock_Text_Props;
  answer: Checkpoint_Allowed_Props[];
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
