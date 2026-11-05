import type { UiKit_Component } from '@svitlo/engine/content';
const uk = {
  flashcard: {
    region: 'Флешкартка',
    actions: {
      menu: 'Дії картки',
      reveal: 'Показати відповідь',
      forgot: 'Не пам’ятаю',
      remembered: 'Пам’ятаю',
      addLabel: 'Додати мітку',
    },
  },
};

export type Flashcard_Locale = typeof uk;
const lt = {
  flashcard: {
    region: 'Mokymosi kortelė',
    actions: {
      menu: 'Kortelės veiksmai',
      reveal: 'Rodyti atsakymą',
      forgot: 'Nepamenu',
      remembered: 'Prisimenu',
      addLabel: 'Pridėti žymą',
    },
  },
} satisfies Flashcard_Locale;
const lv = {
  flashcard: {
    region: 'Mācību kartīte',
    actions: {
      menu: 'Kartītes darbības',
      reveal: 'Parādīt atbildi',
      forgot: 'Neatceros',
      remembered: 'Atceros',
      addLabel: 'Pievienot atzīmi',
    },
  },
} satisfies Flashcard_Locale;
const et = {
  flashcard: {
    region: 'Õppekaart',
    actions: {
      menu: 'Kaardi toimingud',
      reveal: 'Näita vastust',
      forgot: 'Ei mäleta',
      remembered: 'Mäletan',
      addLabel: 'Lisa silt',
    },
  },
} satisfies Flashcard_Locale;
const be = {
  flashcard: {
    region: 'Навучальная картка',
    actions: {
      menu: 'Дзеяньні з карткай',
      reveal: 'Паказаць адказ',
      forgot: 'Не памятаю',
      remembered: 'Памятаю',
      addLabel: 'Дадаць пазнаку',
    },
  },
} satisfies Flashcard_Locale;
const ka = {
  flashcard: {
    region: 'სასწავლო ბარათი',
    actions: {
      menu: 'ბარათის მოქმედებები',
      reveal: 'პასუხის ჩვენება',
      forgot: 'არ მახსოვს',
      remembered: 'მახსოვს',
      addLabel: 'ნიშნულის დამატება',
    },
  },
} satisfies Flashcard_Locale;
const kk = {
  flashcard: {
    region: 'Оқу карточкасы',
    actions: {
      menu: 'Карточка әрекеттері',
      reveal: 'Жауапты көрсету',
      forgot: 'Есімде жоқ',
      remembered: 'Есімде',
      addLabel: 'Белгі қосу',
    },
  },
} satisfies Flashcard_Locale;

const qm = {
  flashcard: {
    region: 'Bilgi kartı',
    actions: {
      menu: 'Kartnıñ amelleri',
      reveal: 'Cevapnı köster',
      forgot: 'Hatırlamayım',
      remembered: 'Hatırlayım',
      addLabel: 'Belgi qoş',
    },
  },
} satisfies Flashcard_Locale;

export const data = { uk, lt, lv, et, be, ka, kk, qm } satisfies UiKit_Component<'flashcard', 'data', 'uk' | 'lt' | 'lv' | 'et' | 'be' | 'ka' | 'kk' | 'qm'>;
