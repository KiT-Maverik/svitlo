import type { ContentBlock_Code_Response } from '@svitlo/contracts/content';

import { localizedAttributes } from '../../utils';
import { useContentLanguage } from '../../ContentLanguageContext';
import { highlightCode, resolveCodeVariables } from './Code.utils';
import styles from './Code.module.css';

export const Code = ({ code, language, title, variables }: ContentBlock_Code_Response) => {
  const contentLanguage = useContentLanguage();
  const value = resolveCodeVariables(code, variables);
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
