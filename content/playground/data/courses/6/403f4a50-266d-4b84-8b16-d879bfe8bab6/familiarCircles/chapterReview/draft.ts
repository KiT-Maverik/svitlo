import type { AssessmentWorkflowSeed } from '@svitlo/engine/build';
// TODO (BLOCKER): Complete the separately authorized Assessment Stage 1 and Stage 2, obtain independent review, then replace this typed seed with the reviewed Assessment source and delete this marker.
export default {
  "config": {
    "id": "a5311be6-b3b3-51de-b9ec-3e32d287a65a",
    "type": "assessment",
    "slug": "chapterReview",
    "locale": {
      "title": {
        "en": "Recognizing circles — chapter review"
      }
    }
  },
  "production": {
    "purpose": "Check independent transfer of circle recognition after the Chapter Lesson, with genuine reviewed Questions selected only during the Assessment workflow. Keep this Course fixture assessment blocked until its upstream Lesson Bank is available.",
    "lessonDependencies": [
      "familiarCircles/circleRecognition"
    ],
    "reviewedCourseSourceBlobSha": "ae98d5261fc762ac49052fc997febb4d8d3694f2",
    "languages": {
      "document": "en",
      "planned": [
        "en",
        "uk"
      ]
    }
  }
} satisfies AssessmentWorkflowSeed;
