import {defineCheckpointItem, defineText} from '@svitlo/engine/build';
import type { EqualsMeansSameValue_Lesson_Languages } from '../../../constants';
import { checkpointQuestion } from '../text/checkpointQuestion';
import { checkpointAnswer } from '../text/checkpointAnswer';

export const compareFive = defineCheckpointItem<'compareFive', { checkpointAnswer: typeof checkpointAnswer }, typeof checkpointQuestion, EqualsMeansSameValue_Lesson_Languages>({
  id: 'd86558c2-696f-49af-8daa-e0ba71d49834',
  slug: 'compareFive',
  type: 'checkpointItem',
  question: defineText<'checkpointQuestion', EqualsMeansSameValue_Lesson_Languages>({
    id: '8ebbcfe1-af98-4f7b-9106-b681efb6fe08',
    slug: 'checkpointQuestion',
    type: 'text',
    params: {},
    locale: { value: { en: 'Do 3 + 2 and 5 have the same value?' } },
  }),
  answer: {
    items: { checkpointAnswer: defineText<'checkpointAnswer', EqualsMeansSameValue_Lesson_Languages>({
        id: 'e6eedae0-25de-452a-860a-1efc46d56bc4',
        slug: 'checkpointAnswer',
        type: 'text',
        params: {},
        locale: { value: { en: 'Yes. Both sides equal 5.' } },
      })},
    order: ['checkpointAnswer'],
  },
});
