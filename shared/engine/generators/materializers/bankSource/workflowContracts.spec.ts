import assert from 'node:assert/strict';
import { test } from 'node:test';
import { workflowLanguages_Schema } from '../../../types/workflow/workflowLanguages.schemas';
import { lessonProductionAssessmentRequirements_Schema } from '../../../types/workflow/lessonAssessment.types';
import { assertBankLanguages } from './bankSourceSafety';

test('editorial language plan retains real unique languages including the source', () => {
  const valid = { document: 'uk', planned: ['uk', 'en', 'qm'] };
  assert.deepEqual(workflowLanguages_Schema.parse(valid), valid);
  assert.doesNotThrow(() => assertBankLanguages(valid));
  for (const invalid of [
    { document: 'uk', planned: [] },
    { document: 'uk', planned: ['en'] },
    { document: 'uk', planned: ['uk', 'uk'] },
    { document: 'uk', planned: ['uk', 'zz'] },
    { document: 'zz', planned: ['zz'] },
  ]) {
    assert.equal(workflowLanguages_Schema.safeParse(invalid).success, false);
    assert.throws(() => assertBankLanguages(invalid), /real document locale/);
  }
});

test('the four assessment decisions are independent and required booleans', () => {
  const valid = {
    questionBankRequired: true,
    flashcardBankRequired: false,
    quizSectionRequired: false,
    flashcardsSectionRequired: true,
  };
  assert.deepEqual(lessonProductionAssessmentRequirements_Schema.parse(valid), valid);
  for (const key of Object.keys(valid)) {
    assert.equal(
      lessonProductionAssessmentRequirements_Schema.safeParse({ ...valid, [key]: undefined }).success,
      false,
    );
    assert.equal(lessonProductionAssessmentRequirements_Schema.safeParse({ ...valid, [key]: 'true' }).success, false);
  }
});
