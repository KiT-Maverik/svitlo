import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { fixture } from '../quest.fixture';

const languages = { languages: ['uk'] as const };

describe('Configurators > Sections > defineTask', () => {
  test('publishes one Scene with localized data', () => {
    const { task } = fixture();
    const publication = task.build.props(languages);
    assert.equal(publication.base.type, 'questTask');
    assert.equal((publication.base.scene as { type: string }).type, 'scene');
    assert.ok(publication.locale?.uk);
  });
  test('rejects non-Scene children and invalid patches', () => {
    const { task } = fixture();
    assert.throws(() => task.validate({ id: task.id, slug: task.slug, type: 'questTask', scene: { type: 'video' } } as never));
    assert.throws(() => task.build.overrides({ unknown: 1 } as never, languages), /Invalid QuestTask overrides/);
    const patched = task.build.overrides({ scene: { locale: { value: { uk: 'Спробуй інакше' } } } }, languages);
    assert.equal(JSON.stringify(patched).includes('Спробуй інакше'), true);
  });
});
