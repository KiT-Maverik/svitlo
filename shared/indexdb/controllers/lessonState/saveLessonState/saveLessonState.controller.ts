import type { LessonState } from '@svitlo/contracts/content';
import { lessonState_Schema } from '../../../schemas/lessonState/lessonState.schema';
import { runStateRequest } from '../../../utils';

export async function saveLessonState(state: LessonState): Promise<void> {
  const validated = lessonState_Schema.parse(state);
  await runStateRequest('lessonStates', 'readwrite', store => store.put(validated));
}
