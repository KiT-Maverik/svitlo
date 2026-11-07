import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LearningLayout from './LearningLayout';
import ThemeSwitch from './NavbarPreferences/ThemeSwitch';
import { learningLayout } from '../../../../data/locale/learningLayout';

const uk = learningLayout.uk;

describe('LearningLayout preparation', () => {
  it('covers the learning area while leaving both navigation bars visible', () => {
    render(
      <LearningLayout
        locale="uk-UA"
        messages={uk}
        pathname="/uk/lesson/test"
        progress={{ ready: true, step: 0, lastStep: 1, testDone: false }}
        topics={[]}
        actions={{ back: vi.fn(), next: vi.fn(), skip: vi.fn() }}
        contentLoading
      >
        <p>Вміст уроку</p>
      </LearningLayout>,
    );

    expect(screen.getByRole('navigation', { name: uk.navigation.top })).toBeVisible();
    expect(screen.getByRole('navigation', { name: uk.navigation.top }).parentElement).toHaveClass(
      'svitlo-theme-surface',
    );
    expect(screen.getByRole('navigation', { name: uk.navigation.bottom })).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent(uk.preparingLesson);
    expect(screen.getByRole('main', { hidden: true })).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('main', { hidden: true })).toHaveAttribute('inert');
    expect(screen.getByRole('button', { name: /Далі/ })).toBeDisabled();
  });

  it('places preferences and page-specific controls inside quick settings, not the navbar', () => {
    render(
      <LearningLayout
        locale="uk-UA"
        messages={uk}
        pathname="/uk/lesson/uk/test"
        progress={{ ready: true, step: 0, lastStep: 1, testDone: false }}
        topics={[]}
        actions={{ back: vi.fn(), next: vi.fn(), skip: vi.fn() }}
        preferences={<button type="button">Interface settings control</button>}
        settingsContent={<p>Additional page control</p>}
      >
        <p>Вміст уроку</p>
      </LearningLayout>,
    );

    expect(
      within(screen.getByRole('navigation', { name: uk.navigation.top })).queryByRole('button', {
        name: 'Interface settings control',
      }),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: uk.actions.openSettings }));
    expect(screen.getByRole('heading', { name: uk.settingsTitle })).toBeVisible();
    const sidebar = screen.getByRole('complementary', { name: uk.navigation.settings });
    expect(within(sidebar).getByTestId('vertical-space-top')).toContainElement(
      screen.getByRole('heading', { name: uk.settingsTitle }),
    );
    expect(within(sidebar).getByTestId('vertical-space-bottom')).toContainElement(
      screen.getByRole('button', { name: 'Interface settings control' }),
    );
    expect(screen.getByRole('button', { name: 'Interface settings control' })).toBeVisible();
    expect(screen.getByText('Additional page control')).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: uk.actions.closeSidebar }));
    expect(screen.getByRole('button', { name: uk.actions.profile })).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders the theme switch before settings in the navbar and nowhere in the drawer', () => {
    const setMode = vi.fn();
    render(
      <LearningLayout
        locale="uk-UA"
        messages={uk}
        pathname="/uk/lesson/uk/test"
        progress={{ ready: true, step: 0, lastStep: 1, testDone: false }}
        topics={[]}
        actions={{ back: vi.fn(), next: vi.fn(), skip: vi.fn() }}
        preferences={<p>Languages</p>}
        themeControl={<ThemeSwitch label="Темна тема" mode="light" onThemeChange={setMode} />}
      >
        <p>Вміст уроку</p>
      </LearningLayout>,
    );
    const navbar = screen.getByRole('navigation', { name: uk.navigation.top });
    const toggle = within(navbar).getByRole('switch', { name: 'Темна тема' });
    const settings = within(navbar).getByRole('button', { name: uk.actions.openSettings });
    expect(toggle.compareDocumentPosition(settings) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    fireEvent.click(toggle);
    expect(setMode).toHaveBeenCalledWith('dark');
    fireEvent.click(settings);
    expect(
      within(screen.getByRole('complementary', { name: uk.navigation.settings })).queryByRole('switch'),
    ).not.toBeInTheDocument();
  });

  it('keeps profile settings separate from quick settings', () => {
    render(
      <LearningLayout
        locale="uk-UA"
        messages={uk}
        pathname="/uk/lesson/uk/test"
        progress={{ ready: true, step: 0, lastStep: 1, testDone: false }}
        topics={[]}
        actions={{ back: vi.fn(), next: vi.fn(), skip: vi.fn() }}
        profileSettingsHref="#"
      >
        <p>Вміст уроку</p>
      </LearningLayout>,
    );

    fireEvent.click(screen.getByRole('button', { name: uk.actions.profile }));
    const profileSettings = screen.getByRole('menuitem', { name: uk.actions.profileSettings });
    expect(profileSettings).toHaveAttribute('href', '#');
    fireEvent.click(profileSettings);
    expect(screen.getByRole('button', { name: uk.actions.openSettings })).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows an accessible error and offers retry while keeping lesson content inert', () => {
    const retry = vi.fn();
    render(
      <LearningLayout
        locale="uk-UA"
        messages={uk}
        pathname="/uk/lesson/test"
        progress={{ ready: true, step: 0, lastStep: 1, testDone: false }}
        topics={[]}
        actions={{ back: vi.fn(), next: vi.fn(), skip: vi.fn() }}
        contentLoading
        contentError
        onRetryContent={retry}
      >
        <p>Вміст уроку</p>
      </LearningLayout>,
    );

    expect(screen.getByRole('alert')).toHaveTextContent(uk.preparingLessonError);
    expect(screen.getByRole('main', { hidden: true })).toHaveAttribute('inert');
    fireEvent.click(screen.getByRole('button', { name: uk.actions.retry }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
