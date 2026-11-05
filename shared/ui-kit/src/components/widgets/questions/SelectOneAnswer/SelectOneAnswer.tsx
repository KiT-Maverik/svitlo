'use client';
import { Stack } from '@mui/material';
import type { Question_SelectOneAnswer, Locale_Languages } from '@svitlo/engine/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import type { UiKit_Global } from '@svitlo/engine/content';
import { QuestionChoice } from '../response/QuestionChoice';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { questionLabel } from '../response/QuestionContent';

export function SelectOneAnswer({ response, sceneRegistry, messages }: {
  response: Question_SelectOneAnswer<'response', Locale_Languages>;
  sceneRegistry?: SceneRegistry;
  messages: UiKit_Global<'response'>;
}) {
  const options = [
    ...Object.entries(response.answers.correct).map(([slug, block]) => ({ id: 'correct:' + slug, block, correct: true })),
    ...Object.entries(response.answers.incorrect).map(([slug, block]) => ({ id: 'incorrect:' + slug, block, correct: false })),
    ...Object.entries(response.answers.distractors).map(([slug, block]) => ({ id: 'distractor:' + slug, block, correct: false })),
  ];
  const attempt = useQuestionAttempt<string | null>(
    () => null,
    value => options.some(option => option.id === value && option.correct),
    value => value !== null,
  );
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} messages={messages} attempt={attempt}>
      <Stack spacing={1} role="group" aria-label={questionLabel(response.question) || response.id}>
        {options.map(option => {
          const selected = attempt.value === option.id;
          const feedback = attempt.checked
            ? option.correct ? (selected ? 'correct' : 'missed') : selected ? 'incorrect' : undefined
            : undefined;
          return <QuestionChoice key={option.id} block={option.block} sceneRegistry={sceneRegistry} messages={messages}
            selected={selected} disabled={attempt.checked} feedback={feedback}
            onToggle={() => attempt.setValue(selected ? null : option.id)} />;
        })}
      </Stack>
    </QuestionFrame>
  );
}