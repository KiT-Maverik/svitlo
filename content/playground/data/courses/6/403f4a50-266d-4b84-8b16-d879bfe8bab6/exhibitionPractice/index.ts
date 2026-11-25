import { defineModule } from '@svitlo/engine/build';
import type { Languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
import { testExplainLightTravel } from "#skillsData/testLight/testLightPropagation/testExplainLightTravel";
import { testRecognizeCircle } from "#skillsData/testShapes/testRoundShapes/testRecognizeCircle";
// TODO (BLOCKER): Keep this pending episode stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { stub as child_practiceMission } from "./practiceMission/stub";
import { shadowPractice as child_shadowPractice } from "./shadowPractice";
import { combinedObservations as child_combinedObservations } from "./combinedObservations";
// TODO (BLOCKER): Keep this pending assessment stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { stub as child_moduleReview } from "./moduleReview/stub";

const content = { items: { "practiceMission": child_practiceMission, "shadowPractice": child_shadowPractice, "combinedObservations": child_combinedObservations, "moduleReview": child_moduleReview }, order: ["practiceMission","shadowPractice","combinedObservations","moduleReview"] };

export const exhibitionPractice = defineModule<"exhibitionPractice", typeof content.items, Languages>({
  "type": "module",
  "slug": "exhibitionPractice",
  "locale": {
  "title": {
    "en": "Exhibition practice"
  }
},
  "id": "3398626f-aa6f-5f8a-a18d-e8259c979252",
  params: { "outcomes": { "skills": [testExplainLightTravel.id, testRecognizeCircle.id] }, "prerequisites": { "skills": [testExplainLightTravel.id, testRecognizeCircle.id] }, },
  content,
});
