import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';

const root = fileURLToPath(new URL('../../../', import.meta.url));
const require = createRequire(import.meta.url);
const { DEFAULT_SUPPORTED_LANGUAGES } = require('@svitlo/contracts/localization');
const script = path.join(root, 'shared/ui-kit/scripts/generate-locales.mjs');
const target = 'content/playground';
const output = path.join(root, target, 'public/data/ui-kit');

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
      'assessmentMethods',
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
    assert.equal(audit.componentCount, 11);
    assert.equal(audit.missingCount, 0, JSON.stringify(audit.missing));
    assert.deepEqual(audit.missing, {});
  });

  it('publishes exactly one complete UI Kit dictionary per locale without fallback', () => {
    const result = generate();
    assert.equal(result.status, 0, result.stderr);
    const meta = JSON.parse(readFileSync(path.join(output, 'meta.json'), 'utf8'));
    assert.deepEqual(
      meta.locales,
      DEFAULT_SUPPORTED_LANGUAGES.map(({ locale }) => locale),
    );
    assert.equal(meta.components.length, 11);

    for (const { locale } of DEFAULT_SUPPORTED_LANGUAGES) {
      const messages = JSON.parse(readFileSync(path.join(output, locale + '.json'), 'utf8'));
      assert.deepEqual(Object.keys(messages).sort(), [...meta.components].sort(), locale);
    }

    const ar = JSON.parse(readFileSync(path.join(output, 'ar-SA.json'), 'utf8'));
    const en = JSON.parse(readFileSync(path.join(output, 'en-US.json'), 'utf8'));
    const uk = JSON.parse(readFileSync(path.join(output, 'uk-UA.json'), 'utf8'));
    const qm = JSON.parse(readFileSync(path.join(output, 'crh-Latn-UA.json'), 'utf8'));
    for (const { locale } of DEFAULT_SUPPORTED_LANGUAGES) {
      const messages = JSON.parse(readFileSync(path.join(output, locale + '.json'), 'utf8'));
      assert.equal(Object.keys(messages.assessmentMethods).length, 16, locale);
    }
    assert.equal(en.assessmentMethods.retrieval, 'Recall');
    assert.equal(uk.assessmentMethods.retrieval, 'Відтворення знань');
    assert.equal(qm.assessmentMethods.retrieval, 'Bilgilerni hatırğa ketirüv');
    assert.notEqual(ar.learningLayout.navigation.top, uk.learningLayout.navigation.top);
    assert.notEqual(ar.questionFrame.matchInstructions, en.questionFrame.matchInstructions);
    assert.notEqual(ar.image.retry, en.image.retry);
    assert.equal(en.learningLayout.actions.skip, 'Skip');
    assert.equal(uk.learningLayout.actions.skip, 'Пропустити');
    assert.equal(qm.questionFrame.check, 'Tekşer');
  });
});


describe('Assessment Methods sparse publication', () => {
  const methodsRoot = path.join(output, 'assessment-methods');
  const { assessmentMethods_AssessmentMethod_Ids } = require('@svitlo/contracts/content');
  const { assessmentMethod_Props_Schema } = require('@svitlo/engine');
  const names = Object.keys(assessmentMethods_AssessmentMethod_Ids).sort();

  it('publishes one invariant base and a complete selected-language resource for every locale', () => {
    const result = generate();
    assert.equal(result.status, 0, result.stderr);
    const baseResource = JSON.parse(readFileSync(path.join(methodsRoot, 'base.json'), 'utf8'));
    assert.deepEqual(Object.keys(baseResource).sort(), ['data', 'meta']);
    const { meta, data: base } = baseResource;
    assert.equal(meta.scope, 'global');
    assert.equal(names.length, 16);
    assert.deepEqual(meta.methods, names);
    assert.deepEqual(meta.languages, DEFAULT_SUPPORTED_LANGUAGES.map(({ language }) => language));
    assert.ok(meta.languages.every(language => /^[a-z]{2}$/.test(language)));
    assert.deepEqual(Object.keys(base), names);
    assert.deepEqual(readdirSync(methodsRoot).sort(), [
      'base.json', ...meta.languages.map(language => language + '.json'),
    ].sort());

    for (const name of names) {
      assert.deepEqual(base[name], { id: assessmentMethods_AssessmentMethod_Ids[name], slug: name });
    }
    for (const { language } of DEFAULT_SUPPORTED_LANGUAGES) {
      const local = JSON.parse(readFileSync(path.join(methodsRoot, language + '.json'), 'utf8'));
      assert.deepEqual(Object.keys(local), names);
      for (const name of names) {
        assert.deepEqual(Object.keys(local[name]).sort(), ['description', 'title']);
        assert.ok(local[name].title.trim(), name + '/' + language);
        assert.ok(local[name].description.trim(), name + '/' + language);
        assert.deepEqual(
          assessmentMethod_Props_Schema.parse({ ...base[name], ...local[name] }),
          { ...base[name], ...local[name] },
        );
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
    const snapshot = Object.fromEntries(readdirSync(methodsRoot).sort().map(name => [
      name, readFileSync(path.join(methodsRoot, name), 'utf8'),
    ]));
    const obsoleteGlobal = path.join(output, 'obsolete.json');
    const obsoleteMethod = path.join(methodsRoot, 'obsolete.json');
    writeFileSync(obsoleteGlobal, '{}');
    writeFileSync(obsoleteMethod, '{}');
    // Previous publication format must not survive regeneration.
    writeFileSync(path.join(methodsRoot, 'meta.json'), '{}');
    writeFileSync(path.join(methodsRoot, 'uk-UA.json'), '{}');
    result = generate();
    assert.equal(result.status, 0, result.stderr);
    assert.equal(existsSync(obsoleteGlobal), false);
    assert.equal(existsSync(obsoleteMethod), false);
    assert.equal(existsSync(path.join(methodsRoot, 'meta.json')), false);
    assert.equal(existsSync(path.join(methodsRoot, 'uk-UA.json')), false);
    assert.deepEqual(Object.fromEntries(readdirSync(methodsRoot).sort().map(name => [
      name, readFileSync(path.join(methodsRoot, name), 'utf8'),
    ])), snapshot);
  });
});
