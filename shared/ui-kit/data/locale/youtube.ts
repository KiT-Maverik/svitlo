import type { UiKit_Component } from '@svitlo/engine/content';
import type { DefaultSupportedLanguage } from '@svitlo/engine/localization';

const en = {
  loading: 'Loading video…',
  offline: 'This video needs an internet connection.',
  unavailable: 'This video is unavailable.',
  retry: 'Try again',
};
type Locale = typeof en;

const uk: Locale = {
  loading: 'Завантаження відео…',
  offline: 'Для перегляду відео потрібен інтернет.',
  unavailable: 'Це відео недоступне.',
  retry: 'Спробувати ще раз',
};

const zh: Locale = {
  loading: '正在加载视频…',
  offline: '观看此视频需要网络连接。',
  unavailable: '此视频不可用。',
  retry: '重试',
};

const hi: Locale = {
  loading: 'वीडियो लोड हो रहा है…',
  offline: 'इस वीडियो के लिए इंटरनेट कनेक्शन आवश्यक है।',
  unavailable: 'यह वीडियो उपलब्ध नहीं है।',
  retry: 'फिर से प्रयास करें',
};

const es: Locale = {
  loading: 'Cargando video…',
  offline: 'Este video requiere conexión a Internet.',
  unavailable: 'Este video no está disponible.',
  retry: 'Intentar de nuevo',
};

const ar: Locale = {
  loading: 'جارٍ تحميل الفيديو…',
  offline: 'يتطلب هذا الفيديو اتصالاً بالإنترنت.',
  unavailable: 'هذا الفيديو غير متاح.',
  retry: 'حاول مرة أخرى',
};

const fr: Locale = {
  loading: 'Chargement de la vidéo…',
  offline: 'Cette vidéo nécessite une connexion Internet.',
  unavailable: 'Cette vidéo est indisponible.',
  retry: 'Réessayer',
};

const bn: Locale = {
  loading: 'ভিডিও লোড হচ্ছে…',
  offline: 'এই ভিডিওটি দেখতে ইন্টারনেট সংযোগ প্রয়োজন।',
  unavailable: 'এই ভিডিওটি পাওয়া যাচ্ছে না।',
  retry: 'আবার চেষ্টা করুন',
};

const pt: Locale = {
  loading: 'Carregando vídeo…',
  offline: 'Este vídeo requer conexão com a internet.',
  unavailable: 'Este vídeo não está disponível.',
  retry: 'Tentar novamente',
};

const ur: Locale = {
  loading: 'ویڈیو لوڈ ہو رہی ہے…',
  offline: 'اس ویڈیو کے لیے انٹرنیٹ کنکشن درکار ہے۔',
  unavailable: 'یہ ویڈیو دستیاب نہیں ہے۔',
  retry: 'دوبارہ کوشش کریں',
};

const id: Locale = {
  loading: 'Memuat video…',
  offline: 'Video ini memerlukan koneksi internet.',
  unavailable: 'Video ini tidak tersedia.',
  retry: 'Coba lagi',
};

const de: Locale = {
  loading: 'Video wird geladen…',
  offline: 'Für dieses Video ist eine Internetverbindung erforderlich.',
  unavailable: 'Dieses Video ist nicht verfügbar.',
  retry: 'Erneut versuchen',
};

const ja: Locale = {
  loading: '動画を読み込み中…',
  offline: 'この動画の視聴にはインターネット接続が必要です。',
  unavailable: 'この動画は利用できません。',
  retry: '再試行',
};

const ko: Locale = {
  loading: '동영상 불러오는 중…',
  offline: '이 동영상을 보려면 인터넷 연결이 필요합니다.',
  unavailable: '이 동영상을 사용할 수 없습니다.',
  retry: '다시 시도',
};

const tr: Locale = {
  loading: 'Video yükleniyor…',
  offline: 'Bu videoyu izlemek için internet bağlantısı gerekiyor.',
  unavailable: 'Bu video kullanılamıyor.',
  retry: 'Yeniden dene',
};

