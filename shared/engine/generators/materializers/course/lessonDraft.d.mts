import type { CourseWorkflowStage3NewLesson, CourseWorkflowStage1Languages } from '../../../types/workflow/courseWorkflow.types';
export type LessonDraftContext = {
  lessonId: string;
  reviewedSourceSha: string;
  languageContext: CourseWorkflowStage1Languages;
  textbookRoot: `content/${string}`;
};
export type LessonDraftResult = {
  lessonId: string;
  files: [{ path: string; kind: 'typescript'; content: string }];
  diagnostics: [{ path: string; code: 'pending-lesson-stage1'; severity: 'blocker'; message: string }];
};
/** The Course proposal becomes an allocated Course-owned Lesson seed, not Lesson Stage 1. */
export function materializeLessonDraft(
  node: CourseWorkflowStage3NewLesson,
  context: LessonDraftContext,
): LessonDraftResult;
