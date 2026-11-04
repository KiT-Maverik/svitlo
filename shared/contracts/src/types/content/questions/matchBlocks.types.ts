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

type Question_MatchBlocks_Definition = Question_Definition_Meta<'matchBlocks'>;
type Question_MatchBlocks_Data<SupportedLanguages extends Locale_Languages> = Question_Data_Meta<'matchBlocks'> & Content<'data', SupportedLanguages> & { pairs: Readonly<Record<string, { left: ContentBlock<'data', SupportedLanguages>; right: ContentBlock<'data', SupportedLanguages> }>> };
type Question_MatchBlocks_Response<SupportedLanguages extends Locale_Languages> = Question_Response_Meta<'matchBlocks'> & Content<'response', SupportedLanguages> & { pairs: Readonly<Record<string, { left: ContentBlock<'response', SupportedLanguages>; right: ContentBlock<'response', SupportedLanguages> }>> };

export type Question_MatchBlocks<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  definition: Question_MatchBlocks_Definition;
  data: Question_MatchBlocks_Data<SupportedLanguages>;
  response: Question_MatchBlocks_Response<SupportedLanguages>;
}[ConfigType];
