import type { ReviewCatalog } from '@svitlo/engine/content';
import type { howLightMoves_Questions } from './index.data';

export const howLightMovesQuestionsReview = {} satisfies ReviewCatalog<
  keyof typeof howLightMoves_Questions.selectOneAnswer
>;
