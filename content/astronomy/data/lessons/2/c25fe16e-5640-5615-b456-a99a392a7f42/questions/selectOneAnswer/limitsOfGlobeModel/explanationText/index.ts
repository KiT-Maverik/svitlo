import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000020",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Ліхтарик і кулька допомагають зрозуміти освітлений бік та обертання. Але їхні розміри й відстань не відповідають справжнім Сонцю та Землі.",
      en: "The flashlight and ball help us understand the lit side and rotation. But their sizes and the distance between them do not match the real Sun and Earth.",
      pl: "Latarka i kula pomagają zrozumieć, która strona jest oświetlona, oraz na czym polega obrót. Jednak ich rozmiary i odległość między nimi nie odpowiadają rzeczywistym rozmiarom i odległości Słońca i Ziemi.",
      qm: "Fener ve küre ışıq tüşken tarafnı ve aylanuvnı añlamağa yardım ete. Amma olarnıñ ölçüleri ve aralarındaki mesafe aqiqiy Küneş ve Yerge uyma."
    }
  }
});
