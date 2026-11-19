import { defineContentSection } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

import { safeWays } from "./safeWays";
import { whyProtectEyes } from "./whyProtectEyes";

const content = {
  items: {
    whyProtectEyes,
    safeWays
  },
  order: [
    "whyProtectEyes",
    "safeWays"
  ]
};

export const solarSafety = defineContentSection<"solarSafety", typeof content.items, LessonLanguages>({
  id: "12936be4-a2f0-5b31-b6eb-79a63b90687f",
  slug: "solarSafety",
  type: "content",
  params: {},
  locale: {
    title: {
      uk: "Чому потрібно берегти очі?"
    },
    navigationLabel: {
      uk: "Бережемо очі"
    }
  },
  content
});
