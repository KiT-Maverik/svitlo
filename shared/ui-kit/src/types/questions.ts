/** Discriminated union of the nine canonical, published Engine Question Props variants. */
import type {
  Question_SelectOneAnswer_Props,
  Question_SelectMultipleAnswers_Props,
  Question_MatchBlocks_Props,
  Question_AnswerWithText_Props,
  Question_AnswerWithNumber_Props,
  Question_OrderSequence_Props,
  Question_BuildAnswerWithBlocks_Props,
  Question_FillBlanksWithBlocks_Props,
  Question_FillBlanksWithText_Props,
} from '@svitlo/engine/runtime';

export type QuestionResponse =
  Question_SelectOneAnswer_Props
  | Question_SelectMultipleAnswers_Props
  | Question_MatchBlocks_Props
  | Question_AnswerWithText_Props
  | Question_AnswerWithNumber_Props
  | Question_OrderSequence_Props
  | Question_BuildAnswerWithBlocks_Props
  | Question_FillBlanksWithBlocks_Props
  | Question_FillBlanksWithText_Props;

export type { Question_Type } from '@svitlo/engine/runtime';
