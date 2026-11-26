import { defineChapter } from '@svitlo/engine/build';
import type { Languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
// TODO (BLOCKER): Keep this pending episode stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { finalMission } from "./finalMission/stub";
// TODO (BLOCKER): Keep this pending lesson stub imported until the child Configurator, resources, Scenes, banks, translations and TypeScript/preview checks are verified for Course integration; then the Coding Agent replaces this import with the canonical real Configurator import and deletes only this child stub.ts. Materialization alone never activates the child.
import { combinedPractice } from "./combinedPractice/stub";

const content = { items: { finalMission, combinedPractice }, order: ["finalMission","combinedPractice"] };

export const combinedObservations = defineChapter<"combinedObservations", typeof content.items, Languages>({
  "type": "chapter",
  "slug": "combinedObservations",
  "locale": {
  "title": {
    "en": "Combined observations"
  }
},
  "id": "f43a2fe5-049b-50f0-8da5-f5a5c91541d2",
  params: {},
  content,
});
