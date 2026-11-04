'use client';
import { Stack, Typography } from '@mui/material';
import type { Question_BuildAnswerWithBlocks } from '@svitlo/engine/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionChoice } from '../response/QuestionChoice';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { type QuestionItem, shuffleItems } from '../response/QuestionContent';
import { QuestionSortable } from '../response/QuestionSortable';

export function BuildAnswerWithBlocks({ response, sceneRegistry }: {
  response: Question_BuildAnswerWithBlocks<'response'>;
  sceneRegistry?: SceneRegistry;
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
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} attempt={attempt}>
      <Stack spacing={2}>
        <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>{response.placeholder}</Typography>
        <QuestionSortable items={items} order={attempt.value} onChange={attempt.setValue}
          locked={attempt.checked} sceneRegistry={sceneRegistry}
          onRemove={id => attempt.setValue(attempt.value.filter(value => value !== id))} />
        <Stack spacing={1} role="group"
          aria-label={response.locale.code === 'uk' ? 'Доступні блоки' : 'Available blocks'}>
          {items.filter(item => !attempt.value.includes(item.id)).map(item => (
            <QuestionChoice key={item.id} block={item.block} selected={false}
              disabled={attempt.checked} sceneRegistry={sceneRegistry}
              onToggle={() => attempt.setValue([...attempt.value, item.id])} />
          ))}
        </Stack>
      </Stack>
    </QuestionFrame>
  );
}
