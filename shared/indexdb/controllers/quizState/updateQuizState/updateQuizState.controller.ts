import type { QuizState } from '@svitlo/contracts/content';
import { quizStateSchema } from '../../../schemas/quizState/quizState.schema';
import { updateState } from '../../../utils';

export function updateQuizState(
  id: QuizState['id'],
  change: (current: QuizState) => QuizState,
): Promise<QuizState | undefined> {
  return updateState('quizStates', id, value => quizStateSchema.parse(value), change);
}
