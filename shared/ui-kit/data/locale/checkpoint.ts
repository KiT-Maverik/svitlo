import type { UiKit_Component } from '@svitlo/engine/content';
import type { DefaultSupportedLanguage } from '@svitlo/engine/localization';

const en = { title: 'Check your knowledge', check: 'Check', checked: 'Checked' };

type Locale = typeof en;

const zh: Locale = { title: '检验你的知识', check: '确认', checked: '已确认' };

const hi: Locale = { title: 'अपना ज्ञान जाँचें', check: 'जाँचें', checked: 'जाँचा गया' };

const es: Locale = {
  title: 'Comprueba lo que sabes',
  check: 'Confirmar',
  checked: 'Confirmado',
};

const ar: Locale = { title: 'اختبر معلوماتك', check: 'تأكيد', checked: 'تم التأكيد' };

const fr: Locale = {
  title: 'Vérifie tes connaissances',
  check: 'Valider',
  checked: 'Validé',
};

const bn: Locale = {
  title: 'তোমার জ্ঞান যাচাই করো',
  check: 'নিশ্চিত করুন',
  checked: 'নিশ্চিত হয়েছে',
};

const pt: Locale = {
  title: 'Confira seus conhecimentos',
  check: 'Confirmar',
  checked: 'Confirmado',
};

const ur: Locale = { title: 'اپنا علم جانچیں', check: 'تصدیق کریں', checked: 'تصدیق شدہ' };

const id: Locale = {
  title: 'Periksa pemahamanmu',
  check: 'Konfirmasi',
  checked: 'Dikonfirmasi',
};

const de: Locale = {
  title: 'Prüfe dein Wissen',
  check: 'Bestätigen',
  checked: 'Bestätigt',
};

const ja: Locale = { title: '理解度を確認', check: '確認', checked: '確認済み' };

const ko: Locale = { title: '이해도 확인', check: '확인', checked: '확인됨' };

const tr: Locale = { title: 'Bilgini kontrol et', check: 'Onayla', checked: 'Onaylandı' };

const vi: Locale = {
  title: 'Kiểm tra kiến thức',
  check: 'Xác nhận',
  checked: 'Đã xác nhận',
};

const ta: Locale = {
  title: 'உங்கள் அறிவைச் சரிபாருங்கள்',
  check: 'உறுதிப்படுத்து',
  checked: 'உறுதிப்படுத்தப்பட்டது',
};

const te: Locale = {
  title: 'మీ జ్ఞానాన్ని పరీక్షించుకోండి',
  check: 'నిర్ధారించు',
  checked: 'నిర్ధారించబడింది',
};

const mr: Locale = {
  title: 'तुमचे ज्ञान तपासा',
  check: 'पुष्टी करा',
  checked: 'पुष्टी झाली',
};

const ms: Locale = {
  title: 'Semak pengetahuan anda',
  check: 'Sahkan',
  checked: 'Disahkan',
};

const he: Locale = { title: 'בדקו את הידע שלכם', check: 'אישור', checked: 'אושר' };

const pl: Locale = {
  title: 'Sprawdź swoją wiedzę',
  check: 'Potwierdź',
  checked: 'Potwierdzono',
};

const uk: Locale = {
  title: 'Перевір свої знання',
  check: 'Підтвердити',
  checked: 'Підтверджено',
};

const lt: Locale = {
  title: 'Pasitikrink žinias',
  check: 'Patikrinti',
  checked: 'Patikrinta',
};

const lv: Locale = {
  title: 'Pārbaudi savas zināšanas',
  check: 'Pārbaudīt',
  checked: 'Pārbaudīts',
};

const et: Locale = {
  title: 'Kontrolli oma teadmisi',
  check: 'Kontrolli',
  checked: 'Kontrollitud',
};

const be: Locale = { title: 'Правер свае веды', check: 'Праверыць', checked: 'Праверана' };

const ka: Locale = {
  title: 'შეამოწმე შენი ცოდნა',
  check: 'შემოწმება',
  checked: 'შემოწმებულია',
};

const kk: Locale = { title: 'Біліміңді тексер', check: 'Тексеру', checked: 'Тексерілді' };

const qm: Locale = { title: 'Bilgiñni tekşer', check: 'Tekşer', checked: 'Tekşirildi' };

export const data: UiKit_Component<'checkpoint', 'data', DefaultSupportedLanguage['language']> = {
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
