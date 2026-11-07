import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ContentBlockResponse, SceneRegistry } from './types';
import { ContentBlockRenderer } from './ContentBlockRenderer';
import { enUiKitMessages } from '../../../testing/uiKitMessages.unit.fx';

const first: ContentBlockResponse = { id: 'first', type: 'text', value: 'First block' };
const last: ContentBlockResponse = { id: 'last', type: 'text', value: 'Last block' };

describe('ContentBlockRenderer', () => {
  it('renders nothing when blocks are absent or empty', () => {
    const { container, rerender } = render(<ContentBlockRenderer messages={enUiKitMessages} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<ContentBlockRenderer messages={enUiKitMessages} blocks={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('dispatches each block in array order', () => {
    const { container } = render(
      <ContentBlockRenderer
        messages={enUiKitMessages}
        blocks={[
          first,
          {
            id: 'middle',
            type: 'markdown',
            text: '**Middle block**',
          },
          last,
        ]}
      />,
    );
    expect([...container.querySelectorAll('p')].map(element => element.textContent)).toEqual([
      'First block',
      'Middle block',
      'Last block',
    ]);
  });

  it('renders Markdown responses through the dispatcher with their locale direction', () => {
    render(
      <ContentBlockRenderer
        messages={enUiKitMessages}
        language="ar"
        blocks={[
          {
            id: 'rtl-markdown',
            type: 'markdown',
            text: '# عنوان الدرس\n\n**نص عربي**',
          },
        ]}
      />,
    );
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('dir', 'rtl');
    expect(article).toHaveAttribute('lang', 'ar-SA');
    expect(screen.getByRole('heading', { name: 'عنوان الدرس' })).toBeVisible();
  });

  it('renders checkpoint answers through the same dispatcher', () => {
    render(
      <ContentBlockRenderer
        messages={enUiKitMessages}
        blocks={[
          {
            id: 'checkpoint',
            type: 'checkpoint',
            title: 'Review',
            items: [{ question: 'What is first?', answer: [first] }],
          },
        ]}
      />,
    );
    fireEvent.click(screen.getByText('What is first?'));
    expect(screen.getByText('First block')).toBeVisible();
  });

  it('continues to resolve scenes from the supplied registry', () => {
    const sceneRegistry: SceneRegistry = id =>
      id === 'diagram' ? ({ locales }) => <div role="img" aria-label={locales.title as string} /> : undefined;
    render(
      <ContentBlockRenderer
        messages={enUiKitMessages}
        blocks={[
          {
            id: 'diagram',
            type: 'scene',
            locales: { title: 'Diagram' },
          },
        ]}
        sceneRegistry={sceneRegistry}
      />,
    );
    expect(screen.getByRole('img', { name: 'Diagram' })).toBeVisible();
  });

  it('does not dispatch quiz entries as content blocks', () => {
    const quiz = { id: 'quiz', type: 'quiz' } as unknown as ContentBlockResponse;
    expect(() => render(<ContentBlockRenderer messages={enUiKitMessages} blocks={[quiz]} />)).toThrow(
      'requires a supported response.type',
    );
  });
});

describe('ContentBlockRenderer guard and state coverage', () => {
  it('rejects a response without a type discriminator', () => {
    const untagged = { id: 'untagged', value: 'Ambiguous content' } as unknown as ContentBlockResponse;
    expect(() => render(<ContentBlockRenderer messages={enUiKitMessages} blocks={[untagged]} />)).toThrow(
      'requires a supported response.type discriminator',
    );
  });

  it('preserves an expanded and checked checkpoint when a sibling text block changes', () => {
    const checkpoint: ContentBlockResponse = {
      id: 'persistent-checkpoint',
      type: 'checkpoint',
      title: 'Review',
      enableChecks: true,
      items: [{ question: 'What did you learn?', answer: [last] }],
    };
    const { rerender } = render(<ContentBlockRenderer messages={enUiKitMessages} blocks={[first, checkpoint]} />);
    fireEvent.click(screen.getByText('What did you learn?'));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();

    rerender(
      <ContentBlockRenderer messages={enUiKitMessages} blocks={[{ ...first, value: 'Updated opening' }, checkpoint]} />,
    );
    expect(screen.getByText('Updated opening')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();
  });
});
