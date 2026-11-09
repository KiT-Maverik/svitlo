import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { ZodError } from 'zod';
import { listQuizStates } from './listQuizStates.controller';
import { quizNew, quizInProgress, stubRunStateRequest } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('ListQuizStates', () => {
      afterEach(() => mock.restoreAll());
      describe('Listing', () => {
        it('should use the entity index and return records in persistence order', async () => {
          const persistence = stubRunStateRequest([quizNew, quizInProgress]);
          assert.deepEqual(await listQuizStates('quiz-1'), [quizNew, quizInProgress]);
          assert.deepEqual(persistence.calls, [{ storeName: 'quizStates', mode: 'readonly' }]);
          assert.deepEqual(persistence.index.mock.calls[0]?.arguments, ['quizId']);
          assert.deepEqual(persistence.getAll.mock.calls[0]?.arguments, ['quiz-1']);
        });
        it('should return an empty array for an empty indexed result', async () => {
          stubRunStateRequest([]);
          assert.deepEqual(await listQuizStates('quiz-1'), []);
        });
        it('should pass through an empty lookup key to the index', async () => {
          const persistence = stubRunStateRequest([]);
          await listQuizStates('');
          assert.deepEqual(persistence.getAll.mock.calls[0]?.arguments, ['']);
        });
      });
      describe('Validation', () => {
        it('should reject an invalid record instead of silently dropping it', async () => {
          stubRunStateRequest([quizNew, { ...quizNew, id: '' }]);
          await assert.rejects(listQuizStates('quiz-1'), ZodError);
        });
      });
      describe('Failures', () => {
        it('should propagate a failed index query', async () => {
          const failure = new Error('getAll failed');
          stubRunStateRequest(undefined, failure);
          await assert.rejects(listQuizStates('quiz-1'), error => error === failure);
        });
      });
    });
  });
});
