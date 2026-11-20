// TODO (BLOCKER): Conduct review. Zero means unreviewed; replace only after verified review evidence.
import type { Review } from '@svitlo/engine/build';

export const courseReview = {
  ai: { locales: 0 },
  human: { acceptance: 0, locales: {} },
} satisfies Review;
