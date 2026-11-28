'use client';

import { Stack } from '@mui/material';
import { useContext } from 'react';

import type { QuestionViewProps } from '../../../../questionPresentation';

import type { UiKitMessages } from '#types/uiKitMessages';

import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionChoice } from '../response/QuestionChoice';
import { QuestionCompletionContext } from '../response/QuestionCompletion';
import { questionLabel } from '../response/QuestionContent';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';

export function SelectOneAnswer({
  response,
  sceneRegistry,
  messages,
}: {
  response: Extract<QuestionViewProps, { type: 'selectOneAnswer' }>;
  sceneRegistry?: SceneRegistry;
  messages: UiKitMessages;
}) {
  const completion = useContext(QuestionCompletionContext);
  const optionsUnordered = [
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
