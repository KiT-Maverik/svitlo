export { materializeCourseStage5 } from './materializeStage5.mjs';
export type {
  CourseStage5Options,
  CourseStage5Plan,
  CourseStage5Review,
  ExistingLesson,
  SourceDiagnostic,
  SourceFile,
} from './materializeStage5.mjs';
export { materializeLessonDraft } from './lessonDraft.mjs';
export type { LessonDraftContext, LessonDraftResult } from './lessonDraft.mjs';
export { deriveCourseEntityId } from './deriveCourseEntityId.mjs';
export { preflightCourseSourceCommit, commitCourseSourcePlan } from './sourceCommit.mjs';
