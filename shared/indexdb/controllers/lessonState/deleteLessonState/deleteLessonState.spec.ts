import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { deleteLessonState } from './deleteLessonState.controller';
import { stubRunStateRequest } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('DeleteLessonState', () => {
      afterEach(() => mock.restoreAll());
      describe('Deletion', () => {
        it('should delete by run identifier using a write transaction', async () => {
          const persistence = stubRunStateRequest();
          const result = await deleteLessonState('lesson-run-1');
          assert.equal(result, undefined);
          assert.deepEqual(persistence.calls, [{ storeName: 'lessonStates', mode: 'readwrite' }]);
          assert.deepEqual(persistence.remove.mock.calls[0]?.arguments, ['lesson-run-1']);
        });
        it('should forward an absent identifier without inventing validation', async () => {
          const persistence = stubRunStateRequest();
          await deleteLessonState('');
          assert.deepEqual(persistence.remove.mock.calls[0]?.arguments, ['']);
        });
      });
      describe('Failures', () => {
        it('should propagate a failed deletion operation', async () => {
          const failure = new Error('delete failed');
          stubRunStateRequest(undefined, failure);
          await assert.rejects(deleteLessonState('lesson-run-1'), error => error === failure);
        });
      });
    });
  });
});
