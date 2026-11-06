import { describe, expect, it, vi } from 'vitest';
import { createSceneRegistry, type SceneModule } from './createSceneRegistry';

const scene: SceneModule = { default: () => null };

describe('Scene registry preload recovery', () => {
  it('shares concurrent imports and reuses a successful module', async () => {
    const load = vi.fn(async () => scene);
    const registry = createSceneRegistry({ sample: load });

    await Promise.all([registry.preloadScene('sample'), registry.preloadScene('sample')]);
    await registry.preloadScene('sample');

    expect(load).toHaveBeenCalledTimes(1);
    expect(registry.resolveScene('sample')).toBe(registry.resolveScene('sample'));
  });

  it('evicts rejected imports and lazy components so a later preload can retry', async () => {
    const load = vi.fn().mockRejectedValueOnce(new Error('Chunk unavailable')).mockResolvedValue(scene);
    const registry = createSceneRegistry({ sample: load });
    const original = registry.resolveScene('sample');

    await expect(registry.preloadScene('sample')).rejects.toThrow('Chunk unavailable');
    expect(registry.resolveScene('sample')).not.toBe(original);

    await expect(registry.preloadScene('sample')).resolves.toBeUndefined();
    expect(load).toHaveBeenCalledTimes(2);
  });

  it('rejects unregistered scene IDs without returning a component', async () => {
    const registry = createSceneRegistry({});
    await expect(registry.preloadScene('missing')).rejects.toThrow('Unregistered scene id: missing');
    expect(registry.resolveScene('missing')).toBeUndefined();
  });
});
