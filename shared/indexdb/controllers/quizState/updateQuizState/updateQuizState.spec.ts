import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { ZodError } from 'zod';
import type { QuizState } from '@svitlo/contracts/content';
import { updateQuizState } from './updateQuizState.controller';
import { quizInProgress, stubUpdateState } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('UpdateQuizState', () => {
      afterEach(() => mock.restoreAll());
      describe('Updating', () => {
        it('should forward the state key and validated current state to the change callback', async () => {
          const persistence = stubUpdateState(quizInProgress);
          const change = mock.fn((current: QuizState): QuizState => ({ ...current, quizId: 'quiz-2' }));
          const result = await updateQuizState('quiz-run-1', change);
          assert.deepEqual(result, { ...quizInProgress, quizId: 'quiz-2' });
          assert.deepEqual(change.mock.calls[0]?.arguments[0], quizInProgress);
          assert.deepEqual(
            persistence.calls.map(({ storeName, id }) => ({ storeName, id })),
            [{ storeName: 'quizStates', id: 'quiz-run-1' }],
          );
        });
        it('should return undefined for a missing record without invoking the callback', async () => {
          stubUpdateState(undefined);
          const change = mock.fn((current: QuizState) => current);
          assert.equal(await updateQuizState('missing', change), undefined);
          assert.equal(change.mock.callCount(), 0);
        });
        it('should propagate an exception raised by the change callback', async () => {
          stubUpdateState(quizInProgress);
          const failure = new Error('change failed');
          await assert.rejects(
            updateQuizState('quiz-run-1', () => {
              throw failure;
            }),
            error => error === failure,
          );
        });
      });
      describe('Validation', () => {
        it('should reject malformed persisted state through the supplied parser', async () => {
          const invalid = { ...quizInProgress, quizId: '' };
          stubUpdateState(invalid);
          await assert.rejects(
            updateQuizState('quiz-run-1', state => state),
            ZodError,
          );
        });
        it('should supply a parser that rejects malformed updated state', async () => {
          const persistence = stubUpdateState(quizInProgress);
          await updateQuizState('quiz-run-1', state => state);
          assert.throws(() => persistence.calls[0].parse({ ...quizInProgress, status: 'unknown' }), ZodError);
        });
      });
      describe('Failures', () => {
        it('should propagate an error from the persistence dependency', async () => {
          const failure = new Error('update failed');
          stubUpdateState(undefined, failure);
          await assert.rejects(
            updateQuizState('quiz-run-1', state => state),
            error => error === failure,
          );
        });
      });
    });
  });
});
