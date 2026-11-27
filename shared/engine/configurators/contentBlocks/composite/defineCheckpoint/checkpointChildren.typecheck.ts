import type { SafePlacementMap } from '../../../_shared__configurators';

import { defineText } from '../../primitive/defineText';
import { defineCheckpoint } from './defineCheckpoint';
import { defineCheckpointAnswer } from './defineCheckpointAnswer';
import { defineCheckpointItem } from './defineCheckpointItem';

/** Compile-time contract: direct child keys, language scope and named role invariants. */
function typecheckCheckpointChildren() {
  const scope = { languages: ['uk'] as const };
  const text = defineText<'response', ['uk']>({
    id: 'b775647f-203d-481a-a1c7-4d331c779d01',
    slug: 'response', type: 'text', params: {}, locale: { value: { uk: 'Відповідь' } },
  });
  const question = defineText<'question', ['uk']>({
    id: 'b775647f-203d-481a-a1c7-4d331c779d02',
    slug: 'question', type: 'text', params: {}, locale: { value: { uk: 'Питання?' } },
  });
  const answer = defineCheckpointAnswer<
    'answer', { response: typeof text }, ['uk']
  >({
    id: 'b775647f-203d-481a-a1c7-4d331c779d03',
    slug: 'answer', type: 'checkpointAnswer', children: ['response'], response: text,
  });
  const item = defineCheckpointItem<'first', typeof answer, typeof question, ['uk']>({
    id: 'b775647f-203d-481a-a1c7-4d331c779d04',
    slug: 'first', type: 'checkpointItem', question, answer,
  });
  const checkpoint = defineCheckpoint<
    'review', { first: typeof item }, ['uk']
  >({
    id: 'b775647f-203d-481a-a1c7-4d331c779d05',
    slug: 'review', type: 'checkpoint', params: {},
    locale: { title: { uk: 'Перевірка' } }, children: ['first'], first: item,
  });

  // Direct slug-keyed overrides, without a second content.items/order envelope.
  answer.build.overrides({ response: { locale: { value: { uk: 'Оновлено' } } } }, scope);
  item.build.overrides({ answer: { response: { locale: { value: { uk: 'Знову' } } } } }, scope);
  checkpoint.build.overrides({
    first: { question: { locale: { value: { uk: 'Інше?' } } } },
  }, scope);

  const later = defineText<'later', ['uk']>({
    id: 'b775647f-203d-481a-a1c7-4d331c779d06',
    slug: 'later', type: 'text', params: {}, locale: { value: { uk: 'Далі' } },
  });
  answer.build.overrides({ later, children: ['response', 'later'] }, scope);
  item.build.overrides({ answer: { later, children: ['response', 'later'] } }, scope);

  // @ts-expect-error A Checkpoint's ordered collection cannot contain arbitrary strings.
  checkpoint.build.overrides({ children: ['missing'] }, scope);
  // @ts-expect-error Unknown children cannot be disabled as if they were authored.
  answer.build.overrides({ missing: false }, scope);
  // @ts-expect-error A required Text question cannot be disabled.
  item.build.overrides({ question: { params: { disabled: true } } }, scope);
  // @ts-expect-error Identity is never overridable.
  checkpoint.build.overrides({ id: 'b775647f-203d-481a-a1c7-4d331c779d07' }, scope);
  // @ts-expect-error Reserved keys cannot be used as placement slugs.
  const reserved: SafePlacementMap<{ content: typeof text }> = { content: text };
  void reserved;
}

void typecheckCheckpointChildren;
