import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { parseArguments } from './generate-translation-review-artifacts.mjs';
import {
  readEducationStandardSources,
  hasCompleteEducationStandardLocales,
  verifyBuiltStandards,
  renderEducationStandardMarkdown,
  generateEducationStandardReviewArtifacts,
} from './education-standards-reference.mjs';

const UUID_A = '23b7528f-b24c-4484-b2ee-4dac9bf562b3';
const UUID_B = '70e88fb1-15e6-49fe-a3d2-455ebe274816';
const LANGUAGES = ['en', 'uk'];
const SOURCE_SHA = 'a'.repeat(40);

test('on-demand standard references do not build a nonexistent dedicated package', () => {
  const workflow = fs.readFileSync(new URL('../../.github/workflows/translation-review.yml', import.meta.url), 'utf8');
  assert.ok(!workflow.includes('@svitlo/education-standards'));
  assert.ok(workflow.includes('npm run package:build --workspace @svitlo/engine'));
});

function setup(records) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-standards-review-'));
  const directory = path.join(root, 'shared/ui-kit/data/definitions/educationStandards/data/example');
  fs.mkdirSync(directory, { recursive: true });
  const index = [];
  for (const record of records) {
    const filename = record.slug + '.data.ts';
    index.push('export { ' + record.slug + " } from './example/" + record.slug + ".data';");
    const frontend = Object.entries(record.frontend)
      .map(([language, value]) => language + ': ' + JSON.stringify(value) + ',')
      .join('\n      ');
    const source = [
      "import { defineEducationStandard } from '@svitlo/engine/build';",
      'export const ' + record.slug + ' = defineEducationStandard({',
      '  id: ' + JSON.stringify(record.id) + ',',
      '  slug: ' + JSON.stringify(record.slug) + ',',
      '  name: "Original title",',
      '  params: { countries: ["UA"], nameLanguage: "uk", version: "2026",',
      '    sourceUrl: "https://example.org/standards/2026", grade: { min: 1, max: 4 } },',
      '  description: {',
      '    methodological: "Official learning outcomes and expectations for a fictional test curriculum.",',
      '    frontend: { ' + frontend + ' }',
      '  },',
      '});',
      '',
    ].join('\n');
    fs.writeFileSync(path.join(directory, filename), source);
  }
  fs.writeFileSync(
    path.join(root, 'shared/ui-kit/data/definitions/educationStandards/data/index.ts'),
    index.join('\n') + '\n',
  );
  return root;
}

function record(slug = 'sampleOne', id = UUID_A, frontend = { en: 'Learning outcomes', uk: 'Результати навчання' }) {
  return { slug, id, frontend };
}

function built(records) {
  return records.map(({ slug, id, frontend }) => ({
    type: 'educationStandard',
    slug,
    id,
    build: {
      props: ({ languages }) => ({
        base: {
          id,
          slug,
          name: 'Original title',
          params: {
            version: '2026',
            grade: { min: 1, max: 4 },
            countries: ['UA'],
            sourceUrl: 'https://example.org/standards/2026',
            nameLanguage: 'uk',
          },
          description: {
            methodological: 'Official learning outcomes and expectations for a fictional test curriculum.',
          },
        },
        locale: Object.fromEntries(
          languages.map(language => [language, { description: { frontend: frontend[language] } }]),
        ),
      }),
    },
  }));
}

test('validates EducationStandard CLI scope and rejects unrelated parameters', () => {
  assert.deepEqual(parseArguments(['--kind', 'education-standards', '--locale', 'uk']), {
    kind: 'education-standards',
    locale: 'uk',
  });
  assert.deepEqual(parseArguments(['--kind', 'education-standards']), { kind: 'education-standards' });
  for (const args of [
    ['--kind', 'education-standards', '--package', 'content/math'],
    ['--kind', 'education-standards', '--component', 'audio'],
    ['--kind', 'education-standards', '--lesson', UUID_A],
    ['--kind', 'education-standards', '--locale', 'uk-UA'],
    ['--kind', 'education-standards', '--locale', 'uk', '--locale', 'en'],
    ['--kind', 'not-a-real-family'],
  ])
    assert.throws(() => parseArguments(args), 'accepted unsafe input: ' + args.join(' '));
});

