// TODO (BLOCKER): Author and independently review the Episode Stage 1 scenario before materializing the completed Episode; remove this draft blocker only after the approved handoff is consumed.
import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';

export const episodeStage1 = {
  "config": {
    "type": "episode",
    "id": "de9bd378-90aa-5486-b2a0-0c6001860a94",
    "slug": "openingMission"
  },
  "production": {
    "focus": "A visitor to a small exhibition needs help interpreting a lamp, an object and its shadow.",
    "purpose": "Introduce the Course-specific mission and connect the subsequent standalone learning activities.",
    "languages": {
      "document": "en",
      "planned": [
        "en",
        "uk"
      ]
    }
  }
} as const satisfies EpisodeWorkflowStage1Handoff;
