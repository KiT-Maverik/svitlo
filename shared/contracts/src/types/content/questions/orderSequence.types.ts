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

type Question_OrderSequence_Definition = Question_Definition_Meta<'orderSequence'>;
type Question_OrderSequence_Data<SupportedLanguages extends Locale_Languages> = Question_Data_Meta<'orderSequence'> &
  Content<'data', SupportedLanguages> & { sequence: NonEmptyArray<ContentBlock<'data', SupportedLanguages>> };
type Question_OrderSequence_Response<SupportedLanguages extends Locale_Languages> =
  Question_Response_Meta<'orderSequence'> &
    Content<'response', SupportedLanguages> & { sequence: NonEmptyArray<ContentBlock<'response', SupportedLanguages>> };

export type Question_OrderSequence<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = {
  definition: Question_OrderSequence_Definition;
  data: Question_OrderSequence_Data<SupportedLanguages>;
  response: Question_OrderSequence_Response<SupportedLanguages>;
}[ConfigType];
