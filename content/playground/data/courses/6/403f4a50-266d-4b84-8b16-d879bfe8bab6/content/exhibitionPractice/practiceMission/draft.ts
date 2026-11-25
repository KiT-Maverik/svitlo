// TODO (BLOCKER): Author and independently review the Episode Stage 1 scenario before materializing the completed Episode; remove this draft blocker only after the approved handoff is consumed.
import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';

export default {
  "config": {
    "type": "episode",
    "id": "754b3220-8157-595f-84c3-6dd696c999a0",
    "slug": "practiceMission"
  },
  "production": {
    "focus": "The visitor returns to the exhibition and encounters a different arrangement of light and objects.",
    "purpose": "Introduce the Module as a new narrative situation for applying previously introduced Skills.",
    "languages": {
      "document": "en",
      "planned": [
        "en",
        "uk"
      ]
    }
  }
} satisfies EpisodeWorkflowStage1Handoff;
