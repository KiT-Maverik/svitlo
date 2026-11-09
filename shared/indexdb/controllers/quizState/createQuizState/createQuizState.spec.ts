import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { ZodError } from 'zod';
import { createQuizState } from './createQuizState.controller';
import { stubRunStateRequest } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('CreateQuizState', () => {
      afterEach(() => mock.restoreAll());
      describe('Creation', () => {
        it('should create a new state with a generated run identifier and preserve the entity identifier', async () => {
          const persistence = stubRunStateRequest();
          const state = await createQuizState('quiz-1');
          assert.equal(state.status, 'new');
          assert.equal(state.quizId, 'quiz-1');
          assert.match(state.id, /^[0-9a-f]{8}-[0-9a-f-]{27}$/i);
          assert.deepEqual(persistence.calls, [{ storeName: 'quizStates', mode: 'readwrite' }]);
          assert.deepEqual(persistence.add.mock.calls[0]?.arguments[0], state);
        });
        it('should generate a different run identifier for each creation', async () => {
          const persistence = stubRunStateRequest();
          const first = await createQuizState('quiz-1');
          const second = await createQuizState('quiz-1');
          assert.notEqual(first.id, second.id);
          assert.equal(persistence.add.mock.callCount(), 2);
        });
        it('should reject an empty entity identifier before requesting persistence', async () => {
          const persistence = stubRunStateRequest();
          await assert.rejects(createQuizState(''), ZodError);
          assert.equal(persistence.spy.mock.callCount(), 0);
        });
      });
      describe('Failures', () => {
        it('should propagate a failed add operation', async () => {
          const failure = new Error('add failed');
          stubRunStateRequest(undefined, failure);
          await assert.rejects(createQuizState('quiz-1'), error => error === failure);
        });
      });
    });
  });
});
