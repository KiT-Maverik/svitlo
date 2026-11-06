import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/i18n/useLessonLocale', () => ({ useLessonLocale: vi.fn() }));

import { screen, within } from '@testing-library/react';
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

    it('should keep settings and topics mutually exclusive', async () => {
      LearningLayout_fx.render();
      await LearningLayout_fx.actions.openTopics();
      await LearningLayout_fx.actions.openSettings();
      expect(await screen.findByText(locale.settingsDescription)).toBeVisible();
      expect(LearningLayout_fx.selectors.settings()).toBeVisible();
      expect(LearningLayout_fx.selectors.topAction(aria.actions.profile)).toHaveAttribute('aria-expanded', 'false');
      expect(LearningLayout_fx.selectors.topAction(aria.actions.openTopics)).toHaveAttribute('aria-expanded', 'false');
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
