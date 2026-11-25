import type { LessonState } from '../../../schemas';
import { lessonState_Schema } from '../../../schemas/lessonState/lessonState.schema';
import { updateState } from '../../../utils';

export function updateLessonState(
  id: LessonState['id'],
  change: (current: LessonState) => LessonState,
): Promise<LessonState | undefined> {
  return updateState('lessonStates', id, value => lessonState_Schema.parse(value), change);
}
