import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { gitBlob } from '../courseMaterialization/course-gate.mjs';
import { discoverEpisodeDraft, inspectEpisode, discoverOwningCourse } from './episode-gate.mjs';
import { parseEpisodeDraft, verifyEpisodeHandoff, restoreEpisodePlacement } from './episode-source.mjs';
import {
  prepareEpisode,
  episodeCommitTree,
  checkEpisodeTargets,
  parseEpisodeMetadata,
  sameMeta,
} from './episode-transaction.mjs';

const courseId = '663572e7-bd85-4516-86e2-3de07d209e03';
const episodeId = '663572e7-bd85-4516-86e2-3de07d209e04';
const sectionId = '663572e7-bd85-4516-86e2-3de07d209e05';
const blockId = '663572e7-bd85-4516-86e2-3de07d209e06';
const root = 'content/playground/data/courses/3/' + courseId;
const placement = 'content/episodeOne';
const sourcePath = root + '/' + placement + '/draft.ts';
const parentPath = root + '/index.ts';
const identity = discoverEpisodeDraft([{ filename: sourcePath, status: 'modified' }]);
const handoff = {
  config: { type: 'episode', slug: 'episodeOne', id: episodeId },
  production: {
    focus: 'Reviewed sky observation',
    purpose: 'Introduce a narrative transition',
    placement: { courseId, path: placement, orderPath: [0], reviewedCourseSourceBlobSha: 'a'.repeat(40) },
    languages: { document: 'uk', planned: ['uk', 'en'] },
  },
};
function reviewed() {
  return {
    config: {
      ...handoff.config,
      locale: { title: { uk: 'Пригода' } },
      section: {
        items: {
          intro: {
            config: {
              type: 'content',
              slug: 'intro',
              id: sectionId,
              params: {},
              locale: { title: { uk: 'Вступ' }, navigationLabel: { uk: 'Вступ' } },
              content: {
                items: {
                  greeting: {
                    config: {
                      type: 'text',
                      slug: 'greeting',
                      id: blockId,
                      params: { variables: {} },
                      locale: { value: { uk: 'Поглянь на небо' } },
                    },
                  },
                },
                order: ['greeting'],
              },
            },
          },
        },
        order: ['intro'],
      },
    },
    production: {
      ...structuredClone(handoff.production),
      scenario: {
        audience: 'Beginners',
        entrySituation: 'Arrival',
        exitSituation: 'Observation',
        continuity: 'Connect to the next Lesson',
        sceneIntent: 'Explain the setting',
        interactionIntent: 'Read and reflect',
        accessibility: 'Keyboard and screen reader',
        narrativeConstraints: 'No unrelated assessment',
      },
      specification: 'Reviewed source-language narrative',
    },
  };
}
const source = (value, type) =>
  'import type { ' +
  type +
  " } from '@svitlo/engine/build';\n" +
  'export const episode = ' +
  JSON.stringify(value, null, 2) +
  ' satisfies ' +
  type +
  ';\n';
const initial = source(handoff, 'EpisodeWorkflowStage1Handoff');
const completed = () => source(reviewed(), 'EpisodeWorkflowMaterializerInput');
const row = { path: placement, slug: 'episodeOne', episodeId, handoffPath: placement + '/draft.ts', orderIndex: 0 };
const marker = (order, rows) =>
  '// TODO (BLOCKER): Episode Stage 1 handoffs are not completed Episode Configurators. Do not publish.\n' +
  '// Reviewed original content order: ' +
  JSON.stringify(order) +
  '\n// Pending Episode handoffs: ' +
  JSON.stringify(rows) +
  '\n';
const parentSource =
  "import { defineCourse } from '@svitlo/engine/build';\n" +
  "import type { SupportedLanguages } from '@svitlo/engine/build';\n" +
  "const languages = ['uk'] as const satisfies SupportedLanguages;\n" +
  'const content = { items: {}, order: [] };\n' +
  marker(['episodeOne'], [row]) +
  "export const sky = defineCourse<'sky', typeof content.items, typeof languages>({" +
  "id:'" +
  courseId +
  "',slug:'sky',type:'course',params:{languages},locale:{title:{uk:'Небо'},description:{uk:'Спостереження'}},content});\n";
