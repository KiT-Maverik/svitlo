import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { defineYoutube } from './index';

const id = 'e5235ac2-2c44-4c10-8c48-3c7bad649011';
const scope = { languages: ['uk'] as const };

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineYoutube', () => {
      const config = () => ({
        id,
        slug: 'watch',
        type: 'youtube' as const,
        params: { mode: 'link' as const },
        locale: {
          href: 'https://www.youtube.com/watch?v=example',
          label: { en: 'Watch lesson', uk: 'Переглянути урок' },
        },
      });

      test('retains the mode and the requested accessible link label', () => {
        const youtube = defineYoutube(config());
        const resource = youtube.build.props(scope);
        assert.equal(resource.base.params.mode, 'link');
        assert.equal(resource.base.locale?.href, 'https://www.youtube.com/watch?v=example');
        assert.deepEqual(resource.locale, { uk: { locale: { label: 'Переглянути урок' } } });
      });

      test('allows a valid mode override but rejects invalid values', () => {
        const youtube = defineYoutube(config());
        const before = youtube.build.props(scope);
        const patch = youtube.build.overrides({ params: { mode: 'embed' } }, scope);
        assert.deepEqual(patch, { base: { params: { mode: 'embed' } }, locale: undefined });
        assert.throws(
          () => youtube.build.overrides({ params: { mode: 'unknown' as never } }, scope),
          /Invalid Youtube overrides/,
        );
        assert.deepEqual(youtube.build.props(scope), before);
      });
    });
  });
});
