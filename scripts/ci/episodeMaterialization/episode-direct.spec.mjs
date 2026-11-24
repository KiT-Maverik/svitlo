import assert from 'node:assert/strict';
import test from 'node:test';
import { composeEpisodeDirectPlan } from './episode-source.mjs';
import { verifyReservedEpisodeParent } from './episode-parent-verify.mjs';
import { parseEpisodeHandoff } from './episode-source.mjs';
import { buildEpisodeManifest, episodeCommitTree } from './episode-transaction.mjs';
const courseId = '663572e7-bd85-4516-86e2-3de07d209e03';
const episodeId = '663572e7-bd85-4516-86e2-3de07d209e04';
const courseRoot = 'content/playground/data/courses/3/' + courseId;
const placement = 'content/episodeOne';
const handoff = {
  config: { id: episodeId, type: 'episode', slug: 'episodeOne' },
  production: {
    focus: 'Narrative change', purpose: 'Review the sequence',
    placement: { courseId, path: placement, orderPath: [0], reviewedCourseSourceBlobSha:'a'.repeat(40) },
    languages: { document: 'uk', planned: ['uk'] },
  },
};
const reviewed = {
  config: {
    ...handoff.config,
    locale: { title: { uk: 'Дія' } },
    section: { items: { intro: {
      config: { id:'663572e7-bd85-4516-86e2-3de07d209e05',type:'content',slug:'intro',
        params:{},locale:{title:{uk:'Початок'},navigationLabel:{uk:'Початок'}},
        content:{ items:{},order:[] } },
    } },order:['intro'] },
  },
  production: {
    ...handoff.production,
    scenario: { audience:'Learners',entrySituation:'Before',exitSituation:'After',continuity:'Next',
      sceneIntent:'Illustrate',interactionIntent:'Explore',accessibility:'Text',narrativeConstraints:'No Quiz' },
    specification:'Complete reviewed source',
  },
};
const meta = {
  courseRoot, placement, courseId, episodeId,
  parentPath:courseRoot+'/index.ts',sourcePath:courseRoot+'/'+placement+'/draft.ts',
  sourceBlobSha:'b'.repeat(40),head:'c'.repeat(40),
};
const marker = '// TODO (BLOCKER): Episode Stage 1 handoffs are not completed Episode Configurators. Do not publish.\n' +
  '// Reviewed original content order: ["episodeOne"]\n' +
  '// Pending Episode handoffs: ' + JSON.stringify([{
    path:placement,slug:'episodeOne',episodeId,
    handoffPath:placement+'/draft.ts',orderIndex:0,
  }]) + '\n';
const parent = 'const content = { items:{},order:[] };\n' + marker;
test('trusted Episode composition only rewrites the allocated Course slot, never arbitrary parent content', () => {
  const worker = {
    episodeId,exportName:'episodeOne',publishable:false,
    diagnostics:[],files:[{ path:placement+'/index.ts',kind:'typescript',content:'export const episodeOne = 1;\n' }],
  };
  const combined = composeEpisodeDirectPlan(handoff,reviewed,meta,parent,worker);
  assert.equal(combined.episodeId,episodeId);
  assert.equal(combined.sourceExportName,'episodeOne');
  assert.equal(combined.files.length,2);
  assert.match(combined.files.find(x=>x.path===meta.parentPath).content,/'episodeOne': child_episodeOne|"episodeOne": child_episodeOne/);
  assert.doesNotMatch(combined.files.find(x=>x.path===meta.parentPath).content,/Pending Episode handoffs/);
  const manifest = buildEpisodeManifest(meta, combined);
  assert.equal(manifest.sourceExportName,worker.exportName);
  const generatedParent = combined.files.find(file => file.path === meta.parentPath).content;
  assert.equal(verifyReservedEpisodeParent(parent, generatedParent, {
    placement, slug:'episodeOne', episodeId, orderIndex:0,
    exportName:worker.exportName,
  }), true);
  for (const changed of [
    generatedParent + '// unauthorized edit',
    generatedParent.replace('child_episodeOne', 'unreviewed'),
    generatedParent.replace('"episodeOne"', '"other"'),
  ])
    assert.throws(() => verifyReservedEpisodeParent(parent, changed, {
      placement, slug:'episodeOne',episodeId,orderIndex:0,exportName:worker.exportName,
    }));

  assert.equal(episodeCommitTree(manifest).at(-1).sha,null);
  assert.throws(()=>composeEpisodeDirectPlan(handoff,reviewed,meta,parent,{...worker,episodeId:courseId}),/invalid source plan/);
  assert.throws(()=>composeEpisodeDirectPlan(handoff,{...reviewed,config:{...reviewed.config,id:courseId}},meta,parent,worker),/preserve/);
});

test('canonical Course-generated Episode handoff is JSON in an exact TypeScript wrapper, never executable code', () => {
  const original = '// TODO (BLOCKER): Episode Stage 1 handoff; scenario is not yet authored or reviewed.\n' +
    "import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';\n\n" +
    'export const episodeStage1 = ' + JSON.stringify(handoff, null, 2) +
    ' as const satisfies EpisodeWorkflowStage1Handoff;\n';
  assert.deepEqual(parseEpisodeHandoff(original), handoff);
  assert.throws(() => parseEpisodeHandoff(original.replace('as const satisfies','as never satisfies')));
  assert.throws(() => parseEpisodeHandoff(original + 'process.exit(1);'));
});
