import assert from 'node:assert/strict';
import test from 'node:test';

import { defineText } from '#configurators';
import { languageCode_Schema } from '#schemas';

test('Engine directory aliases resolve through compiled package imports', () => {
  assert.equal(languageCode_Schema.safeParse('uk').success, true);
  assert.equal(languageCode_Schema.safeParse('invalid-code').success, false);
  assert.equal(typeof defineText, 'function');
});
