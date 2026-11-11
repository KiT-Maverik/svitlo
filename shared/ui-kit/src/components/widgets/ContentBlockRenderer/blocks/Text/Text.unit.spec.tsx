import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ContentBlock_Text_Response } from '@svitlo/contracts/content';
import { Text } from './Text';
import styles from '#utils/styledText/StyledText.module.css';

const textResponse = (
  value: string,
  variables?: ContentBlock_Text_Response['variables'],
  wrap?: ContentBlock_Text_Response['wrap'],
): ContentBlock_Text_Response => ({ id: 'text-id', type: 'text', value, variables, wrap });

describe('Text', () => {
  it('renders marker values without service syntax when no styling is supplied', () => {
    render(<Text {...textResponse('Hello %_%id: name; value: John%_%!')} />);
    const paragraph = screen.getByText('Hello John!');
    expect(paragraph.tagName).toBe('P');
    expect(paragraph.textContent).not.toContain('%_%');
  });

  it('applies configured styles to matching fragments in one span', () => {
    render(
      <Text
        {...textResponse('%_%id: name; value: John%_% and %_%id: name; value: Jane%_%', {
          name: { applyStyle: ['variable', 'bold', 'underscore'], applyColor: 'red' },
        })}
      />,
    );
    for (const value of ['John', 'Jane']) {
      const span = screen.getByText(value);
      expect(span.tagName).toBe('SPAN');
      expect(span).toHaveClass(styles.variable, styles.bold);
      expect(span).toHaveStyle({ color: 'rgb(255, 0, 0)' });
      expect(span.style.textDecorationLine).toBe('underline');
    }
  });

  it('selects a MUI palette token for each highlight tone without inline colors', () => {
    const text =
      '%_%id: default; value: Default%_% %_%id: info; value: Info%_% %_%id: neutral; value: Neutral%_% %_%id: success; value: Success%_%';
    const variables = {
      default: { applyStyle: ['highlight'] },
      info: { applyStyle: ['highlight'], tone: 'info' },
      neutral: { applyStyle: ['highlight'], tone: 'neutral' },
      success: { applyStyle: ['highlight'], tone: 'success' },
    } satisfies NonNullable<ContentBlock_Text_Response['variables']>;
    render(<Text {...textResponse(text, variables)} />);

    expect(screen.getByText('Default')).toHaveClass(styles.highlight);
    expect(screen.getByText('Info')).toHaveClass(styles.highlight, styles.highlightInfo);
    expect(screen.getByText('Neutral')).toHaveClass(styles.highlight, styles.highlightNeutral);
    expect(screen.getByText('Success')).toHaveClass(styles.highlight, styles.highlightSuccess);
    for (const value of ['Default', 'Info', 'Neutral', 'Success']) {
      expect(screen.getByText(value).style.backgroundColor).toBe('');
    }
  });

  it('renders marked text on the server', () => {
    const html = renderToStaticMarkup(
      <Text
        {...textResponse('Hello %_%id: name; value: John%_%', { name: { applyStyle: ['highlight'], tone: 'info' } })}
      />,
    );
    expect(html).toContain('Hello ');
    expect(html).toContain('John');
    expect(html).toContain(styles.highlightInfo);
    expect(html).not.toContain('%_%');
  });

  it('ignores styling for absent or unmatched ids and keeps the value visible', () => {
    const { rerender, container } = render(
      <Text {...textResponse('Plain text', { missing: { applyStyle: ['highlight'] } })} />,
    );
    expect(container.querySelector('span')).toBeNull();
    rerender(<Text {...textResponse('Hi %_%id: name; value: John%_%', { other: { applyStyle: ['bold'] } })} />);
    expect(screen.getByText('Hi John')).toBeVisible();
    expect(container.querySelector('span')).toBeNull();
  });

  it('supports unwrapped output and Typography props', () => {
    const { container, rerender } = render(
      <Text {...textResponse('Bare %_%id: name; value: John%_%', undefined, { enabled: false })} />,
    );
    expect(container.textContent).toBe('Bare John');
    expect(container.querySelector('p')).toBeNull();
    rerender(<Text {...textResponse('Wrapped', undefined, { typographyProps: { component: 'h2', id: 'title' } })} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Wrapped' })).toHaveAttribute('id', 'title');
  });

  it('keeps readable text when a marker is incomplete', () => {
    const { container } = render(<Text {...textResponse('Hello %_%id: name; value: John')} />);
    expect(container.textContent).toBe('Hello %_%id: name; value: John');
  });

  it('recovers from an unfinished marker before another marker', () => {
    const { container } = render(<Text {...textResponse('%_%id: first; value: John %_%id: second; value: Jane%_%')} />);
    expect(container.textContent).toBe('%_%id: first; value: John Jane');
  });

  it('preserves an unmatched closing delimiter as ordinary text', () => {
    const { container } = render(<Text {...textResponse('Hello John %_%')} />);
    expect(container.textContent).toBe('Hello John %_%');
  });
});

describe('Text additional inline styling', () => {
  it('combines cursive and crossed-out styles on a single fragment', () => {
    render(
      <Text
        {...textResponse('The %_%id: old; value: outdated%_% wording is replaced.', {
          old: { applyStyle: ['cursive', 'crossed'] },
        })}
      />,
    );
    const fragment = screen.getByText('outdated');
    expect(fragment).toHaveClass(styles.cursive);
    expect(fragment).toHaveStyle({ textDecorationLine: 'line-through' });
  });

  it('preserves literal punctuation around multiple inline fragments', () => {
    const { container } = render(
      <Text {...textResponse('(%_%id: first; value: one%_%), [%_%id: second; value: two%_%]!')} />,
    );
    expect(container.textContent).toBe('(one), [two]!');
  });
});
