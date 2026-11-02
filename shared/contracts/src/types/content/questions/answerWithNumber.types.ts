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

type Question_AnswerWithNumber_Definition = Question_Definition_Meta<'answerWithNumber'>;
type Question_AnswerWithNumber_Data = Question_Data_Meta<'answerWithNumber'> & Content<'data'> & { correctAnswers: readonly number[]; placeholder: Locale_Config };
type Question_AnswerWithNumber_Response = Question_Response_Meta<'answerWithNumber'> & Content<'response'> & { correctAnswers: readonly number[]; placeholder: string };

export type Question_AnswerWithNumber<ConfigType extends ContentEntity_ConfigType> = {
  definition: Question_AnswerWithNumber_Definition;
  data: Question_AnswerWithNumber_Data;
  response: Question_AnswerWithNumber_Response;
}[ConfigType];
