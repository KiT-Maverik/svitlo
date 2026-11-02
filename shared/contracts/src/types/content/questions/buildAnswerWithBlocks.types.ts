import type { NonEmptyArray } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { ContentBlock } from '../blocks';
import type { Locale_Config } from '../locale.types';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Content<Mode extends 'data' | 'response'> = {
  question: NonEmptyArray<ContentBlock<Mode>>;
  hint?: NonEmptyArray<ContentBlock<Mode>>;
  explanation?: NonEmptyArray<ContentBlock<Mode>>;
};

type Question_BuildAnswerWithBlocks_Definition = Question_Definition_Meta<'buildAnswerWithBlocks'>;
type Question_BuildAnswerWithBlocks_Data = Question_Data_Meta<'buildAnswerWithBlocks'> & Content<'data'> & { correctSequence: NonEmptyArray<ContentBlock<'data'>>; distractors: readonly ContentBlock<'data'>[]; placeholder: Locale_Config };
type Question_BuildAnswerWithBlocks_Response = Question_Response_Meta<'buildAnswerWithBlocks'> & Content<'response'> & { correctSequence: NonEmptyArray<ContentBlock<'response'>>; distractors: readonly ContentBlock<'response'>[]; placeholder: string };

export type Question_BuildAnswerWithBlocks<ConfigType extends ContentEntity_ConfigType> = {
  definition: Question_BuildAnswerWithBlocks_Definition;
  data: Question_BuildAnswerWithBlocks_Data;
  response: Question_BuildAnswerWithBlocks_Response;
}[ConfigType];
