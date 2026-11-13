import { useEffect } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Lesson_Props, ContentBlock_Scene_Props } from '@svitlo/engine/runtime';
import { enUiKitMessages } from '../../testing/uiKitMessages.unit.fx';
import LearningLayout from '../layout/LearningLayout/LearningLayout';
import type { LessonLearningLayoutProps } from '../layout/LearningLayout/createLessonLearningLayout';
import { Lesson } from './Lesson';
import { useLessonActions, useLessonEventBus, useLessonEventScene } from './index';
import { createLessonEventBus, resolveLessonEventScenes } from './LessonEvents';

const uuid = (number: number) => `663572e7-bd85-4516-86e2-${number.toString(16).padStart(12, '0')}`;
const celebration: ContentBlock_Scene_Props = {
  id: uuid(50),
  slug: 'celebration',
  type: 'scene',
  params: {},
  locale: { value: { title: 'Great work!' } },
};
const received: string[] = [];

function SceneContent({ locales }: { locales: ContentBlock_Scene_Props['locale']['value'] }) {
  const { dismiss } = useLessonEventScene();
  const title = locales && typeof locales === 'object' && 'title' in locales ? locales.title : '';
  return (
    <>
      <p>{title}</p>
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
      <button onClick={() => actions.completeQuiz(uuid(53))}>Complete quiz</button>
      <LearningLayout {...props} messages={messages.learningLayout} locale="en-US" />
    </>
  );
}
function lesson(): Lesson_Props {
  return {
    id: uuid(54),
    slug: 'eventsLesson',
    type: 'lesson',
    skills: [],
    params: {
      requireQuiz: false,
      languages: ['en'],
      sections: { allowNavigation: true, allowSkipping: true, showIndexes: true },
    },
    locale: { title: 'Events lesson' },
    events: {
      lessonStarted: false,
      lessonCompleted: false,
      lightDiscovered: celebration,
    },
    section: [
      {
        id: uuid(51),
        slug: 'first',
        type: 'content',
        params: {},
        locale: { title: 'First', navigationLabel: 'First' },
        content: [
          {
            id: uuid(56),
            slug: 'textFirst',
            type: 'text',
            params: {},
            locale: { value: 'First section' },
          },
        ],
      },
      {
        id: uuid(52),
        slug: 'second',
        type: 'content',
        params: {},
        locale: { title: 'Second', navigationLabel: 'Second' },
        content: [
          {
            id: uuid(57),
            slug: 'textSecond',
            type: 'text',
            params: {},
            locale: { value: 'Second section' },
          },
        ],
      },
    ],
    questions: {},
    flashcards: [],
  } as Lesson_Props;
}

function showLesson(overrides?: Record<string, ContentBlock_Scene_Props | false>, response = lesson()) {
  return render(
    <Lesson
      response={response}
      language="en"
      href="/en/lesson/events"
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

describe('Engine Props Lesson events', () => {
  it('publishes custom events and renders a Scene with resolved Engine locale Props', async () => {
    showLesson();
    expect(received).toContain('lessonStarted');
    fireEvent.click(screen.getByRole('button', { name: 'Discover light' }));
    expect(received).toContain('lightDiscovered');
    expect(await screen.findByRole('dialog', { name: 'Great work!' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss celebration' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('allows Course overrides to suppress a declared reaction without suppressing the event', () => {
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

  it('marks Lesson completed after reaching the final Section', () => {
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

  it('publishes quizCompleted through the Controller action', () => {
    const response = lesson();
    response.section.push({
      id: uuid(53),
      slug: 'quiz',
      type: 'quiz',
      params: {
        isBlocker: true,
        selection: { mode: 'all' },
        layout: { mode: 'stack' },
        feedbackMode: 'immediate',
        interaction: {
          retries: 0,
          showErrors: true,
          showCorrectAnswers: true,
          allowExplanations: true,
          allowDeferring: false,
          allowQuestionNavigation: false,
          skippable: false,
        },
        results: { visibility: 'hidden', showScore: false },
        screen: {},
      },
      locale: { title: 'Quiz', navigationLabel: 'Quiz' },
      content: [],
    });
    showLesson(undefined, response);
    fireEvent.click(screen.getByRole('button', { name: 'Complete quiz' }));
    fireEvent.click(screen.getByRole('button', { name: 'Complete quiz' }));
    expect(received.filter(id => id === 'quizCompleted')).toHaveLength(1);
  });

  it('allows multiple subscribers and correct cleanup', () => {
    const bus = createLessonEventBus();
    const first = vi.fn();
    const second = vi.fn();
    const stop = bus.subscribe(first);
    bus.subscribe(second);
    bus.publish('lightDiscovered');
    stop();
    bus.publish('lightDiscovered');
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(2);
  });

  it('validates authored custom event IDs before applying Course overrides', () => {
    expect(resolveLessonEventScenes({ lightDiscovered: celebration }, { lightDiscovered: false }).lightDiscovered).toBe(
      false,
    );
    expect(() => resolveLessonEventScenes({}, { unknown: false })).toThrow(/undeclared/);
  });
});
