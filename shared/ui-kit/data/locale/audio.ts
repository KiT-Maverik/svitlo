import type { UiKit_Component_Locale } from './locale.types';

const en = {
  play: 'Play',
  pause: 'Pause',
  seek: 'Playback position',
  mute: 'Mute',
  unmute: 'Unmute',
  volume: 'Volume',
  speed: 'Playback speed',
  offline: 'This audio is not available offline.',
  unavailable: 'This audio is unavailable.',
  playbackError: 'The audio could not be played.',
  retry: 'Try again',
};

export type Audio_Locale = typeof en;

const uk: Audio_Locale = {
  play: 'Відтворити',
  pause: 'Пауза',
  seek: 'Позиція відтворення',
  mute: 'Вимкнути звук',
  unmute: 'Увімкнути звук',
  volume: 'Гучність',
  speed: 'Швидкість відтворення',
  offline: 'Це аудіо недоступне без інтернету.',
  unavailable: 'Це аудіо недоступне.',
  playbackError: 'Не вдалося відтворити аудіо.',
  retry: 'Спробувати ще раз',
};

const zh: Audio_Locale = {
  play: '播放',
  pause: '暂停',
  seek: '播放进度',
  mute: '静音',
  unmute: '取消静音',
  volume: '音量',
  speed: '播放速度',
  offline: '此音频无法离线使用。',
  unavailable: '此音频不可用。',
  playbackError: '无法播放此音频。',
  retry: '重试',
};

const hi: Audio_Locale = {
  play: 'चलाएँ',
  pause: 'रोकें',
  seek: 'प्लेबैक स्थिति',
  mute: 'आवाज़ बंद करें',
  unmute: 'आवाज़ चालू करें',
  volume: 'आवाज़ की तीव्रता',
  speed: 'प्लेबैक गति',
  offline: 'यह ऑडियो ऑफ़लाइन उपलब्ध नहीं है।',
  unavailable: 'यह ऑडियो उपलब्ध नहीं है।',
  playbackError: 'ऑडियो चलाया नहीं जा सका।',
  retry: 'फिर से प्रयास करें',
};

const es: Audio_Locale = {
  play: 'Reproducir',
  pause: 'Pausar',
  seek: 'Posición de reproducción',
  mute: 'Silenciar',
  unmute: 'Activar sonido',
  volume: 'Volumen',
  speed: 'Velocidad de reproducción',
  offline: 'Este audio no está disponible sin conexión.',
  unavailable: 'Este audio no está disponible.',
  playbackError: 'No se pudo reproducir el audio.',
  retry: 'Intentar de nuevo',
};

const ar: Audio_Locale = {
  play: 'تشغيل',
  pause: 'إيقاف مؤقت',
  seek: 'موضع التشغيل',
  mute: 'كتم الصوت',
  unmute: 'إلغاء كتم الصوت',
  volume: 'مستوى الصوت',
  speed: 'سرعة التشغيل',
  offline: 'هذا الصوت غير متاح دون اتصال بالإنترنت.',
  unavailable: 'هذا الصوت غير متاح.',
  playbackError: 'تعذّر تشغيل الصوت.',
  retry: 'حاول مرة أخرى',
};

const fr: Audio_Locale = {
  play: 'Lire',
  pause: 'Mettre en pause',
  seek: 'Position de lecture',
  mute: 'Couper le son',
  unmute: 'Réactiver le son',
  volume: 'Volume',
  speed: 'Vitesse de lecture',
  offline: 'Cet audio n’est pas disponible hors ligne.',
  unavailable: 'Cet audio est indisponible.',
  playbackError: 'Impossible de lire cet audio.',
  retry: 'Réessayer',
};

const bn: Audio_Locale = {
  play: 'চালান',
  pause: 'বিরতি দিন',
  seek: 'প্লেব্যাকের অবস্থান',
  mute: 'শব্দ বন্ধ করুন',
  unmute: 'শব্দ চালু করুন',
  volume: 'শব্দের মাত্রা',
  speed: 'প্লেব্যাকের গতি',
  offline: 'এই অডিওটি অফলাইনে পাওয়া যায় না।',
  unavailable: 'এই অডিওটি পাওয়া যাচ্ছে না।',
  playbackError: 'অডিওটি চালানো যায়নি।',
  retry: 'আবার চেষ্টা করুন',
};

