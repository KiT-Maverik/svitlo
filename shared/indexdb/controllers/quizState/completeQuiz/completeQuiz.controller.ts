import type { QuizResult, QuizState } from '@svitlo/contracts/content';
import { updateQuizState } from '../updateQuizState/updateQuizState.controller';

/** Stores an already calculated result and finishes one in-progress quiz run. */
export function completeQuiz(id: QuizState['id'], result: QuizResult): Promise<QuizState | undefined> {
  return updateQuizState(id, current => {
    if (current.status !== 'in-progress') {
      throw new Error('Only an in-progress quiz can be completed');
    }
    return { ...current, status: 'finished', completedAt: new Date().toISOString(), result };
  });
}
