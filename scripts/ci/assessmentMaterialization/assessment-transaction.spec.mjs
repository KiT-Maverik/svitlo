import test from 'node:test';
import assert from 'node:assert/strict';
import { deriveCourseEntityId } from '../../../shared/engine/generators/materializers/course/deriveCourseEntityId.mjs';
import {
  parseAssessmentSeed,
  verifyAssessmentDesign,
  checkAssessmentBanks,
  checkAssessmentTargets,
  buildAssessmentManifest,
  assessmentCommitTree,
} from './assessment-transaction.mjs';

const courseId = '663572e7-bd85-4516-86e2-3de07d209e03';
const assessmentId = deriveCourseEntityId(courseId, 'assessment', 'finalReview');
const questionId = '12345678-1234-4234-8234-123456789010';
const courseRoot = 'content/math/data/courses/3/' + courseId;
const meta = {
  courseId,
  courseRoot,
  textbookRoot: 'content/math',
  placement: 'content/finalReview',
  parentPath: courseRoot + '/index.ts',
  sourcePath: courseRoot + '/content/finalReview/draft.ts',
  sourceBlobSha: 'b'.repeat(40),
  head: 'c'.repeat(40),
  parentBlobSha: 'd'.repeat(40),
  stubBlobSha: 'e'.repeat(40),
};
const seed = {
  config: { id: assessmentId, type: 'assessment', slug: 'finalReview', locale: { title: { uk: 'Перевірка' } } },
  production: {
    purpose: 'Check evidence after an upstream Lesson',
    lessonDependencies: ['content/newLesson'],
    reviewedCourseSourceBlobSha: 'a'.repeat(40),
    languages: { document: 'uk', planned: ['uk'] },
  },
};
const source =
  "import type { AssessmentWorkflowSeed } from '@svitlo/engine/build';\n" +
  '// TODO (BLOCKER): Complete independently authorized Assessment Stage 1, then Stage 2 and review.\n' +
  'export default ' +
  JSON.stringify(seed, null, 2) +
  ' satisfies AssessmentWorkflowSeed;\n';
const input = {
  config: {
    ...seed.config,
    quiz: {
      config: { type: 'quiz', params: { selection: { questionIds: [questionId] } } },
    },
  },
  production: { ...seed.production, design: 'Design', specification: 'Reviewed content' },
};
const plan = {
  publishable: false,
  assessmentId,
  courseId,
  placement: meta.placement,
  sourcePath: meta.sourcePath,
  sourceCommitSha: meta.head,
  sourceBlobSha: meta.sourceBlobSha,
  materializedPath: meta.sourcePath.replace('draft.ts', 'index.ts'),
  sourceExportName: 'finalReview',
  selectedQuestionIds: [questionId],
};

