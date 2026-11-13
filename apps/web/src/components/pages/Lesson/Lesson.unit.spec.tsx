import type { ReactNode } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Lesson_Props } from '@svitlo/engine/runtime';
import type { UiKitMessages } from '@svitlo/ui-kit';
import { preloadScene } from '@/generated/textbookScenes';
import WebLesson from './Lesson';

vi.mock('@/generated/textbookScenes', () => ({ preloadScene: vi.fn(), resolveScene: vi.fn() }));
vi.mock('@svitlo/ui-kit', () => ({
  // Root-only exports share one module mock after the package migration.
  createLessonLearningLayout: () => () => null,
  SceneLocaleProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
  ImageRendererProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
  Lesson: ({
    contentLoading,
    contentError,
    onRetryContent,
  }: {
    contentLoading: boolean;
    contentError: boolean;
    onRetryContent: () => void;
  }) => (
    <div data-testid="lesson-ready">
      {contentError ? <button onClick={onRetryContent}>retry</button> : contentLoading ? 'preparing' : 'ready'}
    </div>
  ),
}));

const messages = {} as UiKitMessages;
const lessonId = '663572e7-bd85-4516-86e2-3de07d209e03';
const sceneOneId = '663572e7-bd85-4516-86e2-3de07d209e05';
const sceneTwoId = '663572e7-bd85-4516-86e2-3de07d209e07';
const response = {
  id: lessonId,
  slug: 'scenePreparation',
  type: 'lesson',
  skills: [],
  params: {
    requireQuiz: false,
    languages: ['uk'],
    sections: { allowNavigation: true, allowSkipping: false, showIndexes: true },
  },
  locale: { title: 'Підготовка сцен' },
  section: [
    {
      id: '663572e7-bd85-4516-86e2-3de07d209e04',
      slug: 'firstSection',
      type: 'content',
      params: {},
      locale: { title: 'Перша секція', navigationLabel: 'Перша' },
      content: [
        { id: sceneOneId, slug: 'firstScene', type: 'scene', params: {}, locale: { value: 'Scene one' } },
      ],
    },
    {
      id: '663572e7-bd85-4516-86e2-3de07d209e06',
      slug: 'secondSection',
      type: 'content',
      params: {},
      locale: { title: 'Друга секція', navigationLabel: 'Друга' },
      content: [
        { id: sceneTwoId, slug: 'secondScene', type: 'scene', params: {}, locale: { value: 'Scene two' } },
      ],
    },
  ],
  flashcards: [],
} satisfies Lesson_Props;

describe('Web lesson preparation', () => {
  beforeEach(() => vi.clearAllMocks());

  it('keeps the learning area preparing until all lesson scenes have loaded', async () => {
    const pending = new Map<string, () => void>();
    vi.mocked(preloadScene).mockImplementation(id => new Promise<void>(resolve => pending.set(id, resolve)));
    render(<WebLesson response={response} locale="uk-UA" href={`/uk/lesson/uk/${lessonId}`} messages={messages} />);

    expect(screen.getByTestId('lesson-ready')).toHaveTextContent('preparing');
    expect(preloadScene).toHaveBeenCalledWith(sceneOneId);
    expect(preloadScene).toHaveBeenCalledWith(sceneTwoId);

    pending.get(sceneOneId)?.();
    await Promise.resolve();
    expect(screen.getByTestId('lesson-ready')).toHaveTextContent('preparing');

    pending.get(sceneTwoId)?.();
    await waitFor(() => expect(screen.getByTestId('lesson-ready')).toHaveTextContent('ready'));
  });

  it('retains the loading gate after a failed chunk and recovers when retried', async () => {
    vi.mocked(preloadScene).mockRejectedValueOnce(new Error('Chunk loading failed')).mockResolvedValue(undefined);

    render(<WebLesson response={response} locale="uk-UA" href={`/uk/lesson/uk/${lessonId}`} messages={messages} />);

    const retry = await screen.findByRole('button', { name: 'retry' });
    expect(screen.getByTestId('lesson-ready')).not.toHaveTextContent('ready');

    fireEvent.click(retry);
    await waitFor(() => expect(screen.getByTestId('lesson-ready')).toHaveTextContent('ready'));
    expect(preloadScene).toHaveBeenCalledTimes(4);
  });

  it('handles an unknown scene ID as an error, not as ready', async () => {
    vi.mocked(preloadScene).mockRejectedValue(new Error('Unregistered scene id'));
    render(<WebLesson response={response} locale="uk-UA" href={`/uk/lesson/uk/${lessonId}`} messages={messages} />);
    expect(await screen.findByRole('button', { name: 'retry' })).toBeVisible();
    expect(screen.getByTestId('lesson-ready')).not.toHaveTextContent('ready');
  });
});
