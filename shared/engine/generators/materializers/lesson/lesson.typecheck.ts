import type { Lesson_Config } from '../../../configurators/lessons/defineLesson/defineLesson.schemas';
import type {
  CourseWorkflowStage3NewLesson,
  CourseWorkflowStage3NewLessonConfig,
  CourseWorkflowLessonSeed,
  CourseWorkflowStage3ExistingLessonConfig,
  CourseWorkflowStage3ExistingLessonReference,
} from '../../../types/workflow/courseWorkflow.types';
import type { LessonWorkflowStage2, LessonWorkflowStage1 } from '../../../types/workflow/lessonWorkflow.types';
import type { Source } from './lesson';
import type { LessonProductionAssessmentRequirements } from '../../../types/workflow/lessonAssessment.types';

/** Stage 3 placements do not yet have the complete standalone Lesson shape. */
declare const newPlacement: CourseWorkflowStage3NewLessonConfig;
declare const existingPlacement: CourseWorkflowStage3ExistingLessonConfig;
declare const builtReuse: CourseWorkflowStage3ExistingLessonReference;
// @ts-expect-error No immutable Lesson UUID, publication languages or section tree in Stage 3.
const invalidNew: Source = newPlacement;
// @ts-expect-error An existing Course Lesson placement is not a standalone Lesson source.
const invalidExisting: Source = existingPlacement;
// @ts-expect-error { id, base?, locale? } is an already-built reference, not a Lesson Config.
const invalidPatch: Source = builtReuse;

/** Parent #775 age/grade additions are legitimate optional Lesson Config params. */
type Audience = Pick<Lesson_Config['params'], 'age' | 'grade'>;
const validAudience: Audience = { age: { min: 6, max: 10 }, grade: { min: 1, max: 4 } };
void invalidNew;
void invalidExisting;
void invalidPatch;
void validAudience;

/** Parent-owned Stage 5 Course handoff is editorial, not a completed Lesson Config. */
declare const courseStage3New: CourseWorkflowStage3NewLesson;
// @ts-expect-error Stage 3 {config, production} envelope cannot be a completed Lesson source.
const invalidStage3Envelope: Source = courseStage3New;
declare const seed: CourseWorkflowLessonSeed;
// @ts-expect-error Course seed is editorial input, not Lesson Stage 1 output.
const incompleteMethodology: LessonWorkflowStage1 = seed;
// @ts-expect-error Course seed cannot be materialized as Lesson Stage 2.
const incompleteContent: LessonWorkflowStage2 = seed;
void incompleteMethodology;
void incompleteContent;
const requirements: LessonProductionAssessmentRequirements = {
  questionBankRequired: true,
  flashcardBankRequired: false,
  quizSectionRequired: false,
  flashcardsSectionRequired: true,
};
// These four decisions do not modify Lesson_Config.params or its publication semantics.
const validProduction = { assessment: requirements };
void invalidStage3Envelope;
void validProduction;
