import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ContentBlock_Checkpoint_Props, ContentBlock_Markdown_Props, ContentBlock_Text_Props } from '@svitlo/engine/runtime';
import type { ContentBlockResponse, SceneRegistry } from './types';
import { ContentBlockRenderer } from './ContentBlockRenderer';
import { enUiKitMessages } from '../../../testing/uiKitMessages.unit.fx';

const textBlock = (id: string, value: string): ContentBlock_Text_Props => ({
  id, slug: 'textBlock', type: 'text', params: {}, locale: { value },
});
const first = textBlock('first', 'First block');
const last = textBlock('last', 'Last block');
const markdown = (id: string, value: string): ContentBlock_Markdown_Props => ({
  id, slug: 'markdown', type: 'markdown', params: {}, locale: { value },
});
const checkpoint = (id: string, question: string, answer: ContentBlock_Text_Props): ContentBlock_Checkpoint_Props => ({
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
      id === 'diagram'
        ? ({ locales }) => (
            <div
              role="img"
              aria-label={typeof locales === 'object' && typeof locales.title === 'string' ? locales.title : undefined}
            />
          )
        : undefined;
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

  it('rejects standalone WebVTT tracks rather than silently discarding captions', () => {
    const subtitles: Extract<ContentBlockResponse, { type: 'subtitles' }> = {
      id: 'captions',
      slug: 'captions',
      type: 'subtitles',
      params: {},
      locale: { fileLocation: '/captions.en.vtt' },
    };
    expect(() =>
      render(<ContentBlockRenderer messages={enUiKitMessages} blocks={[subtitles]} />),
    ).toThrow('Subtitles require a media player');
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
    const persistentCheckpoint: ContentBlock_Checkpoint_Props = {
      ...originalCheckpoint,
      params: { enableChecks: true },
    };
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
