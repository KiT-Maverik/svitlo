import { defineScene } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";

// TODO (BLOCKER): Implement and register Scene e6073d92-4b8c-4c6f-8920-6ab25ca9471d before production; Draft Preview may use SceneStub.
export const interactiveSlide = defineScene<"interactiveSlide", typeof languages>(
  {
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca9471d",
  "slug": "interactiveSlide",
  "type": "scene",
  "params": {},
  "locale": {
    "value": {
      "instruction": {
        "en": "Move the lamp or read the equivalent shadow explanation."
      }
    }
  }
},
);
/*
 * TODO (BLOCKER): Remove the temporary Scene specification after this content item is implemented and verified.
 *
 * # specification
 *
 * Implement a keyboard-operable Scene with textual shadow feedback and reduced motion.
 */
