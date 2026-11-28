import { z } from 'zod';

import { identityBase_Schema } from '../../../../_shared__configurators/common.schemas';
import type {
  ContentBlock_Text_Configurator,
  ContentBlock_Text_Data,
  ContentBlock_Text_Overrides,
} from '../../../primitive/defineText';
import { text_Data_Schema } from '../../../primitive/defineText/defineText.schemas';
import { hasConfiguratorBuildIdentity } from '../configuratorBoundary';
import type { ContentBlock_CheckpointAnswer_Configurator } from '../defineCheckpointAnswer';
import {
  checkpointAnswer_Data_Schema,
  type Checkpoint_Allowed_Configurator,
  type CheckpointAnswer_Overrides,
} from '../defineCheckpointAnswer/defineCheckpointAnswer.schemas';

const checkpointItemBase = identityBase_Schema.extend({
  type: z.literal('checkpointItem'),
  check: z.literal(true).optional(),
});
export const checkpointItem_Config_Schema = checkpointItemBase.extend({
  question: z.custom<ContentBlock_Text_Configurator>(value => hasConfiguratorBuildIdentity(value, 'text'), {
    message: 'CheckpointItem question must be a Text configurator',
  }),
  answer: z.custom<ContentBlock_CheckpointAnswer_Configurator>(
    value => hasConfiguratorBuildIdentity(value, 'checkpointAnswer'),
    { message: 'CheckpointItem answer must be a CheckpointAnswer configurator' },
  ),
});
export type ContentBlock_CheckpointItem_Config = z.infer<typeof checkpointItem_Config_Schema>;

export const checkpointItem_Data_Schema = checkpointItemBase
  .extend({
    question: text_Data_Schema,
    answer: checkpointAnswer_Data_Schema,
  })
  .superRefine((value, ctx) => {
    if (value.question.params.disabled === true) {
      ctx.addIssue({
        code: 'custom',
        path: ['question', 'params', 'disabled'],
        message: 'The mandatory Checkpoint question must remain enabled',
      });
    }
  });
export type ContentBlock_CheckpointItem_Data = Omit<z.infer<typeof checkpointItem_Data_Schema>, 'question'> & {
  question: ContentBlock_Text_Data;
};

export type CheckpointItem_Question_Overrides = Omit<ContentBlock_Text_Overrides, 'params'> & {
  params?: Omit<NonNullable<ContentBlock_Text_Overrides['params']>, 'disabled'> & { disabled?: never };
};
/** Extract the Answer's authored Primitive placements, not its lifecycle members. */
type AnswerChildren<Answer> = {
  [Key in keyof Answer as Answer[Key] extends Checkpoint_Allowed_Configurator ? Key : never]: Extract<
    Answer[Key],
    Checkpoint_Allowed_Configurator
  >;
};

export type CheckpointItem_Overrides<
  Answer extends ContentBlock_CheckpointAnswer_Configurator,
  Added extends Record<string, Checkpoint_Allowed_Configurator> = {},
> = {
  check?: true;
  question?: CheckpointItem_Question_Overrides;
  answer?: CheckpointAnswer_Overrides<AnswerChildren<Answer>, Added>;
};
