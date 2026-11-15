// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 0abc25b435a1d66f9d9c55dd1e765e0956216cc39b6a29b4a8594ec1248cc3df
import { defineAudio, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../constants";

export const spokenExplanation = defineAudio<"spokenExplanation", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-00000000000e",
  slug: "spokenExplanation",
  type: "audio",
  params: {},
  locale: {
    fileLocation: resolveLessonMedia(import.meta.url, "audio", "source"),
    title: {
      en: "Listen: both sides are five"
    },
    description: {
      en: "A spoken explanation of the equals sign."
    },
    fallback: {
      offline: {
        en: "Audio is not offline."
      },
      unavailable: {
        en: "Audio pending production."
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
