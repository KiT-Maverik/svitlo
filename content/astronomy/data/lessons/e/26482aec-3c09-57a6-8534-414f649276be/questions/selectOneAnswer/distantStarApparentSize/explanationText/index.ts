import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "8f0cf9fe-727b-4433-bc0b-97d687967b3e",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Зоря може здаватися маленькою через величезну відстань. Сонце теж зоря; видимий розмір сам по собі не доводить ні справжнього розміру, ні типу небесного тіла.",
      en: "A star can look small because it is extremely far away. The Sun is also a star; apparent size alone does not show a body's real size or what kind of celestial body it is.",
      pl: "Gwiazda może wydawać się mała, ponieważ jest bardzo daleko. Słońce też jest gwiazdą; sam pozorny rozmiar nie mówi ani o rzeczywistej wielkości, ani o rodzaju ciała niebieskiego.",
      qm: "Yıldız pek uzaqta olğanı içün kiçik körüne bile. Küneş de yıldızdır; körüngen büyüklük cisimniñ kerçek ölçüsini ya da kök cisminiñ türüni tek başına belli etmey."
    }
  }
});
