import { lazy } from 'react';
import type { SceneRegistry } from '@svitlo/ui-kit/widgets';

type SceneComponent = NonNullable<ReturnType<SceneRegistry>>;
type SceneModule = { default: SceneComponent };

/** Next.js requires statically analyzable import paths; dynamic Vite glob imports are not supported. */
const sceneImports: Readonly<Record<string, () => Promise<SceneModule>>> = {
  'how-light-moves-scene-showcase': () =>
    import('./e/how-light-moves-scene-showcase').then(mod => ({ default: mod.default as unknown as SceneComponent })),
  'how-light-moves-scene-propagation': () =>
    import('./n/how-light-moves-scene-propagation').then(mod => ({
      default: mod.default as unknown as SceneComponent,
    })),
  'how-light-moves-scene-ray': () =>
    import('./y/how-light-moves-scene-ray').then(mod => ({ default: mod.default as unknown as SceneComponent })),
};

const cache = new Map<string, SceneComponent>();

export const resolveScene: SceneRegistry = id => {
  const load = sceneImports[id];
  if (!load) return undefined;
  let component = cache.get(id);
  if (!component) {
    component = lazy(load);
    cache.set(id, component);
  }
  return component;
};
