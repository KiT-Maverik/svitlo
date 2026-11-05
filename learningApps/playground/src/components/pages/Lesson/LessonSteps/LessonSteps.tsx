'use client';

import Box from '@mui/material/Box';
import styles from '../Lesson.module.css';
import { aria } from './LessonSteps.constants';

export interface LessonStepItem {
  id: string;
  title: string;
}

export interface LessonStepsProps {
  steps: readonly LessonStepItem[];
  currentStep: number;
  completedStep?: number;
  showStepNumbers?: boolean;
  allowNavigation?: boolean;
  onNavigate?: (step: number) => void;
}

export function LessonSteps({
  steps,
  currentStep,
  completedStep,
  showStepNumbers = true,
  allowNavigation = false,
  onNavigate,
}: LessonStepsProps) {
  return (
    <Box component="nav" className={styles.steps} aria-label={aria.navigation}>
      {steps.map((step, index) => (
        <Box
          component="button"
          key={step.id}
          type="button"
          disabled={!allowNavigation}
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
