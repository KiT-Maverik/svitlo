import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

import { MoonLightExplorerConfig } from "./moonLightExplorer";
import { whyLight } from "./whyLight";
import { workedExample } from "./workedExample";

const content = {
  items: {
    whyLight,
    moonLightExplorer: MoonLightExplorerConfig,
    workedExample
  },
  order: [
    "whyLight",
    "moonLightExplorer",
    "workedExample"
  ]
};

export const moonLight = defineContentSection<"moonLight", typeof content.items, LessonLanguages>({
  id: "aeb987c1-704e-4ef6-8a93-000000000002",
  slug: "moonLight",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Звідки світиться Місяць"
    },
    navigationLabel: {
      uk: "Сонячне світло"
    }
  },
  content
});