test('generates deterministic source-linked Markdown for one requested language', () => {
  const value = record();
  const root = setup([value]);
  try {
    const entries = readEducationStandardSources(root, LANGUAGES);
    verifyBuiltStandards(entries, built([value]), LANGUAGES);
    const first = renderEducationStandardMarkdown(entries, 'uk', SOURCE_SHA);
    const second = renderEducationStandardMarkdown(entries, 'uk', SOURCE_SHA);
    assert.deepEqual(first, second);
    assert.equal(first.missing, 0);
    assert.equal(first.reviewReady, true);
    assert.equal(first.standards, 1);
    assert.match(first.markdown, /Source commit: a{40}/);
    assert.match(first.markdown, /Original name language:/);
    assert.match(first.markdown, /English methodological description \(not translated\)/);
    assert.match(first.markdown, /Результати навчання/);
    assert.match(first.markdown, /https:\/\/example.org\/standards\/2026/);
    assert.match(
      first.markdown,
      /shared\/ui-kit\/data\/definitions\/educationStandards\/data\/example\/sampleOne\.data\.ts/,
    );
    assert.doesNotMatch(first.markdown, /%%MISSING%%/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('one locale produces one document; omitted locale produces both with no cross-family data', () => {
  const value = record();
  const root = setup([value]);
  const output = path.join(root, '.agent-ci-artifacts');
  fs.mkdirSync(output);
  const manifest = { sourceCommit: SOURCE_SHA, generated: [], failures: [] };
  let saves = 0;
  const options = {
    root,
    output,
    registered: LANGUAGES,
    manifest,
    loadCatalog: () => built([value]),
    saveManifest: () => saves++,
  };
  try {
    generateEducationStandardReviewArtifacts({ ...options, languages: ['uk'] });
    assert.equal(saves, 1);
    assert.deepEqual(
      manifest.generated.map(item => item.locale),
      ['uk'],
    );
    assert.deepEqual(
      manifest.generated.map(item => item.path),
      ['.agent-ci-artifacts/education-standards/uk.md'],
    );
    assert.deepEqual(manifest.failures, []);
    assert.equal(fs.existsSync(path.join(output, 'education-standards/en.md')), false);
    assert.equal(fs.existsSync(path.join(output, 'taxonomies')), false);
    manifest.generated = [];
    generateEducationStandardReviewArtifacts({ ...options, languages: LANGUAGES });
    assert.equal(saves, 3);
    assert.deepEqual(
      manifest.generated.map(item => item.locale),
      LANGUAGES,
    );
    assert.ok(manifest.generated.every(item => item.standards === 1 && item.reviewReady));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('missing target translation is visible only in disposable Markdown and not review-ready', () => {
  const value = record('sampleOne', UUID_A, { en: 'Learning outcomes' });
  const root = setup([value]);
  try {
    const entries = readEducationStandardSources(root, LANGUAGES);
    const notReady = renderEducationStandardMarkdown(entries, 'uk', SOURCE_SHA);
    assert.equal(notReady.missing, 1);
    assert.equal(notReady.reviewReady, false);
    assert.match(notReady.markdown, /Missing translations: 1/);
    assert.match(notReady.markdown, /%%MISSING%%/);
    // The real strict Build API cannot publish an incomplete source dictionary.
    let called = false;
    verifyBuiltStandards(
      entries,
      [
        {
          type: 'educationStandard',
          id: UUID_A,
          slug: 'sampleOne',
          build: {
            props: () => {
              called = true;
              throw Error('Strict build rejected draft');
            },
          },
        },
      ],
      LANGUAGES,
    );
    assert.equal(called, false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('duplicate IDs, missing index entries and invalid built references fail closed', () => {
  const a = record();
  const b = record('sampleTwo', UUID_A);
  const root = setup([a, b]);
  try {
    assert.throws(() => readEducationStandardSources(root, LANGUAGES), /Duplicate EducationStandard UUID/);
    const bPath = path.join(root, 'shared/ui-kit/data/definitions/educationStandards/data/example/sampleTwo.data.ts');
    fs.writeFileSync(bPath, fs.readFileSync(bPath, 'utf8').replace(UUID_A, UUID_B));
    const entries = readEducationStandardSources(root, LANGUAGES);
    assert.throws(() => verifyBuiltStandards(entries, built([a]), LANGUAGES), /size mismatch/);
    assert.throws(() => verifyBuiltStandards(entries, built([a, a]), LANGUAGES), /duplicated/);
    fs.writeFileSync(
      path.join(root, 'shared/ui-kit/data/definitions/educationStandards/data/index.ts'),
      "export { sampleOne } from './example/sampleOne.data';\n",
    );
    assert.throws(() => readEducationStandardSources(root, LANGUAGES), /omits authored data files/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('invalid source metadata causes a per-locale manifest failure, not a review-ready document', () => {
  const value = record();
  const root = setup([value]);
  const output = path.join(root, '.agent-ci-artifacts');
  fs.mkdirSync(output);
  try {
    const filename = path.join(
      root,
      'shared/ui-kit/data/definitions/educationStandards/data/example/sampleOne.data.ts',
    );
    fs.writeFileSync(
      filename,
      fs.readFileSync(filename, 'utf8').replace('https://example.org/standards/2026', 'javascript:invalid'),
    );
    const manifest = { sourceCommit: SOURCE_SHA, generated: [], failures: [] };
    generateEducationStandardReviewArtifacts({
      root,
      output,
      languages: ['uk'],
      registered: LANGUAGES,
      manifest,
      saveManifest: () => {},
      loadCatalog: () => built([value]),
    });
    assert.equal(manifest.generated.length, 0);
    assert.equal(manifest.failures.length, 1);
    assert.match(manifest.failures[0].error, /Invalid official source URL/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('incomplete previews still reject bad jurisdictions, original language, and ranges', () => {
  const changes = [
    ['countries: ["UA"]', 'countries: ["UA", "UA"]', /Duplicated jurisdiction/],
    ['nameLanguage: "uk"', 'nameLanguage: "bad tag"', /Invalid original name language/],
    ['grade: { min: 1, max: 4 }', 'grade: { min: 5, max: 4 }', /Invalid grade range/],
    [
      'https://example.org/standards/2026',
      'https://user:pass@example.org/standards/2026',
      /Invalid official source URL/,
    ],
  ];
  for (const [before, after, expected] of changes) {
    const root = setup([record('sampleOne', UUID_A, { en: 'Learning outcomes' })]);
    try {
      const filename = path.join(
        root,
        'shared/ui-kit/data/definitions/educationStandards/data/example/sampleOne.data.ts',
      );
      const source = fs.readFileSync(filename, 'utf8');
      assert.ok(source.includes(before));
      fs.writeFileSync(filename, source.replace(before, after));
      assert.throws(() => readEducationStandardSources(root, LANGUAGES), expected);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
});

test('incomplete authoring skips the unavailable compiled package and still generates review previews', () => {
  const value = record('sampleOne', UUID_A, { en: 'Learning outcomes' });
  const root = setup([value]);
  const output = path.join(root, '.agent-ci-artifacts');
  fs.mkdirSync(output);
  const manifest = { sourceCommit: SOURCE_SHA, generated: [], failures: [] };
  try {
    const entries = readEducationStandardSources(root, LANGUAGES);
    assert.equal(hasCompleteEducationStandardLocales(entries, LANGUAGES), false);
    generateEducationStandardReviewArtifacts({
      root,
      output,
      languages: ['en', 'uk'],
      registered: LANGUAGES,
      manifest,
      saveManifest: () => {},
      loadCatalog: () => {
        throw Error('Partial catalogs must never be imported');
      },
    });
    assert.equal(manifest.failures.length, 0);
    assert.deepEqual(
      manifest.generated.map(item => [item.locale, item.missing, item.reviewReady]),
      [
        ['en', 0, true],
        ['uk', 1, false],
      ],
    );
    const uk = fs.readFileSync(path.join(output, 'education-standards/uk.md'), 'utf8');
    assert.match(uk, /%%MISSING%%/);
    assert.equal(fs.existsSync(path.join(output, 'taxonomies')), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
