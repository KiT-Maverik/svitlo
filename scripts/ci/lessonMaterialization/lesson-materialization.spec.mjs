import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import YAML from 'yaml';
import { parseIdentity, parseTrigger, requireStageSixPending, validateArtifactPath, gitBlob } from './lesson-gate.mjs';
import {
  identicalSnapshot,
  verifyManifest,
  trackedFiles,
  changedFiles,
  chooseMode,
  verifyMaterializedForFinalize,
} from './lesson-materialization.mjs';
import { preflightLesson, finalizeLesson } from '../../../shared/engine/scripts/finalizeLesson/finalizeLesson.mjs';
import { repoRoot } from '../../../shared/engine/scripts/lessonBuilder/lessonBuilder.mjs';

const id = '667803f3-6535-5322-b377-810b4096d005';
const courseId = '1e79d8fc-2223-4fa7-bc64-70d8172d3e8b';
const pkg = 'content/astronomy';
const slug = 'moonAppearanceBasics';
const yaml = pkg + '/data/lessons/5/' + id + '/lesson.yaml';
const identity = { id, pkg, slug, yaml, parent: { courseId, parentPr: 653 } };
const head = 'b'.repeat(40);
const sourceBlob = 'c'.repeat(40);
const tick = String.fromCharCode(96);
const stageNames = [
  'Methodology',
  'Content Creation',
  'Content Review',
  'Experience Review',
  'Methodology Compliance',
  'Resource Production',
  'Questions',
  'Flashcards',
  'Translation',
  'Translation Review',
];
const stageSixSteps = [
  'Materialize Lesson sources',
  'Accessibility source audit',
  'Offline source audit',
  'Validate source and handoff',
];
function body() {
  return [
    '<!-- svitlo-course-lesson:v1 -->',
    'Course: ' + courseId,
    'Lesson: ' + id,
    'Parent PR: #653',
    '<!-- svitlo-create-lesson-flow:v1 -->',
    '## Lesson identity',
    '- Lesson UUID / textbook / slug: ' + tick + id + tick + ' / ' + tick + pkg + tick + ' / ' + tick + slug + tick,
    '- Canonical source: ' + tick + yaml + tick + ' (inherited)',
    '## Lesson stages',
    ...stageNames.flatMap((name, i) => [
      '- [' + (i < 5 ? 'x' : ' ') + '] ' + (i + 1) + '. ' + name + (i === 5 ? ' — IN PROGRESS' : ''),
      ...(i === 5 ? stageSixSteps.map((step, j) => '  - [ ] 6.' + (j + 1) + ' ' + step) : []),
    ]),
    '  - [ ] en',
    '## Audit evidence',
    'Sha-pinned review evidence is owned by the parent PR',
  ].join('\n');
}

test('exact Course-Lesson marker, identity, UUID bucket and source are required', () => {
  assert.deepEqual(parseIdentity(body()), identity);
  const standalone = body()
    .replace('<!-- svitlo-course-lesson:v1 -->', '')
    .replace('Course: ' + courseId + '\nLesson: ' + id + '\nParent PR: #653\n', '');
  assert.deepEqual(parseIdentity(standalone).parent, null);
  for (const candidate of [
    body().replace('<!-- svitlo-create-lesson-flow:v1 -->', ''),
    body() + '\n<!-- svitlo-create-lesson-flow:v1 -->',
    body().replace('Parent PR: #653', 'Parent PR: #bad'),
    body().replace('Lesson: ' + id, 'Lesson: ' + courseId),
    body().replace('/lessons/5/', '/lessons/a/'),
    body().replace(slug + tick, '../evil' + tick),
    body() + '\n- Canonical source: ' + tick + yaml + tick,
  ])
    assert.throws(() => parseIdentity(candidate));
});

test('only exact PR top-level comments and enumerated dispatch operations are accepted', () => {
  const event = {
    issue: { number: 710, pull_request: {} },
    comment: { user: { login: 'maintainer' }, body: '/lesson materialize' },
  };
  assert.deepEqual(parseTrigger(event, 'issue_comment', 'maintainer'), {
    number: 710,
    operation: 'materialize',
    actor: 'maintainer',
  });
  for (const command of [
    '/lesson materialize\n',
    ' /lesson materialize',
    '/lesson materialize #710',
    '/lesson status',
    '/course materialize',
    '/lesson finalize please',
  ]) {
    assert.throws(() =>
      parseTrigger({ ...event, comment: { ...event.comment, body: command } }, 'issue_comment', 'maintainer'),
    );
  }
  assert.throws(() => parseTrigger(event, 'issue_comment', 'other'));
  assert.throws(() => parseTrigger({ ...event, issue: { number: 710 } }, 'issue_comment', 'maintainer'));
  assert.deepEqual(
    parseTrigger(
      {
        inputs: { pr_number: '710', operation: 'finalize' },
      },
      'workflow_dispatch',
      'maintainer',
    ).operation,
    'finalize',
  );
  for (const n of ['0', '1e2', '../710', '-5', 'NaN']) {
    assert.throws(() =>
      parseTrigger({ inputs: { pr_number: n, operation: 'materialize' } }, 'workflow_dispatch', 'maintainer'),
    );
  }
});

