import { Suspense } from 'react';
import type { ResponseOf, SceneRegistry } from '../../types';

export const Scene = ({ response, sceneRegistry }: {
  response: ResponseOf<'scene'>;
  sceneRegistry?: SceneRegistry;
}) => {
  const Scene = sceneRegistry?.(response.id);
  if (!Scene) throw new Error('Unregistered scene id: ' + response.id);
  return <Suspense fallback={null}><Scene messages={response.messages} /></Suspense>;
};
