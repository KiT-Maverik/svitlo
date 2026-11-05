'use client';

import Box from '@mui/material/Box';
import { aria } from './QuestionProgress.constants';
import { getLessonMessages } from '../locales';
import { useLessonLanguage } from '@/i18n/useLessonLocale';

export type QuestionStatus = 'unanswered' | 'correct' | 'incorrect' | 'deferred';

export interface QuestionProgressProps {
  statuses: QuestionStatus[];
  currentIndex: number;
  allowNavigation?: boolean;
  onNavigate?: (index: number) => void;
  className?: string;
}

export function QuestionProgress({
  statuses,
  currentIndex,
  allowNavigation = false,
  onNavigate,
  className,
}: QuestionProgressProps) {
  const { locale } = useLessonLanguage();
  const statusLabel: Record<QuestionStatus, string> = getLessonMessages(locale).questionProgress.status;
  return (
    <Box component="ol" className={className} role="list" aria-label={aria.navigation}>
      {statuses.map((status, index) => (
        <Box component="li" key={index} sx={{ display: 'contents' }}>
          <Box
            component="button"
            type="button"
            disabled={!allowNavigation || index === currentIndex}
            aria-current={index === currentIndex ? 'step' : undefined}
            aria-label={`${index + 1}. ${statusLabel[status]}`}
            data-status={status}
            data-current={index === currentIndex || undefined}
            onClick={() => onNavigate?.(index)}
          />
        </Box>
      ))}
    </Box>
  );
}
