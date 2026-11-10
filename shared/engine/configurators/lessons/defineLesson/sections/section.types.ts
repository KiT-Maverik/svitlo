import type { TheorySection_Configurator } from './defineTheorySection/defineTheorySection';
import type { PracticeSection_Configurator } from './definePracticeSection/definePracticeSection';
import type { CodingTaskSection_Configurator } from './defineCodingTaskSection/defineCodingTaskSection';
import type { LearningFlowSection_Configurator } from './defineLearningFlowSection/defineLearningFlowSection';
import type { FlashcardsSection_Configurator } from './defineFlashcardsSection/defineFlashcardsSection';
import type { ScenarioSection_Configurator } from './defineScenarioSection/defineScenarioSection';
import type { QuizSection_Configurator } from './defineQuizSection/defineQuizSection';

export type Section_Configurator =
  | TheorySection_Configurator
  | PracticeSection_Configurator
  | CodingTaskSection_Configurator
  | LearningFlowSection_Configurator
  | FlashcardsSection_Configurator
  | ScenarioSection_Configurator
  | QuizSection_Configurator;
