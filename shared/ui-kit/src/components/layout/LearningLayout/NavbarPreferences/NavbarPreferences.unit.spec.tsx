import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { createTheme, ThemeProvider, useColorScheme } from '@mui/material/styles';
import userEvent from '@testing-library/user-event';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import NavbarPreferences from './NavbarPreferences';
import { ukUiKitMessages } from '../../../../testing/uiKitMessages.unit.fx';
import { navbarPreferences } from '../../../../../data/locale/navbarPreferences';
const { lt, ar, en } = navbarPreferences;
const uk = ukUiKitMessages.navbarPreferences;
const aria = { locale: uk.language, theme: uk.theme.dark };
const muiTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data' },
  colorSchemes: { light: true, dark: true },
});

function ConnectedThemePreferences() {
  const { mode, systemMode, setMode } = useColorScheme();
  return (
    <>
      <output data-testid="selected-theme-mode">{mode}</output>
      <NavbarPreferences
        locale="uk-UA"
        messages={uk}
        onLocaleChange={vi.fn()}
        mode={mode}
        systemMode={systemMode}
        onThemeChange={setMode}
      />
    </>
  );
}

describe('NavbarPreferences in shared UI Kit', () => {
  const setLocale = vi.fn();
  const setLessonLocale = vi.fn();
  const setMode = vi.fn();
  const renderPreferences = (
    locale: 'uk-UA' | 'lt-LT' = 'uk-UA',
    mode: 'light' | 'dark' | 'system' | null = 'light',
    systemMode: 'light' | 'dark' = 'light',
  ) =>
    render(
      <NavbarPreferences
        locale={locale}
        messages={locale === 'lt-LT' ? lt : uk}
        onLocaleChange={setLocale}
        lessonLocale="en-US"
        onLessonLocaleChange={setLessonLocale}
        mode={mode ?? undefined}
        systemMode={systemMode}
        onThemeChange={setMode}
      />,
    );
  const theme = (language: 'uk-UA' | 'lt-LT' = 'uk-UA') =>
    screen.getByRole('switch', { name: language === 'lt-LT' ? lt.theme.dark : aria.theme });
  const locale = () => screen.getByRole('combobox', { name: aria.locale });
  const lessonLocale = () => screen.getByRole('combobox', { name: uk.lessonLanguage });

  afterEach(() => {
    vi.clearAllMocks();
    window.localStorage.removeItem('mui-mode');
  });

  it('exposes accessible locale and theme controls', () => {
    renderPreferences();
    expect(locale()).toBeVisible();
    expect(lessonLocale()).toBeVisible();
    expect(theme()).toBeInTheDocument();
  });

  it('uses an app-supplied callback when a language is selected', async () => {
    renderPreferences();
    await userEvent.click(locale());
    const english = DEFAULT_SUPPORTED_LANGUAGES.find(x => x.locale === 'en-US')!;
    await userEvent.click(await screen.findByRole('option', { name: new RegExp(english.nativeName) }));
    expect(setLocale).toHaveBeenCalledWith('en-US');
  });

  it('selects the lesson translation without calling the interface locale callback', async () => {
    renderPreferences();
    await userEvent.click(lessonLocale());
    await userEvent.click(await screen.findByRole('option', { name: 'Français' }));
    expect(setLessonLocale).toHaveBeenCalledWith('fr-FR');
    expect(setLocale).not.toHaveBeenCalled();
  });

  it('sorts language options alphabetically by their native names', async () => {
    renderPreferences();
    await userEvent.click(locale());
    const options = await screen.findAllByRole('option');
    const names = options.map(option => option.textContent?.trim());
    const collator = new Intl.Collator('en', { sensitivity: 'base' });
    const expected = DEFAULT_SUPPORTED_LANGUAGES.map(entry => entry.nativeName).sort(collator.compare);
    expect(names).toEqual(expected);
  });

  it('displays the Belarusian language name without an orthography suffix', async () => {
    renderPreferences();
    await userEvent.click(locale());
    expect(await screen.findByRole('option', { name: 'Беларуская' })).toBeInTheDocument();
    expect(screen.queryByText(/тарашкевіца/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('option', { name: 'Беларуская' }));
    expect(setLocale).toHaveBeenCalledWith('be-tarask');
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

  it('allows theme selection while MUI restores the saved mode', async () => {
    renderPreferences('uk-UA', null);
    expect(theme()).toBeEnabled();
    await userEvent.click(theme());
    expect(setMode).toHaveBeenCalledWith('dark');
  });

  it('resolves the system color mode and toggles to an explicit preference', async () => {
    renderPreferences('uk-UA', 'system', 'dark');
    expect(theme()).toBeChecked();
    await userEvent.click(theme());
    expect(setMode).toHaveBeenCalledWith('light');
  });

  it('shows a sun in light mode and a moon in dark mode', () => {
    const view = renderPreferences();
    expect(screen.getByTestId('WbSunnyRoundedIcon')).toBeVisible();
    view.rerender(
      <NavbarPreferences locale="uk-UA" messages={uk} onLocaleChange={setLocale} mode="dark" onThemeChange={setMode} />,
    );
    expect(screen.getByTestId('DarkModeRoundedIcon')).toBeVisible();
  });

  it('applies both MUI CSS color schemes through the real ThemeProvider', async () => {
    window.localStorage.removeItem('mui-mode');
    render(
      <ThemeProvider theme={muiTheme}>
        <ConnectedThemePreferences />
      </ThemeProvider>,
    );
    await waitFor(() => expect(screen.getByTestId('selected-theme-mode')).not.toHaveTextContent(''));
    await userEvent.click(theme());
    await waitFor(() => {
      expect(screen.getByTestId('selected-theme-mode')).toHaveTextContent('dark');
      expect(document.documentElement).toHaveAttribute('data-dark');
    });
    await userEvent.click(theme());
    await waitFor(() => {
      expect(screen.getByTestId('selected-theme-mode')).toHaveTextContent('light');
      expect(document.documentElement).toHaveAttribute('data-light');
    });
    window.localStorage.removeItem('mui-mode');
  });

  it('uses localized theme tooltip text', async () => {
    renderPreferences('lt-LT');
    await userEvent.hover(theme('lt-LT'));
    expect(await screen.findByRole('tooltip')).toHaveTextContent(lt.theme.light);
  });

  it('uses authored Arabic controls for an RTL language', () => {
    const setArabic = vi.fn();
    render(
      <div dir="rtl" lang="ar-SA">
        <NavbarPreferences
          locale="ar-SA"
          messages={ar}
          onLocaleChange={setArabic}
          mode="dark"
          onThemeChange={setMode}
        />
      </div>,
    );
    expect(screen.getByRole('combobox', { name: ar.language })).toBeVisible();
    expect(screen.getByRole('switch', { name: ar.theme.dark })).toBeChecked();
    expect(ar.language).not.toEqual(uk.language);
  });

  it('uses the language-specific English labels, not Ukrainian fallback', () => {
    expect(en.language).toBe('Interface language');
    expect(en.lessonLanguage).toBe('Lesson language');
    expect(en.theme.dark).toBe('Dark theme');
    expect(en.theme.light).toBe('Light theme');
  });

  it('uses the explicitly supplied messages without a runtime locale fallback', () => {
    expect(uk.language).toBe('Мова інтерфейсу');
    expect(uk.lessonLanguage).toBe('Мова уроку');
    expect(lt.theme.light).toBeTruthy();
    expect(lt.theme.dark).toBeTruthy();
  });
});
