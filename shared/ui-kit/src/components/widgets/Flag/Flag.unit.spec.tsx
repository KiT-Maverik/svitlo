import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Flag, flagCountryByLocale } from './Flag';

describe('Widgets/Flag', () => {
  it('renders a bounded decorative image and forwards image props', () => {
    render(<Flag locale="uk-UA" data-testid="flag" width={30} height={20} className="custom-flag" />);
    const flag = screen.getByTestId('flag');
    expect(flag.tagName.toLowerCase()).toBe('img');
    expect(flag).toHaveAttribute('src', '/flags/ua.svg');
    expect(flag).toHaveAttribute('alt', '');
    expect(flag).toHaveAttribute('width', '30');
    expect(flag).toHaveAttribute('height', '20');
    expect(flag).toHaveClass('custom-flag');
    expect(flag).toHaveStyle({ objectFit: 'contain' });
  });

  it('resolves a host-provided asset base path without duplicating its trailing slash', () => {
    render(<Flag locale="pl-PL" assetBasePath="/local/flags/" data-testid="local-flag" />);
    expect(screen.getByTestId('local-flag')).toHaveAttribute('src', '/local/flags/pl.svg');
  });

  it('supports nondecorative accessible flags when an alt label is provided', () => {
    render(<Flag locale="uk-UA" alt="Прапор України" />);
    expect(screen.getByRole('img', { name: 'Прапор України' })).toBeInTheDocument();
  });

  it('uses a Brazilian flag for pt-BR, not the Portuguese flag', () => {
    expect(flagCountryByLocale['pt-BR']).toBe('br');
  });

  it('uses the agreed flags for the new language communities', () => {
    expect(flagCountryByLocale['be-tarask']).toBe('by');
    expect(flagCountryByLocale['ka-GE']).toBe('ge');
    expect(flagCountryByLocale['kk-Latn-KZ']).toBe('kz');
    expect(flagCountryByLocale['lt-LT']).toBe('lt');
    expect(flagCountryByLocale['lv-LV']).toBe('lv');
    expect(flagCountryByLocale['et-EE']).toBe('ee');
    expect(flagCountryByLocale['crh-Latn-UA']).toBe('qm');
  });

  it('reuses India for all four Indian-language locales', () => {
    for (const locale of ['hi-IN', 'ta-IN', 'te-IN', 'mr-IN'] as const) {
      expect(flagCountryByLocale[locale]).toBe('in');
    }
  });
});