test('ten-stage tracker requires editorial Stages 1–5, pending Stage 6 and four subchecks', () => {
  assert.equal(requireStageSixPending(body()), true);
  for (let stage = 1; stage <= 5; stage++) {
    const changed = body().replace('- [x] ' + stage + '.', '- [ ] ' + stage + '.');
    assert.throws(() => requireStageSixPending(changed));
  }
  assert.throws(() => requireStageSixPending(body().replace('- [ ] 6.', '- [x] 6.')));
  assert.throws(() => requireStageSixPending(body().replace('## Lesson stages', '## Fake')));
  assert.throws(() => requireStageSixPending(body() + '\n## Lesson stages'));
  assert.throws(() =>
    requireStageSixPending(body().replace('## Audit evidence', '- [x] 5. Methodology Compliance\n## Audit evidence')),
  );
  assert.throws(() => requireStageSixPending(body().replace('2. Content Creation', '2. Fake label')));
  assert.throws(() => requireStageSixPending(body().replace('7. Questions', '7. Translation')));
  assert.throws(() => requireStageSixPending(body().replace('10. Translation Review', '10. Fake')));
  assert.throws(() => requireStageSixPending(body().replace('  - [ ] 6.2 Accessibility source audit', '')));
  assert.throws(() => requireStageSixPending(body().replace('6.3 Offline source audit', '6.2 Offline source audit')));
  assert.throws(() => requireStageSixPending(body().replace('6.4 Validate source and handoff', '6.4 Fake')));
  assert.throws(() =>
    requireStageSixPending(body().replace('## Audit evidence', '- [ ] 10. Translation Review\n## Audit evidence')),
  );
});

test('existing eight-stage Lesson PRs may materialize while being migrated in place', () => {
  const legacy = body()
    .replace(
      /^- \[ \] 7\. Questions.*\n- \[ \] 8\. Flashcards.*\n- \[ \] 9\. Translation.*\n- \[ \] 10\. Translation Review.*$/m,
      '- [ ] 7. Translation\n- [ ] 8. Translation Review',
    )
    .replace(/^  - \[ \] 6\.[1-4].*\n/gm, '');
  assert.equal(requireStageSixPending(legacy), true);
  assert.throws(() => requireStageSixPending(legacy.replace('7. Translation', '7. Questions')));
});

test('allowlist preserves Quiz/Flashcards Section modules but forbids bank roots and traversal', () => {
  const base = yaml.slice(0, -'lesson.yaml'.length);
  for (const relative of [
    'index.ts',
    'constants.ts',
    'review.ts',
    'methodology.md',
    'production-handoff.json',
    'sections/index.ts',
    'sections/quiz/index.ts',
    'sections/flashcards/index.ts',
    'sections/intro/sceneDemo/index.ts',
    'sections/intro/sceneDemo/specification.md',
    'sections/intro/text/uk.md',
    'sections/intro/codeSample/code.py',
    'sections/intro/checkpoint/itemA/question/index.ts',
    'questions.yaml',
    'flashcards.yaml',
  ])
    assert.equal(validateArtifactPath(base + relative, identity), true, relative);
  for (const relative of [
    'lesson.yaml',
    'questions/index.ts',
    'flashcards/index.ts',
    'assets/image.png',
    'scenes/abc/index.ts',
    'other.ts',
    'sections/intro/config.yaml',
    'sections/../index.ts',
    'sections/intro//index.ts',
    'sections/.hidden/index.ts',
    'sections/intro/audio.wav',
    'sections/intro/index.ts.map',
    'specifications/a/index.ts',
  ])
    assert.equal(validateArtifactPath(base + relative, identity), false, relative);
  assert.equal(validateArtifactPath('content/math/data/lessons/5/' + id + '/index.ts', identity), false);
  assert.equal(validateArtifactPath(yaml, identity, 'finalize'), true);
  assert.equal(validateArtifactPath(base + 'questions.yaml', identity, 'finalize'), false);
});

test('HEAD/base/branch/source/parent identity changes reject pinned snapshots', () => {
  const snapshot = { head, branch: 'agent/lesson', base: 'course/example', sourceBlob, identity };
  assert.equal(identicalSnapshot(snapshot, { ...snapshot }), true);
  for (const [field, changed] of [
    ['head', 'a'.repeat(40)],
    ['branch', 'agent/other'],
    ['base', 'main'],
    ['sourceBlob', 'f'.repeat(40)],
    ['identity', { ...identity, id: courseId }],
  ])
    assert.equal(identicalSnapshot(snapshot, { ...snapshot, [field]: changed }), false);
});

