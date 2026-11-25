import { render } from '@testing-library/react';
import { createElement } from 'react';

import BottomNavbar from './BottomNavbar';
import type { NavbarProps } from './Navbar';
import { Navbar_fx } from './Navbar.unit.fx';

export const BottomNavbar_fx = {
  render: (props: Partial<NavbarProps> = {}) =>
    render(createElement(BottomNavbar, { 'aria-label': 'Bottom navigation', ...props })),
  navbar: Navbar_fx.selectors,
} as const;
