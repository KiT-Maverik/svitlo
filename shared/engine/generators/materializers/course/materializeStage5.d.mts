import type { CourseWorkflowStage3 } from '../../../types/workflow/courseWorkflow.types';
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
export type CourseStage5Source = {
  sourcePath: string;
  sourceBlobSha: string;
};
/** Trusted runner approval to execute the exact independent Lesson Build source.
 * A matching SHA or a caller-provided Configurator by itself is not approval.
 */
export type ExistingLessonRequest = {
  id: string;
  sourceSha: string;
  importPath: string;
  exportName: string;
  placementPath: string;
};
export type ApprovedExistingLesson = {
  approved: true;
  id: string;
  sourceSha: string;
  importPath: string;
  exportName: string;
  configurator: Lesson_Configurator;
};
export type CourseStage5Options = {
  textbookRoot: `content/${string}`;
  source: CourseStage5Source;
  verifySource: (arg: { input: CourseWorkflowStage3; source: CourseStage5Source; textbookRoot: string }) => boolean;
  /** Required whenever the Course reuses a Lesson. The trusted runner must
   * attest execution trust and pinned dependency identity before returning.
   */
  resolveExistingLesson?: (request: ExistingLessonRequest) => ApprovedExistingLesson;
  /** Optional trusted binder for inert added Section references. */
  resolveAddedSection?: (request: { id: string; ownerLessonId: string; sourceSha: string; slug: string; importPath: string; exportName: string; placementPath: string }) => { approved: true; id: string; ownerLessonId: string; sourceSha: string; slug: string; importPath: string; exportName: string; configurator: import('../../../configurators/sections').Section_Configurator };
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
export type CoursePlacementInventoryRow = {
  type: 'lesson' | 'episode' | 'assessment';
  id: string;
  slug: string;
  kind: 'new' | 'reused' | 'overridden';
  status:
    | 'pending-lesson-stage1'
    | 'pending-episode-scenario'
    | 'pending-assessment-design'
    | 'verified-reference'
    | 'materialized-source';
  placementPath: string;
  orderPath: readonly number[];
  sourcePath: string;
  placementSourcePath: string;
  sourceSha?: string;
  lessonDependencies?: readonly string[];
};
export type CourseStage5Plan = {
  sourcePath: string;
  materializedPath: string;
  sourceBlobSha: string;
  courseId: string;
  root: string;
  files: readonly SourceFile[];
  diagnostics: readonly SourceDiagnostic[];
  inventory: {
    lessons: readonly CoursePlacementInventoryRow[];
    episodes: readonly CoursePlacementInventoryRow[];
    assessments: readonly CoursePlacementInventoryRow[];
  };
  placements: readonly { path: string; slug: string; lessonId: string; kind: string }[];
  pendingPlacements: readonly { path: string; slug: string; lessonId: string; handoffPath: string }[];
  pendingEpisodes: readonly {
    path: string;
    slug: string;
    episodeId: string;
    handoffPath: string;
    orderIndex: number;
  }[];
  publishable: false;
};

/** Typed build-only root entrypoint; Stage 3/4 is NOT a complete Course_Config. */
export function materializeCourseStage5(input: CourseWorkflowStage3, options: CourseStage5Options): CourseStage5Plan;
