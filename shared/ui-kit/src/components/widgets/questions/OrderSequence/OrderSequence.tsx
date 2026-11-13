'use client';

import type { UiKitMessages } from '#types/uiKitMessages';
import type { Question_OrderSequence_Props } from '@svitlo/engine/runtime';
import type { SceneRegistry } from '../../ContentBlockRenderer';
import { QuestionFrame, useQuestionAttempt } from '../response/QuestionFrame';
import { type QuestionItem, shuffleItems } from '../response/QuestionContent';
import { QuestionSortable } from '../response/QuestionSortable';

export function OrderSequence({
  response,
  sceneRegistry,
  messages,
}: {
  response: Question_OrderSequence_Props;
  sceneRegistry?: SceneRegistry;
  messages: UiKitMessages;
}) {
  const items: QuestionItem[] = response.content.sequence.map((block, index) => ({ id: index + ':' + block.id, block }));
  const expected = items.map(item => item.id);
  const initial = () => shuffleItems(items, response.id).map(item => item.id);
  const attempt = useQuestionAttempt<string[]>(
    initial,
    value => value.length === expected.length && expected.every((id, index) => value[index] === id),
    value => value.length === expected.length,
  );
  return (
    <QuestionFrame response={response} sceneRegistry={sceneRegistry} messages={messages} attempt={attempt}>
      <QuestionSortable
        items={items}
        order={attempt.value}
        onChange={attempt.setValue}
        locked={attempt.checked}
        sceneRegistry={sceneRegistry}
        messages={messages}
      />
    </QuestionFrame>
  );
}
