import type { ConfiguratorChild } from '../../types/configuratorChild';
import type { Question_SelectOneAnswer_Configurator } from './defineSelectOneAnswer';
import type { Question_SelectMultipleAnswers_Configurator } from './defineSelectMultipleAnswers';
import type { Question_MatchBlocks_Configurator } from './defineMatchBlocks';
import type { Question_AnswerWithText_Configurator } from './defineAnswerWithText';
import type { Question_AnswerWithNumber_Configurator } from './defineAnswerWithNumber';
import type { Question_OrderSequence_Configurator } from './defineOrderSequence';
import type { Question_BuildAnswerWithBlocks_Configurator } from './defineBuildAnswerWithBlocks';
import type { Question_FillBlanksWithBlocks_Configurator } from './defineFillBlanksWithBlocks';
import type { Question_FillBlanksWithText_Configurator } from './defineFillBlanksWithText';

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
export type Question_Props =
  | import('./defineSelectOneAnswer').Question_SelectOneAnswer_Props
  | import('./defineSelectMultipleAnswers').Question_SelectMultipleAnswers_Props
  | import('./defineMatchBlocks').Question_MatchBlocks_Props
  | import('./defineAnswerWithText').Question_AnswerWithText_Props
  | import('./defineAnswerWithNumber').Question_AnswerWithNumber_Props
  | import('./defineOrderSequence').Question_OrderSequence_Props
  | import('./defineBuildAnswerWithBlocks').Question_BuildAnswerWithBlocks_Props
  | import('./defineFillBlanksWithBlocks').Question_FillBlanksWithBlocks_Props
  | import('./defineFillBlanksWithText').Question_FillBlanksWithText_Props;

/** Base fragments retain Question identity and kind, but omit translated values. */
export type Question_PropsBase = ReturnType<Question_Configurator['build']['props']>['base'];
