'use client';

import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import styles from './Lesson.module.css';

export interface LessonStepItem {
  id: string;
  title: string;
}

export type LessonStepsProps = {
  steps: readonly LessonStepItem[];
  currentStep: number;
  completedStep?: number;
  showStepNumbers?: boolean;
  allowNavigation?: boolean;
  canNavigateTo?: (step: number) => boolean;
  onNavigate?: (step: number) => void;
  navigationLabel: string;
};

export function LessonSteps({
  steps,
  currentStep,
  completedStep,
  showStepNumbers = true,
  allowNavigation = false,
  canNavigateTo,
  onNavigate,
  navigationLabel,
}: LessonStepsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const activeStepRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const activeStep = activeStepRef.current;
    if (!container || !activeStep) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeStep.getBoundingClientRect();
    if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
      // Scroll only the step strip, not the lesson page. Physical offsets also work in RTL.
      container.scrollLeft +=
        (activeRect.left + activeRect.right - containerRect.left - containerRect.right) / 2;
    }
  }, [currentStep, steps.length]);

  return (
    <Box component="nav" ref={containerRef} className={styles.steps} aria-label={navigationLabel}>
      {steps.map((step, index) => (
        <Box
          component="button"
          key={step.id}
          ref={index === currentStep ? activeStepRef : undefined}
          type="button"
          disabled={!allowNavigation || (canNavigateTo ? !canNavigateTo(index) : false)}
          aria-current={index === currentStep ? 'step' : undefined}
          data-complete={index === completedStep || undefined}
          onClick={() => onNavigate?.(index)}
        >
          <span className={styles.segment} />
          <span className={styles.stepLabel}>
            {showStepNumbers ? `${index + 1}. ` : ''}
            {step.title}
          </span>
        </Box>
      ))}
    </Box>
  );
}
