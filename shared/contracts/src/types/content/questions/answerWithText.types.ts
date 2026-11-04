import type { LanguageCode } from '../../languages';
import type { NonEmptyArray } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { ContentBlock } from '../blocks';
import type { Locale_Options } from '../locale.types';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Content<Mode extends 'data' | 'response', SupportedLanguages extends LanguageCode> = {
  question: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  hint?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  explanation?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
};

type Question_AnswerWithText_Definition = Question_Definition_Meta<'answerWithText'>;
type Question_AnswerWithText_Data<SupportedLanguages extends LanguageCode> = Question_Data_Meta<'answerWithText'> & Content<'data', SupportedLanguages> & { correctAnswers: readonly Locale_Options<SupportedLanguages>[]; placeholder: Locale_Options<SupportedLanguages> };
type Question_AnswerWithText_Response = Question_Response_Meta<'answerWithText'> & Content<'response', LanguageCode> & { correctAnswers: readonly string[]; placeholder: string };

export type Question_AnswerWithText<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode> = {
  definition: Question_AnswerWithText_Definition;
  data: Question_AnswerWithText_Data<SupportedLanguages>;
  response: Question_AnswerWithText_Response;
}[ConfigType];
