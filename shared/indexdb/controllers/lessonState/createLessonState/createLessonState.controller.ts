import type { LessonState } from '@svitlo/contracts/content';
import { newLessonState_Schema } from '../../../schemas/lessonState/lessonState.schema';
import { runStateRequest } from '../../../utils';

export async function createLessonState(lessonId: string): Promise<Extract<LessonState, { status: 'new' }>> {
  const state = newLessonState_Schema.parse({ id: crypto.randomUUID(), lessonId, status: 'new' });
  await runStateRequest('lessonStates', 'readwrite', store => store.add(state));
  return state;
}
