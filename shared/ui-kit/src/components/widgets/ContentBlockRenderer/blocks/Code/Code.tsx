import type { ContentBlock_Code_Props } from '@svitlo/engine/runtime';

import { useContentLanguage } from '../../ContentLanguageContext';
import { localizedAttributes, resolveLocalizedRecord, resolveOptionalLocalizedText } from '../../utils';
import styles from './Code.module.css';
import { highlightCode, resolveCodeVariables } from './Code.utils';

export const Code = ({ params: { codeAsText, language }, locale }: ContentBlock_Code_Props) => {
  const contentLanguage = useContentLanguage();
  const value = resolveCodeVariables(
    codeAsText,
    resolveLocalizedRecord(locale?.variables, contentLanguage, 'code.variables'),
  );
  const title = resolveOptionalLocalizedText(locale?.title, contentLanguage, 'code.title');
  const highlighted = highlightCode(value, language);

  return (
    <figure {...localizedAttributes({ locale: { code: contentLanguage } })} className={styles.figure}>
      <figcaption className={styles.header}>
        {title && <span>{title}</span>}
        <span className={styles.language}>{language}</span>
      </figcaption>
      <pre className={styles.pre}>
        <code className={styles.code}>
          {highlighted === null ? value : <span dangerouslySetInnerHTML={{ __html: highlighted }} />}
        </code>
      </pre>
    </figure>
  );
};
