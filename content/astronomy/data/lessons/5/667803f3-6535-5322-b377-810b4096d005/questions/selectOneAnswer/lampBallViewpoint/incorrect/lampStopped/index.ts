import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const lampStopped = defineText<"lampStopped", LessonLanguages>({
  id: "23c96cb5-9a6a-4cb9-9c4a-0b13ab829b23",
  slug: "lampStopped",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Лампа зовсім перестає освітлювати кулю для однієї дитини.",
      en: "The lamp stops illuminating the ball altogether for one of the children.",
      pl: "Dla jednego z dzieci lampa zupełnie przestaje oświetlać kulę.",
      qm: "Balalardan biri içün lampa şarnı bütünley aydınlatmaqnı toqtata."
    }
  }
});
