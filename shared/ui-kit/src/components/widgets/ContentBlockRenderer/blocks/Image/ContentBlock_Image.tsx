import type { ContentBlockResponse } from '../../types';
import { localizedAttributes } from '../../utils';

export const ContentBlock_Image = ({ response }: { response: ContentBlockResponse<'image'> }) => {
  return <img {...localizedAttributes(response)} src={response.src} alt={response.alt} loading="lazy" />;
};
