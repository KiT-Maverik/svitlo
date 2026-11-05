'use client';
import { Stack, Typography } from '@mui/material';
import type { Question_BuildAnswerWithBlocks, Locale_Languages } from '@svitlo/engine/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import type { UiKit_Global } from '@svitlo/engine/content';
import { QuestionChoice } from '../response/QuestionChoice';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { type QuestionItem, shuffleItems } from '../response/QuestionContent';
import { QuestionSortable } from '../response/QuestionSortable';

export function BuildAnswerWithBlocks({ response, sceneRegistry, messages }: {
  response: Question_BuildAnswerWithBlocks<'response', Locale_Languages>;
  sceneRegistry?: SceneRegistry;
  messages: UiKit_Global<'response'>;
}) {
  const correct: QuestionItem[] = response.correctSequence.map((block, index) => ({
    id: 'correct:' + index + ':' + block.id, block,
  }));
  const distractors: QuestionItem[] = response.distractors.map((block, index) => ({
    id: 'distractor:' + index + ':' + block.id, block,
  }));
  const items = shuffleItems([...correct, ...distractors], response.id);
  const expected = correct.map(item => item.id);
  const attempt = useQuestionAttempt<string[]>(
    () => [],
    value => value.length === expected.length && expected.every((id, index) => value[index] === id),
    value => value.length > 0,
  );
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} messages={messages} attempt={attempt}>
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>{response.placeholder}</Typography>
        <QuestionSortable items={items} order={attempt.value} onChange={attempt.setValue}
          locked={attempt.checked} sceneRegistry={sceneRegistry} messages={messages}
          onRemove={id => attempt.setValue(attempt.value.filter(value => value !== id))} />
        <Stack spacing={1} role="group"
          aria-label={messages.questionFrame.availableBlocks}>
          {items.filter(item => !attempt.value.includes(item.id)).map(item => (
            <QuestionChoice key={item.id} block={item.block} selected={false}
              disabled={attempt.checked} sceneRegistry={sceneRegistry} messages={messages}
              onToggle={() => attempt.setValue([...attempt.value, item.id])} />
          ))}
        </Stack>
      </Stack>
    </QuestionFrame>
  );
}
