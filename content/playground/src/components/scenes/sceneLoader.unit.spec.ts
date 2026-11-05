import { describe, expect, it } from 'vitest';
import { resolveScene } from './sceneLoader';

describe('Playground Scene registry', () => {
  it('resolves the three authored Scene IDs with stable cached components', () => {
    for (const id of [
      'how-light-moves-scene-showcase',
      'how-light-moves-scene-propagation',
      'how-light-moves-scene-ray',
    ]) {
      const component = resolveScene(id);
      expect(component).toBeDefined();
      expect(resolveScene(id)).toBe(component);
    }
    expect(resolveScene('unknown-scene')).toBeUndefined();
  });
});
