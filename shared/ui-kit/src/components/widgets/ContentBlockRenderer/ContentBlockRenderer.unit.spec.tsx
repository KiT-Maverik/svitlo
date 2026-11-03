import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ContentBlockResponse, SceneRegistry } from './types';
import { ContentBlockRenderer } from './ContentBlockRenderer';

const locale = { code: 'en' as const };
const first: ContentBlockResponse = { id: 'first', type: 'text', locale, value: 'First block' };
const last: ContentBlockResponse = { id: 'last', type: 'text', locale, value: 'Last block' };

describe('ContentBlockRenderer', () => {
  it('renders nothing when blocks are absent or empty', () => {
    const { container, rerender } = render(<ContentBlockRenderer />);
    expect(container).toBeEmptyDOMElement();
    rerender(<ContentBlockRenderer blocks={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('dispatches each block in array order', () => {
    const { container } = render(<ContentBlockRenderer blocks={[first, {
      id: 'middle', type: 'markdown', locale, text: '**Middle block**',
    }, last]} />);
    expect([...container.querySelectorAll('p')].map(element => element.textContent))
      .toEqual(['First block', 'Middle block', 'Last block']);
  });

  it('renders Markdown responses through the dispatcher with their locale direction', () => {
    render(<ContentBlockRenderer blocks={[{
      id: 'rtl-markdown', type: 'markdown', locale: { code: 'ar' },
      text: '# عنوان الدرس\n\n**نص عربي**',
    }]} />);
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('dir', 'rtl');
    expect(article).toHaveAttribute('lang', 'ar-SA');
    expect(screen.getByRole('heading', { name: 'عنوان الدرس' })).toBeVisible();
  });

  it('renders checkpoint answers through the same dispatcher', () => {
    render(<ContentBlockRenderer blocks={[{
      id: 'checkpoint', type: 'checkpoint', locale, title: 'Review',
      items: [{ question: 'What is first?', answer: [first] }],
    }]} />);
    fireEvent.click(screen.getByText('What is first?'));
    expect(screen.getByText('First block')).toBeVisible();
  });

  it('continues to resolve scenes from the supplied registry', () => {
    const sceneRegistry: SceneRegistry = {
      diagram: ({ locale: current }) => <div role="img" aria-label={`diagram-${current.code}`} />,
    };
    render(<ContentBlockRenderer blocks={[{
      id: 'diagram', type: 'scene', locale, rendererKey: 'diagram',
      messages: { title: 'Diagram' },
    }]} sceneRegistry={sceneRegistry} />);
    expect(screen.getByRole('img', { name: 'diagram-en' })).toBeVisible();
  });

  it('does not dispatch quiz entries as content blocks', () => {
    const quiz = { id: 'quiz', type: 'quiz', locale } as unknown as ContentBlockResponse;
    expect(() => render(<ContentBlockRenderer blocks={[quiz]} />)).toThrow('requires a supported response.type');
  });
});


describe('ContentBlockRenderer guard and state coverage', () => {
  it('rejects a response without a type discriminator', () => {
    const untagged = { id: 'untagged', locale, value: 'Ambiguous content' } as unknown as ContentBlockResponse;
    expect(() => render(<ContentBlockRenderer blocks={[untagged]} />))
      .toThrow('requires a supported response.type discriminator');
  });

  it('preserves an expanded and checked checkpoint when a sibling text block changes', () => {
    const checkpoint: ContentBlockResponse = {
      id: 'persistent-checkpoint', type: 'checkpoint', locale, title: 'Review',
      enableChecks: true,
      items: [{ question: 'What did you learn?', answer: [last] }],
    };
    const { rerender } = render(<ContentBlockRenderer blocks={[first, checkpoint]} />);
    fireEvent.click(screen.getByText('What did you learn?'));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();

    rerender(<ContentBlockRenderer blocks={[{ ...first, value: 'Updated opening' }, checkpoint]} />);
    expect(screen.getByText('Updated opening')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();
  });
});
