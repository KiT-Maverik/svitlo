import { defineModule, placeLesson } from '@svitlo/engine/build';
import type { Languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
import { testRecognizeCircle as skill_00000000_0000_4000_8000_000000000008 } from "#skillsData/testShapes/testRoundShapes/testRecognizeCircle";
import { testExplainLightTravel as skill_00000000_0000_4000_8000_000000000015 } from "#skillsData/testLight/testLightPropagation/testExplainLightTravel";
// TODO (BLOCKER): Keep this pending episode stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { stub as child_practiceMission } from "./practiceMission/stub";
import { howLightMoves as child_shadowPractice } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
import { combinedObservations as child_combinedObservations } from "./combinedObservations";
// TODO (BLOCKER): Keep this pending assessment stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { stub as child_moduleReview } from "./content/moduleReview/stub";

const content = { items: { "practiceMission": child_practiceMission, "shadowPractice": placeLesson(child_shadowPractice, {"params": {"sections": {"allowSkipping": false}}}), "combinedObservations": child_combinedObservations, "moduleReview": child_moduleReview }, order: ["practiceMission","shadowPractice","combinedObservations","moduleReview"] };

export const exhibitionPractice = defineModule<"exhibitionPractice", typeof content.items, Languages>({
  "type": "module",
  "slug": "exhibitionPractice",
  "locale": {
  "title": {
    "en": "Exhibition practice"
  }
},
  "id": "3398626f-aa6f-5f8a-a18d-e8259c979252",
  params: { "outcomes": { "skills": [skill_00000000_0000_4000_8000_000000000015.id, skill_00000000_0000_4000_8000_000000000008.id] }, "prerequisites": { "skills": [skill_00000000_0000_4000_8000_000000000015.id, skill_00000000_0000_4000_8000_000000000008.id] }, },
  content,
});
// agent note: content folder is extra
