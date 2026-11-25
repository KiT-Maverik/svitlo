import { defineChapter, defineLessonStub } from '@svitlo/engine/build';
import { languages } from "../../../constants";
import type { Languages } from "../../../constants";
// TODO (BLOCKER): Use actual episode when implemented.
import {finalMission} from "./finalMission/stub";

const content = { items: { finalMission,
    // TODO (BLOCKER): Replace with actual lesson when ready.
    "combinedPractice": defineLessonStub({ id: "c4295601-dd98-54d3-b100-0e9aa70c0609", slug: "combinedPractice" }) }, order: ["finalMission","combinedPractice"] };

export const combinedObservations = defineChapter<"combinedObservations", typeof content.items, Languages>({
  "type": "chapter",
  "slug": "combinedObservations",
  "locale": {
  "title": "Combined observations"
},
  "id": "f43a2fe5-049b-50f0-8da5-f5a5c91541d2",
  params: {  },
  content,
});
