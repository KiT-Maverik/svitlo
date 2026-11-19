import { describe, expect, it } from 'vitest';
import { preloadScene, resolveScene } from './sceneLoader';

const ids = [
  '43fdcc5a-8c6c-5b71-a2d8-9682c677b47f',
  'd1bb6314-6977-5bfa-897c-9b7124ca63ab',
] as const;

describe('Astronomy Scene registry', () => {
  it('resolves both approved UUIDs with stable lazy Scene identities', () => {
    for (const id of ids) {
      const component = resolveScene(id);
      expect(component).toBeDefined();
      expect(resolveScene(id)).toBe(component);
    }
    expect(resolveScene('unknown-scene')).toBeUndefined();
  });

  it('loads only registered modules and reports an unknown UUID', async () => {
    await Promise.all(ids.map(id => preloadScene(id)));
    await expect(preloadScene('unknown-scene')).rejects.toThrow(/Unregistered scene id/);
  });
});
