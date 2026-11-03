import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Text, type TextProps } from './Text';
import styles from './Text.module.css';

describe('Text', () => {
  it('renders marker values without service syntax when no styling is supplied', () => {
    render(<Text text="Hello {{id: name; value: John}}!" />);
    const paragraph = screen.getByText('Hello John!');
    expect(paragraph.tagName).toBe('P');
    expect(paragraph.textContent).not.toContain('{{');
  });

  it('applies configured styles to matching fragments in one span', () => {
    render(<Text
      text="{{id: name; value: John}} and {{id: name; value: Jane}}"
      styling={[{ id: 'name', applyStyle: ['variable', 'bold', 'underscore'], applyColor: 'red' }]}
    />);
    for (const value of ['John', 'Jane']) {
      const span = screen.getByText(value);
      expect(span.tagName).toBe('SPAN');
      expect(span).toHaveClass(styles.variable, styles.bold);
      expect(span).toHaveStyle({ color: 'rgb(255, 0, 0)' });
      expect(span.style.textDecorationLine).toBe('underline');
    }
  });

  it('selects a MUI palette token for each highlight tone without inline colors', () => {
    const text = '{{id: default; value: Default}} {{id: info; value: Info}} {{id: neutral; value: Neutral}} {{id: success; value: Success}}';
    const styling = [
      { id: 'default', applyStyle: ['highlight'] },
      { id: 'info', applyStyle: ['highlight'], tone: 'info' },
      { id: 'neutral', applyStyle: ['highlight'], tone: 'neutral' },
      { id: 'success', applyStyle: ['highlight'], tone: 'success' },
    ] satisfies NonNullable<TextProps['styling']>;
    render(<Text text={text} styling={styling} />);

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
      <Text text="Hello {{id: name; value: John}}" styling={[{ id: 'name', applyStyle: ['highlight'], tone: 'info' }]} />,
    );
    expect(html).toContain('Hello ');
    expect(html).toContain('John');
    expect(html).toContain(styles.highlightInfo);
    expect(html).not.toContain('{{');
  });

  it('ignores styling for absent or unmatched ids and keeps the value visible', () => {
    const { rerender, container } = render(<Text text="Plain text" styling={[{ id: 'missing', applyStyle: ['highlight'] }]} />);
    expect(container.querySelector('span')).toBeNull();
    rerender(<Text text="Hi {{id: name; value: John}}" styling={[{ id: 'other', applyStyle: ['bold'] }]} />);
    expect(screen.getByText('Hi John')).toBeVisible();
    expect(container.querySelector('span')).toBeNull();
  });

  it('supports unwrapped output and Typography props', () => {
    const { container, rerender } = render(<Text text="Bare {{id: name; value: John}}" wrap={{ enabled: false }} />);
    expect(container.textContent).toBe('Bare John');
    expect(container.querySelector('p')).toBeNull();
    rerender(<Text text="Wrapped" wrap={{ typographyProps: { component: 'h2', id: 'title' } }} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Wrapped' })).toHaveAttribute('id', 'title');
  });

  it('keeps readable text when a marker is incomplete', () => {
    const { container } = render(<Text text="Hello {{id: name; value: John" />);
    expect(container.textContent).toBe('Hello John');
  });

  it('recovers from an unfinished marker before another marker', () => {
    const { container } = render(<Text text="{{id: first; value: John {{id: second; value: Jane}}" />);
    expect(container.textContent).toBe('John Jane');
    expect(container.textContent).not.toContain('{{');
  });

  it('does not expose an unmatched closing delimiter', () => {
    const { container } = render(<Text text="Hello John }}" />);
    expect(container.textContent).toBe('Hello John ');
  });
});
