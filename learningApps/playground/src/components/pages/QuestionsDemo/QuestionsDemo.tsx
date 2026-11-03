'use client';

import { Stack, Typography } from '@mui/material';
import type { Question } from '@svitlo/engine/content';
import { QuestionRenderer } from '@svitlo/ui-kit/questions';

export function QuestionsDemo({ questions }: { questions: readonly Question<'response'>[] }) {
  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">Інтерактивні запитання</Typography>
      <Typography color="text.secondary">
        Приклади всіх типів запитань, сформовані за контрактами на сервері.
      </Typography>
      <QuestionRenderer questions={questions} />
    </Stack>
  );
}
