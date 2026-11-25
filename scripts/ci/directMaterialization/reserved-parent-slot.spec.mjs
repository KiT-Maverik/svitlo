import assert from 'node:assert/strict';
import test from 'node:test';

import {
  readGeneratedCourseHandoff,
  verifyPendingCourseParent,
  verifyOwnedCourseStub,
  resolveIntegratedCourseLesson,
} from './reserved-parent-slot.mjs';

const ids = {
  lesson: '66666666-6666-4666-8666-666666666666',
  episode: '11111111-1111-4111-8111-111111111111',
  assessment: '22222222-2222-4222-8222-222222222222',
  sibling: '33333333-3333-4333-8333-333333333333',
};

const api = kind => 'define' + kind[0].toUpperCase() + kind.slice(1) + 'Stub';
const stubSource = ({ kind, id, slug }) =>
  'import { ' +
  api(kind) +
  " } from '@svitlo/engine/build';\n" +
  '// TODO (BLOCKER): Complete the child, replace its parent import, then delete this stub.\n' +
  'export const stub = ' +
  api(kind) +
  '({ id: ' +
  JSON.stringify(id) +
  ', slug: ' +
  JSON.stringify(slug) +
  ' });\n';

function parent(kind, depth, directChapter = false) {
  const slug = kind === 'episode' ? 'story' : kind === 'lesson' ? 'lessonOne' : 'review';
  const owner = depth === 0 ? 'defineCourse' : depth === 1 && !directChapter ? 'defineModule' : 'defineChapter';
  const placement = depth === 0 ? slug : depth === 1 ? 'moduleOne/' + slug : 'moduleOne/chapterOne/' + slug;
  const id = ids[kind];
  const prefix = './';
  const source =
    'import { ' +
    owner +
    ", defineLessonStub } from '@svitlo/engine/build';\n" +
    'import { stub as child_' +
    slug +
    ' } from "' +
    prefix +
    slug +
    '/stub";\n' +
    'const content = {\n' +
    '  items: { before: defineLessonStub({ id: ' +
    JSON.stringify(ids.sibling) +
    ', slug: "before" }),\n' +
    '    ' +
    JSON.stringify(slug) +
    ': child_' +
    slug +
    ',\n' +
    '    after: defineLessonStub({ id: "44444444-4444-4444-8444-444444444444", slug: "after" }) },\n' +
    '  order: ["before", ' +
    JSON.stringify(slug) +
    ', "after"],\n' +
    '};\n' +
    'export const parent = ' +
    owner +
    '({ id: "55555555-5555-4555-8555-555555555555", type: "course", slug: "parent", content });\n';
  return {
    source,
    kind,
    id,
    slug,
    placement: directChapter ? placement.replace('moduleOne', 'directChapter') : placement,
    exportName: 'config_' + slug,
    stubSource: stubSource({ kind, id, slug }),
  };
}

for (const kind of ['lesson', 'episode', 'assessment']) {
  for (const depth of [0, 1, 2]) {
    test(kind + ' pending stub is authenticated read-only at depth ' + depth, () => {
      const { source, ...allocation } = parent(kind, depth);
      assert.equal(verifyOwnedCourseStub(allocation.stubSource, allocation), true);
      assert.equal(verifyPendingCourseParent(source, allocation), true);
      assert.match(source, new RegExp(allocation.slug + '/stub'));
      assert.throws(() => verifyPendingCourseParent(source, { ...allocation, id: ids.sibling }));
      assert.throws(() => verifyPendingCourseParent(source, { ...allocation, placement: 'different' }));
      assert.throws(() =>
        verifyPendingCourseParent(
          source.replace(
            'order: ["before", ' + JSON.stringify(allocation.slug) + ', "after"]',
            'order: ["before", "after"]',
          ),
          allocation,
        ),
      );
    });
  }
}

for (const kind of ['lesson', 'episode', 'assessment']) {
  test(kind + ' pending stub accepts a Chapter directly under Course', () => {
    const { source, ...allocation } = parent(kind, 1, true);
    assert.equal(verifyPendingCourseParent(source, allocation), true);
    assert.throws(() => verifyPendingCourseParent(source.replaceAll('defineChapter', 'defineCourse'), allocation));
    const nested = parent(kind, 2);
    assert.throws(() => verifyPendingCourseParent(nested.source.replaceAll('defineChapter', 'defineModule'), nested));
  });
}

