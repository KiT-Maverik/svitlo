import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const require = createRequire(import.meta.url);
const { DEFAULT_SUPPORTED_LANGUAGES } = require('@svitlo/contracts/localization');
const script = path.join(root, 'shared/ui-kit/scripts/generate-locales.mjs');
const target = 'content/playground';
const output = path.join(root, target, 'public/data/uiKit');

function generate(...flags) {
  return spawnSync(process.execPath, [script, '--package', target, ...flags], {
    cwd: root,
    encoding: 'utf8',
  });
}

describe('global UI Kit translation coverage', () => {
  it('stores every component dictionary in one authored file', () => {
    const locales = path.join(root, 'shared/ui-kit/data/locale');
    const expected = [
      'audio',
      'checkpoint',
      'flashcard',
      'image',
      'learningLayout',
      'lesson',
      'navbarPreferences',
      'questionFrame',
      'video',
      'youtube',
    ];
    assert.deepEqual(
      readdirSync(locales).sort(),
      [...expected.map(name => name + '.ts'), 'index.ts', 'locale.types.ts'].sort(),
    );
  });

  it('audits complete coverage of every canonical language and component', () => {
    const result = generate('--audit');
    assert.equal(result.status, 0, result.stderr);
    const audit = JSON.parse(result.stdout);
    assert.equal(audit.languages, DEFAULT_SUPPORTED_LANGUAGES.length);
    assert.equal(audit.componentCount, 10);
    assert.equal(audit.missingCount, 0, JSON.stringify(audit.missing));
    assert.deepEqual(audit.missing, {});
  });

  it('publishes exactly one complete UI Kit dictionary per locale without fallback', () => {
    const result = generate();
    assert.equal(result.status, 0, result.stderr);
    const componentsRoot = path.join(output, 'components');
    assert.deepEqual(readdirSync(output).sort(), ['assessmentMethods', 'components']);
    assert.deepEqual(
      readdirSync(componentsRoot).sort(),
      DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language + '.json').sort(),
    );
    const messagesFor = language => JSON.parse(readFileSync(path.join(componentsRoot, language + '.json'), 'utf8'));
    const expected = Object.keys(messagesFor('uk')).sort();
    assert.equal(expected.length, 10);
    for (const { language } of DEFAULT_SUPPORTED_LANGUAGES) {
      const messages = messagesFor(language);
      assert.deepEqual(Object.keys(messages).sort(), expected, language);
      assert.equal(Object.hasOwn(messages, 'assessmentMethods'), false);
    }

    const ar = messagesFor('ar');
    const en = messagesFor('en');
    const uk = messagesFor('uk');
    const qm = messagesFor('qm');
    assert.notEqual(ar.learningLayout.navigation.top, uk.learningLayout.navigation.top);
    assert.notEqual(ar.questionFrame.matchInstructions, en.questionFrame.matchInstructions);
    assert.notEqual(ar.image.retry, en.image.retry);
    assert.equal(en.learningLayout.actions.skip, 'Skip');
    assert.equal(uk.learningLayout.actions.skip, 'Пропустити');
    assert.equal(qm.questionFrame.check, 'Tekşer');
  });
});

describe('Assessment Methods sparse publication', () => {
  const methodsRoot = path.join(output, 'assessmentMethods');
  const { assessmentMethods_AssessmentMethod_Ids } = require('@svitlo/contracts/content');
  const { assessmentMethod_Props_Schema } = require('@svitlo/engine');
  const names = Object.keys(assessmentMethods_AssessmentMethod_Ids).sort();

  it('publishes one invariant base and a complete selected-language resource for every locale', () => {
    const result = generate();
    assert.equal(result.status, 0, result.stderr);
    const base = JSON.parse(readFileSync(path.join(methodsRoot, 'base.json'), 'utf8'));
    assert.equal(names.length, 16);
    assert.deepEqual(Object.keys(base), names);
    assert.deepEqual(
      readdirSync(methodsRoot).sort(),
      ['base.json', ...DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language + '.json')].sort(),
    );

    for (const name of names) {
      assert.deepEqual(base[name], { id: assessmentMethods_AssessmentMethod_Ids[name], slug: name });
    }
    for (const { language } of DEFAULT_SUPPORTED_LANGUAGES) {
      const local = JSON.parse(readFileSync(path.join(methodsRoot, language + '.json'), 'utf8'));
      assert.deepEqual(Object.keys(local), names);
      const merged = Object.fromEntries(Object.keys(base).map(name => [name, { ...base[name], ...local[name] }]));
      for (const name of names) {
        assert.deepEqual(Object.keys(local[name]).sort(), ['description', 'title']);
        assert.ok(local[name].title.trim(), name + '/' + language);
        assert.ok(local[name].description.trim(), name + '/' + language);
        assert.deepEqual(assessmentMethod_Props_Schema.parse(merged[name]), merged[name]);
      }
    }
    const uk = JSON.parse(readFileSync(path.join(methodsRoot, 'uk.json'), 'utf8'));
    const en = JSON.parse(readFileSync(path.join(methodsRoot, 'en.json'), 'utf8'));
    const qm = JSON.parse(readFileSync(path.join(methodsRoot, 'qm.json'), 'utf8'));
    assert.ok(qm.analogicalReasoning.title.trim());
    assert.equal(existsSync(path.join(methodsRoot, 'meta.json')), false);
    assert.equal(existsSync(path.join(methodsRoot, 'uk-UA.json')), false);
    assert.equal(uk.analogicalReasoning.title, 'Міркування за аналогією');
    assert.equal(en.retrieval.title, 'Retrieval');
  });

  it('reproduces identical output and removes stale JSON on repeat generation', () => {
    let result = generate();
    assert.equal(result.status, 0, result.stderr);
    const snapshot = Object.fromEntries(
      readdirSync(methodsRoot)
        .sort()
        .map(name => [name, readFileSync(path.join(methodsRoot, name), 'utf8')]),
    );
    const obsoleteGlobal = path.join(output, 'components', 'obsolete.json');
    const obsoleteMethod = path.join(methodsRoot, 'obsolete.json');
    const legacyOutput = path.join(root, target, 'public/data/ui-kit');
    writeFileSync(obsoleteGlobal, '{}');
    writeFileSync(obsoleteMethod, '{}');
    mkdirSync(legacyOutput, { recursive: true });
    writeFileSync(path.join(legacyOutput, 'obsolete.json'), '{}');
    // Previous publication format must not survive regeneration.
    writeFileSync(path.join(methodsRoot, 'meta.json'), '{}');
    writeFileSync(path.join(methodsRoot, 'uk-UA.json'), '{}');
    result = generate();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(existsSync(obsoleteGlobal), false);
    assert.equal(existsSync(obsoleteMethod), false);
    assert.equal(existsSync(legacyOutput), false);
    assert.equal(existsSync(path.join(methodsRoot, 'meta.json')), false);
    assert.equal(existsSync(path.join(methodsRoot, 'uk-UA.json')), false);
    assert.deepEqual(
      Object.fromEntries(
        readdirSync(methodsRoot)
          .sort()
          .map(name => [name, readFileSync(path.join(methodsRoot, name), 'utf8')]),
      ),
      snapshot,
    );
  });
});
