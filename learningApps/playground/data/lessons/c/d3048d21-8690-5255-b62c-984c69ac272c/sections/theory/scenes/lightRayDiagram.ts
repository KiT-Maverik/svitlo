import { howLightMoves_languages, type HowLightMoves_Languages } from '../../../constants';
import { sceneLocalesToData } from '../../../sceneLocales';
import type { ContentBlock_Scene } from '@svitlo/engine/content';

const en = {
  scene: {
    title: 'Trace the path of light',
    description: 'From the source straight to the screen.',
  },
  labels: {
    source: 'Light source',
    direction: 'Direction of light',
    screen: 'Screen',
  },
};

type Locale = typeof en;

const ar: Locale = {
  scene: {
    title: 'تتبّع مسار الضوء',
    description: 'من المصدر إلى الشاشة في خط مستقيم.',
  },
  labels: {
    source: 'مصدر الضوء',
    direction: 'اتجاه انتشار الضوء',
    screen: 'الشاشة',
  },
};

const be: Locale = {
  scene: {
    title: 'Прасачы шлях сьвятла',
    description: 'Ад крыніцы па простай лініі да экрана.',
  },
  labels: {
    source: 'Крыніца сьвятла',
    direction: 'Кірунак сьвятла',
    screen: 'Экран',
  },
};

const bn: Locale = {
  scene: {
    title: 'আলোর পথ অনুসরণ করো',
    description: 'উৎস থেকে সরলরেখায় পর্দা পর্যন্ত।',
  },
  labels: {
    source: 'আলোর উৎস',
    direction: 'আলোর দিক',
    screen: 'পর্দা',
  },
};

const de: Locale = {
  scene: {
    title: 'Verfolge den Weg des Lichts',
    description: 'Von der Quelle geradlinig zum Schirm.',
  },
  labels: {
    source: 'Lichtquelle',
    direction: 'Richtung des Lichts',
    screen: 'Schirm',
  },
};

const es: Locale = {
  scene: {
    title: 'Sigue el recorrido de la luz',
    description: 'De la fuente a la pantalla en línea recta.',
  },
  labels: {
    source: 'Fuente de luz',
    direction: 'Dirección de la luz',
    screen: 'Pantalla',
  },
};

const et: Locale = {
  scene: {
    title: 'Jälgi valguse teekonda',
    description: 'Allikast sirgjooneliselt ekraanini.',
  },
  labels: {
    source: 'Valgusallikas',
    direction: 'Valguse suund',
    screen: 'Ekraan',
  },
};

const fr: Locale = {
  scene: {
    title: 'Suis le trajet de la lumière',
    description: 'De la source à l’écran en ligne droite.',
  },
  labels: {
    source: 'Source lumineuse',
    direction: 'Direction de la lumière',
    screen: 'Écran',
  },
};

const he: Locale = {
  scene: {
    title: 'עקבו אחר מסלול האור',
    description: 'ממקור האור אל המסך בקו ישר.',
  },
  labels: {
    source: 'מקור אור',
    direction: 'כיוון התפשטות האור',
    screen: 'מסך',
  },
};

const hi: Locale = {
  scene: {
    title: 'प्रकाश के पथ का अनुसरण करें',
    description: 'स्रोत से पर्दे तक सीधी रेखा में।',
  },
  labels: {
    source: 'प्रकाश स्रोत',
    direction: 'प्रकाश की दिशा',
    screen: 'पर्दा',
  },
};

const id: Locale = {
  scene: {
    title: 'Telusuri lintasan cahaya',
    description: 'Dari sumber menuju layar dalam garis lurus.',
  },
  labels: {
    source: 'Sumber cahaya',
    direction: 'Arah cahaya',
    screen: 'Layar',
  },
};

const ja: Locale = {
  scene: {
    title: '光の進む道をたどろう',
    description: '光源からスクリーンまで一直線に。',
  },
  labels: {
    source: '光源',
    direction: '光の進む方向',
    screen: 'スクリーン',
  },
};

const ka: Locale = {
  scene: {
    title: 'მიჰყევი სინათლის გზას',
    description: 'წყაროდან ეკრანამდე სწორი ხაზით.',
  },
  labels: {
    source: 'სინათლის წყარო',
    direction: 'სინათლის მიმართულება',
    screen: 'ეკრანი',
  },
};

const kk: Locale = {
  scene: {
    title: 'Жарықтың жолын бақыла',
    description: 'Көзден экранға дейін түзу сызық бойымен.',
  },
  labels: {
    source: 'Жарық көзі',
    direction: 'Жарықтың таралу бағыты',
    screen: 'Экран',
  },
};

const ko: Locale = {
  scene: {
    title: '빛의 경로를 따라가 보세요',
    description: '광원에서 스크린까지 직선으로.',
  },
  labels: {
    source: '광원',
    direction: '빛의 진행 방향',
    screen: '스크린',
  },
};

const lt: Locale = {
  scene: {
    title: 'Sek šviesos kelią',
    description: 'Nuo šaltinio tiesia linija iki ekrano.',
  },
  labels: {
    source: 'Šviesos šaltinis',
    direction: 'Šviesos sklidimo kryptis',
    screen: 'Ekranas',
  },
};

