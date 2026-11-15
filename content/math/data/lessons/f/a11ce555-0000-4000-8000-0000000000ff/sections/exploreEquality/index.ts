// Scaffolded by shared/engine/scripts/lessonBuilder/lessonBuilder.mjs; DRAFT FOR AI EDITING.
// Draft content sha256: cbb07462940e5f668a58b039e4ff8789d303700e81a638ca7bc43b3b5038b15f
import { defineContentSection } from '@svitlo/engine/build';
import { compareGroupsScene } from "./compareGroupsScene";
import { compareValuesCode } from "./compareValuesCode";
import { counterArrangementsCarousel } from "./counterArrangementsCarousel";
import { counterGroupsImage } from "./counterGroupsImage";
import { explainWithMarkdown } from "./explainWithMarkdown";
import { meaningOfEquality } from "./meaningOfEquality";
import type { LessonLanguages } from "../../constants";

const content = {
  items: {
    meaningOfEquality,
    explainWithMarkdown,
    compareValuesCode,
    counterGroupsImage,
    compareGroupsScene,
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
