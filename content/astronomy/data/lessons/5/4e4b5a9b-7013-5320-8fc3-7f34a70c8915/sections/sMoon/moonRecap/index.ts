import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const moonRecap = defineText<"moonRecap", LessonLanguages>({
  id: "1c4140b2-4f03-44cf-af46-13aab27eda4b",
  slug: "moonRecap",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Скажи або покажи: «На першій схемі освітлена приблизно половина видимого диска Місяця, а на другій — майже весь видимий диск»."
    }
  }
});