function git(root, args) {
  execFileSync('git', args, { cwd: root });
}
function gitFixture(callback) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-materialize-'));
  try {
    git(root, ['init', '-q']);
    const source = path.join(root, yaml);
    fs.mkdirSync(path.dirname(source), { recursive: true });
    fs.writeFileSync(source, 'test: fixture\n');
    git(root, ['add', '--', yaml]);
    git(root, ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.invalid', 'commit', '-qm', 'fixture']);
    return callback({ root, source });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test('manifest rejects stale SHA, unauthorized path, overwrite, duplicate, tampered bytes and missing inventory', () =>
  gitFixture(({ root }) => {
    const meta = {
      number: 710,
      operation: 'materialize',
      repo: 'KiT-Maverik/svitlo',
      identity,
      head,
      sourceBlob: gitBlob('test: fixture\n'),
      base: 'course/example',
      branch: 'agent/lesson',
    };
    const base = yaml.slice(0, -'lesson.yaml'.length);
    const files = ['index.ts', 'constants.ts', 'review.ts', 'methodology.md', 'production-handoff.json'];
    const entries = files.map(name => {
      const bytes = Buffer.from('test ' + name + '\n');
      return {
        path: base + name,
        action: 'create',
        data: bytes.toString('base64'),
        sha256: createHash('sha256').update(bytes).digest('hex'),
      };
    });
    const manifest = {
      version: 1,
      repo: meta.repo,
      pr: meta.number,
      head: meta.head,
      branch: meta.branch,
      base: meta.base,
      operation: meta.operation,
      sourceBlob: meta.sourceBlob,
      identity,
      mode: 'strict',
      entries,
    };
    assert.equal(verifyManifest(manifest, meta, root), 5);
    assert.throws(() => verifyManifest({ ...manifest, sourceBlob: head }, meta, root));
    assert.throws(() => verifyManifest({ ...manifest, entries: entries.slice(1) }, meta, root));
    assert.throws(() => verifyManifest({ ...manifest, entries: [...entries, entries[0]] }, meta, root));
    assert.throws(() =>
      verifyManifest(
        { ...manifest, entries: [{ ...entries[0], path: base + 'questions/index.ts' }, ...entries.slice(1)] },
        meta,
        root,
      ),
    );
    assert.throws(() =>
      verifyManifest(
        { ...manifest, entries: [{ ...entries[0], sha256: '0'.repeat(64) }, ...entries.slice(1)] },
        meta,
        root,
      ),
    );
    assert.throws(() =>
      verifyManifest({ ...manifest, entries: [{ ...entries[0], action: 'delete' }, ...entries.slice(1)] }, meta, root),
    );
    const finalizeMeta = { ...meta, operation: 'finalize' };
    const finalize = { ...manifest, operation: 'finalize', entries: [{ path: yaml, action: 'delete' }] };
    assert.equal(verifyManifest(finalize, finalizeMeta, root), 1);
    assert.throws(() =>
      verifyManifest({ ...finalize, entries: [{ path: base + 'index.ts', action: 'delete' }] }, finalizeMeta, root),
    );
    fs.writeFileSync(path.join(root, entries[0].path), Buffer.from(entries[0].data, 'base64'));
    git(root, ['add', '--', entries[0].path]);
    assert.throws(() => verifyManifest(manifest, meta, root), /overwritten/);
  }));

test('special Git symlinks/submodules and modified files are not materializable inputs', () =>
  gitFixture(({ root }) => {
    const symlink = path.join(root, pkg, 'malicious-link');
    fs.symlinkSync('../../.github', symlink);
    git(root, ['add', '--', pkg + '/malicious-link']);
    assert.throws(() => trackedFiles(root, pkg), /Symlink\/submodule/);
    fs.rmSync(symlink);
    git(root, ['rm', '-q', '--cached', pkg + '/malicious-link']);
    fs.writeFileSync(path.join(root, pkg, 'unexpected.txt'), 'unexpected\n');
    assert.equal(changedFiles(root).has(pkg + '/unexpected.txt'), true);
  }));

test('finalize rejects uncommitted or edited generated source instead of deleting YAML', () =>
  gitFixture(({ root, source }) => {
    const folder = path.dirname(source);
    for (const filename of ['index.ts', 'constants.ts', 'review.ts', 'methodology.md', 'production-handoff.json'])
      fs.writeFileSync(path.join(folder, filename), '// uncommitted\n');
    const meta = { number: 710, identity, sourceBlob: gitBlob(fs.readFileSync(source)) };
    assert.throws(
      () => verifyMaterializedForFinalize(root, meta, source, { handoff: '{}' }),
      /committed materialized Lesson file/,
    );
    assert.equal(fs.existsSync(source), true);
  }));

test('source-preserving strict transfer keeps YAML and never creates independent bank directories', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-lesson-trusted-schema-'));
  const lesson = '00000000-0000-4000-8000-000000000012';
  const source = path.join(root, 'content/math/data/lessons/2', lesson, 'lesson.yaml');
  try {
    fs.mkdirSync(path.dirname(source), { recursive: true });
    fs.writeFileSync(path.join(root, 'content/math/package.json'), '{"name":"@svitlo/math"}\n');
    const doc = {
      config: {
        id: lesson,
        slug: 'exampleLesson',
        type: 'lesson',
        skills: [],
        params: {
          languages: ['en'],
          quizRequiredForCompletion: false,
          sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
        },
        locale: { title: { en: 'Example' } },
        section: {
          items: {
            intro: {
              config: {
                id: '00000000-0000-4000-8000-000000000013',
                slug: 'intro',
                type: 'content',
                params: {},
                locale: { title: { en: 'Introduction' }, navigationLabel: { en: 'Start' } },
                content: {
                  items: {
                    hello: {
                      config: {
                        id: '00000000-0000-4000-8000-000000000014',
                        slug: 'hello',
                        type: 'text',
                        params: {},
                        locale: { value: { en: 'The sun lights our world.' } },
                      },
                    },
                  },
                  order: ['hello'],
                },
              },
            },
          },
          order: ['intro'],
        },
      },
      production: {
        documentLanguage: 'en',
        methodology: '# Reviewed methodology\n\nFull learning goals and teaching intent.',
        quizRequired: false,
        flashcardsRequired: false,
      },
    };
    fs.writeFileSync(source, YAML.stringify(doc));
    const original = fs.readFileSync(source);
    assert.equal(chooseMode(source, root, repoRoot).kind, 'strict');
    const result = finalizeLesson(source, {
      repo: root,
      retainSource: true,
      validate: (location, repo) =>
        preflightLesson(location, repo, {
          schemaRepo: repoRoot,
        }),
    });
    assert.equal(result.removed, null);
    assert.equal(fs.readFileSync(source).equals(original), true);
    for (const file of ['index.ts', 'constants.ts', 'review.ts', 'methodology.md', 'production-handoff.json'])
      assert.equal(fs.existsSync(path.join(path.dirname(source), file)), true, file);
    for (const dirname of ['questions', 'flashcards'])
      assert.equal(fs.existsSync(path.join(path.dirname(source), dirname)), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('workflow runs trusted default branch code only and isolates publish permission', () => {
  const workflow = YAML.parse(
    fs.readFileSync(
      fileURLToPath(new URL('../../../.github/workflows/lesson-materialization.yml', import.meta.url)),
      'utf8',
    ),
  );
  assert.deepEqual(workflow.permissions, {});
  assert.deepEqual(workflow.on.issue_comment.types, ['created']);
  assert.equal(workflow.jobs.resolve.permissions.contents, 'read');
  assert.equal(workflow.jobs.analyze.permissions.contents, 'read');
  assert.equal(workflow.jobs.publish.permissions.contents, 'write');
  assert.equal(workflow.jobs.publish.permissions['pull-requests'], 'read');
  assert.match(
    workflow.jobs.analyze.steps.find(step => step['working-directory'] === 'trusted')?.run ?? '',
    /--ignore-scripts/,
  );
  assert(workflow.jobs.analyze.steps.some(step => step.run?.includes('lesson-materialization.mjs analyze')));
  assert(workflow.jobs.publish.steps.some(step => step.run?.includes('lesson-materialization.mjs publish')));
  assert(!workflow.jobs['register-lessons']);
});

test('trusted Lesson publisher installs dependencies before loading the Engine verifier', () => {
  const workflow = fs.readFileSync(
    fileURLToPath(new URL('../../../.github/workflows/lesson-materialization.yml', import.meta.url)),
    'utf8',
  );
  const publish = workflow.split('\n  publish:\n')[1];
  assert.ok(publish, 'Lesson materialization must retain an isolated publish job');
  const installAt = publish.indexOf('name: Install trusted publisher dependencies without lifecycle scripts');
  const executeAt = publish.indexOf('name: Revalidate authorization, artifact bytes and SHA race');
  assert.ok(installAt >= 0 && executeAt > installAt, 'publisher dependencies must be installed before verification');
  const install = publish.slice(installAt, executeAt);
  assert.match(install, /working-directory: trusted/);
  assert.match(install, /npm ci --ignore-scripts --no-audit --no-fund/);
  assert.doesNotMatch(install, /GH_TOKEN|github\.token/, 'dependency installation must not receive the write token');
});
