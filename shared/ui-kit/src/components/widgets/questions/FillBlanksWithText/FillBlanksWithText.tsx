'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { alpha, Box, TextField } from '@mui/material';
import CheckOutlined from '@mui/icons-material/CheckOutlined';
import CloseOutlined from '@mui/icons-material/CloseOutlined';
import type { InteractionProps } from '../interaction-props';
import { isGraded } from '../feedback';
import { normalizeText } from '../check';
import { CorrectAnswerBlock } from '../helpers';
import { uk } from '../messages';
import { aria, testId } from './FillBlanksWithText.constants';

const minWidth = 96;
const maxWidth = 360;
function BlankTextInput({
  id,
  placeholder,
  value,
  onChange,
  disabled,
  readOnly,
  feedback,
}: {
  id: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  readOnly: boolean;
  feedback?: 'correct' | 'incorrect';
}) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState(minWidth);
  useLayoutEffect(() => {
    const measured = measureRef.current?.getBoundingClientRect().width ?? 0;
    // The measuring span already includes the input's horizontal padding.
    setWidth(Math.min(maxWidth, Math.max(minWidth, Math.ceil(measured + 12))));
  }, [value]);
  const tone = feedback === 'correct' ? 'success' : feedback === 'incorrect' ? 'error' : undefined;
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        flex: '0 0 auto',
        verticalAlign: 'middle',
        mx: 0.5,
        position: 'relative',
        width: 'fit-content',
        minWidth,
        maxWidth: 'calc(100% - 1rem)',
      }}
    >
      <TextField
        id={id}
        placeholder={placeholder}
        aria-label={aria.blankInput}
        data-testid={testId.blankInput(id)}
        size="small"
        value={value}
        onChange={event => onChange(event.target.value)}
        disabled={disabled}
        slotProps={{ htmlInput: { readOnly, style: { textAlign: 'start', minWidth: 0 } } }}
        error={false}
        color={feedback === 'correct' ? 'success' : 'primary'}
        sx={{
          width,
          minWidth: 0,
          '& .MuiOutlinedInput-root': {
            bgcolor:
              tone === 'success'
                ? theme => alpha(theme.palette.success.main, 0.08)
                : tone === 'error'
                  ? theme => alpha(theme.palette.error.main, 0.08)
                  : 'background.paper',
            minWidth: 0,
            transition: 'background-color 180ms ease-in-out, border-color 180ms ease-in-out',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: tone ? `${tone}.main` : 'divider',
              borderStyle: tone ? 'dashed' : 'solid',
              borderWidth: 1,
            },
          },
          '@media (prefers-reduced-motion: reduce)': { '& .MuiOutlinedInput-root': { transition: 'none' } },
        }}
      />
      {tone ? (
        <Box
          component="span"
          role="img"
          aria-label={feedback === 'correct' ? uk.optionCorrect : uk.optionIncorrect}
          sx={{
            position: 'absolute',
            left: '50%',
            top: 0,
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 22,
            border: '1px solid',
            borderColor: `${tone}.main`,
            borderRadius: '50%',
            bgcolor: 'background.paper',
            color: `${tone}.main`,
            transform: 'translate(-50%, -50%)',
            animation: 'fill-blank-feedback-pop 180ms ease-out both',
            '@keyframes fill-blank-feedback-pop': {
              from: { opacity: 0, transform: 'translate(-50%, -50%) scale(.55)' },
              to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            },
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          {feedback === 'correct' ? <CheckOutlined sx={{ fontSize: 20 }} /> : <CloseOutlined sx={{ fontSize: 15 }} />}
        </Box>
      ) : null}
      <Box
        ref={measureRef}
        aria-hidden="true"
        sx={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre', font: 'inherit', px: 1.5, py: 1 }}
      >
        {value || ' '}
      </Box>
    </Box>
  );
}

export function FillBlanksWithText({
  question,
  value,
  onChange,
  disabled,
  readOnly,
  result,
  showErrors = true,
  showCorrectAnswers = true,
}: InteractionProps<'fill-blanks-text'>) {
  const graded = isGraded(result);
  const feedbackFor = (blankId: string) => {
    if (!graded) return undefined;
    const answer = value[blankId] ?? '';
    const correct =
      question.acceptedAnswers[blankId]?.some(
        expected => normalizeText(expected, question.normalization) === normalizeText(answer, question.normalization),
      ) ?? false;
    if (correct && showCorrectAnswers) return 'correct' as const;
    if (!correct && showErrors) return 'incorrect' as const;
    return undefined;
  };
  const shouldShowCorrectAnswer = (blankId: string) => {
    if (!graded || !showCorrectAnswers) return false;
    const answer = value[blankId] ?? '';
    return !(
      question.acceptedAnswers[blankId]?.some(
        expected => normalizeText(expected, question.normalization) === normalizeText(answer, question.normalization),
      ) ?? false
    );
  };
  return (
    <Box
      role="group"
      aria-label={question.prompt}
      sx={{ width: '100%', textAlign: 'start', lineHeight: 2.8, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
    >
      {question.parts.map((part, index) =>
        part.type === 'text' ? (
          <Box component="span" key={`text-${index}`}>
            {part.text}
          </Box>
        ) : (
          <Box component="span" key={part.id}>
            <BlankTextInput
              id={`${question.id}-${part.id}`}
              placeholder={question.placeholder}
              value={value[part.id] ?? ''}
              onChange={next => onChange({ ...value, [part.id]: next })}
              disabled={Boolean(disabled)}
              readOnly={Boolean(readOnly || result)}
              feedback={feedbackFor(part.id)}
            />
            {shouldShowCorrectAnswer(part.id) ? (
              <CorrectAnswerBlock label={question.acceptedAnswers[part.id]?.join(' / ') ?? ''} />
            ) : null}
          </Box>
        ),
      )}
    </Box>
  );
}
