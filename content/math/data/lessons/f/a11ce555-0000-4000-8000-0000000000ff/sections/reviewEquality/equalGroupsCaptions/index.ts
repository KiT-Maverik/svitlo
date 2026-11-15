// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: cc080b053e423577953a8f447a83729fdaa2cd0dc34f22d7a8b0345638f34bca
import { defineSubtitles, resolveLessonMedia } from '@svitlo/engine/build';

import type { LessonLanguages } from "../../../constants";

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
