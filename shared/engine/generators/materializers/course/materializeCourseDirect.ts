import type { CourseWorkflowStage3 } from '../../../types/workflow/courseWorkflow.types';
import { courseWorkflowStage3_Schema } from '../../../types/workflow/courseWorkflowFinal.schemas';
import { materializeWorkflowSection } from '../lesson/materializeStage6';
import { materializeCourseStage5, type CourseStage5Options, type CourseStage5Plan } from './materializeStage5.mjs';

/** Plan an already parsed Course Stage 3 object with explicit trusted options. */
export function materializeCourse(input: CourseWorkflowStage3, options: CourseStage5Options): CourseStage5Plan {
  const checked = courseWorkflowStage3_Schema.safeParse(input);
  if (!checked.success) throw new Error('Invalid Course Stage 3 source: ' + checked.error.message);
  const documentLanguage = checked.data.production.languages.document;
  const rootId = checked.data.config.id;
  return materializeCourseStage5(checked.data, {
    ...options,
    // Trust boundary: only compiled default-branch Lesson concrete renderers
    // generate newly authored Course-owned Section and ContentBlock source.
    renderAddedSection: (section, context) =>
      materializeCourseOwnedLessonSection(section, {
        directory: context.directory,
        documentLanguage,
        languagesImport: '#coursesData/' + rootId.at(-1) + '/' + rootId + '/constants',
        sceneOutputRoot: options.textbookRoot + '/scenes',
      }),
  });
}
