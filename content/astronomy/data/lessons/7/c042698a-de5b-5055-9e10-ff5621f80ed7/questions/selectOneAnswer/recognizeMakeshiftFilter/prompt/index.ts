import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "3ef7e26f-0b56-5d91-8965-be71cf987cc2",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Тато знайшов удома темну плівку й каже, що через неї можна дивитися на Сонце. Який висновок правильний?",
      en: "Dad found some dark film at home and says you can look at the Sun through it. Which conclusion is correct?",
      pl: "Tata znalazł w domu ciemną folię i mówi, że można przez nią patrzeć na Słońce. Który wniosek jest prawidłowy?",
      qm: "Baba evde qoyu tüslü plönka taptı ve onıñ aşasından Küneşke baqmaq mümkün, dep ayta. Qaysı netice doğrudır?"
    }
  }
});
