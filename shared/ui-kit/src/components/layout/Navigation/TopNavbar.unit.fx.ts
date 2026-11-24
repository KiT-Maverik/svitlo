import { render } from '@testing-library/react';
import { createElement } from 'react';

import type { NavbarProps } from './Navbar';
import { Navbar_fx } from './Navbar.unit.fx';
import TopNavbar from './TopNavbar';

export const TopNavbar_fx = {
  render: (props: Partial<NavbarProps> = {}) =>
    render(createElement(TopNavbar, { 'aria-label': 'Top navigation', ...props })),
  navbar: Navbar_fx.selectors,
} as const;
