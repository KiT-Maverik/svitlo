import type { QuizState } from '@svitlo/contracts/content';
import { quizStateSchema } from '../../../schemas/quizState/quizState.schema';
import { runStateRequest } from '../../../utils';

export async function createQuizState(quizId: string): Promise<QuizState> {
  const state = quizStateSchema.parse({ id: crypto.randomUUID(), quizId, status: 'new' });
  await runStateRequest('quizStates', 'readwrite', store => store.add(state));
  return state;
}
