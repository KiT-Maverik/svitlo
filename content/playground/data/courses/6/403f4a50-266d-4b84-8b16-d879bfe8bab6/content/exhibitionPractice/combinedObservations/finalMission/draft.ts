// TODO (BLOCKER): Author and independently review the Episode Stage 1 scenario before materializing the completed Episode; remove this draft blocker only after the approved handoff is consumed.
import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';

export const episodeStage1 = {
  "config": {
    "type": "episode",
    "id": "e12cc072-47dd-5d5e-82d5-65211b6f8b4a",
    "slug": "finalMission"
  },
  "production": {
    "focus": "The visitor has one remaining exhibition task involving an opaque object and circular signs.",
    "purpose": "Create a Course-specific transition into the final independent practice without embedding instruction in the story.",
    "languages": {
      "document": "en",
      "planned": [
        "en",
        "uk"
      ]
    }
  }
} as const satisfies EpisodeWorkflowStage1Handoff;
