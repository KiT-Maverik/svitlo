import type { AssessmentWorkflowSeed } from '@svitlo/engine/build';
// TODO (BLOCKER): Complete production workflow.
export const assessmentSeed = {
  "config": {
    "id": "742d5112-2221-520d-a348-3f987d4d25dc",
    "type": "assessment",
    "slug": "finalCourseReview",
    "locale": {
      "title": "Light and shapes — final course review"
    }
  },
  "production": {
    "purpose": "Independently assess the two Course outcomes through a final cross-Lesson evaluation. Real Questions, Quiz and human review are deferred to the Assessment workflow; do not invent completed resources in Course Stage 5.",
    "lessonDependencies": [
      "content/lightBasics",
      "content/familiarCircles/circleRecognition",
      "content/exhibitionPractice/combinedObservations/combinedPractice"
    ],
    "placement": {
      // agent note: not needed? can be derived from pr
      "courseId": "403f4a50-266d-4b84-8b16-d879bfe8bab6",
      // agent note: not needed? can be derived from pr
      "path": "content/finalCourseReview",
      "orderPath": [
        4
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
