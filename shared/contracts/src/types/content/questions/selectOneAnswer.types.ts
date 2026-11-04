import type { LanguageCode } from '../../languages';
import type { NonEmptyArray } from '../../misc.types';
import type { ContentBlock } from '../blocks';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Question_SelectOneAnswer_Answers<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode> = {
  correct: Readonly<Record<string, ContentBlock<ConfigType, SupportedLanguages>>>;
  incorrect: Readonly<Record<string, ContentBlock<ConfigType, SupportedLanguages>>>;
  distractors: Readonly<Record<string, ContentBlock<ConfigType, SupportedLanguages>>>;
};

type Question_SelectOneAnswer_Definition = Question_Definition_Meta<'selectOneAnswer'>;

type Question_SelectOneAnswer_Data<SupportedLanguages extends LanguageCode> = Question_Data_Meta<'selectOneAnswer'> & {
  question: NonEmptyArray<ContentBlock<'data', SupportedLanguages>>;
  explanation?: NonEmptyArray<ContentBlock<'data', SupportedLanguages>>;
  hint?: NonEmptyArray<ContentBlock<'data', SupportedLanguages>>;
  answers: Question_SelectOneAnswer_Answers<'data', SupportedLanguages>;
};

type Question_SelectOneAnswer_Response = Question_Response_Meta<'selectOneAnswer'> & {
  question: NonEmptyArray<ContentBlock<'response'>>;
  explanation?: NonEmptyArray<ContentBlock<'response'>>;
  hint?: NonEmptyArray<ContentBlock<'response'>>;
  answers: Question_SelectOneAnswer_Answers<'response', LanguageCode>;
};

export type Question_SelectOneAnswer<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: Question_SelectOneAnswer_Definition;
  data: Question_SelectOneAnswer_Data<SupportedLanguages>;
  response: Question_SelectOneAnswer_Response;
}[ConfigType];
