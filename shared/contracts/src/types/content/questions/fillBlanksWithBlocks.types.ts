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

type Question_FillBlanksWithBlocks_Definition = Question_Definition_Meta<'fillBlanksWithBlocks'>;
type Question_FillBlanksWithBlocks_Data<SupportedLanguages extends LanguageCode> = Question_Data_Meta<'fillBlanksWithBlocks'> & Content<'data', SupportedLanguages> & { slots: readonly { selector: string; correctAnswer: ContentBlock<'data', SupportedLanguages> }[]; distractors: readonly ContentBlock<'data', SupportedLanguages>[]; placeholder: Locale_Options<SupportedLanguages> };
type Question_FillBlanksWithBlocks_Response = Question_Response_Meta<'fillBlanksWithBlocks'> & Content<'response', LanguageCode> & { slots: readonly { selector: string; correctAnswer: ContentBlock<'response'> }[]; distractors: readonly ContentBlock<'response'>[]; placeholder: string };

export type Question_FillBlanksWithBlocks<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: Question_FillBlanksWithBlocks_Definition;
  data: Question_FillBlanksWithBlocks_Data<SupportedLanguages>;
  response: Question_FillBlanksWithBlocks_Response;
}[ConfigType];