test('Course-allocated seed is immutable; independent Assessment adds reviewed design', () => {
  assert.deepEqual(parseAssessmentSeed(source), seed);
  assert.deepEqual(parseAssessmentSeed(source.replace('// TODO (BLOCKER):', '// editorial:')), seed);
  assert.throws(
    () =>
      parseAssessmentSeed(
        source.replace(
          '"reviewedCourseSourceBlobSha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"',
          '"placement": {"path": "content/foreign"}, "reviewedCourseSourceBlobSha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"',
        ),
      ),
    /Invalid pinned Assessment seed/,
  );
  assert.throws(
    () =>
      parseAssessmentSeed(
        source.replace(
          '"reviewedCourseSourceBlobSha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"',
          '"reviewedCourseSourceBlobSha": "bad"',
        ),
      ),
    /Invalid pinned Assessment seed/,
  );
  assert.throws(
    () => parseAssessmentSeed(source.replace('"content/newLesson"', '"content/../foreign"')),
    /Invalid pinned Assessment seed/,
  );
  assert.equal(verifyAssessmentDesign(seed, input, meta, plan), true);
  // Trusted source path, Course ID and reserved slug are independent of
  // authored placement metadata: a foreign allocation must never pass.
  assert.throws(
    () => verifyAssessmentDesign(seed, input, { ...meta, courseId: assessmentId }, plan),
    /immutable Course handoff/,
  );
  assert.throws(
    () => verifyAssessmentDesign(seed, input, { ...meta, placement: 'content/foreign' }, plan),
    /immutable Course handoff/,
  );
  assert.throws(
    () => verifyAssessmentDesign(seed, { ...input, config: { ...input.config, id: courseId } }, meta, plan),
    /immutable Course handoff/,
  );
  assert.throws(
    () => verifyAssessmentDesign(seed, { ...input, config: { ...input.config, slug: 'foreign' } }, meta, plan),
    /immutable Course handoff/,
  );
  assert.throws(
    () =>
      verifyAssessmentDesign(
        seed,
        { ...input, production: { ...input.production, reviewedCourseSourceBlobSha: 'f'.repeat(40) } },
        meta,
        plan,
      ),
    /immutable/,
  );
  assert.throws(() => parseAssessmentSeed(source.replace('AssessmentWorkflowSeed', 'ForeignSource')));
  assert.throws(() =>
    verifyAssessmentDesign(
      seed,
      {
        ...input,
        production: { ...input.production, lessonDependencies: ['content/other'] },
      },
      meta,
      plan,
    ),
  );
  assert.throws(() =>
    verifyAssessmentDesign(seed, input, meta, {
      ...plan,
      selectedQuestionIds: ['aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'],
    }),
  );
});

test('trusted transaction checks real upstream Lesson and Question Bank source files', () => {
  const lessonId = deriveCourseEntityId(courseId, 'lesson', 'newLesson');
  const lessonRoot = 'content/math/data/lessons/' + lessonId.at(-1) + '/' + lessonId + '/';
  const bank = lessonRoot + 'questions/';
  const courseParent = courseRoot + '/index.ts';
  const parent = lessonImports =>
    'import { defineCourse } from "@svitlo/engine/build";\n' +
    lessonImports
      .map(
        ({ slug, id }) =>
          'import { lesson as child_' + slug + ' } from "#lessonsData/' + id.at(-1) + '/' + id + '/index";\n',
      )
      .join('') +
    'const content = { items: { ' +
    lessonImports.map(({ slug }) => JSON.stringify(slug) + ': child_' + slug).join(', ') +
    ' }, order: ' +
    JSON.stringify(lessonImports.map(({ slug }) => slug)) +
    ' };\n' +
    'export const demo = defineCourse({ content });\n';
  const contents = new Map([
    [courseParent, parent([{ slug: 'newLesson', id: lessonId }])],
    [lessonRoot + 'index.ts', 'export const lesson = defineLesson({});'],
    [bank + 'index.ts', 'import { prompt } from "./selectOneAnswer";\nexport const questions = {};'],
    [bank + 'selectOneAnswer/index.ts', 'export { prompt } from "./prompt";'],
    [
      bank + 'selectOneAnswer/prompt.ts',
      'export const prompt = defineSelectOneAnswer<"prompt">({\n  id: "' + questionId + '",\n  content,\n});',
    ],
  ]);
  const tree = new Map([...contents].map(([name]) => [name, { type: 'blob', mode: '100644', sha: 'a'.repeat(40) }]));
  const reader = { blob: (_entry, filename) => contents.get(filename) };
  assert.equal(checkAssessmentBanks(meta, seed, [questionId], reader, tree), true);
  // A sibling import must never replace the approved dependency's bank.
  const unrelated = '44444444-4444-4444-8444-444444444444';
  contents.set(
    courseParent,
    parent([
      { slug: 'otherLesson', id: unrelated },
      { slug: 'newLesson', id: lessonId },
    ]),
  );
  assert.equal(checkAssessmentBanks(meta, seed, [questionId], reader, tree), true);
  contents.set(courseParent, parent([{ slug: 'otherLesson', id: unrelated }]));
  assert.throws(() => checkAssessmentBanks(meta, seed, [questionId], reader, tree), /integrated/);
  contents.set(courseParent, parent([{ slug: 'newLesson', id: lessonId }]));
  contents.set(
    courseParent,
    contents.get(courseParent).replace('"newLesson": child_newLesson', '"newLesson": unverified'),
  );
  assert.throws(() => checkAssessmentBanks(meta, seed, [questionId], reader, tree), /integrated/);
  contents.set(courseParent, parent([{ slug: 'newLesson', id: lessonId }]));

  assert.throws(
    () => checkAssessmentBanks(meta, seed, ['99999999-9999-4999-8999-999999999999'], reader, tree),
    /absent/,
  );
  contents.set(bank + 'selectOneAnswer/prompt.ts', '// id: "' + questionId + '"\nexport const notAQuestion = true;');
  assert.throws(
    () => checkAssessmentBanks(meta, seed, [questionId], reader, tree),
    /absent|no materialized Question definitions/,
  );
  contents.set(
    bank + 'selectOneAnswer/prompt.ts',
    'export const prompt = defineSelectOneAnswer<"prompt">({\n  id: "' + questionId + '",\n  content,\n});',
  );
  tree.delete(bank + 'index.ts');
  assert.throws(
    () => checkAssessmentBanks(meta, seed, [questionId], reader, tree),
    /lacks a materialized Question Bank/,
  );
});

