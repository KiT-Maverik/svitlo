import type { ContentBlockResponse } from '../../types';
import { localizedAttributes } from '../../utils';

export const ContentBlock_Video = ({ response }: { response: ContentBlockResponse<'video'> }) => {
  return (
    <video {...localizedAttributes(response)} controls src={response.fileLocation}
      poster={response.poster} preload="metadata" playsInline />
  );
};
