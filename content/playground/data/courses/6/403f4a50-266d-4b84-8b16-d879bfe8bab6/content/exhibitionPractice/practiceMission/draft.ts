// TODO (BLOCKER): Episode Stage 1 handoff; scenario is not yet authored or reviewed.
import type { EpisodeWorkflowStage1Handoff } from '@svitlo/engine/build';

// prettier-ignore
export const episodeStage1 = {
  "config": {
    "type": "episode",
    "id": "754b3220-8157-595f-84c3-6dd696c999a0",
    "slug": "practiceMission"
  },
  "production": {
    "focus": "The visitor returns to the exhibition and encounters a different arrangement of light and objects.",
    "purpose": "Introduce the Module as a new narrative situation for applying previously introduced Skills.",
    "placement": {
      "courseId": "403f4a50-266d-4b84-8b16-d879bfe8bab6",
      "path": "content/exhibitionPractice/practiceMission",
      "orderPath": [
        3,
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
