// TODO (BLOCKER): Course Stage 5 source is not publication approval. Complete and verify independent Lesson, Episode, Assessment, localization, resource, editorial-review and human QA gates, then remove this marker before release.
// Reviewed Course source blob: bc193472cad3a063102468db4ba56e50f20a6bdd
import { defineCourse, defineEpisodeStub, defineAssessmentStub } from '@svitlo/engine/build';
import { languages } from "./constants";
import type { Languages } from "./constants";
import { howLightMoves as child_lightBasics } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
import { familiarCircles as child_familiarCircles } from "./content/familiarCircles";
import { exhibitionPractice as child_exhibitionPractice } from "./content/exhibitionPractice";

const content = { items: { "openingMission": defineEpisodeStub({ id: "de9bd378-90aa-5486-b2a0-0c6001860a94", slug: "openingMission" }), "lightBasics": child_lightBasics, "familiarCircles": child_familiarCircles, "exhibitionPractice": child_exhibitionPractice, "finalCourseReview": defineAssessmentStub({ id: "742d5112-2221-520d-a348-3f987d4d25dc", slug: "finalCourseReview" }) }, order: ["openingMission","lightBasics","familiarCircles","exhibitionPractice","finalCourseReview"] };

export const lightAndShapes = defineCourse<"lightAndShapes", typeof content.items, Languages>({
  "id": "403f4a50-266d-4b84-8b16-d879bfe8bab6",
  "type": "course",
  "slug": "lightAndShapes",
  "locale": {
  "title": "Light and Shapes",
  "description": "Explore how light travels and recognize circles in everyday objects."
},
  params: { "age": {"min":12,"max":16}, "outcomes": {"skills":["00000000-0000-4000-8000-000000000015","00000000-0000-4000-8000-000000000008"]}, "prerequisites": {"skills":[]}, languages, },
  content,
});
