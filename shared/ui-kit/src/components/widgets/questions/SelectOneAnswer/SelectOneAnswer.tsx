'use client';

import type { UiKitMessages } from '#types/uiKitMessages';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import { QuestionCompletionContext } from '../response/QuestionCompletion';
import type { Question_SelectOneAnswer_Props } from '@svitlo/engine/runtime';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionChoice } from '../response/QuestionChoice';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { questionLabel } from '../response/QuestionContent';

export function SelectOneAnswer({
  response,
  sceneRegistry,
  messages,
}: {
  response: Question_SelectOneAnswer_Props;
  sceneRegistry?: SceneRegistry;
  messages: UiKitMessages;
}) {
  const completion = useContext(QuestionCompletionContext);
  const optionsUnordered = [
    ...Object.entries(response.content.answers.correct).map(([slug, block]) => ({
      id: 'correct:' + slug,
      block,
      correct: true,
    })),
    ...Object.entries(response.content.answers.incorrect).map(([slug, block]) => ({
      id: 'incorrect:' + slug,
      block,
      correct: false,
    })),
    ...Object.entries(response.content.answers.distractors).map(([slug, block]) => ({
      id: 'distractor:' + slug,
      block,
      correct: false,
    })),
  ];
  // The canonical Props contract publishes answer maps without an answerOrder field.
  const options = optionsUnordered;
  const attempt = useQuestionAttempt<string | null>(
    () => null,
    value => options.some(option => option.id === value && option.correct),
    value => value !== null,
  );
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} messages={messages} attempt={attempt}>
      <Stack spacing={1} role="group" aria-label={questionLabel(response.content.question) || response.id}>
        {options.map(option => {
          const selected = attempt.value === option.id;
          const showFeedback =
            !completion.parameters || completion.parameters.feedbackMode === 'immediate' || completion.revealFeedback;
          const feedback =
            attempt.checked && showFeedback
              ? option.correct
                ? selected
                  ? completion.parameters?.interaction.showCorrectAnswers === false
                    ? undefined
                    : 'correct'
                  : completion.parameters?.interaction.showCorrectAnswers === false
                    ? undefined
                    : 'missed'
                : selected
                  ? completion.parameters?.interaction.showErrors === false
                    ? undefined
                    : 'incorrect'
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
              onToggle={() => attempt.setValue(selected ? null : option.id)}
            />
          );
        })}
      </Stack>
    </QuestionFrame>
  );
}
