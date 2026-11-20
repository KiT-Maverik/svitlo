import { defineScene } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/e/26482aec-3c09-57a6-8534-414f649276be/constants";

export const RelationshipWorkbenchConfig = defineScene<"relationshipWorkbench", LessonLanguages>({
  id: "b0886d5a-a5c3-48c9-998b-fe5a94439f4a",
  slug: "relationshipWorkbench",
  type: "scene",
  params: {},
  locale: {
    value: {
      uk: {
        heading: "З'єднай небесні тіла за їхніми ролями",
        instructions: "Визнач ролі Сонця, Землі та Місяця. Потім склади два твердження: хто навколо кого рухається.",
        sun: "Сонце",
        earth: "Земля",
        moon: "Місяць",
        star: "Зоря",
        planet: "Планета",
        satellite: "Природний супутник",
        chooseBody: "Обери тіло",
        chooseRole: "Обери роль",
        chooseTraveler: "Хто рухається?",
        chooseCenter: "Навколо кого?",
        goodSun: "Так. Сонце — зоря, воно випромінює світло.",
        goodEarth: "Так. Земля — планета, вона рухається навколо Сонця.",
        goodMoon: "Так. Місяць — природний супутник Землі.",
        badRole: "Спробуй ще раз. Зоря випромінює світло сама; планета рухається навколо зорі, а природний супутник — навколо планети. Яке тіло підходить до цієї ролі?",
        goodEarthSun: "Так: Земля рухається навколо Сонця.",
        goodMoonEarth: "Так: Місяць рухається навколо Землі.",
        badLink: "Спробуй ще раз. Спочатку назви тіло, яке рухається, потім те, навколо якого воно рухається. Земля рухається навколо Сонця; Місяць — навколо Землі.",
        done: "Ти розрізнив ролі та зв'язки! Це вправа, не оцінка.",
        reset: "Почати спочатку",
        scale: "Схема не показує справжні розміри та відстані.",
        textMode: "Текстова вправа"
      }
    }
  }
});