test('read-only reservation rejects foreign, executable, aliased or malformed stub and parent', () => {
  const { source, ...allocation } = parent('episode', 0);
  const stub = allocation.stubSource;
  const invalidStubs = [
    stub.replace('defineEpisodeStub', 'defineAssessmentStub'),
    stub.replace(JSON.stringify(ids.episode), JSON.stringify(ids.sibling)),
    stub.replace('slug: "story"', 'slug: "other"'),
    stub.replace('export const stub = ', 'export const wrong = '),
    stub.replace('export const stub = ', 'export { stub };\nconst stub = '),
    stub.replace('import { defineEpisodeStub }', 'import { defineEpisodeStub as unsafe }'),
    stub.replace(' });', ', extra: evil() });'),
    stub + '\nprocess.exit(1);',
  ];
  for (const candidate of invalidStubs) {
    assert.throws(() => verifyOwnedCourseStub(candidate, allocation));
    assert.throws(() => verifyPendingCourseParent(source, { ...allocation, stubSource: candidate }));
  }
  const annotated = source.replace('const content', '// TODO (BLOCKER): human review is editorial only\nconst content');
  assert.equal(verifyPendingCourseParent(annotated, allocation), true);
  for (const changed of [
    source.replace('child_story', 'other_story'),
    source.replace('stub as child_story', 'stub as other_story'),
    source.replace('from "./story/stub"', 'from "./content/foreign/stub"'),
    source.replace('defineCourse', 'defineChapter'),
    source.replace('const content', 'const changed'),
    source.replace('order: ["before", "story", "after"]', 'order: ["after", "story", "after"]'),
    source + '\nprocess.exit(1);',
    source.replace('const content', 'const also = child_story;\nconst content'),
  ])
    assert.throws(() => verifyPendingCourseParent(changed, allocation));
});

test('typed Course seed survives normal TS formatting without parsing comments', () => {
  const source =
    "import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';\n" +
    '// TODO (BLOCKER): editorial only\n' +
    "export const episodeStage1 = { config: { id: '" +
    ids.episode +
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
  assert.throws(
    () =>
      readGeneratedCourseHandoff(source.replace("'Plot'", 'getUnreviewedPlot()'), {
        variable: 'episodeStage1',
        contract: 'EpisodeWorkflowStage1Handoff',
      }),
    /executable TypeScript/,
  );
  assert.throws(
    () =>
      readGeneratedCourseHandoff(source + 'process.exit(1);\n', {
        variable: 'episodeStage1',
        contract: 'EpisodeWorkflowStage1Handoff',
      }),
    /only its typed import and data export/,
  );
});

test('mixed Course child stubs remain reserved independently with unchanged order', () => {
  const slots = [
    { kind: 'episode', slug: 'firstStory', id: ids.episode, placement: 'firstStory' },
    { kind: 'assessment', slug: 'firstReview', id: ids.assessment, placement: 'firstReview' },
    { kind: 'episode', slug: 'secondStory', id: ids.sibling, placement: 'secondStory' },
  ];
  const source =
    'import { defineCourse } from "@svitlo/engine/build";\n' +
    slots.map(slot => 'import { stub as child_' + slot.slug + ' } from "./' + slot.slug + '/stub";\n').join('') +
    'const content = { items: {' +
    slots.map(slot => JSON.stringify(slot.slug) + ': child_' + slot.slug).join(', ') +
    '}, order: ' +
    JSON.stringify(slots.map(slot => slot.slug)) +
    ' };\n' +
    'export const owner = defineCourse({ content });\n';
  for (const slot of slots)
    assert.equal(verifyPendingCourseParent(source, { ...slot, stubSource: stubSource(slot) }), true);
  assert.ok(slots.every(slot => source.includes('/' + slot.slug + '/stub')));
  assert.match(source, /"firstStory","firstReview","secondStory"/);
});

test('generated handoff AST rejects nonliteral code and duplicate/prototype fields', () => {
  const valid =
    "import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';\n" +
    "export const episodeStage1 = { config: { id: '" +
    ids.episode +
    "', slug: 'story', type: 'episode' }, production: { focus: 'Plot', purpose: 'Transition', languages: { document: 'en', planned: ['en'] } } } as const satisfies EpisodeWorkflowStage1Handoff;";
  const check = source =>
    readGeneratedCourseHandoff(source, {
      variable: 'episodeStage1',
      contract: 'EpisodeWorkflowStage1Handoff',
    });
  assert.equal(check(valid).config.id, ids.episode);
  assert.throws(
    () => check(valid.replace("purpose: 'Transition'", 'purpose: makeScenario()')),
    /executable TypeScript/,
  );
  assert.throws(
    () => check(valid.replace("focus: 'Plot'", "focus: 'Plot', focus: 'Other'")),
    /Duplicate Course handoff/,
  );
  assert.throws(
    () => check(valid.replace("focus: 'Plot'", "__proto__: 'unsafe', focus: 'Plot'")),
    /Unsafe Course handoff property/,
  );
  assert.throws(() => check(valid.replace("planned: ['en']", 'planned: [...injected]')), /executable TypeScript/);
  assert.throws(() => check(valid.replace('as const satisfies', 'satisfies')), /immutable as const/);
});

test('Course handoff reader accepts inert default-export seeds for all three child entities', () => {
  for (const contract of ['CourseWorkflowLessonSeed', 'EpisodeWorkflowStage1Handoff', 'AssessmentWorkflowSeed']) {
    const body =
      '{ config: { id: "' +
      ids.episode +
      '", slug: "story" }, production: { ' +
      'purpose: "Plan", languages: { document: "uk", planned: ["uk", "en"] } } }';
    const prefix = 'import type { ' + contract + " } from '@svitlo/engine/build';\n";
    const opts = { variable: 'oldSeed', contract };
    const legacy = prefix + 'export const oldSeed = ' + body + ' as const satisfies ' + contract + ';';
    const declarative = prefix + 'export default ' + body + ' satisfies ' + contract + ';';
    const typedConst = prefix + 'export default (' + body + ' as const) satisfies ' + contract + ';';
    const actual = readGeneratedCourseHandoff(legacy, opts);
    assert.deepEqual(readGeneratedCourseHandoff(declarative, opts), actual);
    assert.deepEqual(readGeneratedCourseHandoff(typedConst, opts), actual);
    assert.equal(actual.config.id, ids.episode);
    assert.deepEqual(actual.production.languages.planned, ['uk', 'en']);
  }
});

