'use client';
import { useId } from 'react';
import { alpha, Box, InputAdornment, TextField as MuiTextField } from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Close from '@mui/icons-material/Close';
import type { CheckResult } from '../../check-result';
import { resultFeedback, type FeedbackVisibility } from '../../feedback';
import { uk } from '../../messages';
interface TextFieldProps extends FeedbackVisibility {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  result?: CheckResult | null;
  helperText?: string;
  inputMode?: 'text' | 'decimal';
}
/** Shared controlled text/numeric surface; grading remains outside this component. */
export function TextField({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  readOnly,
  result,
  helperText,
  inputMode = 'text',
  ...visibility
}: TextFieldProps) {
  const id = useId();
  const feedback = resultFeedback(result, visibility);
  const tone = feedback === 'correct' ? 'success' : 'error';
  return (
    <MuiTextField
      id={id}
      fullWidth
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onMouseDown={event => {
        if (result) event.preventDefault();
      }}
      disabled={disabled}
      data-feedback={feedback}
      error={feedback === 'incorrect'}
      color={feedback === 'correct' ? 'success' : 'primary'}
      sx={{
        maxWidth: 440,
        mx: 'auto',
        '& input:focus, & input:focus-visible': { outline: 'none' },
        '& .MuiOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline': {
          borderColor: 'divider',
          borderWidth: 1,
        },
        '& .MuiOutlinedInput-root': {
          transition: theme =>
            theme.transitions.create('background-color', { duration: 220, easing: theme.transitions.easing.easeInOut }),
        },
        '& .MuiOutlinedInput-notchedOutline': {
          transition: theme =>
            theme.transitions.create('border-color', { duration: 220, easing: theme.transitions.easing.easeInOut }),
        },
        ...(feedback
          ? {
              '& .MuiOutlinedInput-root': { bgcolor: theme => alpha(theme.palette[tone].main, 0.1) },
              '& .MuiOutlinedInput-notchedOutline': { borderColor: `${tone}.main` },
            }
          : {}),
        '@media (prefers-reduced-motion: reduce)': {
          '& .MuiOutlinedInput-root, & .MuiOutlinedInput-notchedOutline': { transition: 'none' },
        },
      }}
      helperText={helperText}
      slotProps={{
        input: {
          readOnly: readOnly || Boolean(result),
          endAdornment: (
            <InputAdornment position="end">
              <Box
                component="span"
                role={feedback ? 'img' : undefined}
                aria-label={
                  feedback === 'correct' ? uk.optionCorrect : feedback === 'incorrect' ? uk.optionIncorrect : undefined
                }
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: feedback ? 24 : 0,
                  overflow: 'hidden',
                  color: `${tone}.main`,
                  opacity: feedback ? 1 : 0,
                  transform: feedback ? 'scale(1)' : 'scale(.55)',
                  transformOrigin: 'center',
                  transition: theme =>
                    theme.transitions.create(['width', 'opacity', 'transform'], {
                      duration: 180,
                      easing: theme.transitions.easing.easeOut,
                    }),
                  animation: feedback ? 'answer-feedback-pop 180ms ease-out both' : 'none',
                  '@keyframes answer-feedback-pop': {
                    from: { opacity: 0, transform: 'scale(.55)' },
                    to: { opacity: 1, transform: 'scale(1)' },
                  },
                  '@media (prefers-reduced-motion: reduce)': { transition: 'none', animation: 'none' },
                }}
              >
                {feedback === 'correct' ? (
                  <CheckCircle key="correct" />
                ) : feedback === 'incorrect' ? (
                  <Close key="incorrect" />
                ) : null}
              </Box>
            </InputAdornment>
          ),
        },
        htmlInput: { inputMode, tabIndex: result ? -1 : undefined },
      }}
    />
  );
}
