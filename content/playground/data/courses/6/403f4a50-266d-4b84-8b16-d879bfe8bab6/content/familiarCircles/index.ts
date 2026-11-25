import { defineChapter, defineEpisodeStub, defineLessonStub, defineAssessmentStub } from '@svitlo/engine/build';
import { languages } from "../../constants";
import type { Languages } from "../../constants";


const content = { items: { "circleMission": defineEpisodeStub({ id: "2b49430a-9d50-5494-8989-bf0efb6aba05", slug: "circleMission" }), "circleRecognition": defineLessonStub({ id: "80da2dce-ec2f-5f56-b624-bb7f2a80894d", slug: "circleRecognition" }), "chapterReview": defineAssessmentStub({ id: "a5311be6-b3b3-51de-b9ec-3e32d287a65a", slug: "chapterReview" }) }, order: ["circleMission","circleRecognition","chapterReview"] };

export const familiarCircles = defineChapter<"familiarCircles", typeof content.items, Languages>({
  "type": "chapter",
  "slug": "familiarCircles",
  "locale": {
  "title": "Familiar circles"
},
  "id": "5ab01501-54b6-5ddb-9b3f-d805bcf28789",
  params: {  },
  content,
});
