import type { ContentBlockResponse, SceneRegistry } from '../../types';

export const Scene = ({ response, sceneRegistry }: {
  response: ContentBlockResponse<'scene'>;
  sceneRegistry?: SceneRegistry;
}) => {
  const Scene = sceneRegistry?.[response.id];
  if (!Scene) throw new Error('Unregistered scene id: ' + response.id);
  return <Scene locale={response.locale} />;
};
