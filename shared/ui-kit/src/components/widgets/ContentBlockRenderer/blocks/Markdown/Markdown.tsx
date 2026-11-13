import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import type { ContentBlock_Markdown_Props } from '@svitlo/engine/runtime';

import { localizedAttributes } from '../../utils';
import { useContentLanguage } from '../../ContentLanguageContext';
import { resolveTemplateVariables } from '../resolveTemplateVariables';
import styles from './Markdown.module.css';

// Retain the lesson-specific elements while sanitizing authored HTML.
const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'mark', 'aside'],
};

/** Render a published, localized Markdown content block. */
export const Markdown = ({ locale: { value, variables } }: ContentBlock_Markdown_Props) => {
  const contentLanguage = useContentLanguage();
  return (
    <article {...localizedAttributes({ locale: { code: contentLanguage } })} className={styles.content}>
      <ReactMarkdown rehypePlugins={[rehypeRaw, [rehypeSanitize, schema]]}>
        {resolveTemplateVariables(value, variables)}
      </ReactMarkdown>
    </article>
  );
};
