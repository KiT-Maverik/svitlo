import { Suspense } from 'react';

import type { ResponseOf, SceneRegistry } from '../../types';

export const Scene = ({
  response,
  sceneRegistry,
  unavailableMessage,
}: {
  response: ResponseOf<'scene'>;
  sceneRegistry?: SceneRegistry;
  unavailableMessage?: string;
}) => {
  const Scene = sceneRegistry?.(response.id);
  // Preview content can reference Scenes that intentionally have no registry entry.
  // Keep the unavailable activity accessible instead of mounting an invalid component.
  if (!Scene) return <div role="status">{unavailableMessage ?? 'Interactive activity is unavailable'}</div>;
  return (
    <Suspense fallback={null}>
      <Scene locales={response.locale.value} />
    </Suspense>
  );
};
