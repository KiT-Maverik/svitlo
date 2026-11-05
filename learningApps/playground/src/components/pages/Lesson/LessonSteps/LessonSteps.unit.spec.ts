import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { LessonSteps_fx } from './LessonSteps.unit.fx';
import { aria } from './LessonSteps.constants';

describe('Components', () => {
  describe('LessonSteps', () => {
    it('should expose a localized accessible navigation name', () => {
      LessonSteps_fx.render();
      expect(LessonSteps_fx.selectors.navigation()).toHaveAccessibleName(aria.navigation);
    });

    it('should mark the current step and keep navigation disabled by default', () => {
      LessonSteps_fx.render();
      expect(LessonSteps_fx.selectors.step('1. Theory')).toHaveAttribute('aria-current', 'step');
      expect(LessonSteps_fx.selectors.step('1. Theory')).toBeDisabled();
      expect(LessonSteps_fx.selectors.step('2. Practice')).toBeDisabled();
    });

    it('should enable all steps when navigation is allowed', () => {
      LessonSteps_fx.render({ allowNavigation: true });
      expect(LessonSteps_fx.selectors.step('1. Theory')).toBeEnabled();
      expect(LessonSteps_fx.selectors.step('2. Practice')).toBeEnabled();
      expect(LessonSteps_fx.selectors.step('3. Quiz')).toBeEnabled();
    });

    it('should call onNavigate with the selected step index', async () => {
      const onNavigate = vi.fn();
      LessonSteps_fx.render({ allowNavigation: true, onNavigate });
      await LessonSteps_fx.actions.select('2. Practice');
      expect(onNavigate).toHaveBeenCalledTimes(1);
      expect(onNavigate).toHaveBeenCalledWith(1);
    });

    it('should omit step numbers when requested', () => {
      LessonSteps_fx.render({ showStepNumbers: false, allowNavigation: true });
      expect(LessonSteps_fx.selectors.step('Theory')).toBeVisible();
      expect(screen.queryByRole('button', { name: '1. Theory' })).not.toBeInTheDocument();
    });

    it('should expose completed step state through the existing data attribute', () => {
      LessonSteps_fx.render({ completedStep: 2 });
      expect(LessonSteps_fx.selectors.step('1. Theory')).not.toHaveAttribute('data-complete');
      expect(LessonSteps_fx.selectors.step('3. Quiz')).toHaveAttribute('data-complete', 'true');
    });
  });
});
