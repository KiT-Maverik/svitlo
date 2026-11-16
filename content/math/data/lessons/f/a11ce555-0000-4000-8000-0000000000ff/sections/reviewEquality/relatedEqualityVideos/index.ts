import { defineYoutube } from '@svitlo/engine/build';
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

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
