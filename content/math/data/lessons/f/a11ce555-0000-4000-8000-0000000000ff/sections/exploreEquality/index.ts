import { defineContentSection } from '@svitlo/engine/build';
import { CompareGroupsSceneConfig } from "./compareGroupsScene";
import { compareValuesCode } from "./compareValuesCode";
import { counterArrangementsCarousel } from "./counterArrangementsCarousel";
import { counterGroupsImage } from "./counterGroupsImage";
import { explainWithMarkdown } from "./explainWithMarkdown";
import { meaningOfEquality } from "./meaningOfEquality";
import type { LessonLanguages } from "#lessonsData/f/a11ce555-0000-4000-8000-0000000000ff/constants";

const content = {
  items: {
    meaningOfEquality,
    explainWithMarkdown,
    compareValuesCode,
    counterGroupsImage,
    compareGroupsScene: CompareGroupsSceneConfig,
    counterArrangementsCarousel
  },
  order: [
    "meaningOfEquality",
    "explainWithMarkdown",
    "compareValuesCode",
    "counterGroupsImage",
    "compareGroupsScene",
    "counterArrangementsCarousel"
  ]
};

export const exploreEquality = defineContentSection<"exploreEquality", typeof content.items, LessonLanguages>({
  id: "a11ce555-0000-4000-8000-000000000020",
  slug: "exploreEquality",
  type: "content",
  params: {
    skippable: false
  },
  locale: {
    title: {
      en: "Explore equality"
    },
    navigationLabel: {
      en: "Explore equality"
    }
  },
  content
});
