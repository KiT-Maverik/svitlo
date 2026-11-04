import type { Locale_Languages } from '../locale.types';
import type { NonEmptyArray } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { ContentBlock } from '../blocks';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Content<Mode extends 'data' | 'response', SupportedLanguages extends Locale_Languages> = {
  question: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  hint?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  explanation?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
};

type Question_SelectMultipleAnswers_Definition = Question_Definition_Meta<'selectMultipleAnswers'>;
type Question_SelectMultipleAnswers_Data<SupportedLanguages extends Locale_Languages> = Question_Data_Meta<'selectMultipleAnswers'> & Content<'data', SupportedLanguages> & { answers: { correct: Readonly<Record<string, ContentBlock<'data', SupportedLanguages>>>; incorrect: Readonly<Record<string, ContentBlock<'data', SupportedLanguages>>>; distractors: Readonly<Record<string, ContentBlock<'data', SupportedLanguages>>> } };
type Question_SelectMultipleAnswers_Response<SupportedLanguages extends Locale_Languages> = Question_Response_Meta<'selectMultipleAnswers'> & Content<'response', SupportedLanguages> & { answers: { correct: Readonly<Record<string, ContentBlock<'response', SupportedLanguages>>>; incorrect: Readonly<Record<string, ContentBlock<'response', SupportedLanguages>>>; distractors: Readonly<Record<string, ContentBlock<'response', SupportedLanguages>>> } };

export type Question_SelectMultipleAnswers<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  definition: Question_SelectMultipleAnswers_Definition;
  data: Question_SelectMultipleAnswers_Data<SupportedLanguages>;
  response: Question_SelectMultipleAnswers_Response<SupportedLanguages>;
}[ConfigType];
