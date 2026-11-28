'use client';

import { Stack } from '@mui/material';

import type { QuestionViewProps } from '../../../../questionPresentation';

import type { UiKitMessages } from '#types/uiKitMessages';

import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionChoice } from '../response/QuestionChoice';
import { questionLabel } from '../response/QuestionContent';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';

export function SelectMultipleAnswers({
  response,
  sceneRegistry,
  messages,
}: {
  response: Extract<QuestionViewProps, { type: 'selectMultipleAnswers' }>;
  sceneRegistry?: SceneRegistry;
  messages: UiKitMessages;
}) {
  const options = [
    ...response.content.answers.correct.map(block => ({
      id: 'correct:' + block.id,
      block,
      correct: true,
    })),
    ...response.content.answers.incorrect.map(block => ({
      id: 'incorrect:' + block.id,
      block,
      correct: false,
    })),
    ...response.content.answers.distractors.map(block => ({
      id: 'distractor:' + block.id,
      block,
      correct: false,
    })),
  ];
  const correct = options.filter(option => option.correct).map(option => option.id);
  const attempt = useQuestionAttempt<string[]>(
    () => [],
    value => value.length === correct.length && correct.every(id => value.includes(id)),
    value => value.length > 0,
  );
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} messages={messages} attempt={attempt}>
      <Stack spacing={1} role="group" aria-label={questionLabel(response.content.question) || response.id}>
        {options.map(option => {
          const selected = attempt.value.includes(option.id);
          const feedback = attempt.checked
            ? option.correct
              ? selected
                ? 'correct'
                : 'missed'
              : selected
                ? 'incorrect'
                : undefined
            : undefined;
          return (
            <QuestionChoice
              key={option.id}
              block={option.block}
              sceneRegistry={sceneRegistry}
              messages={messages}
              selected={selected}
              disabled={attempt.checked}
              feedback={feedback}
              onToggle={() =>
                attempt.setValue(
                  selected ? attempt.value.filter(id => id !== option.id) : [...attempt.value, option.id],
                )
              }
            />
          );
        })}
      </Stack>
    </QuestionFrame>
  );
}
