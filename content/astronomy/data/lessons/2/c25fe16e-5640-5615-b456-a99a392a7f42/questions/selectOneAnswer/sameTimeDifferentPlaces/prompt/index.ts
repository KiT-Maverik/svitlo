import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000002",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "У двох далеких місцях Землі зараз по-різному: у місці К — день, а в місці Л — ніч. Сонце продовжує світити. Чому так може бути?",
      en: "Right now, two places far apart on Earth have different conditions: it is daytime at K, but nighttime at L. The Sun is still shining. How is that possible?",
      pl: "W dwóch odległych miejscach na Ziemi jest teraz inaczej: w miejscu K trwa dzień, a w miejscu L — noc. Słońce nadal świeci. Dlaczego tak się dzieje?",
      qm: "Yerniñ birbirinden uzaq eki yerinde şimdi vaziyet farqlı: K yerinde kündüz, L yerinde ise gece. Küneş ışıq bermege devam ete. Bu nasıl ola bile?"
    }
  }
});
