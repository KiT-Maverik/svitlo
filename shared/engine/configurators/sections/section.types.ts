import type { ContentSection_Configurator, Content_Section_Props } from './defineContentSection';
import type { PracticeSection_Configurator, PracticeSection_Props } from './definePracticeSection';
import type { CodingTaskSection_Configurator, CodingTaskSection_Props } from './defineCodingTaskSection';
import type { LearningFlowSection_Configurator, LearningFlowSection_Props } from './defineLearningFlowSection';
import type { Flashcards_Section_Configurator, FlashcardsSection_Props } from './defineFlashcardsSection';
import type { QuizSection_Configurator, QuizSection_Props } from './defineQuizSection';

export type Section_Configurator =
  | ContentSection_Configurator
  | PracticeSection_Configurator
  | CodingTaskSection_Configurator
  | LearningFlowSection_Configurator
  | Flashcards_Section_Configurator
  | QuizSection_Configurator;

export type Section_Props =
  | Content_Section_Props
  | PracticeSection_Props
  | CodingTaskSection_Props
  | LearningFlowSection_Props
  | FlashcardsSection_Props
  | QuizSection_Props;
