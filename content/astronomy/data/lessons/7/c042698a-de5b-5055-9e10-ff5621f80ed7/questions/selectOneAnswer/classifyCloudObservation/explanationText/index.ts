import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/7/c042698a-de5b-5055-9e10-ff5621f80ed7/constants";

export const explanationText = defineText<"explanationText", LessonLanguages>({
  id: "ce689630-d7a8-5e23-a39a-782d75271cfa",
  slug: "explanationText",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Хмари є частиною денного неба, і їх можна порівнювати на готових знімках. Небо не обов'язково досліджувати вночі; небезпечні спроби подивитися на Сонце для цього не потрібні.",
      en: "Clouds are part of the daytime sky, and you can compare them in photographs that have already been taken. You can study the sky during the day, not just at night. There is no need to risk looking at the Sun.",
      pl: "Chmury są częścią dziennego nieba i można je porównywać na gotowych zdjęciach. Niebo można badać również w dzień, a nie tylko w nocy. Nie trzeba do tego ryzykować patrzenia na Słońce.",
      qm: "Bulutlar kündüzgi semanıñ bir qısmıdır, olarnı azır fotoresimlerde teñeştirmek mümkün. Semanı tek geceleri degil, kündüz de ögrenmek mümkün; bunıñ içün Küneşke telükeli şekilde baqmaq kerek degil."
    }
  }
});
