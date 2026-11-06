import type { DefaultSupportedLanguage } from '@svitlo/engine/localization';

const en = {
  offline: 'This audio is not available offline.',
  unavailable: 'This audio is unavailable.',
  playbackError: 'The audio could not be played.',
  retry: 'Try again',
};

export type AudioMessages = typeof en;
type Locale = AudioMessages;

const uk: Locale = {
  offline: 'Це аудіо недоступне без інтернету.',
  unavailable: 'Це аудіо недоступне.',
  playbackError: 'Не вдалося відтворити аудіо.',
  retry: 'Спробувати ще раз',
};

const zh: Locale = {
  offline: '此音频无法离线使用。',
  unavailable: '此音频不可用。',
  playbackError: '无法播放此音频。',
  retry: '重试',
};

const hi: Locale = {
  offline: 'यह ऑडियो ऑफ़लाइन उपलब्ध नहीं है।',
  unavailable: 'यह ऑडियो उपलब्ध नहीं है।',
  playbackError: 'ऑडियो चलाया नहीं जा सका।',
  retry: 'फिर से प्रयास करें',
};

const es: Locale = {
  offline: 'Este audio no está disponible sin conexión.',
  unavailable: 'Este audio no está disponible.',
  playbackError: 'No se pudo reproducir el audio.',
  retry: 'Intentar de nuevo',
};

const ar: Locale = {
  offline: 'هذا الصوت غير متاح دون اتصال بالإنترنت.',
  unavailable: 'هذا الصوت غير متاح.',
  playbackError: 'تعذّر تشغيل الصوت.',
  retry: 'حاول مرة أخرى',
};

const fr: Locale = {
  offline: 'Cet audio n’est pas disponible hors ligne.',
  unavailable: 'Cet audio est indisponible.',
  playbackError: 'Impossible de lire cet audio.',
  retry: 'Réessayer',
};

const bn: Locale = {
  offline: 'এই অডিওটি অফলাইনে পাওয়া যায় না।',
  unavailable: 'এই অডিওটি পাওয়া যাচ্ছে না।',
  playbackError: 'অডিওটি চালানো যায়নি।',
  retry: 'আবার চেষ্টা করুন',
};

const pt: Locale = {
  offline: 'Este áudio não está disponível offline.',
  unavailable: 'Este áudio não está disponível.',
  playbackError: 'Não foi possível reproduzir o áudio.',
  retry: 'Tentar novamente',
};

const ur: Locale = {
  offline: 'یہ آڈیو آف لائن دستیاب نہیں ہے۔',
  unavailable: 'یہ آڈیو دستیاب نہیں ہے۔',
  playbackError: 'آڈیو چلایا نہیں جا سکا۔',
  retry: 'دوبارہ کوشش کریں',
};

const id: Locale = {
  offline: 'Audio ini tidak tersedia saat offline.',
  unavailable: 'Audio ini tidak tersedia.',
  playbackError: 'Audio tidak dapat diputar.',
  retry: 'Coba lagi',
};

const de: Locale = {
  offline: 'Diese Audiodatei ist offline nicht verfügbar.',
  unavailable: 'Diese Audiodatei ist nicht verfügbar.',
  playbackError: 'Die Audiodatei konnte nicht abgespielt werden.',
  retry: 'Erneut versuchen',
};

const ja: Locale = {
  offline: 'この音声はオフラインでは利用できません。',
  unavailable: 'この音声は利用できません。',
  playbackError: '音声を再生できませんでした。',
  retry: '再試行',
};

const ko: Locale = {
  offline: '이 오디오는 오프라인에서 사용할 수 없습니다.',
  unavailable: '이 오디오를 사용할 수 없습니다.',
  playbackError: '오디오를 재생할 수 없습니다.',
  retry: '다시 시도',
};

const tr: Locale = {
  offline: 'Bu ses kaydı çevrimdışı kullanılamaz.',
  unavailable: 'Bu ses kaydı kullanılamıyor.',
  playbackError: 'Ses kaydı oynatılamadı.',
  retry: 'Yeniden dene',
};

