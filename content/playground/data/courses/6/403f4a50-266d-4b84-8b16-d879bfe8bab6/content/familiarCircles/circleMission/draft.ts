// TODO (BLOCKER): Author and independently review the Episode Stage 1 scenario before materializing the completed Episode; remove this draft blocker only after the approved handoff is consumed.
import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';

export const episodeStage1 = {
  "config": {
    "type": "episode",
    "id": "2b49430a-9d50-5494-8989-bf0efb6aba05",
    "slug": "circleMission"
  },
  "production": {
    "focus": "The exhibition visitor needs to identify circular signs among different shapes.",
    "purpose": "Provide a local narrative reason for the next independent classification activity.",
    "languages": {
      "document": "en",
      "planned": [
        "en",
        "uk"
      ]
    }
  }
} as const satisfies EpisodeWorkflowStage1Handoff;
