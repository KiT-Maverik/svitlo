import assert from 'node:assert/strict';
import { test } from 'node:test';
import ts from 'typescript';
import { createHash } from 'node:crypto';
import {
  materializeQuestionBankDraft, materializeQuestionBank,
} from './materializeQuestionBank';
import { gitBlobSha, authoredBankLiteral, type BankSourceSnapshot } from '../bankSource/bankSourceSafety';

const sha = (char: string) => char.repeat(40);
const id = (num: number) => 'b775647f-203d-481a-a1c7-4d331c' + String(num).padStart(6, '0');
const lessonId = id(200);
const languages = { document: 'uk' as const, planned: ['uk'] as ['uk'] };
const assessment = {
  questionBankRequired: true, flashcardBankRequired: true,
  quizSectionRequired: false, flashcardsSectionRequired: false,
  quizRequiredForCompletion: false,
};
const evidence = {
  skillId: id(101), outcome: 'Recall the principle',
  assessmentMethod: 'retrieval', cognitiveOperation: 'retrieve',
  knowledgeAspect: 'principle', cognitiveDemand: 'transfer',
  misconception: 'one common mistake', context: 'independent test',
  expectedEvidence: 'correct explanation',
};
const handoff = () => ({
  config: { ownerLessonId: lessonId },
  production: {
    languages,
    lesson: {
      sourcePath: 'content/math/data/lessons/0/lesson.ts',
      sourceSha: sha('a'), referencePath: 'references/lesson.md',
      referenceSha: sha('b'), methodologyPath: 'references/methodology.md',
      title: 'Mathematics lesson',
    },
    assessment: { ...assessment }, ownershipRationale: 'The independent Question Bank supports recall',
    audience: 'Grade 3', scope: 'Basic arithmetic', prerequisites: 'Counting',
    evidenceIntent: [evidence], misconceptions: 'Order of operations',
    mediaNeeds: 'No media needed', sourcesAndDependencies: 'Approved Lesson source',
  },
});
const snapshot = (contents?: string): BankSourceSnapshot => ({
  complete: true, expectedHeadSha: sha('c'), observedHeadSha: sha('c'),
  entries: {
    questions: { kind: 'directory' },
    ...(contents !== undefined ? {
      'questions/index.ts': { kind: 'file' as const, content: contents },
    } : {}),
  },
});
const draftAuth = {
  authorized: true as const, ownerLessonId: lessonId,
  lessonSourceSha: sha('a'), referenceSha: sha('b'),
  methodologistReviewSha: sha('d'), snapshot: snapshot(),
};
const block = (slug: string, num: number) => ({
  config: {
    id: id(num), slug, type: 'text' as const, params: {},
    locale: { value: { uk: 'Перевірене формулювання' } },
  },
});
const collection = (items: Record<string, unknown>) => ({ items, order: Object.keys(items) });
const question = () => ({
  config: {
    id: id(10), slug: 'promptOne', type: 'selectOneAnswer' as const,
    params: { assessmentMethod: 'retrieval', restrictions: [] },
    locale: {},
    content: {
      question: collection({ prompt: block('prompt', 11) }),
      answers: {
        correct: collection({ correct: block('correct', 12) }),
        incorrect: collection({ wrong: block('wrong', 13) }),
        distractors: collection({}),
      },
    },
  },
  production: {
    evidence, distinction: 'Test a different application', intendedUse: 'core' as const,
    rationale: 'Directly measures the lesson objective',
  },
});
const editorial = 'export const reviewedBank = { reviewedAtStage3: true };\n';
const finalAuth = (input: unknown = completeBank()) => ({
  ownerLessonId: lessonId,
  reviewed: {
    approved: true as const, reviewer: 'Qualified independent reviewer',
    content: editorial, blobSha: gitBlobSha(editorial),
    reviewedSourceBlobSha: gitBlobSha(editorial), reviewCommitSha: sha('e'),
    reviewedInputSha256: createHash('sha256').update(authoredBankLiteral(input)).digest('hex'),
  },
  snapshot: snapshot(editorial),
  blocks: { registeredSceneIds: new Set<string>(), approvedMediaBlockIds: new Set<string>() },
});
const completeBank = () => ({
  ...handoff(), config: { ...handoff().config,
    questions: { selectOneAnswer: { promptOne: question() } },
  },
  production: {
    ...handoff().production,
    quiz: { kind: 'none' as const, rationale: 'No in-Lesson Quiz pedagogically needed' },
  },
});

