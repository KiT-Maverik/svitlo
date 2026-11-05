import { createElement, type ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocaleProvider, useLocale } from './LocaleProvider';

type Props = ComponentProps<typeof LocaleProvider>;

function LocaleHarness() {
  const { locale, setLocale } = useLocale();
  return createElement(
    'div',
    {},
    createElement('output', { 'aria-label': 'Current locale' }, locale),
    createElement('button', { type: 'button', onClick: () => setLocale('en-US') }, 'Change locale'),
  );
}

export const LocaleProvider_fx = {
  render: (props: Partial<Omit<Props, 'children'>> = {}) =>
    render(createElement(LocaleProvider, { locale: 'uk-UA', ...props } as Props, createElement(LocaleHarness))),
  selectors: {
    current: () => screen.getByRole('status', { name: 'Current locale' }),
    change: () => screen.getByRole('button', { name: 'Change locale' }),
  },
  actions: {
    change: async () => userEvent.click(LocaleProvider_fx.selectors.change()),
  },
} as const;
