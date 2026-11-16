import { defineContentSection } from '@svitlo/engine/build';
import { equalGroupsCaptions } from "./equalGroupsCaptions";
import { equalGroupsVideo } from "./equalGroupsVideo";
import { relatedEqualityVideos } from "./relatedEqualityVideos";
import { separateCountersImage } from "./separateCountersImage";
import { spokenExplanation } from "./spokenExplanation";
import { verifyEquality } from "./verifyEquality";
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

const content = {
  items: {
    separateCountersImage,
    spokenExplanation,
    equalGroupsVideo,
    equalGroupsCaptions,
    relatedEqualityVideos,
    verifyEquality
  },
  order: [
    "separateCountersImage",
    "spokenExplanation",
    "equalGroupsVideo",
    "equalGroupsCaptions",
    "relatedEqualityVideos",
    "verifyEquality"
  ]
};

export const reviewEquality = defineContentSection<"reviewEquality", typeof content.items, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000021",
  slug: "reviewEquality",
  type: "content",
  params: {
    skippable: false
  },
  locale: {
    title: {
      en: "Review equality"
    },
    navigationLabel: {
      en: "Review equality"
    }
  },
  content
});
