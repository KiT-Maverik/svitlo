import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "5bd310c0-e266-411a-bd11-b0c01271407c",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "У перший день видно вузький серп, а через кілька днів — більшу світлу частину Місяця. Обери всі правильні твердження про Місяць у цих спостереженнях."
    }
  }
});
