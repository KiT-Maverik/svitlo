import type { LessonState, QuizResult, QuizState } from '../schemas';

export type ControllerCommand =
  | { op: 'createLessonState'; lessonId: string }
  | { op: 'getLessonState'; id: string }
  | { op: 'listLessonStates'; lessonId: string }
  | { op: 'saveLessonState'; state: LessonState }
  | { op: 'deleteLessonState'; id: string }
  | { op: 'updateLessonState'; id: string; patch: Record<string, unknown> }
  | { op: 'createQuizState'; quizId: string }
  | { op: 'getQuizState'; id: string }
  | { op: 'listQuizStates'; quizId: string }
  | { op: 'saveQuizState'; state: QuizState }
  | { op: 'deleteQuizState'; id: string }
  | { op: 'updateQuizState'; id: string; patch: Record<string, unknown> }
  | { op: 'completeQuiz'; id: string; result: QuizResult }
  | { op: 'inspectDatabase' }
  | { op: 'holdConnection' }
  | { op: 'releaseConnection' };

export interface DatabaseInspection {
  name: string;
  version: number;
  stores: Array<{
    name: string;
    keyPath: string | null;
    indexes: Array<{ name: string; keyPath: string | null; unique: boolean }>;
  }>;
}
