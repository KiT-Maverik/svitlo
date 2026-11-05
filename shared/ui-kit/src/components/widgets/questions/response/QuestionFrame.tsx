'use client';

import { useContext, useId, useState, type ReactNode } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import type { Question, Locale_Languages } from '@svitlo/engine/content';
import { useContentLanguage } from '../../ContentBlockRenderer/ContentLanguageContext';
import type { UiKit_Global } from '@svitlo/engine/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionContent } from './QuestionContent';
import { QuestionCompletionContext } from './QuestionCompletion';

export type QuestionResponse = Question<'response', Locale_Languages>;

export function useQuestionAttempt<Value>(
  initial: () => Value,
  evaluate: (value: Value) => boolean,
  complete: (value: Value) => boolean,
) {
  const [value, setValue] = useState<Value>(initial);
  const [checked, setChecked] = useState(false);
  return {
    value,
    setValue,
    checked,
    correct: checked && evaluate(value),
    canCheck: !checked && complete(value),
    check: () => {
      if (!checked && complete(value)) setChecked(true);
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
  messages: UiKit_Global<'response'>;
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
  return (
    <Paper
      component="section"
      variant="outlined"
      aria-labelledby={headingId}
      lang={lang}
      sx={{ p: { xs: 2, sm: 3 }, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box id={headingId} role="heading" aria-level={2} sx={{ typography: 'h6', textAlign: 'center' }}>
        <QuestionContent blocks={response.question} sceneRegistry={sceneRegistry} messages={messages} />
      </Box>
      {response.hint?.length ? (
        <Box component="details">
          <Box component="summary" sx={{ cursor: 'pointer' }}>{t.hint}</Box>
          <QuestionContent blocks={response.hint} sceneRegistry={sceneRegistry} messages={messages} />
        </Box>
      ) : null}
      <Box sx={{ minWidth: 0, width: '100%' }}>{children}</Box>
      {attempt.checked ? (
        <Typography role="status" aria-live="polite" color={attempt.correct ? 'success.main' : 'error.main'}>
          {attempt.correct ? t.correct : t.incorrect}
        </Typography>
      ) : null}
      {attempt.checked && response.explanation?.length ? (
        <Box component="details">
          <Box component="summary" sx={{ cursor: 'pointer' }}>{t.explanation}</Box>
          <QuestionContent blocks={response.explanation} sceneRegistry={sceneRegistry} messages={messages} />
        </Box>
      ) : null}
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        {attempt.checked ? (
          <Button variant="contained" onClick={() => {
            completion.markUnchecked(trackingId);
            attempt.retry();
          }}>{t.retry}</Button>
        ) : (
          <Button variant="contained" disabled={!attempt.canCheck} onClick={() => {
            if (!attempt.canCheck) return;
            attempt.check();
            completion.markChecked(trackingId);
          }}>{t.check}</Button>
        )}
      </Stack>
    </Paper>
  );
}
