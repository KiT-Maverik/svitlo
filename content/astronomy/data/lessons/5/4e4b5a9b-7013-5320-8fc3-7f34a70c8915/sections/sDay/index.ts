import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

import { dayAudio } from "./dayAudio";
import { dayExplain } from "./dayExplain";
import { dayIntro } from "./dayIntro";
import { dayRecap } from "./dayRecap";
import { DaySceneConfig } from "./dayScene";

const content = {
  items: {
    dayIntro,
    dayAudio,
    dayScene: DaySceneConfig,
    dayExplain,
    dayRecap
  },
  order: [
    "dayIntro",
    "dayAudio",
    "dayScene",
    "dayExplain",
    "dayRecap"
  ]
};

export const sDay = defineContentSection<"sDay", typeof content.items, LessonLanguages>({
  id: "f25202e1-6ea2-4c61-b281-fb1e15ea9d31",
  slug: "sDay",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Що видно вдень і вночі?"
    },
    navigationLabel: {
      uk: "День і ніч"
    }
  },
  content
});
