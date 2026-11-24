import { defineChapter } from '@svitlo/engine/build';
import type { SupportedLanguages } from '@svitlo/engine/build';


const languages = ["en"] as const satisfies SupportedLanguages;
const content = { items: {  }, order: [] };

// TODO (BLOCKER): Restore reviewed languages: ["en","uk"]
// TODO (BLOCKER): New Lesson Stage 1 handoffs are not completed Lesson Configurators. Do not publish.
// Reviewed original content order: ["finalMission","combinedPractice"]
// Pending handoffs: [{"slug":"combinedPractice","lessonId":"c4295601-dd98-54d3-b100-0e9aa70c0609","handoffPath":"content/playground/data/lessons/9/c4295601-dd98-54d3-b100-0e9aa70c0609/draft.ts"}]
// TODO (BLOCKER): Episode Stage 1 handoffs are not completed Episode Configurators. Do not publish.
// Reviewed original content order: ["finalMission","combinedPractice"]
// Pending Episode handoffs: [{"path":"content/exhibitionPractice/combinedObservations/finalMission","slug":"finalMission","episodeId":"e12cc072-47dd-5d5e-82d5-65211b6f8b4a","handoffPath":"content/exhibitionPractice/combinedObservations/finalMission/draft.ts","orderIndex":0}]
export const combinedObservations = defineChapter<"combinedObservations", typeof content.items, typeof languages>({
  "type": "chapter",
  "slug": "combinedObservations",
  "locale": {
  "title": "Combined observations"
},
  "id": "f43a2fe5-049b-50f0-8da5-f5a5c91541d2",
  params: {  },
  content,
});
