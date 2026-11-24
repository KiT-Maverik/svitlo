import type { Assessment_Config } from '../../configurators/assessments/defineAssessment/defineAssessment.schemas';

/** Course Stage 5 reserves an Assessment UUID and its reviewed placement.
 * This is a handoff, NOT completed Assessment Stage 1, a Quiz, or runtime Props.
 * Stage 1 completes the design in the same draft.ts; Stage 2 authors Sections.
 */
export type AssessmentWorkflowSeed = {
  config: Pick<Assessment_Config, 'id' | 'slug' | 'type' | 'locale'>;
  production: {
    purpose: string;
    /** Ordered upstream Course Lesson placement paths, including other owners. */
    lessonDependencies: readonly string[];
    placement: { courseId: string; path: string };
  };
};
