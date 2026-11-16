import { defineSubtitles, resolveLessonMedia } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

export const equalGroupsCaptions = defineSubtitles<"equalGroupsCaptions", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000010",
  slug: "equalGroupsCaptions",
  type: "subtitles",
  params: {},
  locale: {
    fileLocation: {
      en: resolveLessonMedia(import.meta.url, "subtitles", "source", "en")
    }
  }
});
