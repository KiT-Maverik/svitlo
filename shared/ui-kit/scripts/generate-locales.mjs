/**
 * Build-time only: assemble global UI Kit translations into independent
 * per-locale JSON files for each textbook. UI Kit runtime imports no data/*.ts.
 */
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const dataRoot = join(repoRoot, 'shared/ui-kit/data/components');
const targetFlag = process.argv.indexOf('--package');
if (targetFlag < 0 || !process.argv[targetFlag + 1]) {
  throw new Error('Usage: node generate-locales.mjs --package learningApps/<textbook>');
}
const target = resolve(repoRoot, process.argv[targetFlag + 1]);
const targetRelative = relative(repoRoot, target);
if (targetRelative.startsWith('..' + sep) || targetRelative === '..' || targetRelative.startsWith(sep)) {
  throw new Error('Target package must be inside this repository');
}
const output = join(target, 'public/data/ui-kit');
const { DEFAULT_SUPPORTED_LANGUAGES } = require('@svitlo/contracts/localization');
const tmp = mkdtempSync(join(tmpdir(), 'svitlo-ui-kit-'));
const cache = new Map();

/** Compile authored data into temporary JS modules; never ship this code to the app. */
function readData(component, file) {
  const path = join(dataRoot, component, file);
  if (!existsSync(path)) return undefined;
  if (!cache.has(path)) {
    const source = readFileSync(path, 'utf8');
    const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const temporary = join(tmp, cache.size + '.cjs');
    writeFileSync(temporary, js);
    const authored = require(temporary);
    cache.set(path, authored.data ?? authored.locale);
  }
  return cache.get(path);
}

const whole = Object.freeze({
  lesson: readData('Lesson', 'messages.data.ts'),
  flashcard: readData('Flashcard', 'messages.data.ts'),
  checkpoint: readData('Checkpoint', 'messages.data.ts'),
  audio: readData('Audio', 'messages.data.ts'),
  image: readData('Image', 'messages.data.ts'),
  video: readData('Video', 'messages.data.ts'),
  youtube: readData('Youtube', 'messages.data.ts'),
  questionFrame: readData('QuestionFrame', 'messages.data.ts'),
});

function message(component, locale, language) {
  if (component === 'learningLayout' || component === 'navbarPreferences') {
    const folder = component === 'learningLayout' ? 'LearningLayout' : 'NavbarPreferences';
    // Existing layout/prefs dictionaries cover eight locales; retain their prior
    // Ukrainian copy for other languages until authored translations are added.
    return readData(folder, locale + '.data.ts') ?? readData(folder, 'uk-UA.data.ts');
  }
  const translations = whole[component];
  // Legacy UI used Ukrainian flashcards and English media/question copy for gaps.
  // This compatibility choice happens only at build time, never inside UI widgets.
  // Lesson translations are complete and deliberately have no fallback.
  if (component === 'lesson') return translations[language];
  const fallback = component === 'flashcard' ? 'uk' : 'en';
  return translations[language] ?? translations[fallback];
}

function shapeOf(value) {
  if (typeof value === 'string') return 'string';
  if (value && !Array.isArray(value) && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b))
      .map(([key, v]) => [key, shapeOf(v)]));
  }
  throw new Error('UI Kit message data must contain only string values or nested records');
}
function assertShape(component, reference, data, locale) {
  if (JSON.stringify(shapeOf(data)) !== JSON.stringify(shapeOf(reference))) {
    throw new Error(`Translation shape mismatch in ${component} for ${locale}`);
  }
}

try {
  mkdirSync(output, { recursive: true });
  const components = ['lesson', 'learningLayout', 'navbarPreferences', 'flashcard', 'checkpoint', 'audio', 'image', 'video', 'youtube', 'questionFrame'];
  const defaults = Object.fromEntries(components.map(c => [c, message(c, 'uk-UA', 'uk')]));
  let count = 0;
  for (const { locale, language } of DEFAULT_SUPPORTED_LANGUAGES) {
    const messages = Object.fromEntries(components.map(c => {
      const value = message(c, locale, language);
      if (!value) throw new Error(`Missing ${c} translations for ${locale}`);
      assertShape(c, defaults[c], value, locale);
      return [c, value];
    }));
    writeFileSync(join(output, locale + '.json'), JSON.stringify(messages, null, 2) + '\n');
    count += 1;
  }
  writeFileSync(join(output, 'meta.json'), JSON.stringify({ scope: 'global', components, locales: DEFAULT_SUPPORTED_LANGUAGES.map(l => l.locale) }, null, 2) + '\n');
  console.log(`Generated ${count} global UI Kit locale JSON resources in ${output}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
