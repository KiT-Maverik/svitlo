import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const newMoonBorn = defineText<"newMoonBorn", LessonLanguages>({
  id: "6f8ed492-7822-4ce6-ae4a-eb552f94cdee",
  slug: "newMoonBorn",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Кожного разу народжується нове небесне тіло замість старого.",
      en: "A new celestial body is born each time to replace the old one.",
      pl: "Za każdym razem zamiast starego powstaje nowe ciało niebieskie.",
      qm: "Er sefer eskisiniñ yerine yañı kök cisimi peyda ola."
    }
  }
});
