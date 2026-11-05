import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import NavbarPreferences from './NavbarPreferences';
import { ukUiKitMessages } from '../../../../testing/uiKitMessages.unit.fx';
import { locale as lt } from '../../../../../data/components/NavbarPreferences/lt-LT.data';
const uk = ukUiKitMessages.navbarPreferences;
const aria = { locale: uk.language, theme: uk.theme.dark };

describe('NavbarPreferences in shared UI Kit', () => {
  const setLocale = vi.fn();
  const setMode = vi.fn();
  const renderPreferences = (locale: 'uk-UA' | 'lt-LT' = 'uk-UA', mode: 'light' | 'dark' | null = 'light') =>
    render(
      <NavbarPreferences
        locale={locale}
        messages={locale === 'lt-LT' ? lt : uk}
        onLocaleChange={setLocale}
        mode={mode ?? undefined}
        systemMode="light"
        onThemeChange={setMode}
      />,
    );
  const theme = () => screen.getByRole('switch', { name: aria.theme });
  const locale = () => screen.getByRole('combobox', { name: aria.locale });

  afterEach(() => vi.clearAllMocks());

  it('exposes accessible locale and theme controls', () => {
    renderPreferences();
    expect(locale()).toBeVisible();
    expect(theme()).toBeInTheDocument();
  });

  it('uses an app-supplied callback when a language is selected', async () => {
    renderPreferences();
    await userEvent.click(locale());
    const english = DEFAULT_SUPPORTED_LANGUAGES.find(x => x.locale === 'en-US')!;
    await userEvent.click(await screen.findByRole('option', { name: new RegExp(english.nativeName) }));
    expect(setLocale).toHaveBeenCalledWith('en-US');
  });

  it('toggles between light and dark themes', async () => {
    renderPreferences();
    await userEvent.click(theme());
    expect(setMode).toHaveBeenCalledWith('dark');
  });

  it('switches back from dark mode', async () => {
    renderPreferences('uk-UA', 'dark');
    expect(theme()).toBeChecked();
    await userEvent.click(theme());
    expect(setMode).toHaveBeenCalledWith('light');
  });

  it('disables theme selection until MUI mode initializes', () => {
    renderPreferences('uk-UA', null);
    expect(theme()).toBeDisabled();
  });

  it('uses localized theme tooltip text', async () => {
    renderPreferences('lt-LT');
    await userEvent.hover(theme());
    expect(await screen.findByText(lt.theme.light)).toBeVisible();
  });

  it('uses the explicitly supplied messages without a runtime locale fallback', () => {
    expect(uk.language).toBe('Мова');
    expect(lt.theme.light).toBeTruthy();
    expect(lt.theme.dark).toBeTruthy();
  });
});
