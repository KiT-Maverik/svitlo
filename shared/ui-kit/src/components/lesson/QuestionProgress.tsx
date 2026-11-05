'use client';

import Box from '@mui/material/Box';
import type { UiKit_Component } from '@svitlo/engine/content';
import styles from './Lesson.module.css';

export type QuestionStatus = 'unanswered' | 'correct' | 'incorrect' | 'deferred';

export type QuestionProgressProps = {
  statuses: readonly QuestionStatus[];
  currentIndex: number;
  messages: UiKit_Component<'lesson', 'response'>;
  allowNavigation?: boolean;
  onNavigate?: (index: number) => void;
  className?: string;
};

export function QuestionProgress({
  statuses, currentIndex, messages, allowNavigation = false, onNavigate, className,
}: QuestionProgressProps) {
  const labels = messages.questionProgress;
  return (
    <Box component="ol" className={className ?? styles.questionProgress}
      role="list" aria-label={labels.navigation}>
      {statuses.map((status, index) => (
        <Box component="li" key={index} sx={{ display: 'contents' }}>
          <Box component="button" type="button"
            disabled={!allowNavigation || index === currentIndex}
            aria-current={index === currentIndex ? 'step' : undefined}
            aria-label={`${index + 1}. ${labels.status[status]}`}
            data-status={status}
            data-current={index === currentIndex || undefined}
            onClick={() => onNavigate?.(index)} />
        </Box>
      ))}
    </Box>
  );
}
