'use client';

import { useContext, useId, useState, type ReactNode } from 'react';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import type { Question } from '@svitlo/engine/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionContent } from './QuestionContent';
import { QuestionCompletionContext } from './QuestionCompletion';

export type QuestionResponse = Question<'response'>;

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

const copy = {
  en: { check: 'Check', retry: 'Try again', hint: 'Hint', explanation: 'Explanation',
    correct: 'Correct!', incorrect: 'Not quite. Try again.' },
  uk: { check: 'Перевірити', retry: 'Спробувати ще раз', hint: 'Підказка', explanation: 'Пояснення',
    correct: 'Правильно!', incorrect: 'Неправильно. Спробуйте ще раз.' },
};

export function QuestionFrame<Value>({
  response,
  sceneRegistry,
  attempt,
  children,
}: {
  response: QuestionResponse;
  sceneRegistry?: SceneRegistry;
  attempt: QuestionAttemptState<Value>;
  children: ReactNode;
}) {
  const headingId = useId();
  const completion = useContext(QuestionCompletionContext);
  const trackingId = response.type + ':' + response.id;
  const lang = response.locale.code;
  const t = lang === 'uk' ? copy.uk : copy.en;
  return (
    <Paper
      component="section"
      variant="outlined"
      aria-labelledby={headingId}
      lang={lang}
      sx={{ p: { xs: 2, sm: 3 }, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <Box id={headingId} role="heading" aria-level={2} sx={{ typography: 'h6', textAlign: 'center' }}>
        <QuestionContent blocks={response.question} sceneRegistry={sceneRegistry} />
      </Box>
      {response.hint?.length ? (
        <Box component="details">
          <Box component="summary" sx={{ cursor: 'pointer' }}>{t.hint}</Box>
          <QuestionContent blocks={response.hint} sceneRegistry={sceneRegistry} />
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
          <QuestionContent blocks={response.explanation} sceneRegistry={sceneRegistry} />
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
