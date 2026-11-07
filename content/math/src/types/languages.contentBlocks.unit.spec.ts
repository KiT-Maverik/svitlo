import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { learningLayout as layouts } from '../../../../shared/ui-kit/data/locale/learningLayout';
import { navbarPreferences as preferences } from '../../../../shared/ui-kit/data/locale/navbarPreferences';

const root = process.cwd();
const newLanguages = ['lt', 'lv', 'et', 'be', 'ka', 'kk'] as const;
const newLocales = ['lt-LT', 'lv-LV', 'et-EE', 'be-tarask', 'ka-GE', 'kk-Cyrl-KZ'] as const;

function collectFiles(folder: string): string[] {
  return readdirSync(folder, { withFileTypes: true }).flatMap(entry => {
    const path = join(folder, entry.name);
    return entry.isDirectory() ? collectFiles(path) : [path];
  });
}

function countLanguageEntries(source: string, language: string): number {
  return [...source.matchAll(new RegExp(`(?:^|\\s)["']?${language}["']?\\s*:`, 'gm'))].length;
}

describe('Extended locale contentBlock coverage', () => {
  it('registers each extended locale with its intended language code', () => {
    for (let index = 0; index < newLocales.length; index++) {
      expect(DEFAULT_SUPPORTED_LANGUAGES.find(item => item.locale === newLocales[index])?.language).toBe(
        newLanguages[index],
      );
    }
  });

  it('includes six translations in every authored math taxonomy config', () => {
    const files = collectFiles(join(root, 'data/skills')).filter(
      file => file.endsWith('.data.ts') && !file.endsWith('index.data.ts'),
    );
    // Locale coverage follows the authored Code inventory. The number of Skills
    // changes during approved taxonomy reviews, so a fixed total is not a
    // localization requirement; the taxonomy-specific tests own that invariant.
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const source = readFileSync(file, 'utf8');
      for (const language of newLanguages) {
        expect(countLanguageEntries(source, language), `${file}: missing ${language}`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('supports the Crimean Tatar learner interface without locale fallback', () => {
    const locale = 'crh-Latn-UA';
    expect(DEFAULT_SUPPORTED_LANGUAGES.find(item => item.locale === locale)?.language).toBe('qm');
    expect(layouts.qm.navigation.top).toBe('Oquvnıñ yuqarı navigatsiyası');
    expect(preferences.qm.language).toBe('İnterfeys tili');
  });

  it('provides locale dictionaries for the shared learner interface', () => {
    for (const language of newLanguages) expect(layouts[language].brand).toBeTruthy();
    for (const language of newLanguages) {
      const messages = preferences[language];
      expect(messages.language).toBeTruthy();
      expect(messages.theme.dark).toBeTruthy();
      expect(messages.theme.light).toBeTruthy();
    }
  });
});
