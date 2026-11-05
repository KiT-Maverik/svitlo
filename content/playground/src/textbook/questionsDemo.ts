import type { Question, Locale_Languages } from '@svitlo/engine/content';

// Playground-owned interactive question examples; no authored questions live in apps/web.
const text = (id: string, value: string) => ({ id, type: 'text' as const, value });
const base = (id: string, prompt: string) => ({
  id,
  assessmentMethod: 'retrieval' as const,
  restrictions: [],
  question: [text(id + '-prompt', prompt)] as [ReturnType<typeof text>],
});

export const questionsDemo: Question<'response', Locale_Languages>[] = [
  {
    ...base('one', 'Яка планета найближча до Сонця?'),
    type: 'selectOneAnswer',
    answers: {
      correct: { mercury: text('mercury', 'Меркурій') },
      incorrect: { earth: text('earth', 'Земля') },
      distractors: { mars: text('mars', 'Марс') },
    },
    hint: [text('one-hint', 'Вона розташована перед Венерою.')],
    explanation: [text('one-explanation', 'Меркурій — перша планета від Сонця.')],
  },
  {
    ...base('multiple', 'Оберіть усі прості числа.'),
    type: 'selectMultipleAnswers',
    answers: {
      correct: { two: text('two', '2'), five: text('five', '5') },
      incorrect: { four: text('four', '4') },
      distractors: { six: text('six', '6') },
    },
  },
  {
    ...base('matching', 'Зіставте тварин із їхнім середовищем.'),
    type: 'matchBlocks',
    pairs: {
      fish: { left: text('fish', 'Риба'), right: text('water', 'Вода') },
      bird: { left: text('bird', 'Птах'), right: text('air', 'Повітря') },
    },
  },
  {
    ...base('text', 'Назвіть столицю України.'),
    type: 'answerWithText',
    correctAnswers: ['Київ'],
    placeholder: 'Назва міста',
  },
  {
    ...base('number', 'Скільки буде 6 × 7?'),
    type: 'answerWithNumber',
    correctAnswers: [42],
    placeholder: 'Введіть число',
  },
  {
    ...base('order', 'Розташуйте числа за зростанням.'),
    type: 'orderSequence',
    sequence: [text('one-item', '1'), text('two-item', '2'), text('three-item', '3')],
  },
  {
    ...base('builder', 'Складіть фразу «Я вчуся».'),
    type: 'buildAnswerWithBlocks',
    correctSequence: [text('i', 'Я'), text('learn', 'вчуся')],
    distractors: [text('not', 'не')],
    placeholder: 'Складіть відповідь',
  },
  {
    ...base('block-blanks', 'Вставте правильні відповіді в пропуски.'),
    type: 'fillBlanksWithBlocks',
    slots: [
      { selector: 'sky', correctAnswer: text('blue', 'Блакитне') },
      { selector: 'grass', correctAnswer: text('green', 'Зелена') },
    ],
    distractors: [text('red', 'Червоне')],
    placeholder: 'Оберіть блок',
  },
  {
    ...base('text-blanks', 'Доповніть пропущені слова.'),
    type: 'fillBlanksWithText',
    slots: [
      { selector: 'planet', correctAnswers: ['Земля'] },
      { selector: 'satellite', correctAnswers: ['Місяць'] },
    ],
    placeholder: 'Введіть слово',
  },
];
