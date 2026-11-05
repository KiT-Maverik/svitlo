import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { useLessonLanguage } from '@/i18n/useLessonLocale';
import { DEFAULT_SUPPORTED_LANGUAGES } from '@svitlo/engine/localization';
import { getLessonMessages } from '../locales';

vi.mock('@/i18n/useLessonLocale', () => ({ useLessonLanguage: vi.fn() }));
import { QuestionProgress_fx } from './QuestionProgress.unit.fx';
import { aria } from './QuestionProgress.constants';

describe('Components', () => {
  describe('QuestionProgress', () => {
    beforeEach(() => {
      vi.mocked(useLessonLanguage).mockReturnValue(DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === 'uk')!);
    });
    it('should expose a localized accessible list label', () => {
      QuestionProgress_fx.render();
      expect(QuestionProgress_fx.selectors.list()).toHaveAccessibleName(aria.navigation);
    });

    it('should expose status-specific accessible button names and data states', () => {
      QuestionProgress_fx.render();
      expect(QuestionProgress_fx.selectors.status(0, 'unanswered')).toHaveAttribute('aria-current', 'step');
      expect(QuestionProgress_fx.selectors.status(1, 'correct')).toHaveAttribute('data-status', 'correct');
      expect(QuestionProgress_fx.selectors.status(2, 'incorrect')).toHaveAttribute('data-status', 'incorrect');
    });

    it('should disable navigation by default', () => {
      QuestionProgress_fx.render();
      expect(QuestionProgress_fx.selectors.status(1, 'correct')).toBeDisabled();
    });

    it('should leave the current question disabled while allowing another question', () => {
      QuestionProgress_fx.render({ allowNavigation: true });
      expect(QuestionProgress_fx.selectors.status(0, 'unanswered')).toBeDisabled();
      expect(QuestionProgress_fx.selectors.status(1, 'correct')).toBeEnabled();
    });

    it('should call the navigation callback with the selected question index', async () => {
      const onNavigate = vi.fn();
      QuestionProgress_fx.render({ allowNavigation: true, onNavigate });
      await QuestionProgress_fx.actions.select(2, 'incorrect');
      expect(onNavigate).toHaveBeenCalledTimes(1);
      expect(onNavigate).toHaveBeenCalledWith(2);
    });

    it('should handle an empty status list without creating question buttons', () => {
      QuestionProgress_fx.render({ statuses: [] });
      expect(QuestionProgress_fx.selectors.list().querySelectorAll('button')).toHaveLength(0);
    });

    it('should use the active Lithuanian locale for status labels', () => {
      vi.mocked(useLessonLanguage).mockReturnValue(DEFAULT_SUPPORTED_LANGUAGES.find(entry => entry.language === 'lt')!);
      QuestionProgress_fx.render({ statuses: ['unanswered'], currentIndex: 0 });
      const title = getLessonMessages('lt-LT').questionProgress.status.unanswered;
      expect(screen.getByRole('button', { name: `1. ${title}` })).toBeVisible();
    });

    it('should include deferred status in accessible names', () => {
      QuestionProgress_fx.render({ statuses: ['deferred'], currentIndex: 0 });
      expect(QuestionProgress_fx.selectors.status(0, 'deferred')).toBeVisible();
    });
  });
});
