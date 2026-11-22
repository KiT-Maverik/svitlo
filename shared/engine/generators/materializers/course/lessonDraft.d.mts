import type { CourseWorkflowStage3NewLesson } from '../../../types/workflow/courseWorkflow.types';
export type LessonDraftContext = {
  lessonId: string;
  sourceLanguage: string;
  plannedLanguages: readonly [string, ...string[]];
  reviewedSourceSha: string;
  textbookRoot: `content/${string}`;
};
export type LessonDraftResult = {
  lessonId: string;
  files: [{ path: string; kind: 'typescript'; content: string }];
  diagnostics: [{ path: string; code: 'pending-lesson-stage1'; severity: 'blocker'; message: string }];
};
/** The new Course placement becomes only the canonical Lesson Stage1 authored input. */
export function materializeLessonDraft(
  node: CourseWorkflowStage3NewLesson,
  context: LessonDraftContext,
): LessonDraftResult;
