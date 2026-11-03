'use client';

import { useState, type ReactNode } from 'react';
import { alpha, ButtonBase, Box, Divider, Typography } from '@mui/material';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked';
import CheckCircle from '@mui/icons-material/CheckCircle';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutlined';
import type { ChoiceFeedback } from '../../feedback';
import Close from '@mui/icons-material/Close';
import { uk } from '../../messages';

export function answerLetter(index: number): string {
  let value = index + 1;
  let result = '';
  while (value > 0) {
    value -= 1;
    result = String.fromCharCode(65 + (value % 26)) + result;
    value = Math.floor(value / 26);
  }
  return result;
}

/** Reusable toggle. The entire answer, including its icon, is one button. */
export function AnswerOption({
  label,
  content,
  selected,
  onToggle,
  disabled = false,
  feedback,
  letter,
}: {
  label: string;
  content?: ReactNode;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
  feedback?: ChoiceFeedback;
  letter?: string;
}) {
  const [showRemove, setShowRemove] = useState(false);
  const locked = disabled || Boolean(feedback);
  const tone =
    feedback === 'correct' ? 'success' : feedback === 'incorrect' ? 'error' : feedback === 'missed' ? 'warning' : null;
  const feedbackText = feedback
    ? uk[feedback === 'correct' ? 'optionCorrect' : feedback === 'incorrect' ? 'optionIncorrect' : 'optionMissed']
    : '';

  const option = (
    <ButtonBase
      component="div"
      role="button"
      aria-label={label}
      aria-description={feedback ? feedbackText : undefined}
      data-feedback={feedback}
      aria-pressed={selected}
      disabled={locked}
      onPointerEnter={() => setShowRemove(selected)}
      onPointerLeave={() => setShowRemove(false)}
      onFocus={() => setShowRemove(selected)}
      onBlur={() => setShowRemove(false)}
      onClick={() => {
        setShowRemove(false);
        onToggle();
      }}
      sx={{
        width: '100%',
        justifyContent: 'flex-start',
        gap: 1.5,
        px: 2,
        py: 1.5,
        border: '1px solid',
        borderStyle: feedback === 'missed' ? 'dashed' : 'solid',
        borderColor: tone ? `${tone}.main` : selected ? 'primary.main' : 'transparent',
        bgcolor: theme => (tone && feedback !== 'missed' ? alpha(theme.palette[tone].main, 0.12) : 'transparent'),
        transition: theme =>
          theme.transitions.create(['border-color', 'background-color', 'color'], {
            duration: 220,
            easing: theme.transitions.easing.easeInOut,
          }),
        '@media (prefers-reduced-motion: reduce)': { transition: 'none', '& svg, & span': { transition: 'none' } },
        borderRadius: 1,
        textAlign: 'start',
        minHeight: 48,
        '&:not(.Mui-disabled):hover': { bgcolor: 'action.hover' },
        '&.Mui-disabled': { opacity: feedback ? 1 : 0.6, color: 'text.primary' },
        '&.Mui-focusVisible': { outline: '3px solid', outlineColor: 'primary.main', outlineOffset: 3 },
      }}
    >
      <Box
        component="span"
        aria-hidden="true"
        sx={{
          position: 'relative',
          width: 24,
          height: 24,
          flexShrink: 0,
          color: tone ? `${tone}.main` : selected ? 'primary.main' : 'text.secondary',
          transition: 'color 220ms ease-in-out',
          '@keyframes choice-feedback-pop': {
            from: { opacity: 0, transform: 'scale(.55)' },
            to: { opacity: 1, transform: 'scale(1)' },
          },
          '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
        }}
      >
        <Box
          component="span"
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            opacity: feedback ? 1 : 0,
            transform: feedback ? 'scale(1)' : 'scale(.55)',
            transition: 'opacity 180ms ease-out, transform 180ms ease-out',
            '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
          }}
        >
          {feedback &&
            (feedback === 'correct' ? (
              <CheckCircle key="correct" sx={{ animation: 'choice-feedback-pop 180ms ease-out both' }} />
            ) : feedback === 'incorrect' ? (
              <Close key="incorrect" sx={{ animation: 'choice-feedback-pop 180ms ease-out both' }} />
            ) : (
              <CheckCircleOutline key="missed" sx={{ animation: 'choice-feedback-pop 180ms ease-out both' }} />
            ))}
        </Box>
        <Box
          component="span"
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: feedback ? 0 : 1,
            transition: 'opacity 180ms ease-out',
            '& > svg': {
              position: 'absolute',
              inset: 0,
              transition: 'opacity 180ms ease-in-out, transform 180ms ease-in-out, visibility 180ms',
            },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none', '& > svg': { transition: 'none' } },
          }}
        >
          <RadioButtonUnchecked
            sx={{
              opacity: selected ? 0 : 1,
              visibility: selected ? 'hidden' : 'visible',
              transform: selected ? 'scale(.8)' : 'scale(1)',
            }}
          />
          <RadioButtonChecked
            className="answer-selected"
            sx={{
              opacity: selected && !(showRemove && !locked) ? 1 : 0,
              visibility: selected && !(showRemove && !locked) ? 'visible' : 'hidden',
              transform: selected ? 'scale(1)' : 'scale(.8)',
            }}
          />
          <Close
            className="answer-remove"
            sx={{
              opacity: selected && showRemove && !locked ? 1 : 0,
              visibility: selected && showRemove && !locked ? 'visible' : 'hidden',
              transform: showRemove ? 'rotate(0deg) scale(1)' : 'rotate(-45deg) scale(.8)',
            }}
          />
        </Box>
      </Box>
      <Box component="div" sx={{ minWidth: 0, overflowWrap: 'anywhere' }}>
        {content ?? <Typography component="span">{label}</Typography>}
      </Box>
    </ButtonBase>
  );
  return letter ? (
    <Box component="span" sx={{ display: 'flex', alignItems: 'stretch', minWidth: 0 }}>
      <Typography
        component="span"
        aria-hidden="true"
        sx={{ width: 32, flexShrink: 0, alignSelf: 'center', textAlign: 'center', color: 'text.secondary' }}
      >
        {letter}
      </Typography>
      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
      {option}
    </Box>
  ) : (
    option
  );
}

/** Max-content measures the widest label; all rows stretch to that one width. */
export const answerColumnSx = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: 1,
  width: 'max-content',
  maxWidth: '100%',
  mx: 'auto',
  textAlign: 'start',
};
