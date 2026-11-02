import type { SelectOneAnswerQuestion } from '@svitlo/ui-kit/questions/types';
import type { Quiz } from '@svitlo/engine/content';

/** Adapts localized content instances to the current select-one widget contract. */
export function toQuestionWidgets(quiz: Quiz): SelectOneAnswerQuestion[] {
  return quiz.questionBank.map(question => {
    if (question.type !== 'select-one-answer') throw new Error(`Unsupported question widget: ${question.type}`);
    const correct = question.answers.correct;
    const options = [correct, ...question.answers.incorrect, ...question.answers.distractors].map(contentBlock => {
      if (contentBlock.blockType !== 'text') throw new Error('This question widget requires text answer options');
      return { id: contentBlock.id, label: contentBlock.value };
    });

    // Keep option order stable across renders without storing another question definition.
    let seed = Number.parseInt(question.id.slice(0, 8), 16);
    for (let index = options.length - 1; index > 0; index -= 1) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const target = seed % (index + 1);
      [options[index], options[target]] = [options[target], options[index]];
    }

    return {
      id: question.id,
      type: 'single-select',
      prompt: question.content.map(contentBlock => (contentBlock.blockType === 'text' ? contentBlock.value : '')).join('\n'),
      options,
      correctId: correct.id,
      explanation: question.explanation?.value ?? '',
    };
  });
}
