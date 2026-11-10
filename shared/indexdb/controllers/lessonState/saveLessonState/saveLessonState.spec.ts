import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { ZodError } from 'zod';
import { saveLessonState } from './saveLessonState.controller';
import { lessonNew, lessonInProgress, stubRunStateRequest } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('SaveLessonState', () => {
      afterEach(() => mock.restoreAll());
      describe('Saving', () => {
        it('should validate and persist the complete state using put', async () => {
          const persistence = stubRunStateRequest();
          assert.equal(await saveLessonState(lessonInProgress), undefined);
          assert.deepEqual(persistence.calls, [{ storeName: 'lessonStates', mode: 'readwrite' }]);
          assert.deepEqual(persistence.put.mock.calls[0]?.arguments[0], lessonInProgress);
        });
        it('should persist a new state without removing its discriminator', async () => {
          const persistence = stubRunStateRequest();
          await saveLessonState(lessonNew);
          assert.deepEqual(persistence.put.mock.calls[0]?.arguments[0], lessonNew);
        });
      });
      describe('Validation', () => {
        it('should reject invalid identifiers before writing', async () => {
          const persistence = stubRunStateRequest();
          await assert.rejects(saveLessonState({ ...lessonNew, lessonId: '' }), ZodError);
          assert.equal(persistence.spy.mock.callCount(), 0);
        });
        it('should reject malformed nested progress before writing', async () => {
          const persistence = stubRunStateRequest();
          const malformed = { ...lessonInProgress, sectionCompletion: { theory: 'yes' } };
          await assert.rejects(saveLessonState(malformed as unknown as typeof lessonInProgress), ZodError);
          assert.equal(persistence.put.mock.callCount(), 0);
        });
      });
      describe('Failures', () => {
        it('should propagate a failed put operation', async () => {
          const failure = new Error('put failed');
          stubRunStateRequest(undefined, failure);
          await assert.rejects(saveLessonState(lessonNew), error => error === failure);
        });
      });
    });
  });
});
