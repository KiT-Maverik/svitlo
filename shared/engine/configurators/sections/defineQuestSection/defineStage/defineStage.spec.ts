import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { fixture } from '../quest.fixture';

const languages = { languages: ['uk'] as const };

describe('Configurators > Sections > defineStage', () => {
  test('publishes mandatory media variants with null silent tracks and localized presentation', () => {
    const { stage } = fixture();
    const publication = stage.build.props(languages);
    assert.equal(publication.base.type, 'questStage');
    const content = publication.base.content as { video: Record<string, unknown>; audio: Record<string, unknown> };
    assert.deepEqual(Object.keys(content.video).sort(), ['medium', 'small']);
    assert.equal(content.audio.dialogue, null);
    assert.equal(content.audio.background, null);
    assert.ok(publication.locale?.uk);
  });

  test('rejects incomplete media and validates localized overrides without changing original', () => {
    const { stage } = fixture();
    const original = JSON.stringify(stage.build.props(languages));
    assert.throws(() =>
      stage.validate({
        id: stage.id,
        slug: stage.slug,
        type: 'questStage',
        content: { ...stage.content, video: { medium: stage.content.video.medium } },
      } as never),
    );
    const patch = stage.build.overrides(
      { content: { video: { small: { locale: { label: { uk: 'Зменшене відео' } } } } } },
      languages,
    );
    assert.ok(patch.locale?.uk);
    assert.equal(JSON.stringify(stage.build.props(languages)), original);
  });
});
