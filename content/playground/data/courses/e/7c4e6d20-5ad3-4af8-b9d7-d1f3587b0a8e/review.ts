// TODO (BLOCKER): Conduct review. Zero is unreviewed; verify PR, revision and language evidence before Ready/merge.
import type { Review } from '@svitlo/engine/build';

export const courseReview = {
  ai: { locales: 0 },
  human: { acceptance: 0, locales: {} },
} satisfies Review;
