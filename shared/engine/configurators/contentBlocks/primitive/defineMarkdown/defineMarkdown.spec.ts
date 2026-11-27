import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test, { describe } from 'node:test';
import { pathToFileURL } from 'node:url';

import { defineMarkdown, markdown_Data_Schema, readMarkdown } from './index';

describe('Configurators', () => {
  describe('ContentBlocks', () => {
    describe('defineMarkdown', () => {
      const base = {
        id: 'c2cc84f3-f057-493d-b1b6-1880aad8023b',
        slug: 'example' as const,
        type: 'markdown' as const,
        params: {},
      };

      function withMarkdownFiles(run: (moduleUrl: string, directory: string) => void) {
        const root = mkdtempSync(join(tmpdir(), 'markdown-definition-'));
        const directory = root;
        try {
          run(pathToFileURL(join(root, 'definition.ts')).href, directory);
        } finally {
          rmSync(root, { recursive: true, force: true });
        }
      }

      test('readMarkdown loads colocated language files and preserves Config/Props content', () => {
        withMarkdownFiles((moduleUrl, directory) => {
          writeFileSync(join(directory, 'en.md'), '# Hello %_%NAME%_%\n');
          writeFileSync(join(directory, 'uk.md'), '# Привіт %_%NAME%_%\n');

          const value = readMarkdown(moduleUrl, ['en', 'uk'] as const);
          assert.deepEqual(value, { en: '# Hello %_%NAME%_%\n', uk: '# Привіт %_%NAME%_%\n' });
          const markdown = defineMarkdown<'example', ['en', 'uk']>({
            ...base,
            locale: { value, variables: { NAME: { en: 'Ada', uk: 'Ада' } } },
          });
          assert.deepEqual(markdown.config.base.locale, {});
          assert.deepEqual(markdown.config.locales(), {
            locale: {
              value,
              variables: { NAME: { en: 'Ada', uk: 'Ада' } },
            },
          });
          assert.equal(
            markdown_Data_Schema.safeParse({
              ...base,
              locale: { value: 'Привіт %_%NAME%_%', variables: { NAME: 'Ада' } },
            }).success,
            true,
          );
          assert.deepEqual(markdown.build.data({ languages: ['uk'] }).locale, {
            uk: { locale: { value: '# Привіт %_%NAME%_%\n', variables: { NAME: 'Ада' } } },
          });
        });
      });

      test('readMarkdown rejects missing, empty, repeated, invalid and non-regular language files', () => {
        withMarkdownFiles((moduleUrl, directory) => {
          writeFileSync(join(directory, 'en.md'), 'Hello');
          assert.throws(() => readMarkdown(moduleUrl, ['en', 'uk']), /Missing or invalid Markdown file: .*uk\.md/);
          writeFileSync(join(directory, 'uk.md'), ' \n ');
          assert.throws(() => readMarkdown(moduleUrl, ['en', 'uk']), /Empty Markdown file: .*uk\.md/);
          writeFileSync(join(directory, 'uk.md'), 'Привіт');
          assert.throws(() => readMarkdown(moduleUrl, ['en', 'en']), /without duplicates/);
          assert.throws(() => readMarkdown(moduleUrl, [] as unknown as ['en']), /non-empty/);
          assert.throws(() => readMarkdown(moduleUrl, ['../unsafe' as 'en']), /Invalid Markdown language code/);
          mkdirSync(join(directory, 'fr.md'));
          assert.throws(() => readMarkdown(moduleUrl, ['fr']), /Missing or invalid Markdown file: .*fr\.md/);
          assert.deepEqual(readMarkdown(moduleUrl, ['en', 'uk']), { en: 'Hello', uk: 'Привіт' });
        });
      });

      test('readMarkdown resolves invariant markdown.md without a default locale', () => {
        withMarkdownFiles((moduleUrl, directory) => {
          writeFileSync(join(directory, 'markdown.md'), '# 2 + 3 = 5\n');
          const markdown = defineMarkdown<'example', ['en', 'uk']>({
            ...base,
            locale: { value: readMarkdown(moduleUrl) },
          });
          assert.equal(markdown.config.base.locale?.value, '# 2 + 3 = 5\n');
          assert.deepEqual(markdown.config.locales(), { locale: {} });
          assert.equal(markdown.build.data({ languages: ['en', 'uk'] }).base.locale?.value, '# 2 + 3 = 5\n');
          assert.equal(markdown.build.data({ languages: ['en', 'uk'] }).locale, undefined);
        });
      });

      test('readMarkdown rejects missing or empty markdown.md without fallback', () => {
        withMarkdownFiles((moduleUrl, directory) => {
          assert.throws(() => readMarkdown(moduleUrl), /Missing or invalid Markdown file: .*markdown\.md/);
          writeFileSync(join(directory, 'markdown.md'), '  \n ');
          assert.throws(() => readMarkdown(moduleUrl), /Empty Markdown file: .*markdown\.md/);
        });
      });

      test('Markdown requires every declared variable in every locale', () => {
        const locale = {
          value: { en: '# %_%NAME%_%', uk: '# %_%NAME%_%' },
          variables: { NAME: { en: 'Ada', uk: 'Ада' } },
        };
        const markdown = defineMarkdown<'example', ['en', 'uk']>({ ...base, locale });
        assert.doesNotThrow(() => markdown.config.validate({ ...base, locale }));
        assert.throws(
          () =>
            markdown.config.validate({ ...base, locale: { ...locale, value: { en: '# %_%NAME%_%', uk: '# Вітаю' } } }),
          /locale\.value\.uk: missing configured variable "NAME"/,
        );
        assert.throws(
          () =>
            markdown.config.validate({
              ...base,
              locale: { ...locale, value: { en: '# %_%OTHER%_%', uk: '# %_%NAME%_%' } },
            }),
          /locale\.value\.en: variable "OTHER" is not declared/,
        );
        assert.throws(
          () => markdown.config.validate({ ...base, locale: { ...locale, variables: { NAME: { en: 'Ada' } } } }),
          /locale\.variables\.NAME: missing replacement for "uk"/,
        );
        assert.throws(
          () =>
            markdown.config.validate({
              ...base,
              locale: { ...locale, variables: { NAME: { en: 'Ada', uk: 'Ада', fr: 'Ada' } } },
            }),
          /locale\.variables\.NAME: unexpected replacement locale "fr"/,
        );
      });

      test('Markdown accepts a sparse localized source override with originally invariant text and multilingual variables', () => {
        const markdown = defineMarkdown<'example', ['en', 'uk']>({
          ...base,
          locale: {
            value: 'Hello %_%NAME%_%',
            variables: { NAME: { en: 'Ada', uk: 'Ада' } },
          },
        });
        const before = markdown.build.data({ languages: ['en', 'uk'] });
        const patch = markdown.build.overrides(
          { locale: { value: { uk: 'Вітаю %_%NAME%_%' } } },
          { languages: ['en', 'uk'] },
        );
        assert.deepEqual(patch, { base: {}, locale: { uk: { locale: { value: 'Вітаю %_%NAME%_%' } } } });
        assert.deepEqual(markdown.build.data({ languages: ['en', 'uk'] }), before);
        assert.throws(
          () => markdown.build.overrides({ locale: { value: { uk: 'Вітаю' } } }, { languages: ['en', 'uk'] }),
          /missing configured variable "NAME"/,
        );
        assert.throws(
          () =>
            markdown.build.overrides(
              { locale: { variables: { NAME: { uk: 'Ада' } }, value: { uk: '%_%UNKNOWN%_%' } } },
              { languages: ['en', 'uk'] },
            ),
          /variable "UNKNOWN" is not declared/,
        );
      });

      test('Markdown rejects malformed placeholders, unused variables and undeclared placeholders', () => {
        const variables = { NAME: 'Ada' };
        for (const value of ['%_%NAME', '%_%name%_%', '%_%id: name; value: Ada%_%']) {
          assert.throws(
            () => defineMarkdown({ ...base, locale: { value, variables } }).build.data({ languages: ['en'] }),
            /Markdown variables validation failed/,
          );
        }
        assert.throws(
          () => defineMarkdown({ ...base, locale: { value: 'Hello', variables } }).build.data({ languages: ['en'] }),
          /missing configured variable "NAME"/,
        );
        assert.throws(
          () => defineMarkdown({ ...base, locale: { value: '%_%UNKNOWN%_%' } }).build.data({ languages: ['en'] }),
          /variable "UNKNOWN" is not declared/,
        );
        assert.doesNotThrow(() =>
          defineMarkdown<'example', ['en', 'uk']>({
            ...base,
            locale: { value: { en: '%_%NAME%_% %_%NAME%_%', uk: '%_%NAME%_%' }, variables },
          }),
        );
      });
    });
  });
});
