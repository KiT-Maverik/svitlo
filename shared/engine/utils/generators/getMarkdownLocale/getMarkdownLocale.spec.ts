import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { pathToFileURL } from 'node:url';
import { DEFAULT_SUPPORTED_LANGUAGES } from '../../../types/languages';
import { getMarkdownLocale } from './getMarkdownLocale.util';

function withLocaleDirectory(run: (directory: string) => void): void {
  const directory = mkdtempSync(join(tmpdir(), 'svitlo-markdown-locale-'));
  try {
    run(directory);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

describe('getMarkdownLocale', () => {
  it('reads every default language and preserves Markdown content', () => {
    withLocaleDirectory(directory => {
      for (const { language } of DEFAULT_SUPPORTED_LANGUAGES) {
        writeFileSync(join(directory, `${language}.md`), `# ${language}\n`);
      }

      const result = getMarkdownLocale(directory);

      assert.deepEqual(
        Object.keys(result),
        DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language),
      );
      assert.equal(result.en, '# en\n');
      assert.equal(result.qm, '# qm\n');
    });
  });

  it('reads only requested languages from a directory URL', () => {
    withLocaleDirectory(directory => {
      writeFileSync(join(directory, 'uk.md'), 'Український текст');
      writeFileSync(join(directory, 'en.md'), 'English text');

      const result = getMarkdownLocale(pathToFileURL(directory), ['uk', 'en'] as const);

      assert.deepEqual(result, { uk: 'Український текст', en: 'English text' });
    });
  });

  it('fails when a requested language file is missing', () => {
    withLocaleDirectory(directory => {
      writeFileSync(join(directory, 'en.md'), 'English text');

      assert.throws(
        () => getMarkdownLocale(directory, ['en', 'uk']),
        error => {
          assert.ok(error instanceof Error);
          assert.match(error.message, /Missing Markdown locale file: .*uk\.md/);
          assert.ok(error.cause);
          return true;
        },
      );
    });
  });

  it('fails when a requested language file has no content', () => {
    withLocaleDirectory(directory => {
      writeFileSync(join(directory, 'en.md'), ' \n\t ');

      assert.throws(() => getMarkdownLocale(directory, ['en']), /Empty Markdown locale file: .*en\.md/);
    });
  });

  it('returns an empty mapping when no languages are requested', () => {
    withLocaleDirectory(directory => {
      assert.deepEqual(getMarkdownLocale(directory, []), {});
    });
  });
});
