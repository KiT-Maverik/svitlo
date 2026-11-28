'use client';

import { TextField } from '@mui/material';

import type { QuestionViewProps } from '../../../../questionPresentation';

import type { UiKitMessages } from '#types/uiKitMessages';

import type { SceneRegistry } from '../../ContentBlockRenderer';
import { normalizedAnswer } from '../response/QuestionContent';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';

export function AnswerWithText({
  response,
  sceneRegistry,
  messages,
}: {
  response: Extract<QuestionViewProps, { type: 'answerWithText' }>;
  sceneRegistry?: SceneRegistry;
  messages: UiKitMessages;
}) {
  const attempt = useQuestionAttempt(
    () => '',
    value => response.locale.correctAnswers.some(correct => normalizedAnswer(correct) === normalizedAnswer(value)),
    value => value.trim().length > 0,
  );
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} messages={messages} attempt={attempt}>
      <TextField
        fullWidth
        label={messages.questionFrame.answerLabel}
        placeholder={response.locale.placeholder}
        value={attempt.value}
        onChange={event => attempt.setValue(event.target.value)}
        disabled={attempt.checked}
        error={attempt.checked && !attempt.correct}
        color={attempt.checked && attempt.correct ? 'success' : 'primary'}
        sx={{ display: 'block', maxWidth: 480, mx: 'auto' }}
      />
    </QuestionFrame>
  );
}
