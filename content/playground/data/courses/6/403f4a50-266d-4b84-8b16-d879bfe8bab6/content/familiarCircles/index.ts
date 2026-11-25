import { defineChapter } from '@svitlo/engine/build';
import type { Languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
import { testRecognizeCircle as skill_00000000_0000_4000_8000_000000000008 } from "#skillsData/testShapes/testRoundShapes/testRecognizeCircle";
// TODO (BLOCKER): Keep this pending episode stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { stub as child_circleMission } from "./circleMission/stub";
// TODO (BLOCKER): Keep this pending lesson stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { stub as child_circleRecognition } from "./circleRecognition/stub";
// TODO (BLOCKER): Keep this pending assessment stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { stub as child_chapterReview } from "./content/chapterReview/stub";

const content = { items: { "circleMission": child_circleMission, "circleRecognition": child_circleRecognition, "chapterReview": child_chapterReview }, order: ["circleMission","circleRecognition","chapterReview"] };

export const familiarCircles = defineChapter<"familiarCircles", typeof content.items, Languages>({
  "type": "chapter",
  "slug": "familiarCircles",
  "locale": {
  "title": {
    "en": "Familiar circles"
  }
},
  "id": "5ab01501-54b6-5ddb-9b3f-d805bcf28789",
  params: { "outcomes": { "skills": [skill_00000000_0000_4000_8000_000000000008.id] }, "prerequisites": { "skills": [] }, },
  content,
});
