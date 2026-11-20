import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "f316acd8-055e-4190-b8ed-132cbaa07e6c",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "На зображенні Місяця яскраво видно лише вузький серп. Що можна сказати про решту його кулі?",
      en: "In the picture of the Moon, only a narrow bright crescent is clearly visible. What can we say about the rest of the Moon's sphere?",
      pl: "Na ilustracji Księżyca wyraźnie widać tylko wąski, jasny sierp. Co można powiedzieć o pozostałej części jego kuli?",
      qm: "Ay resminde yalnız tar aydın oraq parlaq körüne. Şarnıñ qalğan qısmı aqqında ne aytmaq mümkün?"
    }
  }
});
