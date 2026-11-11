import { z } from 'zod';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import { createQuestionBaseSchema, type QuestionContent } from '../question.schemas';

const questionBase = createQuestionBaseSchema('selectOneAnswer');

/** The schema validates Question metadata; child blocks own their validation. */
export const selectOneAnswer_Config_Schema = questionBase.extend(addUnifiedLocale({}));
export type Question_SelectOneAnswer_Config = z.infer<typeof selectOneAnswer_Config_Schema> & {
  content: QuestionContent<ContentBlock_Configurator> & {
  answers: { correct: Record<string, ContentBlock_Configurator>; incorrect: Record<string, ContentBlock_Configurator>; distractors: Record<string, ContentBlock_Configurator> };
};
};

export const selectOneAnswer_Props_Schema = questionBase.extend(addUnifiedLocale({}));
export type Question_SelectOneAnswer_Props = z.infer<typeof selectOneAnswer_Props_Schema> & {
  content: QuestionContent<ContentBlock_Props> & {
  answers: { correct: Record<string, ContentBlock_Props>; incorrect: Record<string, ContentBlock_Props>; distractors: Record<string, ContentBlock_Props> };
};
};
