import type { LanguageCode } from '../../languages';
import type { NonEmptyArray } from '../../misc.types';
import type { ContentEntity_ConfigType } from '../entity.types';
import type { ContentBlock } from '../blocks';
import type { Question_Data_Meta, Question_Definition_Meta, Question_Response_Meta } from './common.types';

type Content<Mode extends 'data' | 'response', SupportedLanguages extends LanguageCode> = {
  question: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  hint?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
  explanation?: NonEmptyArray<ContentBlock<Mode, SupportedLanguages>>;
};

type Question_OrderSequence_Definition = Question_Definition_Meta<'orderSequence'>;
type Question_OrderSequence_Data<SupportedLanguages extends LanguageCode> = Question_Data_Meta<'orderSequence'> & Content<'data', SupportedLanguages> & { sequence: NonEmptyArray<ContentBlock<'data', SupportedLanguages>> };
type Question_OrderSequence_Response = Question_Response_Meta<'orderSequence'> & Content<'response', LanguageCode> & { sequence: NonEmptyArray<ContentBlock<'response'>> };

export type Question_OrderSequence<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends LanguageCode = LanguageCode> = {
  definition: Question_OrderSequence_Definition;
  data: Question_OrderSequence_Data<SupportedLanguages>;
  response: Question_OrderSequence_Response;
}[ConfigType];
