import type { LessonState } from '@svitlo/contracts/content';
import { lessonState_Schema } from '../../../schemas/lessonState/lessonState.schema';
import { runStateRequest } from '../../../utils';

export async function listLessonStates(lessonId: LessonState['lessonId']): Promise<LessonState[]> {
  const values: unknown[] = await runStateRequest('lessonStates', 'readonly', store =>
    store.index('lessonId').getAll(lessonId),
  );
  return values.map(value => lessonState_Schema.parse(value));
}
