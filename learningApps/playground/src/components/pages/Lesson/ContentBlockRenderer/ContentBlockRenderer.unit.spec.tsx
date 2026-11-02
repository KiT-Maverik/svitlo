import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ContentBlock_Catalog, Question_Catalog } from '@svitlo/engine/content';
import {
  ContentBlockCatalogRenderer, ContentBlockRenderer,
  type ContentBlockResponse, type ContentBlockType, type SceneRegistry,
} from './ContentBlockRenderer';

function typed<Type extends ContentBlockType>(
  type: Type,
  payload: Omit<ContentBlockResponse<Type>, 'type'>,
): ContentBlockResponse<Type> & { type: Type } {
  return { ...payload, type } as ContentBlockResponse<Type> & { type: Type };
}

const locale = { code: 'en' as const };
const text = typed('text', { id: 'text-1', locale, value: 'Localized response' });
const nestedText = text;

describe('ContentBlockRenderer: response dispatch', () => {
  it('renders localized text without authored data', () => {
    render(<ContentBlockRenderer type="text" response={text} />);
    expect(screen.getByText('Localized response')).toHaveAttribute('lang', 'en-US');
  });

  it('renders sanitized markdown with language direction', () => {
    render(<ContentBlockRenderer type="markdown" response={typed('markdown', {
      id: 'md', locale: { code: 'ar' }, text: '**مرحبا**',
    })} />);
    expect(screen.getByText('مرحبا').closest('article')).toHaveAttribute('dir', 'rtl');
  });

  it('forwards media response properties to native accessible elements', () => {
    const { container } = render(<>
      <ContentBlockRenderer type="image" response={typed('image', { id: 'i', locale, src: '/x.png', alt: 'Diagram' })} />
      <ContentBlockRenderer type="audio" response={typed('audio', {
        id: 'a', locale, fileLocation: '/x.mp3', title: 'Explanation', description: 'Audio guide',
      })} />
      <ContentBlockRenderer type="video" response={typed('video', {
        id: 'v', locale, fileLocation: '/x.mp4', poster: '/poster.png',
      })} />
    </>);
    expect(screen.getByAltText('Diagram')).toHaveAttribute('src', '/x.png');
    expect(screen.getByLabelText('Explanation')).toHaveAttribute('src', '/x.mp3');
    expect(screen.getByText('Audio guide')).toBeInTheDocument();
    expect(container.querySelector('video')).toHaveAttribute('poster', '/poster.png');
  });

  it('renders YouTube links and secure embeds without unsafe URLs', () => {
    const link = typed('youtube', { id: 'yt', locale, href: 'https://youtu.be/abcdefghijk', title: 'Watch lesson',
      mode: 'link' });
    const { rerender } = render(<ContentBlockRenderer type="youtube" response={link} />);
    expect(screen.getByRole('link', { name: 'Watch lesson' })).toHaveAttribute('rel', 'noopener noreferrer');
    rerender(<ContentBlockRenderer type="youtube" response={typed('youtube', { ...link, mode: 'embed', hint: 'Demonstration' })} />);
    expect(screen.getByTitle('Watch lesson')).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/abcdefghijk');
    expect(() => render(<ContentBlockRenderer type="youtube" response={typed('youtube', {
      ...link, href: 'javascript:alert(1)',
    })} />)).toThrow('HTTPS');
  });

  it('fetches public code using its response fileLocation', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true, text: async () => 'const n = 42;' });
    vi.stubGlobal('fetch', fetcher);
    render(<ContentBlockRenderer type="code" response={typed('code', {
      id: 'code', locale, fileLocation: '/public/example.ts', codeParams: [],
    })} />);
    await waitFor(() => expect(screen.getByText('const n = 42;')).toBeInTheDocument());
    expect(fetcher).toHaveBeenCalledWith('/public/example.ts', expect.objectContaining({ signal: expect.any(AbortSignal) }));
    vi.unstubAllGlobals();
  });

  it('refuses code selectors until their transformation semantics are specified', () => {
    expect(() => render(<ContentBlockRenderer type="code" response={typed('code', {
      id: 'code', locale, fileLocation: '/example.ts', codeParams: [{ selector: '.foo', value: 'x' }],
    })} />)).toThrow('selector/parameter');
  });

  it('resolves scenes solely through the provided typed registry', () => {
    const response = typed('scene', {
      id: 'registered-scene', locale, messages: { title: 'Beam' }, rendererKey: 'registered-scene',
    });
    const sceneRegistry: SceneRegistry = {
      'registered-scene': ({ locale: localized }) => <div role="img" aria-label={localized.code} />,
    };
    render(<ContentBlockRenderer type="scene" response={response} sceneRegistry={sceneRegistry} />);
    expect(screen.getByRole('img', { name: 'en' })).toBeVisible();
    expect(() => render(<ContentBlockRenderer type="scene" response={response} />)).toThrow('Unregistered scene');
  });

  it('renders checkpoint answers through the UI Kit widget and dispatcher', () => {
    render(<ContentBlockRenderer type="checkpoint" response={typed('checkpoint', {
      id: 'cp', locale, title: 'Knowledge check', headingLevel: 3, enableChecks: true,
      items: [{ question: 'What is light?', answer: [nestedText] }],
    })} />);
    expect(screen.getByRole('heading', { name: 'Knowledge check', level: 3 })).toBeInTheDocument();
    fireEvent.click(screen.getByText('What is light?'));
    expect(screen.getByText('Localized response')).toBeVisible();
    const check = screen.getByRole('button', { name: 'Check' });
    fireEvent.click(check);
    expect(screen.getByRole('button', { name: 'Checked' })).toBeDisabled();
  });

  it('rejects untagged checkpoint answers rather than guessing by shape', () => {
    expect(() => render(<ContentBlockRenderer type="checkpoint" response={typed('checkpoint', {
      id: 'cp', locale, title: 'Checkpoint', items: [{
        question: 'Question',
        answer: [{ id: 'untagged', locale, value: 'No discriminator' } as ContentBlockResponse<'text'>],
      }],
    })} />)).toThrow('requires a supported response.type');
  });

  it('renders rich nested quiz content and tracks selected answers, score and retries', () => {
    const quiz = typed('quiz', {
      id: 'quiz-1', locale, welcome: 'Choose one answer',
      feedbackMode: 'after-completion',
      interaction: {
        retries: 1, showErrors: true, showCorrectAnswers: true, allowExplanations: true,
        allowDeferring: false, allowQuestionNavigation: false, skippable: false,
      },
      results: { visibility: 'immediate', showScore: true },
      screen: {},
      questionSlugs: ['first'],
    });
    const questions = {
      selectOneAnswer: {
        first: {
          id: 'q-1', type: 'selectOneAnswer', locale, assessmentMethod: 'retrieval', restrictions: [],
          question: [{ ...nestedText, id: 'prompt', value: 'The question' }],
          answers: {
            correct: { yes: { ...nestedText, id: 'correct', value: 'Correct' } },
            incorrect: { no: { ...nestedText, id: 'incorrect', value: 'Incorrect' } },
            distractors: {},
          },
        },
      },
    } satisfies Question_Catalog<'response'>;
    const { container } = render(<ContentBlockRenderer type="quiz" response={quiz} questions={questions} />);
    expect(screen.getByText('The question')).toBeVisible();
    fireEvent.click(screen.getByRole('radio', { name: 'Correct' }));
    const submit = container.querySelector('input[type="submit"]');
    expect(submit).not.toBeNull();
    fireEvent.click(submit!);
    expect(screen.getByText('1 / 1')).toBeInTheDocument();
    fireEvent.click(container.querySelector('input[type="reset"]')!);
    expect(screen.queryByText('1 / 1')).not.toBeInTheDocument();
  });

  it('renders quiz welcome; supports the empty catalog without legacy block shapes', () => {
    const quiz = typed('quiz', {
      id: 'q', locale, welcome: 'Your quiz',
      questionSlugs: [], feedbackMode: 'after-completion', interaction: {
        retries: 1, showErrors: true, showCorrectAnswers: true, allowExplanations: true,
        allowDeferring: false, allowQuestionNavigation: true, skippable: false,
      },
      results: { visibility: 'immediate', showScore: true },
      screen: {},
    });
    render(<ContentBlockRenderer type="quiz" response={quiz} />);
    expect(screen.getByText('Your quiz')).toBeInTheDocument();
  });
});

