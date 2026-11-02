import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { getLearningLayoutMessages } from '@svitlo/ui-kit/learning-layout/locales';

const additionalLocales = ['lt-LT', 'lv-LV', 'et-EE', 'be-tarask', 'ka-GE', 'kk-Cyrl-KZ', 'crh-Latn-UA'] as const;
const languages = ['lt', 'lv', 'et', 'be', 'ka', 'kk', 'qm'] as const;

const root = process.cwd();
const newLanguages = ['lt', 'lv', 'et', 'be', 'ka', 'kk', 'qm'] as const;
function collectFiles(folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    const path = join(folder, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });
}
function countLanguageEntries(source: string, language: string): number {
  return [...source.matchAll(new RegExp(`(?:^|\\s)["']?${language}["']?\\s*:`, 'gm'))].length;
}

describe('Playground internationalization', () => {
  it('includes localized values for every light-lesson text contentBlock', () => {
    const files = collectFiles(join(root, 'src/data/howLightMoves')).filter(file => file.endsWith('.data.ts'));

    for (const file of files) {
      const source = readFileSync(file, 'utf8');
      const contentBlocks = source.split('createTextContentBlock(').length - 1;
      if (!contentBlocks) continue;
      for (const language of newLanguages) {
        expect(countLanguageEntries(source, language), `${file}: missing ${language}`).toBeGreaterThanOrEqual(
          contentBlocks,
        );
      }
    }
  });

  it('provides every new language with each of the three theory Markdown contentBlocks', () => {
    const folder = join(root, 'src/data/howLightMoves/sections/theory/contentBlocks/markdown');
    for (const section of ['01', '02', '03']) {
      for (const language of newLanguages) {
        const source = readFileSync(join(folder, section, `${language}.md`), 'utf8');
        expect(source.trim().length).toBeGreaterThan(40);
      }
    }
  });

  it('registers all extended locales with the correct language codes', () => {
    for (let i = 0; i < additionalLocales.length; i++) {
      expect(DEFAULT_SUPPORTED_LANGUAGES.find(item => item.locale === additionalLocales[i])?.language).toBe(
        languages[i],
      );
    }
  });

  it('resolves reusable layout labels for extended locales', () => {
    for (const locale of additionalLocales) expect(getLearningLayoutMessages(locale).brand).toBeTruthy();
  });
});
