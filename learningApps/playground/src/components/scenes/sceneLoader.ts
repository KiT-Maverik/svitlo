import { lazy } from 'react';
import type { SceneRegistry } from '@svitlo/ui-kit/widgets';

type SceneComponent = NonNullable<ReturnType<SceneRegistry>>;
type SceneModule = { default: SceneComponent };

const modules = import.meta.glob<SceneModule>('./*/*/index.ts');
const cache = new Map<string, SceneComponent>();

export const resolveScene: SceneRegistry = id => {
  if (!/^[a-zA-Z0-9-]+$/.test(id)) return undefined;
  const path = `./${id.at(-1)}/${id}/index.ts`;
  const load = modules[path];
  if (!load) return undefined;
  let component = cache.get(id);
  if (!component) {
    component = lazy(load);
    cache.set(id, component);
  }
  return component;
};
