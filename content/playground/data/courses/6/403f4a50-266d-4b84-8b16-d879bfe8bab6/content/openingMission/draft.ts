// TODO (BLOCKER): Episode Stage 1 handoff; scenario is not yet authored or reviewed.
import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';

// prettier-ignore
export const episodeStage1 = {
  "config": {
    "type": "episode",
    "id": "de9bd378-90aa-5486-b2a0-0c6001860a94",
    "slug": "openingMission"
  },
  "production": {
    "focus": "A visitor to a small exhibition needs help interpreting a lamp, an object and its shadow.",
    "purpose": "Introduce the Course-specific mission and connect the subsequent standalone learning activities.",
    "placement": {
      "courseId": "403f4a50-266d-4b84-8b16-d879bfe8bab6",
      "path": "content/openingMission",
      "orderPath": [
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
