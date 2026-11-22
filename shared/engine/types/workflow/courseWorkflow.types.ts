import type { Course_Config } from '../../configurators/courses/defineCourse/defineCourse.schemas';

/** Stage 1 is a plain editorial config, not a built Course Configurator. */
export type CourseWorkflowStage1Config = Pick<Course_Config, 'id' | 'type' | 'slug'> & {
  /** Only the Config parameters available in methodology planning; languages are production-owned. */
  params?: Partial<Omit<Course_Config['params'], 'languages' | 'scenarioMode'>> & {
    languages?: never;
    scenarioMode?: never;
  };
  locale?: Partial<Course_Config['locale']>;
};

type CourseLanguage = Course_Config['params']['languages'][number];

/** The complete planned set is nonempty; publication initially uses only document. */
export type CourseWorkflowStage1Languages = {
  document: CourseLanguage;
  planned: readonly [CourseLanguage, ...CourseLanguage[]];
};

/** Required methodology fields mirror the Stage 1 YAML field names.
 * Fields formerly optional in YAML are required for a completed Stage 1 plan:
 * the editor must explicitly state scope, depth, entry conditions, accessibility
 * and source notes rather than silently skipping the decision.
 */
export type CourseWorkflowStage1Methodology = {
  purpose: string;
  audience: string;
  approach: string;
  depth: string;
  accessibility: string;
  scope: string;
  entryConditions: string;
  sourceNotes: string;
};

/** Evidence is production metadata, not a claim of Course accreditation. */
export type CourseWorkflowStage1StandardAlignment = {
  standardId: NonNullable<Course_Config['params']['educationStandards']>[number];
  status: 'intended' | 'partial' | 'verified';
  evidence: string;
  version?: string;
  sourceUrl?: string;
  jurisdiction?: string;
};

/** Editorial-only fields from the Stage 1 Course YAML methodology.
 * Empty arrays/maps mean an explicit decision that nothing currently applies.
 */
export type CourseWorkflowStage1Production = {
  languages: CourseWorkflowStage1Languages;
  methodology: CourseWorkflowStage1Methodology;
  outcomes: { explanation: string };
  prerequisites: { explanation: string };
  standardsAlignment: CourseWorkflowStage1StandardAlignment[];
  openDecisions: Record<string, string>;
};

/** Completed Stage 1: TypeScript requires each methodological deliverable.
 * Stage 2 will add a typed authoring content tree to this same object.
 */
export type CourseWorkflowStage1 = {
  config: CourseWorkflowStage1Config;
  production: CourseWorkflowStage1Production;
};