describe('ContentBlockCatalogRenderer: ordered dispatch', () => {
  const catalog: ContentBlock_Catalog<'response'> = {
    text: { first: { ...text, value: 'First' }, last: { ...text, id: 'last', value: 'Last' } },
    image: { middle: typed('image', { id: 'middle', locale, src: '/middle.svg', alt: 'Middle' }) },
  };

  it('preserves explicit mixed-type ordering', () => {
    const { container } = render(<ContentBlockCatalogRenderer catalog={catalog} order={[
      { type: 'text', key: 'first' },
      { type: 'image', key: 'middle' },
      { type: 'text', key: 'last' },
    ]} />);
    expect([...container.querySelectorAll('p, img')].map(node => node.textContent || node.getAttribute('alt')))
      .toEqual(['First', 'Middle', 'Last']);
  });

  it('fails on omitted, duplicate and missing references', () => {
    expect(() => render(<ContentBlockCatalogRenderer catalog={catalog} order={[
      { type: 'text', key: 'first' },
    ]} />)).toThrow('omits');
    expect(() => render(<ContentBlockCatalogRenderer catalog={catalog} order={[
      { type: 'text', key: 'first' }, { type: 'text', key: 'first' },
    ]} />)).toThrow('Duplicate');
    expect(() => render(<ContentBlockCatalogRenderer catalog={catalog} order={[
      { type: 'text', key: 'missing' },
    ]} />)).toThrow('Missing');
  });
});
