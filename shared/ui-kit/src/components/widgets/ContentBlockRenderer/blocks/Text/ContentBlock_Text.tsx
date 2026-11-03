import type { ContentBlockResponse } from '../../types';
import { localizedAttributes } from '../../utils';

export const ContentBlock_Text = ({ response }: { response: ContentBlockResponse<'text'> }) => (
  <p {...localizedAttributes(response)}>{response.value}</p>
);
