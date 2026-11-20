import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/4e4b5a9b-7013-5320-8fc3-7f34a70c8915/constants";

export const moonRecap = defineText<"moonRecap", LessonLanguages>({
  id: "1c4140b2-4f03-44cf-af46-13aab27eda4b",
  slug: "moonRecap",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Скажи або покажи: «На першій схемі освітлена приблизно половина видимого диска Місяця, а на другій — майже весь видимий диск».",
      en: "Say or point out: “In the first diagram, about half of the Moon’s visible disk is lit; in the second, almost all of it is lit.”",
      pl: "Powiedz albo pokaż: „Na pierwszym schemacie oświetlona jest mniej więcej połowa widocznej tarczy Księżyca, a na drugim — prawie cała tarcza”.",
      qm: "Söyle ya da köster: «Birinci şemada körüngen diskniñ yaqlaşık yarısı, ekincisinde ise hemen-hemen episi aydınlatılğan»."
    }
  }
});
