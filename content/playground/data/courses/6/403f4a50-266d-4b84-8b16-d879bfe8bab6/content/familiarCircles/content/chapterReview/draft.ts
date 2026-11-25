import type { AssessmentWorkflowSeed } from '@svitlo/engine/build';
// TODO (BLOCKER): Complete the separately authorized Assessment Stage 1 and Stage 2, obtain independent review, then replace this typed seed with the reviewed Assessment source and delete this marker.
export const assessmentSeed = {
  "config": {
    "id": "a5311be6-b3b3-51de-b9ec-3e32d287a65a",
    "type": "assessment",
    "slug": "chapterReview",
    "locale": {
      "title": "Recognizing circles — chapter review"
    }
  },
  "production": {
    "purpose": "Check independent transfer of circle recognition after the Chapter Lesson, with genuine reviewed Questions selected only during the Assessment workflow. Keep this Course fixture assessment blocked until its upstream Lesson Bank is available.",
    "lessonDependencies": [
      "content/familiarCircles/circleRecognition"
    ],
    "placement": {
      "courseId": "403f4a50-266d-4b84-8b16-d879bfe8bab6",
      "path": "content/familiarCircles/content/chapterReview",
      "orderPath": [
        2,
        2
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