test('Course seed AST reader rejects executable default exports and forged manifest content', () => {
  const contract = 'EpisodeWorkflowStage1Handoff';
  const header = 'import type { ' + contract + " } from '@svitlo/engine/build';\n";
  const opts = { variable: 'episodeStage1', contract };
  const literal = '{ config: { id: "' + ids.episode + '" }, production: { purpose: "story" } }';
  const valid = header + 'export default ' + literal + ' satisfies ' + contract + ';';
  assert.equal(readGeneratedCourseHandoff(valid, opts).config.id, ids.episode);
  for (const candidate of [
    valid + '\nprocess.exit(1);',
    valid.replace('purpose: "story"', 'purpose: require("fs").readFileSync("/tmp/x")'),
    valid.replace('purpose: "story"', 'purpose: import("./untrusted")'),
    valid.replace('purpose: "story"', 'purpose: "safe", purpose: "forged"'),
    valid.replace('purpose: "story"', 'purpose: "safe", __proto__: { admin: true }'),
    valid.replace('config: {', 'config: { ["dynamic"]: 1,'),
    valid.replace('export default', 'export const episodeStage1 ='),
    valid.replace('import type', 'import'),
    valid.replace('satisfies ' + contract, 'satisfies WrongStage'),
  ]) {
    assert.throws(() => readGeneratedCourseHandoff(candidate, opts));
  }
});

test('Assessment resolves Lesson banks from exact Course/Module/Chapter parent imports', () => {
  const lessonId = '11111111-1111-4111-8111-111111111111';
  const siblingId = '22222222-2222-4222-8222-222222222222';
  const parent = (ownerKind, overridden = false) => {
    const definition = 'define' + ownerKind[0].toUpperCase() + ownerKind.slice(1);
    return (
      [
        'import { ' + definition + (overridden ? ', placeLesson' : '') + ' } from "@svitlo/engine/build";',
        'import { sibling as child_other } from "#lessonsData/' + siblingId.at(-1) + '/' + siblingId + '/index";',
        'import { lesson as child_newLesson } from "#lessonsData/' + lessonId.at(-1) + '/' + lessonId + '/index";',
        'const content = { items: { "other": child_other, "newLesson": ' +
          (overridden ? 'placeLesson(child_newLesson, {})' : 'child_newLesson') +
          ' }, order: ["other", "newLesson"] };',
        'export const owner = ' + definition + '({ content });',
      ].join('\n') + '\n'
    );
  };
  for (const ownerKind of ['course', 'module', 'chapter']) {
    const source = parent(ownerKind);
    if (ownerKind !== 'course') {
      assert.equal(
        resolveIntegratedCourseLesson(source, { slug: 'newLesson', ownerKind: ['module', 'chapter'] }),
        lessonId,
      );
    } else {
      assert.throws(() =>
        resolveIntegratedCourseLesson(source, { slug: 'newLesson', ownerKind: ['module', 'chapter'] }),
      );
    }
    assert.equal(resolveIntegratedCourseLesson(source, { slug: 'newLesson', ownerKind }), lessonId);
    assert.equal(resolveIntegratedCourseLesson(source, { slug: 'other', ownerKind }), siblingId);
    assert.equal(
      resolveIntegratedCourseLesson('// #lessonsData/0/00000000-0000-4000-8000-000000000000/index\n' + source, {
        slug: 'newLesson',
        ownerKind,
      }),
      lessonId,
    );
    assert.equal(resolveIntegratedCourseLesson(parent(ownerKind, true), { slug: 'newLesson', ownerKind }), lessonId);
    assert.throws(() => resolveIntegratedCourseLesson(source, { slug: 'absent', ownerKind }), /integrated/);
    assert.throws(
      () =>
        resolveIntegratedCourseLesson(source, {
          slug: 'newLesson',
          ownerKind: ownerKind === 'course' ? 'module' : 'course',
        }),
      /owner/,
    );
    assert.throws(
      () =>
        resolveIntegratedCourseLesson(source.replace('"newLesson": child_newLesson', '"newLesson": child_other'), {
          slug: 'newLesson',
          ownerKind,
        }),
      /integrated/,
    );
    assert.throws(
      () => resolveIntegratedCourseLesson(source.replace('index";', 'stub";'), { slug: 'other', ownerKind }),
      /canonical verified Lesson UUID/,
    );
    assert.throws(
      () => resolveIntegratedCourseLesson(source + 'process.exit(1);', { slug: 'newLesson', ownerKind }),
      /syntax/,
    );
  }
});
