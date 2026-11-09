import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { ZodError } from 'zod';
import { saveQuizState } from './saveQuizState.controller';
import { quizNew, quizInProgress, stubRunStateRequest } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('SaveQuizState', () => {
      afterEach(() => mock.restoreAll());
      describe('Saving', () => {
        it('should validate and persist the complete state using put', async () => {
          const persistence = stubRunStateRequest();
          assert.equal(await saveQuizState(quizInProgress), undefined);
          assert.deepEqual(persistence.calls, [{ storeName: 'quizStates', mode: 'readwrite' }]);
          assert.deepEqual(persistence.put.mock.calls[0]?.arguments[0], quizInProgress);
        });
        it('should persist a new state without removing its discriminator', async () => {
          const persistence = stubRunStateRequest();
          await saveQuizState(quizNew);
          assert.deepEqual(persistence.put.mock.calls[0]?.arguments[0], quizNew);
        });
      });
      describe('Validation', () => {
        it('should reject invalid identifiers before writing', async () => {
          const persistence = stubRunStateRequest();
          await assert.rejects(saveQuizState({ ...quizNew, quizId: '' }), ZodError);
          assert.equal(persistence.spy.mock.callCount(), 0);
        });
        it('should reject malformed nested progress before writing', async () => {
          const persistence = stubRunStateRequest();
          const malformed = { ...quizInProgress, answers: { one: { status: 'submitted' } } };
          await assert.rejects(saveQuizState(malformed as unknown as typeof quizInProgress), ZodError);
          assert.equal(persistence.put.mock.callCount(), 0);
        });
      });
      describe('Failures', () => {
        it('should propagate a failed put operation', async () => {
          const failure = new Error('put failed');
          stubRunStateRequest(undefined, failure);
          await assert.rejects(saveQuizState(quizNew), error => error === failure);
        });
      });
    });
  });
});
