import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  publish,
  readCurrent,
  discoverCourseSources,
  checkCourseSourceReadiness,
  assertNoLegacyCourseOverrides,
  render,
} from './generateCourseProps.mjs';

const id = '30ecbde1-97fd-5fe7-a353-ea89b9ef4a67';

test('Course batch publisher atomically replaces owned output and cleans stale resources', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-courses-cli-'));
  const root = path.join(home, 'generated', 'courses');
  const files = new Map([
    [id + '/base.json', '{"type":"course"}\n'],
    [id + '/uk.json', '{"locale":{"title":"Курс"}}\n'],
  ]);
  try {
    publish(root, files);
    assert.deepEqual([...readCurrent(root)], [...files]);
    fs.writeFileSync(path.join(root, id, 'stale.json'), '{}');
    fs.writeFileSync(path.join(home, 'unrelated.txt'), 'preserve');
    publish(root, files);
    assert.deepEqual([...readCurrent(root)], [...files]);
    assert.equal(fs.readFileSync(path.join(home, 'unrelated.txt'), 'utf8'), 'preserve');
    assert.equal(fs.existsSync(path.join(root, id, 'stale.json')), false);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Course batch publisher rejects unsafe paths and output symlinks', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-courses-safety-'));
  const root = path.join(home, 'courses');
  try {
    assert.throws(() => publish(root, new Map([['../escape.json', '{}']])), /Invalid generated Course path/);
    assert.equal(fs.existsSync(root), false, 'invalid content must not be published');
    fs.symlinkSync(home, root);
    assert.throws(() => publish(root, new Map([[id + '/base.json', '{}']])), /Symlink in generated path/);
    assert.throws(() => readCurrent(root), /Symlink/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Course batch publisher rejects a symlink in an output ancestor', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-ancestors-'));
  try {
    const real = path.join(home, 'real');
    fs.mkdirSync(real);
    fs.symlinkSync(real, path.join(home, 'alias'), 'dir');
    const output = path.join(home, 'alias/generated/courses');
    assert.throws(() => publish(output, new Map([[id + '/base.json', '{}']])), /Symlink in generated path/);
    assert.throws(() => readCurrent(output), /Symlink in generated path/);
    assert.equal(fs.existsSync(path.join(real, 'generated')), false);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Course publisher discovers materialized roots and isolates editorial drafts in draft mode', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-discovery-'));
  const root = path.join(home, 'data/courses');
  const active = '7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e';
  const pending = '2bc5cf15-9f26-4a16-885b-33c3fa904e8e';
  try {
    fs.mkdirSync(path.join(root, 'e', active), { recursive: true });
    fs.mkdirSync(path.join(root, 'e', pending), { recursive: true });
    fs.mkdirSync(path.join(root, 'sections'), { recursive: true });
    fs.writeFileSync(path.join(root, 'legacyCourse.data.ts'), 'export const course = {};');
    fs.writeFileSync(path.join(root, 'e', active, 'index.ts'), 'export const course = {};');
    fs.writeFileSync(path.join(root, 'e', pending, 'draft.ts'), 'throw new Error("draft must not execute");');
    assert.throws(() => discoverCourseSources(root), /Unmaterialized editorial draft/);
    assert.deepEqual(discoverCourseSources(root, 'draft'), [
      path.join(root, 'e', active, 'index.ts'),
      path.join(root, 'legacyCourse.data.ts'),
    ]);
    assert.deepEqual(discoverCourseSources(path.join(home, 'does-not-exist')), []);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Course publisher will not resolve a symlinked UUID entrypoint', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-symlink-'));
  const id = '7c4e6d20-5ad3-4af8-b9d7-d1f3587b0a8e';
  try {
    const root = path.join(home, 'data/courses');
    const folder = path.join(root, 'e', id);
    fs.mkdirSync(folder, { recursive: true });
    const outside = path.join(home, 'outside.ts');
    fs.writeFileSync(outside, 'export default {};');
    fs.symlinkSync(outside, path.join(folder, 'index.ts'));
    assert.throws(() => discoverCourseSources(root), /Symlink|symlink|Invalid authored entrypoint/i);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('Stage 1 Course reproduction: draft-only preflight and write cannot publish editorial data', async () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-stage1-'));
  const root = path.join(home, 'data/courses/6/403f4a50-266d-4b84-8b16-d879bfe8bab6');
  const output = path.join(home, 'generated/courses');
  try {
    fs.mkdirSync(root, { recursive: true });
    fs.writeFileSync(
      path.join(root, 'index.ts'),
      "import type { CourseWorkflowStage1 } from '@svitlo/engine/build';\n\nexport const courseStage1 = {\n  config: {\n    id: '403f4a50-266d-4b84-8b16-d879bfe8bab6',\n    type: 'course',\n    slug: 'lightAndShapes',\n    params: {\n      age: { min: 12, max: 16 },\n      outcomes: {\n        skills: ['00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000008'],\n      },\n      prerequisites: { skills: [] },\n    },\n    locale: {\n      title: 'Light and Shapes',\n      description: 'Explore how light travels and recognize circles in everyday objects.',\n    },\n  },\n  production: {\n    languages: { document: 'en', planned: ['en', 'uk'] },\n    methodology: {\n      purpose:\n        'Provide a small, synthetic Playground course for exercising the typed production workflow while practicing simple observations of light and shapes.',\n      audience:\n        'Learners aged 12–16 who can read short instructions and describe everyday observations; no formal optics or geometry background is assumed.',\n      approach:\n        'Start with familiar light and shape examples, ask learners to predict or classify, then explain the relevant feature and give corrective feedback. Offer short textual examples and optional repetition.',\n      depth:\n        'Introductory qualitative explanations of straight-line propagation in a uniform medium and shadow formation, plus recognition of circles independently of size or rotation. No calculations or formal proofs.',\n      accessibility:\n        'Use short source text and equivalent verbal descriptions of geometric features and light paths; support keyboard and screen-reader interaction, avoid color-only cues and require no network-dependent activity. Plan genuine English and Ukrainian localization.',\n      scope:\n        'Cover basic light paths, shadows and circle recognition. Exclude quantitative optics, refraction calculations, and advanced geometry. This is a technical fixture, not a complete curriculum.',\n      entryConditions:\n        'Learners can follow a short written or spoken prompt and distinguish everyday objects; provide an introductory example if these assumptions are not met.',\n      sourceNotes:\n        'Verified synthetic Playground taxonomy: data/skills/testLight/testLightPropagation/testExplainLightTravel.ts and data/skills/testShapes/testRoundShapes/testRecognizeCircle.ts. The fixture labels are not genuine translations or curriculum standards.',\n    },\n    outcomes: {\n      explanation:\n        'Explain why an opaque object can cast a shadow and identify a circle among contrasting shapes; evidence comes from short predictions, classifications and explanations in unfamiliar examples.',\n    },\n    prerequisites: {\n      explanation:\n        'No formal prerequisite Skill UUID is required; check basic comprehension with a familiar example and supply support if needed.',\n    },\n    standardsAlignment: [],\n    openDecisions: {},\n  },\n} satisfies CourseWorkflowStage1;\n",
    );
    await assert.rejects(render(home, 'draft'), /configurator/i);
    fs.renameSync(path.join(root, 'index.ts'), path.join(root, 'draft.ts'));
    const files = await render(home, 'draft');
    assert.equal(files.size, 0);
    publish(output, new Map([[id + '/base.json', '{}']]));
    publish(output, files);
    assert.equal(readCurrent(output).size, 0);
    await assert.rejects(render(home, 'production'), /Unmaterialized editorial draft/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('draft Episode preview is inspectable but editorial or human gates block strict publication', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-episode-readiness-'));
  try {
    const index = path.join(home, 'index.ts');
    fs.writeFileSync(index, 'export const course = {};');
    const slot = path.join(home, 'content', 'episode');
    fs.mkdirSync(slot, { recursive: true });
    fs.writeFileSync(path.join(slot, 'draft.ts'), 'export const draft = {};');
    assert.equal(checkCourseSourceReadiness(index, 'draft').length, 1);
    assert.throws(() => checkCourseSourceReadiness(index, 'production'), /not release-ready/);
    fs.rmSync(path.join(slot, 'draft.ts'));
    const materialized = path.join(slot, 'index.ts');
    fs.writeFileSync(materialized, '// TODO (BLOCKER): Human QA required.\nexport const story = {};');
    assert.equal(checkCourseSourceReadiness(index, 'draft').length, 1);
    assert.throws(() => checkCourseSourceReadiness(index, 'production'), /not release-ready/);
    fs.writeFileSync(materialized, 'export const story = {};');
    assert.deepEqual(checkCourseSourceReadiness(index, 'production'), []);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});

test('legacy authoredCourseOverrides exports fail closed to prevent silent loss of Lesson changes', () => {
  assert.doesNotThrow(() => assertNoLegacyCourseOverrides({ course: {} }, 'course/index.ts'));
  assert.throws(
    () => assertNoLegacyCourseOverrides({ authoredCourseOverrides: undefined }, 'course/index.ts'),
    /Legacy authoredCourseOverrides.*placeLesson/,
  );
  assert.throws(
    () => assertNoLegacyCourseOverrides({ authoredCourseOverrides: { content: { items: {} } } }, 'course/index.ts'),
    /Legacy authoredCourseOverrides.*placeLesson/,
  );
});

test('strict Course readiness catches canonical one-line and multiline blockers but ignores quoted markers', () => {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'svitlo-course-block-comments-'));
  try {
    const source = path.join(home, 'index.ts');
    const nested = path.join(home, 'content', 'lesson', 'index.ts');
    fs.mkdirSync(path.dirname(nested), { recursive: true });
    fs.writeFileSync(source, 'export const course = {};\n');
    fs.writeFileSync(nested, [
      'const quote = "// TODO (BLOCKER): quoted text";',
      'const template = \`/* TODO (BLOCKER): quoted block */\`;',
      'export const draft = true;',
    ].join('\n'));
    assert.deepEqual(checkCourseSourceReadiness(source, 'production'), []);
    fs.appendFileSync(nested, '\n/*\n * TODO (BLOCKER): Implement reviewed Lesson.\n *\n * Reviewed brief\n */\n');
    assert.equal(checkCourseSourceReadiness(source, 'draft').length, 1);
    assert.throws(() => checkCourseSourceReadiness(source, 'production'), /not release-ready/);
    fs.writeFileSync(nested, '// TODO (BLOCKER): Implement reviewed Lesson.\n');
    assert.equal(checkCourseSourceReadiness(source, 'draft').length, 1);
    assert.throws(() => checkCourseSourceReadiness(source, 'production'), /not release-ready/);
  } finally {
    fs.rmSync(home, { recursive: true, force: true });
  }
});
