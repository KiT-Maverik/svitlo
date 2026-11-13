'use client';

import type { UiKitMessages } from '#types/uiKitMessages';

import { useContext, useId, useState, type ReactNode } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import type { QuestionResponse } from '#types/questions';
import { useContentLanguage } from '../../ContentBlockRenderer/ContentLanguageContext';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionContent } from './QuestionContent';
import { QuestionCompletionContext } from './QuestionCompletion';

export type { QuestionResponse } from '#types/questions';

export function useQuestionAttempt<Value>(
  initial: () => Value,
  evaluate: (value: Value) => boolean,
  complete: (value: Value) => boolean,
) {
  const [value, setValue] = useState<Value>(initial);
  const [checked, setChecked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  return {
    value,
    setValue,
    checked,
    correct: checked && evaluate(value),
    isCorrect: evaluate(value),
    attempts,
    canCheck: !checked && complete(value),
    check: () => {
      if (!checked && complete(value)) {
        setChecked(true);
        setAttempts(current => current + 1);
      }
    },
    retry: () => {
      setValue(initial());
      setChecked(false);
    },
  };
}

export type QuestionAttemptState<Value> = ReturnType<typeof useQuestionAttempt<Value>>;

export function QuestionFrame<Value>({
  response,
  sceneRegistry,
  attempt,
  children,
  messages,
}: {
  messages: UiKitMessages;
  response: QuestionResponse;
  sceneRegistry?: SceneRegistry;
  attempt: QuestionAttemptState<Value>;
  children: ReactNode;
}) {
  const headingId = useId();
  const completion = useContext(QuestionCompletionContext);
  const trackingId = response.type + ':' + response.id;
  const lang = useContentLanguage();
  const t = messages.questionFrame;
  const settings = completion.parameters;
  const showFeedback = !settings || settings.feedbackMode === 'immediate' || completion.revealFeedback;
  const showStatus =
    showFeedback &&
    (attempt.correct ? (settings?.interaction.showCorrectAnswers ?? true) : (settings?.interaction.showErrors ?? true));
  const canRetry = !settings || (!attempt.correct && attempt.attempts <= settings.interaction.retries);
  return (
    <Paper
      component="section"
      variant="outlined"
      aria-labelledby={headingId}
      lang={lang}
      sx={{ p: { xs: 2, sm: 3 }, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box id={headingId} role="heading" aria-level={2} sx={{ typography: 'h6', textAlign: 'center' }}>
        <QuestionContent blocks={response.content.question} sceneRegistry={sceneRegistry} messages={messages} />
      </Box>
      {response.content.hint?.length ? (
        <Box component="details">
          <Box component="summary" sx={{ cursor: 'pointer' }}>
            {t.hint}
          </Box>
          <QuestionContent blocks={response.content.hint} sceneRegistry={sceneRegistry} messages={messages} />
        </Box>
      ) : null}
      <Box sx={{ minWidth: 0, width: '100%' }}>{children}</Box>
      {attempt.checked && showStatus ? (
        <Typography role="status" aria-live="polite" color={attempt.correct ? 'success.main' : 'error.main'}>
          {attempt.correct ? t.correct : t.incorrect}
        </Typography>
      ) : null}
      {attempt.checked &&
      showFeedback &&
      (settings?.interaction.allowExplanations ?? true) &&
      response.content.explanation?.length ? (
        <Box component="details">
          <Box component="summary" sx={{ cursor: 'pointer' }}>
            {t.explanation}
          </Box>
          <QuestionContent blocks={response.content.explanation} sceneRegistry={sceneRegistry} messages={messages} />
        </Box>
      ) : null}
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        {attempt.checked ? (
          canRetry && !completion.locked ? (
            <Button
              variant="contained"
              onClick={() => {
                completion.markUnchecked(trackingId);
                attempt.retry();
              }}
            >
              {t.retry}
            </Button>
          ) : null
        ) : (
          <Button
            variant="contained"
            disabled={!attempt.canCheck || completion.locked}
            onClick={() => {
              if (!attempt.canCheck) return;
              attempt.check();
              completion.markChecked(trackingId, attempt.isCorrect);
            }}
          >
            {t.check}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
