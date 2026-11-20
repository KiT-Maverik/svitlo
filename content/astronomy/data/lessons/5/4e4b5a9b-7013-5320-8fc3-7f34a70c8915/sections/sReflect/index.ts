import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

import { reflectAudio } from "./reflectAudio";
import { reflectClose } from "./reflectClose";
import { reflectIntro } from "./reflectIntro";
import { ReflectSceneConfig } from "./reflectScene";

const content = {
  items: {
    reflectIntro,
    reflectAudio,
    reflectScene: ReflectSceneConfig,
    reflectClose
  },
  order: [
    "reflectIntro",
    "reflectAudio",
    "reflectScene",
    "reflectClose"
  ]
};

export const sReflect = defineContentSection<"sReflect", typeof content.items, LessonLanguages>({
  id: "f9396c00-0956-4938-8551-f9d0638cd998",
  slug: "sReflect",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Дві зміни — два запитання"
    },
    navigationLabel: {
      uk: "Наші запитання"
    }
  },
  content
});
