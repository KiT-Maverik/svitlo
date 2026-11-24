import { defineModule } from '@svitlo/engine/build';
import type { SupportedLanguages } from '@svitlo/engine/build';
import { shadowPractice as child_shadowPractice } from "./shadowPractice";
import { combinedObservations as child_combinedObservations } from "./combinedObservations";

const languages = ["en"] as const satisfies SupportedLanguages;
const content = { items: { "shadowPractice": child_shadowPractice, "combinedObservations": child_combinedObservations }, order: ["shadowPractice","combinedObservations"] };

// TODO (BLOCKER): Restore reviewed languages: ["en","uk"]
// TODO (BLOCKER): New Lesson Stage 1 handoffs are not completed Lesson Configurators. Do not publish.
// Reviewed original content order: ["practiceMission","shadowPractice","combinedObservations"]
// Pending handoffs: [{"slug":"combinedPractice","lessonId":"c4295601-dd98-54d3-b100-0e9aa70c0609","handoffPath":"content/playground/data/lessons/9/c4295601-dd98-54d3-b100-0e9aa70c0609/draft.ts"}]
// TODO (BLOCKER): Episode Stage 1 handoffs are not completed Episode Configurators. Do not publish.
// Reviewed original content order: ["practiceMission","shadowPractice","combinedObservations"]
// Pending Episode handoffs: [{"path":"content/exhibitionPractice/practiceMission","slug":"practiceMission","episodeId":"754b3220-8157-595f-84c3-6dd696c999a0","handoffPath":"content/exhibitionPractice/practiceMission/draft.ts","orderIndex":0}]
export const exhibitionPractice = defineModule<"exhibitionPractice", typeof content.items, typeof languages>({
  "type": "module",
  "slug": "exhibitionPractice",
  "locale": {
  "title": "Exhibition practice"
},
  "id": "3398626f-aa6f-5f8a-a18d-e8259c979252",
  params: {  },
  content,
});
