import assert from 'node:assert/strict';
import test from 'node:test';

import { defineAssessmentMethod } from './defineAssessmentMethod';

const method = defineAssessmentMethod<'oralExamination', ['en', 'uk']>({
  id: 'b775647f-203d-481a-a1c7-4d331c779d06',
  slug: 'oralExamination',
  title: { en: 'Oral examination', uk: 'Усне опитування' },
  description: { en: 'Discuss a concept aloud.', uk: 'Поясни поняття вголос.' },
});

test('AssessmentMethod publishes complete Props-shaped locale fragments', () => {
  const result = method.build.props();
  assert.deepEqual(result.base, {
    id: 'b775647f-203d-481a-a1c7-4d331c779d06',
    slug: 'oralExamination',
  });
  assert.deepEqual(result.locale?.uk, {
    title: 'Усне опитування',
    description: 'Поясни поняття вголос.',
  });
  assert.deepEqual(result.locale?.en, {
    title: 'Oral examination',
    description: 'Discuss a concept aloud.',
  });
  assert.equal(JSON.stringify(result).includes('build'), false);
});

test('AssessmentMethod validates sparse independent overrides and disallows identity edits', () => {
  const sparse = method.build.overrides({ title: { uk: 'Усна перевірка' } });
  assert.deepEqual(sparse.base, {});
  assert.deepEqual(sparse.locale, { uk: { title: 'Усна перевірка' } });
  assert.throws(() => method.build.overrides({ id: 'other' } as never), /Invalid Assessment Method overrides/);
  assert.throws(() => method.build.overrides({ type: 'other' } as never), /Invalid Assessment Method overrides/);
  assert.throws(() => method.build.overrides({ title: { inventedLocale: 'Bad' } } as never), /Invalid Assessment Method overrides/);
  sparse.locale!.uk!.title = 'mutated';
  assert.equal(method.build.props().locale?.uk?.title, 'Усне опитування');
  assert.deepEqual(method.build.overrides({ description: { en: 'Explain aloud.' } }).locale, {
    en: { description: 'Explain aloud.' },
  });
});
