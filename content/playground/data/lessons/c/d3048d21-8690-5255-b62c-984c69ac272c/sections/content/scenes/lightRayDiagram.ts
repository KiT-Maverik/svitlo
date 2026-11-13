import { defineScene } from '@svitlo/engine/build';

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

export type LightRayDiagramLocale = Locale;

export const lightRayDiagram = defineScene({
  type: 'scene',
  id: '72d22bea-d787-4c6d-9a83-144830c6d325',
  slug: 'lightRayDiagram',
  params: {},
  locale: {
    value: {
      scene: {
        title: {
          en: en.scene.title,
          ar: ar.scene.title,
          be: be.scene.title,
          bn: bn.scene.title,
          de: de.scene.title,
          es: es.scene.title,
          et: et.scene.title,
          fr: fr.scene.title,
          he: he.scene.title,
          hi: hi.scene.title,
          id: id.scene.title,
          ja: ja.scene.title,
          ka: ka.scene.title,
          kk: kk.scene.title,
          ko: ko.scene.title,
          lt: lt.scene.title,
          lv: lv.scene.title,
          mr: mr.scene.title,
          ms: ms.scene.title,
          pl: pl.scene.title,
          pt: pt.scene.title,
          qm: qm.scene.title,
          ta: ta.scene.title,
          te: te.scene.title,
          tr: tr.scene.title,
          uk: uk.scene.title,
          ur: ur.scene.title,
          vi: vi.scene.title,
          zh: zh.scene.title,
        },
        description: {
          en: en.scene.description,
          ar: ar.scene.description,
          be: be.scene.description,
          bn: bn.scene.description,
          de: de.scene.description,
          es: es.scene.description,
          et: et.scene.description,
          fr: fr.scene.description,
          he: he.scene.description,
          hi: hi.scene.description,
          id: id.scene.description,
          ja: ja.scene.description,
          ka: ka.scene.description,
          kk: kk.scene.description,
          ko: ko.scene.description,
          lt: lt.scene.description,
          lv: lv.scene.description,
          mr: mr.scene.description,
          ms: ms.scene.description,
          pl: pl.scene.description,
          pt: pt.scene.description,
          qm: qm.scene.description,
          ta: ta.scene.description,
          te: te.scene.description,
          tr: tr.scene.description,
          uk: uk.scene.description,
          ur: ur.scene.description,
          vi: vi.scene.description,
          zh: zh.scene.description,
        },
      },
      labels: {
        source: {
          en: en.labels.source,
          ar: ar.labels.source,
          be: be.labels.source,
          bn: bn.labels.source,
          de: de.labels.source,
          es: es.labels.source,
          et: et.labels.source,
          fr: fr.labels.source,
          he: he.labels.source,
          hi: hi.labels.source,
          id: id.labels.source,
          ja: ja.labels.source,
          ka: ka.labels.source,
          kk: kk.labels.source,
          ko: ko.labels.source,
          lt: lt.labels.source,
          lv: lv.labels.source,
          mr: mr.labels.source,
          ms: ms.labels.source,
          pl: pl.labels.source,
          pt: pt.labels.source,
          qm: qm.labels.source,
          ta: ta.labels.source,
          te: te.labels.source,
          tr: tr.labels.source,
          uk: uk.labels.source,
          ur: ur.labels.source,
          vi: vi.labels.source,
          zh: zh.labels.source,
        },
        direction: {
          en: en.labels.direction,
          ar: ar.labels.direction,
          be: be.labels.direction,
          bn: bn.labels.direction,
          de: de.labels.direction,
          es: es.labels.direction,
          et: et.labels.direction,
          fr: fr.labels.direction,
          he: he.labels.direction,
          hi: hi.labels.direction,
          id: id.labels.direction,
          ja: ja.labels.direction,
          ka: ka.labels.direction,
          kk: kk.labels.direction,
          ko: ko.labels.direction,
          lt: lt.labels.direction,
          lv: lv.labels.direction,
          mr: mr.labels.direction,
          ms: ms.labels.direction,
          pl: pl.labels.direction,
          pt: pt.labels.direction,
          qm: qm.labels.direction,
          ta: ta.labels.direction,
          te: te.labels.direction,
          tr: tr.labels.direction,
          uk: uk.labels.direction,
          ur: ur.labels.direction,
          vi: vi.labels.direction,
          zh: zh.labels.direction,
        },
        screen: {
          en: en.labels.screen,
          ar: ar.labels.screen,
          be: be.labels.screen,
          bn: bn.labels.screen,
          de: de.labels.screen,
          es: es.labels.screen,
          et: et.labels.screen,
          fr: fr.labels.screen,
          he: he.labels.screen,
          hi: hi.labels.screen,
          id: id.labels.screen,
          ja: ja.labels.screen,
          ka: ka.labels.screen,
          kk: kk.labels.screen,
          ko: ko.labels.screen,
          lt: lt.labels.screen,
          lv: lv.labels.screen,
          mr: mr.labels.screen,
          ms: ms.labels.screen,
          pl: pl.labels.screen,
          pt: pt.labels.screen,
          qm: qm.labels.screen,
          ta: ta.labels.screen,
          te: te.labels.screen,
          tr: tr.labels.screen,
          uk: uk.labels.screen,
          ur: ur.labels.screen,
          vi: vi.labels.screen,
          zh: zh.labels.screen,
        },
      },
    },
  },
});
