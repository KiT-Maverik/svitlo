import type { QuizState } from '@svitlo/contracts/content';
import { quizStateSchema } from '../../../schemas/quizState/quizState.schema';
import { runStateRequest } from '../../../utils';

export async function getQuizState(id: QuizState['id']): Promise<QuizState | undefined> {
  const value: unknown = await runStateRequest('quizStates', 'readonly', store => store.get(id));
  return value === undefined ? undefined : quizStateSchema.parse(value);
}
