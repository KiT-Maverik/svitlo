import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import ts from 'typescript';
import { textbook } from '../../testing/fixtures.mjs';
import { render as renderLessons } from '../generateLessonProps/generateLessonProps.mjs';
import { render as renderBanks } from '../generateAssessmentResources/generateAssessmentResources.mjs';

const id = '663572e7-bd85-4516-86e2-3de07d209e05';
const skillId = '663572e7-bd85-4516-86e2-3de07d209e04';
const languages = { document: 'uk', planned: ['uk', 'en'] };
const assessment = {
  questionBankRequired: true,
  flashcardBankRequired: true,
  quizSectionRequired: false,
  flashcardsSectionRequired: false,
};
const sha = 'a'.repeat(40);
const lesson = {
  config: {
    type: 'lesson',
    id,
    slug: 'editorialOnly',
    skills: [skillId],
    locale: { title: { uk: 'Спостереження' } },
  },
  production: {
    methodology: 'Approved learning design.',
    objective: 'Distinguish observation from inference.',
    depth: 'Introductory observation with everyday examples.',
    sequenceReason: 'Establish observation before explaining phenomena.',
    assessmentEvidence: 'Explain the distinction using a new example.',
    assessment,
    languages,
  },
};
const questions = {
  config: { ownerLessonId: id },
  production: {
    languages,
    lesson: {
      sourcePath: 'content/example/data/lessons/5/' + id + '/index.ts',
      sourceSha: sha,
      referencePath: 'reference.md',
      referenceSha: sha,
      methodologyPath: 'methodology.md',
      title: 'Observation',
    },
    assessment: { ...assessment, quizRequiredForCompletion: false },
    ownershipRationale: 'Independent coverage',
    audience: 'Learners',
    scope: 'Observation',
    prerequisites: 'None',
    misconceptions: 'Distinguish observation from inference',
    mediaNeeds: 'None',
    sourcesAndDependencies: 'Pinned reference',
    evidenceIntent: [
      {
        skillId,
        outcome: 'Explain a verified observation',
        assessmentMethod: 'application',
        cognitiveOperation: 'Apply the concept',
        knowledgeAspect: 'Observation',
        cognitiveDemand: 'Apply in context',
        misconception: 'Confuses observation and inference',
        context: 'Source-language task',
        expectedEvidence: 'Explains the distinction',
      },
    ],
  },
};
const flashcards = {
  production: {
    lesson: {
      id,
      sourceSha: sha,
      reference: { path: 'flashcards.md', sourceSha: sha },
      languages,
      assessment,
    },
    questions: {
      kind: 'completed',
      sourceSha: sha,
      reviewSha: sha,
      bankPath: 'content/example/data/lessons/5/' + id + '/questions/index.ts',
      integrated: true,
    },
    analysis: {
      recallObjectives: ['Recall definition'],
      sourceFactsAndConcepts: ['Observation'],
      misconceptionsAndContrasts: [],
      exclusions: [{ target: 'Long explanation', reason: 'Lesson content' }],
      cardCountRationale: 'One distinct recall target',
      sourceGrounding: 'Pinned source',
    },
  },
};

function writeDraft(filename, type, value) {
  fs.mkdirSync(path.dirname(filename), { recursive: true });
  fs.writeFileSync(
    filename,
    'import type { ' +
      type +
      ' } from "@svitlo/engine/build";\n' +
      'export const draft = ' +
      JSON.stringify(value) +
      ' satisfies ' +
      type +
      ';\n',
  );
}
function diagnostics(files) {
  const program = ts.createProgram(files, {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    types: [],
  });
  return ts.getPreEmitDiagnostics(program).filter(d => d.category === ts.DiagnosticCategory.Error);
}

test('canonical Lesson and bank drafts typecheck but do not enter mixed publication', async t => {
  const temp = fileURLToPath(new URL('../../temp/', import.meta.url));
  fs.mkdirSync(temp, { recursive: true });
  const root = fs.mkdtempSync(path.join(temp, 'editorial-drafts-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const home = path.join(root, 'textbook');
  const owner = path.join(home, 'data/lessons/5', id);
  const entries = [
    [path.join(owner, 'draft.ts'), 'LessonWorkflowStage1', lesson],
    [path.join(owner, 'questions/draft.ts'), 'QuestionBankWorkflowStage1', questions],
    [path.join(owner, 'flashcards/draft.ts'), 'FlashcardBankWorkflowStage1', flashcards],
  ];
  for (const entry of entries) writeDraft(...entry);
  const files = entries.map(entry => entry[0]);
  assert.deepEqual(
    diagnostics(files).map(d => ts.flattenDiagnosticMessageText(d.messageText, ' ')),
    [],
  );
  assert.deepEqual(await renderLessons(home, 'draft'), new Map());
  assert.deepEqual(JSON.parse((await renderBanks(home, 'all', 'draft')).get('assessments/manifest.json')).entries, {});
  await assert.rejects(renderLessons(home, 'production'), /Unmaterialized editorial draft/);
  await assert.rejects(renderBanks(home, 'all'), /Unmaterialized editorial draft/);

  // Compare publication at the same package path, without and with drafts.
  fs.rmSync(owner, { recursive: true });
  fs.cpSync(textbook, home, { recursive: true });
  const baselineLessons = await renderLessons(home, 'draft');
  const baselineBanks = await renderBanks(home, 'all', 'draft');
  for (const entry of entries) writeDraft(...entry);
  assert.deepEqual(await renderLessons(home, 'draft'), baselineLessons);
  assert.deepEqual(await renderBanks(home, 'all', 'draft'), baselineBanks);

  for (const [filename, type] of entries) writeDraft(filename, type, {});
  const errors = diagnostics(files);
  for (const filename of files) {
    assert(
      errors.some(error => error.file?.fileName === filename),
      'Missing diagnostic for ' + filename,
    );
  }
});
