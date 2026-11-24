// TODO (BLOCKER): Course Stage 5 source is not publication approval. Verify independent Lesson, Episode, locale, assessment and source-review gates before release.
// Reviewed Course source blob: 7dc225c43fa5b66147cc7123b66ff19188c4b28e
import { defineCourse } from '@svitlo/engine/build';
import type { SupportedLanguages } from '@svitlo/engine/build';
import { lightBasics as child_lightBasics } from "./content/lightBasics";
import { familiarCircles as child_familiarCircles } from "./content/familiarCircles";
import { exhibitionPractice as child_exhibitionPractice } from "./content/exhibitionPractice";

const languages = ["en"] as const satisfies SupportedLanguages;
const content = { items: { "lightBasics": child_lightBasics, "familiarCircles": child_familiarCircles, "exhibitionPractice": child_exhibitionPractice }, order: ["lightBasics","familiarCircles","exhibitionPractice"] };

// TODO (BLOCKER): Restore reviewed languages: ["en","uk"]
// TODO (BLOCKER): New Lesson Stage 1 handoffs are not completed Lesson Configurators. Do not publish.
// Reviewed original content order: ["openingMission","lightBasics","familiarCircles","exhibitionPractice"]
// Pending handoffs: [{"slug":"circleRecognition","lessonId":"80da2dce-ec2f-5f56-b624-bb7f2a80894d","handoffPath":"content/playground/data/lessons/d/80da2dce-ec2f-5f56-b624-bb7f2a80894d/draft.ts"},{"slug":"combinedPractice","lessonId":"c4295601-dd98-54d3-b100-0e9aa70c0609","handoffPath":"content/playground/data/lessons/9/c4295601-dd98-54d3-b100-0e9aa70c0609/draft.ts"}]
// TODO (BLOCKER): Episode Stage 1 handoffs are not completed Episode Configurators. Do not publish.
// Reviewed original content order: ["openingMission","lightBasics","familiarCircles","exhibitionPractice"]
// Pending Episode handoffs: [{"path":"content/openingMission","slug":"openingMission","episodeId":"de9bd378-90aa-5486-b2a0-0c6001860a94","handoffPath":"content/openingMission/draft.ts","orderIndex":0}]
export const lightAndShapes = defineCourse<"lightAndShapes", typeof content.items, typeof languages>({
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

export { authoredCourseOverrides } from './authoredCourseOverrides';
