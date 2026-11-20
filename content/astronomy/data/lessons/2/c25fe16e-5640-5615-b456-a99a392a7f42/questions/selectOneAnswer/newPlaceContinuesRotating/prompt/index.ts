import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/2/c25fe16e-5640-5615-b456-a99a392a7f42/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "7c4e3b90-ccf1-4f74-9c91-000000000017",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Уяви нове місто Д, позначене на колі посередині кульки, як у моделі уроку. Щойно в місті Д настав день. Лампа нерухома, а кулька продовжує обертатися. Що згодом станеться в місті Д?",
      en: "Imagine a new town «Д», marked on a circle around the middle of the ball, as in the lesson's model. Day has just begun in «Д». The lamp is still, and the ball keeps turning. What will happen in «Д» later?",
      pl: "Wyobraź sobie nowe miasto «Д», zaznaczone na okręgu pośrodku kuli, tak jak w modelu z lekcji. W mieście «Д» właśnie nastał dzień. Lampa stoi nieruchomo, a kula nadal się obraca. Co stanie się później w mieście «Д»?",
      qm: "Derste qullanılğan modeldeki kibi, küreniñ ortasındaki dairede belgilenmiş yañı «Д» şeerini tasavur et. «Д» şeerinde yañı kündüz başlandı. Lampa areketsiz, küre ise aylanmağa devam ete. Soñra «Д» şeerinde ne olacaq?"
    }
  }
});
