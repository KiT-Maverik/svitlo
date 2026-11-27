import assert from 'node:assert/strict';
import { describe, test } from 'node:test';

import { UNRESOLVED_YOUTUBE_HREF } from '../../../../schemas/media.schemas';
import { defineYoutube } from './index';

const id = 'e5235ac2-2c44-4c10-8c48-3c7bad649011';
const scope = { languages: ['uk'] as const };

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineYoutube', () => {
      const config = () => ({
        id,
        slug: 'watch' as const,
        type: 'youtube' as const,
        params: { mode: 'link' as const },
        locale: {
          href: 'https://www.youtube.com/watch?v=example',
          label: { en: 'Watch lesson', uk: 'Переглянути урок' },
        },
      });

      test('retains the mode and the requested accessible link label', () => {
        const youtube = defineYoutube<'watch', ['en', 'uk']>(config());
        const resource = youtube.build.data(scope);
        assert.equal(resource.base.params.mode, 'link');
        assert.equal(resource.base.locale?.href, 'https://www.youtube.com/watch?v=example');
        assert.deepEqual(resource.locale, { uk: { locale: { label: 'Переглянути урок' } } });
      });

      test('pending href is valid authored structure but cannot publish', () => {
        const pending = defineYoutube<'watch', ['en', 'uk']>({
          ...config(),
          locale: { ...config().locale, href: UNRESOLVED_YOUTUBE_HREF },
        });
        assert.throws(() => pending.build.data(scope), /unresolved video reference/);
        const ready = defineYoutube<'watch', ['en', 'uk']>(config());
        assert.throws(
          () => ready.build.overrides({ locale: { href: UNRESOLVED_YOUTUBE_HREF } }, scope),
          /unresolved video reference/,
        );
      });

      test('draft preview carries the unresolved reference without weakening production', () => {
        const pending = defineYoutube<'watch', ['en', 'uk']>({
          ...config(),
          locale: { ...config().locale, href: UNRESOLVED_YOUTUBE_HREF },
        });
        const preview = pending.build.data({ ...scope, mode: 'draft' });
        assert.equal(preview.base.locale?.href, UNRESOLVED_YOUTUBE_HREF);
        assert.throws(() => pending.build.data(scope), /unresolved video reference/);
        assert.throws(() => pending.build.data({ ...scope, mode: 'production' }), /unresolved video reference/);

        const ready = defineYoutube<'watch', ['en', 'uk']>(config());
        const patch = ready.build.overrides({ locale: { href: UNRESOLVED_YOUTUBE_HREF } }, { ...scope, mode: 'draft' });
        assert.deepEqual(patch.base, { locale: { href: UNRESOLVED_YOUTUBE_HREF } });
        assert.throws(
          () => ready.build.overrides({ locale: { href: UNRESOLVED_YOUTUBE_HREF } }, scope),
          /unresolved video reference/,
        );
        assert.equal(ready.build.data(scope).base.locale?.href, config().locale.href);
      });

      test('allows a valid mode override but rejects invalid values', () => {
        const youtube = defineYoutube<'watch', ['en', 'uk']>(config());
        const before = youtube.build.data(scope);
        const patch = youtube.build.overrides({ params: { mode: 'embed' } }, scope);
        assert.deepEqual(patch, { base: { params: { mode: 'embed' } }, locale: undefined });
        assert.throws(
          () => youtube.build.overrides({ params: { mode: 'unknown' as never } }, scope),
          /Invalid Youtube overrides/,
        );
        assert.deepEqual(youtube.build.data(scope), before);
      });
    });
  });
});
