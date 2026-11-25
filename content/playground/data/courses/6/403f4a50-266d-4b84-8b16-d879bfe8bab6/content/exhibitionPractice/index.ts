import { defineModule, defineEpisodeStub, placeLesson, defineAssessmentStub } from '@svitlo/engine/build';
import { languages } from "../../constants";
import type { Languages } from "../../constants";
import { howLightMoves as child_shadowPractice } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
import { combinedObservations as child_combinedObservations } from "./combinedObservations";

const content = { items: { "practiceMission": defineEpisodeStub({ id: "754b3220-8157-595f-84c3-6dd696c999a0", slug: "practiceMission" }), "shadowPractice": placeLesson(child_shadowPractice, {
  "params": {
    "sections": {
      "allowSkipping": false
    }
  }
}), "combinedObservations": child_combinedObservations, "moduleReview": defineAssessmentStub({ id: "7da9f9a0-3108-5fff-b670-2fe6cac2cb6d", slug: "moduleReview" }) }, order: ["practiceMission","shadowPractice","combinedObservations","moduleReview"] };

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
