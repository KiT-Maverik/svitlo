import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../localization';
import { createLocalizedFileLocations } from '../../localization';

describe('Utils', () => {
  describe('CreateLocalizedFileLocations', () => {
    describe('Locale selection', () => {
      it('should generate a path for every default supported locale', () => {
        const result = createLocalizedFileLocations('/lessons/intro', 'md');
        assert.deepEqual(
          Object.keys(result),
          DEFAULT_SUPPORTED_LANGUAGES.map(({ locale }) => locale),
        );
        assert.equal(result['en-US'], '/lessons/intro/en.md');
        assert.equal(result['uk-UA'], '/lessons/intro/uk.md');
        assert.equal(result['zh-Hans-CN'], '/lessons/intro/zh.md');
        assert.equal(new Set(Object.values(result)).size, DEFAULT_SUPPORTED_LANGUAGES.length);
      });

      it('should restrict the output to only the requested locales', () => {
        assert.deepEqual(
          createLocalizedFileLocations('/dir', '.txt', {
            only: ['uk-UA', 'pl-PL'],
          }),
          {
            'pl-PL': '/dir/pl.txt',
            'uk-UA': '/dir/uk.txt',
          },
        );
      });

      it('should add included locales to an explicit selection', () => {
        assert.deepEqual(
          createLocalizedFileLocations('/dir', 'md', {
            only: ['uk-UA'],
            include: ['en-US'],
          }),
          {
            'en-US': '/dir/en.md',
            'uk-UA': '/dir/uk.md',
          },
        );
      });

      it('should remove excluded locales after applying inclusions', () => {
        assert.deepEqual(
          createLocalizedFileLocations('/dir', 'md', {
            only: ['uk-UA'],
            include: ['en-US'],
            exclude: ['uk-UA'],
          }),
          { 'en-US': '/dir/en.md' },
        );
      });

      it('should remove excluded locales from the default full selection', () => {
        const result = createLocalizedFileLocations('/dir', 'md', { exclude: ['en-US'] });
        assert.equal(Object.hasOwn(result, 'en-US'), false);
        assert.equal(Object.keys(result).length, DEFAULT_SUPPORTED_LANGUAGES.length - 1);
      });

      it('should return an empty mapping when no locales are selected', () => {
        assert.deepEqual(createLocalizedFileLocations('/dir', 'md', { only: [] }), {});
      });

      it('should return entries in the supported language order instead of input order', () => {
        const result = createLocalizedFileLocations('/dir', 'md', {
          only: ['uk-UA', 'en-US', 'pl-PL'],
        });
        assert.deepEqual(Object.keys(result), ['en-US', 'pl-PL', 'uk-UA']);
      });
    });

    describe('Path formatting', () => {
      it('should accept extensions with or without a leading period', () => {
        assert.deepEqual(
          createLocalizedFileLocations('/dir', '.md', { only: ['uk-UA'] }),
          createLocalizedFileLocations('/dir', 'md', { only: ['uk-UA'] }),
        );
      });

      it('should strip every leading period from a supplied extension', () => {
        assert.deepEqual(createLocalizedFileLocations('/dir', '...md', { only: ['uk-UA'] }), {
          'uk-UA': '/dir/uk.md',
        });
      });

      it('should omit the extension when it is empty or only periods', () => {
        assert.deepEqual(createLocalizedFileLocations('/dir', '...', { only: ['uk-UA'] }), {
          'uk-UA': '/dir/uk',
        });
      });

      it('should trim trailing directory slashes before joining the file name', () => {
        assert.deepEqual(createLocalizedFileLocations('/dir///', '.md', { only: ['uk-UA'] }), {
          'uk-UA': '/dir/uk.md',
        });
      });

      it('should preserve relative directories and use language codes only in file names', () => {
        assert.deepEqual(createLocalizedFileLocations('lessons', 'md', { only: ['zh-Hans-CN'] }), {
          'zh-Hans-CN': 'lessons/zh.md',
        });
      });
    });

    describe('Input integrity', () => {
      it('should not mutate locale inclusion and exclusion arrays', () => {
        const only = ['uk-UA', 'pl-PL'] as const;
        const include = ['en-US'] as const;
        const exclude = ['pl-PL'] as const;
        createLocalizedFileLocations('/dir', 'md', { only, include, exclude });
        assert.deepEqual(only, ['uk-UA', 'pl-PL']);
        assert.deepEqual(include, ['en-US']);
        assert.deepEqual(exclude, ['pl-PL']);
      });
    });
  });
});
