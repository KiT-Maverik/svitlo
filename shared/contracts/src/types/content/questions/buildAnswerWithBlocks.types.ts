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

type Question_BuildAnswerWithBlocks_Definition = Question_Definition_Meta<'buildAnswerWithBlocks'>;
type Question_BuildAnswerWithBlocks_Data<SupportedLanguages extends LanguageCode> = Question_Data_Meta<'buildAnswerWithBlocks'> & Content<'data', SupportedLanguages> & { correctSequence: NonEmptyArray<ContentBlock<'data', SupportedLanguages>>; distractors: readonly ContentBlock<'data', SupportedLanguages>[]; placeholder: New_Locale_Options<SupportedLanguages> };
type Question_BuildAnswerWithBlocks_Response = Question_Response_Meta<'buildAnswerWithBlocks'> & Content<'response', LanguageCode> & { correctSequence: NonEmptyArray<ContentBlock<'response'>>; distractors: readonly ContentBlock<'response'>[]; placeholder: string };

export type Question_BuildAnswerWithBlocks<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: Question_BuildAnswerWithBlocks_Definition;
  data: Question_BuildAnswerWithBlocks_Data<SupportedLanguages>;
  response: Question_BuildAnswerWithBlocks_Response;
}[ConfigType];
