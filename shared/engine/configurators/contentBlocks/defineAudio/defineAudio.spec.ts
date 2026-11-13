import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { defineAudio } from './index';

const id = 'e5235ac2-2c44-4c10-8c48-3c7bad649011';
const scope = { languages: ['uk'] as const };

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineAudio', () => {
      test('publishes only requested translations alongside invariant media', () => {
        const audio = defineAudio({
          id,
          slug: 'sample',
          type: 'audio',
          params: {},
          locale: { fileLocation: 'https://example.org/lesson.mp3', title: { en: 'Listen', uk: 'Слухай' } },
        });
        const resource = audio.build.props(scope);
        assert.equal(resource.base.locale?.fileLocation, 'https://example.org/lesson.mp3');
        assert.deepEqual(resource.locale, { uk: { locale: { title: 'Слухай' } } });
        assert.equal(JSON.stringify(resource).includes('Listen'), false);
      });

      test('publishes sparse overrides without modifying an independent resource', () => {
        const audio = defineAudio({
          id,
          slug: 'sample',
          type: 'audio',
          params: {},
          locale: { fileLocation: 'https://example.org/lesson.mp3', title: { en: 'Listen', uk: 'Слухай' } },
        });
        const before = audio.build.props(scope);
        const patch = audio.build.overrides({ locale: { title: { uk: 'Прослухай' } } }, scope);
        assert.deepEqual(patch, { base: {}, locale: { uk: { locale: { title: 'Прослухай' } } } });
        assert.deepEqual(audio.build.props(scope), before);
        assert.throws(() => audio.build.overrides({ slug: 'renamed' } as never, scope), /Invalid Audio overrides/);
      });
    });
  });
});
