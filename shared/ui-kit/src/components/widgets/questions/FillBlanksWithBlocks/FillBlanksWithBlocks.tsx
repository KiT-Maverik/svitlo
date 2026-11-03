'use client';

import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import type { Question_FillBlanksWithBlocks } from '@svitlo/engine/content';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionChoice } from '../response/QuestionChoice';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { QuestionContent, type QuestionItem, shuffleItems } from '../response/QuestionContent';

export function FillBlanksWithBlocks({ response, sceneRegistry }: {
  response: Question_FillBlanksWithBlocks<'response'>;
  sceneRegistry?: SceneRegistry;
}) {
  const correct: QuestionItem[] = response.slots.map(slot => ({
    id: 'correct:' + slot.selector, block: slot.correctAnswer,
  }));
  const distractors: QuestionItem[] = response.distractors.map((block, index) => ({
    id: 'distractor:' + index + ':' + block.id, block,
  }));
  const items = shuffleItems([...correct, ...distractors], response.id);
  const attempt = useQuestionAttempt<Record<string, string | null>>(
    () => Object.fromEntries(response.slots.map(slot => [slot.selector, null])),
    value => response.slots.every(slot => value[slot.selector] === 'correct:' + slot.selector),
    value => response.slots.length > 0 && response.slots.every(slot => Boolean(value[slot.selector])),
  );
  const used = new Set(Object.values(attempt.value));
  const nextEmpty = response.slots.find(slot => !attempt.value[slot.selector]);
  const place = (id: string) => {
    if (!nextEmpty || attempt.checked) return;
    attempt.setValue({ ...attempt.value, [nextEmpty.selector]: id });
  };
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} attempt={attempt}>
      <Stack spacing={2}>
        <Stack direction="row" useFlexGap gap={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
          role="group" aria-label={response.locale.code === 'uk' ? 'Пропуски' : 'Blanks'}>
          {response.slots.map(slot => {
            const selected = items.find(item => item.id === attempt.value[slot.selector]);
            const correctSlot = selected?.id === 'correct:' + slot.selector;
            return (
              <ButtonBase key={slot.selector} component="div" role="button"
                aria-label={slot.selector} disabled={attempt.checked}
                onClick={() => attempt.setValue({ ...attempt.value, [slot.selector]: null })}
                sx={{ display: 'flex', minWidth: 100, minHeight: 50, p: 1,
                  border: '1px dashed', borderRadius: 1,
                  borderColor: attempt.checked ? correctSlot ? 'success.main' : 'error.main' : 'divider',
                  bgcolor: 'background.paper', textAlign: 'center',
                  '&.Mui-disabled': { opacity: 1 } }}>
                {selected ? <QuestionContent blocks={[selected.block]} sceneRegistry={sceneRegistry} /> :
                  <Typography color="text.secondary">{response.placeholder}</Typography>}
              </ButtonBase>
            );
          })}
        </Stack>
        <Box role="group" aria-label={response.locale.code === 'uk' ? 'Доступні блоки' : 'Available blocks'}>
          <Stack spacing={1}>
            {items.filter(item => !used.has(item.id)).map(item => (
              <QuestionChoice key={item.id} block={item.block} selected={false}
                sceneRegistry={sceneRegistry} disabled={attempt.checked || !nextEmpty}
                onToggle={() => place(item.id)} />
            ))}
          </Stack>
        </Box>
      </Stack>
    </QuestionFrame>
  );
}
