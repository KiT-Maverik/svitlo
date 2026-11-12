import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { pathToFileURL } from 'node:url';

import { defineMarkdown, markdown_Props_Schema } from './index';

const base = {
  id: 'c2cc84f3-f057-493d-b1b6-1880aad8023b',
  slug: 'example',
  type: 'markdown' as const,
  params: {},
};

function withMarkdownFiles(run: (moduleUrl: string, directory: string) => void) {
  const root = mkdtempSync(join(tmpdir(), 'markdown-definition-'));
  const directory = join(root, 'locales');
  mkdirSync(directory);
  try {
    run(pathToFileURL(join(root, 'definition.ts')).href, directory);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

test('Markdown reads locale files beside definition and publishes only their text', () => {
  withMarkdownFiles((moduleUrl, directory) => {
    writeFileSync(join(directory, 'en.md'), '# Hello %_%NAME%_%\n');
    writeFileSync(join(directory, 'uk.md'), '# Привіт %_%NAME%_%\n');

    const markdown = defineMarkdown({
      ...base,
      files: { moduleUrl, languages: ['en', 'uk'] },
      locale: { variables: { NAME: { en: 'Ada', uk: 'Ада' } } },
    });

    assert.deepEqual(markdown.config.base.locale, {});
    assert.deepEqual(markdown.config.locales(), {
      locale: {
        value: { en: '# Hello %_%NAME%_%\n', uk: '# Привіт %_%NAME%_%\n' },
        variables: { NAME: { en: 'Ada', uk: 'Ада' } },
      },
    });
    assert.equal('files' in markdown.config.base, false);
    assert.equal(
      markdown_Props_Schema.safeParse({
        ...base,
        locale: { value: 'Привіт %_%NAME%_%', variables: { NAME: 'Ада' } },
      }).success,
      true,
    );
  });
});

test('Markdown file mode rejects missing, empty, duplicate, and unexpected language files', () => {
  withMarkdownFiles((moduleUrl, directory) => {
    writeFileSync(join(directory, 'en.md'), 'Hello');
    const withFiles = (languages: readonly ('en' | 'uk')[]) =>
      defineMarkdown({
        ...base,
        files: { moduleUrl, languages },
      });

    assert.throws(() => withFiles(['en', 'uk']), /Missing or unreadable Markdown locale file: .*uk\.md/);
    writeFileSync(join(directory, 'uk.md'), ' \n ');
    assert.throws(() => withFiles(['en', 'uk']), /Empty Markdown locale file: .*uk\.md/);
    writeFileSync(join(directory, 'uk.md'), 'Привіт');
    assert.throws(() => withFiles(['en', 'en']), /without duplicates/);
    assert.throws(() => withFiles([]), /non-empty/);
    writeFileSync(join(directory, 'fr.md'), 'Bonjour');
    assert.throws(() => withFiles(['en', 'uk']), /Unexpected Markdown locale files: fr\.md/);
  });
});

test('Markdown requires every declared variable in every locale', () => {
  const locale = {
    value: { en: '# %_%NAME%_%', uk: '# %_%NAME%_%' },
    variables: { NAME: { en: 'Ada', uk: 'Ада' } },
  };
  const markdown = defineMarkdown({ ...base, locale });
  assert.doesNotThrow(() => markdown.config.validate({ ...base, locale }));
  assert.throws(
    () => markdown.config.validate({ ...base, locale: { ...locale, value: { en: '# %_%NAME%_%', uk: '# Вітаю' } } }),
    /locale\.value\.uk: missing configured variable "NAME"/,
  );
  assert.throws(
    () =>
      markdown.config.validate({ ...base, locale: { ...locale, value: { en: '# %_%OTHER%_%', uk: '# %_%NAME%_%' } } }),
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
  const markdown = defineMarkdown({
    ...base,
    locale: {
      value: 'Hello %_%NAME%_%',
      variables: { NAME: { en: 'Ada', uk: 'Ада' } },
    },
  });
  const before = markdown.build.props();
  const patch = markdown.build.overrides({ locale: { value: { uk: 'Вітаю %_%NAME%_%' } } });
  assert.deepEqual(patch, { base: {}, locale: { uk: { locale: { value: 'Вітаю %_%NAME%_%' } } } });
  assert.deepEqual(markdown.build.props(), before);
  assert.throws(
    () => markdown.build.overrides({ locale: { value: { uk: 'Вітаю' } } }),
    /missing configured variable "NAME"/,
  );
  assert.throws(
    () => markdown.build.overrides({ locale: { variables: { NAME: { uk: 'Ада' } }, value: { uk: '%_%UNKNOWN%_%' } } }),
    /variable "UNKNOWN" is not declared/,
  );
});

test('Markdown rejects malformed placeholders, unused variables and undeclared placeholders', () => {
  const variables = { NAME: 'Ada' };
  for (const value of ['%_%NAME', '%_%name%_%', '%_%id: name; value: Ada%_%']) {
    assert.throws(
      () => defineMarkdown({ ...base, locale: { value, variables } }),
      /Markdown variables validation failed/,
    );
  }
  assert.throws(
    () => defineMarkdown({ ...base, locale: { value: 'Hello', variables } }),
    /missing configured variable "NAME"/,
  );
  assert.throws(
    () => defineMarkdown({ ...base, locale: { value: '%_%UNKNOWN%_%' } }),
    /variable "UNKNOWN" is not declared/,
  );
  assert.doesNotThrow(() =>
    defineMarkdown({
      ...base,
      locale: { value: { en: '%_%NAME%_% %_%NAME%_%', uk: '%_%NAME%_%' }, variables },
    }),
  );
});
