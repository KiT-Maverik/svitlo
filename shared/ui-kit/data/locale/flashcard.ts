import type { UiKit_Component } from '@svitlo/engine/content';
import type { DefaultSupportedLanguage } from '@svitlo/engine/localization';

const en = {
  flashcard: {
    region: 'Flashcard',
    actions: {
      menu: 'Card actions',
      reveal: 'Show answer',
      forgot: "I don't remember",
      remembered: 'I remember',
      addLabel: 'Add label',
    },
  },
};
type Locale = typeof en;

const zh: Locale = {
  flashcard: {
    region: '学习卡片',
    actions: { menu: '卡片操作', reveal: '显示答案', forgot: '不记得', remembered: '记得', addLabel: '添加标签' },
  },
};

const hi: Locale = {
  flashcard: {
    region: 'फ्लैशकार्ड',
    actions: {
      menu: 'कार्ड की क्रियाएँ',
      reveal: 'उत्तर दिखाएँ',
      forgot: 'याद नहीं',
      remembered: 'याद है',
      addLabel: 'लेबल जोड़ें',
    },
  },
};

const es: Locale = {
  flashcard: {
    region: 'Tarjeta didáctica',
    actions: {
      menu: 'Acciones de la tarjeta',
      reveal: 'Mostrar respuesta',
      forgot: 'No lo recuerdo',
      remembered: 'Lo recuerdo',
      addLabel: 'Añadir etiqueta',
    },
  },
};

const ar: Locale = {
  flashcard: {
    region: 'بطاقة تعليمية',
    actions: {
      menu: 'إجراءات البطاقة',
      reveal: 'إظهار الإجابة',
      forgot: 'لا أتذكر',
      remembered: 'أتذكر',
      addLabel: 'إضافة تسمية',
    },
  },
};

const fr: Locale = {
  flashcard: {
    region: 'Carte mémoire',
    actions: {
      menu: 'Actions de la carte',
      reveal: 'Afficher la réponse',
      forgot: 'Je ne me souviens pas',
      remembered: "Je m'en souviens",
      addLabel: 'Ajouter une étiquette',
    },
  },
};

const bn: Locale = {
  flashcard: {
    region: 'ফ্ল্যাশকার্ড',
    actions: {
      menu: 'কার্ডের কাজ',
      reveal: 'উত্তর দেখাও',
      forgot: 'মনে নেই',
      remembered: 'মনে আছে',
      addLabel: 'লেবেল যোগ করো',
    },
  },
};

const pt: Locale = {
  flashcard: {
    region: 'Cartão de estudo',
    actions: {
      menu: 'Ações do cartão',
      reveal: 'Mostrar resposta',
      forgot: 'Não me lembro',
      remembered: 'Eu me lembro',
      addLabel: 'Adicionar etiqueta',
    },
  },
};

const ur: Locale = {
  flashcard: {
    region: 'فلیش کارڈ',
    actions: {
      menu: 'کارڈ کے اختیارات',
      reveal: 'جواب دکھائیں',
      forgot: 'یاد نہیں',
      remembered: 'یاد ہے',
      addLabel: 'لیبل شامل کریں',
    },
  },
};

const id: Locale = {
  flashcard: {
    region: 'Kartu belajar',
    actions: {
      menu: 'Tindakan kartu',
      reveal: 'Tampilkan jawaban',
      forgot: 'Tidak ingat',
      remembered: 'Ingat',
      addLabel: 'Tambahkan label',
    },
  },
};

const de: Locale = {
  flashcard: {
    region: 'Lernkarte',
    actions: {
      menu: 'Kartenaktionen',
      reveal: 'Antwort anzeigen',
      forgot: 'Weiß ich nicht mehr',
      remembered: 'Weiß ich noch',
      addLabel: 'Markierung hinzufügen',
    },
  },
};

const ja: Locale = {
  flashcard: {
    region: 'フラッシュカード',
    actions: {
      menu: 'カードの操作',
      reveal: '答えを表示',
      forgot: '覚えていない',
      remembered: '覚えている',
      addLabel: 'ラベルを追加',
    },
  },
};

