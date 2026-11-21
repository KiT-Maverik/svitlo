import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import {
  generateAssessmentMethodsReviewArtifacts,
  readAssessmentMethodsReference,
  renderAssessmentMethodsReference,
  supportedAssessmentMethodLocales,
} from './generate-assessment-methods-reference.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../..');
const definitionRoot = 'shared/ui-kit/data/definitions/assessmentMethods';
const definitions = fs
  .readdirSync(path.join(repoRoot, definitionRoot))
  .filter(name => /^[a-z][A-Za-z0-9]*\.ts$/.test(name) && name !== 'index.ts')
  .sort();
const sources = [
  'shared/engine/schemas/languages.schemas.ts',
  definitionRoot + '/retrieval.ts',
  ...definitions.filter(name => name !== 'retrieval.ts').map(name => definitionRoot + '/' + name),
];
const keyHeading = /^## \x60([A-Za-z]+)\x60$/gm;

function withFixture(fn) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-assessment-reference-'));
  try {
    for (const relative of sources) {
      const destination = path.join(root, relative);
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(path.join(repoRoot, relative), destination);
    }
    return fn(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function replaceFile(root, relative, transform) {
  const file = path.join(root, relative);
  fs.writeFileSync(file, transform(fs.readFileSync(file, 'utf8')), 'utf8');
}

test('every supported language has exactly the canonical 16 keys, IDs and authored titles', () => {
  const languages = supportedAssessmentMethodLocales();
  assert.ok(languages.includes('en'));
  assert.ok(languages.includes('uk'));
  assert.ok(languages.includes('qm'));
  const canonicalIds = new Map(
    definitions.map(filename => {
      const source = fs.readFileSync(path.join(repoRoot, definitionRoot, filename), 'utf8');
      const match = source.match(/^\s*id:\s*'([a-f0-9-]{36})'/m);
      assert.ok(match, 'Missing literal canonical UUID in ' + filename);
      return [filename.slice(0, -3), match[1]];
    }),
  );
  assert.equal(canonicalIds.size, 16);
  const reference = readAssessmentMethodsReference({ locale: 'en' });
  const keys = reference.methods.map(method => method.key);
  assert.deepEqual(keys, [...canonicalIds.keys()]);
  for (const locale of languages) {
    const data = readAssessmentMethodsReference({ locale });
    assert.equal(data.methods.length, 16);
    assert.deepEqual(
      data.methods.map(method => method.key),
      keys,
    );
    assert.equal(new Set(data.methods.map(method => method.id)).size, 16);
    const markdown = renderAssessmentMethodsReference({ locale });
    const headings = [...markdown.matchAll(keyHeading)].map(match => match[1]);
    assert.deepEqual(headings, keys);
    assert.ok(markdown.includes('Localized titles and descriptions: ' + String.fromCharCode(96) + locale));
    assert.ok(markdown.includes('Question type'));
    assert.ok(markdown.includes('Methods: 16'));
    assert.ok(!markdown.includes('assessmentMethod.ids.ts'));
    assert.ok(markdown.includes('../../shared/ui-kit/data/definitions/assessmentMethods'));
    assert.ok(markdown.includes('../../shared/ui-kit/data/definitions/assessmentMethods/retrieval.ts'));
    for (let i = 0; i < data.methods.length; i++) {
      const method = data.methods[i];
      assert.equal(method.id, canonicalIds.get(method.key));
      assert.equal(method.description, reference.methods[i].description);
      assert.ok(method.title.trim().length > 0);
      assert.ok(method.localizedDescription.trim().length > 0);
      assert.ok(markdown.includes(method.id));
      assert.ok(markdown.includes(method.title));
      assert.ok(
        markdown.includes(
          '- **Localized description (' +
            locale +
            '):** ' +
            method.localizedDescription.replace(/([*_()[\]<>])/g, '\\$1'),
        ),
      );
      assert.ok(markdown.includes(method.description.replace(/([*_()[\]<>])/g, '\\$1')));
    }
  }
});

test('English methodological descriptions are substantive and unchanged across languages', () => {
  const reference = readAssessmentMethodsReference({ locale: 'en' });
  for (const method of reference.methods) {
    assert.ok(method.description.length > 240, 'English methodological description is too short: ' + method.key);
  }
  for (const locale of supportedAssessmentMethodLocales()) {
    const methods = readAssessmentMethodsReference({ locale }).methods;
    assert.deepEqual(
      methods.map(item => item.description),
      reference.methods.map(item => item.description),
    );
  }
});

test('generation is byte-for-byte deterministic and --stdout creates no artifact files', () => {
  const before = renderAssessmentMethodsReference({ locale: 'uk' });
  const after = renderAssessmentMethodsReference({ locale: 'uk' });
  assert.equal(before, after);
  const output = execFileSync(
    process.execPath,
    [
      'shared/ui-kit/scripts/generateAssessmentMethodsReference/generate-assessment-methods-reference.mjs',
      '--locale',
      'uk',
      '--stdout',
    ],
    { cwd: repoRoot, encoding: 'utf8' },
  );
  assert.equal(output, before);
  assert.ok(before.startsWith('<!-- GENERATED FROM CODE; DO NOT EDIT. -->'));
});

test('missing method titles fail without English fallback', () =>
  withFixture(root => {
    const file = sources[1];
    replaceFile(root, file, text => {
      const match = text.match(/    uk: [^\n]+\n/);
      assert.ok(match, 'Expected Assessment Method uk title is missing');
      return text.replace(match[0], '');
    });
    assert.throws(
      () => readAssessmentMethodsReference({ root, locale: 'uk' }),
      /Assessment Method titles for retrieval: missing \[uk\]/,
    );
  }));

test('missing localized method descriptions fail strict mode and count in draft review coverage', () =>
  withFixture(root => {
    const file = sources[1];
    replaceFile(root, file, text => {
      const start = text.indexOf('  description: {');
      assert.ok(start > 0);
      const entry = text.slice(start);
      assert.match(entry, /    uk: [^\n]+\n/);
      return text.slice(0, start) + entry.replace(/    uk: [^\n]+\n/, '');
    });
    assert.throws(
      () => readAssessmentMethodsReference({ root, locale: 'uk' }),
      /Assessment Method descriptions for retrieval: missing \[uk\]/,
    );
    const draft = readAssessmentMethodsReference({ root, locale: 'uk', allowMissing: true });
    assert.equal(draft.missing, 1);
    assert.equal(draft.methods.find(method => method.key === 'retrieval').localizedDescription, '%%MISSING%%');
    const markdown = renderAssessmentMethodsReference({ root, locale: 'uk', allowMissing: true });
    assert.match(markdown, /Missing translations: 1/);
    assert.match(markdown, /Localized description \(uk\):\*\* %%MISSING%%/);
  }));

test('unknown locales, missing source, invalid UUIDs and missing English descriptions fail', () =>
  withFixture(root => {
    assert.throws(
      () => readAssessmentMethodsReference({ root, locale: 'xx' }),
      /Unsupported Assessment Methods locale/,
    );
    replaceFile(root, sources[1], text => text.replace(/db75ef83-f99d-4a93-940c-9402abc908d5/, 'invalid'));
    assert.throws(
      () => readAssessmentMethodsReference({ root, locale: 'uk' }),
      /Invalid canonical Assessment Method UUID/,
    );
  }));

test('missing authored method definitions are rejected', () =>
  withFixture(root => {
    fs.rmSync(path.join(root, definitionRoot, 'retrieval.ts'));
    assert.throws(
      () => readAssessmentMethodsReference({ root, locale: 'uk' }),
      /Expected exactly 16 canonical Assessment Methods/,
    );
  }));

test('missing English descriptions are not repaired using localized content', () =>
  withFixture(root => {
    replaceFile(root, sources[1], text => text.replace('  description: {', '  missingDescription: {'));
    assert.throws(
      () => readAssessmentMethodsReference({ root, locale: 'uk' }),
      /Missing English methodological description for retrieval/,
    );
  }));

test('PR-artifact manifest records success, failures and only allowed temporary paths', () =>
  withFixture(root => {
    const output = path.join(root, 'temp/agent-reference-library');
    fs.mkdirSync(output, { recursive: true });
    const manifest = { generated: [], failures: [] };
    let saves = 0;
    const saveManifest = () => {
      saves++;
      fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
    };
    const languages = supportedAssessmentMethodLocales(root);
    const stats = generateAssessmentMethodsReviewArtifacts({ root, output, languages, manifest, saveManifest });
    assert.deepEqual(stats, { generated: languages.length, failures: 0 });
    assert.equal(saves, languages.length);
    assert.equal(manifest.generated.length, languages.length);
    assert.deepEqual(manifest.failures, []);
    for (const item of manifest.generated) {
      assert.equal(item.kind, 'assessment-method');
      assert.equal(item.path, 'assessment-methods/' + item.locale + '.md');
      assert.equal(
        fs.readFileSync(path.join(output, item.path), 'utf8'),
        renderAssessmentMethodsReference({ root, locale: item.locale }),
      );
    }
    assert.throws(
      () =>
        generateAssessmentMethodsReviewArtifacts({
          root,
          output: path.join(root, 'public'),
          languages,
          manifest,
          saveManifest,
        }),
      /Output must remain under ignored temp/,
    );
    replaceFile(root, sources[1], text => text.replace(/    uk: [^\n]+\n/, ''));
    const before = manifest.generated.length;
    const retry = generateAssessmentMethodsReviewArtifacts({ root, output, languages: ['uk'], manifest, saveManifest });
    assert.deepEqual(retry, { generated: 0, failures: 1 });
    assert.equal(manifest.generated.length, before);
    assert.deepEqual(
      manifest.failures.map(f => [f.kind, f.locale]),
      [['assessment-method', 'uk']],
    );
  }));

test('Italian draft reference marks missing titles while strict generation rejects them', () =>
  withFixture(root => {
    assert.ok(supportedAssessmentMethodLocales(root).includes('it'));
    for (const file of sources.slice(1)) {
      replaceFile(root, file, source => {
        const italianEntries = source.match(/^    it: [^\n]*\n/gm) ?? [];
        assert.equal(italianEntries.length, 2, 'Expected Italian title and description in ' + file);
        return source.replace(/^    it: [^\n]*\n/gm, '');
      });
    }
    assert.throws(() => readAssessmentMethodsReference({ root, locale: 'it' }), /missing \[it\]/);
    const draft = readAssessmentMethodsReference({ root, locale: 'it', allowMissing: true });
    assert.equal(draft.missing, 32);
    assert.ok(
      draft.methods.every(
        method => method.title === '%%MISSING%%' && method.localizedDescription === '%%MISSING%%',
      ),
    );
    const markdown = renderAssessmentMethodsReference({ root, locale: 'it', allowMissing: true });
    assert.match(markdown, /Missing translations: 32/);
    assert.match(markdown, /%%MISSING%%/);
    assert.match(markdown, /Methodological description \(English\)/);
  }));

test('Assessment Method references use only disposable Actions reports without the retired clean guard', () => {
  const generator = fs.readFileSync(
    path.join(repoRoot, 'scripts/generateTranslationReviewArtifacts/generate-translation-review-artifacts.mjs'),
    'utf8',
  );
  const workflow = fs.readFileSync(
    path.join(repoRoot, '.github/workflows/agent-ci-artifacts.yml'),
    'utf8',
  );
  assert.match(generator, /generateAssessmentMethodsReviewArtifacts/);
  assert.match(generator, /assessmentMethodDocuments:/);
  assert.match(generator, /allowMissing: true/);
  assert.match(generator, /missingTranslations:/);
  assert.match(workflow, /SVITLO_AGENT_REPORT_OUTPUT/);
  assert.match(workflow, /retention-days: 1/);
  assert.equal(fs.existsSync(path.join(repoRoot, '.github/workflows/agent-ci-artifacts-guard.yml')), false);
});
