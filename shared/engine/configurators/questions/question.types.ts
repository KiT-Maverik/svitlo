import type { Question_SelectOneAnswer_Configurator } from './defineSelectOneAnswer';
import type { Question_SelectMultipleAnswers_Configurator } from './defineSelectMultipleAnswers';
import type { Question_MatchBlocks_Configurator } from './defineMatchBlocks';
import type { Question_AnswerWithText_Configurator } from './defineAnswerWithText';
import type { Question_AnswerWithNumber_Configurator } from './defineAnswerWithNumber';
import type { Question_OrderSequence_Configurator } from './defineOrderSequence';
import type { Question_BuildAnswerWithBlocks_Configurator } from './defineBuildAnswerWithBlocks';
import type { Question_FillBlanksWithBlocks_Configurator } from './defineFillBlanksWithBlocks';
import type { Question_FillBlanksWithText_Configurator } from './defineFillBlanksWithText';

export type Question_Configurator =
  | Question_SelectOneAnswer_Configurator
  | Question_SelectMultipleAnswers_Configurator
  | Question_MatchBlocks_Configurator
  | Question_AnswerWithText_Configurator
  | Question_AnswerWithNumber_Configurator
  | Question_OrderSequence_Configurator
  | Question_BuildAnswerWithBlocks_Configurator
  | Question_FillBlanksWithBlocks_Configurator
  | Question_FillBlanksWithText_Configurator;
