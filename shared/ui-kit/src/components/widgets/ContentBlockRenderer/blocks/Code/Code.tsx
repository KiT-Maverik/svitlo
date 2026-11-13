import type { ContentBlock_Code_Props } from '@svitlo/engine/runtime';

import { localizedAttributes } from '../../utils';
import { useContentLanguage } from '../../ContentLanguageContext';
import { highlightCode, resolveCodeVariables } from './Code.utils';
import styles from './Code.module.css';

export const Code = ({ params: { codeAsText, language }, locale }: ContentBlock_Code_Props) => {
  const contentLanguage = useContentLanguage();
  const value = resolveCodeVariables(codeAsText, locale?.variables);
  const highlighted = highlightCode(value, language);

  return (
    <figure {...localizedAttributes({ locale: { code: contentLanguage } })} className={styles.figure}>
      <figcaption className={styles.header}>
        {locale?.title && <span>{locale.title}</span>}
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
