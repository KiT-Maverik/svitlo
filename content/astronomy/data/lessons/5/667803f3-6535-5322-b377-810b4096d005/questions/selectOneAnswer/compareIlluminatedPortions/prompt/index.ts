import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "a7aea976-f775-4ea9-94a0-696740af4551",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Троє дітей описали Місяць у різні дні: одна бачила тонкий світлий серп, друга — приблизно половину освітленого диска, третя — майже весь освітлений диск. Хто бачив найбільшу світлу частину?",
      en: "Three children described the Moon on different days: one saw a thin bright crescent, another saw about half of the disk lit up, and the third saw nearly the whole disk lit up. Who saw the largest bright part?",
      pl: "Troje dzieci opisało Księżyc w różne dni: jedno widziało cienki jasny sierp, drugie — mniej więcej połowę oświetlonej tarczy, a trzecie — prawie całą oświetloną tarczę. Kto widział największą jasną część?",
      qm: "Üç bala Ayni türlü künlerde tarif etti: biri ince aydın oraqnı, ekincisi diskniñ taqriben yarısını, üçüncisi ise emen bütün aydın diskni kördi. Kim eñ büyük aydın qısımnı kördi?"
    }
  }
});
