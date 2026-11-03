import MarkdownContent from '../../../MarkdownContent/MarkdownContent';
import type { ResponseOf } from '../../types';
import { localizedAttributes } from '../../utils';

export const Markdown = ({ response }: { response: ResponseOf<'markdown'> }) => {
  return <MarkdownContent content={response.text} {...localizedAttributes(response)} />;
};
