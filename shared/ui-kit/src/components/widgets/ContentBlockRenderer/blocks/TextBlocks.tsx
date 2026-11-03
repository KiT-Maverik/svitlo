import MarkdownContent from '../../MarkdownContent/MarkdownContent';
import type { ContentBlockResponse } from '../types';
import { localizedAttributes } from '../utils';

export function TextBlock({ response }: { response: ContentBlockResponse<'text'> }) {
  return <p {...localizedAttributes(response)}>{response.value}</p>;
}
