import { placeLesson } from '@svitlo/engine/build';
import { howLightMoves as originalLesson } from "#lessonsData/c/d3048d21-8690-5255-b62c-984c69ac272c/index";

// TODO (BLOCKER): Implement and verify the Course-owned resources and overrides for this Lesson placement before removing this marker.
export const shadowPractice = placeLesson(originalLesson, {"params": {"sections": {"allowSkipping": false}}});
