import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { gitBlob } from '../courseMaterialization/course-gate.mjs';
import { discoverEpisodeDraft } from './episode-gate.mjs';
import { parseEpisodeDraft, verifyEpisodeHandoff, restoreEpisodePlacement } from './episode-source.mjs';
import { prepareEpisode, episodeCommitTree, checkEpisodeTargets } from './episode-transaction.mjs';

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
test('stale review, dirty checkout, extra paths, existing target and symlink fail before Git writes', t => {
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
