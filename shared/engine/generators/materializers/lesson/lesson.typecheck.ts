import type { Lesson_Config } from '../../../configurators/lessons/defineLesson/defineLesson.schemas';
import type {
  CourseWorkflowStage3NewLessonConfig,
  CourseWorkflowStage3ExistingLessonConfig,
  CourseWorkflowStage3ExistingLessonReference,
} from '../../../types/workflow/courseWorkflow.types';
import type { Source } from './lesson';

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
