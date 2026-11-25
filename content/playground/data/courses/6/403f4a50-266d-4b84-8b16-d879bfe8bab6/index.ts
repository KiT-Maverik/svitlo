// TODO (BLOCKER): Course Stage 5 source is not publication approval. Complete and verify independent Lesson, Episode, Assessment, localization, resource, editorial-review and human QA gates, then remove this marker before release.
// Reviewed Course source blob: 0d3b76ec3edcdcebe617de14c2e9b897cd1ad929
import { defineCourse } from '@svitlo/engine/build';
import { languages, type Languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
// agent note: why rename?
import { testRecognizeCircle as skill_00000000_0000_4000_8000_000000000008 } from "#skillsData/testShapes/testRoundShapes/testRecognizeCircle";
import { testExplainLightTravel as skill_00000000_0000_4000_8000_000000000015 } from "#skillsData/testLight/testLightPropagation/testExplainLightTravel";
// TODO (BLOCKER): Keep this pending episode stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { stub as child_openingMission } from "./content/openingMission/stub";
import { howLightMoves as child_lightBasics } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
import { familiarCircles as child_familiarCircles } from "./content/familiarCircles";
import { exhibitionPractice as child_exhibitionPractice } from "./content/exhibitionPractice";
// TODO (BLOCKER): Keep this pending assessment stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { stub as child_finalCourseReview } from "./content/finalCourseReview/stub";

const content = { items: { "openingMission": child_openingMission, "lightBasics": child_lightBasics, "familiarCircles": child_familiarCircles, "exhibitionPractice": child_exhibitionPractice, "finalCourseReview": child_finalCourseReview }, order: ["openingMission","lightBasics","familiarCircles","exhibitionPractice","finalCourseReview"] };

export const lightAndShapes = defineCourse<"lightAndShapes", typeof content.items, Languages>({
  "id": "403f4a50-266d-4b84-8b16-d879bfe8bab6",
  "type": "course",
  "slug": "lightAndShapes",
  "locale": {
  "title": {
    "en": "Light and Shapes"
  },
  "description": {
    "en": "Explore how light travels and recognize circles in everyday objects."
  }
},
  params: { "outcomes": { "skills": [skill_00000000_0000_4000_8000_000000000015.id, skill_00000000_0000_4000_8000_000000000008.id] }, "age": {"min":12,"max":16}, "prerequisites": { "skills": [] }, languages, },
  content,
});
