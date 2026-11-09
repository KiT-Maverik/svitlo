import type { LessonState } from '@svitlo/contracts/content';
import { lessonState_Schema } from '../../../schemas/lessonState/lessonState.schema';
import { runStateRequest } from '../../../utils';

export async function getLessonState(id: LessonState['id']): Promise<LessonState | undefined> {
  const value: unknown = await runStateRequest('lessonStates', 'readonly', store => store.get(id));
  return value === undefined ? undefined : lessonState_Schema.parse(value);
}
