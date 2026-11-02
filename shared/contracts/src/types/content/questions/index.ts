import type { ContentEntity_ConfigType } from '../entity.types';
import type { DefineValidKeysFromSlugs } from '../../misc.types';
import type { Question_AnswerWithNumber } from './answerWithNumber.types';
import type { Question_AnswerWithText } from './answerWithText.types';
import type { Question_BuildAnswerWithBlocks } from './buildAnswerWithBlocks.types';
import type { Question_Type } from './common.types';
import type { Question_FillBlanksWithBlocks } from './fillBlanksWithBlocks.types';
import type { Question_FillBlanksWithText } from './fillBlanksWithText.types';
import type { Question_MatchBlocks } from './matchBlocks.types';
import type { Question_OrderSequence } from './orderSequence.types';
import type { Question_SelectMultipleAnswers } from './selectMultipleAnswers.types';
import type { Question_SelectOneAnswer } from './selectOneAnswer.types';

export type Question_Map<ConfigType extends ContentEntity_ConfigType> = {
  answerWithNumber: Question_AnswerWithNumber<ConfigType>;
  answerWithText: Question_AnswerWithText<ConfigType>;
  buildAnswerWithBlocks: Question_BuildAnswerWithBlocks<ConfigType>;
  fillBlanksWithBlocks: Question_FillBlanksWithBlocks<ConfigType>;
  fillBlanksWithText: Question_FillBlanksWithText<ConfigType>;
  matchBlocks: Question_MatchBlocks<ConfigType>;
  orderSequence: Question_OrderSequence<ConfigType>;
  selectMultipleAnswers: Question_SelectMultipleAnswers<ConfigType>;
  selectOneAnswer: Question_SelectOneAnswer<ConfigType>;
};

export type Question<ConfigType extends ContentEntity_ConfigType> = Question_Map<ConfigType>[Question_Type];

export type Question_Catalog<ConfigType extends ContentEntity_ConfigType> = {
  [Type in Question_Type]?: Record<string, Question_Map<ConfigType>[Type]>;
};

export type Question_Catalog_DataFor<Definition extends Question_Catalog<'definition'>> = {
  [Type in keyof Definition]: Type extends Question_Type
    ? Record<keyof Definition[Type] & string, Question_Map<'data'>[Type]>
    : never;
};

export type Question_Catalog_ValidSlugs<Catalog extends Question_Catalog<'data'>> = {
  [Type in keyof Catalog]: Type extends Question_Type
    ? DefineValidKeysFromSlugs<keyof NonNullable<Catalog[Type]> & string, Question_Map<'data'>[Type]>
    : never;
};

export type {
  Question_AnswerWithNumber,
  Question_AnswerWithText,
  Question_BuildAnswerWithBlocks,
  Question_FillBlanksWithBlocks,
  Question_FillBlanksWithText,
  Question_MatchBlocks,
  Question_OrderSequence,
  Question_SelectMultipleAnswers,
  Question_SelectOneAnswer,
};
export type { Question_Type } from './common.types';
