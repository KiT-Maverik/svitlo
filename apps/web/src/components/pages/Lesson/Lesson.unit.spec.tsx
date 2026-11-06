import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LessonResponse } from '@svitlo/engine/lesson';
import type { UiKitMessages } from '@svitlo/ui-kit';
import { preloadScene } from '@/generated/textbookScenes';
import WebLesson from './Lesson';

vi.mock('@/generated/textbookScenes', () => ({ preloadScene: vi.fn(), resolveScene: vi.fn() }));
vi.mock('@svitlo/ui-kit/lesson', () => ({
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
const response = {
  id: 'lesson-one',
  sections: [{ content: [{ type: 'scene', id: 'scene-one' }] }, { content: [{ type: 'scene', id: 'scene-two' }] }],
} as LessonResponse;

describe('Web lesson preparation', () => {
  beforeEach(() => vi.clearAllMocks());

  it('keeps the learning area preparing until all lesson scenes have loaded', async () => {
    const pending = new Map<string, () => void>();
    vi.mocked(preloadScene).mockImplementation(id => new Promise<void>(resolve => pending.set(id, resolve)));
    render(
      <WebLesson
        response={response}
        locale="uk-UA"
        lessonLocale="uk-UA"
        href="/uk/lesson/lesson-one"
        messages={messages}
      />,
    );

    expect(screen.getByTestId('lesson-ready')).toHaveTextContent('preparing');
    expect(preloadScene).toHaveBeenCalledWith('scene-one');
    expect(preloadScene).toHaveBeenCalledWith('scene-two');

    pending.get('scene-one')?.();
    await Promise.resolve();
    expect(screen.getByTestId('lesson-ready')).toHaveTextContent('preparing');

    pending.get('scene-two')?.();
    await waitFor(() => expect(screen.getByTestId('lesson-ready')).toHaveTextContent('ready'));
  });

  it('retains the loading gate after a failed chunk and recovers when retried', async () => {
    vi.mocked(preloadScene).mockRejectedValueOnce(new Error('Chunk loading failed')).mockResolvedValue(undefined);

    render(
      <WebLesson
        response={response}
        locale="uk-UA"
        lessonLocale="uk-UA"
        href="/uk/lesson/lesson-one"
        messages={messages}
      />,
    );

    const retry = await screen.findByRole('button', { name: 'retry' });
    expect(screen.getByTestId('lesson-ready')).not.toHaveTextContent('ready');

    fireEvent.click(retry);
    await waitFor(() => expect(screen.getByTestId('lesson-ready')).toHaveTextContent('ready'));
    expect(preloadScene).toHaveBeenCalledTimes(4);
  });

  it('handles an unknown scene ID as an error, not as ready', async () => {
    vi.mocked(preloadScene).mockRejectedValue(new Error('Unregistered scene id'));
    render(
      <WebLesson
        response={response}
        locale="uk-UA"
        lessonLocale="uk-UA"
        href="/uk/lesson/lesson-one"
        messages={messages}
      />,
    );
    expect(await screen.findByRole('button', { name: 'retry' })).toBeVisible();
    expect(screen.getByTestId('lesson-ready')).not.toHaveTextContent('ready');
  });
});
