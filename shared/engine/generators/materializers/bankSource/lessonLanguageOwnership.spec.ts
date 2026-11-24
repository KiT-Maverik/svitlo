import assert from 'node:assert/strict';
import test from 'node:test';
import {
  assertBankLessonLanguages,
  lessonConstantsImport,
  parseLessonLanguageConstants,
} from './lessonLanguageOwnership';

const ownerId = 'b775647f-203d-481a-a1c7-4d331c000200';
const reviewed = [
  "import type { SupportedLanguages } from '@svitlo/engine/build';",
  '// TODO (BLOCKER): Restore reviewed Lesson languages after translation approval.',
  '// export const languages = [',
  '//   "uk",',
  '//   "en",',
  '// ] as const satisfies SupportedLanguages;',
  'export const languages = ["uk"] as const satisfies SupportedLanguages;',
  'export type Languages = typeof languages;',
].join('\n');

test('static Lesson constants proof matches the reviewed bank language scope without executing source', () => {
  const actual = parseLessonLanguageConstants(reviewed);
  assert.deepEqual(actual, { active: ['uk'], planned: ['uk', 'en'] });
  assert.equal(lessonConstantsImport(ownerId), '#lessonsData/0/' + ownerId + '/constants');
  assert.doesNotThrow(() => assertBankLessonLanguages(actual, { document: 'uk', planned: ['uk', 'en'] }));
  assert.throws(
    () => assertBankLessonLanguages(actual, { document: 'uk', planned: ['uk'] }),
    /conflicts with owning Lesson/,
  );
  assert.throws(
    () => assertBankLessonLanguages(actual, { document: 'en', planned: ['uk', 'en'] }),
    /active language/,
  );
});

test('fully restored Lesson constants are detected rather than silently pruned to source-only', () => {
  const restored = parseLessonLanguageConstants(
    "export const languages = ['uk', 'en'] as const satisfies SupportedLanguages;\n",
  );
  assert.deepEqual(restored, { active: ['uk', 'en'], planned: ['uk', 'en'] });
  assert.throws(
    () => assertBankLessonLanguages(restored, { document: 'uk', planned: ['uk', 'en'] }),
    /source-only generation/,
  );
});

test('missing, dynamic, malformed and ambiguous Lesson language sources fail closed', () => {
  for (const source of [
    'export const other = ["uk"] as const;',
    "export const languages = DEFAULT_SUPPORTED_LANGUAGES;",
    'export const languages = ["uk", "uk"] as const;',
    'export const languages = ["uk", call()] as const;',
    reviewed.replace('//   "en",', '//   "en",\n//   "en",'),
    reviewed.replace('// ] as const satisfies SupportedLanguages;', '// invalid'),
    reviewed + '\n// export const languages = [\n//   "uk",\n// ] as const satisfies SupportedLanguages;\n',
    'export const languages = ["invalid"] as const;',
  ]) assert.throws(() => parseLessonLanguageConstants(source));
  assert.throws(() => lessonConstantsImport('not-a-uuid'), /UUID/);
});
