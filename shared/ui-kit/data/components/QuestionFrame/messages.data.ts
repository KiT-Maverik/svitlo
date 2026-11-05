import type { UiKit_Component } from '@svitlo/engine/content';
export const data = {
  en: { check: 'Check', retry: 'Try again', hint: 'Hint', explanation: 'Explanation',
    correct: 'Correct!', incorrect: 'Not quite. Try again.', answerLabel: 'Your answer',
    matchInstructions: 'Choose an item on the left, then its match on the right.', left: 'Left', right: 'Right',
    availableBlocks: 'Available blocks', blanks: 'Blanks', moveItem: 'Move item', removeItem: 'Remove item' },
  uk: { check: 'Перевірити', retry: 'Спробувати ще раз', hint: 'Підказка', explanation: 'Пояснення',
    correct: 'Правильно!', incorrect: 'Неправильно. Спробуйте ще раз.', answerLabel: 'Ваша відповідь',
    matchInstructions: 'Оберіть елемент ліворуч, потім його пару праворуч.', left: 'Ліворуч', right: 'Праворуч',
    availableBlocks: 'Доступні блоки', blanks: 'Пропуски', moveItem: 'Перемістити елемент', removeItem: 'Видалити елемент' },
} satisfies UiKit_Component<'questionFrame','data','en'|'uk'>;
