'use client';
import { useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import type { Question_MatchBlocks, Locale_Languages } from '@svitlo/engine/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import type { UiKit_Global } from '@svitlo/contracts/ui-kit';
import { QuestionChoice } from '../response/QuestionChoice';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { shuffleItems } from '../response/QuestionContent';

export function MatchBlocks({ response, sceneRegistry, messages }: {
  response: Question_MatchBlocks<'response', Locale_Languages>;
  sceneRegistry?: SceneRegistry;
  messages: UiKit_Global<'response'>;
}) {
  const pairs = Object.entries(response.pairs).map(([id, blocks]) => ({ id, ...blocks }));
  const right = shuffleItems(pairs, response.id);
  const [pending, setPending] = useState<string | null>(null);
  const attempt = useQuestionAttempt<Record<string, string>>(
    () => ({}),
    value => pairs.every(pair => value[pair.id] === pair.id),
    value => pairs.length > 0 && pairs.every(pair => Boolean(value[pair.id])),
  );
  const chooseRight = (id: string) => {
    if (pending === null || attempt.checked) return;
    const next = Object.fromEntries(Object.entries(attempt.value).filter(([, value]) => value !== id));
    next[pending] = id;
    attempt.setValue(next);
    setPending(null);
  };
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} messages={messages}
      attempt={{ ...attempt, retry: () => { attempt.retry(); setPending(null); } }}>
      <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
        {messages.questionFrame.matchInstructions}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>
        <Stack spacing={1} role="group" aria-label={messages.questionFrame.left}>
          {pairs.map(pair => {
            const assigned = attempt.value[pair.id];
            const feedback = attempt.checked ? assigned === pair.id ? 'correct' : 'incorrect' : undefined;
            return <QuestionChoice key={pair.id} block={pair.left} sceneRegistry={sceneRegistry} messages={messages}
              selected={pending === pair.id || Boolean(assigned)} disabled={attempt.checked}
              feedback={feedback} onToggle={() => setPending(pending === pair.id ? null : pair.id)} />;
          })}
        </Stack>
        <Stack spacing={1} role="group" aria-label={messages.questionFrame.right}>
          {right.map(pair => {
            const left = Object.keys(attempt.value).find(id => attempt.value[id] === pair.id);
            const feedback = attempt.checked && left ? left === pair.id ? 'correct' : 'incorrect' : undefined;
            return <QuestionChoice key={pair.id} block={pair.right} sceneRegistry={sceneRegistry} messages={messages}
              selected={Boolean(left)} disabled={attempt.checked} feedback={feedback}
              onToggle={() => chooseRight(pair.id)} />;
          })}
        </Stack>
      </Box>
    </QuestionFrame>
  );
}
