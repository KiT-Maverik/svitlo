// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: 5dc3386c8129606d1cbc387c1cf698caf78cff3a51aa7910b1adabc998c0a543
import { defineYoutube } from '@svitlo/engine/build';
import type { LessonLanguages } from "../../../constants";

export const relatedEqualityVideos = defineYoutube<"relatedEqualityVideos", LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000011",
  slug: "relatedEqualityVideos",
  type: "youtube",
  params: {
    mode: "link"
  },
  locale: {
    href: "https://www.youtube.com/results?search_query=equal+sign+same+value",
    title: {
      en: "Learn more about equality"
    },
    label: {
      en: "Find equality explanations on YouTube"
    },
    fallback: {
      offline: {
        en: "External videos need internet."
      },
      unavailable: {
        en: "Page unavailable."
      },
      retry: {
        en: "Try opening again."
      }
    }
  }
});
