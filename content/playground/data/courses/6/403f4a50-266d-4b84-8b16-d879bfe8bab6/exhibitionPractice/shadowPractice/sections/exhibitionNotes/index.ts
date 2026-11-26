import { defineContentSection } from '@svitlo/engine/build';
import { languages } from "#coursesData/6/403f4a50-266d-4b84-8b16-d879bfe8bab6/constants";
import { shadowAudio } from "./shadowAudio";
import { shadowCarousel } from "./shadowCarousel";
import { shadowCheckpoint } from "./shadowCheckpoint";
import { shadowCode } from "./shadowCode";
import { shadowDiagram } from "./shadowDiagram";
import { shadowMarkdown } from "./shadowMarkdown";
import { shadowObservation } from "./shadowObservation";
import { shadowScene } from "./shadowScene";
import { shadowSubtitles } from "./shadowSubtitles";
import { shadowVideo } from "./shadowVideo";
import { shadowYoutube } from "./shadowYoutube";

const content = {
  "items": {
    shadowAudio,
    shadowCarousel,
    shadowCheckpoint,
    shadowCode,
    shadowDiagram,
    shadowMarkdown,
    shadowObservation,
    shadowScene,
    shadowSubtitles,
    shadowVideo,
    shadowYoutube,
  },
  "order": ["shadowObservation", "shadowMarkdown", "shadowCode", "shadowDiagram", "shadowVideo", "shadowYoutube", "shadowAudio", "shadowSubtitles", "shadowScene", "shadowCarousel", "shadowCheckpoint"],
};

export const exhibitionNotes = defineContentSection<"exhibitionNotes", typeof content.items, typeof languages>(
{
  "id": "e6073d92-4b8c-4c6f-8920-6ab25ca94711",
  "slug": "exhibitionNotes",
  "type": "content",
  "params": {},
  "locale": {
    "title": {
      "en": "Exhibition shadow observations",
    },
    "navigationLabel": "Exhibition notes",
  },
  content,
});
