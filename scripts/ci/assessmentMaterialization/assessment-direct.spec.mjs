import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const build = require(fileURLToPath(new URL('../../../shared/engine/dist/build.js', import.meta.url)));
const { materializeAssessment, assessmentWorkflowStage2_Schema } = build;

const courseId = '663572e7-bd85-4516-86e2-3de07d209e03';
const assessmentId = 'a73572e7-bd85-4516-86e2-3de07d209e03';
const sectionId = 'b775647f-203d-481a-a1c7-4d331c000201';
const questionId = '12345678-1234-4234-8234-123456789010';
const placement = 'content/moduleOne/content/moduleReview';
const sourcePath = 'content/math/data/courses/3/' + courseId + '/' + placement + '/draft.ts';
const sourceText = 'materializeAssessment(input);\n';
const sourceBlobSha = createHash('sha1')
  .update('blob ' + Buffer.byteLength(sourceText) + '\0')
  .update(sourceText)
  .digest('hex');
const options = {
  sourceText,
  source: { sourcePath, sourceBlobSha, sourceCommitSha: 'c'.repeat(40) },
  verifySourceInput: (_input, source, text) => source.sourceBlobSha === sourceBlobSha && text === sourceText,
};
const reviewed = () => ({
  config: {
    id: assessmentId,
    slug: 'moduleReview',
    type: 'assessment',
    locale: { title: { uk: 'Підсумкове оцінювання' } },
    before: { items: { intro: {
          config: {
            id: sectionId,
            slug: 'intro',
            type: 'content',
            params: {},
            locale: { title: { uk: 'Інструкція' }, navigationLabel: '1' },
            content: { items: {}, order: [] },
          },
          production: { purpose: 'Clarify the rules' },
        } }, order: ['intro'] },
    quiz: {
          config: {
            id: 'b775647f-203d-481a-a1c7-4d331c000202',
            slug: 'quiz',
            type: 'quiz',
            params: {
              selection: { mode: 'all', questionIds: [questionId] },
              layout: { mode: 'stack' },
              feedbackMode: 'after-completion',
              interaction: {
                retries: 1,
                showErrors: true,
                showCorrectAnswers: true,
                allowExplanations: true,
                allowDeferring: false,
                allowQuestionNavigation: true,
                skippable: false,
              },
              results: { visibility: 'immediate', showScore: true },
            },
            locale: { title: { uk: 'Запитання' }, navigationLabel: 'Q' },
            content: { items: {}, order: [] },
          },
          production: { purpose: 'Verify the approved evidence' },
        },
    after: { items: {}, order: [] },
  },
  production: {
    purpose: 'Collect evidence after upstream lessons',
    lessonDependencies: ['content/moduleOne/lessonOne'],
    placement: {
      courseId,
      path: placement,
      orderPath: [0, 2],
      reviewedCourseSourceBlobSha: 'a'.repeat(40),
    },
    languages: { document: 'uk', planned: ['uk', 'en'] },
    design: 'One accessible Quiz draws on an independently owned Lesson bank',
    specification: 'Use an introductory Content Section and one reviewed Quiz',
  },
});

test('Assessment direct materializer emits valid nested Section sources and blockers', () => {
  const input = reviewed();
  assert.equal(assessmentWorkflowStage2_Schema.safeParse(input).success, true);
  const plan = materializeAssessment(input, options);
  assert.equal(plan.publishable, false);
  assert.equal(plan.assessmentId, assessmentId);
  assert.deepEqual(plan.selectedQuestionIds, [questionId]);
  const paths = plan.files.map(file => file.path);
  assert(paths.includes(placement + '/index.ts'));
  assert(paths.includes(placement + '/languages.ts'));
  assert(paths.includes(placement + '/sections/intro/index.ts'));
  assert(paths.includes(placement + '/sections/quiz/index.ts'));
  assert(paths.includes(placement + '/specification.md'));
  const root = plan.files.find(f => f.path === placement + '/index.ts').content;
  assert.match(root, /defineAssessment/);
  assert.match(root, /const quiz = child_section_quiz;/);
  assert.match(root, /before, quiz, after,/);
  assert.match(root, /from "\.\/languages"/);
  assert.match(root, /TODO \(BLOCKER\)/);
  assert.doesNotMatch(root, /#coursesData/);
  const section = plan.files.find(f => f.path === placement + '/sections/quiz/index.ts').content;
  assert.match(section, /\.\.\/\.\.\/languages/);
  assert.equal(
    materializeAssessment(input, options)
      .files.map(f => [f.path, f.content])
      .join('\n'),
    plan.files.map(f => [f.path, f.content]).join('\n'),
  );
});

test('Assessment Stage 2 cannot materialize missing Quiz, provisional Questions or stale draft', () => {
  const withoutQuiz = reviewed();
  delete withoutQuiz.config.quiz;
  assert.throws(() => materializeAssessment(withoutQuiz, options), /Quiz|Invalid reviewed/);
  const fakeQuestion = reviewed();
  fakeQuestion.config.section.items.quiz.config.params.selection.questionIds[0] =
    'feedc0de-1234-4234-8234-123456789010';
  assert.throws(() => materializeAssessment(fakeQuestion, options), /reviewed upstream|Invalid reviewed/);
  assert.throws(
    () =>
      materializeAssessment(reviewed(), {
        ...options,
        source: { ...options.source, sourceBlobSha: 'f'.repeat(40) },
      }),
    /untrusted|stale/,
  );
});

test('Assessment Stage 2 requires exactly one non-disabled Quiz and Content-only supporting phases', () => {
  const disabled = reviewed();
  disabled.config.quiz.config.params.disabled = true;
  assert.equal(assessmentWorkflowStage2_Schema.safeParse(disabled).success, false);

  const secondQuiz = reviewed();
  secondQuiz.config.after.items.extra = {
    ...secondQuiz.config.quiz,
    config: { ...secondQuiz.config.quiz.config, slug: 'extra' },
  };
  secondQuiz.config.after.order.push('extra');
  assert.equal(assessmentWorkflowStage2_Schema.safeParse(secondQuiz).success, false);
});

test('Assessment materializer escapes reserved TypeScript slug exports', () => {
  const input = reviewed();
  input.config.slug = 'for';
  input.production.placement.path = 'content/moduleOne/content/for';
  const plan = materializeAssessment(input, {
    ...options,
    source: {
      ...options.source,
      sourcePath: 'content/math/data/courses/3/' + courseId + '/content/moduleOne/content/for/draft.ts',
    },
  });
  const generated = plan.files.find(file => file.path.endsWith('/index.ts') &&
    file.path === 'content/moduleOne/content/for/index.ts');
  assert.match(generated.content, /export const config_for = defineAssessment/);
});
