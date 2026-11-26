import type { AssessmentWorkflowSeed } from '@svitlo/engine/build';
// TODO (BLOCKER): Complete the separately authorized Assessment Stage 1 and Stage 2, obtain independent review, then replace this typed seed with the reviewed Assessment source and delete this marker.
export default {
  "config": {
    "id": "7da9f9a0-3108-5fff-b670-2fe6cac2cb6d",
    "type": "assessment",
    "slug": "moduleReview",
    "locale": {
      "title": {
        "en": "Exhibition practice — module review"
      }
    }
  },
  "production": {
    "purpose": "Evaluate the two previously practised light and shape Skills in a fresh context, using independently reviewed Lesson-owned Question Banks and a separately authorized Assessment Quiz.",
    "lessonDependencies": [
      "exhibitionPractice/shadowPractice",
      "exhibitionPractice/combinedObservations/combinedPractice"
    ],
    "reviewedCourseSourceBlobSha": "0fbbe8a7c48e500dd0f5d82043c69f92d2dc4d29",
    "languages": {
      "document": "en",
      "planned": [
        "en",
        "uk"
      ]
    }
  }
} satisfies AssessmentWorkflowSeed;
