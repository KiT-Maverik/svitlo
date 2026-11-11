import assert from 'node:assert/strict';
import test from 'node:test';
import { validateSluggedConfiguratorMap } from './validateSluggedConfiguratorMap.utils';

const good = {
  slug: 'firstBlock',
  type: 'text',
  config: {
    locales: () => ({}),
    validate: () => { throw new Error('Do not invoke child validation'); },
  },
};

test('accepts matching keyed configurators without revalidating children', () => {
  assert.deepEqual(validateSluggedConfiguratorMap({ firstBlock: good }, ['text']), []);
});

test('reports key/slug mismatch, unsupported type and raw authoring data', () => {
  const issues = validateSluggedConfiguratorMap({
    wrongKey: good,
    unsupported: { ...good, slug: 'unsupported', type: 'checkpoint' },
    notConfigurator: { slug: 'notConfigurator', type: 'text' },
  }, ['text'], { path: 'answer.items', itemLabel: 'answer' });
  assert.ok(issues.some(issue => issue.check === 'slug' && issue.path === 'answer.items.wrongKey'));
  assert.ok(issues.some(issue => issue.check === 'item' && issue.message.includes('Unsupported answer type: checkpoint')));
  assert.ok(issues.some(issue => issue.check === 'item' && issue.path === 'answer.items.notConfigurator'));
});

test('rejects invalid camelCase keys and base false, permits false only for overrides', () => {
  assert.ok(validateSluggedConfiguratorMap({ bad_slug: good }, ['text']).some(issue => issue.check === 'slug'));
  assert.ok(validateSluggedConfiguratorMap({ firstBlock: false }, ['text']).some(issue => issue.check === 'item'));
  assert.deepEqual(validateSluggedConfiguratorMap({ firstBlock: false }, ['text'], { allowDisabled: true }), []);
});
