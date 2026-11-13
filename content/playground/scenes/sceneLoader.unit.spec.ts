import { describe, expect, it } from 'vitest';
import { preloadScene, resolveScene } from './sceneLoader';

const authoredSceneIds = [
  '2abe959c-0908-4779-afbb-b2da6c1aa4d4',
  '72d22bea-d787-4c6d-9a83-144830c6d325',
  '968926d3-7b15-4575-8f57-a5a2a5054783',
] as const;

describe('Playground Scene registry', () => {
  it('resolves all three authored Scene IDs with stable cached lazy components', () => {
    for (const id of authoredSceneIds) {
      const component = resolveScene(id);
      expect(component).toBeDefined();
      expect(resolveScene(id)).toBe(component);
    }
    expect(resolveScene('unknown-scene')).toBeUndefined();
  });

  it('preloads each published Scene without retaining obsolete lesson-owned imports', async () => {
    await Promise.all(authoredSceneIds.map(id => preloadScene(id)));
    await expect(preloadScene('unknown-scene')).rejects.toThrow(/Unregistered scene id/);
  });
});
