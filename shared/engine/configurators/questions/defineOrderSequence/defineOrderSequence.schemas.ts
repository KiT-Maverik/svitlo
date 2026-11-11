import { z } from 'zod';
import { addUnifiedLocale } from '../../_shared__configurators';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import { createQuestionBaseSchema, type QuestionContent } from '../question.schemas';

const questionBase = createQuestionBaseSchema('orderSequence');

/** The schema validates Question metadata; child blocks own their validation. */
export const orderSequence_Config_Schema = questionBase.extend(addUnifiedLocale({}));
export type Question_OrderSequence_Config = z.infer<typeof orderSequence_Config_Schema> & {
  content: QuestionContent<ContentBlock_Configurator> & {
  sequence: [ContentBlock_Configurator, ...ContentBlock_Configurator[]];
};
};

export const orderSequence_Props_Schema = questionBase.extend(addUnifiedLocale({}));
export type Question_OrderSequence_Props = z.infer<typeof orderSequence_Props_Schema> & {
  content: QuestionContent<ContentBlock_Props> & {
  sequence: [ContentBlock_Props, ...ContentBlock_Props[]];
};
};
