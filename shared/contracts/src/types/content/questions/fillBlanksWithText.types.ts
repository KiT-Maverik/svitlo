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

type Question_FillBlanksWithText_Definition = Question_Definition_Meta<'fillBlanksWithText'>;
type Question_FillBlanksWithText_Data = Question_Data_Meta<'fillBlanksWithText'> & Content<'data'> & { slots: readonly { selector: string; correctAnswers: readonly Locale_Config[] }[]; placeholder: Locale_Config };
type Question_FillBlanksWithText_Response = Question_Response_Meta<'fillBlanksWithText'> & Content<'response'> & { slots: readonly { selector: string; correctAnswers: readonly string[] }[]; placeholder: string };

export type Question_FillBlanksWithText<ConfigType extends ContentEntity_ConfigType> = {
  definition: Question_FillBlanksWithText_Definition;
  data: Question_FillBlanksWithText_Data;
  response: Question_FillBlanksWithText_Response;
}[ConfigType];
