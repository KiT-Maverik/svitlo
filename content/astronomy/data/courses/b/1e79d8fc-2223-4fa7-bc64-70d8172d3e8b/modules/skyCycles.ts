// Generated Course authoring draft; manual completion and review required.
import { defineModule } from "@svitlo/engine/build";
import { dayAndNight_Chapter } from "../chapters/dayAndNight";
import { moonAppearance_Chapter } from "../chapters/moonAppearance";

// TODO: Resolve standalone Lesson UUID "4e4b5a9b-7013-5320-8fc3-7f34a70c8915" and replace UNRESOLVED_LESSON_0; never define Lesson inside Course.

export const skyCycles_Module = defineModule({
  "type": "module",
  "id": "0402991c-fd06-5f57-b7cb-84e45f5ae12d",
  "slug": "skyCycles",
  "params": {},
  "locale": {
    "title": {
      "uk": "Як змінюється небо"
    }
  },
  content: {
    items: {
    "skyChangesOverview": UNRESOLVED_LESSON_0,
    "dayAndNight": dayAndNight_Chapter,
    "moonAppearance": moonAppearance_Chapter
    },
    order: [
      "skyChangesOverview",
      "dayAndNight",
      "moonAppearance"
    ]
  }
});
