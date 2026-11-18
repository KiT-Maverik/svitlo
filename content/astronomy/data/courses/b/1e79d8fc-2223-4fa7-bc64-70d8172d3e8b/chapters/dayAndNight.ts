import { defineChapter } from "@svitlo/engine/build";

import { dayNightBasics } from "#lessons/2/c25fe16e-5640-5615-b456-a99a392a7f42";

export const dayAndNight = defineChapter({
  "type": "chapter",
  "id": "7960fa2f-7f3a-5f8f-b68a-b0bce842c07b",
  "slug": "dayAndNight",
  "params": {},
  "locale": {
    "title": {
      "uk": "Чому бувають день і ніч"
    }
  },
  content: {
    items: {
      dayNightBasics,
    },
    order: [
      "dayNightBasics"
    ]
  }
});
