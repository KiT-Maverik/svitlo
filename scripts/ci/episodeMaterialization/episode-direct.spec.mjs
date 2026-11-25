import assert from 'node:assert/strict';
import test from 'node:test';
import { composeEpisodeDirectPlan } from './episode-source.mjs';
import { parseEpisodeHandoff } from './episode-source.mjs';
import { deriveCourseEntityId } from '../../../shared/engine/generators/materializers/course/deriveCourseEntityId.mjs';
import { buildEpisodeManifest, episodeCommitTree, checkEpisodeTargets } from './episode-transaction.mjs';
const courseId = '663572e7-bd85-4516-86e2-3de07d209e03';
const episodeId = deriveCourseEntityId(courseId, 'episode', 'episodeOne');
const courseRoot = 'content/playground/data/courses/3/' + courseId;
const placement = 'content/episodeOne';
const handoff = {
  config: { id: episodeId, type: 'episode', slug: 'episodeOne' },
  production: {
    focus: 'Narrative change',
    purpose: 'Review the sequence',
    languages: { document: 'uk', planned: ['uk'] },
  },
};
const reviewed = {
  config: {
    ...handoff.config,
    locale: { title: { uk: 'Дія' } },
    section: {
      items: {
        intro: {
          config: {
            id: '663572e7-bd85-4516-86e2-3de07d209e05',
            type: 'content',
            slug: 'intro',
            params: {},
            locale: { title: { uk: 'Початок' }, navigationLabel: { uk: 'Початок' } },
            content: { items: {}, order: [] },
          },
        },
      },
      order: ['intro'],
    },
  },
  production: {
    ...handoff.production,
    scenario: {
      audience: 'Learners',
      entrySituation: 'Before',
      exitSituation: 'After',
      continuity: 'Next',
      sceneIntent: 'Illustrate',
      interactionIntent: 'Explore',
      accessibility: 'Text',
      narrativeConstraints: 'No Quiz',
    },
    specification: 'Complete reviewed source',
  },
};
const meta = {
  courseRoot,
  placement,
  courseId,
  episodeId,
  parentPath: courseRoot + '/index.ts',
  sourcePath: courseRoot + '/' + placement + '/draft.ts',
  sourceBlobSha: 'b'.repeat(40),
  head: 'c'.repeat(40),
};
const stubSource =
  "import { defineEpisodeStub } from '@svitlo/engine/build';\n" +
  '// TODO (BLOCKER): Complete and validate Episode resources, then have the Coding Agent integrate the Configurator and delete this stub.\n' +
  'export const stub = defineEpisodeStub({ id: ' +
  JSON.stringify(episodeId) +
  ', slug: "episodeOne" });\n';
const parent =
  "import { defineCourse, defineLessonStub } from '@svitlo/engine/build';\n" +
  'import { stub as child_episodeOne } from "./content/episodeOne/stub";\n' +
  'const content = { items: { ' +
  '"before": defineLessonStub({ id: "00000000-0000-4000-8000-000000000001", slug: "before" }), ' +
  '"episodeOne": child_episodeOne, ' +
  '"after": defineLessonStub({ id: "00000000-0000-4000-8000-000000000002", slug: "after" }) ' +
  '}, order: ["before", "episodeOne", "after"] };\n' +
  'export const demo = defineCourse({ id: ' +
  JSON.stringify(courseId) +
  ', slug: "demo", type: "course", params: {}, locale: { title: "Test", description: "Test" }, content });\n';
