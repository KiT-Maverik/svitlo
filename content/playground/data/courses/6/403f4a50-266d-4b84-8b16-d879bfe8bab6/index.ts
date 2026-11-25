// TODO (BLOCKER): Unblock when all course production stages completed.
import { defineCourse } from '@svitlo/engine/build';
import { languages } from "./constants";
import type { Languages } from "./constants";
import { howLightMoves as child_lightBasics } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
import { familiarCircles as child_familiarCircles } from "./content/familiarCircles";
import { exhibitionPractice as child_exhibitionPractice } from "./content/exhibitionPractice";
// TODO (BLOCKER): Use actual episode when implemented.
import {openingMission} from "./content/openingMission/stub";
// TODO (BLOCKER): Use actual assessment when implemented.
import {finalCourseReview} from "./content/finalCourseReview/stub";

const content = { items: { openingMission, "lightBasics": child_lightBasics, "familiarCircles": child_familiarCircles, "exhibitionPractice": child_exhibitionPractice, finalCourseReview }, order: ["openingMission","lightBasics","familiarCircles","exhibitionPractice","finalCourseReview"] };

export const lightAndShapes = defineCourse<"lightAndShapes", typeof content.items, Languages>({
  "id": "403f4a50-266d-4b84-8b16-d879bfe8bab6",
  "type": "course",
  "slug": "lightAndShapes",
  "locale": {
    // agent question: is it localisation bug? title and desc represented as non translatable strings
  "title": "Light and Shapes",
  "description": "Explore how light travels and recognize circles in everyday objects."
},
  params: { "age": {"min":12,"max":16}, "outcomes": {
      // TODO (BLOCKER): Replace skill id literals with corresponding "skillConfiguratorName.id".
      "skills":["00000000-0000-4000-8000-000000000015","00000000-0000-4000-8000-000000000008"]}, "prerequisites": {"skills":[]}, languages, },
  content,
});
