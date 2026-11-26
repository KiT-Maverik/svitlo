import assert from 'node:assert/strict';
import { test } from 'node:test';

import {
  compositeContentBlockResolved_Schema as publicComposite_Schema,
  primitiveContentBlockResolved_Schema as publicPrimitive_Schema,
  compositeContentBlockTypes as publicCompositeTypes,
  primitiveContentBlockTypes as publicPrimitiveTypes,
} from '../../runtime';

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

test('runtime public schema classification is exhaustive, rejects cross-category resolved Props', () => {
  assert.deepEqual(publicCompositeTypes, compositeContentBlockTypes);
  assert.deepEqual(publicPrimitiveTypes, primitiveContentBlockTypes);
  for (const type of contentBlockTypes) {
    const resolved = {
      id: '409a419f-5a01-46e0-aee6-4f66db492302',
      slug: 'resolvedBlock',
      type,
    };
    const isPrimitive = primitiveContentBlockTypes.some(kind => kind === type);
    assert.equal(publicPrimitive_Schema.safeParse(resolved).success, isPrimitive);
    assert.equal(publicComposite_Schema.safeParse(resolved).success, !isPrimitive);
  }
});
