import { render, screen, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { ContentBlock_Markdown_Response } from '@svitlo/engine/content';

import { Markdown } from './Markdown';

const response: ContentBlock_Markdown_Response = {
  id: 'markdown-example',
  type: 'markdown',
  locale: { code: 'en' },
  text: '# Lesson title\n\n[Reference](https://example.org/lesson)',
};

describe('Markdown content block', () => {
  it('renders headings, paragraphs and accessible links from the published text', () => {
    render(<Markdown {...response} />);
    const article = screen.getByRole('article');
    expect(within(article).getByRole('heading', { name: 'Lesson title', level: 1 })).toBeVisible();
    expect(within(article).getByRole('link', { name: 'Reference' }))
      .toHaveAttribute('href', 'https://example.org/lesson');
    expect(article).toHaveAttribute('lang', 'en-US');
    expect(article).toHaveAttribute('dir', 'ltr');
  });

  it('renders Markdown lists, emphasis, inline code and fenced code', () => {
    render(<Markdown {...response} text={
      '## Practice\n\n- **First** point\n- *Second* point\n\nUse `const`.\n\n```js\nconst answer = 42;\n```'
    } />);
    const article = screen.getByRole('article');
    expect(within(article).getByRole('heading', { name: 'Practice', level: 2 })).toBeVisible();
    expect(article.querySelectorAll('li')).toHaveLength(2);
    expect(article.querySelector('strong')).toHaveTextContent('First');
    expect(article.querySelector('em')).toHaveTextContent('Second');
    expect(article.querySelector('p code')).toHaveTextContent('const');
    expect(article.querySelector('pre code')).toHaveTextContent('const answer = 42;');
  });

  it('derives language and RTL direction from the response locale', () => {
    render(<Markdown {...response} locale={{ code: 'ar' }} text={'# عنوان الدرس\n\nنص عربي'} />);
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('lang', 'ar-SA');
    expect(article).toHaveAttribute('dir', 'rtl');
    expect(within(article).getByRole('heading', { name: 'عنوان الدرس' })).toBeVisible();
  });

  it('supports the authored mark and aside elements', () => {
    render(<Markdown {...response} text="<aside><mark>Highlighted lesson</mark></aside>" />);
    expect(screen.getByRole('article').querySelector('aside mark'))
      .toHaveTextContent('Highlighted lesson');
  });

  it('sanitizes scripts and inline event handlers without removing safe content', () => {
    render(<Markdown {...response} text={
      '<p onclick="alert(1)">Safe content</p><script>alert(1)</script><img src="image.png" onerror="alert(1)" alt="Example" />'
    } />);
    const article = screen.getByRole('article');
    expect(article).toHaveTextContent('Safe content');
    expect(article.querySelector('script')).toBeNull();
    expect(article.querySelector('[onclick], [onerror]')).toBeNull();
    expect(article.querySelector('img')).toHaveAttribute('alt', 'Example');
  });

  it('removes executable URLs from authored links', () => {
    render(<Markdown {...response} text={
      '<a href="javascript:alert(1)">Unsafe URL</a> and [safe URL](https://example.org)'
    } />);
    const article = screen.getByRole('article');
    expect(within(article).getByText('Unsafe URL')).not.toHaveAttribute('href', 'javascript:alert(1)');
    expect(article.querySelector('a[href^="javascript:"]')).toBeNull();
    expect(within(article).getByRole('link', { name: 'safe URL' }))
      .toHaveAttribute('href', 'https://example.org');
  });

  it('updates the rendered content when a response changes', () => {
    const { rerender } = render(<Markdown {...response} text="**Before**" />);
    expect(screen.getByText('Before').tagName).toBe('STRONG');

    rerender(<Markdown {...response} text="*After*" />);
    expect(screen.getByText('After').tagName).toBe('EM');
    expect(screen.queryByText('Before')).toBeNull();
  });

  it('supports an empty Markdown response without producing a placeholder', () => {
    render(<Markdown {...response} text="" />);
    const article = screen.getByRole('article');
    expect(article).toBeEmptyDOMElement();
    expect(article).toHaveAttribute('lang', 'en-US');
  });

  it('renders the same safe Markdown on the server', () => {
    const html = renderToStaticMarkup(
      <Markdown {...response} text="<aside><mark>Safe note</mark></aside><script>alert(1)</script>" />,
    );
    expect(html).toContain('<article');
    expect(html).toContain('<aside><mark>Safe note</mark></aside>');
    expect(html).not.toContain('<script');
  });
});
