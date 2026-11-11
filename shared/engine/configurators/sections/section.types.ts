import type { ContentSection_Configurator } from './defineContentSection/defineContentSection';
import type { PracticeSection_Configurator } from './definePracticeSection/definePracticeSection';
import type { CodingTaskSection_Configurator } from './defineCodingTaskSection/defineCodingTaskSection';
import type { LearningFlowSection_Configurator } from './defineLearningFlowSection/defineLearningFlowSection';
import type { FlashcardsSection_Configurator } from './defineFlashcardsSection/defineFlashcardsSection';
import type { QuizSection_Configurator } from './defineQuizSection/defineQuizSection';
import type { Content_Section_Props } from './defineContentSection/defineContentSection.schemas';
import type { PracticeSection_Props } from './definePracticeSection/definePracticeSection.schemas';
import type { CodingTaskSection_Props } from './defineCodingTaskSection/defineCodingTaskSection.schemas';
import type { LearningFlowSection_Props } from './defineLearningFlowSection/defineLearningFlowSection.schemas';
import type { FlashcardsSection_Props } from './defineFlashcardsSection/defineFlashcardsSection.schemas';
import type { QuizSection_Props } from './defineQuizSection/defineQuizSection.schemas';

export type Section_Configurator =
  | ContentSection_Configurator
  | PracticeSection_Configurator
  | CodingTaskSection_Configurator
  | LearningFlowSection_Configurator
  | FlashcardsSection_Configurator
  | QuizSection_Configurator;

export type Section_Props =
  | Content_Section_Props
  | PracticeSection_Props
  | CodingTaskSection_Props
  | LearningFlowSection_Props
  | FlashcardsSection_Props
  | QuizSection_Props;
