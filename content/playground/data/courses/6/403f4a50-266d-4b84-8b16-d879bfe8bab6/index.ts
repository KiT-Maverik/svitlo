// TODO (BLOCKER): Course Stage 5 source is not publication approval. Complete and verify independent Lesson, Episode, Assessment, localization, resource, editorial-review and human QA gates, then remove this marker before release.
// Reviewed Course source blob: e604a4ceefea2c67e2a37d1bf709c97ab3a77d7f
import { defineCourse } from '@svitlo/engine/build';
import { languages, type Languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
import { testExplainLightTravel } from "#skillsData/testLight/testLightPropagation/testExplainLightTravel";
import { testRecognizeCircle } from "#skillsData/testShapes/testRoundShapes/testRecognizeCircle";
// TODO (BLOCKER): Keep this pending episode stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { openingMission } from "./openingMission/stub";
import { howLightMoves } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
import { familiarCircles } from "./familiarCircles";
import { exhibitionPractice } from "./exhibitionPractice";
// TODO (BLOCKER): Keep this pending assessment stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { finalCourseReview } from "./finalCourseReview/stub";

const content = { items: { openingMission, "lightBasics": howLightMoves, familiarCircles, exhibitionPractice, finalCourseReview }, order: ["openingMission","lightBasics","familiarCircles","exhibitionPractice","finalCourseReview"] };

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
  params: { "outcomes": { "skills": [testExplainLightTravel.id, testRecognizeCircle.id] }, "age": {"min":12,"max":16}, "prerequisites": { "skills": [] }, languages, },
  content,
});
