import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { fixture } from './quest.fixture';
import { assertQuestMap } from './quest.utils';

describe('Configurators > Sections > quest.utils', () => {
  test('rejects missing mandatory start and invalid slug key', () => {
    assert.throws(() => assertQuestMap({}, 'questStage', 'stages'), /start/);
    assert.throws(
      () => assertQuestMap({ start: fixture().stage, 'bad-slug': fixture().stage }, 'questStage', 'stages'),
      /Invalid stages key/,
    );
  });
});
