import type { Locale_Languages } from '../locale.types';
import type { NonEmptyArray } from '../../misc.types';
import type { ContentBlock } from '../blocks';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Question_SelectOneAnswer_Answers<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  correct: Readonly<Record<string, ContentBlock<ConfigType, SupportedLanguages>>>;
  incorrect: Readonly<Record<string, ContentBlock<ConfigType, SupportedLanguages>>>;
  distractors: Readonly<Record<string, ContentBlock<ConfigType, SupportedLanguages>>>;
};

type Question_SelectOneAnswer_Definition = Question_Definition_Meta<'selectOneAnswer'>;

type Question_SelectOneAnswer_Data<SupportedLanguages extends Locale_Languages> = Question_Data_Meta<'selectOneAnswer'> & {
  question: NonEmptyArray<ContentBlock<'data', SupportedLanguages>>;
  explanation?: NonEmptyArray<ContentBlock<'data', SupportedLanguages>>;
  hint?: NonEmptyArray<ContentBlock<'data', SupportedLanguages>>;
  answers: Question_SelectOneAnswer_Answers<'data', SupportedLanguages>;
};

type Question_SelectOneAnswer_Response<SupportedLanguages extends Locale_Languages> = Question_Response_Meta<'selectOneAnswer'> & {
  question: NonEmptyArray<ContentBlock<'response', SupportedLanguages>>;
  explanation?: NonEmptyArray<ContentBlock<'response', SupportedLanguages>>;
  hint?: NonEmptyArray<ContentBlock<'response', SupportedLanguages>>;
  answers: Question_SelectOneAnswer_Answers<'response', SupportedLanguages>;
};

export type Question_SelectOneAnswer<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  definition: Question_SelectOneAnswer_Definition;
  data: Question_SelectOneAnswer_Data<SupportedLanguages>;
  response: Question_SelectOneAnswer_Response<SupportedLanguages>;
}[ConfigType];
