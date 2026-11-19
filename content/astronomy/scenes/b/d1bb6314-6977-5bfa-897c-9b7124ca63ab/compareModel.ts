/** The authored options are formative prompts, never graded answers. */
export const comparisonChoices = ['time', 'moon', 'conditions', 'same', 'incorrect', 'other'] as const;
export type ComparisonChoice = (typeof comparisonChoices)[number];
export type ComparisonFeedback = 'valid' | 'same' | 'unknown' | 'retry';

export function comparisonFeedback(choice: ComparisonChoice): ComparisonFeedback {
  if (choice === 'same') return 'same';
  if (choice === 'incorrect') return 'unknown';
  if (choice === 'other') return 'retry'; // Open answers require human self-check.
  return 'valid';
}
