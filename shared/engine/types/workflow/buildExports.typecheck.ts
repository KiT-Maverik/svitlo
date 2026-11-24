import type {
  LessonWorkflowStage1,
  CourseWorkflowLessonSeed,
  CourseWorkflowStage3NewLesson,
  LessonWorkflowStage2,
  QuestionBankWorkflowStage1,
  QuestionBankWorkflowStage2,
  QuestionBankWorkflowStage3,
  FlashcardBankWorkflowStage1,
  FlashcardBankWorkflowStage2,
  FlashcardBankWorkflowStage3,
} from '../../build';

import type { CourseWorkflowLessonSeed as InternalSeed } from './courseWorkflow.types';
import type {
  LessonWorkflowStage1 as InternalLessonStage1,
  LessonWorkflowStage2 as InternalLessonStage2,
} from './lessonWorkflow.types';
import type { QuestionBankWorkflowStage3 as InternalQuestionsStage3 } from './questionBankWorkflow.types';
import type { FlashcardBankWorkflowStage3 as InternalFlashcardsStage3 } from './flashcardBankWorkflow.types';

// Compile-time public API contract. This file participates in the Engine
// code:check:types check, but never ships in the built package.
type Equal<Left, Right> = (<T>() => T extends Left ? 1 : 2) extends <T>() => T extends Right ? 1 : 2 ? true : false;
type Expect<Condition extends true> = Condition;

export type EngineWorkflowBuildExports = [
  Expect<Equal<LessonWorkflowStage1, InternalLessonStage1>>,
  Expect<Equal<LessonWorkflowStage2, InternalLessonStage2>>,
  Expect<Equal<QuestionBankWorkflowStage3, InternalQuestionsStage3>>,
  Expect<Equal<FlashcardBankWorkflowStage3, InternalFlashcardsStage3>>,
  Expect<Equal<CourseWorkflowLessonSeed, InternalSeed>>,
  Expect<Equal<CourseWorkflowLessonSeed extends LessonWorkflowStage1 ? true : false, false>>,
  Expect<Equal<LessonWorkflowStage1 extends CourseWorkflowLessonSeed ? true : false, false>>,
  Expect<Equal<CourseWorkflowStage3NewLesson extends LessonWorkflowStage1 ? true : false, false>>,
  Expect<Equal<CourseWorkflowLessonSeed extends LessonWorkflowStage2 ? true : false, false>>,
  QuestionBankWorkflowStage1,
  QuestionBankWorkflowStage2,
  FlashcardBankWorkflowStage1,
  FlashcardBankWorkflowStage2,
];
