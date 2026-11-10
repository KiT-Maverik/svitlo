import type { QuizState } from '@svitlo/contracts/content';
import { quizStateSchema } from '../../../schemas/quizState/quizState.schema';
import { runStateRequest } from '../../../utils';

export async function saveQuizState(state: QuizState): Promise<void> {
  const validated = quizStateSchema.parse(state);
  await runStateRequest('quizStates', 'readwrite', store => store.put(validated));
}
