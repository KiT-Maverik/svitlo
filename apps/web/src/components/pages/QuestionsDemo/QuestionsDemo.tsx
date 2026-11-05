'use client';

import { Stack, Typography } from '@mui/material';
import type { Question, Locale_Languages } from '@svitlo/engine/content';
import { QuestionRenderer } from '@svitlo/ui-kit/questions';
import type { UiKit_Global } from '@svitlo/ui-kit';

export function QuestionsDemo({
  questions,
  messages,
}: {
  questions: readonly Question<'response', Locale_Languages>[];
  messages: UiKit_Global<'response'>;
}) {
  return (
    <Stack spacing={3}>
      <Typography component="h1" variant="h4">
        Інтерактивні запитання
      </Typography>
      <Typography color="text.secondary">
        Приклади всіх типів запитань, сформовані за контрактами на сервері.
      </Typography>
      <QuestionRenderer messages={messages} questions={questions} language="uk" />
    </Stack>
  );
}
