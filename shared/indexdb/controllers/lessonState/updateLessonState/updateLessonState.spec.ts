import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { ZodError } from 'zod';
import type { LessonState } from '@svitlo/contracts/content';
import { updateLessonState } from './updateLessonState.controller';
import { lessonInProgress, stubUpdateState } from '../../testUtils/controllerTestDoubles';

describe('DB', () => {
  describe('Controllers', () => {
    describe('UpdateLessonState', () => {
      afterEach(() => mock.restoreAll());
      describe('Updating', () => {
        it('should forward the state key and validated current state to the change callback', async () => {
          const persistence = stubUpdateState(lessonInProgress);
          const change = mock.fn((current: LessonState): LessonState => ({ ...current, lessonId: 'lesson-2' }));
          const result = await updateLessonState('lesson-run-1', change);
          assert.deepEqual(result, { ...lessonInProgress, lessonId: 'lesson-2' });
          assert.deepEqual(change.mock.calls[0]?.arguments[0], lessonInProgress);
          assert.deepEqual(
            persistence.calls.map(({ storeName, id }) => ({ storeName, id })),
            [{ storeName: 'lessonStates', id: 'lesson-run-1' }],
          );
        });
        it('should return undefined for a missing record without invoking the callback', async () => {
          stubUpdateState(undefined);
          const change = mock.fn((current: LessonState) => current);
          assert.equal(await updateLessonState('missing', change), undefined);
          assert.equal(change.mock.callCount(), 0);
        });
        it('should propagate an exception raised by the change callback', async () => {
          stubUpdateState(lessonInProgress);
          const failure = new Error('change failed');
          await assert.rejects(
            updateLessonState('lesson-run-1', () => {
              throw failure;
            }),
            error => error === failure,
          );
        });
      });
      describe('Validation', () => {
        it('should reject malformed persisted state through the supplied parser', async () => {
          const invalid = { ...lessonInProgress, lessonId: '' };
          stubUpdateState(invalid);
          await assert.rejects(
            updateLessonState('lesson-run-1', state => state),
            ZodError,
          );
        });
        it('should supply a parser that rejects malformed updated state', async () => {
          const persistence = stubUpdateState(lessonInProgress);
          await updateLessonState('lesson-run-1', state => state);
          assert.throws(() => persistence.calls[0].parse({ ...lessonInProgress, status: 'unknown' }), ZodError);
        });
      });
      describe('Failures', () => {
        it('should propagate an error from the persistence dependency', async () => {
          const failure = new Error('update failed');
          stubUpdateState(undefined, failure);
          await assert.rejects(
            updateLessonState('lesson-run-1', state => state),
            error => error === failure,
          );
        });
      });
    });
  });
});
