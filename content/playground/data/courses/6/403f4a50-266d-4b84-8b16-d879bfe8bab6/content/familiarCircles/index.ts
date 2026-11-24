import { defineChapter } from '@svitlo/engine/build';
import type { SupportedLanguages } from '@svitlo/engine/build';


const languages = ["en"] as const satisfies SupportedLanguages;
const content = { items: {  }, order: [] };

// TODO (BLOCKER): Restore reviewed languages: ["en","uk"]
// TODO (BLOCKER): New Lesson Stage 1 handoffs are not completed Lesson Configurators. Do not publish.
// Reviewed original content order: ["circleMission","circleRecognition"]
// Pending handoffs: [{"slug":"circleRecognition","lessonId":"80da2dce-ec2f-5f56-b624-bb7f2a80894d","handoffPath":"content/playground/data/lessons/d/80da2dce-ec2f-5f56-b624-bb7f2a80894d/draft.ts"}]
// TODO (BLOCKER): Episode Stage 1 handoffs are not completed Episode Configurators. Do not publish.
// Reviewed original content order: ["circleMission","circleRecognition"]
// Pending Episode handoffs: [{"path":"content/familiarCircles/circleMission","slug":"circleMission","episodeId":"2b49430a-9d50-5494-8989-bf0efb6aba05","handoffPath":"content/familiarCircles/circleMission/draft.ts","orderIndex":0}]
export const familiarCircles = defineChapter<"familiarCircles", typeof content.items, typeof languages>({
  "type": "chapter",
  "slug": "familiarCircles",
  "locale": {
  "title": "Familiar circles"
},
  "id": "5ab01501-54b6-5ddb-9b3f-d805bcf28789",
  params: {  },
  content,
});
