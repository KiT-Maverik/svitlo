import assert from 'node:assert/strict';
import test from 'node:test';
import { z } from 'zod';

import { deepStrict_Schema } from './misc.schemas';

test('deepStrict_Schema rejects unknown fields at every object level', () => {
  const schema = deepStrict_Schema(
    z.object({
      metadata: z.object({ enabled: z.boolean() }).optional(),
      variants: z.union([z.object({ name: z.string() }), z.string()]),
      entries: z.record(z.string(), z.object({ value: z.number() })),
    }),
  );
  assert.equal(
    schema.safeParse({
      metadata: { enabled: true },
      variants: { name: 'ok' },
      entries: { a: { value: 42 } },
    }).success,
    true,
  );
  for (const value of [
    { metadata: { enabled: true, surprise: 'x' }, variants: 'ok', entries: {} },
    { variants: { name: 'ok', surprise: true }, entries: {} },
    { variants: 'ok', entries: { a: { value: 42, surprise: true } } },
    { variants: 'ok', entries: {}, surprise: true },
  ]) {
    assert.equal(schema.safeParse(value).success, false);
  }
});

test('deepStrict_Schema leaves original schema permissive and keeps refinements', () => {
  const original = z.object({
    entry: z.object({ value: z.string().min(2) }),
  });
  const strict = deepStrict_Schema(original);
  assert.equal(original.safeParse({ entry: { value: 'ab', extra: true }, extra: true }).success, true);
  assert.equal(strict.safeParse({ entry: { value: 'ab', extra: true } }).success, false);
  assert.equal(strict.safeParse({ entry: { value: 'a' } }).success, false);
});

test('deepStrict_Schema composes with z.deepPartial for sparse patches', () => {
  const schema = z.deepPartial(
    deepStrict_Schema(
      z.object({
        params: z.object({ wrap: z.object({ enabled: z.boolean(), title: z.string() }) }),
      }),
    ),
  );
  assert.equal(schema.safeParse({ params: { wrap: { title: 'Only one field' } } }).success, true);
  assert.equal(schema.safeParse({ params: { wrap: { typo: 123 } } }).success, false);
});
