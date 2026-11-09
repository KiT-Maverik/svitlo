import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { installIndexedDbFixture } from '../__tests__/indexedDbFixture';
import { runStateRequest } from './runStateRequest.utils';

describe('DB', () => {
  describe('Utils', () => {
    describe('runStateRequest', () => {
      it('should use the requested store and access mode and resolve only after commit', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const state = { id: 'lesson-1', progress: 25 };
        const result = runStateRequest('lessonStates', 'readonly', store => store.get(state.id));
        let settled = false;
        const observed = result.then(() => {
          settled = true;
        });

        fixture.succeedOpen();
        await Promise.resolve();
        assert.deepEqual(fixture.transactions, [{ name: 'lessonStates', mode: 'readonly' }]);
        assert.deepEqual(fixture.selectedStores, ['lessonStates']);
        assert.deepEqual(fixture.reads, [state.id]);

        fixture.readRequest.succeed(state);
        await Promise.resolve();
        assert.equal(settled, false, 'request success must not resolve before transaction completion');
        fixture.complete();
        assert.deepEqual(await result, state);
        await observed;
        assert.equal(fixture.closeCount, 1);
      });

      it('should support readwrite requests on the quiz state store', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const value = { id: 'quiz-1', completed: true };
        const result = runStateRequest('quizStates', 'readwrite', store => store.put(value));

        fixture.succeedOpen();
        await Promise.resolve();
        assert.deepEqual(fixture.transactions, [{ name: 'quizStates', mode: 'readwrite' }]);
        assert.deepEqual(fixture.selectedStores, ['quizStates']);
        assert.deepEqual(fixture.writes, [value]);
        fixture.writeRequest.succeed('quiz-1');
        fixture.complete();

        assert.equal(await result, 'quiz-1');
        assert.equal(fixture.closeCount, 1);
      });

      it('should preserve undefined when a requested record is missing', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = runStateRequest('lessonStates', 'readonly', store => store.get('missing'));

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.readRequest.succeed(undefined);
        fixture.complete();

        assert.equal(await result, undefined);
        assert.equal(fixture.closeCount, 1);
      });

      it('should reject with the transaction error when a transaction aborts', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new DOMException('Constraint violated', 'ConstraintError');
        const result = runStateRequest('lessonStates', 'readwrite', store => store.put({ id: 'a' }));

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.abort(failure);

        await assert.rejects(result, (error: unknown) => error === failure);
        assert.equal(fixture.closeCount, 1);
      });

      it('should use the request error when an aborted transaction has no error', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new DOMException('Request failed', 'DataError');
        const result = runStateRequest('lessonStates', 'readonly', store => store.get('a'));

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.readRequest.fail(failure);
        fixture.abort();

        await assert.rejects(result, (error: unknown) => error === failure);
        assert.equal(fixture.closeCount, 1);
      });

      it('should supply an abort error when neither the transaction nor the request reports one', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = runStateRequest('lessonStates', 'readonly', store => store.get('a'));

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.abort();

        await assert.rejects(result, /IndexedDB transaction was aborted/);
        assert.equal(fixture.closeCount, 1);
      });

      it('should propagate transaction errors and close the connection', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new DOMException('Commit failed', 'UnknownError');
        const result = runStateRequest('quizStates', 'readwrite', store => store.get('a'));

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.error(failure);

        await assert.rejects(result, (error: unknown) => error === failure);
        assert.equal(fixture.closeCount, 1);
      });

      it('should reject with a fallback error when a transaction fails without a reported error', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = runStateRequest('quizStates', 'readwrite', store => store.get('a'));

        fixture.succeedOpen();
        await Promise.resolve();
        fixture.error();

        await assert.rejects(result, /IndexedDB transaction failed/);
        assert.equal(fixture.closeCount, 1);
      });

      it('should reject synchronous request-factory errors and close the connection', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new Error('Cannot create request');
        const result = runStateRequest('lessonStates', 'readonly', () => {
          throw failure;
        });

        fixture.succeedOpen();
        await assert.rejects(result, (error: unknown) => error === failure);
        assert.equal(fixture.closeCount, 1);
      });

      it('should reject transaction-creation errors and close the connection', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new Error('Unknown store');
        fixture.throwOnTransaction(failure);
        const result = runStateRequest('lessonStates', 'readonly', store => store.get('a'));

        fixture.succeedOpen();
        await assert.rejects(result, (error: unknown) => error === failure);
        assert.equal(fixture.closeCount, 1);
      });

      it('should propagate database-open errors without attempting a transaction', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new DOMException('Database unavailable', 'UnknownError');
        const result = runStateRequest('lessonStates', 'readonly', store => store.get('a'));

        fixture.failOpen(failure);
        await assert.rejects(result, (error: unknown) => error === failure);
        assert.deepEqual(fixture.transactions, []);
      });
    });
  });
});
