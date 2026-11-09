/**
 * Build-time only: assemble global UI Kit translations into independent
 * per-locale JSON files for each textbook. UI Kit runtime imports no data/*.ts.
 */
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire, Module } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const dataRoot = join(repoRoot, 'shared/ui-kit/data/locale');
const methodsRoot = join(repoRoot, 'shared/ui-kit/data/definitions/assessmentMethods');
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

/**
 * Resolve authored definitions at build time. Compiled JS is never imported
 * by application code or placed in the published output.
 */
function loadAssessmentMethodDefinitions() {
  const filenames = readdirSync(methodsRoot)
    .filter(name => /^[a-z][A-Za-z0-9]*\.ts$/.test(name) && name !== 'index.ts')
    .sort();
  if (filenames.length !== 16) {
    throw new Error('Expected 16 Assessment Method definitions; found ' + filenames.length);
  }

  return filenames.map(filename => {
    const name = filename.slice(0, -3);
    const filepath = join(methodsRoot, filename);
    const js = ts.transpileModule(readFileSync(filepath, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    }).outputText;
    // Keep the original path for normal workspace dependency resolution.
    const compiled = new Module(filepath);
    compiled.filename = filepath;
    compiled.paths = Module._nodeModulePaths(dirname(filepath));
    compiled._compile(js, filepath);
    const definition = compiled.exports[name];
    if (!definition || Object.keys(compiled.exports).length !== 1) {
      throw new Error('Expected one named Assessment Method export in ' + filename);
    }
    return { name, definition };
  });
}

function createAssessmentMethodResources() {
  const entries = loadAssessmentMethodDefinitions();
  const languages = DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language);
  if (languages.some(language => !/^[a-z]{2}$/.test(language)) || new Set(languages).size !== languages.length) {
    throw new Error('Assessment Method publication requires unique two-letter language codes');
  }
  const { assessmentMethod_Props_Schema } = require('@svitlo/engine');
  const ids = new Set();
  const base = {};
  const localized = Object.fromEntries(languages.map(language => [language, {}]));

  for (const { name, definition } of entries) {
    const metadata = definition.config?.base;
    const dictionaries = definition.config?.locales?.();
    if (
      metadata?.slug !== name ||
      typeof metadata?.id !== 'string' ||
      Object.keys(metadata).sort().join(',') !== 'id,slug' ||
      ids.has(metadata.id)
    ) {
      throw new Error('Invalid or duplicate Assessment Method identity: ' + name);
    }
    ids.add(metadata.id);
    if (!dictionaries || Object.keys(dictionaries).sort().join(',') !== 'description,title') {
      throw new Error('Invalid Assessment Method locale projection: ' + name);
    }
    for (const field of ['title', 'description']) {
      if (
        !dictionaries[field] ||
        Object.keys(dictionaries[field]).sort().join(',') !== [...languages].sort().join(',')
      ) {
        throw new Error('Incomplete Assessment Method ' + field + ' translations: ' + name);
      }
    }
    base[name] = { id: metadata.id, slug: metadata.slug };
    for (const { language } of DEFAULT_SUPPORTED_LANGUAGES) {
      const title = dictionaries.title[language];
      const description = dictionaries.description[language];
      if (typeof title !== 'string' || !title.trim() || typeof description !== 'string' || !description.trim()) {
        throw new Error('Missing Assessment Method text: ' + name + '/' + language);
      }
      const props = assessmentMethod_Props_Schema.parse({ ...metadata, title, description });
      localized[language][name] = { title: props.title, description: props.description };
    }
  }
  return {
    base: {
      meta: { scope: 'global', methods: entries.map(({ name }) => name), languages },
      data: base,
    },
    localized,
    languages,
  };
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

    // Validate every resource before replacing previously published output.
    const assessmentMethods = createAssessmentMethodResources();
    rmSync(output, { recursive: true, force: true });
    mkdirSync(output, { recursive: true });
    for (const { locale, messages } of published) {
      writeFileSync(join(output, locale + '.json'), JSON.stringify(messages, null, 2) + '\n');
    }
    writeFileSync(
      join(output, 'meta.json'),
      JSON.stringify({ scope: 'global', components, locales: published.map(item => item.locale) }, null, 2) + '\n',
    );
    const methodsOutput = join(output, 'assessment-methods');
    mkdirSync(methodsOutput, { recursive: true });
    writeFileSync(join(methodsOutput, 'base.json'), JSON.stringify(assessmentMethods.base, null, 2) + '\n');
    for (const language of assessmentMethods.languages) {
      writeFileSync(
        join(methodsOutput, language + '.json'),
        JSON.stringify(assessmentMethods.localized[language], null, 2) + '\n',
      );
    }
    console.log(`Generated ${published.length} global UI Kit locale JSON and Assessment Method resources in ${output}`);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
