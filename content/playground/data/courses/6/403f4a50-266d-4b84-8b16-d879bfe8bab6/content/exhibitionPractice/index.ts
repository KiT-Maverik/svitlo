import { defineModule, placeLesson } from '@svitlo/engine/build';

// agent note: use #couseData import alias
import { languages } from "../../constants";
// agent note: use #couseData import alias. use one instruction
import type { Languages } from "../../constants";
import { howLightMoves as child_shadowPractice } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
import { combinedObservations as child_combinedObservations } from "./combinedObservations";
// TODO (BLOCKER): Use actual episode when implemented.
import {
  practiceMission
} from "./practiceMission/stub";
// TODO (BLOCKER): Use actual assessment when implemented.
import {
  moduleReview
} from "./moduleRewiev/stub";

const content = { items: { practiceMission, "shadowPractice": placeLesson(child_shadowPractice, {
  "params": {
    "sections": {
      "allowSkipping": false
    }
  }
}), "combinedObservations": child_combinedObservations, moduleReview }, order: ["practiceMission","shadowPractice","combinedObservations","moduleReview"] };

export const exhibitionPractice = defineModule<"exhibitionPractice", typeof content.items, Languages>({
  "type": "module",
  "slug": "exhibitionPractice",
  "locale": {
  "title": "Exhibition practice"
},
  "id": "3398626f-aa6f-5f8a-a18d-e8259c979252",
  params: {  },
  content,
});
