import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DATABASE_NAME, DATABASE_VERSION } from './databaseConfig.utils';

describe('DB', () => {
  describe('Utils', () => {
    describe('databaseConfig', () => {
      it('should expose the stable database identity and schema version', () => {
        assert.equal(DATABASE_NAME, 'svitlo-progress');
        assert.equal(DATABASE_VERSION, 1);
      });
    });
  });
});
