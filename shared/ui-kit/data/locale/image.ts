import type { DefaultSupportedLanguage } from '@svitlo/engine/localization';

const en = {
  offline: 'This image is not available offline.',
  unavailable: 'This image is unavailable.',
  retry: 'Try again',
};

export type Image_Locale = typeof en;

const uk: Image_Locale = {
  offline: 'Це зображення недоступне без інтернету.',
  unavailable: 'Це зображення недоступне.',
  retry: 'Спробувати ще раз',
};

const zh: Image_Locale = { offline: '此图片无法离线查看。', unavailable: '此图片不可用。', retry: '重试' };

const hi: Image_Locale = {
  offline: 'यह चित्र ऑफ़लाइन उपलब्ध नहीं है।',
  unavailable: 'यह चित्र उपलब्ध नहीं है।',
  retry: 'फिर से प्रयास करें',
};

const es: Image_Locale = {
  offline: 'Esta imagen no está disponible sin conexión.',
  unavailable: 'Esta imagen no está disponible.',
  retry: 'Intentar de nuevo',
};

const ar: Image_Locale = {
  offline: 'هذه الصورة غير متاحة دون اتصال بالإنترنت.',
  unavailable: 'هذه الصورة غير متاحة.',
  retry: 'حاول مرة أخرى',
};

const fr: Image_Locale = {
  offline: 'Cette image n’est pas disponible hors ligne.',
  unavailable: 'Cette image est indisponible.',
  retry: 'Réessayer',
};

const bn: Image_Locale = {
  offline: 'এই ছবিটি অফলাইনে পাওয়া যায় না।',
  unavailable: 'এই ছবিটি পাওয়া যাচ্ছে না।',
  retry: 'আবার চেষ্টা করুন',
};

const pt: Image_Locale = {
  offline: 'Esta imagem não está disponível offline.',
  unavailable: 'Esta imagem não está disponível.',
  retry: 'Tentar novamente',
};

const ur: Image_Locale = {
  offline: 'یہ تصویر آف لائن دستیاب نہیں ہے۔',
  unavailable: 'یہ تصویر دستیاب نہیں ہے۔',
  retry: 'دوبارہ کوشش کریں',
};

const id: Image_Locale = {
  offline: 'Gambar ini tidak tersedia saat offline.',
  unavailable: 'Gambar ini tidak tersedia.',
  retry: 'Coba lagi',
};

const de: Image_Locale = {
  offline: 'Dieses Bild ist offline nicht verfügbar.',
  unavailable: 'Dieses Bild ist nicht verfügbar.',
  retry: 'Erneut versuchen',
};

const ja: Image_Locale = {
  offline: 'この画像はオフラインでは利用できません。',
  unavailable: 'この画像は利用できません。',
  retry: '再試行',
};

const ko: Image_Locale = {
  offline: '이 이미지는 오프라인에서 사용할 수 없습니다.',
  unavailable: '이 이미지를 사용할 수 없습니다.',
  retry: '다시 시도',
};

const tr: Image_Locale = {
  offline: 'Bu görsel çevrimdışı kullanılamaz.',
  unavailable: 'Bu görsel kullanılamıyor.',
  retry: 'Yeniden dene',
};

const vi: Image_Locale = {
  offline: 'Không thể xem hình ảnh này khi ngoại tuyến.',
  unavailable: 'Hình ảnh này không khả dụng.',
  retry: 'Thử lại',
};

const ta: Image_Locale = {
  offline: 'இந்தப் படம் இணையமின்றி கிடைக்காது.',
  unavailable: 'இந்தப் படம் கிடைக்கவில்லை.',
  retry: 'மீண்டும் முயற்சி செய்',
};

const te: Image_Locale = {
  offline: 'ఈ చిత్రం ఆఫ్‌లైన్‌లో అందుబాటులో లేదు.',
  unavailable: 'ఈ చిత్రం అందుబాటులో లేదు.',
  retry: 'మళ్లీ ప్రయత్నించండి',
};

const mr: Image_Locale = {
  offline: 'हे चित्र ऑफलाइन उपलब्ध नाही.',
  unavailable: 'हे चित्र उपलब्ध नाही.',
  retry: 'पुन्हा प्रयत्न करा',
};

const ms: Image_Locale = {
  offline: 'Imej ini tidak tersedia di luar talian.',
  unavailable: 'Imej ini tidak tersedia.',
  retry: 'Cuba lagi',
};

const he: Image_Locale = {
  offline: 'התמונה הזו אינה זמינה במצב לא מקוון.',
  unavailable: 'התמונה הזו אינה זמינה.',
  retry: 'לנסות שוב',
};

const pl: Image_Locale = {
  offline: 'Ten obraz jest niedostępny offline.',
  unavailable: 'Ten obraz jest niedostępny.',
  retry: 'Spróbuj ponownie',
};

const lt: Image_Locale = {
  offline: 'Šis vaizdas neprieinamas neprisijungus.',
  unavailable: 'Šis vaizdas neprieinamas.',
  retry: 'Bandyti dar kartą',
};

const lv: Image_Locale = {
  offline: 'Šis attēls nav pieejams bezsaistē.',
  unavailable: 'Šis attēls nav pieejams.',
  retry: 'Mēģināt vēlreiz',
};

const et: Image_Locale = {
  offline: 'See pilt pole võrguühenduseta saadaval.',
  unavailable: 'See pilt pole saadaval.',
  retry: 'Proovi uuesti',
};

const be: Image_Locale = {
  offline: 'Гэтая выява недаступная бяз інтэрнэту.',
  unavailable: 'Гэтая выява недаступная.',
  retry: 'Паспрабаваць яшчэ раз',
};

const ka: Image_Locale = {
  offline: 'ეს სურათი ინტერნეტის გარეშე მიუწვდომელია.',
  unavailable: 'ეს სურათი მიუწვდომელია.',
  retry: 'ხელახლა ცდა',
};

const kk: Image_Locale = {
  offline: 'Бұл сурет интернетсіз қолжетімсіз.',
  unavailable: 'Бұл сурет қолжетімсіз.',
  retry: 'Қайта көру',
};

const qm: Image_Locale = {
  offline: 'Bu resim internetsiz körülemey.',
  unavailable: 'Bu resim körülemey.',
  retry: 'Yañıdan deñe',
};

export const data: Readonly<Record<DefaultSupportedLanguage['language'], Image_Locale>> = {
  en,
  uk,
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
  lt,
  lv,
  et,
  be,
  ka,
  kk,
  qm,
};
