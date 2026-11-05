import type { UiKit_Component } from '@svitlo/contracts/ui-kit';
export const data = {
  en: { check: 'Check', retry: 'Try again', hint: 'Hint', explanation: 'Explanation',
    correct: 'Correct!', incorrect: 'Not quite. Try again.', answerLabel: 'Your answer' },
  uk: { check: 'Перевірити', retry: 'Спробувати ще раз', hint: 'Підказка', explanation: 'Пояснення',
    correct: 'Правильно!', incorrect: 'Неправильно. Спробуйте ще раз.', answerLabel: 'Ваша відповідь' },
} satisfies UiKit_Component<'questionFrame','data','en'|'uk'>;