const vi: Locale = {
  offline: 'Không thể dùng âm thanh này khi ngoại tuyến.',
  unavailable: 'Âm thanh này không khả dụng.',
  playbackError: 'Không thể phát âm thanh.',
  retry: 'Thử lại',
};

const ta: Locale = {
  offline: 'இந்த ஒலி இணையமின்றி கிடைக்காது.',
  unavailable: 'இந்த ஒலி கிடைக்கவில்லை.',
  playbackError: 'ஒலியை இயக்க முடியவில்லை.',
  retry: 'மீண்டும் முயற்சி செய்',
};

const te: Locale = {
  offline: 'ఈ ఆడియో ఆఫ్‌లైన్‌లో అందుబాటులో లేదు.',
  unavailable: 'ఈ ఆడియో అందుబాటులో లేదు.',
  playbackError: 'ఆడియోను ప్లే చేయడం సాధ్యం కాలేదు.',
  retry: 'మళ్లీ ప్రయత్నించండి',
};

const mr: Locale = {
  offline: 'हा ऑडिओ ऑफलाइन उपलब्ध नाही.',
  unavailable: 'हा ऑडिओ उपलब्ध नाही.',
  playbackError: 'ऑडिओ प्ले करता आला नाही.',
  retry: 'पुन्हा प्रयत्न करा',
};

const ms: Locale = {
  offline: 'Audio ini tidak tersedia di luar talian.',
  unavailable: 'Audio ini tidak tersedia.',
  playbackError: 'Audio tidak dapat dimainkan.',
  retry: 'Cuba lagi',
};

const he: Locale = {
  offline: 'השמע הזה אינו זמין במצב לא מקוון.',
  unavailable: 'השמע הזה אינו זמין.',
  playbackError: 'לא ניתן להפעיל את השמע.',
  retry: 'לנסות שוב',
};

const pl: Locale = {
  offline: 'To nagranie nie jest dostępne offline.',
  unavailable: 'To nagranie jest niedostępne.',
  playbackError: 'Nie udało się odtworzyć nagrania.',
  retry: 'Spróbuj ponownie',
};

const lt: Locale = {
  offline: 'Šis garso įrašas neprieinamas neprisijungus.',
  unavailable: 'Šis garso įrašas neprieinamas.',
  playbackError: 'Nepavyko paleisti garso įrašo.',
  retry: 'Bandyti dar kartą',
};

const lv: Locale = {
  offline: 'Šis audioieraksts nav pieejams bezsaistē.',
  unavailable: 'Šis audioieraksts nav pieejams.',
  playbackError: 'Neizdevās atskaņot audioierakstu.',
  retry: 'Mēģināt vēlreiz',
};

const et: Locale = {
  offline: 'See helifail pole võrguühenduseta saadaval.',
  unavailable: 'See helifail pole saadaval.',
  playbackError: 'Helifaili ei õnnestunud esitada.',
  retry: 'Proovi uuesti',
};

const be: Locale = {
  offline: 'Гэты аўдыязапіс недаступны бяз інтэрнэту.',
  unavailable: 'Гэты аўдыязапіс недаступны.',
  playbackError: 'Не ўдалося прайграць аўдыязапіс.',
  retry: 'Паспрабаваць яшчэ раз',
};

const ka: Locale = {
  offline: 'ეს აუდიო ინტერნეტის გარეშე მიუწვდომელია.',
  unavailable: 'ეს აუდიო მიუწვდომელია.',
  playbackError: 'აუდიოს დაკვრა ვერ მოხერხდა.',
  retry: 'ხელახლა ცდა',
};

const kk: Locale = {
  offline: 'Бұл аудио интернетсіз қолжетімсіз.',
  unavailable: 'Бұл аудио қолжетімсіз.',
  playbackError: 'Аудионы ойнату мүмкін болмады.',
  retry: 'Қайта көру',
};

const qm: Locale = {
  offline: 'Bu ses yazısı internetsiz qullanılamay.',
  unavailable: 'Bu ses yazısı qullanılamay.',
  playbackError: 'Ses yazısını oynatmaq mümkün olmadı.',
  retry: 'Yañıdan deñe',
};

export const data: Readonly<Record<DefaultSupportedLanguage['language'], AudioMessages>> = {
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
