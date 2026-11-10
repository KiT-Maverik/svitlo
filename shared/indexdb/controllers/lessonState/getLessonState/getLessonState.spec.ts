import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { ZodError } from 'zod';
import { getLessonState } from './getLessonState.controller';
import { lessonNew, lessonInProgress, stubRunStateRequest } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('GetLessonState', () => {
      afterEach(() => mock.restoreAll());
      describe('Retrieval', () => {
        it('should return a validated state by its run identifier', async () => {
          const persistence = stubRunStateRequest(lessonInProgress);
          const result = await getLessonState('lesson-run-1');
          assert.deepEqual(result, lessonInProgress);
          assert.deepEqual(persistence.calls, [{ storeName: 'lessonStates', mode: 'readonly' }]);
          assert.deepEqual(persistence.get.mock.calls[0]?.arguments, ['lesson-run-1']);
        });
        it('should return undefined when no matching record exists', async () => {
          const persistence = stubRunStateRequest(undefined);
          assert.equal(await getLessonState('missing'), undefined);
          assert.deepEqual(persistence.get.mock.calls[0]?.arguments, ['missing']);
        });
        it('should accept a valid new run', async () => {
          stubRunStateRequest(lessonNew);
          assert.deepEqual(await getLessonState('lesson-run-1'), lessonNew);
        });
      });
      describe('Validation', () => {
        it('should reject malformed persisted records', async () => {
          stubRunStateRequest({ ...lessonNew, lessonId: '' });
          await assert.rejects(getLessonState('lesson-run-1'), ZodError);
        });
        it('should reject additional fields in a persisted record', async () => {
          stubRunStateRequest({ ...lessonNew, unexpected: true });
          await assert.rejects(getLessonState('lesson-run-1'), ZodError);
        });
      });
      describe('Failures', () => {
        it('should propagate a failed read operation', async () => {
          const failure = new Error('get failed');
          stubRunStateRequest(undefined, failure);
          await assert.rejects(getLessonState('lesson-run-1'), error => error === failure);
        });
      });
    });
  });
});
