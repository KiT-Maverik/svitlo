import { z } from 'zod';
import type { Configurator_Mode } from '../../configurator.schemas';
import { addUnifiedLocale } from '../../_shared__configurators';
import type { ContentBlock_Configurator, ContentBlock_Props } from '../../contentBlocks';
import { createQuestionBaseSchema, type QuestionContent } from '../question.schemas';

const questionBase = createQuestionBaseSchema('matchBlocks');

/** The schema validates Question metadata; child blocks own their validation. */
export const matchBlocks_Config_Schema = questionBase.extend(addUnifiedLocale({}));
export type Question_MatchBlocks_Config = z.infer<typeof matchBlocks_Config_Schema> & {
  content: QuestionContent<ContentBlock_Configurator> & {
  pairs: Record<string, { left: ContentBlock_Configurator; right: ContentBlock_Configurator }>;
};
};

export const matchBlocks_Props_Schema = questionBase.extend(addUnifiedLocale({}));
export type Question_MatchBlocks_Props = z.infer<typeof matchBlocks_Props_Schema> & {
  content: QuestionContent<ContentBlock_Props> & {
  pairs: Record<string, { left: ContentBlock_Props; right: ContentBlock_Props }>;
};
};
