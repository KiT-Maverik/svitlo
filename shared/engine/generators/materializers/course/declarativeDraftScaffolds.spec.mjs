import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import ts from 'typescript';

import { materializeLessonDraft } from './lessonDraft.mjs';
import { materializeAssessmentPlaceholder } from './materializeAssessmentPlaceholder.mjs';
import { materializeEpisodeDraft } from '../episode/materializeDraft.mjs';

const id = '663572e7-bd85-4516-86e2-3de07d209e03';
const skill = '663572e7-bd85-4516-86e2-3de07d209e04';
const sha = '0123456789abcdef0123456789abcdef01234567';

/**
 * A seed is not yet eligible for final Stage Zod validation. Verify only the
 * syntactic, non-executing authoring boundary; each entity's own Stage 1 schema
 * and separately reviewed final-stage Reader/Zod tests verify content.
 */
function assertInertSeed(content, contract) {
  const source = ts.createSourceFile('draft.ts', content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.deepEqual(source.parseDiagnostics, []);
  assert.equal(source.statements.length, 2, 'Only a type import and one default export');
  const [imported, exported] = source.statements;
  assert(ts.isImportDeclaration(imported));
  assert.equal(imported.importClause?.isTypeOnly, true);
  assert(ts.isExportAssignment(exported));
  assert.equal(exported.isExportEquals, false);
  assert(ts.isSatisfiesExpression(exported.expression));
  assert.equal(exported.expression.type.getText(source), contract);
  const value = exported.expression.expression;
  assert(ts.isObjectLiteralExpression(value));
  function visit(node) {
    assert(!ts.isCallExpression(node), 'No executable calls in authored source');
    assert(!ts.isSpreadAssignment(node), 'No computed spreads in authored source');
    assert(!ts.isArrowFunction(node), 'No authored functions');
    ts.forEachChild(node, visit);
  }
  visit(value);
  assert.match(content, /TODO \(BLOCKER\)/);
  const literal = JSON.parse(value.getText(source));
  assert(literal && typeof literal === 'object');
  return literal;
}

test('Course-created Lesson proposal is an inert typed default-exported seed', () => {
  const output = materializeLessonDraft({
    config: { type: 'lesson', slug: 'firstObservation', skills: [skill], locale: { title: { uk: 'Спостереження' } } },
    production: {
      kind: 'new',
      methodology: 'Reviewed methodology',
      objective: 'Observe patterns',
      depth: 'Foundational',
      sequenceReason: 'Prepare subsequent concepts',
      assessmentEvidence: 'Explain a verified observation',
      assessment: { questionBankRequired: true, flashcardBankRequired: false, quizSectionRequired: true, flashcardsSectionRequired: false },
    },
  }, {
    lessonId: id,
    textbookRoot: 'content/playground',
    reviewedSourceSha: sha,
    languageContext: { document: 'uk', planned: ['uk', 'en'] },
  });
  assert.equal(output.files.length, 1);
  const literal = assertInertSeed(output.files[0].content, 'CourseWorkflowLessonSeed');
  assert.equal(literal.config.id, id);
  assert.deepEqual(literal.languageContext, { document: 'uk', planned: ['uk', 'en'] });
  assert.equal(literal.proposal.assessment.quizSectionRequired, true);
  assert.equal(literal.production, undefined);
});

test('Course-created Episode handoff is inert, typed and retains ordered placement identity', () => {
  const output = materializeEpisodeDraft({
    config: { type: 'episode', slug: 'transition' },
    production: { focus: 'Follow observations', purpose: 'Narrative bridge' },
  }, {
    directory: 'content/transition',
    orderPath: [0],
    courseId: id,
    sourceLanguage: 'uk',
    plannedLanguages: ['uk'],
    reviewedCourseSourceBlobSha: sha,
    deriveId: () => id,
  });
  const literal = assertInertSeed(output.files[0].content, 'EpisodeWorkflowStage1Handoff');
  assert.equal(literal.config.id, id);
  assert.equal(literal.production.focus, 'Follow observations');
});

test('Course-created Assessment seed has inert literal dependencies and no fake Questions', () => {
  const output = materializeAssessmentPlaceholder({
    config: { type: 'assessment', locale: { title: { uk: 'Перевірка знань' } } },
    production: { purpose: 'Evaluate actual prior learning', lessonDependencies: ['content/firstObservation'] },
  }, {
    directory: 'content/finalReview',
    orderPath: [1],
    courseId: id,
    reviewedCourseSourceBlobSha: sha,
    sourceLanguage: 'uk',
    plannedLanguages: ['uk'],
    deriveId: () => id,
  });
  const literal = assertInertSeed(output.files[0].content, 'AssessmentWorkflowSeed');
  assert.equal(literal.config.id, id);
  assert.deepEqual(literal.production.lessonDependencies, ['content/firstObservation']);
  assert.deepEqual(literal.production.placement.orderPath, [1]);
  assert(!output.files[0].content.includes('questionIds'));
  assert.match(output.placeholderSource, /defineAssessmentDraft/);
});

test('canonical authoring examples never contain executable materializer calls', () => {
  const root = fileURLToPath(new URL('../../../../../', import.meta.url));
  const paths = [
    'course-workflow/create-course-flow.skill.md',
    'lesson-workflow/create-lesson-flow.skill.md',
    'episode-workflow/create-episode-flow.skill.md',
    'lesson-workflow/create-questions-flow.skill.md',
    'lesson-workflow/create-flashcards-flow.skill.md',
    'assessment-workflow/create-assessment-flow.skill.md',
  ];
  for (const name of paths) {
    const markdown = readFileSync(root + 'studio/skills/' + name, 'utf8');
    assert.match(markdown, /draft\.ts/);
    const snippets = markdown.split('```ts\n').slice(1).map(code => code.split('\n```')[0]);
    for (const code of snippets) {
      assert.doesNotMatch(code, /^\s*materialize(?:Course|LessonStage6|EpisodeStage5|QuestionBank|FlashcardBank|Assessment)\s*\(/m, name);
      assert.doesNotMatch(code, /import\s*\{[^}]*materialize(?:Course|LessonStage6|EpisodeStage5|QuestionBank|FlashcardBank|Assessment)/, name);
      if (!code.includes('export default')) continue;
      const file = ts.createSourceFile('draft.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
      assert.equal(file.parseDiagnostics.length, 0, name);
      assert.equal(file.statements.filter(ts.isExportAssignment).length, 1, name);
      assert(file.statements.every(node => (ts.isImportDeclaration(node) && node.importClause?.isTypeOnly) || ts.isExportAssignment(node)), name);
    }
  }
});
