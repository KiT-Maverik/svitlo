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

type Question_AnswerWithText_Definition = Question_Definition_Meta<'answerWithText'>;
type Question_AnswerWithText_Data = Question_Data_Meta<'answerWithText'> & Content<'data'> & { correctAnswers: readonly Locale_Config[]; placeholder: Locale_Config };
type Question_AnswerWithText_Response = Question_Response_Meta<'answerWithText'> & Content<'response'> & { correctAnswers: readonly string[]; placeholder: string };

export type Question_AnswerWithText<ConfigType extends ContentEntity_ConfigType> = {
  definition: Question_AnswerWithText_Definition;
  data: Question_AnswerWithText_Data;
  response: Question_AnswerWithText_Response;
}[ConfigType];
