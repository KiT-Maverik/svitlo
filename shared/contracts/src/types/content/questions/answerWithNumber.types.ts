import type { NonEmptyArray } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { ContentBlock } from '../blocks';
import type { Locale_Languages, Locale_Options } from '../locale.types';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Content<Mode extends 'data' | 'response', SupportedLanguages extends Locale_Languages> = {
  question: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  hint?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  explanation?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
};

type Question_AnswerWithNumber_Definition = Question_Definition_Meta<'answerWithNumber'>;
type Question_AnswerWithNumber_Data<SupportedLanguages extends Locale_Languages> =
  Question_Data_Meta<'answerWithNumber'> &
    Content<'data', SupportedLanguages> & {
      correctAnswers: readonly number[];
      placeholder: Locale_Options<SupportedLanguages>;
    };
type Question_AnswerWithNumber_Response<SupportedLanguages extends Locale_Languages> =
  Question_Response_Meta<'answerWithNumber'> &
    Content<'response', SupportedLanguages> & { correctAnswers: readonly number[]; placeholder: string };

export type Question_AnswerWithNumber<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = {
  definition: Question_AnswerWithNumber_Definition;
  data: Question_AnswerWithNumber_Data<SupportedLanguages>;
  response: Question_AnswerWithNumber_Response<SupportedLanguages>;
}[ConfigType];
