import type { ConfiguratorChild } from '../../types/configuratorChild';
import type { Question_AnswerWithNumber_Configurator } from './defineAnswerWithNumber';
import type { Question_AnswerWithText_Configurator } from './defineAnswerWithText';
import type { Question_BuildAnswerWithBlocks_Configurator } from './defineBuildAnswerWithBlocks';
import type { Question_FillBlanksWithBlocks_Configurator } from './defineFillBlanksWithBlocks';
import type { Question_FillBlanksWithText_Configurator } from './defineFillBlanksWithText';
import type { Question_MatchBlocks_Configurator } from './defineMatchBlocks';
import type { Question_OrderSequence_Configurator } from './defineOrderSequence';
import type { Question_SelectMultipleAnswers_Configurator } from './defineSelectMultipleAnswers';
import type { Question_SelectOneAnswer_Configurator } from './defineSelectOneAnswer';

export type Question_Configurator = ConfiguratorChild<
  | Question_SelectOneAnswer_Configurator
  | Question_SelectMultipleAnswers_Configurator
  | Question_MatchBlocks_Configurator
  | Question_AnswerWithText_Configurator
  | Question_AnswerWithNumber_Configurator
  | Question_OrderSequence_Configurator
  | Question_BuildAnswerWithBlocks_Configurator
  | Question_FillBlanksWithBlocks_Configurator
  | Question_FillBlanksWithText_Configurator
>;

/** Resolved Question Props retain each question kind's discriminant and payload. */
export type Question_Data =
  | import('./defineSelectOneAnswer').Question_SelectOneAnswer_Data
  | import('./defineSelectMultipleAnswers').Question_SelectMultipleAnswers_Data
  | import('./defineMatchBlocks').Question_MatchBlocks_Data
  | import('./defineAnswerWithText').Question_AnswerWithText_Data
  | import('./defineAnswerWithNumber').Question_AnswerWithNumber_Data
  | import('./defineOrderSequence').Question_OrderSequence_Data
  | import('./defineBuildAnswerWithBlocks').Question_BuildAnswerWithBlocks_Data
  | import('./defineFillBlanksWithBlocks').Question_FillBlanksWithBlocks_Data
  | import('./defineFillBlanksWithText').Question_FillBlanksWithText_Data;

/** Base fragments retain Question identity and kind, but omit translated values. */
export type Question_DataBase = ReturnType<Question_Configurator['build']['data']>['base'];
