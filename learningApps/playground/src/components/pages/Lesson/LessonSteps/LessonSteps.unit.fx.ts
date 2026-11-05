import { createElement, type ComponentProps } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LessonSteps } from './LessonSteps';
import { aria } from './LessonSteps.constants';

type Props = ComponentProps<typeof LessonSteps>;

export const LessonSteps_fx = {
  defaults: {
    steps: [
      { id: 'theory', title: 'Theory' },
      { id: 'practice', title: 'Practice' },
      { id: 'quiz', title: 'Quiz' },
    ],
    currentStep: 0,
  } satisfies Props,
  render: (props: Partial<Props> = {}) => render(createElement(LessonSteps, { ...LessonSteps_fx.defaults, ...props })),
  selectors: {
    navigation: (scope?: HTMLElement) =>
      (scope ? within(scope) : screen).getByRole('navigation', { name: aria.navigation }),
    step: (name: string, scope?: HTMLElement) => (scope ? within(scope) : screen).getByRole('button', { name }),
  },
  actions: {
    select: async (name: string, scope?: HTMLElement) => userEvent.click(LessonSteps_fx.selectors.step(name, scope)),
  },
} as const;