const pt: Audio_Locale = {
  play: 'Reproduzir',
  pause: 'Pausar',
  seek: 'Posição de reprodução',
  mute: 'Silenciar',
  unmute: 'Ativar som',
  volume: 'Volume',
  speed: 'Velocidade de reprodução',
  offline: 'Este áudio não está disponível offline.',
  unavailable: 'Este áudio não está disponível.',
  playbackError: 'Não foi possível reproduzir o áudio.',
  retry: 'Tentar novamente',
};

const ur: Audio_Locale = {
  play: 'چلائیں',
  pause: 'وقفہ دیں',
  seek: 'پلے بیک کی پوزیشن',
  mute: 'آواز بند کریں',
  unmute: 'آواز بحال کریں',
  volume: 'آواز کی سطح',
  speed: 'پلے بیک کی رفتار',
  offline: 'یہ آڈیو آف لائن دستیاب نہیں ہے۔',
  unavailable: 'یہ آڈیو دستیاب نہیں ہے۔',
  playbackError: 'آڈیو چلایا نہیں جا سکا۔',
  retry: 'دوبارہ کوشش کریں',
};

const id: Audio_Locale = {
  play: 'Putar',
  pause: 'Jeda',
  seek: 'Posisi pemutaran',
  mute: 'Bisukan',
  unmute: 'Bunyikan',
  volume: 'Volume',
  speed: 'Kecepatan pemutaran',
  offline: 'Audio ini tidak tersedia saat offline.',
  unavailable: 'Audio ini tidak tersedia.',
  playbackError: 'Audio tidak dapat diputar.',
  retry: 'Coba lagi',
};

const de: Audio_Locale = {
  play: 'Abspielen',
  pause: 'Pausieren',
  seek: 'Wiedergabeposition',
  mute: 'Stummschalten',
  unmute: 'Ton einschalten',
  volume: 'Lautstärke',
  speed: 'Wiedergabegeschwindigkeit',
  offline: 'Diese Audiodatei ist offline nicht verfügbar.',
  unavailable: 'Diese Audiodatei ist nicht verfügbar.',
  playbackError: 'Die Audiodatei konnte nicht abgespielt werden.',
  retry: 'Erneut versuchen',
};

const ja: Audio_Locale = {
  play: '再生',
  pause: '一時停止',
  seek: '再生位置',
  mute: 'ミュート',
  unmute: 'ミュート解除',
  volume: '音量',
  speed: '再生速度',
  offline: 'この音声はオフラインでは利用できません。',
  unavailable: 'この音声は利用できません。',
  playbackError: '音声を再生できませんでした。',
  retry: '再試行',
};

const ko: Audio_Locale = {
  play: '재생',
  pause: '일시정지',
  seek: '재생 위치',
  mute: '음소거',
  unmute: '음소거 해제',
  volume: '음량',
  speed: '재생 속도',
  offline: '이 오디오는 오프라인에서 사용할 수 없습니다.',
  unavailable: '이 오디오를 사용할 수 없습니다.',
  playbackError: '오디오를 재생할 수 없습니다.',
  retry: '다시 시도',
};

const tr: Audio_Locale = {
  play: 'Oynat',
  pause: 'Duraklat',
  seek: 'Oynatma konumu',
  mute: 'Sesi kapat',
  unmute: 'Sesi aç',
  volume: 'Ses düzeyi',
  speed: 'Oynatma hızı',
  offline: 'Bu ses kaydı çevrimdışı kullanılamaz.',
  unavailable: 'Bu ses kaydı kullanılamıyor.',
  playbackError: 'Ses kaydı oynatılamadı.',
  retry: 'Yeniden dene',
};

