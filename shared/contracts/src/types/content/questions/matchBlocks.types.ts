import type { NonEmptyArray } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { ContentBlock } from '../blocks';
import type { Locale_Config } from '../locale.types';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Content<Mode extends 'data' | 'response'> = {
  question: NonEmptyArray<ContentBlock<Mode>>;
  hint?: NonEmptyArray<ContentBlock<Mode>>;
  explanation?: NonEmptyArray<ContentBlock<Mode>>;
};

type Question_MatchBlocks_Definition = Question_Definition_Meta<'matchBlocks'>;
type Question_MatchBlocks_Data = Question_Data_Meta<'matchBlocks'> & Content<'data'> & { pairs: Readonly<Record<string, { left: ContentBlock<'data'>; right: ContentBlock<'data'> }>> };
type Question_MatchBlocks_Response = Question_Response_Meta<'matchBlocks'> & Content<'response'> & { pairs: Readonly<Record<string, { left: ContentBlock<'response'>; right: ContentBlock<'response'> }>> };

export type Question_MatchBlocks<ConfigType extends ContentEntity_ConfigType> = {
  definition: Question_MatchBlocks_Definition;
  data: Question_MatchBlocks_Data;
  response: Question_MatchBlocks_Response;
}[ConfigType];
