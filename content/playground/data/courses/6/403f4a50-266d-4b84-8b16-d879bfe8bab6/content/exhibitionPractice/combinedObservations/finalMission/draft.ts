// TODO (BLOCKER): Episode Stage 1 handoff; scenario is not yet authored or reviewed.
import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';

// prettier-ignore
export const episodeStage1 = {
  "config": {
    "type": "episode",
    "id": "e12cc072-47dd-5d5e-82d5-65211b6f8b4a",
    "slug": "finalMission"
  },
  "production": {
    "focus": "The visitor has one remaining exhibition task involving an opaque object and circular signs.",
    "purpose": "Create a Course-specific transition into the final independent practice without embedding instruction in the story.",
    "placement": {
      "courseId": "403f4a50-266d-4b84-8b16-d879bfe8bab6",
      "path": "content/exhibitionPractice/combinedObservations/finalMission",
      "orderPath": [
        3,
        2,
        0
      ],
      "reviewedCourseSourceBlobSha": "7dc225c43fa5b66147cc7123b66ff19188c4b28e"
    },
    "languages": {
      "document": "en",
      "planned": [
        "en",
        "uk"
      ]
    }
  }
} as const satisfies EpisodeWorkflowStage1Handoff;
