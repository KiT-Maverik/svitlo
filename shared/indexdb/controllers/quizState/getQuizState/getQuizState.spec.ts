import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { ZodError } from 'zod';
import { getQuizState } from './getQuizState.controller';
import { quizNew, quizInProgress, stubRunStateRequest } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('GetQuizState', () => {
      afterEach(() => mock.restoreAll());
      describe('Retrieval', () => {
        it('should return a validated state by its run identifier', async () => {
          const persistence = stubRunStateRequest(quizInProgress);
          const result = await getQuizState('quiz-run-1');
          assert.deepEqual(result, quizInProgress);
          assert.deepEqual(persistence.calls, [{ storeName: 'quizStates', mode: 'readonly' }]);
          assert.deepEqual(persistence.get.mock.calls[0]?.arguments, ['quiz-run-1']);
        });
        it('should return undefined when no matching record exists', async () => {
          const persistence = stubRunStateRequest(undefined);
          assert.equal(await getQuizState('missing'), undefined);
          assert.deepEqual(persistence.get.mock.calls[0]?.arguments, ['missing']);
        });
        it('should accept a valid new run', async () => {
          stubRunStateRequest(quizNew);
          assert.deepEqual(await getQuizState('quiz-run-1'), quizNew);
        });
      });
      describe('Validation', () => {
        it('should reject malformed persisted records', async () => {
          stubRunStateRequest({ ...quizNew, quizId: '' });
          await assert.rejects(getQuizState('quiz-run-1'), ZodError);
        });
        it('should reject additional fields in a persisted record', async () => {
          stubRunStateRequest({ ...quizNew, unexpected: true });
          await assert.rejects(getQuizState('quiz-run-1'), ZodError);
        });
      });
      describe('Failures', () => {
        it('should propagate a failed read operation', async () => {
          const failure = new Error('get failed');
          stubRunStateRequest(undefined, failure);
          await assert.rejects(getQuizState('quiz-run-1'), error => error === failure);
        });
      });
    });
  });
});
