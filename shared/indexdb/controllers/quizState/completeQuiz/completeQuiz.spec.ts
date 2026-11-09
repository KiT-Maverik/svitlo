import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { afterEach, describe, it, mock } from 'node:test';
import type { QuizResult, QuizState } from '@svitlo/contracts/content';
import { completeQuiz } from './completeQuiz.controller';
import { quizInProgress, quizNew } from '../../testUtils/controllerTestDoubles';

const nodeRequire = createRequire(__filename);
const updateModule = nodeRequire(
  '../updateQuizState/updateQuizState.controller',
) as typeof import('../updateQuizState/updateQuizState.controller');

describe('DB', () => {
  describe('Controllers', () => {
    describe('CompleteQuiz', () => {
      afterEach(() => mock.restoreAll());
      describe('Completion', () => {
        it('should finish an in-progress quiz while preserving its answers and start time', async () => {
          const result: QuizResult = { status: 'graded', success: true, value: 85 };
          const original = structuredClone(quizInProgress);
          const update = mock.method(
            updateModule,
            'updateQuizState',
            async (id: QuizState['id'], change: (current: QuizState) => QuizState) => {
              assert.equal(id, 'quiz-run-1');
              return change(quizInProgress);
            },
          );
          const finished = await completeQuiz('quiz-run-1', result);
          assert.equal(finished?.status, 'finished');
          if (finished?.status !== 'finished') throw new Error('Expected a finished quiz');
          assert.deepEqual(finished.result, result);
          assert.deepEqual(finished.answers, original.answers);
          assert.equal(finished.startedAt, original.startedAt);
          assert.match(finished.completedAt, /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/);
          assert.ok(Number.isFinite(Date.parse(finished.completedAt)));
          assert.deepEqual(quizInProgress, original);
          assert.equal(update.mock.callCount(), 1);
        });
        it('should preserve an ungraded result on completion', async () => {
          const ungraded: QuizResult = { status: 'ungraded' };
          mock.method(
            updateModule,
            'updateQuizState',
            async (_id: QuizState['id'], change: (current: QuizState) => QuizState) => change(quizInProgress),
          );
          const completed = await completeQuiz('quiz-run-1', ungraded);
          assert.equal(completed?.status, 'finished');
          if (completed?.status !== 'finished') throw new Error('Expected a finished quiz');
          assert.deepEqual(completed.result, ungraded);
        });
        it('should return undefined when the requested quiz run is missing', async () => {
          mock.method(updateModule, 'updateQuizState', async () => undefined);
          assert.equal(await completeQuiz('missing', { status: 'ungraded' }), undefined);
        });
      });
      describe('Invalid transitions', () => {
        it('should reject completion of a new quiz run', async () => {
          mock.method(
            updateModule,
            'updateQuizState',
            async (_id: QuizState['id'], change: (current: QuizState) => QuizState) => change(quizNew),
          );
          await assert.rejects(
            completeQuiz('quiz-run-1', { status: 'ungraded' }),
            /Only an in-progress quiz can be completed/,
          );
        });
        it('should reject completion of an already finished quiz run', async () => {
          const finished: QuizState = {
            ...quizInProgress,
            status: 'finished',
            completedAt: '2026-01-01T11:00:00.000Z',
            result: { status: 'ungraded' },
          };
          mock.method(
            updateModule,
            'updateQuizState',
            async (_id: QuizState['id'], change: (current: QuizState) => QuizState) => change(finished),
          );
          await assert.rejects(
            completeQuiz('quiz-run-1', { status: 'ungraded' }),
            /Only an in-progress quiz can be completed/,
          );
        });
      });
      describe('Failures', () => {
        it('should propagate a rejected persistence update', async () => {
          const failure = new Error('update failed');
          mock.method(updateModule, 'updateQuizState', async () => {
            throw failure;
          });
          await assert.rejects(completeQuiz('quiz-run-1', { status: 'ungraded' }), error => error === failure);
        });
      });
    });
  });
});
