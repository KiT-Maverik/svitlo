import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

import type { AssessmentWorkflowStage2 } from '../../../types/workflow/assessmentWorkflow.types';
import { materializeAssessment } from './materializeAssessment';

const courseId = '663572e7-bd85-4516-86e2-3de07d209e03';
const assessmentId = '663572e7-bd85-4516-86e2-3de07d209e31';
const questionId = '663572e7-bd85-4516-86e2-3de07d209e33';
const sourcePath = 'content/playground/data/courses/3/' + courseId + '/content/chapter/assessment/draft.ts';
const fixture = (): AssessmentWorkflowStage2 =>
  ({
    config: {
      id: assessmentId,
      type: 'assessment',
      slug: 'assessment',
      locale: { title: { uk: 'Перевірка' } },
      quiz: {
        config: {
          id: '663572e7-bd85-4516-86e2-3de07d209e32',
          type: 'quiz',
          slug: 'quiz',
          params: {
            selection: { mode: 'all', questionIds: [questionId] },
            layout: { mode: 'stack' },
            feedbackMode: 'immediate',
            interaction: {
              retries: 0,
              showErrors: true,
              showCorrectAnswers: true,
              allowExplanations: false,
              allowDeferring: false,
              allowQuestionNavigation: false,
              skippable: false,
            },
            results: { visibility: 'immediate', showScore: true },
          },
          locale: { title: { uk: 'Запитання' }, navigationLabel: '1' },
          content: { items: {}, order: [] },
        },
        production: { purpose: 'Reviewed knowledge check' },
      },
    },
    production: {
      purpose: 'Verify the preceding Lesson',
      design: 'Use a reviewed upstream Question',
      specification: 'Record learner evidence',
      lessonDependencies: ['content/chapter/lesson'],
      reviewedCourseSourceBlobSha: 'a'.repeat(40),
      languages: { document: 'uk', planned: ['uk'] },
    },
  }) as AssessmentWorkflowStage2;
const blob = (text: string) =>
  createHash('sha1')
    .update('blob ' + Buffer.byteLength(text, 'utf8') + '\0')
    .update(text)
    .digest('hex');
const options = (text: string) => ({
  source: { sourcePath, sourceBlobSha: blob(text), sourceCommitSha: 'b'.repeat(40) },
  sourceText: text,
  verifySourceInput: () => true,
});

test('Assessment Stage 4 renders deterministic nonpublishable Course-owned source', () => {
  const input = fixture();
  const text = 'export default ' + JSON.stringify(input) + ' satisfies AssessmentWorkflowStage2;\n';
  const result = materializeAssessment(input, options(text));
  assert.deepEqual(result, materializeAssessment(input, options(text)));
  assert.equal(result.assessmentId, assessmentId);
  assert.equal(result.publishable, false);
  assert.deepEqual(result.selectedQuestionIds, [questionId]);
  assert(result.files.some(file => file.path === 'content/chapter/assessment/sections/quiz/index.ts'));
  assert(
    result.files.some(
      file =>
        file.path === 'content/chapter/assessment/index.ts' &&
        file.content.includes('TODO (BLOCKER): Resolve each selected Question'),
    ),
  );
  assert(result.diagnostics.some(diagnostic => diagnostic.code === 'pending-assessment-question-resolution'));
});

test('Assessment Stage 4 rejects stale data and altered parent placement', () => {
  const input = fixture();
  const opts = options(JSON.stringify(input));
  assert.throws(
    () =>
      materializeAssessment(input, {
        ...opts,
        source: { ...opts.source, sourceBlobSha: 'c'.repeat(40) },
      }),
    /untrusted or stale/,
  );
  assert.throws(
    () =>
      materializeAssessment(input, {
        ...opts,
        verifySourceInput: () => false,
      }),
    /untrusted or stale/,
  );
  const foreignPlacement = structuredClone(input);
  foreignPlacement.config.slug = 'foreign';
  assert.throws(() => materializeAssessment(foreignPlacement, opts), /mismatch/);
  const noQuestions = structuredClone(input);
  noQuestions.config.quiz.config.params.selection = { mode: 'all', questionIds: [] };
  assert.throws(() => materializeAssessment(noQuestions, opts), /Invalid reviewed Assessment/);
});
