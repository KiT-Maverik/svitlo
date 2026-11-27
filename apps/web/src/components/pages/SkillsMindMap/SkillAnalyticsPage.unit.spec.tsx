import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { SvitloThemeProvider } from '@svitlo/ui-kit';

import { ukUiKitMessages } from '../../../../../../shared/ui-kit/src/testing/uiKitMessages.unit.fx';
import { SkillAnalyticsPage } from './SkillAnalyticsPage';
import { TEST_SKILL_NODES_UK } from './skillsData.fixture';

const aria = ukUiKitMessages.learningLayout;

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}));

describe('Skills page in shared LearningLayout', () => {
  const originalFetch = globalThis.fetch;
  beforeEach(() => {
    document.documentElement.lang = 'uk';
    window.history.replaceState({}, '', '/skillAnalytics');
    // Skills pages receive server-resolved props; a client fetch is a regression.
    vi.stubGlobal(
      'fetch',
      vi.fn(() => {
        throw new Error('Unexpected client-side Skills fetch');
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
        <SkillAnalyticsPage domains={TEST_SKILL_NODES_UK} language="uk" initialMessages={ukUiKitMessages} />
      </SvitloThemeProvider>,
    );
    const card = await screen.findByTestId('skill-node-testRed');
    expect(within(card).getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: aria.navigation.top })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Попередня|Назад/ })).not.toBeInTheDocument();

    const navbar = screen.getByRole('navigation', { name: aria.navigation.top });
    expect(
      within(navbar).getByRole('switch', { name: ukUiKitMessages.navbarPreferences.theme.dark }),
    ).toBeInTheDocument();
    openSettings();
    const sidebar = await screen.findByRole('complementary', { name: aria.navigation.settings });
    expect(
      within(sidebar).queryByRole('switch', { name: ukUiKitMessages.navbarPreferences.theme.dark }),
    ).not.toBeInTheDocument();
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
