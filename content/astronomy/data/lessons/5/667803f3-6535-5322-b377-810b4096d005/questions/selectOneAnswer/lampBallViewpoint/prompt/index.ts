import { defineText } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

export const prompt = defineText<"prompt", LessonLanguages>({
  id: "78440d3b-cadb-4dd6-bf0d-ae0ae0a8649a",
  slug: "prompt",
  type: "text",
  params: {},
  locale: {
    value: {
      uk: "Лампа освітлює одну половину нерухомої кулі. Двоє дітей дивляться на кулю з різних місць і бачать різну величину її світлої частини. Чому?",
      en: "A lamp illuminates one half of a ball that is not moving. Two children look at the ball from different places and see different amounts of its bright part. Why?",
      pl: "Lampa oświetla jedną połowę nieruchomej kuli. Dwoje dzieci patrzy na kulę z różnych miejsc i widzi różnej wielkości jasną część. Dlaczego?",
      qm: "Lampa qıymıldamağan şarnıñ bir yarısını aydınlata. Eki bala şarğa türlü yerlerden baqıp, aydın qısımnıñ farqlı paylarını köre. Niçün?"
    }
  }
});
