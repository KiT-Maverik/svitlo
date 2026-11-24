import assert from 'node:assert/strict';
import test from 'node:test';

import {
  readGeneratedCourseHandoff,
  replaceReservedParentSlot,
  verifyReservedParentSlot,
} from './reserved-parent-slot.mjs';

const ids = {
  episode: '11111111-1111-4111-8111-111111111111',
  assessment: '22222222-2222-4222-8222-222222222222',
  sibling: '33333333-3333-4333-8333-333333333333',
};

function parent(kind, depth) {
  const slug = kind === 'episode' ? 'story' : 'review';
  const stub = kind === 'episode' ? 'defineEpisodeStub' : 'defineAssessmentStub';
  const owner = depth === 0 ? 'defineCourse' : depth === 1 ? 'defineModule' : 'defineChapter';
  const placement = depth === 0 ? 'content/' + slug
    : kind === 'episode'
      ? depth === 1 ? 'content/moduleOne/' + slug : 'content/moduleOne/chapterOne/' + slug
      : depth === 1 ? 'content/moduleOne/content/' + slug : 'content/moduleOne/chapterOne/content/' + slug;
  const id = ids[kind];
  const source =
    "import { " + owner + ", defineLessonStub, " + stub + " } from '@svitlo/engine/build';\n" +
    'const content = {\n' +
    '  items: { before: defineLessonStub({ id: ' + JSON.stringify(ids.sibling) + ', slug: "before" }),\n' +
    '    ' + slug + ': ' + stub + '({ id: ' + JSON.stringify(id) + ', slug: ' + JSON.stringify(slug) + ' }),\n' +
    '    after: defineLessonStub({ id: "44444444-4444-4444-8444-444444444444", slug: "after" }) },\n' +
    '  order: ["before", ' + JSON.stringify(slug) + ', "after"],\n' +
    '};\n' +
    'export const parent = ' + owner + '({ id: "55555555-5555-4555-8555-555555555555", type: "course", slug: "parent", content });\n';
  return { source, kind, id, slug, placement, exportName: 'config_' + slug };
}

