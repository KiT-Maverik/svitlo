import { defineVideo, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

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
