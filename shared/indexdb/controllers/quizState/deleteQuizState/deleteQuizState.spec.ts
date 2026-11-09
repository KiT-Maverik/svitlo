import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { deleteQuizState } from './deleteQuizState.controller';
import { stubRunStateRequest } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('DeleteQuizState', () => {
      afterEach(() => mock.restoreAll());
      describe('Deletion', () => {
        it('should delete by run identifier using a write transaction', async () => {
          const persistence = stubRunStateRequest();
          const result = await deleteQuizState('quiz-run-1');
          assert.equal(result, undefined);
          assert.deepEqual(persistence.calls, [{ storeName: 'quizStates', mode: 'readwrite' }]);
          assert.deepEqual(persistence.remove.mock.calls[0]?.arguments, ['quiz-run-1']);
        });
        it('should forward an absent identifier without inventing validation', async () => {
          const persistence = stubRunStateRequest();
          await deleteQuizState('');
          assert.deepEqual(persistence.remove.mock.calls[0]?.arguments, ['']);
        });
      });
      describe('Failures', () => {
        it('should propagate a failed deletion operation', async () => {
          const failure = new Error('delete failed');
          stubRunStateRequest(undefined, failure);
          await assert.rejects(deleteQuizState('quiz-run-1'), error => error === failure);
        });
      });
    });
  });
});