const vi: Audio_Locale = {
  play: 'Phát',
  pause: 'Tạm dừng',
  seek: 'Vị trí phát',
  mute: 'Tắt tiếng',
  unmute: 'Bật tiếng',
  volume: 'Âm lượng',
  speed: 'Tốc độ phát',
  offline: 'Không thể dùng âm thanh này khi ngoại tuyến.',
  unavailable: 'Âm thanh này không khả dụng.',
  playbackError: 'Không thể phát âm thanh.',
  retry: 'Thử lại',
};

const ta: Audio_Locale = {
  play: 'இயக்கு',
  pause: 'இடைநிறுத்து',
  seek: 'இயக்க நிலை',
  mute: 'ஒலியை முடக்கு',
  unmute: 'ஒலியை இயக்கு',
  volume: 'ஒலி அளவு',
  speed: 'இயக்க வேகம்',
  offline: 'இந்த ஒலி இணையமின்றி கிடைக்காது.',
  unavailable: 'இந்த ஒலி கிடைக்கவில்லை.',
  playbackError: 'ஒலியை இயக்க முடியவில்லை.',
  retry: 'மீண்டும் முயற்சி செய்',
};

const te: Audio_Locale = {
  play: 'ప్లే చేయి',
  pause: 'పాజ్ చేయి',
  seek: 'ప్లేబ్యాక్ స్థానం',
  mute: 'శబ్దాన్ని ఆపివేయి',
  unmute: 'శబ్దాన్ని ఆన్ చేయి',
  volume: 'శబ్ద స్థాయి',
  speed: 'ప్లేబ్యాక్ వేగం',
  offline: 'ఈ ఆడియో ఆఫ్‌లైన్‌లో అందుబాటులో లేదు.',
  unavailable: 'ఈ ఆడియో అందుబాటులో లేదు.',
  playbackError: 'ఆడియోను ప్లే చేయడం సాధ్యం కాలేదు.',
  retry: 'మళ్లీ ప్రయత్నించండి',
};

const mr: Audio_Locale = {
  play: 'प्ले करा',
  pause: 'विराम द्या',
  seek: 'प्लेबॅकची स्थिती',
  mute: 'आवाज बंद करा',
  unmute: 'आवाज सुरू करा',
  volume: 'आवाजाची पातळी',
  speed: 'प्लेबॅकचा वेग',
  offline: 'हा ऑडिओ ऑफलाइन उपलब्ध नाही.',
  unavailable: 'हा ऑडिओ उपलब्ध नाही.',
  playbackError: 'ऑडिओ प्ले करता आला नाही.',
  retry: 'पुन्हा प्रयत्न करा',
};

const ms: Audio_Locale = {
  play: 'Main',
  pause: 'Jeda',
  seek: 'Kedudukan main balik',
  mute: 'Senyapkan',
  unmute: 'Hidupkan bunyi',
  volume: 'Kelantangan',
  speed: 'Kelajuan main balik',
  offline: 'Audio ini tidak tersedia di luar talian.',
  unavailable: 'Audio ini tidak tersedia.',
  playbackError: 'Audio tidak dapat dimainkan.',
  retry: 'Cuba lagi',
};

const he: Audio_Locale = {
  play: 'הפעל',
  pause: 'השהה',
  seek: 'מיקום ההשמעה',
  mute: 'השתק',
  unmute: 'בטל השתקה',
  volume: 'עוצמת קול',
  speed: 'מהירות השמעה',
  offline: 'השמע הזה אינו זמין במצב לא מקוון.',
  unavailable: 'השמע הזה אינו זמין.',
  playbackError: 'לא ניתן להפעיל את השמע.',
  retry: 'לנסות שוב',
};

const pl: Audio_Locale = {
  play: 'Odtwórz',
  pause: 'Wstrzymaj',
  seek: 'Pozycja odtwarzania',
  mute: 'Wycisz',
  unmute: 'Włącz dźwięk',
  volume: 'Głośność',
  speed: 'Prędkość odtwarzania',
  offline: 'To nagranie nie jest dostępne offline.',
  unavailable: 'To nagranie jest niedostępne.',
  playbackError: 'Nie udało się odtworzyć nagrania.',
  retry: 'Spróbuj ponownie',
};

