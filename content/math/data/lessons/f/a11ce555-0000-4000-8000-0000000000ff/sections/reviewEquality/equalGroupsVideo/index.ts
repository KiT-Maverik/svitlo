// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: f61b1c0b5b4ec76d897b5a1c2ff6e3c481df6507d1754ebe13287c28a713f521
import { defineVideo, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../constants";

export const equalGroupsVideo = defineVideo<"equalGroupsVideo", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-00000000000f",
  slug: "equalGroupsVideo",
  type: "video",
  params: {},
  locale: {
    fileLocation: {
      en: resolveLessonMedia(import.meta.url, "video", "source", "en")
    },
    poster: resolveLessonMedia(import.meta.url, "video", "poster"),
    title: {
      en: "Compare two groups"
    },
    label: {
      en: "Video: both sides equal five"
    },
    fallback: {
      offline: {
        en: "Video not offline."
      },
      unavailable: {
        en: "Video pending production."
      },
      playbackError: {
        en: "Playback failed."
      },
      retry: {
        en: "Try again."
      }
    }
  }
});
