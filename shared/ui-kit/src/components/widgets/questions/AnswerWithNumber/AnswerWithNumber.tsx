'use client';

import type { UiKitMessages } from '#types/uiKitMessages';
import { TextField } from '@mui/material';
import type { Question_AnswerWithNumber, Locale_Languages } from '@svitlo/contracts/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';

export function parseQuestionNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!/^[+-]?(?:(?:[0-9]+(?:[.,][0-9]*)?)|(?:[.,][0-9]+))(?:e[+-]?[0-9]+)?$/iu.test(trimmed)) return null;
  const number = Number(trimmed.replace(',', '.'));
  return Number.isFinite(number) ? number : null;
}

export function AnswerWithNumber({
  response,
  sceneRegistry,
  messages,
}: {
  response: Question_AnswerWithNumber<'response', Locale_Languages>;
  sceneRegistry?: SceneRegistry;
  messages: UiKitMessages;
}) {
  const attempt = useQuestionAttempt(
    () => '',
    value => {
      const number = parseQuestionNumber(value);
      return number !== null && response.correctAnswers.includes(number);
    },
    value => parseQuestionNumber(value) !== null,
  );
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} messages={messages} attempt={attempt}>
      <TextField
        fullWidth
        label={messages.questionFrame.answerLabel}
        placeholder={response.placeholder}
        value={attempt.value}
        onChange={event => attempt.setValue(event.target.value)}
        disabled={attempt.checked}
        error={attempt.checked && !attempt.correct}
        color={attempt.checked && attempt.correct ? 'success' : 'primary'}
        slotProps={{ htmlInput: { inputMode: 'decimal' } }}
        sx={{ display: 'block', maxWidth: 480, mx: 'auto' }}
      />
    </QuestionFrame>
  );
}
