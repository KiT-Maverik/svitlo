import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/runtime';
import NavbarPreferences from './NavbarPreferences';
import { ukUiKitMessages } from '../../../../testing/uiKitMessages.unit.fx';
import { navbarPreferences } from '../../../../../data/locale/navbarPreferences';

const { lt, ar, en } = navbarPreferences;
const uk = ukUiKitMessages.navbarPreferences;

describe('NavbarPreferences in shared UI Kit', () => {
  const setLocale = vi.fn();
  const setLessonLocale = vi.fn();
  const renderPreferences = (locale: 'uk-UA' | 'lt-LT' = 'uk-UA') =>
    render(
      <NavbarPreferences
        locale={locale}
        messages={locale === 'lt-LT' ? lt : uk}
        onLocaleChange={setLocale}
        lessonLocale="en-US"
        onLessonLocaleChange={setLessonLocale}
      />,
    );
  const locale = () => screen.getByRole('combobox', { name: uk.language });
  const lessonLocale = () => screen.getByRole('combobox', { name: uk.lessonLanguage });

  afterEach(() => vi.clearAllMocks());

  it('exposes language selectors but no theme switch or visible theme labels', () => {
    renderPreferences();
    expect(locale()).toBeVisible();
    expect(lessonLocale()).toBeVisible();
    expect(screen.queryByRole('switch')).not.toBeInTheDocument();
    expect(screen.queryByText(uk.theme.light)).not.toBeInTheDocument();
    expect(screen.queryByText(uk.theme.dark)).not.toBeInTheDocument();
  });

  it('uses an app-supplied callback for interface language', async () => {
    renderPreferences();
    await userEvent.click(locale());
    const english = DEFAULT_SUPPORTED_LANGUAGES.find(x => x.locale === 'en-US')!;
    await userEvent.click(await screen.findByRole('option', { name: new RegExp(english.nativeName) }));
    expect(setLocale).toHaveBeenCalledWith('en-US');
  });

  it('selects lesson translation without changing the interface language', async () => {
    renderPreferences();
    await userEvent.click(lessonLocale());
    await userEvent.click(await screen.findByRole('option', { name: 'Français' }));
    expect(setLessonLocale).toHaveBeenCalledWith('fr-FR');
    expect(setLocale).not.toHaveBeenCalled();
  });

  it('only offers published lesson languages, keeping the full interface language list', async () => {
    render(
      <NavbarPreferences
        locale="uk-UA"
        messages={uk}
        onLocaleChange={setLocale}
        lessonLocale="en-US"
        lessonLanguages={['en-US', 'uk-UA']}
        onLessonLocaleChange={setLessonLocale}
      />,
    );
    await userEvent.click(lessonLocale());
    const ukrainian = DEFAULT_SUPPORTED_LANGUAGES.find(item => item.locale === 'uk-UA')!;
    expect(await screen.findByRole('option', { name: ukrainian.nativeName })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Français' })).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('option', { name: ukrainian.nativeName }));
    expect(setLessonLocale).toHaveBeenCalledWith('uk-UA');
    await userEvent.click(locale());
    expect(await screen.findByRole('option', { name: 'Français' })).toBeInTheDocument();
  });

  it('orders volume, lesson language, then interface language', () => {
    const view = render(
      <NavbarPreferences
        locale="uk-UA"
        messages={uk}
        onLocaleChange={setLocale}
        lessonLocale="en-US"
        lessonLanguages={['en-US']}
        onLessonLocaleChange={setLessonLocale}
        volumeControl={<span>Volume control</span>}
      />,
    );
    const content = view.container.textContent ?? '';
    expect(content.indexOf('Volume control')).toBeLessThan(content.indexOf(uk.lessonLanguage));
    expect(content.indexOf(uk.lessonLanguage)).toBeLessThan(content.indexOf(uk.language));
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('sorts language options alphabetically by native name', async () => {
    renderPreferences();
    await userEvent.click(locale());
    const options = await screen.findAllByRole('option');
    const names = options.map(option => option.textContent?.trim());
    const collator = new Intl.Collator('en', { sensitivity: 'base' });
    const expected = DEFAULT_SUPPORTED_LANGUAGES.map(entry => entry.nativeName).sort(collator.compare);
    expect(names).toEqual(expected);
  });

  it('displays Belarusian without an orthography suffix', async () => {
    renderPreferences();
    await userEvent.click(locale());
    expect(await screen.findByRole('option', { name: 'Беларуская' })).toBeInTheDocument();
    expect(screen.queryByText(/тарашкевіца/i)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('option', { name: 'Беларуская' }));
    expect(setLocale).toHaveBeenCalledWith('be-tarask');
  });

  it('uses authored Arabic labels for RTL', () => {
    render(
      <div dir="rtl" lang="ar-SA">
        <NavbarPreferences locale="ar-SA" messages={ar} onLocaleChange={setLocale} />
      </div>,
    );
    expect(screen.getByRole('combobox', { name: ar.language })).toBeVisible();
    expect(ar.language).not.toEqual(uk.language);
  });

  it('retains distinct English translations', () => {
    expect(en.language).toBe('Interface language');
    expect(en.lessonLanguage).toBe('Lesson language');
    expect(en.theme.dark).toBe('Dark theme');
  });
});
