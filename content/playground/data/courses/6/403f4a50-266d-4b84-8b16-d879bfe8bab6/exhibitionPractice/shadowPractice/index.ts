import { placeLesson } from '@svitlo/engine/build';
import { howLightMoves } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";
import { practice } from "./sections/practice";
import { exhibitionNotes } from "./sections/exhibitionNotes";

// TODO (BLOCKER): Implement and verify the Course-owned resources and overrides for this Lesson placement before removing this marker.
export const shadowPractice = placeLesson(howLightMoves, {"params": {"sections": {"allowSkipping": false}}, "section": {"items": {practice}, "additionalItems": {exhibitionNotes}, "order": ["content", "practice", "quiz", "exhibitionNotes"] as ["content", "practice", "quiz", "exhibitionNotes"]}} satisfies Parameters<typeof howLightMoves.build.overrides>[0]);
