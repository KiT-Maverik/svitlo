import { lazy } from 'react';
import type { SceneRegistry } from '@svitlo/ui-kit';

type SceneComponent = NonNullable<ReturnType<SceneRegistry>>;
export type SceneModule = { default: SceneComponent };

/** Reuse in-flight/loaded modules, but allow a fresh import after a failure. */
export function createSceneRegistry(sceneImports: Readonly<Record<string, () => Promise<SceneModule>>>) {
  const pending = new Map<string, Promise<SceneModule>>();
  const components = new Map<string, SceneComponent>();

  function loadScene(id: string): Promise<SceneModule> {
    const load = sceneImports[id];
    if (!load) return Promise.reject(new Error('Unregistered scene id: ' + id));

    let promise = pending.get(id);
    if (!promise) {
      promise = Promise.resolve()
        .then(load)
        .catch(error => {
          if (pending.get(id) === promise) {
            pending.delete(id);
            components.delete(id);
          }
          throw error;
        });
      pending.set(id, promise);
    }
    return promise;
  }

  function preloadScene(id: string): Promise<void> {
    return loadScene(id).then(() => undefined);
  }

  const resolveScene: SceneRegistry = id => {
    if (!sceneImports[id]) return undefined;
    let component = components.get(id);
    if (!component) {
      component = lazy(() => loadScene(id));
      components.set(id, component);
    }
    return component;
  };

  return { preloadScene, resolveScene };
}
