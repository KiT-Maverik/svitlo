import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { SvitloThemeProvider } from '@svitlo/ui-kit/theme';
import { ukUiKitMessages } from '../../../../../../shared/ui-kit/src/testing/uiKitMessages.unit.fx';
const aria = ukUiKitMessages.learningLayout;
import { SkillAnalyticsPage } from './SkillAnalyticsPage';
import { fixtureJsonForSkillUrl, TEST_SKILLS_DOMAIN_SLUGS } from './skillsData.fixture';

describe('Skills page in shared LearningLayout', () => {
  const originalFetch = globalThis.fetch;
  beforeEach(() => {
    document.documentElement.lang = 'uk';
    window.history.replaceState({}, '', '/skillAnalytics');
    vi.stubGlobal(
      'fetch',
      vi.fn(async (url: string) => {
        const data: unknown = fixtureJsonForSkillUrl(url);
        return { ok: data !== null, status: data === null ? 404 : 200, json: async () => data };
      }),
    );
  });
  afterEach(() => {
    vi.stubGlobal('fetch', originalFetch);
    window.history.replaceState({}, '', '/');
  });

  const openSettings = () => {
    fireEvent.click(screen.getByRole('button', { name: aria.actions.openSettings }));
  };

  it('opens the existing navbar settings drawer and changes page-owned Skill cards', async () => {
    render(
      <SvitloThemeProvider direction="ltr">
        <SkillAnalyticsPage domainSlugs={TEST_SKILLS_DOMAIN_SLUGS} initialMessages={ukUiKitMessages} />
      </SvitloThemeProvider>,
    );
    const card = await screen.findByTestId('skill-node-testRed');
    expect(within(card).getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: aria.navigation.top })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Попередня|Назад/ })).not.toBeInTheDocument();

    const navbar = screen.getByRole('navigation', { name: aria.navigation.top });
    expect(within(navbar).getByRole('switch', { name: ukUiKitMessages.navbarPreferences.theme.dark })).toBeVisible();
    openSettings();
    const sidebar = await screen.findByRole('complementary', { name: aria.navigation.settings });
    expect(within(sidebar).queryByRole('switch', { name: ukUiKitMessages.navbarPreferences.theme.dark })).not.toBeInTheDocument();
    expect(within(sidebar).getByRole('combobox', { name: ukUiKitMessages.navbarPreferences.language })).toBeVisible();
    expect(within(sidebar).getByRole('region', { name: 'Налаштування сторінки Skills' })).toBeInTheDocument();
    const mapControls = within(sidebar).getByRole('region', { name: 'Керування мапою Skills' });
    expect(within(mapControls).getByRole('button', { name: 'Згорнути все' })).toBeEnabled();
    expect(within(mapControls).getByRole('button', { name: 'Розгорнути все' })).toBeEnabled();
    expect(within(mapControls).getByRole('button', { name: 'Вмістити в екран' })).toBeEnabled();
    fireEvent.click(within(sidebar).getByRole('switch', { name: 'Показувати володіння навичкою' }));
    expect(within(card).queryByRole('progressbar')).not.toBeInTheDocument();
    fireEvent.click(within(sidebar).getByRole('switch', { name: 'Показувати володіння навичкою' }));
    expect(within(card).getByRole('progressbar')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: aria.actions.closeSettingsPanel }));
    expect(screen.getByRole('button', { name: aria.actions.profile })).toHaveAttribute('aria-expanded', 'false');

    openSettings();
    const expandedSidebar = screen.getByRole('complementary', { name: aria.navigation.settings });
    fireEvent.click(within(expandedSidebar).getByRole('button', { name: 'Вмістити в екран' }));
    expect(screen.getByRole('button', { name: aria.actions.profile })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByTestId('skills-map-world')).toBeInTheDocument();
  });
});
