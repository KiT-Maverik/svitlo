import MarkdownContent from '../../../MarkdownContent/MarkdownContent';
import type { ContentBlockResponse } from '../../types';
import { localizedAttributes } from '../../utils';

export const ContentBlock_Markdown = ({ response }: { response: ContentBlockResponse<'markdown'> }) => {
  return <MarkdownContent content={response.text} {...localizedAttributes(response)} />;
};
