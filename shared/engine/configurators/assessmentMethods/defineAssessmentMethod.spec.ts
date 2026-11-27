import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { defineAssessmentMethod } from './defineAssessmentMethod';

describe('Configurators', () => {
  describe('AssessmentMethods', () => {
    describe('defineAssessmentMethod', () => {
      const method = defineAssessmentMethod<'retrieval', ['en', 'uk']>({
        id: 'b775647f-203d-481a-a1c7-4d331c779d06',
        slug: 'retrieval',
        title: { en: 'Retrieval', uk: 'Усне опитування' },
        description: { en: 'Discuss a concept aloud.', uk: 'Поясни поняття вголос.' },
      });

      test('AssessmentMethod publishes complete Props-shaped locale fragments', () => {
        const result = method.build.data({ languages: ['en', 'uk'] });
        assert.deepEqual(result.base, {
          id: 'b775647f-203d-481a-a1c7-4d331c779d06',
          slug: 'retrieval',
        });
        assert.deepEqual(result.locale?.uk, {
          title: 'Усне опитування',
          description: 'Поясни поняття вголос.',
        });
        assert.deepEqual(result.locale?.en, {
          title: 'Retrieval',
          description: 'Discuss a concept aloud.',
        });
        assert.equal(JSON.stringify(result).includes('build'), false);
      });

      test('AssessmentMethod has one canonical, immutable publication API', () => {
        assert.equal('overrides' in method.build, false);
        assert.equal('config' in method, false);
        assert.equal('validate' in method, false);
        const first = method.build.data({ languages: ['en', 'uk'] });
        first.locale!.uk!.title = 'mutated';
        assert.equal(method.build.data({ languages: ['en', 'uk'] }).locale?.uk?.title, 'Усне опитування');
      });

      test('AssessmentMethod publishes only requested locales and validates unsupported requests', () => {
        const onlyUk = method.build.data({ languages: ['uk'] });
        assert.deepEqual(Object.keys(onlyUk.locale ?? {}), ['uk']);
        assert.equal(onlyUk.locale?.uk?.title, 'Усне опитування');
        assert.throws(() => method.build.data({ languages: ['de'] } as never), /Required|expected|Invalid/i);
      });
    });
  });
});
