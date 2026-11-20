import { describe, expect, it } from 'vitest';
import { preloadScene, resolveScene } from './sceneLoader';
const ids = [
  '14cd71cf-f81d-44fd-ba4b-9346384ba037',
  '80ecd1b4-8405-41ad-ac71-bd97d0f2c9e8',
  'fae02030-82c2-4c8a-a18a-3a1a789a8477',
] as const;

describe('Astronomy Scene registration', () => {
  it('resolves each authorized Scene by immutable UUID', () => {
    for (const id of ids) {
      const first = resolveScene(id);
      expect(first).toBeDefined();
      expect(resolveScene(id)).toBe(first);
    }
    expect(resolveScene('unknown-id')).toBeUndefined();
  });
  it('can preload all registered Scene modules without a network API', async () => {
    await Promise.all(ids.map(preloadScene));
    await expect(preloadScene('unknown-id')).rejects.toThrow(/Unregistered scene id/);
  });
});
