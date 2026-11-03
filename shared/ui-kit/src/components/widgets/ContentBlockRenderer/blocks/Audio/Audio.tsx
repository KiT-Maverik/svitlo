import type { ContentBlockResponse } from '../../types';
import { localizedAttributes } from '../../utils';

export const Audio = ({ response }: { response: ContentBlockResponse<'audio'> }) => {
  return (
    <figure {...localizedAttributes(response)}>
      <audio controls src={response.fileLocation} aria-label={response.title} preload="metadata" />
      {response.description && <figcaption>{response.description}</figcaption>}
    </figure>
  );
};
