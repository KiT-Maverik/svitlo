import {defineCheckpointItem} from '@svitlo/engine/build';

import type { EqualsMeansSameValue_Lesson_Languages } from '../../../../constants';
import { checkpointQuestion } from './question';
import { checkpointAnswer } from './answer';

export const compareFive = defineCheckpointItem<'compareFive', { checkpointAnswer: typeof checkpointAnswer }, typeof checkpointQuestion, EqualsMeansSameValue_Lesson_Languages>({
  id: 'd86558c2-696f-49af-8daa-e0ba71d49834',
  slug: 'compareFive',
  type: 'checkpointItem',
  question: checkpointQuestion,
  answer: {
    items: { checkpointAnswer },
    order: ['checkpointAnswer'],
  },
});
