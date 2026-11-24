import type { LessonWorkflowStage1 } from '../../../types/workflow/lessonWorkflow.types';
import { materializeCourseStage5 } from './materializeStage5.mjs';
import { materializeLessonDraft } from './lessonDraft.mjs';
import type { CourseStage5Options, CourseStage5Plan } from './materializeStage5.mjs';
import type { CourseWorkflowMaterializerInput } from '../../../types/workflow/courseWorkflow.types';

// The root planner accepts EXACTLY the canonical Stage3 Course type, not a
// duplicate stage schema or a final Course_Config Configurator instance.
const acceptsReviewedStage3: (
  value: CourseWorkflowMaterializerInput,
  options: CourseStage5Options,
) => CourseStage5Plan = materializeCourseStage5;

const acceptsApprovedNewLesson: (
  value: LessonWorkflowStage1<false>,
  context: Parameters<typeof materializeLessonDraft>[1],
) => ReturnType<typeof materializeLessonDraft> = materializeLessonDraft;

void acceptsReviewedStage3;
void acceptsApprovedNewLesson;
