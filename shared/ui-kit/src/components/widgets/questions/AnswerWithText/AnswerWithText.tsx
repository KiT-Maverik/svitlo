'use client';
import { TextField } from '@mui/material';
import type { Question_AnswerWithText } from '@svitlo/engine/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { normalizedAnswer } from '../response/QuestionContent';

export function AnswerWithText({ response, sceneRegistry }: {
  response: Question_AnswerWithText<'response'>;
  sceneRegistry?: SceneRegistry;
}) {
  const attempt = useQuestionAttempt(
    () => '',
    value => response.correctAnswers.some(correct => normalizedAnswer(correct) === normalizedAnswer(value)),
    value => value.trim().length > 0,
  );
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} attempt={attempt}>
      <TextField fullWidth label={response.locale.code === 'uk' ? 'Ваша відповідь' : 'Your answer'}
        placeholder={response.placeholder} value={attempt.value}
        onChange={event => attempt.setValue(event.target.value)}
        disabled={attempt.checked} error={attempt.checked && !attempt.correct}
        color={attempt.checked && attempt.correct ? 'success' : 'primary'}
        sx={{ display: 'block', maxWidth: 480, mx: 'auto' }} />
    </QuestionFrame>
  );
}