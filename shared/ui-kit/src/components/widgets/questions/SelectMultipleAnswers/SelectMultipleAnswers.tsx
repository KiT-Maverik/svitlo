'use client';

import type { InteractionProps } from '../interaction-props';
import { choiceFeedback } from '../feedback';
import { Box } from '@mui/material';
import { AnswerOption, answerColumnSx, answerLetter } from '../helpers';
export function SelectMultipleAnswers({
  question,
  value,
  onChange,
  disabled,
  readOnly,
  result,
  showErrors,
  showCorrectAnswers,
  showLetters = false,
}: InteractionProps<'multiple-select'>) {
  return (
    <Box role="group" aria-label={question.prompt} sx={answerColumnSx}>
      {question.options.map((item, index) => (
        <AnswerOption
          key={item.id}
          label={item.label}
          content={item.content}
          letter={showLetters ? answerLetter(index) : undefined}
          selected={value.includes(item.id)}
          feedback={choiceFeedback(result, value.includes(item.id), question.correctIds.includes(item.id), {
            showErrors,
            showCorrectAnswers,
          })}
          disabled={disabled || readOnly || Boolean(result)}
          onToggle={() => onChange(value.includes(item.id) ? value.filter(id => id !== item.id) : [...value, item.id])}
        />
      ))}
    </Box>
  );
}
