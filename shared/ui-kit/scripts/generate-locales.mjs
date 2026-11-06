/**
 * Build-time only: assemble global UI Kit translations into independent
 * per-locale JSON files for each textbook. UI Kit runtime imports no data/*.ts.
 */
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const dataRoot = join(repoRoot, 'shared/ui-kit/data/locale');
const targetFlag = process.argv.indexOf('--package');
if (targetFlag < 0 || !process.argv[targetFlag + 1]) {
  throw new Error('Usage: node generate-locales.mjs --package content/<textbook>');
}
const target = resolve(repoRoot, process.argv[targetFlag + 1]);
const targetRelative = relative(repoRoot, target);
if (targetRelative.startsWith('..' + sep) || targetRelative === '..' || targetRelative.startsWith(sep)) {
  throw new Error('Target package must be inside this repository');
}
const outputFlag = process.argv.indexOf('--output');
const output =
  outputFlag >= 0 && process.argv[outputFlag + 1]
    ? resolve(repoRoot, process.argv[outputFlag + 1])
    : join(target, 'public/data/ui-kit');
if (!output.startsWith(resolve(repoRoot) + sep)) throw new Error('Output must stay inside the repository');
const { DEFAULT_SUPPORTED_LANGUAGES } = require('@svitlo/contracts/localization');
const tmp = mkdtempSync(join(tmpdir(), 'svitlo-ui-kit-'));

/** Compile authored data into temporary JS modules; never ship this code to the app. */
function loadLocaleIndex() {
  for (const name of readdirSync(dataRoot).filter(name => name.endsWith('.ts'))) {
    const source = readFileSync(join(dataRoot, name), 'utf8');
    const js = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    writeFileSync(join(tmp, name.replace(/\.ts$/, '.js')), js);
  }
  return Object.freeze(require(join(tmp, 'index.js')));
}

function message(dictionaries, component, language) {
  return dictionaries[component]?.[language];
}

function shapeOf(value) {
  if (typeof value === 'string') {
    if (!value.trim()) throw new Error('UI Kit translation contains an empty string');
    return 'string';
  }
  if (value && !Array.isArray(value) && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, v]) => [key, shapeOf(v)]),
    );
  }
  throw new Error('UI Kit message data must contain only string values or nested records');
}
function assertShape(component, reference, data, locale) {
  if (JSON.stringify(shapeOf(data)) !== JSON.stringify(shapeOf(reference))) {
    throw new Error(`Translation shape mismatch in ${component} for ${locale}`);
  }
}

/**
 * Audit authored coverage without consulting message() fallback behavior.
 * --audit prints missing language codes without publishing files.
 * Normal generation requires all canonical component/locale dictionaries.
 */
function auditMissingTranslations(dictionaries, components) {
  const missing = {};
  for (const component of components) {
    const absent = [];
    for (const { language } of DEFAULT_SUPPORTED_LANGUAGES) {
      const value = message(dictionaries, component, language);
      if (!value) absent.push(language);
    }
    if (absent.length) missing[component] = absent;
  }
  return missing;
}

try {
  const whole = loadLocaleIndex();
  const components = Object.keys(whole);
  const missing = auditMissingTranslations(whole, components);
  const missingCount = Object.values(missing).reduce((count, codes) => count + codes.length, 0);
  if (process.argv.includes('--audit')) {
    console.log(
      JSON.stringify(
        {
          languages: DEFAULT_SUPPORTED_LANGUAGES.length,
          componentCount: components.length,
          missing,
          missingCount,
        },
        null,
        2,
      ),
    );
  } else {
    if (missingCount > 0) {
      const details = Object.entries(missing)
        .map(([name, codes]) => name + ': ' + codes.join(', '))
        .join('; ');
      throw new Error('UI Kit translations incomplete (' + missingCount + '): ' + details);
    }
    // Preflight all language/key structures before publishing the first file.
    const defaults = Object.fromEntries(components.map(c => [c, message(whole, c, 'uk')]));
    const published = DEFAULT_SUPPORTED_LANGUAGES.map(({ locale, language }) => {
      const messages = Object.fromEntries(
        components.map(c => {
          const value = message(whole, c, language);
          if (!value) throw new Error(`Missing ${c} translations for ${locale}`);
          assertShape(c, defaults[c], value, locale);
          return [c, value];
        }),
      );
      return { locale, messages };
    });

    mkdirSync(output, { recursive: true });
    for (const { locale, messages } of published) {
      writeFileSync(join(output, locale + '.json'), JSON.stringify(messages, null, 2) + '\n');
    }
    writeFileSync(
      join(output, 'meta.json'),
      JSON.stringify({ scope: 'global', components, locales: published.map(item => item.locale) }, null, 2) + '\n',
    );
    console.log(`Generated ${published.length} global UI Kit locale JSON resources in ${output}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
