import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000010",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "На кульці є позначка Г, яка зараз на темному боці. Лампа світить, але ні лампу, ні кульку більше не рухають. Що буде в місці Г, доки модель залишається нерухомою?",
      en: "There is a mark «Г» on a ball, currently on its dark side. A lamp is shining, but neither the lamp nor the ball is moved anymore. What will happen at «Г» while the model stays still?",
      pl: "Na kuli jest oznaczenie «Г», które znajduje się teraz po ciemnej stronie. Lampa świeci, ale ani lampa, ani kula już się nie poruszają. Co będzie się działo w miejscu «Г», dopóki model pozostanie nieruchomy?",
      qm: "Kürede «Г» belgisi bar ve o, şimdi qarañğı tarafta. Lampa ışıq bere, amma ne lampa, ne de küre daa areket etmey. Model areketsiz qalğance «Г» yerinde ne olacaq?"
    }
  }
});
