import { defineCheckpoint } from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';
import { compareFive } from './compareFive';

export const equalityCheckpoint = defineCheckpoint<'equalityCheckpoint', { compareFive: typeof compareFive }, EqualsMeansSameValue_Lesson_Languages>({
  id: 'd225823c-c8bb-4c0d-aa2b-2a430d8b3ae1',
  slug: 'equalityCheckpoint',
  type: 'checkpoint',
  params: {},
  locale: { title: { en: 'Check your understanding' } },
  content: {
    items: { compareFive },
    order: ['compareFive'],
  },
});
