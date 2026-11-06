import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/i18n/useLessonLocale', () => ({ useLessonLocale: vi.fn() }));

import { createElement } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MuiThemeProvider from '@/app/MuiThemeProvider';
import LearningLayout from './LearningLayout';
import { LearningLayout_fx } from './LearningLayout.unit.fx';
import { LearningLayout_mx } from './LearningLayout.unit.mx';
import { ukUiKitMessages } from '../../../../../../shared/ui-kit/src/testing/uiKitMessages.unit.fx';
const aria = ukUiKitMessages.learningLayout;
const locale = aria;

describe('Layouts', () => {
  describe('LearningLayout', () => {
    beforeEach(() => LearningLayout_mx.prepare());
    afterEach(() => LearningLayout_mx.reset());

    it('should compose the shared top and bottom navbars around the lesson content', () => {
      LearningLayout_fx.render();
      expect(LearningLayout_fx.selectors.top()).toBeVisible();
      expect(LearningLayout_fx.selectors.bottom()).toBeVisible();
      expect(LearningLayout_fx.selectors.main()).toHaveTextContent('Lesson content');
      expect(LearningLayout_fx.navbar.slot('center', LearningLayout_fx.selectors.bottom())).toHaveTextContent(
        locale.actions.next,
      );
    });

    it('should enable progression and update the UI Kit-owned navigation state', async () => {
      LearningLayout_fx.render();
      expect(LearningLayout_fx.selectors.bottomAction(locale.actions.previous)).toBeDisabled();
      expect(LearningLayout_fx.selectors.bottomAction(locale.actions.next)).toBeEnabled();
      await LearningLayout_fx.actions.next();
      expect(LearningLayout_fx.selectors.bottomAction(locale.actions.previous)).toBeEnabled();
    });

    it('should advance to the next section when skipping an eligible section', async () => {
      LearningLayout_fx.render();
      await LearningLayout_fx.actions.skip();
      expect(LearningLayout_fx.selectors.bottomAction(locale.actions.previous)).toBeEnabled();
      expect(LearningLayout_fx.selectors.bottomAction(locale.actions.skip)).toBeDisabled();
    });

    it('should open the topics navigation and close it via Escape', async () => {
      LearningLayout_fx.render();
      await LearningLayout_fx.actions.openTopics();
      expect(await screen.findByRole('navigation', { name: aria.navigation.topics })).toBeVisible();
      expect(within(LearningLayout_fx.selectors.topics()).getByRole('link', { name: 'Example topic' })).toHaveAttribute(
        'aria-current',
        'page',
      );
      await LearningLayout_fx.actions.escape();
      expect(LearningLayout_fx.selectors.topAction(aria.actions.openTopics)).toHaveAttribute('aria-expanded', 'false');
    });

    it('should show quick settings and profile actions on the right side of the navbar', () => {
      LearningLayout_fx.render();
      const right = LearningLayout_fx.navbar.slot('right', LearningLayout_fx.selectors.top());
      expect(within(right).getAllByRole('button')).toHaveLength(2);
      expect(within(right).getByRole('button', { name: aria.actions.openSettings })).toBeEnabled();
      expect(within(right).getByRole('button', { name: aria.actions.profile })).toBeEnabled();
      expect(within(right).queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('should keep quick settings and topics mutually exclusive', async () => {
      LearningLayout_fx.render();
      await LearningLayout_fx.actions.openTopics();
      await LearningLayout_fx.actions.openSettings();
      expect(await screen.findByRole('combobox', { name: ukUiKitMessages.navbarPreferences.language })).toBeVisible();
      expect(LearningLayout_fx.selectors.settings()).toBeVisible();
      expect(LearningLayout_fx.selectors.topAction(aria.actions.profile)).toHaveAttribute('aria-expanded', 'false');
      expect(LearningLayout_fx.selectors.topAction(aria.actions.openTopics)).toHaveAttribute('aria-expanded', 'false');
    });

    it('should link to profile settings without opening quick settings', async () => {
      LearningLayout_fx.render();
      await LearningLayout_fx.actions.openSettings();
      const profile = LearningLayout_fx.selectors.topAction(aria.actions.profile);
      profile.click();
      const profileSettings = screen.getByRole('menuitem', { name: aria.actions.profileSettings });
      expect(profileSettings).toHaveAttribute('href', '#');
      profileSettings.click();
      expect(LearningLayout_fx.selectors.topAction(aria.actions.openSettings)).toHaveAttribute(
        'aria-expanded',
        'false',
      );
    });

    it('keeps Quick Settings open and synchronizes the switch with the applied scheme', async () => {
      window.localStorage.setItem('mui-mode', 'light');
      try {
        render(
          createElement(MuiThemeProvider, {
            direction: 'ltr',
            children: createElement(LearningLayout, {
              ...LearningLayout_fx.defaults,
              children: 'Lesson content',
            }),
          }),
        );

        await userEvent.click(screen.getByRole('button', { name: aria.actions.openSettings }));
        const settings = screen.getByRole('complementary', { name: aria.navigation.settings });
        const theme = () =>
          within(settings).getByRole('switch', { name: ukUiKitMessages.navbarPreferences.theme.dark });

        await waitFor(() => {
          expect(theme()).not.toBeChecked();
          expect(document.documentElement).toHaveAttribute('data-light');
        });

        await userEvent.click(theme());
        await waitFor(() => {
          expect(document.documentElement).toHaveAttribute('data-dark');
          expect(theme()).toBeChecked();
          expect(settings).toBeVisible();
        });

        await userEvent.click(theme());
        await waitFor(() => {
          expect(document.documentElement).toHaveAttribute('data-light');
          expect(theme()).not.toBeChecked();
          expect(settings).toBeVisible();
        });
      } finally {
        window.localStorage.removeItem('mui-mode');
      }
    });

    it('should set right-to-left direction for RTL locales', () => {
      LearningLayout_mx.prepare({ locale: 'ar-SA' });
      const { container } = LearningLayout_fx.render();
      expect(container.firstElementChild).toHaveAttribute('dir', 'rtl');
      expect(container.firstElementChild).toHaveAttribute('lang', 'ar-SA');
    });

    it('should refuse forward navigation past the final section', async () => {
      LearningLayout_fx.render();
      await LearningLayout_fx.actions.next();
      await LearningLayout_fx.actions.next();
      expect(LearningLayout_fx.selectors.bottomAction(locale.actions.next)).toBeDisabled();
      expect(LearningLayout_fx.selectors.bottomAction(locale.actions.skip)).toBeDisabled();
    });
  });
});
