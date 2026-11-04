import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type { ContentBlock_Markdown_Response } from '@svitlo/engine/content';

import { localizedAttributes } from '../../utils';
import { useContentLanguage } from '../../ContentLanguageContext';
import styles from './Markdown.module.css';

// Retain the lesson-specific elements while sanitizing authored HTML.
const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'mark', 'aside'],
};

/** Render a published, localized Markdown content block. */
export const Markdown = ({ text }: ContentBlock_Markdown_Response) => {
  const contentLanguage = useContentLanguage();
  return (
    <article {...localizedAttributes({ locale: { code: contentLanguage } })} className={styles.content}>
      <ReactMarkdown rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}>{text}</ReactMarkdown>
    </article>
  );
};
