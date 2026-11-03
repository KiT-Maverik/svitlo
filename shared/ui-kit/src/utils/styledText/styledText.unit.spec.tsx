import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { applyStyledText } from './applyStyledText';
import { parseText } from '../text/parseText';
import styles from './StyledText.module.css';

describe('styledText utilities', () => {
  it('parses a string independently of a rendering component', () => {
    expect(parseText('Hi {{id: name; value: John}}')).toEqual([
      { kind: 'text', value: 'Hi ' },
      { kind: 'fragment', id: 'name', value: 'John' },
    ]);
  });

  it('parses bare identifiers for use outside styled text', () => {
    expect(parseText('print({{name}})')).toEqual([
      { kind: 'text', value: 'print(' },
      { kind: 'fragment', id: 'name', value: 'name' },
      { kind: 'text', value: ')' },
    ]);
  });

  it('applies styles when embedded in another element', () => {
    const content = applyStyledText({
      text: 'Hi {{id: name; value: John}}',
      styling: [{ id: 'name', applyStyle: ['bold', 'highlight'], tone: 'success' }],
    });
    const html = renderToStaticMarkup(<strong>{content}</strong>);

    expect(html).toContain('<strong>Hi ');
    expect(html).toContain(styles.bold);
    expect(html).toContain(styles.highlightSuccess);
    expect(html).toContain('John</span></strong>');
  });
});