test('Episode gate discovers all supported levels and refuses unrelated paths or file changes', () => {
  for (const relative of [
    'content/episode',
    'content/module/episode',
    'content/chapter/episode',
    'content/module/chapter/episode',
  ]) {
    const found = discoverEpisodeDraft([{ filename: root + '/' + relative + '/draft.ts', status: 'modified' }]);
    assert.equal(found.placement, relative);
    assert.equal(
      found.parentPath,
      relative.split('/').length === 2
        ? root + '/index.ts'
        : root + '/' + relative.split('/').slice(0, -1).join('/') + '/index.ts',
    );
  }
  for (const files of [
    [],
    [{ filename: sourcePath, status: 'added' }],
    [
      { filename: sourcePath, status: 'modified' },
      { filename: 'README.md', status: 'modified' },
    ],
    [{ filename: root + '/content/../episode/draft.ts', status: 'modified' }],
    [{ filename: root + '/content/episode/index.ts', status: 'modified' }],
    [{ filename: root + '/content/module/chapter/nested/episode/draft.ts', status: 'modified' }],
  ])
    assert.throws(() => discoverEpisodeDraft(files));
});
test('drafts are inert and immutable allocated identity, locale plan and intent are enforced', () => {
  const original = parseEpisodeDraft(initial, 'EpisodeWorkflowStage1Handoff');
  const final = parseEpisodeDraft(completed(), 'EpisodeWorkflowMaterializerInput');
  assert.equal(verifyEpisodeHandoff(original, final, identity), true);
  assert.equal(
    Object.getPrototypeOf(final.config.section.items.intro.config.content.items.greeting.config.params),
    Object.prototype,
  );
  for (const changed of [
    { ...final, config: { ...final.config, id: courseId } },
    { ...final, production: { ...final.production, focus: 'Different intent' } },
    { ...final, production: { ...final.production, languages: { document: 'en', planned: ['en'] } } },
    { ...final, production: { ...final.production, placement: { ...final.production.placement, orderPath: [9] } } },
    { ...final, config: { ...final.config, section: { items: {}, order: [] } } },
  ])
    assert.throws(() => verifyEpisodeHandoff(original, changed, identity));
  assert.throws(
    () => parseEpisodeDraft('const dormant = process.exit(1);\n' + completed(), 'EpisodeWorkflowMaterializerInput'),
    /Non-literal/,
  );
  assert.throws(() => parseEpisodeDraft("import 'evil';\n" + completed(), 'EpisodeWorkflowMaterializerInput'), /inert/);
  assert.throws(() =>
    parseEpisodeDraft(
      completed().replace('satisfies EpisodeWorkflowMaterializerInput', 'as EpisodeWorkflowMaterializerInput'),
      'EpisodeWorkflowMaterializerInput',
    ),
  );
});
test('restoration reinserts the exact reserved slot, preserves sibling order and blockers', () => {
  const second = {
    path: 'content/other',
    slug: 'other',
    episodeId: courseId,
    handoffPath: 'content/other/draft.ts',
    orderIndex: 2,
  };
  const original =
    "import { lesson } from './content/lesson';\nconst content = { items: { lesson: lesson }, order: ['lesson'] };\n" +
    marker(['episodeOne', 'lesson', 'other'], [row, second]) +
    '// TODO (BLOCKER): Human check remains.\n';
  const output = restoreEpisodePlacement(original, row, 'episodeOne', { rootParent: true });
  assert.match(output, /import \{ episodeOne as child_episodeOne \} from "\.\/content\/episodeOne"/);
  assert.match(output, /order: \["episodeOne","lesson"\]/);
  assert.match(output, /Pending Episode handoffs:.*content\/other/);
  assert.match(output, /Human check remains/);
  assert.throws(() => restoreEpisodePlacement(output, row, 'episodeOne', { rootParent: true }));
  assert.throws(
    () => restoreEpisodePlacement(original, { ...row, orderIndex: 1 }, 'episodeOne', { rootParent: true }),
    /identity\/order/,
  );
});
function gitFixture(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-episode-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const git = (...args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8' }).trim();
  const write = (file, body) => {
    const f = path.join(dir, file);
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, body);
  };
  git('init', '-q');
  git('config', 'user.name', 'Episode test');
  git('config', 'user.email', 'episode@example.test');
  write(sourcePath, initial);
  write(parentPath, parentSource);
  git('add', '.');
  git('commit', '-qm', 'Course handoff');
  const parentHead = git('rev-parse', 'HEAD');
  write(sourcePath, completed());
  git('add', '.');
  git('commit', '-qm', 'Reviewed Episode');
  const head = git('rev-parse', 'HEAD');
  const meta = {
    ...identity,
    head,
    parentHead,
    sourceBlobSha: gitBlob(completed()),
    handoffBlobSha: gitBlob(initial),
    parentBlobSha: gitBlob(parentSource),
  };
  return { dir, git, write, meta };
}
test('trusted Stage 5 uses real renderers and semantic Engine checks; tree deletes only consumed draft', t => {
  const { dir, meta, git } = gitFixture(t);
  const result = prepareEpisode(meta, dir);
  assert.deepEqual(result, prepareEpisode(meta, dir));
  assert.equal(result.episodeId, episodeId);
  assert.equal(result.publishable, false);
  const entries = episodeCommitTree(result);
  const removed = entries.filter(entry => entry.sha === null);
  assert.deepEqual(removed, [{ path: sourcePath, mode: '100644', type: 'blob', sha: null }]);
  const index = entries.find(entry => entry.path === sourcePath.replace('draft.ts', 'index.ts')).content;
  assert.match(index, /defineEpisode/);
  assert.match(index, /Human Media Generation Stage 9/);
  assert.match(index, /Human QA Stage 10/);
  const parent = entries.find(entry => entry.path === parentPath).content;
  assert.match(parent, /child_episodeOne/);
  assert.match(parent, /order: \["episodeOne"\]/);
  assert.doesNotMatch(parent, /Pending Episode handoffs/);
  assert.ok(
    entries.some(
      entry => entry.path.endsWith('/content/items/greeting/index.ts') && entry.content.includes('Поглянь на небо'),
    ),
  );
  assert.equal(git('rev-parse', 'HEAD'), meta.head);
  assert.equal(git('status', '--porcelain'), '');
  assert.equal(fs.readFileSync(path.join(dir, sourcePath), 'utf8'), completed());
});
test('stale pinned source, dirty checkout, extra paths, existing target and symlink fail before Git writes', t => {
  const { dir, meta, git, write } = gitFixture(t);
  assert.throws(() => prepareEpisode({ ...meta, head: 'b'.repeat(40) }, dir), /pinned/);
  assert.throws(() => prepareEpisode({ ...meta, sourceBlobSha: 'c'.repeat(40) }, dir), /Git tree/);
  write('unrelated.ts', 'export const x=1;');
  assert.throws(() => prepareEpisode(meta, dir), /clean/);
  git('add', '.');
  git('commit', '-qm', 'Unexpected file');
  const head = git('rev-parse', 'HEAD');
  assert.throws(() => prepareEpisode({ ...meta, head }, dir), /exactly/);
  const file = sourcePath.replace('draft.ts', 'index.ts');
  const tree = new Map([
    [sourcePath, { type: 'blob', mode: '100644', sha: meta.sourceBlobSha }],
    [parentPath, { type: 'blob', mode: '100644', sha: meta.parentBlobSha }],
  ]);
  const files = [
    { path: file, kind: 'typescript', content: 'index' },
    { path: parentPath, kind: 'typescript', content: 'parent' },
  ];
  assert.equal(checkEpisodeTargets(meta, files, tree), true);
  for (const entry of [
    { type: 'blob', mode: '100644' },
    { type: 'blob', mode: '120000' },
  ]) {
    assert.throws(() => checkEpisodeTargets(meta, files, new Map([...tree, [file, entry]])), /overwrite/);
  }
  assert.throws(
    () => checkEpisodeTargets(meta, [...files, { path: 'README.md', kind: 'markdown', content: 'bad' }], tree),
    /Invalid/,
  );
  assert.equal(fs.readFileSync(path.join(dir, sourcePath), 'utf8'), completed());
});

