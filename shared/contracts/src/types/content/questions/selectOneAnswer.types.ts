import type { NonEmptyArray } from '../../misc.types';
import type { ContentBlock } from '../blocks';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Question_SelectOneAnswer_Answers<ConfigType extends ContentEntity_ConfigType> = {
  correct: Readonly<Record<string, ContentBlock<ConfigType>>>;
  incorrect: Readonly<Record<string, ContentBlock<ConfigType>>>;
  distractors: Readonly<Record<string, ContentBlock<ConfigType>>>;
};

type Question_SelectOneAnswer_Definition = Question_Definition_Meta<'selectOneAnswer'>;

type Question_SelectOneAnswer_Data = Question_Data_Meta<'selectOneAnswer'> & {
  question: NonEmptyArray<ContentBlock<'data'>>;
  explanation?: NonEmptyArray<ContentBlock<'data'>>;
  hint?: NonEmptyArray<ContentBlock<'data'>>;
  answers: Question_SelectOneAnswer_Answers<'data'>;
};

type Question_SelectOneAnswer_Response = Question_Response_Meta<'selectOneAnswer'> & {
  question: NonEmptyArray<ContentBlock<'response'>>;
  explanation?: NonEmptyArray<ContentBlock<'response'>>;
  hint?: NonEmptyArray<ContentBlock<'response'>>;
  answers: Question_SelectOneAnswer_Answers<'response'>;
};

export type Question_SelectOneAnswer<ConfigType extends ContentEntity_ConfigType> = {
  definition: Question_SelectOneAnswer_Definition;
  data: Question_SelectOneAnswer_Data;
  response: Question_SelectOneAnswer_Response;
}[ConfigType];
