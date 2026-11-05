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

const additionalLocales = ['lt-LT', 'lv-LV', 'et-EE', 'be-tarask', 'ka-GE', 'kk-Cyrl-KZ', 'crh-Latn-UA'] as const;
const languages = ['lt', 'lv', 'et', 'be', 'ka', 'kk', 'qm'] as const;

const layouts = { 'lt-LT': ltLayout, 'lv-LV': lvLayout, 'et-EE': etLayout, 'be-tarask': beLayout, 'ka-GE': kaLayout, 'kk-Cyrl-KZ': kkLayout, 'crh-Latn-UA': qmLayout };
const root = process.cwd();
const lessonRoot = join(root, 'data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c');
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
  it('includes extended-language values in authored lesson and checkpoint content', () => {
    const files = [
      'howLightMoves.data.ts',
      'sections/theory/theory.ts',
      'sections/theory/checkpoints/checkpoint.ts',
    ];
    for (const file of files) {
      const source = readFileSync(join(lessonRoot, file), 'utf8');
      for (const language of newLanguages) {
        expect(countLanguageEntries(source, language), `${file}: missing ${language}`).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it('provides all three theory Markdown blocks in each supported extended language', () => {
    const folder = join(lessonRoot, 'sections/theory/markdown');
    for (const section of ['p1', 'p2', 'p3']) {
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
    for (const locale of additionalLocales) expect(layouts[locale].brand).toBeTruthy();
  });
});
