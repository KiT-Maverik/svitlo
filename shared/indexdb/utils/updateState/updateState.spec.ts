import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { installIndexedDbFixture } from '../__tests__/indexedDbFixture';
import { updateState } from './updateState.utils';

interface ExampleState {
  id: string;
  score: number;
}

function parseState(value: unknown): ExampleState {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('id' in value) ||
    typeof value.id !== 'string' ||
    !('score' in value) ||
    typeof value.score !== 'number' ||
    !Number.isFinite(value.score)
  ) {
    throw new Error('Invalid state');
  }
  return { id: value.id, score: value.score };
}

describe('DB', () => {
  describe('Utils', () => {
    describe('updateState', () => {
      it('should read the requested record with a readwrite transaction', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = updateState('lessonStates', 'lesson-1', parseState, current => ({
          ...current,
          score: current.score + 5,
        }));

        fixture.succeedOpen();
        await Promise.resolve();
        assert.deepEqual(fixture.transactions, [{ name: 'lessonStates', mode: 'readwrite' }]);
        assert.deepEqual(fixture.selectedStores, ['lessonStates']);
        assert.deepEqual(fixture.reads, ['lesson-1']);
        fixture.readRequest.succeed({ id: 'lesson-1', score: 10 });
        assert.deepEqual(fixture.writes, [{ id: 'lesson-1', score: 15 }]);
        fixture.complete();

        assert.deepEqual(await result, { id: 'lesson-1', score: 15 });
        assert.equal(fixture.closeCount, 1);
      });

      it('should validate both the stored value and the changed value', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const seen: unknown[] = [];
        const parse = (value: unknown) => {
          seen.push(value);
          return parseState(value);
        };
        const result = updateState('quizStates', 'quiz-1', parse, current => ({
          ...current,
          score: current.score + 1,
        }));

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.readRequest.succeed({ id: 'quiz-1', score: 2, extra: 'ignored' });
        fixture.complete();

        assert.deepEqual(seen, [
          { id: 'quiz-1', score: 2, extra: 'ignored' },
          { id: 'quiz-1', score: 3 },
        ]);
        assert.deepEqual(await result, { id: 'quiz-1', score: 3 });
        assert.deepEqual(fixture.writes, [{ id: 'quiz-1', score: 3 }]);
      });

      it('should resolve undefined without writing or calling callbacks when the record does not exist', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        let called = false;
        const result = updateState(
          'lessonStates',
          'missing',
          () => {
            called = true;
            throw new Error('parse should not run');
          },
          () => {
            called = true;
            throw new Error('change should not run');
          },
        );

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.readRequest.succeed(undefined);
        fixture.complete();

        assert.equal(await result, undefined);
        assert.equal(called, false);
        assert.deepEqual(fixture.writes, []);
        assert.equal(fixture.closeCount, 1);
      });

      it('should reject and abort when the stored record cannot be parsed', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = updateState('lessonStates', 'bad', parseState, current => current);

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.readRequest.succeed({ id: 'bad', score: 'not-a-number' });
        assert.equal(fixture.abortCount, 1);
        assert.deepEqual(fixture.writes, []);
        fixture.abort();

        await assert.rejects(result, /Invalid state/);
        assert.equal(fixture.closeCount, 1);
      });

      it('should reject and abort when the change callback throws', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new Error('Cannot update score');
        const result = updateState('lessonStates', 'a', parseState, () => {
          throw failure;
        });

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.readRequest.succeed({ id: 'a', score: 1 });
        assert.equal(fixture.abortCount, 1);
        fixture.abort();

        await assert.rejects(result, (error: unknown) => error === failure);
        assert.deepEqual(fixture.writes, []);
        assert.equal(fixture.closeCount, 1);
      });

      it('should reject and abort when the changed value fails validation', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = updateState('quizStates', 'a', parseState, current => ({
          ...current,
          score: Number.POSITIVE_INFINITY,
        }));

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.readRequest.succeed({ id: 'a', score: 1 });
        assert.equal(fixture.abortCount, 1);
        fixture.abort();

        await assert.rejects(result, /Invalid state/);
        assert.deepEqual(fixture.writes, []);
      });

      it('should forbid changing the record ID and avoid writing it', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = updateState('lessonStates', 'original', parseState, current => ({
          ...current,
          id: 'different',
        }));

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.readRequest.succeed({ id: 'original', score: 1 });
        assert.equal(fixture.abortCount, 1);
        fixture.abort();

        await assert.rejects(result, /A state update cannot change its ID/);
        assert.deepEqual(fixture.writes, []);
      });

      it('should reject and abort when the object store cannot write the valid result', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new Error('Failed to enqueue put');
        fixture.throwOnPut(failure);
        const result = updateState('lessonStates', 'a', parseState, current => ({
          ...current,
          score: 2,
        }));

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.readRequest.succeed({ id: 'a', score: 1 });
        assert.equal(fixture.abortCount, 1);
        fixture.abort();

        await assert.rejects(result, (error: unknown) => error === failure);
        assert.equal(fixture.closeCount, 1);
      });

      it('should propagate a transaction abort error when no callback failed', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new DOMException('Transaction aborted', 'AbortError');
        const result = updateState('lessonStates', 'a', parseState, current => current);

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.abort(failure);

        await assert.rejects(result, (error: unknown) => error === failure);
        assert.equal(fixture.closeCount, 1);
      });

      it('should fall back to the request error on transaction abort', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new DOMException('Read failed', 'UnknownError');
        const result = updateState('lessonStates', 'a', parseState, current => current);

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.readRequest.fail(failure);
        fixture.abort();

        await assert.rejects(result, (error: unknown) => error === failure);
        assert.equal(fixture.closeCount, 1);
      });

      it('should report an explicit fallback when a transaction abort has no error', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = updateState('lessonStates', 'a', parseState, current => current);

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.abort();

        await assert.rejects(result, /IndexedDB transaction was aborted/);
        assert.equal(fixture.closeCount, 1);
      });

      it('should reject with the transaction failure and close the database', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new DOMException('Transaction failed', 'UnknownError');
        const result = updateState('quizStates', 'a', parseState, current => current);

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.error(failure);

        await assert.rejects(result, (error: unknown) => error === failure);
        assert.equal(fixture.closeCount, 1);
      });

      it('should report an explicit fallback when a transaction fails without a reported error', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = updateState('lessonStates', 'a', parseState, current => current);

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.error();

        await assert.rejects(result, /IndexedDB transaction failed/);
        assert.equal(fixture.closeCount, 1);
      });

      it('should propagate database-open failures without creating a transaction', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new DOMException('Cannot open', 'UnknownError');
        const result = updateState('lessonStates', 'a', parseState, current => current);

        fixture.failOpen(failure);
        await assert.rejects(result, (error: unknown) => error === failure);
        assert.deepEqual(fixture.transactions, []);
      });
    });
  });
});
