import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import remarkMath from 'remark-math';

import type { ContentBlock_Markdown_Props } from '@svitlo/engine/runtime';

import { useContentLanguage } from '../../ContentLanguageContext';
import { localizedAttributes, resolveLocalizedRecord } from '../../utils';
import { resolveTemplateVariables } from '../resolveTemplateVariables';
import styles from './Markdown.module.css';

// Retain the lesson-specific elements while sanitizing authored HTML.
const schema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'mark', 'aside'],
  attributes: {
    ...defaultSchema.attributes,
    // Sanitize authored math markers BEFORE KaTeX generates MathML and HTML.
    code: [...(defaultSchema.attributes?.code ?? []), ['className', /^language-/, 'math-inline', 'math-display']],
  },
} satisfies typeof defaultSchema;

/**
 * Render a published, localized Markdown content block.
 * Supports inline `$...$` and display `$$...$$` LaTeX formulas with KaTeX,
 * including accessible MathML and safely sanitized authored HTML.
 */
export const Markdown = ({ locale: { value, variables } }: ContentBlock_Markdown_Props) => {
  const contentLanguage = useContentLanguage();
  return (
    <article {...localizedAttributes({ locale: { code: contentLanguage } })} className={styles.content}>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, schema], [rehypeKatex, { trust: false, throwOnError: false }]]}
      >
        {resolveTemplateVariables(value, resolveLocalizedRecord(variables, contentLanguage, 'markdown.variables'))}
      </ReactMarkdown>
    </article>
  );
};
