import type {
  CourseWorkflowStage3NewLesson,
  CourseWorkflowStage1Languages,
} from '../../../types/workflow/courseWorkflow.types';
import type {
  LessonWorkflowStage1,
  LessonWorkflowStage1CourseHandoff,
} from '../../../types/workflow/lessonWorkflow.types';
export type LessonDraftContext = {
  lessonId: string;
  sourceLanguage: CourseWorkflowStage1Languages['document'];
  plannedLanguages: CourseWorkflowStage1Languages['planned'];
  reviewedSourceSha: string;
  textbookRoot: `content/${string}`;
};
export type LessonDraftResult = {
  lessonId: string;
  files: [{ path: string; kind: 'typescript'; content: string }];
  /** Emitted source must satisfy both canonical Lesson types at TypeScript compile time. */
  readonly contract?: LessonWorkflowStage1 & LessonWorkflowStage1CourseHandoff;
  diagnostics: [{ path: string; code: 'pending-lesson-stage1'; severity: 'blocker'; message: string }];
};
/** The new Course placement becomes only the canonical Lesson Stage1 authored input. */
export function materializeLessonDraft(
  node: CourseWorkflowStage3NewLesson,
  context: LessonDraftContext,
): LessonDraftResult;
