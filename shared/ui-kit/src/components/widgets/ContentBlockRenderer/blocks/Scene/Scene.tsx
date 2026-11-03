import type { ResponseOf, SceneRegistry } from '../../types';

export const Scene = ({ response, sceneRegistry }: {
  response: ResponseOf<'scene'>;
  sceneRegistry?: SceneRegistry;
}) => {
  const Scene = sceneRegistry?.[response.id];
  if (!Scene) throw new Error('Unregistered scene id: ' + response.id);
  return <Scene locale={response.locale} />;
};
