import { defineImage } from '@svitlo/engine/build';

import type { LessonLanguages } from "#lessonsData/5/667803f3-6535-5322-b377-810b4096d005/constants";

// TODO (BLOCKER): image media resource(s) unresolved.
// Produce or reuse verified asset files and replace Nil UUID filename(s) before merge.
export const threeMoonViews = defineImage<"threeMoonViews", LessonLanguages>({
  id: "aeb987c1-704e-4ef6-8a93-000000000012",
  slug: "threeMoonViews",
  type: "image",
  params: {
    fill: true,
    aspectRatio: 2.2,
    objectFit: "contain"
  },
  locale: {
    alt: {
      uk: "Три зображення того самого диска Місяця однакового розміру: тонкий освітлений серп, приблизно половина освітленого диска й майже повний світлий диск. Це окремі приклади, а не повна послідовність фаз."
    },
    caption: {
      uk: "Три можливі вигляди Місяця у різні дні: вузький серп, освітлена половина й майже повний диск. Згодом освітленої частини знову стає менше."
    },
    fallback: {
      unavailable: {
        uk: "Порівняй словесні описи: вузький світлий серп; освітлена половина диска; майже весь диск освітлений."
      },
      offline: {
        uk: "Якщо зображення недоступне, скористайся словесним описом трьох виглядів Місяця."
      }
    },
    // TODO(asset): Auto-generated unresolved media placeholder; no physical asset exists.
    // Replace with actual UUID.extension before production.
    fileName: "00000000-0000-0000-0000-000000000000.webp"
  }
});
