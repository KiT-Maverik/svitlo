import { createElement } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Flashcard, type FlashcardProps } from './Flashcard';
import { ukUiKitMessages } from '../../../testing/uiKitMessages.unit.fx';

const locale = ukUiKitMessages.flashcard;
const aria = locale.flashcard;

export const Flashcard_fx = {
  defaults: {
    question: 'What is light?',
    answer: 'Electromagnetic radiation',
    messages: locale,
  } satisfies FlashcardProps,
  render: (props: Partial<FlashcardProps> = {}) =>
    render(createElement(Flashcard, { ...Flashcard_fx.defaults, ...props })),
  selectors: {
    region: (scope?: HTMLElement) => (scope ? within(scope) : screen).getByRole('region', { name: aria.region }),
    reveal: (scope?: HTMLElement) =>
      (scope ? within(scope) : screen).getByRole('button', { name: aria.actions.reveal }),
    menu: (scope?: HTMLElement) => (scope ? within(scope) : screen).getByRole('button', { name: aria.actions.menu }),
    rate: (remembered: boolean, scope?: HTMLElement) =>
      (scope ? within(scope) : screen).getByRole('button', {
        name: remembered ? locale.flashcard.actions.remembered : locale.flashcard.actions.forgot,
      }),
    menuItem: () => screen.getByRole('menuitem', { name: locale.flashcard.actions.addLabel }),
  },
  actions: {
    reveal: async () => userEvent.click(Flashcard_fx.selectors.reveal()),
    rate: async (remembered: boolean) => userEvent.click(Flashcard_fx.selectors.rate(remembered)),
    openMenu: async () => userEvent.click(Flashcard_fx.selectors.menu()),
  },
} as const;