const vi: Locale = {
  loading: 'Đang tải video…',
  offline: 'Video này cần có kết nối Internet.',
  unavailable: 'Video này không khả dụng.',
  retry: 'Thử lại',
};

const ta: Locale = {
  loading: 'காணொளி ஏற்றப்படுகிறது…',
  offline: 'இந்தக் காணொளியைப் பார்க்க இணைய இணைப்பு தேவை.',
  unavailable: 'இந்தக் காணொளி கிடைக்கவில்லை.',
  retry: 'மீண்டும் முயற்சி செய்',
};

const te: Locale = {
  loading: 'వీడియో లోడ్ అవుతోంది…',
  offline: 'ఈ వీడియోకు ఇంటర్నెట్ కనెక్షన్ అవసరం.',
  unavailable: 'ఈ వీడియో అందుబాటులో లేదు.',
  retry: 'మళ్లీ ప్రయత్నించండి',
};

const mr: Locale = {
  loading: 'व्हिडिओ लोड होत आहे…',
  offline: 'हा व्हिडिओ पाहण्यासाठी इंटरनेट जोडणी आवश्यक आहे.',
  unavailable: 'हा व्हिडिओ उपलब्ध नाही.',
  retry: 'पुन्हा प्रयत्न करा',
};

const ms: Locale = {
  loading: 'Memuatkan video…',
  offline: 'Video ini memerlukan sambungan internet.',
  unavailable: 'Video ini tidak tersedia.',
  retry: 'Cuba lagi',
};

const he: Locale = {
  loading: 'הסרטון נטען…',
  offline: 'כדי לצפות בסרטון הזה נדרש חיבור לאינטרנט.',
  unavailable: 'הסרטון הזה אינו זמין.',
  retry: 'לנסות שוב',
};

const pl: Locale = {
  loading: 'Wczytywanie filmu…',
  offline: 'Ten film wymaga połączenia z internetem.',
  unavailable: 'Ten film jest niedostępny.',
  retry: 'Spróbuj ponownie',
};

const lt: Locale = {
  loading: 'Įkeliamas vaizdo įrašas…',
  offline: 'Šiam vaizdo įrašui reikia interneto ryšio.',
  unavailable: 'Šis vaizdo įrašas neprieinamas.',
  retry: 'Bandyti dar kartą',
};

const lv: Locale = {
  loading: 'Notiek video ielāde…',
  offline: 'Šim video nepieciešams interneta savienojums.',
  unavailable: 'Šis video nav pieejams.',
  retry: 'Mēģināt vēlreiz',
};

const et: Locale = {
  loading: 'Video laadimine…',
  offline: 'Selle video vaatamiseks on vaja internetiühendust.',
  unavailable: 'See video pole saadaval.',
  retry: 'Proovi uuesti',
};

const be: Locale = {
  loading: 'Загрузка відэа…',
  offline: 'Для гэтага відэа патрэбнае злучэньне з інтэрнэтам.',
  unavailable: 'Гэтае відэа недаступнае.',
  retry: 'Паспрабаваць яшчэ раз',
};

const ka: Locale = {
  loading: 'ვიდეო იტვირთება…',
  offline: 'ამ ვიდეოს სანახავად საჭიროა ინტერნეტკავშირი.',
  unavailable: 'ეს ვიდეო მიუწვდომელია.',
  retry: 'ხელახლა ცდა',
};

const kk: Locale = {
  loading: 'Бейне жүктелуде…',
  offline: 'Бұл бейнені көру үшін интернет байланысы қажет.',
  unavailable: 'Бұл бейне қолжетімсіз.',
  retry: 'Қайта көру',
};

const qm: Locale = {
  loading: 'Video yüklene…',
  offline: 'Bu videonı körmek içün internet bağlantısı kerek.',
  unavailable: 'Bu video körülemey.',
  retry: 'Yañıdan deñe',
};

export const data: UiKit_Component<'youtube', 'data', DefaultSupportedLanguage['language']> = {
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
