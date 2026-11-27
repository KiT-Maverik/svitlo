import { render, screen, within } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import type { ContentBlock_Markdown_Data } from '@svitlo/engine/runtime';

import { ContentLanguageContext } from '../../ContentLanguageContext';
import { Markdown } from './Markdown';

const response: ContentBlock_Markdown_Data = {
  id: 'markdown-example',
  slug: 'markdownExample',
  type: 'markdown',
  params: {},
  locale: { value: '# Lesson title\n\n[Reference](https://example.org/lesson)' },
};

describe('Markdown content block', () => {
  it('renders headings, paragraphs and accessible links from the published text', () => {
    render(<Markdown {...response} />);
    const article = screen.getByRole('article');
    expect(within(article).getByRole('heading', { name: 'Lesson title', level: 1 })).toBeVisible();
    expect(within(article).getByRole('link', { name: 'Reference' })).toHaveAttribute(
      'href',
      'https://example.org/lesson',
    );
    expect(article).toHaveAttribute('lang', 'en-US');
    expect(article).toHaveAttribute('dir', 'ltr');
  });

  it('renders Markdown lists, emphasis, inline code and fenced code', () => {
    render(
      <Markdown
        {...response}
        locale={{
          ...response.locale,
          value: '## Practice\n\n- **First** point\n- *Second* point\n\nUse `const`.\n\n```js\nconst answer = 42;\n```',
        }}
      />,
    );
    const article = screen.getByRole('article');
    expect(within(article).getByRole('heading', { name: 'Practice', level: 2 })).toBeVisible();
    expect(article.querySelectorAll('li')).toHaveLength(2);
    expect(article.querySelector('strong')).toHaveTextContent('First');
    expect(article.querySelector('em')).toHaveTextContent('Second');
    expect(article.querySelector('p code')).toHaveTextContent('const');
    expect(article.querySelector('pre code')).toHaveTextContent('const answer = 42;');
  });

  it('derives language and RTL direction from the selected lesson language', () => {
    render(
      <ContentLanguageContext.Provider value="ar">
        <Markdown {...response} locale={{ ...response.locale, value: '# عنوان الدرس\n\nنص عربي' }} />
      </ContentLanguageContext.Provider>,
    );
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('lang', 'ar-SA');
    expect(article).toHaveAttribute('dir', 'rtl');
    expect(within(article).getByRole('heading', { name: 'عنوان الدرس' })).toBeVisible();
  });

  it('replaces Code-style markers before rendering Markdown', () => {
    render(
      <Markdown {...response} locale={{ ...response.locale, value: '# %_%NAME%_%', variables: { NAME: 'Ada' } }} />,
    );
    expect(screen.getByRole('heading', { name: 'Ada' })).toBeVisible();
  });

  it('sanitizes HTML supplied through variables', () => {
    render(
      <Markdown
        {...response}
        locale={{ ...response.locale, value: '**%_%VALUE%_%**', variables: { VALUE: '<script>alert(1)</script>Safe' } }}
      />,
    );
    const article = screen.getByRole('article');
    expect(article.querySelector('script')).toBeNull();
    expect(article).toHaveTextContent('Safe');
  });

  it('supports the authored mark and aside elements', () => {
    render(
      <Markdown
        {...response}
        locale={{ ...response.locale, value: '<aside><mark>Highlighted lesson</mark></aside>' }}
      />,
    );
    expect(screen.getByRole('article').querySelector('aside mark')).toHaveTextContent('Highlighted lesson');
  });

  it('sanitizes scripts and inline event handlers without removing safe content', () => {
    render(
      <Markdown
        {...response}
        locale={{
          ...response.locale,
          value:
            '<p onclick="alert(1)">Safe content</p><script>alert(1)</script><img src="image.png" onerror="alert(1)" alt="Example" />',
        }}
      />,
    );
    const article = screen.getByRole('article');
    expect(article).toHaveTextContent('Safe content');
    expect(article.querySelector('script')).toBeNull();
    expect(article.querySelector('[onclick], [onerror]')).toBeNull();
    expect(article.querySelector('img')).toHaveAttribute('alt', 'Example');
  });

  it('removes executable URLs from authored links', () => {
    render(
      <Markdown
        {...response}
        locale={{
          ...response.locale,
          value: '<a href="javascript:alert(1)">Unsafe URL</a> and [safe URL](https://example.org)',
        }}
      />,
    );
    const article = screen.getByRole('article');
    expect(within(article).getByText('Unsafe URL')).not.toHaveAttribute('href', 'javascript:alert(1)');
    expect(article.querySelector('a[href^="javascript:"]')).toBeNull();
    expect(within(article).getByRole('link', { name: 'safe URL' })).toHaveAttribute('href', 'https://example.org');
  });

  it('updates the rendered content when a response changes', () => {
    const { rerender } = render(<Markdown {...response} locale={{ ...response.locale, value: '**Before**' }} />);
    expect(screen.getByText('Before').tagName).toBe('STRONG');

    rerender(<Markdown {...response} locale={{ ...response.locale, value: '*After*' }} />);
    expect(screen.getByText('After').tagName).toBe('EM');
    expect(screen.queryByText('Before')).toBeNull();
  });

  it('supports an empty Markdown response without producing a placeholder', () => {
    render(<Markdown {...response} locale={{ ...response.locale, value: '\n' }} />);
    const article = screen.getByRole('article');
    expect(article).toBeEmptyDOMElement();
    expect(article).toHaveAttribute('lang', 'en-US');
  });

  it('renders inline and display LaTeX with accessible MathML', () => {
    render(
      <Markdown {...response} locale={{ ...response.locale, value: 'Area $S = \\pi r^2$.\n\n$$\nE = mc^2\n$$' }} />,
    );
    const article = screen.getByRole('article');
    expect(article).toHaveTextContent('Area');
    expect(article.querySelector('p .katex')).not.toBeNull();
    expect(article.querySelector('.katex-display .katex')).not.toBeNull();
    expect(article.querySelectorAll('.katex-mathml math')).toHaveLength(2);
  });

  it('renders math after resolving localized Markdown variables', () => {
    render(<Markdown {...response} locale={{ value: 'Square: $%_%FORMULA%_%$', variables: { FORMULA: 'x^2' } }} />);
    expect(screen.getByRole('article').querySelector('.katex')).not.toBeNull();
    expect(screen.getByRole('article')).toHaveTextContent('Square:');
  });

  it('preserves RTL prose while rendering mathematical expressions', () => {
    render(
      <ContentLanguageContext.Provider value="ar">
        <Markdown {...response} locale={{ value: 'المساحة: $S = \\pi r^2$' }} />
      </ContentLanguageContext.Provider>,
    );
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('dir', 'rtl');
    expect(article.querySelector('.katex-mathml math')).not.toBeNull();
  });

  it('does not interpret escaped currency as LaTeX', () => {
    render(<Markdown {...response} locale={{ value: 'Price: \\$5 and \\$10.' }} />);
    const article = screen.getByRole('article');
    expect(article).toHaveTextContent('Price: $5 and $10.');
    expect(article.querySelector('.katex')).toBeNull();
  });

  it('does not trust dangerous TeX links and keeps raw HTML sanitized', () => {
    render(
      <Markdown {...response} locale={{ value: '<script>alert(1)</script> $\\href{javascript:alert(1)}{click}$' }} />,
    );
    const article = screen.getByRole('article');
    expect(article.querySelector('script')).toBeNull();
    expect(article.querySelector('a[href^="javascript:"]')).toBeNull();
    expect(article).toHaveTextContent('click');
  });

  it('renders math on the server without client-side typesetting', () => {
    const html = renderToStaticMarkup(<Markdown {...response} locale={{ value: '$\\sqrt{x}$' }} />);
    expect(html).toContain('class="katex"');
    expect(html).toContain('<math');
  });

  it('renders the same safe Markdown on the server', () => {
    const html = renderToStaticMarkup(
      <Markdown
        {...response}
        locale={{ ...response.locale, value: '<aside><mark>Safe note</mark></aside><script>alert(1)</script>' }}
      />,
    );
    expect(html).toContain('<article');
    expect(html).toContain('<aside><mark>Safe note</mark></aside>');
    expect(html).not.toContain('<script');
  });
});
