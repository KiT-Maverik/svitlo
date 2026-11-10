import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { ZodError } from 'zod';
import { listLessonStates } from './listLessonStates.controller';
import { lessonNew, lessonInProgress, stubRunStateRequest } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('ListLessonStates', () => {
      afterEach(() => mock.restoreAll());
      describe('Listing', () => {
        it('should use the entity index and return records in persistence order', async () => {
          const persistence = stubRunStateRequest([lessonNew, lessonInProgress]);
          assert.deepEqual(await listLessonStates('lesson-1'), [lessonNew, lessonInProgress]);
          assert.deepEqual(persistence.calls, [{ storeName: 'lessonStates', mode: 'readonly' }]);
          assert.deepEqual(persistence.index.mock.calls[0]?.arguments, ['lessonId']);
          assert.deepEqual(persistence.getAll.mock.calls[0]?.arguments, ['lesson-1']);
        });
        it('should return an empty array for an empty indexed result', async () => {
          stubRunStateRequest([]);
          assert.deepEqual(await listLessonStates('lesson-1'), []);
        });
        it('should pass through an empty lookup key to the index', async () => {
          const persistence = stubRunStateRequest([]);
          await listLessonStates('');
          assert.deepEqual(persistence.getAll.mock.calls[0]?.arguments, ['']);
        });
      });
      describe('Validation', () => {
        it('should reject an invalid record instead of silently dropping it', async () => {
          stubRunStateRequest([lessonNew, { ...lessonNew, id: '' }]);
          await assert.rejects(listLessonStates('lesson-1'), ZodError);
        });
      });
      describe('Failures', () => {
        it('should propagate a failed index query', async () => {
          const failure = new Error('getAll failed');
          stubRunStateRequest(undefined, failure);
          await assert.rejects(listLessonStates('lesson-1'), error => error === failure);
        });
      });
    });
  });
});
