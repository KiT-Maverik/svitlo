import type { DefaultSupportedLanguage } from '@svitlo/engine/localization';

const en = { title: 'Check your knowledge', check: 'Check', checked: 'Checked' };

export type Checkpoint_Locale = typeof en;

const zh: Checkpoint_Locale = { title: '检验你的知识', check: '确认', checked: '已确认' };

const hi: Checkpoint_Locale = { title: 'अपना ज्ञान जाँचें', check: 'जाँचें', checked: 'जाँचा गया' };

const es: Checkpoint_Locale = {
  title: 'Comprueba lo que sabes',
  check: 'Confirmar',
  checked: 'Confirmado',
};

const ar: Checkpoint_Locale = { title: 'اختبر معلوماتك', check: 'تأكيد', checked: 'تم التأكيد' };

const fr: Checkpoint_Locale = {
  title: 'Vérifie tes connaissances',
  check: 'Valider',
  checked: 'Validé',
};

const bn: Checkpoint_Locale = {
  title: 'তোমার জ্ঞান যাচাই করো',
  check: 'নিশ্চিত করুন',
  checked: 'নিশ্চিত হয়েছে',
};

const pt: Checkpoint_Locale = {
  title: 'Confira seus conhecimentos',
  check: 'Confirmar',
  checked: 'Confirmado',
};

const ur: Checkpoint_Locale = { title: 'اپنا علم جانچیں', check: 'تصدیق کریں', checked: 'تصدیق شدہ' };

const id: Checkpoint_Locale = {
  title: 'Periksa pemahamanmu',
  check: 'Konfirmasi',
  checked: 'Dikonfirmasi',
};

const de: Checkpoint_Locale = {
  title: 'Prüfe dein Wissen',
  check: 'Bestätigen',
  checked: 'Bestätigt',
};

const ja: Checkpoint_Locale = { title: '理解度を確認', check: '確認', checked: '確認済み' };

const ko: Checkpoint_Locale = { title: '이해도 확인', check: '확인', checked: '확인됨' };

const tr: Checkpoint_Locale = { title: 'Bilgini kontrol et', check: 'Onayla', checked: 'Onaylandı' };

const vi: Checkpoint_Locale = {
  title: 'Kiểm tra kiến thức',
  check: 'Xác nhận',
  checked: 'Đã xác nhận',
};

const ta: Checkpoint_Locale = {
  title: 'உங்கள் அறிவைச் சரிபாருங்கள்',
  check: 'உறுதிப்படுத்து',
  checked: 'உறுதிப்படுத்தப்பட்டது',
};

const te: Checkpoint_Locale = {
  title: 'మీ జ్ఞానాన్ని పరీక్షించుకోండి',
  check: 'నిర్ధారించు',
  checked: 'నిర్ధారించబడింది',
};

const mr: Checkpoint_Locale = {
  title: 'तुमचे ज्ञान तपासा',
  check: 'पुष्टी करा',
  checked: 'पुष्टी झाली',
};

const ms: Checkpoint_Locale = {
  title: 'Semak pengetahuan anda',
  check: 'Sahkan',
  checked: 'Disahkan',
};

const he: Checkpoint_Locale = { title: 'בדקו את הידע שלכם', check: 'אישור', checked: 'אושר' };

const pl: Checkpoint_Locale = {
  title: 'Sprawdź swoją wiedzę',
  check: 'Potwierdź',
  checked: 'Potwierdzono',
};

const uk: Checkpoint_Locale = {
  title: 'Перевір свої знання',
  check: 'Підтвердити',
  checked: 'Підтверджено',
};

const lt: Checkpoint_Locale = {
  title: 'Pasitikrink žinias',
  check: 'Patikrinti',
  checked: 'Patikrinta',
};

const lv: Checkpoint_Locale = {
  title: 'Pārbaudi savas zināšanas',
  check: 'Pārbaudīt',
  checked: 'Pārbaudīts',
};

const et: Checkpoint_Locale = {
  title: 'Kontrolli oma teadmisi',
  check: 'Kontrolli',
  checked: 'Kontrollitud',
};

const be: Checkpoint_Locale = { title: 'Правер свае веды', check: 'Праверыць', checked: 'Праверана' };

const ka: Checkpoint_Locale = {
  title: 'შეამოწმე შენი ცოდნა',
  check: 'შემოწმება',
  checked: 'შემოწმებულია',
};

const kk: Checkpoint_Locale = { title: 'Біліміңді тексер', check: 'Тексеру', checked: 'Тексерілді' };

const qm: Checkpoint_Locale = { title: 'Bilgiñni tekşer', check: 'Tekşer', checked: 'Tekşirildi' };

export const data: Readonly<Record<DefaultSupportedLanguage['language'], Checkpoint_Locale>> = {
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
