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

type Question_FillBlanksWithBlocks_Definition = Question_Definition_Meta<'fillBlanksWithBlocks'>;
type Question_FillBlanksWithBlocks_Data = Question_Data_Meta<'fillBlanksWithBlocks'> & Content<'data'> & { slots: readonly { selector: string; correctAnswer: ContentBlock<'data'> }[]; distractors: readonly ContentBlock<'data'>[]; placeholder: Locale_Config };
type Question_FillBlanksWithBlocks_Response = Question_Response_Meta<'fillBlanksWithBlocks'> & Content<'response'> & { slots: readonly { selector: string; correctAnswer: ContentBlock<'response'> }[]; distractors: readonly ContentBlock<'response'>[]; placeholder: string };

export type Question_FillBlanksWithBlocks<ConfigType extends ContentEntity_ConfigType> = {
  definition: Question_FillBlanksWithBlocks_Definition;
  data: Question_FillBlanksWithBlocks_Data;
  response: Question_FillBlanksWithBlocks_Response;
}[ConfigType];
