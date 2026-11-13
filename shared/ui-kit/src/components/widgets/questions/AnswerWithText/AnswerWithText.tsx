'use client';

import type { UiKitMessages } from '#types/uiKitMessages';
import { TextField } from '@mui/material';
import type { Question_AnswerWithText, Locale_Languages } from '+@svitlo/contracts/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { normalizedAnswer } from '../response/QuestionContent';

export function AnswerWithText({
  response,
  sceneRegistry,
  messages,
}: {
  response: Question_AnswerWithText<'response', Locale_Languages>;
  sceneRegistry?: SceneRegistry;
  messages: UiKitMessages;
}) {
  const attempt = useQuestionAttempt(
    () => '',
    value => response.correctAnswers.some(correct => normalizedAnswer(correct) === normalizedAnswer(value)),
    value => value.trim().length > 0,
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
        sx={{ display: 'block', maxWidth: 480, mx: 'auto' }}
      />
    </QuestionFrame>
  );
}
