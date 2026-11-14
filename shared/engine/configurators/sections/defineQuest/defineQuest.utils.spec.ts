import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { assertQuestMap } from './defineQuest.utils';
import { fixture } from './defineQuest.fixture';

describe('Configurators > Sections > quest.utils', () => {
  test('rejects missing mandatory start and invalid slug key', () => {
    assert.throws(() => assertQuestMap({}, 'questStage', 'stages'), /start/);
    assert.throws(() => assertQuestMap({ start: fixture().stage, 'bad-slug': fixture().stage }, 'questStage', 'stages'), /Invalid stages key/);
  });
});
