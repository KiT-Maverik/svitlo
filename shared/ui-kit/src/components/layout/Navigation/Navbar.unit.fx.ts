import { render, screen, within } from '@testing-library/react';
import { createElement } from 'react';

import Navbar, { type NavbarProps } from './Navbar';
import { testId } from './Navbar.constants';

export const Navbar_fx = {
  render: (props: Partial<NavbarProps> = {}) =>
    render(createElement(Navbar, { 'aria-label': 'Example navigation', ...props })),
  selectors: {
    navigation: (name = 'Example navigation', scope?: HTMLElement) =>
      (scope ? within(scope) : screen).getByRole('navigation', { name }),
    slot: (name: keyof typeof testId.slots, navigation?: HTMLElement) =>
      (navigation ? within(navigation) : screen).getByTestId(testId.slots[name]),
  },
} as const;
