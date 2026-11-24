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
export type ExistingLesson = {
  id: string;
  sourceSha: string;
  importPath: string;
  exportName: string;
  languages: readonly string[];
  configurator: Lesson_Configurator;
  /** Original raw Lesson Build expression corresponding to reviewed built sparse output. */
  rawPatch?: Parameters<Lesson_Configurator['build']['overrides']>[0];
};
export type CourseStage5Options = {
  textbookRoot: `content/${string}`;
  source: CourseStage5Source;
  verifySource: (arg: { input: CourseWorkflowStage3; source: CourseStage5Source; textbookRoot: string }) => boolean;
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
  type: 'lesson' | 'episode';
  id: string;
  slug: string;
  kind: 'new' | 'reused' | 'overridden';
  status: 'pending-lesson-stage1' | 'pending-episode-scenario' | 'verified-reference' | 'materialized-source';
  placementPath: string;
  orderPath: readonly number[];
  sourcePath: string;
  placementSourcePath: string;
  sourceSha?: string;
};
export type CourseStage5Plan = {
  sourcePath: string;
  materializedPath: string;
  sourceBlobSha: string;
  courseId: string;
  root: string;
  files: readonly SourceFile[];
  diagnostics: readonly SourceDiagnostic[];
  inventory: { lessons: readonly CoursePlacementInventoryRow[]; episodes: readonly CoursePlacementInventoryRow[] };
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