const lv: Locale = {
  scene: {
    title: 'Izseko gaismas ceļu',
    description: 'No avota taisnā līnijā līdz ekrānam.',
  },
  labels: {
    source: 'Gaismas avots',
    direction: 'Gaismas virziens',
    screen: 'Ekrāns',
  },
};

const mr: Locale = {
  scene: {
    title: 'प्रकाशाचा मार्ग पाहा',
    description: 'स्रोतापासून पडद्यापर्यंत सरळ रेषेत.',
  },
  labels: {
    source: 'प्रकाशस्रोत',
    direction: 'प्रकाशाची दिशा',
    screen: 'पडदा',
  },
};

const ms: Locale = {
  scene: {
    title: 'Jejaki laluan cahaya',
    description: 'Dari sumber ke skrin dalam garis lurus.',
  },
  labels: {
    source: 'Sumber cahaya',
    direction: 'Arah cahaya',
    screen: 'Skrin',
  },
};

const pl: Locale = {
  scene: {
    title: 'Prześledź drogę światła',
    description: 'Od źródła prosto do ekranu.',
  },
  labels: {
    source: 'Źródło światła',
    direction: 'Kierunek światła',
    screen: 'Ekran',
  },
};

const pt: Locale = {
  scene: {
    title: 'Acompanhe o caminho da luz',
    description: 'Da fonte até a tela em linha reta.',
  },
  labels: {
    source: 'Fonte de luz',
    direction: 'Direção da luz',
    screen: 'Tela',
  },
};

const qm: Locale = {
  scene: {
    title: 'Yarıqnıñ yolunı izle',
    description: 'Menbadan ekranğa doğru sızıq boyunca.',
  },
  labels: {
    source: 'Yarıq menbası',
    direction: 'Yarıqnıñ yayılma yönelişi',
    screen: 'Ekran',
  },
};

const ta: Locale = {
  scene: {
    title: 'ஒளியின் பாதையைப் பின்தொடருங்கள்',
    description: 'ஒளிமூலத்திலிருந்து திரை வரை நேர்கோட்டில்.',
  },
  labels: {
    source: 'ஒளிமூலம்',
    direction: 'ஒளியின் திசை',
    screen: 'திரை',
  },
};

const te: Locale = {
  scene: {
    title: 'కాంతి మార్గాన్ని అనుసరించండి',
    description: 'కాంతి మూలం నుంచి తెర వరకు సరళరేఖలో.',
  },
  labels: {
    source: 'కాంతి మూలం',
    direction: 'కాంతి దిశ',
    screen: 'తెర',
  },
};

const tr: Locale = {
  scene: {
    title: 'Işığın yolunu takip et',
    description: 'Kaynaktan ekrana düz bir çizgi boyunca.',
  },
  labels: {
    source: 'Işık kaynağı',
    direction: 'Işığın yönü',
    screen: 'Ekran',
  },
};

const uk: Locale = {
  scene: {
    title: 'Світловий промінь',
    description: 'Світло від ліхтарика ліворуч поширюється прямою лінією до екрана праворуч.',
  },
  labels: {
    source: 'Джерело',
    direction: 'Напрямок поширення',
    screen: 'Екран',
  },
};

const ur: Locale = {
  scene: {
    title: 'روشنی کے راستے کا مشاہدہ کریں',
    description: 'منبع سے پردے تک سیدھی لکیر میں۔',
  },
  labels: {
    source: 'روشنی کا منبع',
    direction: 'روشنی کی سمت',
    screen: 'پردہ',
  },
};

const vi: Locale = {
  scene: {
    title: 'Theo dõi đường đi của ánh sáng',
    description: 'Từ nguồn sáng đến màn theo đường thẳng.',
  },
  labels: {
    source: 'Nguồn sáng',
    direction: 'Hướng truyền ánh sáng',
    screen: 'Màn',
  },
};

const zh: Locale = {
  scene: {
    title: '追踪光的路径',
    description: '从光源沿直线传播到屏幕。',
  },
  labels: {
    source: '光源',
    direction: '光的传播方向',
    screen: '屏幕',
  },
};

export const lightRayDiagram_Locale: Record<HowLightMoves_Languages[number], Locale> = {
  en,
  ar,
  be,
  bn,
  de,
  es,
  et,
  fr,
  he,
  hi,
  id,
  ja,
  ka,
  kk,
  ko,
  lt,
  lv,
  mr,
  ms,
  pl,
  pt,
  qm,
  ta,
  te,
  tr,
  uk,
  ur,
  vi,
  zh,
};

export type LightRayDiagram_ContentBlock<ConfigType extends 'definition' | 'data' | 'response'> =
  ContentBlock_Scene<ConfigType, HowLightMoves_Languages, Locale>;

export const lightRayDiagramData = {
  id: 'how-light-moves-scene-ray',
  slug: 'lightRayDiagram' as const,
  locales: sceneLocalesToData(howLightMoves_languages, lightRayDiagram_Locale),
} satisfies LightRayDiagram_ContentBlock<'data'>;
