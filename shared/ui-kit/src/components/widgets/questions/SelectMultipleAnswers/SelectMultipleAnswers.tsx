'use client';
import { Stack } from '@mui/material';
import type { Question_SelectMultipleAnswers } from '@svitlo/engine/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionChoice } from '../response/QuestionChoice';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { questionLabel } from '../response/QuestionContent';

export function SelectMultipleAnswers({ response, sceneRegistry }: {
  response: Question_SelectMultipleAnswers<'response'>;
  sceneRegistry?: SceneRegistry;
}) {
  const options = [
    ...Object.entries(response.answers.correct).map(([slug, block]) => ({ id: 'correct:' + slug, block, correct: true })),
    ...Object.entries(response.answers.incorrect).map(([slug, block]) => ({ id: 'incorrect:' + slug, block, correct: false })),
    ...Object.entries(response.answers.distractors).map(([slug, block]) => ({ id: 'distractor:' + slug, block, correct: false })),
  ];
  const correct = options.filter(option => option.correct).map(option => option.id);
  const attempt = useQuestionAttempt<string[]>(
    () => [],
    value => value.length === correct.length && correct.every(id => value.includes(id)),
    value => value.length > 0,
  );
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} attempt={attempt}>
      <Stack spacing={1} role="group" aria-label={questionLabel(response.question) || response.id}>
        {options.map(option => {
          const selected = attempt.value.includes(option.id);
          const feedback = attempt.checked
            ? option.correct ? (selected ? 'correct' : 'missed') : selected ? 'incorrect' : undefined
            : undefined;
          return <QuestionChoice key={option.id} block={option.block} sceneRegistry={sceneRegistry}
            selected={selected} disabled={attempt.checked} feedback={feedback}
            onToggle={() => attempt.setValue(selected
              ? attempt.value.filter(id => id !== option.id)
              : [...attempt.value, option.id])} />;
        })}
      </Stack>
    </QuestionFrame>
  );
}