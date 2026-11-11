import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { applyStyledText } from './applyStyledText';
import { parseText } from '../text/parseText';
import styles from './StyledText.module.css';

describe('styledText utilities', () => {
  it('parses a string independently of a rendering component', () => {
    expect(parseText('Hi %_%id: name; value: John%_%')).toEqual([
      { kind: 'text', value: 'Hi ' },
      { kind: 'fragment', id: 'name', value: 'John' },
    ]);
  });

  it('preserves non-Text markers and malformed identifiers literally', () => {
    expect(parseText('print(%_%NAME%_%)')).toEqual([{ kind: 'text', value: 'print(%_%NAME%_%)' }]);
    expect(parseText('Hello %_%id: snake_case; value: John%_%')).toEqual([
      { kind: 'text', value: 'Hello %_%id: snake_case; value: John%_%' },
    ]);
  });

  it('applies styles when embedded in another element', () => {
    const content = applyStyledText({
      text: 'Hi %_%id: name; value: John%_%',
      variables: { name: { applyStyle: ['bold', 'highlight'], tone: 'success' } },
    });
    const html = renderToStaticMarkup(<strong>{content}</strong>);

    expect(html).toContain('<strong>Hi ');
    expect(html).toContain(styles.bold);
    expect(html).toContain(styles.highlightSuccess);
    expect(html).toContain('John</span></strong>');
  });
});
