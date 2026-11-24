import assert from 'node:assert/strict';
import test from 'node:test';

import type { AssessmentBlockEvidence } from './materializeAssessmentBlock';
import { collectBankSceneDrafts, materializeBankSceneDrafts } from './materializeBankSceneDrafts';

const uuid = '11111111-1111-4111-8111-11111111111a';
const scene = () => ({
  config: { id: uuid, slug: 'visual', type: 'scene', params: {}, locale: { value: { title: { uk: 'Сцена' } } } },
  production: { specification: 'A reviewed choice\n*/\nexport const malicious = true;' },
});
const bank = (value: unknown) => ({
  questions: {
    selectOneAnswer: {
      choose: {
        config: {
          id: '22222222-2222-4222-8222-22222222222a',
          type: 'selectOneAnswer',
          content: { question: { items: { visual: value }, order: ['visual'] } },
        },
      },
    },
  },
});
const evidence = (changes: Partial<AssessmentBlockEvidence>) => ({
  registeredSceneIds: new Set<string>(),
  approvedMediaBlockIds: new Set<string>(),
  newSceneIds: new Set([uuid]),
  ...changes,
});

test('Question Bank reuses the canonical six-file source-only Scene scaffold', () => {
  const output = materializeBankSceneDrafts(bank(scene()), 'uk', evidence({}));
  assert.equal(output.length, 6);
  assert.deepEqual(
    output.map(entry => entry.path),
    [
      'scenes/a/' + uuid + '/index.ts',
      'scenes/a/' + uuid + '/Visual.tsx',
      'scenes/a/' + uuid + '/Visual.module.css',
      'scenes/a/' + uuid + '/Visual.constants.ts',
      'scenes/a/' + uuid + '/Visual.stories.tsx',
      'scenes/a/' + uuid + '/Visual.unit.spec.tsx',
    ],
  );
  assert(output.every(file => file.content.includes('TODO (BLOCKER)')));
  const implementation = output[1].content;
  assert.match(implementation, /\/\/ \*\//);
  assert.doesNotMatch(implementation, /^export const malicious = true;/m);
  assert.deepEqual(output, materializeBankSceneDrafts(bank(scene()), 'uk', evidence({})));
});

test('existing, registered or missing proof never overwrites an owned Scene', () => {
  const input = bank(scene());
  assert.deepEqual(materializeBankSceneDrafts(input, 'uk', evidence({ newSceneIds: new Set() })), []);
  assert.deepEqual(
    materializeBankSceneDrafts(
      input,
      'uk',
      evidence({ newSceneIds: new Set(), existingDraftSceneIds: new Set([uuid]) }),
    ),
    [],
  );
  assert.throws(
    () =>
      materializeBankSceneDrafts(
        input,
        'uk',
        evidence({ newSceneIds: new Set(['33333333-3333-4333-8333-33333333333a']) }),
      ),
    /Unowned Bank Scene scaffold/,
  );
});

test('Flashcard nested Side Scene obeys the same reviewed handoff', () => {
  const input = {
    flashcards: {
      items: {
        alpha: { config: { content: { front: { items: { visual: scene() }, order: ['visual'] } } } },
      },
      order: ['alpha'],
    },
  };
  const output = collectBankSceneDrafts(input, 'uk', evidence({}));
  assert.deepEqual(
    output.map(item => item.id),
    [uuid],
  );
  assert.equal(materializeBankSceneDrafts(input, 'uk', evidence({})).length, 6);
  const withoutSpec = bank({ ...scene(), production: {} });
  assert.throws(() => materializeBankSceneDrafts(withoutSpec, 'uk', evidence({})), /reviewed production.specification/);
  const repeated = bank(scene());
  (
    repeated.questions.selectOneAnswer.choose.config.content.question.items as Record<string, ReturnType<typeof scene>>
  ).other = scene();
  assert.throws(() => materializeBankSceneDrafts(repeated, 'uk', evidence({})), /occurs more than once/);
});