const ko: Locale = {
  flashcard: {
    region: '학습 카드',
    actions: {
      menu: '카드 작업',
      reveal: '정답 보기',
      forgot: '기억나지 않아요',
      remembered: '기억나요',
      addLabel: '라벨 추가',
    },
  },
};

const tr: Locale = {
  flashcard: {
    region: 'Öğrenme kartı',
    actions: {
      menu: 'Kart işlemleri',
      reveal: 'Yanıtı göster',
      forgot: 'Hatırlamıyorum',
      remembered: 'Hatırlıyorum',
      addLabel: 'Etiket ekle',
    },
  },
};

const vi: Locale = {
  flashcard: {
    region: 'Thẻ ghi nhớ',
    actions: {
      menu: 'Thao tác với thẻ',
      reveal: 'Hiện đáp án',
      forgot: 'Không nhớ',
      remembered: 'Nhớ',
      addLabel: 'Thêm nhãn',
    },
  },
};

const ta: Locale = {
  flashcard: {
    region: 'கற்றல் அட்டை',
    actions: {
      menu: 'அட்டைச் செயல்கள்',
      reveal: 'பதிலைக் காட்டு',
      forgot: 'நினைவில் இல்லை',
      remembered: 'நினைவில் உள்ளது',
      addLabel: 'குறிச்சொல் சேர்',
    },
  },
};

const te: Locale = {
  flashcard: {
    region: 'ఫ్లాష్‌కార్డ్',
    actions: {
      menu: 'కార్డ్ చర్యలు',
      reveal: 'సమాధానం చూపు',
      forgot: 'గుర్తులేదు',
      remembered: 'గుర్తుంది',
      addLabel: 'లేబుల్ జోడించు',
    },
  },
};

const mr: Locale = {
  flashcard: {
    region: 'फ्लॅशकार्ड',
    actions: {
      menu: 'कार्डवरील क्रिया',
      reveal: 'उत्तर दाखवा',
      forgot: 'आठवत नाही',
      remembered: 'आठवते',
      addLabel: 'लेबल जोडा',
    },
  },
};

const ms: Locale = {
  flashcard: {
    region: 'Kad imbas',
    actions: {
      menu: 'Tindakan kad',
      reveal: 'Tunjukkan jawapan',
      forgot: 'Saya tidak ingat',
      remembered: 'Saya ingat',
      addLabel: 'Tambah label',
    },
  },
};

const he: Locale = {
  flashcard: {
    region: 'כרטיסיית לימוד',
    actions: {
      menu: 'פעולות בכרטיסייה',
      reveal: 'הצגת התשובה',
      forgot: 'לא זוכר/ת',
      remembered: 'זוכר/ת',
      addLabel: 'הוספת תווית',
    },
  },
};

const pl: Locale = {
  flashcard: {
    region: 'Fiszka',
    actions: {
      menu: 'Akcje fiszki',
      reveal: 'Pokaż odpowiedź',
      forgot: 'Nie pamiętam',
      remembered: 'Pamiętam',
      addLabel: 'Dodaj etykietę',
    },
  },
};

const uk: Locale = {
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

const lt: Locale = {
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
};

const lv: Locale = {
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
};

const et: Locale = {
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
};

const be: Locale = {
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
};

const ka: Locale = {
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
};

const kk: Locale = {
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
};

const qm: Locale = {
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
};

/** Complete framework-independent card messages; review translations editorially. */
export const data: UiKit_Component<'flashcard', 'data', DefaultSupportedLanguage['language']> = {
  en,
  zh,
  hi,
  es,
  ar,
  fr,
  bn,
  pt,
  ur,
  id,
  de,
  ja,
  ko,
  tr,
  vi,
  ta,
  te,
  mr,
  ms,
  he,
  pl,
  uk,
  lt,
  lv,
  et,
  be,
  ka,
  kk,
  qm,
};