test('trusted Episode plan creates only owned source and retains Course parent/stub', () => {
  const worker = {
    episodeId, exportName: 'episodeOne', publishable: false, diagnostics: [],
    files: [{ path: placement + '/index.ts', kind: 'typescript', content: 'export const episodeOne = 1;\n' }],
  };
  const combined = composeEpisodeDirectPlan(handoff, reviewed, meta, parent, stubSource, worker);
  assert.equal(combined.episodeId, episodeId);
  assert.equal(combined.sourceExportName, 'episodeOne');
  assert.deepEqual(combined.files.map(file => file.path), [courseRoot + '/' + placement + '/index.ts']);
  const manifest = buildEpisodeManifest(meta, combined);
  assert.deepEqual(manifest.entries.map(file => file.path), [courseRoot + '/' + placement + '/index.ts']);
  assert.deepEqual(episodeCommitTree(manifest).filter(entry => entry.sha === null).map(entry => entry.path), [meta.sourcePath]);
  assert.match(parent, /import \{ stub as child_episodeOne \} from "\.\/content\/episodeOne\/stub";/);
  assert.match(stubSource, new RegExp(episodeId));
  for (const changed of [
    parent.replace('stub as child_episodeOne', 'stub as child_other'),
    parent.replace('"episodeOne": child_episodeOne', '"episodeOne": unreviewed'),
    parent.replace('order: ["before", "episodeOne", "after"]', 'order: ["before", "after"]'),
  ])
    assert.throws(() => composeEpisodeDirectPlan(handoff, reviewed, meta, changed, stubSource, worker));
  assert.throws(
    () => composeEpisodeDirectPlan(handoff, reviewed, meta, parent, stubSource, { ...worker, episodeId: courseId }),
    /invalid source plan/,
  );
  assert.throws(
    () => composeEpisodeDirectPlan(handoff, { ...reviewed, config: { ...reviewed.config, id: courseId } }, meta, parent, stubSource, worker),
    /preserve/,
  );
});

test('Episode Scene six-file drafts stay in textbook Scene tree with create-only publisher guards', () => {
  const sceneId = '11111111-1111-4111-8111-11111111111a';
  const scenePath = 'content/playground/scenes/a/' + sceneId + '/';
  const component = 'IntroScene';
  const leaves = [
    'index.ts',
    component + '.tsx',
    component + '.module.css',
    component + '.constants.ts',
    component + '.stories.tsx',
    component + '.unit.spec.tsx',
  ];
  const scoped = {
    ...meta,
    textbookRoot: 'content/playground',
    parentBlobSha: 'd'.repeat(40),
    stubBlobSha: 'e'.repeat(40),
  };
  const worker = {
    episodeId,
    exportName: 'episodeOne',
    publishable: false,
    diagnostics: [],
    files: [
      { path: placement + '/index.ts', kind: 'typescript', content: 'export const episodeOne = 1;\n' },
      ...leaves.map(leaf => ({
        path: scenePath + leaf,
        kind: leaf.endsWith('.css') ? 'code' : 'typescript',
        content: '// TODO (BLOCKER): Implement this Scene resource.\n',
      })),
    ],
  };
  const plan = composeEpisodeDirectPlan(handoff, reviewed, scoped, parent, stubSource, worker);
  const tree = new Map([
    [scoped.sourcePath, { type: 'blob', mode: '100644', sha: scoped.sourceBlobSha }],
    [scoped.parentPath, { type: 'blob', mode: '100644', sha: scoped.parentBlobSha }],
    [scoped.sourcePath.replace(/draft\.ts$/, 'stub.ts'), { type: 'blob', mode: '100644', sha: scoped.stubBlobSha }],
  ]);
  assert(plan.files.some(f => f.path === scenePath + component + '.tsx'));
  assert.doesNotThrow(() => checkEpisodeTargets(scoped, plan.files, tree));
  assert.throws(
    () =>
      checkEpisodeTargets(
        scoped,
        plan.files.filter(f => f.path !== scenePath + component + '.module.css'),
        tree,
      ),
    /six-file scaffold/,
  );
  assert.throws(
    () =>
      checkEpisodeTargets(
        scoped,
        plan.files,
        new Map([...tree, [scenePath + 'index.ts', { type: 'blob', mode: '100644', sha: 'f'.repeat(40) }]]),
      ),
    /overwrite existing/,
  );
});

test('canonical Course-generated Episode handoff is JSON in an exact TypeScript wrapper, never executable code', () => {
  const original =
    '// TODO (BLOCKER): Episode Stage 1 handoff; scenario is not yet authored or reviewed.\n' +
    "import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';\n\n" +
    'export const episodeStage1 = ' +
    JSON.stringify(handoff, null, 2) +
    ' as const satisfies EpisodeWorkflowStage1Handoff;\n';
  assert.deepEqual(parseEpisodeHandoff(original), handoff);
  const guarded = original.replace(
    'export const episodeStage1 = ',
    '// prettier-ignore\nexport const episodeStage1 = ',
  );
  assert.deepEqual(parseEpisodeHandoff(guarded), handoff);
  assert.deepEqual(parseEpisodeHandoff(guarded.replace('// prettier-ignore', '// editorial context')), handoff);
  assert.throws(() => parseEpisodeHandoff(original.replace('as const satisfies', 'as never satisfies')));
  assert.throws(() => parseEpisodeHandoff(original + 'process.exit(1);'));
});
