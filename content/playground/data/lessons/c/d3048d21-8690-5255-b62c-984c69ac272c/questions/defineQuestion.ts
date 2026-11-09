import type { Question_SelectOneAnswer } from '@svitlo/contracts/content';
import type { HowLightMoves_Languages } from '../constants';

/** Preserve authored question literals while checking the canonical Contracts shape. */
export function defineQuestion<const Q extends Question_SelectOneAnswer<'data', HowLightMoves_Languages>>(
  question: Q,
): Q {
  return question;
}
