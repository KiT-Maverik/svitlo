// TODO (BLOCKER): Episode Stage 1 handoff; scenario is not yet authored or reviewed.
import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';

// prettier-ignore
export const episodeStage1 = {
  "config": {
    "type": "episode",
    "id": "2b49430a-9d50-5494-8989-bf0efb6aba05",
    "slug": "circleMission"
  },
  "production": {
    "focus": "The exhibition visitor needs to identify circular signs among different shapes.",
    "purpose": "Provide a local narrative reason for the next independent classification activity.",
    "placement": {
      "courseId": "403f4a50-266d-4b84-8b16-d879bfe8bab6",
      "path": "content/familiarCircles/circleMission",
      "orderPath": [
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
