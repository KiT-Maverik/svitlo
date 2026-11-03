import type { ReviewCatalog } from '@svitlo/engine/content';
import type { howLightMoves_Questions } from './index';

export const howLightMovesQuestionsReview = {} satisfies ReviewCatalog<
  keyof typeof howLightMoves_Questions.selectOneAnswer
>;
