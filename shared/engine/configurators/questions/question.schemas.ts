import { z } from 'zod';
import { disability_Schema } from '#schemas';
import { identityBase_Schema, paramsBase_Schema } from '../_shared__configurators';
import { assessmentMethodSlug_Schema } from './assessmentMethod.schemas';
import type { Question_Type } from './question.constants';

/** Common Question metadata. Each Question owns its content and lifecycle. */
export const createQuestionBaseSchema = <const Type extends Question_Type>(type: Type) =>
  identityBase_Schema.extend({
    type: z.literal(type),
    params: paramsBase_Schema.shape.params.extend({
      assessmentMethod: assessmentMethodSlug_Schema,
      restrictions: z.array(disability_Schema),
    }),
  });

/** Child definitions are typed, not recursively parsed by the parent. */
export type QuestionContent<Block> = {
  question: readonly [Block, ...Block[]];
  hint?: readonly [Block, ...Block[]];
  explanation?: readonly [Block, ...Block[]];
};
