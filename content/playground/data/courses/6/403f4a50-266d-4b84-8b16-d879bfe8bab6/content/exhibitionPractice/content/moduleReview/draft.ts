import type { AssessmentWorkflowSeed } from '@svitlo/engine/build';
// TODO (BLOCKER): Complete the separately authorized Assessment Stage 1 and Stage 2, obtain independent review, then replace this typed seed with the reviewed Assessment source and delete this marker.
export const assessmentSeed = {
  "config": {
    "id": "7da9f9a0-3108-5fff-b670-2fe6cac2cb6d",
    "type": "assessment",
    "slug": "moduleReview",
    "locale": {
      "title": "Exhibition practice — module review"
    }
  },
  "production": {
    "purpose": "Evaluate the two previously practised light and shape Skills in a fresh context, using independently reviewed Lesson-owned Question Banks and a separately authorized Assessment Quiz.",
    "lessonDependencies": [
      "content/exhibitionPractice/shadowPractice",
      "content/exhibitionPractice/combinedObservations/combinedPractice"
    ],
    "placement": {
      "courseId": "403f4a50-266d-4b84-8b16-d879bfe8bab6",
      "path": "content/exhibitionPractice/content/moduleReview",
      "orderPath": [
        3,
        3
      ],
      "reviewedCourseSourceBlobSha": "bc193472cad3a063102468db4ba56e50f20a6bdd"
    },
    "languages": {
      "document": "en",
      "planned": [
        "en",
        "uk"
      ]
    }
  }
} as const satisfies AssessmentWorkflowSeed;
