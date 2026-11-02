import type { ReviewCatalog } from '@svitlo/engine/content';
import type { howLightMovesQuestionsData } from './index.data';

export const howLightMovesQuestionsReview = {} satisfies ReviewCatalog<
  keyof typeof howLightMovesQuestionsData.selectOneAnswer
>;
