import type { Episode_Config } from '../../configurators/episodes/defineEpisode/defineEpisode.schemas';
import type { CourseWorkflowStage1Languages, CourseWorkflowStage2EpisodeProduction } from './courseWorkflow.types';
import type { LessonWorkflowOrdered, LessonWorkflowStage2Section } from './lessonWorkflow.types';

/** Immutable Course-owned placement allocated once during authorized Course Stage 5. */
export type EpisodeWorkflowPlacement = {
  courseId: Episode_Config['id'];
  path: string;
  orderPath: readonly number[];
  reviewedCourseSourceBlobSha: string;
};

/** Minimal Course Stage 5 handoff. It is not an approved scenario or Configurator. */
export type EpisodeWorkflowStage1Handoff = {
  config: Pick<Episode_Config, 'id' | 'slug' | 'type'>;
  production: CourseWorkflowStage2EpisodeProduction & {
    placement: EpisodeWorkflowPlacement;
    languages: CourseWorkflowStage1Languages;
  };
};

export type EpisodeWorkflowScenario = {
  audience: string;
  entrySituation: string;
  exitSituation: string;
  continuity: string;
  sceneIntent: string;
  interactionIntent: string;
  accessibility: string;
  narrativeConstraints: string;
};

export type EpisodeWorkflowStage1 = {
  config: EpisodeWorkflowStage1Handoff['config'];
  production: EpisodeWorkflowStage1Handoff['production'] & {
    scenario: EpisodeWorkflowScenario;
  };
};

/** Ordinary Sections share the existing editorial Block contract.
 * Assessment-only Sections and Build-only Quest are outside Episode production.
 */
export type EpisodeWorkflowSection = Extract<
  LessonWorkflowStage2Section,
  { config: { type: 'content' | 'practice' | 'codingTask' | 'learningFlow' } }
>;

export type EpisodeWorkflowStage2 = {
  config: EpisodeWorkflowStage1['config'] & Pick<Episode_Config, 'locale'> & {
    /** Opaque Episode events have no supported runtime semantics yet. */
    events?: Record<string, never>;
    params?: Omit<Episode_Config['params'], 'languages'> & { languages?: never };
    section: LessonWorkflowOrdered<EpisodeWorkflowSection>;
  };
  production: EpisodeWorkflowStage1['production'] & {
    specification: string;
  };
};

/** Review does not create another editorial type or publish Props. */
export type EpisodeWorkflowMaterializerInput = EpisodeWorkflowStage2;