test('Question Bank Stage 1 creates exactly one type-annotated editable source', () => {
  const result = materializeQuestionBankDraft(handoff() as never, draftAuth);
  assert.equal(result.publishable, false);
  assert.deepEqual(result.files.map(file => file.path), ['questions/index.ts']);
  assert.match(result.files[0].content, /satisfies QuestionBankWorkflowStage1/);
  assert.match(result.files[0].content, /ownerLessonId/);
  assert.doesNotMatch(result.files[0].content, /defineSelectOneAnswer|defineQuizSection/);
  assert.deepEqual(result, materializeQuestionBankDraft(handoff() as never, draftAuth));
});
test('Question Bank handoff rejects missing SHA, forged owner and no authorization', () => {
  assert.throws(() => materializeQuestionBankDraft(handoff() as never, {
    ...draftAuth, referenceSha: sha('e'),
  }), /Stale Lesson\/assessment handoff/);
  assert.throws(() => materializeQuestionBankDraft(handoff() as never, {
    ...draftAuth, ownerLessonId: id(300),
  }), /owning Lesson/);
  assert.throws(() => materializeQuestionBankDraft(handoff() as never, {
    ...draftAuth, authorized: false as true,
  }), /authorization missing/);
});
test('Reviewed Stage 3 materializes all Question source members and canonical indices', () => {
  const result = materializeQuestionBank(completeBank() as never, finalAuth());
  assert.equal(result.publishable, false);
  assert(result.transition);
  assert.equal(result.files.find(file => file.path === 'questions.reviewed-stage3.ts.txt')?.content, editorial);
  const paths = result.files.map(file => file.path);
  assert(paths.includes('questions/index.ts'));
  assert(paths.includes('questions/selectOneAnswer/index.ts'));
  assert(paths.includes('questions/selectOneAnswer/promptOne.ts'));
  assert(paths.includes('questions/selectOneAnswer/promptOne/content/question/items/prompt/index.ts'));
  const registry = result.files.find(file => file.path === 'questions/index.ts')?.content ?? '';
  assert.match(registry, /export const questions =/);
  assert.match(registry, /from "\.\/selectOneAnswer"/);
  assert.doesNotMatch(registry, /QuizSection/);
  assert(!paths.some(path => path.startsWith('questions/') && path.includes('reviewed-stage3')));
  const exported = result.files.find(file => file.path === 'questions/selectOneAnswer/index.ts')?.content ?? '';
  assert.match(exported, /export \{ promptOne \} from "\.\/promptOne"/);
  for (const file of result.files.filter(file => file.kind === 'typescript')) {
    const parsed = ts.transpileModule(file.content, {
      fileName: file.path, reportDiagnostics: true,
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    });
    assert.deepEqual((parsed.diagnostics ?? []).map(error => ts.flattenDiagnosticMessageText(error.messageText, '\n')), []);
  }
});
test('Question Bank final refuses source/review drift, missing groups and malformed kind', () => {
  const badReview = finalAuth();
  badReview.reviewed.reviewedSourceBlobSha = sha('f');
  assert.throws(() => materializeQuestionBank(completeBank() as never, badReview), /independently approved/);
  const empty = completeBank();
  empty.config.questions.selectOneAnswer = {} as never;
  assert.throws(() => materializeQuestionBank(empty as never, finalAuth(empty)), /no members/);
  const wrong = completeBank();
  wrong.config.questions.selectOneAnswer.promptOne.config.type = 'otherKind' as never;
  assert.throws(() => materializeQuestionBank(wrong as never, finalAuth(wrong)), /kind\/slug mismatch/);
});


test('Question Bank N/A cannot start without a separately verified exception', () => {
  const noBank = handoff();
  noBank.production.assessment.questionBankRequired = false;
  assert.throws(() => materializeQuestionBankDraft(noBank as never, draftAuth), /Questions N\/A/);
  assert.doesNotThrow(() => materializeQuestionBankDraft(noBank as never, {
    ...draftAuth,
    independentBankAuthorization: {
      sourceSha: sha('a'), rationale: 'Independent upstream evidence requires a bank',
    },
  }));
});
test('Question Bank rejects pending nested Blocks even if the parent Question is complete', () => {
  const input = completeBank();
  Object.assign(input.config.questions.selectOneAnswer.promptOne.config.content.question.items.prompt as object, {
    production: { pending: true },
  });
  assert.throws(() => materializeQuestionBank(input as never, finalAuth(input)),
    /pending bank authoring source/);
});
