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
const assessmentId = 'a73572e7-bd85-4516-86e2-3de07d209e03';
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
};
const seed = {
  config: { id: assessmentId, type: 'assessment', slug: 'finalReview', locale: { title: { uk: 'Перевірка' } } },
  production: {
    purpose: 'Check evidence after an upstream Lesson',
    lessonDependencies: ['content/newLesson'],
    placement: {
      courseId,
      path: 'content/finalReview',
      orderPath: [2],
      reviewedCourseSourceBlobSha: 'a'.repeat(40),
    },
    languages: { document: 'uk', planned: ['uk'] },
  },
};
const source =
  "import type { AssessmentWorkflowSeed } from '@svitlo/engine/build';\n" +
  '// TODO (BLOCKER): Complete independently authorized Assessment Stage 1, then Stage 2 and review.\n' +
  'export const assessmentSeed = ' +
  JSON.stringify(seed, null, 2) +
  ' as const satisfies AssessmentWorkflowSeed;\n';
const input = {
  config: {
    ...seed.config,
    section: {
      items: {
        quiz: {
          config: { type: 'quiz', params: { selection: { questionIds: [questionId] } } },
        },
      },
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
  assert.equal(verifyAssessmentDesign(seed, input, meta, plan), true);
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
  const bank = 'content/math/data/lessons/' + lessonId.at(-1) + '/' + lessonId + '/questions/';
  const contents = new Map([
    [courseRoot + '/content/newLesson/index.ts', 'export const newLesson = defineLesson({});'],
    [bank + 'index.ts', 'import { prompt } from "./selectOneAnswer";\nexport const questions = {};'],
    [bank + 'selectOneAnswer/index.ts', 'export { prompt } from "./prompt";'],
    [bank + 'selectOneAnswer/prompt.ts', 'export const prompt = defineSelectOneAnswer<"prompt">({\n  id: "' + questionId + '",\n  content,\n});'],
  ]);
  const tree = new Map([...contents].map(([name]) => [name, { type: 'blob', mode: '100644', sha: 'a'.repeat(40) }]));
  const reader = { blob: (_entry, filename) => contents.get(filename) };
  assert.equal(checkAssessmentBanks(meta, seed, [questionId], reader, tree), true);
  assert.throws(
    () => checkAssessmentBanks(meta, seed, ['99999999-9999-4999-8999-999999999999'], reader, tree),
    /absent/,
  );
  contents.set(bank + 'selectOneAnswer/prompt.ts', '// id: "' + questionId + '"\nexport const notAQuestion = true;');
  assert.throws(
    () => checkAssessmentBanks(meta, seed, [questionId], reader, tree),
    /absent|no materialized Question definitions/,
  );
  contents.set(bank + 'selectOneAnswer/prompt.ts', 'export const prompt = defineSelectOneAnswer<"prompt">({\n  id: "' + questionId + '",\n  content,\n});');
  tree.delete(bank + 'index.ts');
  assert.throws(
    () => checkAssessmentBanks(meta, seed, [questionId], reader, tree),
    /lacks a materialized Question Bank/,
  );
});

test('one source transaction permits only the exact parent and new Assessment child files', () => {
  const index = meta.sourcePath.replace('draft.ts', 'index.ts');
  const files = [
    { path: index, kind: 'typescript', content: 'export const finalReview = 1;\n' },
    {
      path: meta.sourcePath.replace('draft.ts', 'languages.ts'),
      kind: 'typescript',
      content: "export const languages = ['uk'] as const;\n",
    },
    { path: meta.parentPath, kind: 'typescript', content: 'parent patched\n' },
  ];
  const tree = new Map([
    [meta.sourcePath, { type: 'blob', mode: '100644', sha: meta.sourceBlobSha }],
    [meta.parentPath, { type: 'blob', mode: '100644', sha: meta.parentBlobSha }],
  ]);
  assert.equal(checkAssessmentTargets(meta, files, tree), true);
  const manifest = buildAssessmentManifest(meta, { ...plan, files, diagnostics: [] });
  assert.equal(manifest.entries.length, 3);
  assert.ok(assessmentCommitTree(manifest).some(e => e.path === meta.sourcePath && e.sha === null));
  assert.throws(() =>
    checkAssessmentTargets(
      meta,
      [...files, { path: courseRoot + '/content/other/index.ts', kind: 'typescript', content: 'bad' }],
      tree,
    ),
  );
  tree.set(index, { type: 'blob', mode: '100644', sha: meta.sourceBlobSha });
  assert.throws(() => checkAssessmentTargets(meta, files, tree), /overwrite/);
});
