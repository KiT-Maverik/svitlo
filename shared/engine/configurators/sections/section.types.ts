import type { ConfiguratorChild } from '../../types/configuratorChild';
import type { CodingTaskSection_Configurator, CodingTaskSection_Data } from './defineCodingTaskSection';
import type { Content_Section_Data, ContentSection_Configurator } from './defineContentSection';
import type { FlashcardsSection_Configurator, FlashcardsSection_Data } from './defineFlashcardsSection';
import type { LearningFlowSection_Configurator, LearningFlowSection_Data } from './defineLearningFlowSection';
import type { PracticeSection_Configurator, PracticeSection_Data } from './definePracticeSection';
import type { QuizSection_Configurator, QuizSection_Data } from './defineQuizSection';

export type Section_Configurator = ConfiguratorChild<
  | ContentSection_Configurator
  | PracticeSection_Configurator
  | CodingTaskSection_Configurator
  | LearningFlowSection_Configurator
  | FlashcardsSection_Configurator
  | QuizSection_Configurator
>;

export type Section_Data =
  | Content_Section_Data
  | PracticeSection_Data
  | CodingTaskSection_Data
  | LearningFlowSection_Data
  | FlashcardsSection_Data
  | QuizSection_Data;
