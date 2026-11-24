import assert from 'node:assert/strict';
import test from 'node:test';

import { executeMaterializerEntrypoint, invokeMaterializer } from './directMaterialization';

test('one direct invocation receives runner-owned options and returns its result', async () => {
  const result = await executeMaterializerEntrypoint('lesson', 42, async () => {
    invokeMaterializer<number, number>('lesson', undefined, value => value + 1);
  });
  assert.equal(result, 43);
});

test('zero, multiple, wrong-operation and explicit-option calls fail closed', async () => {
  await assert.rejects(
    executeMaterializerEntrypoint('lesson', 1, async () => {}),
    /exactly one/,
  );
  await assert.rejects(
    executeMaterializerEntrypoint('lesson', 1, async () => {
      invokeMaterializer('lesson', undefined, () => 1);
      assert.throws(() => invokeMaterializer('lesson', undefined, () => 2));
    }),
    /exactly one/,
  );
  await assert.rejects(
    executeMaterializerEntrypoint('lesson', 1, async () => {
      invokeMaterializer('course', undefined, () => 1);
    }),
    /authorized materializer/,
  );
  await assert.rejects(
    executeMaterializerEntrypoint('lesson', 1, async () => {
      invokeMaterializer('lesson', 2, value => value);
    }),
    /execution options/,
  );
  assert.equal(
    invokeMaterializer('lesson', 3, value => value),
    3,
  );
});
