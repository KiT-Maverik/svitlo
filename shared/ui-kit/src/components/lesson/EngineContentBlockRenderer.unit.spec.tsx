import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ContentBlock_Props, ContentBlock_Text_Props } from '@svitlo/engine/runtime';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';
import { EngineContentBlockRenderer } from './EngineContentBlockRenderer';

const text = (id: string, value: string): ContentBlock_Text_Props => ({
  id,
  slug: 'text-' + id,
  type: 'text',
  params: {},
  locale: { value },
});

describe('EngineContentBlockRenderer — assembled Props bridge', () => {
  it('preserves canonical params/locale fields, order and disabled blocks', () => {
    const blocks: ContentBlock_Props[] = [
      text('first', 'First'),
      { id: 'hidden', slug: 'hidden', type: 'text', params: { disabled: true }, locale: { value: 'Hidden' } },
      { id: 'markdown', slug: 'markdown', type: 'markdown', params: {}, locale: { value: '**Second**' } },
      {
        id: 'code',
        slug: 'code',
        type: 'code',
        params: { language: 'javascript', codeAsText: 'const n = 1;' },
      },
    ];
    const { container } = render(
      <EngineContentBlockRenderer blocks={blocks} messages={enUiKitMessages} language="ar" />,
    );
    expect(screen.getByText('First')).toBeVisible();
    expect(screen.getByText('Second')).toBeVisible();
    expect(screen.queryByText('Hidden')).toBeNull();
    expect(container.querySelector('code')).toHaveTextContent('const n = 1;');
    expect(screen.getByRole('article')).toHaveAttribute('dir', 'rtl');
  });

  it('forwards scene registrations and complete, ordered checkpoint content', () => {
    const complete = vi.fn();
    const blocks: ContentBlock_Props[] = [
      { id: 'scene', slug: 'scene', type: 'scene', params: {}, locale: { value: { title: 'Experiment' } } },
      {
        id: 'checkpoint',
        slug: 'checkpoint',
        type: 'checkpoint',
        params: { enableChecks: true, requireCompletion: true },
        locale: { title: 'Review' },
        content: [
          {
            id: 'item',
            slug: 'item',
            type: 'checkpointItem',
            question: text('question', 'Question?'),
            answer: [text('answer', 'Answer')],
          },
        ],
      },
    ];
    render(
      <EngineContentBlockRenderer
        blocks={blocks}
        messages={enUiKitMessages}
        sceneRegistry={id =>
          id === 'scene'
            ? ({ locales }) => (
                <span role="img" aria-label={typeof locales === 'object' ? String(locales.title) : ''} />
              )
            : undefined
        }
        onCheckpointComplete={complete}
      />,
    );
    expect(screen.getByRole('img', { name: 'Experiment' })).toBeInTheDocument();
    fireEvent.click(screen.getByText('Question?'));
    expect(screen.getByText('Answer')).toBeVisible();
    expect(complete).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Check' }));
    expect(complete).toHaveBeenCalledWith('checkpoint');
  });

  it('uses assembled media props without flattening accessible fields', () => {
    const blocks: ContentBlock_Props[] = [
      {
        id: 'image',
        slug: 'image',
        type: 'image',
        params: { width: 300, height: 180 },
        locale: { src: '/diagram.svg', alt: 'A diagram', caption: 'Figure 1' },
      },
      {
        id: 'video',
        slug: 'video',
        type: 'video',
        params: {},
        locale: { fileLocation: '/clip.mp4', poster: '/poster.png', label: 'An explanation' },
      },
      {
        id: 'audio',
        slug: 'audio',
        type: 'audio',
        params: {},
        locale: { fileLocation: '/recording.mp3', title: 'Audio explanation' },
      },
    ];
    const { container } = render(
      <EngineContentBlockRenderer blocks={blocks} messages={enUiKitMessages} language="uk" />,
    );
    expect(screen.getByAltText('A diagram')).toHaveAttribute('src', '/diagram.svg');
    expect(screen.getByText('Figure 1')).toBeVisible();
    expect(container.querySelector('video')).toHaveAttribute('aria-label', 'An explanation');
    expect(container.querySelector('audio')).toHaveAttribute('aria-label', 'Audio explanation');
  });

  it('resolves optional localized media copy and code template variables for the selected language', () => {
    const blocks: ContentBlock_Props[] = [
      {
        id: 'localized-code',
        slug: 'localizedCode',
        type: 'code',
        params: { language: 'javascript', codeAsText: 'console.log("%_%MESSAGE%_%");' },
        locale: {
          title: { en: 'Snippet', uk: 'Фрагмент' },
          variables: { MESSAGE: { en: 'Hello', uk: 'Привіт' } },
        },
      },
      {
        id: 'localized-image',
        slug: 'localizedImage',
        type: 'image',
        params: { width: 320, height: 240 },
        locale: {
          src: '/art.png',
          alt: 'Мистецтво',
          caption: { en: 'Painting', uk: 'Картина' },
        },
      },
      {
        id: 'localized-audio',
        slug: 'localizedAudio',
        type: 'audio',
        params: {},
        locale: {
          fileLocation: '/recording.mp3',
          title: 'Назва аудіо',
          description: { en: 'Listen', uk: 'Слухайте' },
        },
      },
    ];
    const { container } = render(
      <EngineContentBlockRenderer blocks={blocks} messages={enUiKitMessages} language="uk" />,
    );
    expect(screen.getByText('Фрагмент')).toBeVisible();
    expect(container.querySelector('code')).toHaveTextContent('Привіт');
    expect(screen.getByText('Картина')).toBeVisible();
    expect(screen.getByText('Слухайте')).toBeVisible();
    expect(screen.queryByText('Painting')).toBeNull();
  });
});
