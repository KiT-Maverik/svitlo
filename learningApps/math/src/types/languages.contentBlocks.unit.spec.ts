import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { locale as ltLayout } from '../../../../shared/ui-kit/data/components/LearningLayout/lt-LT.data';
import { locale as lvLayout } from '../../../../shared/ui-kit/data/components/LearningLayout/lv-LV.data';
import { locale as etLayout } from '../../../../shared/ui-kit/data/components/LearningLayout/et-EE.data';
import { locale as beLayout } from '../../../../shared/ui-kit/data/components/LearningLayout/be-tarask.data';
import { locale as kaLayout } from '../../../../shared/ui-kit/data/components/LearningLayout/ka-GE.data';
import { locale as kkLayout } from '../../../../shared/ui-kit/data/components/LearningLayout/kk-Cyrl-KZ.data';
import { locale as qmLayout } from '../../../../shared/ui-kit/data/components/LearningLayout/crh-Latn-UA.data';
import { locale as ltPreferences } from '../../../../shared/ui-kit/data/components/NavbarPreferences/lt-LT.data';
import { locale as lvPreferences } from '../../../../shared/ui-kit/data/components/NavbarPreferences/lv-LV.data';
import { locale as etPreferences } from '../../../../shared/ui-kit/data/components/NavbarPreferences/et-EE.data';
import { locale as bePreferences } from '../../../../shared/ui-kit/data/components/NavbarPreferences/be-tarask.data';
import { locale as kaPreferences } from '../../../../shared/ui-kit/data/components/NavbarPreferences/ka-GE.data';
import { locale as kkPreferences } from '../../../../shared/ui-kit/data/components/NavbarPreferences/kk-Cyrl-KZ.data';
import { locale as qmPreferences } from '../../../../shared/ui-kit/data/components/NavbarPreferences/crh-Latn-UA.data';

const root = process.cwd();
const layouts = { 'lt-LT': ltLayout, 'lv-LV': lvLayout, 'et-EE': etLayout, 'be-tarask': beLayout, 'ka-GE': kaLayout, 'kk-Cyrl-KZ': kkLayout, 'crh-Latn-UA': qmLayout };
const preferences = { 'lt-LT': ltPreferences, 'lv-LV': lvPreferences, 'et-EE': etPreferences, 'be-tarask': bePreferences, 'ka-GE': kaPreferences, 'kk-Cyrl-KZ': kkPreferences, 'crh-Latn-UA': qmPreferences };
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
    expect(layouts[locale].navigation.top).toBe('Oquvnıñ yuqarı navigatsiyası');
    expect(preferences[locale].language).toBe('Til');
  });

  it('provides locale dictionaries for the shared learner interface', () => {
    for (const locale of newLocales) expect(layouts[locale].brand).toBeTruthy();
    for (const locale of newLocales) {
      const messages = preferences[locale];
      expect(messages.language).toBeTruthy();
      expect(messages.theme.dark).toBeTruthy();
      expect(messages.theme.light).toBeTruthy();
    }
  });
});
