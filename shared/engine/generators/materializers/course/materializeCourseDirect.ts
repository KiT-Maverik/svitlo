import type { CourseWorkflowStage3 } from '../../../types/workflow/courseWorkflow.types';
import { courseWorkflowStage3_Schema } from '../../../types/workflow/courseWorkflowFinal.schemas';
import { invokeMaterializer } from '../directMaterialization/directMaterialization';
import { materializeCourseStage5, type CourseStage5Options, type CourseStage5Plan } from './materializeStage5.mjs';

/** Executes the reviewed final Course input exactly once in the isolated worker.
 * All options and evidence are supplied by the runner, not the authored file.
 */
export function materializeCourse(input: CourseWorkflowStage3, options?: CourseStage5Options): CourseStage5Plan {
  return invokeMaterializer(
    'course-stage5',
    options,
    execution => {
      const checked = courseWorkflowStage3_Schema.safeParse(input);
      if (!checked.success) throw new Error('Invalid Course Stage 3 source: ' + checked.error.message);
      return materializeCourseStage5(input, execution);
    },
    input,
  );
}
