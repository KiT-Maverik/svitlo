'use client';
import { Stack, TextField } from '@mui/material';
import type { Question_FillBlanksWithText, Locale_Languages } from '@svitlo/engine/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import type { UiKit_Global } from '@svitlo/contracts/ui-kit';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { normalizedAnswer } from '../response/QuestionContent';

export function FillBlanksWithText({ response, sceneRegistry, messages }: {
  response: Question_FillBlanksWithText<'response', Locale_Languages>;
  sceneRegistry?: SceneRegistry;
  messages: UiKit_Global<'response'>;
}) {
  const attempt = useQuestionAttempt<Record<string, string>>(
    () => ({}),
    value => response.slots.every(slot => slot.correctAnswers.some(correct =>
      normalizedAnswer(correct) === normalizedAnswer(value[slot.selector] ?? ''))),
    value => response.slots.length > 0 && response.slots.every(slot => (value[slot.selector] ?? '').trim().length > 0),
  );
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} messages={messages} attempt={attempt}>
      <Stack spacing={2} role="group">
        {response.slots.map(slot => {
          const value = attempt.value[slot.selector] ?? '';
          const correct = slot.correctAnswers.some(answer => normalizedAnswer(answer) === normalizedAnswer(value));
          return <TextField key={slot.selector} label={slot.selector}
            placeholder={response.placeholder} value={value} fullWidth
            onChange={event => attempt.setValue({ ...attempt.value, [slot.selector]: event.target.value })}
            disabled={attempt.checked} error={attempt.checked && !correct}
            color={attempt.checked && correct ? 'success' : 'primary'}
            sx={{ maxWidth: 540, mx: 'auto' }} />;
        })}
      </Stack>
    </QuestionFrame>
  );
}
