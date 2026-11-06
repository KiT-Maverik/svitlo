import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { LessonResponse } from '@svitlo/engine/lesson';
import type { UiKit_Global } from '@svitlo/ui-kit';
import { preloadScene } from '@/generated/textbookScenes';
import WebLesson from './Lesson';

vi.mock('@/generated/textbookScenes', () => ({ preloadScene: vi.fn(), resolveScene: vi.fn() }));
vi.mock('@svitlo/ui-kit/lesson', () => ({
  Lesson: ({ contentLoading }: { contentLoading: boolean }) => (
    <div data-testid="lesson-ready">{contentLoading ? 'preparing' : 'ready'}</div>
  ),
}));

const messages = {} as UiKit_Global<'response'>;
const response = {
  id: 'lesson-one',
  sections: [{ content: [{ type: 'scene', id: 'scene-one' }] }, { content: [{ type: 'scene', id: 'scene-two' }] }],
} as LessonResponse;

describe('Web lesson preparation', () => {
  beforeEach(() => vi.clearAllMocks());

  it('keeps the learning area preparing until all lesson scenes have loaded', async () => {
    const pending = new Map<string, () => void>();
    vi.mocked(preloadScene).mockImplementation(id => new Promise<void>(resolve => pending.set(id, resolve)));
    render(<WebLesson response={response} locale="uk-UA" href="/uk/lesson/lesson-one" messages={messages} />);

    expect(screen.getByTestId('lesson-ready')).toHaveTextContent('preparing');
    expect(preloadScene).toHaveBeenCalledWith('scene-one');
    expect(preloadScene).toHaveBeenCalledWith('scene-two');

    pending.get('scene-one')?.();
    await Promise.resolve();
    expect(screen.getByTestId('lesson-ready')).toHaveTextContent('preparing');

    pending.get('scene-two')?.();
    await waitFor(() => expect(screen.getByTestId('lesson-ready')).toHaveTextContent('ready'));
  });
});
