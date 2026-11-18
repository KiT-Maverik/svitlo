// Generated Course authoring draft; manual completion and review required.
import { defineModule } from "@svitlo/engine/build";
import { solarSystemBasics_Chapter } from "../chapters/solarSystemBasics";

export const solarSystem_Module = defineModule({
  "type": "module",
  "id": "3277397b-0a67-55d2-8ca3-1138717c58d9",
  "slug": "solarSystem",
  "params": {},
  "locale": {
    "title": {
      "uk": "Наші космічні сусіди"
    }
  },
  content: {
    items: {
    "solarSystemBasics": solarSystemBasics_Chapter
    },
    order: [
      "solarSystemBasics"
    ]
  }
});
