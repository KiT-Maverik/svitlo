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

type Question_BuildAnswerWithBlocks_Definition = Question_Definition_Meta<'buildAnswerWithBlocks'>;
type Question_BuildAnswerWithBlocks_Data<SupportedLanguages extends Locale_Languages> =
  Question_Data_Meta<'buildAnswerWithBlocks'> &
    Content<'data', SupportedLanguages> & {
      correctSequence: NonEmptyArray<ContentBlock<'data', SupportedLanguages>>;
      distractors: readonly ContentBlock<'data', SupportedLanguages>[];
      placeholder: Locale_Options<SupportedLanguages>;
    };
type Question_BuildAnswerWithBlocks_Response<SupportedLanguages extends Locale_Languages> =
  Question_Response_Meta<'buildAnswerWithBlocks'> &
    Content<'response', SupportedLanguages> & {
      correctSequence: NonEmptyArray<ContentBlock<'response', SupportedLanguages>>;
      distractors: readonly ContentBlock<'response', SupportedLanguages>[];
      placeholder: string;
    };

export type Question_BuildAnswerWithBlocks<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = {
  definition: Question_BuildAnswerWithBlocks_Definition;
  data: Question_BuildAnswerWithBlocks_Data<SupportedLanguages>;
  response: Question_BuildAnswerWithBlocks_Response<SupportedLanguages>;
}[ConfigType];