test('Assessment source transaction generates only owned files and retains parent and stub', () => {
  const index = meta.sourcePath.replace('draft.ts', 'index.ts');
  const files = [
    { path: index, kind: 'typescript', content: 'export const finalReview = 1;\n' },
    { path: meta.sourcePath.replace('draft.ts', 'specification.md'), kind: 'specification', content: '# Reviewed specification\n' },
  ];
  const tree = new Map([
    [meta.sourcePath, { type: 'blob', mode: '100644', sha: meta.sourceBlobSha }],
    [meta.parentPath, { type: 'blob', mode: '100644', sha: meta.parentBlobSha }],
    [meta.sourcePath.replace('draft.ts', 'stub.ts'), { type: 'blob', mode: '100644', sha: meta.stubBlobSha }],
  ]);
  assert.equal(checkAssessmentTargets(meta, files, tree), true);
  const manifest = buildAssessmentManifest(meta, { ...plan, files, diagnostics: [] });
  assert.deepEqual(manifest.entries.map(entry => entry.path).sort(), files.map(file => file.path).sort());
  assert.deepEqual(assessmentCommitTree(manifest).filter(entry => entry.sha === null).map(entry => entry.path), [meta.sourcePath]);
  assert.equal(tree.get(meta.parentPath).sha, meta.parentBlobSha);
  assert.equal(tree.get(meta.sourcePath.replace('draft.ts', 'stub.ts')).sha, meta.stubBlobSha);
  assert.throws(() => checkAssessmentTargets(meta, [...files, { path: meta.parentPath, kind: 'typescript', content: 'patched' }], tree));
  assert.throws(() => checkAssessmentTargets(meta, [...files, { path: courseRoot + '/content/other/index.ts', kind: 'typescript', content: 'bad' }], tree));
  const occupied = new Map(tree);
  occupied.set(index, { type: 'blob', mode: '100644', sha: meta.sourceBlobSha });
  assert.throws(() => checkAssessmentTargets(meta, files, occupied), /overwrite/);
  const symlink = new Map(tree);
  symlink.set(meta.sourcePath.replace('draft.ts', 'stub.ts'), { type: 'blob', mode: '120000', sha: meta.stubBlobSha });
  assert.throws(() => checkAssessmentTargets(meta, files, symlink), /pinned regular Git blobs/);
});
