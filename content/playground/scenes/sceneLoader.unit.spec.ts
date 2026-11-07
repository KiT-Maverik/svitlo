import { describe, expect, it } from 'vitest';
import { resolveScene } from './sceneLoader';
import { showcaseData } from '../data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/sections/practice/scenes/showcase';
import { lightPropagationSimulationData } from '../data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/sections/theory/scenes/lightPropagationSimulation';
import { lightRayDiagramData } from '../data/lessons/c/d3048d21-8690-5255-b62c-984c69ac272c/sections/theory/scenes/lightRayDiagram';

describe('Playground Scene registry', () => {
  it('resolves the three authored Scene IDs with stable cached components', () => {
    for (const { id } of [showcaseData, lightPropagationSimulationData, lightRayDiagramData]) {
      const component = resolveScene(id);
      expect(component).toBeDefined();
      expect(resolveScene(id)).toBe(component);
    }
    expect(resolveScene('unknown-scene')).toBeUndefined();
  });
});
