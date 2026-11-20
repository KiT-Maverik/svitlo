import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "13c9adcb-f951-5168-acc6-c14931268f89",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Андрій хоче дізнатися, який вигляд має Сонце, і пропонує швидко глянути на нього крізь вікно. Що варто порадити?",
      en: "Andrii wants to see what the Sun looks like and suggests taking a quick look at it through a window. What should you advise him to do?",
      pl: "Andrij chce zobaczyć, jak wygląda Słońce, i proponuje szybko zerknąć na nie przez okno. Co warto mu poradzić?",
      qm: "Andriy Küneşniñ nasıl körüngenini bilmek istey ve oña pencereden bir anlığına baqıp almaqnı teklif ete. Oña ne tevsiye etmek kerek?"
    }
  }
});
