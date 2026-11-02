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

type Question_SelectMultipleAnswers_Definition = Question_Definition_Meta<'selectMultipleAnswers'>;
type Question_SelectMultipleAnswers_Data = Question_Data_Meta<'selectMultipleAnswers'> & Content<'data'> & { answers: { correct: Readonly<Record<string, ContentBlock<'data'>>>; incorrect: Readonly<Record<string, ContentBlock<'data'>>>; distractors: Readonly<Record<string, ContentBlock<'data'>>> } };
type Question_SelectMultipleAnswers_Response = Question_Response_Meta<'selectMultipleAnswers'> & Content<'response'> & { answers: { correct: Readonly<Record<string, ContentBlock<'response'>>>; incorrect: Readonly<Record<string, ContentBlock<'response'>>>; distractors: Readonly<Record<string, ContentBlock<'response'>>> } };

export type Question_SelectMultipleAnswers<ConfigType extends ContentEntity_ConfigType> = {
  definition: Question_SelectMultipleAnswers_Definition;
  data: Question_SelectMultipleAnswers_Data;
  response: Question_SelectMultipleAnswers_Response;
}[ConfigType];
