import { defineSelectOneAnswer, defineText } from '@svitlo/engine/build';

const prompt = defineText({
  id: '00000000-0000-4000-8000-000000000031',
  slug: 'prompt',
  type: 'text',
  params: {},
  locale: { value: { en: 'Which option is correct?', uk: 'Який варіант правильний?' } },
});
const correct = defineText({
  id: '00000000-0000-4000-8000-000000000032',
  slug: 'correct',
  type: 'text',
  params: {},
  locale: { value: { en: 'Correct', uk: 'Правильно' } },
});
const incorrect = defineText({
  id: '00000000-0000-4000-8000-000000000033',
  slug: 'incorrect',
  type: 'text',
  params: {},
  locale: { value: { en: 'Incorrect', uk: 'Неправильно' } },
});

export const sampleQuestion = defineSelectOneAnswer({
  id: '00000000-0000-4000-8000-000000000001',
  slug: 'sampleQuestion',
  type: 'selectOneAnswer',
  params: { assessmentMethod: 'retrieval', restrictions: [] },
  locale: {},
  content: {
    question: { items: { prompt }, order: ['prompt'] },
    answers: {
      correct: { items: { correct }, order: ['correct'] },
      incorrect: { items: { incorrect }, order: ['incorrect'] },
      distractors: { items: {}, order: [] },
    },
  },
});

