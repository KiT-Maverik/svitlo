import type { AssessmentWorkflowSeed } from '@svitlo/engine/build';
// TODO (BLOCKER): Complete the separately authorized Assessment Stage 1 and Stage 2, obtain independent review, then replace this typed seed with the reviewed Assessment source and delete this marker.
export default {
  "config": {
    "id": "742d5112-2221-520d-a348-3f987d4d25dc",
    "type": "assessment",
    "slug": "finalCourseReview",
    "locale": {
      "title": {
        "en": "Light and shapes — final course review"
      }
    }
  },
  "production": {
    "purpose": "Independently assess the two Course outcomes through a final cross-Lesson evaluation. Real Questions, Quiz and human review are deferred to the Assessment workflow; do not invent completed resources in Course Stage 5.",
    "lessonDependencies": [
      "lightBasics",
      "familiarCircles/circleRecognition",
      "exhibitionPractice/combinedObservations/combinedPractice"
    ],
    "reviewedCourseSourceBlobSha": "0d3b76ec3edcdcebe617de14c2e9b897cd1ad929",
    "languages": {
      "document": "en",
      "planned": [
        "en",
        "uk"
      ]
    }
  }
} satisfies AssessmentWorkflowSeed;
