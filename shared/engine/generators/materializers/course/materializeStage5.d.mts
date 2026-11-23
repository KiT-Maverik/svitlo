import type {
  CourseWorkflowMaterializerInput,
  CourseWorkflowStage3NewLesson,
  CourseWorkflowStage3LessonMatch,
} from '../../../types/workflow/courseWorkflow.types';
import type { Lesson_Configurator } from '../../../configurators/lessons/defineLesson/defineLesson';

export type SourceDiagnostic = {
  path: string;
  code: string;
  severity: 'blocker' | 'warning';
  message?: string;
};
export type SourceFile = {
  path: string;
  kind: 'typescript' | 'markdown' | 'specification' | 'code';
  content: string;
};
export type SourceRenderResult = {
  id?: string;
  lessonId?: string;
  exportName?: string;
  files: SourceFile[];
  diagnostics?: SourceDiagnostic[];
};
export type CourseStage5Review = {
  sourcePath: string;
  sourceBlobSha: string;
  reviewCommitSha: string;
  reviewer: string;
  evidenceUrl: string;
};
export type ExistingLesson = {
  id: string;
  sourceSha: string;
  importPath: string;
  exportName: string;
  languages: readonly string[];
  configurator: Lesson_Configurator;
  /** Original raw Lesson Build expression corresponding to reviewed built sparse output. */
  rawPatch?: Parameters<Lesson_Configurator['build']['overrides']>[0];
  /** Source-authored raw patch expression (for nested Configurator references). */
  rawPatchSource?: string;
  /** Must equal the exact reviewed Course source blob SHA. */
  rawPatchSourceSha?: string;
  rawPatchImports?: readonly string[];
};
export type CourseStage5Options = {
  textbookRoot: `content/${string}`;
  review: CourseStage5Review;
  verifyReviewedSource: (arg: {
    input: CourseWorkflowMaterializerInput;
    review: CourseStage5Review;
    textbookRoot: string;
  }) => boolean;
  resolveExistingLesson?: (arg: {
    id: string;
    matching: CourseWorkflowStage3LessonMatch;
    placement: string;
    languages: readonly string[];
  }) => ExistingLesson;
  materializeSection?: (
    node: unknown,
    context: {
      directory: string;
      documentLanguage: string;
      languagesImport: string;
      [key: string]: unknown;
    },
  ) => SourceRenderResult;
};
export type CourseStage5Plan = {
  sourcePath: string;
  sourceArchivePath: string;
  sourceBlobSha: string;
  reviewCommitSha: string;
  courseId: string;
  root: string;
  files: readonly SourceFile[];
  diagnostics: readonly SourceDiagnostic[];
  placements: readonly { path: string; slug: string; lessonId: string; kind: string }[];
  pendingPlacements: readonly { path: string; slug: string; lessonId: string; handoffPath: string }[];
  publishable: false;
};

/** Typed build-only root entrypoint; Stage 3/4 is NOT a complete Course_Config. */
export function materializeCourseStage5(
  input: CourseWorkflowMaterializerInput,
  options: CourseStage5Options,
): CourseStage5Plan;