for (const kind of ['episode', 'assessment']) {
  for (const depth of [0, 1, 2]) {
    test(kind + ' replacement at depth ' + depth + ' preserves siblings, order and ownership', () => {
      const { source, ...allocation } = parent(kind, depth);
      const result = replaceReservedParentSlot(source, allocation);
      assert.equal(result.orderIndex, 1);
      assert.deepEqual(result.order, ['before', allocation.slug, 'after']);
      assert.match(result.content, /order: \["before", "story"|"before", "review"/);
      assert.match(result.content, /defineLessonStub/);
      assert.match(result.content, /child_(story|review)/);
      assert.doesNotMatch(result.content, /define(Episode|Assessment)Stub\(/);
      assert.equal(verifyReservedParentSlot(source, result.content, allocation), true);
      assert.throws(() => replaceReservedParentSlot(result.content, allocation), /missing|imported draft-only|reserved/i);
      assert.throws(() => verifyReservedParentSlot(source, result.content + '// extra', allocation), /exact authorized/);
      assert.throws(
        () => replaceReservedParentSlot(source, { ...allocation, id: ids.sibling }),
        /UUID\/slug/,
      );
      assert.throws(
        () => replaceReservedParentSlot(source, { ...allocation, placement: 'content/different' }),
        /identity/,
      );
      assert.throws(
        () => replaceReservedParentSlot(
          source.replace('order: ["before", ' + JSON.stringify(allocation.slug) + ', "after"]',
            'order: ["before", "after"]'),
          allocation,
        ),
        /incomplete|missing|ambiguous/,
      );
    });
  }
}

test('comment text cannot allocate a reserved parent slot or alter its order', () => {
  const { source, ...allocation } = parent('episode', 0);
  const withFakeHandoff = source.replace('const content', '// TODO (BLOCKER): fake order ["story"]\nconst content');
  const revised = replaceReservedParentSlot(withFakeHandoff, allocation).content;
  assert.match(revised, /fake order/);
  assert.equal(verifyReservedParentSlot(withFakeHandoff, revised, allocation), true);
  assert.throws(
    () => replaceReservedParentSlot(source.replace('story: defineEpisodeStub', 'story: defineLessonStub'), allocation),
    /imported draft-only/,
  );
});

test('typed Course seed survives normal TS formatting without parsing comments', () => {
  const source =
    "import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';\n" +
    '// TODO (BLOCKER): editorial only\n' +
    "export const episodeStage1 = { config: { id: '" + ids.episode +
    "', slug: 'story', type: 'episode' }, production: { focus: 'Plot', purpose: 'Transition'," +
    " languages: { document: 'uk', planned: ['uk', 'en'] } } } as const satisfies EpisodeWorkflowStage1Handoff;\n";
  const decoded = readGeneratedCourseHandoff(source, {
    variable: 'episodeStage1',
    contract: 'EpisodeWorkflowStage1Handoff',
  });
  assert.equal(decoded.config.id, ids.episode);
  assert.deepEqual(decoded.production.languages.planned, ['uk', 'en']);
  assert.deepEqual(
    readGeneratedCourseHandoff(source.replace('// TODO (BLOCKER): editorial only', '// unrelated comment'), {
      variable: 'episodeStage1',
      contract: 'EpisodeWorkflowStage1Handoff',
    }),
    decoded,
  );
  assert.throws(() => readGeneratedCourseHandoff(source.replace("'Plot'", 'getUnreviewedPlot()'), {
    variable: 'episodeStage1', contract: 'EpisodeWorkflowStage1Handoff',
  }), /executable TypeScript/);
  assert.throws(() => readGeneratedCourseHandoff(source + 'process.exit(1);\n', {
    variable: 'episodeStage1', contract: 'EpisodeWorkflowStage1Handoff',
  }), /only its typed import and data export/);
});

test('partially and fully restoring multiple reserved slots removes unused stub imports without changing neighbors', () => {
  const slots = [
    { kind: 'episode', slug: 'firstStory', id: ids.episode, placement: 'content/firstStory' },
    { kind: 'assessment', slug: 'firstReview', id: ids.assessment, placement: 'content/firstReview' },
    { kind: 'episode', slug: 'secondStory', id: ids.sibling, placement: 'content/secondStory' },
    { kind: 'assessment', slug: 'secondReview', id: '44444444-4444-4444-8444-444444444444', placement: 'content/secondReview' },
  ];
  const source =
    'import { defineCourse, defineEpisodeStub, defineAssessmentStub } from "@svitlo/engine/build";\n' +
    'const content = { items: {' +
    slots.map(slot =>
      slot.slug + ': define' + (slot.kind === 'episode' ? 'Episode' : 'Assessment') +
      'Stub({ id: ' + JSON.stringify(slot.id) + ', slug: ' + JSON.stringify(slot.slug) + ' })',
    ).join(', ') +
    '}, order: ' + JSON.stringify(slots.map(slot => slot.slug)) + ' };\n' +
    'export const owner = defineCourse({ id: "55555555-5555-4555-8555-555555555555", type: "course", slug: "owner", content });\n';
  let current = source;
  for (const [index, slot] of slots.entries()) {
    const allocation = { ...slot, exportName: 'config_' + slot.slug };
    const update = replaceReservedParentSlot(current, allocation);
    assert.equal(update.orderIndex, index);
    assert.deepEqual(update.order, slots.map(item => item.slug));
    assert.equal(verifyReservedParentSlot(current, update.content, allocation), true);
    current = update.content;
    for (const restored of slots.slice(0, index + 1))
      assert.match(current, new RegExp('child_' + restored.slug));
    for (const pending of slots.slice(index + 1))
      assert.match(current, new RegExp('define' + (pending.kind === 'episode' ? 'Episode' : 'Assessment') + 'Stub\\\\(\\\\{ id:'));
  }
  assert.doesNotMatch(current, /defineEpisodeStub|defineAssessmentStub|TODO \\(BLOCKER\\)/);
  assert.deepEqual(slots.map(slot => current.includes('child_' + slot.slug)), [true, true, true, true]);
  assert.throws(() => replaceReservedParentSlot(current, { ...slots[0], exportName: 'config_firstStory' }), /missing|imported draft-only|reserved/i);
});

test('generated handoff AST rejects nonliteral code and duplicate/prototype fields', () => {
  const valid = "import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';\n" +
    "export const episodeStage1 = { config: { id: '" + ids.episode +
    "', slug: 'story', type: 'episode' }, production: { focus: 'Plot', purpose: 'Transition', languages: { document: 'en', planned: ['en'] } } } as const satisfies EpisodeWorkflowStage1Handoff;";
  const check = source => readGeneratedCourseHandoff(source, {
    variable: 'episodeStage1', contract: 'EpisodeWorkflowStage1Handoff',
  });
  assert.equal(check(valid).config.id, ids.episode);
  assert.throws(() => check(valid.replace("purpose: 'Transition'", "purpose: makeScenario()")), /executable TypeScript/);
  assert.throws(() => check(valid.replace("focus: 'Plot'", "focus: 'Plot', focus: 'Other'")), /Duplicate Course handoff/);
  assert.throws(() => check(valid.replace("focus: 'Plot'", "__proto__: 'unsafe', focus: 'Plot'")), /Unsafe Course handoff property/);
  assert.throws(() => check(valid.replace("planned: ['en']", "planned: [...injected]")), /executable TypeScript/);
  assert.throws(() => check(valid.replace("as const satisfies", "satisfies")), /immutable as const/);
});
