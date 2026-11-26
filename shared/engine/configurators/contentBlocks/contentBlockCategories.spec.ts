import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  compositeContentBlockTypes,
  contentBlockResolved_Schema,
  contentBlockTypes,
  primitiveContentBlockConfigurator_Schema,
  primitiveContentBlockResolved_Schema,
  primitiveContentBlockTypes,
} from './index';

test('all 11 renderable ContentBlock kinds occur in exactly one category', () => {
  const kinds = [...primitiveContentBlockTypes, ...compositeContentBlockTypes];
  assert.equal(kinds.length, 11);
  assert.equal(new Set(kinds).size, kinds.length);
  assert.deepEqual(kinds, contentBlockTypes);
  assert(primitiveContentBlockTypes.includes('scene'));
  assert.deepEqual([...compositeContentBlockTypes], ['carousel', 'checkpoint']);
  assert(!kinds.includes('checkpointItem' as never));
  assert(!kinds.includes('checkpointAnswer' as never));
});

test('resolved Primitive schema rejects both Composite discriminants', () => {
  for (const type of contentBlockTypes) {
    const props = {
      id: '409a419f-5a01-46e0-aee6-4f66db492301',
      slug: 'member',
      type,
      params: {},
    };
    assert.equal(contentBlockResolved_Schema.safeParse(props).success, true);
    assert.equal(
      primitiveContentBlockResolved_Schema.safeParse(props).success,
      primitiveContentBlockTypes.some(kind => kind === type),
    );
    assert.equal(
      primitiveContentBlockConfigurator_Schema.safeParse(props).success,
      primitiveContentBlockTypes.some(kind => kind === type),
    );
  }
});
