import type { UiKit_Component } from '@svitlo/engine/content';
import type { DefaultSupportedLanguage } from '@svitlo/engine/localization';

export type Checkpoint_Locale = { title: string; check: string; checked: string };

const en = { title: 'Check your knowledge', check: 'Check', checked: 'Checked' } satisfies Checkpoint_Locale;

const zh = { title: '检验你的知识', check: '确认', checked: '已确认' } satisfies Checkpoint_Locale;

const hi = { title: 'अपना ज्ञान जाँचें', check: 'जाँचें', checked: 'जाँचा गया' } satisfies Checkpoint_Locale;

const es = {
  title: 'Comprueba lo que sabes',
  check: 'Confirmar',
  checked: 'Confirmado',
} satisfies Checkpoint_Locale;

const ar = { title: 'اختبر معلوماتك', check: 'تأكيد', checked: 'تم التأكيد' } satisfies Checkpoint_Locale;

const fr = {
  title: 'Vérifie tes connaissances',
  check: 'Valider',
  checked: 'Validé',
} satisfies Checkpoint_Locale;

const bn = {
  title: 'তোমার জ্ঞান যাচাই করো',
  check: 'নিশ্চিত করুন',
  checked: 'নিশ্চিত হয়েছে',
} satisfies Checkpoint_Locale;

const pt = {
  title: 'Confira seus conhecimentos',
  check: 'Confirmar',
  checked: 'Confirmado',
} satisfies Checkpoint_Locale;

const ur = { title: 'اپنا علم جانچیں', check: 'تصدیق کریں', checked: 'تصدیق شدہ' } satisfies Checkpoint_Locale;

const id = {
  title: 'Periksa pemahamanmu',
  check: 'Konfirmasi',
  checked: 'Dikonfirmasi',
} satisfies Checkpoint_Locale;

const de = {
  title: 'Prüfe dein Wissen',
  check: 'Bestätigen',
  checked: 'Bestätigt',
} satisfies Checkpoint_Locale;

const ja = { title: '理解度を確認', check: '確認', checked: '確認済み' } satisfies Checkpoint_Locale;

const ko = { title: '이해도 확인', check: '확인', checked: '확인됨' } satisfies Checkpoint_Locale;

const tr = { title: 'Bilgini kontrol et', check: 'Onayla', checked: 'Onaylandı' } satisfies Checkpoint_Locale;

const vi = {
  title: 'Kiểm tra kiến thức',
  check: 'Xác nhận',
  checked: 'Đã xác nhận',
} satisfies Checkpoint_Locale;

const ta = {
  title: 'உங்கள் அறிவைச் சரிபாருங்கள்',
  check: 'உறுதிப்படுத்து',
  checked: 'உறுதிப்படுத்தப்பட்டது',
} satisfies Checkpoint_Locale;

const te = {
  title: 'మీ జ్ఞానాన్ని పరీక్షించుకోండి',
  check: 'నిర్ధారించు',
  checked: 'నిర్ధారించబడింది',
} satisfies Checkpoint_Locale;

const mr = {
  title: 'तुमचे ज्ञान तपासा',
  check: 'पुष्टी करा',
  checked: 'पुष्टी झाली',
} satisfies Checkpoint_Locale;

const ms = {
  title: 'Semak pengetahuan anda',
  check: 'Sahkan',
  checked: 'Disahkan',
} satisfies Checkpoint_Locale;

const he = { title: 'בדקו את הידע שלכם', check: 'אישור', checked: 'אושר' } satisfies Checkpoint_Locale;

const pl = {
  title: 'Sprawdź swoją wiedzę',
  check: 'Potwierdź',
  checked: 'Potwierdzono',
} satisfies Checkpoint_Locale;

const uk = {
  title: 'Перевір свої знання',
  check: 'Підтвердити',
  checked: 'Підтверджено',
} satisfies Checkpoint_Locale;

const lt = {
  title: 'Pasitikrink žinias',
  check: 'Patikrinti',
  checked: 'Patikrinta',
} satisfies Checkpoint_Locale;
const lv = {
  title: 'Pārbaudi savas zināšanas',
  check: 'Pārbaudīt',
  checked: 'Pārbaudīts',
} satisfies Checkpoint_Locale;
const et = {
  title: 'Kontrolli oma teadmisi',
  check: 'Kontrolli',
  checked: 'Kontrollitud',
} satisfies Checkpoint_Locale;
const be = { title: 'Правер свае веды', check: 'Праверыць', checked: 'Праверана' } satisfies Checkpoint_Locale;
const ka = {
  title: 'შეამოწმე შენი ცოდნა',
  check: 'შემოწმება',
  checked: 'შემოწმებულია',
} satisfies Checkpoint_Locale;
const kk = { title: 'Біліміңді тексер', check: 'Тексеру', checked: 'Тексерілді' } satisfies Checkpoint_Locale;

const qm = { title: 'Bilgiñni tekşer', check: 'Tekşer', checked: 'Tekşirildi' } satisfies Checkpoint_Locale;

export const data = {
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
} satisfies UiKit_Component<'checkpoint', 'data', DefaultSupportedLanguage['language']>;
