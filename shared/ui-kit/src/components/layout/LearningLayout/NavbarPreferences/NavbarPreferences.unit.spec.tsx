import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import NavbarPreferences from './NavbarPreferences';
import { ukUiKitMessages } from '../../../../testing/uiKitMessages.unit.fx';
import { navbarPreferences } from '../../../../../data/locale/navbarPreferences';
const { lt, ar, en } = navbarPreferences;
const uk = ukUiKitMessages.navbarPreferences;
const aria = { locale: uk.language, theme: uk.theme.dark };

describe('NavbarPreferences in shared UI Kit', () => {
  const setLocale = vi.fn();
  const setLessonLocale = vi.fn();
  const setMode = vi.fn();
  const renderPreferences = (locale: 'uk-UA' | 'lt-LT' = 'uk-UA', mode: 'light' | 'dark' | null = 'light') =>
    render(
      <NavbarPreferences
        locale={locale}
        messages={locale === 'lt-LT' ? lt : uk}
        onLocaleChange={setLocale}
        lessonLocale="en-US"
        onLessonLocaleChange={setLessonLocale}
        mode={mode ?? undefined}
        systemMode="light"
        onThemeChange={setMode}
      />,
    );
  const theme = (language: 'uk-UA' | 'lt-LT' = 'uk-UA') =>
    screen.getByRole('switch', { name: language === 'lt-LT' ? lt.theme.dark : aria.theme });
  const locale = () => screen.getByRole('combobox', { name: aria.locale });
  const lessonLocale = () => screen.getByRole('combobox', { name: uk.lessonLanguage });

  afterEach(() => vi.clearAllMocks());

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

  it('disables theme selection until MUI mode initializes', () => {
    renderPreferences('uk-UA', null);
    expect(theme()).toBeDisabled();
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
