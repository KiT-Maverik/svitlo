'use client';

import type { UiKitMessages } from '#types/uiKitMessages';

import { Box, ButtonBase } from '@mui/material';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionContent, questionBlockLabel, type QuestionBlock } from './QuestionContent';

export type ChoiceFeedback = 'correct' | 'incorrect' | 'missed' | undefined;

export function QuestionChoice({
  block,
  selected,
  disabled = false,
  onToggle,
  feedback,
  sceneRegistry,
  messages,
}: {
  messages: UiKitMessages;
  block: QuestionBlock;
  selected: boolean;
  disabled?: boolean;
  onToggle: () => void;
  feedback?: ChoiceFeedback;
  sceneRegistry?: SceneRegistry;
}) {
  const tone =
    feedback === 'correct' ? 'success' : feedback === 'incorrect' ? 'error' : feedback === 'missed' ? 'warning' : null;
  return (
    <ButtonBase
      component="div"
      role="button"
      aria-label={questionBlockLabel(block) || block.id}
      aria-pressed={selected}
      aria-description={
        feedback === 'correct'
          ? messages.questionFrame.correctChoice
          : feedback === 'incorrect'
            ? messages.questionFrame.incorrectChoice
            : feedback === 'missed'
              ? messages.questionFrame.missedChoice
              : undefined
      }
      data-feedback={feedback}
      disabled={disabled}
      onClick={onToggle}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'start',
        p: 1.5,
        gap: 1,
        minHeight: 48,
        borderRadius: 1,
        border: '1px solid',
        borderColor: tone ? tone + '.main' : selected ? 'primary.main' : 'divider',
        bgcolor: tone ? tone + '.light' : selected ? 'action.selected' : 'background.paper',
        '&.Mui-disabled': { opacity: 1, color: 'text.primary' },
      }}
    >
      <Box component="span" aria-hidden="true" sx={{ fontWeight: 700, flexShrink: 0 }}>
        {feedback === 'correct' ? '✓' : feedback === 'incorrect' ? '✕' : selected ? '●' : '○'}
      </Box>
      <Box component="div" sx={{ minWidth: 0, flex: 1 }}>
        <QuestionContent blocks={[block]} sceneRegistry={sceneRegistry} messages={messages} />
      </Box>
    </ButtonBase>
  );
}
