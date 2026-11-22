import type { CourseStage5Plan } from './materializeStage5.mjs';
export type SourceCommitOptions = { repoRoot: string };
export type SourceCommitWriteOptions = SourceCommitOptions & {
  mode: 'check' | 'write';
  branch?: string;
  authorizeWrite?: (evidence: {
    sourcePath: string;
    sourceBlobSha: string;
    reviewCommitSha: string;
    head: string;
  }) => boolean;
};
export function preflightCourseSourceCommit(plan: CourseStage5Plan, options: SourceCommitOptions): {
  head: string;
  files: Map<string, string>;
  pending: string[];
  already: boolean;
  archivePath: string;
};
export function commitCourseSourcePlan(plan: CourseStage5Plan, options: SourceCommitWriteOptions): {
  mode: 'write' | 'check';
  head: string;
  commitSha?: string;
  changed?: number;
  pending?: string[];
  already: boolean;
  archivePath?: string;
};
