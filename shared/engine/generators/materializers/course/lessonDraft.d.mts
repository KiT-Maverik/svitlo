import type { LessonWorkflowStage1 } from '../../../types/workflow/lessonWorkflow.types';
export type LessonDraftContext = {
  lessonId: string;
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
  node: LessonWorkflowStage1<false>,
  context: LessonDraftContext,
): LessonDraftResult;
