import { useEffect } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';
import LearningLayout from '../layout/LearningLayout/LearningLayout';
import type { LessonLearningLayoutProps } from '../layout/LearningLayout/createLessonLearningLayout';
import { Lesson, type LessonView } from './Lesson';
import { useLessonActions, useLessonEventBus, useLessonEventScene } from './index';
import { createLessonEventBus, resolveLessonEventScenes } from './LessonEvents';
import type { EventScene } from './LessonEvents';

const received: string[] = [];
const celebration: EventScene = {
  id: 'event-celebration',
  type: 'scene',
  rendererKey: 'event-celebration',
  locales: { title: 'Great work!' },
};

function SceneContent({ locales }: { locales: EventScene['locales'] }) {
  const { dismiss } = useLessonEventScene();
  return (
    <>
      <p>{typeof locales.title === 'string' ? locales.title : ''}</p>
      <button onClick={dismiss}>Dismiss celebration</button>
    </>
  );
}

function Layout({ messages, ...props }: LessonLearningLayoutProps) {
  const actions = useLessonActions<'lightDiscovered'>();
  const bus = useLessonEventBus();
  useEffect(
    () =>
      bus.subscribe(id => {
        received.push(id);
      }),
    [bus],
  );
  return (
    <>
      <button onClick={() => actions.publishEvent('lightDiscovered')}>Discover light</button>
      <button
        onClick={() => {
          actions.publishEvent('lightDiscovered');
          actions.publishEvent('lightDiscovered');
        }}
      >
        Discover twice
      </button>
      <button onClick={() => actions.completeQuiz('quiz-section')}>Complete quiz</button>
      <LearningLayout {...props} messages={messages.learningLayout} locale="en-US" />
    </>
  );
}

function response(): LessonView {
  return {
    id: 'events-lesson',
    title: 'Events lesson',
    locale: { code: 'en' },
    events: {
      lessonStarted: false,
      lessonCompleted: false,
      lightDiscovered: celebration,
    },
    parameters: { languages: ['en'], sections: { allowNavigation: true, allowSkipping: true, showIndexes: true } },
    sections: [
      {
        id: 'section-a',
        slug: 'section-a',
        type: 'theory',
        title: 'First',
        navigationLabel: 'First',
        content: [{ id: 'text-a', type: 'text', value: 'First section' }],
      },
      {
        id: 'section-b',
        slug: 'section-b',
        type: 'theory',
        title: 'Second',
        navigationLabel: 'Second',
        content: [{ id: 'text-b', type: 'text', value: 'Second section' }],
      },
    ],
  } as LessonView;
}

function showLesson(overrides?: Record<string, EventScene | false>, view = response()) {
  return render(
    <Lesson
      response={view}
      href="/en/lesson/events-lesson"
      messages={enUiKitMessages}
      layout={Layout}
      eventOverrides={overrides}
      sceneRegistry={id => (id === celebration.id ? SceneContent : undefined)}
    />,
  );
}

beforeEach(() => {
  received.length = 0;
});

describe('Lesson events', () => {
  it('delivers typed custom events without making the controller own the event queue', async () => {
    showLesson();
    expect(received).toContain('lessonStarted');
    fireEvent.click(screen.getByRole('button', { name: 'Discover light' }));
    expect(received).toContain('lightDiscovered');
    expect(await screen.findByRole('dialog', { name: 'Great work!' })).toBeVisible();
    expect(within(screen.getByRole('dialog')).getAllByText('Great work!').length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss celebration' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('does not stop publishing when the program disables the custom scene reaction', () => {
    showLesson({ lightDiscovered: false });
    fireEvent.click(screen.getByRole('button', { name: 'Discover light' }));
    expect(received).toContain('lightDiscovered');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('queues multiple reactions in publication order', async () => {
    showLesson();
    fireEvent.click(screen.getByRole('button', { name: 'Discover twice' }));
    expect(screen.getByRole('dialog')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss celebration' }));
    expect(screen.getByRole('dialog')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss celebration' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('emits lessonCompleted only after reaching the final unlocked section', () => {
    showLesson();
    expect(received).not.toContain('lessonCompleted');
    const next = within(
      screen.getByRole('navigation', {
        name: enUiKitMessages.learningLayout.navigation.bottom,
      }),
    ).getByRole('button', { name: new RegExp(enUiKitMessages.learningLayout.actions.next, 'i') });
    fireEvent.click(next);
    expect(received.filter(id => id === 'lessonCompleted')).toHaveLength(1);
  });

  it('emits quizCompleted through the existing controller action', () => {
    const base = response();
    const quiz = {
      id: 'quiz-section',
      slug: 'quiz-section',
      type: 'quiz' as const,
      title: 'Quiz',
      navigationLabel: 'Quiz',
      parameters: {
        selection: { mode: 'all' as const },
        layout: { mode: 'stack' as const },
        feedbackMode: 'immediate' as const,
        interaction: {
          retries: 0,
          showErrors: true,
          showCorrectAnswers: true,
          allowExplanations: true,
          allowDeferring: false,
          allowQuestionNavigation: false,
          skippable: false,
        },
        results: { visibility: 'hidden' as const, showScore: false },
        screen: {},
      },
      questions: [],
    };
    showLesson(undefined, { ...base, sections: [...base.sections, quiz] });
    fireEvent.click(screen.getByRole('button', { name: 'Complete quiz' }));
    fireEvent.click(screen.getByRole('button', { name: 'Complete quiz' }));
    expect(received.filter(id => id === 'quizCompleted')).toHaveLength(1);
    expect(received).not.toContain('quizFailed');
  });

  it('supports multiple subscribers and cleanup', () => {
    const bus = createLessonEventBus();
    const first = vi.fn();
    const second = vi.fn();
    const unsubscribe = bus.subscribe(first);
    bus.subscribe(second);
    bus.publish('lightDiscovered');
    unsubscribe();
    bus.publish('lightDiscovered');
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(2);
  });

  it('only permits program overrides for built-in or declared custom events', () => {
    expect(resolveLessonEventScenes({ lightDiscovered: celebration }, { lightDiscovered: false }).lightDiscovered).toBe(
      false,
    );
    expect(() => resolveLessonEventScenes({}, { unknown: false })).toThrow(/undeclared/);
  });
});
