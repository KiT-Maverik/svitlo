import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { AssessmentResourceLoader, Flashcard_Data, FlashcardsSection_Data } from '@svitlo/engine/runtime';

import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';
import { EngineFlashcardsRenderer } from './EngineFlashcardsRenderer';

const uuid = (number: number) => `663572e7-bd85-4516-86e2-${number.toString(16).padStart(12, '0')}`;

const card = (
  number: number,
  front: string,
  disabilities: Flashcard_Data['parameters']['disabilities'] = [],
): Flashcard_Data => ({
  id: uuid(number),
  slug: `flashcard-${number}`,
  type: 'flashcard',
  parameters: { tags: [], disabilities, flags: [] },
  content: {
    front: [{ id: uuid(number + 100), slug: 'front', type: 'text', params: {}, locale: { value: front } }],
    back: [{ id: uuid(number + 200), slug: 'back', type: 'text', params: {}, locale: { value: 'Answer' } }],
  },
});

const section = (number: number, flashcardIds: string[]): FlashcardsSection_Data => ({
  id: uuid(number),
  slug: `recall-${number}`,
  type: 'flashcards',
  params: { selection: { flashcardIds } },
  locale: { title: 'Recall', navigationLabel: 'Flashcards' },
  content: [],
});

const emptyQuestions: AssessmentResourceLoader['loadQuestions'] = async () => ({ items: [], fallbacks: [] });

describe('EngineFlashcardsRenderer resource boundaries', () => {
  it('shows an explicit empty-eligible-pool message when a host ignores access needs', async () => {
    const restricted = card(1, 'Hear this sound', ['deafness']);
    const loader: AssessmentResourceLoader = {
      loadQuestions: emptyQuestions,
      loadFlashcards: async () => ({ items: [restricted], fallbacks: [] }),
    };
    render(
      <EngineFlashcardsRenderer
        lessonId={uuid(50)}
        language="en"
        section={section(51, [restricted.id])}
        assessmentLoader={loader}
        accessNeeds={['deafness']}
        messages={enUiKitMessages}
      />,
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(enUiKitMessages.flashcard.flashcard.noCompatibleCards);
    expect(screen.queryByText('Hear this sound')).not.toBeInTheDocument();
  });

  it('ignores a late response from a previously selected Flashcard Section', async () => {
    const oldCard = card(2, 'Old question');
    const newCard = card(3, 'New question');
    let resolveOld!: (value: { items: Flashcard_Data[]; fallbacks: [] }) => void;
    const oldResponse = new Promise<{ items: Flashcard_Data[]; fallbacks: [] }>(resolve => {
      resolveOld = resolve;
    });
    let oldSignal: AbortSignal | undefined;
    const requests: string[][] = [];
    const loader: AssessmentResourceLoader = {
      loadQuestions: emptyQuestions,
      loadFlashcards: ({ ids, signal }) => {
        requests.push([...ids]);
        if (ids[0] === oldCard.id) {
          oldSignal = signal;
          return oldResponse;
        }
        return Promise.resolve({ items: [newCard], fallbacks: [] });
      },
    };
    const common = {
      lessonId: uuid(50),
      language: 'en' as const,
      assessmentLoader: loader,
      messages: enUiKitMessages,
    };
    const view = render(<EngineFlashcardsRenderer {...common} section={section(52, [oldCard.id])} />);
    await waitFor(() => expect(requests).toEqual([[oldCard.id]]));

    view.rerender(<EngineFlashcardsRenderer {...common} section={section(53, [newCard.id])} />);
    expect(await screen.findByText('New question')).toBeVisible();
    expect(oldSignal?.aborted).toBe(true);

    await act(async () => {
      resolveOld({ items: [oldCard], fallbacks: [] });
      await oldResponse;
    });
    expect(screen.getByText('New question')).toBeVisible();
    expect(screen.queryByText('Old question')).not.toBeInTheDocument();
    expect(screen.getByText('1 / 1')).toBeVisible();
  });

  it('recovers from a failed host load through the accessible retry action', async () => {
    const selected = card(4, 'Retry question');
    const loadFlashcards = vi
      .fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValue({
        items: [selected],
        fallbacks: [],
      });
    const loader: AssessmentResourceLoader = {
      loadQuestions: emptyQuestions,
      loadFlashcards,
    };
    render(
      <EngineFlashcardsRenderer
        lessonId={uuid(50)}
        language="en"
        section={section(54, [selected.id])}
        assessmentLoader={loader}
        messages={enUiKitMessages}
      />,
    );
    expect(await screen.findByRole('alert')).toHaveTextContent(enUiKitMessages.learningLayout.preparingLessonError);
    fireEvent.click(screen.getByRole('button', { name: enUiKitMessages.learningLayout.actions.retry }));
    expect(await screen.findByText('Retry question')).toBeVisible();
    expect(loadFlashcards).toHaveBeenCalledTimes(2);
  });
});
