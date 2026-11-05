import type { Locale_Languages } from '../locale.types';
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

export type Question_Map<ConfigType extends ContentEntity_ConfigType, SupportedLanguages extends Locale_Languages> = {
  answerWithNumber: Question_AnswerWithNumber<ConfigType, SupportedLanguages>;
  answerWithText: Question_AnswerWithText<ConfigType, SupportedLanguages>;
  buildAnswerWithBlocks: Question_BuildAnswerWithBlocks<ConfigType, SupportedLanguages>;
  fillBlanksWithBlocks: Question_FillBlanksWithBlocks<ConfigType, SupportedLanguages>;
  fillBlanksWithText: Question_FillBlanksWithText<ConfigType, SupportedLanguages>;
  matchBlocks: Question_MatchBlocks<ConfigType, SupportedLanguages>;
  orderSequence: Question_OrderSequence<ConfigType, SupportedLanguages>;
  selectMultipleAnswers: Question_SelectMultipleAnswers<ConfigType, SupportedLanguages>;
  selectOneAnswer: Question_SelectOneAnswer<ConfigType, SupportedLanguages>;
};

export type Question<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = Question_Map<ConfigType, SupportedLanguages>[Question_Type];

export type Question_Catalog<
  ConfigType extends ContentEntity_ConfigType,
  SupportedLanguages extends Locale_Languages,
> = {
  [Type in Question_Type]?: Record<string, Question_Map<ConfigType, SupportedLanguages>[Type]>;
};

export type Question_Catalog_DataFor<
  Definition extends Question_Catalog<'definition', Locale_Languages>,
  SupportedLanguages extends Locale_Languages,
> = {
  [Type in keyof Definition]: Type extends Question_Type
    ? Record<keyof Definition[Type] & string, Question_Map<'data', SupportedLanguages>[Type]>
    : never;
};

export type Question_Catalog_ValidSlugs<
  Catalog extends Question_Catalog<'data', SupportedLanguages>,
  SupportedLanguages extends Locale_Languages,
> = {
  [Type in keyof Catalog]: Type extends Question_Type
    ? DefineValidKeysFromSlugs<
        keyof NonNullable<Catalog[Type]> & string,
        Question_Map<'data', SupportedLanguages>[Type]
      >
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
