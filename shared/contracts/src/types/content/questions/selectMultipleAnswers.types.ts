import type { LanguageCode } from '../../languages';
import type { NonEmptyArray } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { ContentBlock } from '../blocks';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Content<Mode extends 'data' | 'response', SupportedLanguages extends LanguageCode> = {
  question: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  hint?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  explanation?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
};

type Question_SelectMultipleAnswers_Definition = Question_Definition_Meta<'selectMultipleAnswers'>;
type Question_SelectMultipleAnswers_Data<SupportedLanguages extends LanguageCode> = Question_Data_Meta<'selectMultipleAnswers'> & Content<'data', SupportedLanguages> & { answers: { correct: Readonly<Record<string, ContentBlock<'data', SupportedLanguages>>>; incorrect: Readonly<Record<string, ContentBlock<'data', SupportedLanguages>>>; distractors: Readonly<Record<string, ContentBlock<'data', SupportedLanguages>>> } };
type Question_SelectMultipleAnswers_Response = Question_Response_Meta<'selectMultipleAnswers'> & Content<'response', LanguageCode> & { answers: { correct: Readonly<Record<string, ContentBlock<'response', LanguageCode>>>; incorrect: Readonly<Record<string, ContentBlock<'response', LanguageCode>>>; distractors: Readonly<Record<string, ContentBlock<'response', LanguageCode>>> } };

export type Question_SelectMultipleAnswers<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode> = {
  definition: Question_SelectMultipleAnswers_Definition;
  data: Question_SelectMultipleAnswers_Data<SupportedLanguages>;
  response: Question_SelectMultipleAnswers_Response;
}[ConfigType];
