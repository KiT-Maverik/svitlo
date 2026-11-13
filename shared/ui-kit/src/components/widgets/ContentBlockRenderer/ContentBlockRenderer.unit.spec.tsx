import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ContentBlockResponse, SceneRegistry } from './types';
import { ContentBlockRenderer } from './ContentBlockRenderer';
import { enUiKitMessages } from '../../../testing/uiKitMessages.unit.fx';

const textBlock = (id: string, value: string): ContentBlockResponse => ({
  id, slug: 'textBlock', type: 'text', params: {}, locale: { value },
});
const first = textBlock('first', 'First block');
const last = textBlock('last', 'Last block');
const markdown = (id: string, value: string): ContentBlockResponse => ({
  id, slug: 'markdown', type: 'markdown', params: {}, locale: { value },
});
const checkpoint = (id: string, question: string, answer: ContentBlockResponse): ContentBlockResponse => ({
  id, slug: 'checkpoint', type: 'checkpoint',
  params: {},
  locale: { title: 'Review' },
  content: [
    {
      id: id + '-item', slug: 'checkpointItem', type: 'checkpointItem',
      question: textBlock(id + '-question', question),
      answer: [answer],
    },
  ],
});

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
          markdown('middle', '**Middle block**'),
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
          markdown('rtl-markdown', '# عنوان الدرس\n\n**نص عربي**'),
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
          checkpoint('checkpoint', 'What is first?', first),
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
            slug: 'diagram',
            params: {},
            locale: { value: { title: 'Diagram' } },
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
    const originalCheckpoint = checkpoint('persistent-checkpoint', 'What did you learn?', last);
    const persistentCheckpoint: ContentBlockResponse =
      originalCheckpoint.type === 'checkpoint'
        ? { ...originalCheckpoint, params: { enableChecks: true } }
        : originalCheckpoint;
    const { rerender } = render(<ContentBlockRenderer messages={enUiKitMessages} blocks={[first, persistentCheckpoint]} />);
    fireEvent.click(screen.getByText('What did you learn?'));
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();

    rerender(
      <ContentBlockRenderer messages={enUiKitMessages} blocks={[textBlock('first', 'Updated opening'), persistentCheckpoint]} />,
    );
    expect(screen.getByText('Updated opening')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();
  });
});
