/** Discriminated union of the nine canonical, published Engine Question Props variants. */
import type {
  Question_AnswerWithNumber_Data,
  Question_AnswerWithText_Data,
  Question_BuildAnswerWithBlocks_Data,
  Question_FillBlanksWithBlocks_Data,
  Question_FillBlanksWithText_Data,
  Question_MatchBlocks_Data,
  Question_OrderSequence_Data,
  Question_SelectMultipleAnswers_Data,
  Question_SelectOneAnswer_Data,
} from '@svitlo/engine/runtime';

export type QuestionResponse =
  | Question_SelectOneAnswer_Data
  | Question_SelectMultipleAnswers_Data
  | Question_MatchBlocks_Data
  | Question_AnswerWithText_Data
  | Question_AnswerWithNumber_Data
  | Question_OrderSequence_Data
  | Question_BuildAnswerWithBlocks_Data
  | Question_FillBlanksWithBlocks_Data
  | Question_FillBlanksWithText_Data;

export type { Question_Type } from '@svitlo/engine/runtime';