const lt: Audio_Locale = {
  play: 'Leisti',
  pause: 'Pristabdyti',
  seek: 'Atkūrimo vieta',
  mute: 'Nutildyti',
  unmute: 'Įjungti garsą',
  volume: 'Garsumas',
  speed: 'Atkūrimo greitis',
  offline: 'Šis garso įrašas neprieinamas neprisijungus.',
  unavailable: 'Šis garso įrašas neprieinamas.',
  playbackError: 'Nepavyko paleisti garso įrašo.',
  retry: 'Bandyti dar kartą',
};

const lv: Audio_Locale = {
  play: 'Atskaņot',
  pause: 'Pauzēt',
  seek: 'Atskaņošanas pozīcija',
  mute: 'Izslēgt skaņu',
  unmute: 'Ieslēgt skaņu',
  volume: 'Skaļums',
  speed: 'Atskaņošanas ātrums',
  offline: 'Šis audioieraksts nav pieejams bezsaistē.',
  unavailable: 'Šis audioieraksts nav pieejams.',
  playbackError: 'Neizdevās atskaņot audioierakstu.',
  retry: 'Mēģināt vēlreiz',
};

const et: Audio_Locale = {
  play: 'Esita',
  pause: 'Peata',
  seek: 'Esituse asukoht',
  mute: 'Vaigista',
  unmute: 'Lülita heli sisse',
  volume: 'Helitugevus',
  speed: 'Esituskiirus',
  offline: 'See helifail pole võrguühenduseta saadaval.',
  unavailable: 'See helifail pole saadaval.',
  playbackError: 'Helifaili ei õnnestunud esitada.',
  retry: 'Proovi uuesti',
};

const be: Audio_Locale = {
  play: 'Прайграць',
  pause: 'Прыпыніць',
  seek: 'Пазыцыя прайграваньня',
  mute: 'Выключыць гук',
  unmute: 'Уключыць гук',
  volume: 'Гучнасьць',
  speed: 'Хуткасьць прайграваньня',
  offline: 'Гэты аўдыязапіс недаступны бяз інтэрнэту.',
  unavailable: 'Гэты аўдыязапіс недаступны.',
  playbackError: 'Не ўдалося прайграць аўдыязапіс.',
  retry: 'Паспрабаваць яшчэ раз',
};

const ka: Audio_Locale = {
  play: 'დაკვრა',
  pause: 'შეჩერება',
  seek: 'დაკვრის პოზიცია',
  mute: 'ხმის გამორთვა',
  unmute: 'ხმის ჩართვა',
  volume: 'ხმის დონე',
  speed: 'დაკვრის სიჩქარე',
  offline: 'ეს აუდიო ინტერნეტის გარეშე მიუწვდომელია.',
  unavailable: 'ეს აუდიო მიუწვდომელია.',
  playbackError: 'აუდიოს დაკვრა ვერ მოხერხდა.',
  retry: 'ხელახლა ცდა',
};

const kk: Audio_Locale = {
  play: 'Ойнату',
  pause: 'Кідірту',
  seek: 'Ойнату орны',
  mute: 'Дыбысты өшіру',
  unmute: 'Дыбысты қосу',
  volume: 'Дыбыс деңгейі',
  speed: 'Ойнату жылдамдығы',
  offline: 'Бұл аудио интернетсіз қолжетімсіз.',
  unavailable: 'Бұл аудио қолжетімсіз.',
  playbackError: 'Аудионы ойнату мүмкін болмады.',
  retry: 'Қайта көру',
};

const qm: Audio_Locale = {
  play: 'Oynat',
  pause: 'Tınışla',
  seek: 'Oynatma yeri',
  mute: 'Sesni qapat',
  unmute: 'Sesni aç',
  volume: 'Ses seviyesi',
  speed: 'Oynatma tezligi',
  offline: 'Bu ses yazısı internetsiz qullanılamay.',
  unavailable: 'Bu ses yazısı qullanılamay.',
  playbackError: 'Ses yazısını oynatmaq mümkün olmadı.',
  retry: 'Yañıdan deñe',
};

export const audio: UiKit_Component_Locale<Audio_Locale> = {
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