test('Episode Stage 5 ignores editorial prose and verifies pinned blobs and current ancestry', async () => {
  const repo = 'KiT-Maverik/svitlo';
  const head = 'a'.repeat(40);
  const parentHead = 'b'.repeat(40);
  const blob = 'd'.repeat(40);
  const handoffBlob = 'e'.repeat(40);
  const parentBlob = 'f'.repeat(40);
  const pr = {
    state: 'open',
    draft: true,
    user: { login: 'owner' },
    head: { sha: head, ref: 'episode/one', repo: { full_name: repo } },
    base: { sha: parentHead, ref: 'course/sky', repo: { full_name: repo } },
  };
  const parent = {
    state: 'open',
    head: { sha: parentHead, ref: 'course/sky', repo: { full_name: repo } },
    base: { ref: 'develop', repo: { full_name: repo } },
  };
  const previous = globalThis.fetch;
  const env = Object.fromEntries(
    ['GITHUB_REPOSITORY', 'COURSE_DEFAULT_BRANCH', 'GH_TOKEN'].map(key => [key, process.env[key]]),
  );
  Object.assign(process.env, { GITHUB_REPOSITORY: repo, COURSE_DEFAULT_BRANCH: 'develop', GH_TOKEN: 'fixture' });
  let ancestor = true;
  let files = [{ filename: sourcePath, status: 'modified' }];
  let resourcePatch = {};
  let prPatch = {};
  let parentPatch = {};
  let changeDuringDiscovery = {};
  let changeParentDuringDiscovery = {};
  let prReads = 0;
  let parentReads = 0;
  globalThis.fetch = async url => {
    const route = String(url).split('/repos/' + repo + '/')[1];
    let payload;
    if (route === 'pulls/810') {
      prReads++;
      payload = { ...pr, ...prPatch, ...(prReads % 2 === 0 ? changeDuringDiscovery : {}) };
    } else if (route === 'pulls/808') {
      parentReads++;
      payload = { ...parent, ...parentPatch, ...(parentReads % 2 === 0 ? changeParentDuringDiscovery : {}) };
    } else if (route === 'pulls/810/files?per_page=100') payload = files;
    else if (route === 'compare/' + parentHead + '...' + head)
      payload = { status: ancestor ? 'ahead' : 'diverged', merge_base_commit: { sha: ancestor ? parentHead : head } };
    else if (route.startsWith('contents/')) {
      const [filename, commit] = route.slice('contents/'.length).split('?ref=');
      payload = {
        type: 'file',
        path: filename,
        size: 100,
        sha: commit === head ? blob : filename === sourcePath ? handoffBlob : parentBlob,
        ...resourcePatch,
      };
    } else throw Error('Unexpected GitHub API: ' + route);
    return { ok: true, status: 200, json: async () => payload };
  };
  try {
    const verified = await inspectEpisode(810, 808);
    assert.equal(verified.sourceBlobSha, blob);
    assert.equal(verified.handoffBlobSha, handoffBlob);
    assert.equal(verified.parentBlobSha, parentBlob);
    assert.equal(verified.head, head);
    assert.equal(verified.parentHead, parentHead);
    const meta = { ...verified, actor: 'owner' };
    const encode = value => Buffer.from(JSON.stringify(value)).toString('base64');
    assert.deepEqual(parseEpisodeMetadata(encode(meta)), meta);
    assert.equal(sameMeta(verified, meta), true);
    for (const key of ['head', 'parentHead', 'sourceBlobSha', 'handoffBlobSha', 'parentBlobSha']) {
      assert.equal(sameMeta({ ...verified, [key]: 'c'.repeat(40) }, meta), false);
      assert.throws(() => parseEpisodeMetadata(encode({ ...meta, [key]: 'invalid' })), /Invalid pinned/);
    }
    for (const body of [
      '',
      'Unrelated prose',
      '- [ ] Independent review',
      '- Review evidence (v1): 4 | rejected | ' + head + ' | ' + blob,
      '- Review evidence (v1): 4 | accepted | ' + parentHead + ' | ' + handoffBlob,
    ]) {
      pr.body = body;
      parent.body = body;
      assert.deepEqual(await inspectEpisode(810, 808, verified), verified);
    }
    prReads = 0;
    parentReads = 0;
    changeDuringDiscovery = { body: 'Changed prose' };
    changeParentDuringDiscovery = { body: 'Changed parent prose' };
    assert.deepEqual(await inspectEpisode(810, 808, verified), verified);
    changeDuringDiscovery = {};
    changeParentDuringDiscovery = {};

    await assert.rejects(inspectEpisode(810, 808, { ...verified, head: parentHead }), /HEAD changed/);
    await assert.rejects(inspectEpisode(810, 808, { ...verified, parentHead: head }), /HEAD changed/);
    ancestor = false;
    await assert.rejects(inspectEpisode(810, 808), /exact current owning Course HEAD/);
    ancestor = true;
    files = [...files, { filename: 'README.md', status: 'modified' }];
    await assert.rejects(inspectEpisode(810, 808), /modify only/);
    files = [{ filename: sourcePath, status: 'modified' }];
    for (const invalid of [
      { sha: 'invalid' },
      { size: 0 },
      { size: 2 * 1024 * 1024 + 1 },
      { type: 'symlink' },
      { path: 'README.md' },
    ]) {
      resourcePatch = invalid;
      await assert.rejects(inspectEpisode(810, 808), /Missing or invalid pinned source/);
    }
    resourcePatch = {};
    for (const invalid of [
      { draft: false },
      { state: 'closed' },
      { head: { ...pr.head, repo: { full_name: 'fork/svitlo' } } },
      { base: { ...pr.base, sha: head } },
      { base: { ...pr.base, ref: 'wrong/course' } },
      { base: { ...pr.base, repo: { full_name: 'fork/svitlo' } } },
    ]) {
      prPatch = invalid;
      await assert.rejects(inspectEpisode(810, 808), /same-repository Draft Episode PR/);
    }
    prPatch = {};
    parentPatch = { state: 'closed' };
    await assert.rejects(inspectEpisode(810, 808), /same-repository Draft Episode PR/);
    parentPatch = {};
    for (const invalid of [
      { draft: false },
      { head: { ...pr.head, sha: 'c'.repeat(40) } },
      { base: { ...pr.base, sha: 'c'.repeat(40) } },
    ]) {
      prReads = 0;
      changeDuringDiscovery = invalid;
      await assert.rejects(inspectEpisode(810, 808), /changed during source discovery/);
    }
    changeDuringDiscovery = {};
    parentReads = 0;
    changeParentDuringDiscovery = { head: { ...parent.head, sha: 'c'.repeat(40) } };
    await assert.rejects(inspectEpisode(810, 808), /changed during source discovery/);
  } finally {
    globalThis.fetch = previous;
    for (const [key, value] of Object.entries(env)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test('Episode comment discovers exactly one current owning Course PR without description parsing', async () => {
  const repo = 'KiT-Maverik/svitlo';
  const sha = 'a'.repeat(40);
  const branch = 'course/sky';
  const previous = globalThis.fetch;
  const env = Object.fromEntries(
    ['GITHUB_REPOSITORY', 'COURSE_DEFAULT_BRANCH', 'GH_TOKEN'].map(key => [key, process.env[key]]),
  );
  Object.assign(process.env, { GITHUB_REPOSITORY: repo, COURSE_DEFAULT_BRANCH: 'develop', GH_TOKEN: 'fixture' });
  const pr = {
    state: 'open',
    draft: true,
    body: 'irrelevant',
    head: { repo: { full_name: repo } },
    base: { ref: branch, sha, repo: { full_name: repo } },
  };
  const parent = {
    number: 41,
    state: 'open',
    head: { ref: branch, sha, repo: { full_name: repo } },
    base: { ref: 'develop', repo: { full_name: repo } },
  };
  let candidates = [parent];
  globalThis.fetch = async url => {
    const route = String(url).split('/repos/' + repo + '/')[1];
    let payload;
    if (route === 'pulls/42') payload = pr;
    else if (route === 'pulls?state=open&head=KiT-Maverik%3Acourse%2Fsky&base=develop&per_page=100&page=1')
      payload = candidates;
    else throw Error('Unexpected GitHub API: ' + route);
    return { ok: true, status: 200, json: async () => payload };
  };
  try {
    assert.equal(await discoverOwningCourse(42), 41);
    for (const invalid of [
      [],
      [parent, { ...parent, number: 43 }],
      [{ ...parent, head: { ...parent.head, sha: 'b'.repeat(40) } }],
      [{ ...parent, head: { ...parent.head, repo: { full_name: 'fork/svitlo' } } }],
      [{ ...parent, state: 'closed' }],
    ]) {
      candidates = invalid;
      await assert.rejects(discoverOwningCourse(42), /Exactly one open owning Course/);
    }
  } finally {
    globalThis.fetch = previous;
    for (const [key, value] of Object.entries(env)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
