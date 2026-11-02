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

type Question_OrderSequence_Definition = Question_Definition_Meta<'orderSequence'>;
type Question_OrderSequence_Data = Question_Data_Meta<'orderSequence'> & Content<'data'> & { sequence: NonEmptyArray<ContentBlock<'data'>> };
type Question_OrderSequence_Response = Question_Response_Meta<'orderSequence'> & Content<'response'> & { sequence: NonEmptyArray<ContentBlock<'response'>> };

export type Question_OrderSequence<ConfigType extends ContentEntity_ConfigType> = {
  definition: Question_OrderSequence_Definition;
  data: Question_OrderSequence_Data;
  response: Question_OrderSequence_Response;
}[ConfigType];
