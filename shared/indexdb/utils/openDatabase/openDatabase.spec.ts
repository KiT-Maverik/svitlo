import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DATABASE_NAME, DATABASE_VERSION } from '../databaseConfig/databaseConfig.utils';
import { installIndexedDbFixture } from '../__tests__/indexedDbFixture';
import { openDatabase } from './openDatabase.utils';

describe('DB', () => {
  describe('Utils', () => {
    describe('openDatabase', () => {
      it('should reject when IndexedDB is not available', async t => {
        const previous = Object.getOwnPropertyDescriptor(globalThis, 'indexedDB');
        Reflect.deleteProperty(globalThis, 'indexedDB');
        t.after(() => {
          if (previous) Object.defineProperty(globalThis, 'indexedDB', previous);
          else Reflect.deleteProperty(globalThis, 'indexedDB');
        });

        await assert.rejects(openDatabase(), /IndexedDB is unavailable/);
      });

      it('should open the configured database version and resolve its connection on success', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = openDatabase();

        assert.deepEqual(fixture.openCalls, [{ name: DATABASE_NAME, version: DATABASE_VERSION }]);
        fixture.succeedOpen();

        assert.equal(await result, fixture.database);
        assert.equal(fixture.closeCount, 0);
      });

      it('should create both keyed stores and their indexes during a fresh database upgrade', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = openDatabase();

        fixture.upgrade();
        assert.deepEqual(fixture.createdStores, [
          { name: 'lessonStates', keyPath: 'id' },
          { name: 'quizStates', keyPath: 'id' },
        ]);
        assert.deepEqual(fixture.createdIndexes, [
          { store: 'lessonStates', name: 'lessonId', keyPath: 'lessonId' },
          { store: 'quizStates', name: 'quizId', keyPath: 'quizId' },
        ]);
        fixture.succeedOpen();
        await result;
      });

      it('should only create missing stores when upgrading an existing database', async t => {
        const fixture = installIndexedDbFixture(['lessonStates']);
        t.after(fixture.restore);
        const result = openDatabase();

        fixture.upgrade();
        assert.deepEqual(fixture.createdStores, [{ name: 'quizStates', keyPath: 'id' }]);
        assert.deepEqual(fixture.createdIndexes, [{ store: 'quizStates', name: 'quizId', keyPath: 'quizId' }]);
        fixture.succeedOpen();
        await result;
      });

      it('should preserve existing stores when no schema changes are needed', async t => {
        const fixture = installIndexedDbFixture(['lessonStates', 'quizStates']);
        t.after(fixture.restore);
        const result = openDatabase();

        fixture.upgrade();
        assert.deepEqual(fixture.createdStores, []);
        assert.deepEqual(fixture.createdIndexes, []);
        fixture.succeedOpen();
        await result;
      });

      it('should propagate the original error when opening fails', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const failure = new DOMException('Opening blocked', 'UnknownError');
        const result = openDatabase();

        fixture.failOpen(failure);
        await assert.rejects(result, (error: unknown) => error === failure);
      });

      it('should close the connection when the database version changes', async t => {
        const fixture = installIndexedDbFixture();
        t.after(fixture.restore);
        const result = openDatabase();

        fixture.succeedOpen();
        await result;
        fixture.versionChange();

        assert.equal(fixture.closeCount, 1);
      });
    });
  });
});
