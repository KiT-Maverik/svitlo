import type { LanguageCode } from '../../languages';
import type { NonEmptyArray } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { ContentBlock } from '../blocks';
import type { New_Locale_Options } from '../locale.types';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Content<Mode extends 'data' | 'response', SupportedLanguages extends LanguageCode> = {
  question: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  hint?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  explanation?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
};

type Question_AnswerWithNumber_Definition = Question_Definition_Meta<'answerWithNumber'>;
type Question_AnswerWithNumber_Data<SupportedLanguages extends LanguageCode> = Question_Data_Meta<'answerWithNumber'> & Content<'data', SupportedLanguages> & { correctAnswers: readonly number[]; placeholder: New_Locale_Options<SupportedLanguages> };
type Question_AnswerWithNumber_Response = Question_Response_Meta<'answerWithNumber'> & Content<'response', LanguageCode> & { correctAnswers: readonly number[]; placeholder: string };

export type Question_AnswerWithNumber<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: Question_AnswerWithNumber_Definition;
  data: Question_AnswerWithNumber_Data<SupportedLanguages>;
  response: Question_AnswerWithNumber_Response;
}[ConfigType];
