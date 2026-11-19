import { defineSkillDomain } from '@svitlo/engine/build';

import { angles } from './angles';
import { area } from './area';
import { circles } from './circles';
import { figures } from './figures';
import { lines } from './lines';
import { orientation } from './orientation';
import { perimeter } from './perimeter';
import { perimeterArea } from './perimeterArea';
import { solids } from './solids';
import { transformations } from './transformations';

export const geometry = defineSkillDomain({
  slug: 'geometry',
  id: '5586a9c0-8695-49c2-97b8-ea55899eab69',
  title: {
    ar: 'الهندسة',
    be: 'Геамэтрыя',
    bn: 'জ্যামিতি',
    de: 'Geometrie',
    en: 'Geometry',
    es: 'Geometría',
    et: 'Geomeetria',
    fr: 'Géométrie',
    he: 'גאומטריה',
    hi: 'ज्यामिति',
    id: 'Geometri',
    it: 'Geometria',
    ja: '幾何学',
    ka: 'გეომეტრია',
    kk: 'Geometriia',
    ko: '기하학',
    lt: 'Geometrija',
    lv: 'Ģeometrija',
    mr: 'भूमिती',
    ms: 'Geometri',
    pl: 'Geometria',
    pt: 'Geometria',
    qm: 'Geometriya',
    ta: 'வடிவியல்',
    te: 'జ్యామితి',
    tr: 'Geometri',
    uk: 'Геометрія',
    ur: 'علمِ ہندسہ',
    vi: 'Hình học',
    zh: '几何',
  },
  groups: {
    angles,
    area,
    circles,
    figures,
    lines,
    orientation,
    perimeter,
    perimeterArea,
    solids,
    transformations,
  },
  description: {
    methodological:
      'Spatial relationships, properties of plane figures and solids, lines and angles, geometric transformations, and measurement of perimeter and area.',
    frontend: {
      ar: 'استكشف المواقع والخطوط والأشكال المستوية والمجسّمات والزوايا والحركات والمحيط والمساحة.',
      be: "Дасьледуй разьмяшчэньне, лініі, плоскія й аб'ёмныя фігуры, куты, перамяшчэньні, пэрымэтар і плошчу.",
      bn: 'অবস্থান, রেখা, সমতল ও ঘন আকৃতি, কোণ, নড়াচড়া, পরিসীমা ও ক্ষেত্রফল জানো।',
      de: 'Entdecke Positionen, Linien, ebene Figuren und Körper, Winkel, Bewegungen, Umfang und Fläche.',
      en: 'Explore positions, lines, flat and solid shapes, angles, movements, perimeter, and area.',
      es: 'Explora posiciones, líneas, figuras planas y cuerpos, ángulos, movimientos, perímetros y áreas.',
      et: 'Uuri asukohti, jooni, tasapinnalisi kujundeid ja kehi, nurki, liikumist, ümbermõõtu ning pindala.',
      fr: 'Explore les positions, lignes, figures planes et solides, angles, déplacements, périmètres et aires.',
      he: 'גלו מיקומים, קווים, צורות מישוריות וגופים, זוויות, תנועות, היקפים ושטחים.',
      hi: 'स्थान, रेखाएँ, सपाट और ठोस आकृतियाँ, कोण, गति, परिमाप और क्षेत्रफल समझें।',
      id: 'Jelajahi posisi, garis, bangun datar dan ruang, sudut, perpindahan, keliling, serta luas.',
      it: 'Esplora posizioni, linee, figure piane e solide, angoli, movimenti, perimetri e aree.',
      ja: '位置、線、平面図形と立体、角、図形の動き、周りの長さ、面積を学びます。',
      ka: 'შეისწავლე მდებარეობა, ხაზები, ბრტყელი ფიგურები და სხეულები, კუთხეები, მოძრაობები, პერიმეტრი და ფართობი.',
      kk: 'Oryndardy, syzyqtardy, jazyq figuralar men denelerdı, būryştardy, qozğalysty, perimetr men audandy zertte.',
      ko: '위치, 선, 평면도형과 입체도형, 각, 이동, 둘레, 넓이를 알아봅니다.',
      lt: 'Tyrinėk padėtis, linijas, plokščias figūras ir kūnus, kampus, judesius, perimetrą bei plotą.',
      lv: 'Izpēti atrašanās vietas, līnijas, plaknes figūras un ķermeņus, leņķus, kustības, perimetru un laukumu.',
      mr: 'स्थाने, रेषा, सपाट व घन आकृत्या, कोन, हालचाली, परिमिती व क्षेत्रफळ शोधा.',
      ms: 'Terokai kedudukan, garis, bentuk rata dan pepejal, sudut, pergerakan, perimeter serta luas.',
      pl: 'Odkrywaj położenia, linie, figury płaskie i bryły, kąty, przekształcenia, obwody i pola.',
      pt: 'Explore posições, linhas, figuras planas e sólidos, ângulos, movimentos, perímetros e áreas.',
      qm: 'Yerleşüvlerni, sızıqlarnı, tüz ve hacımlı şekillerni, köşelerni, areketlerni, perimetr ve meydannı araştır.',
      ta: 'இடங்கள், கோடுகள், தட்டையான மற்றும் திண்ம வடிவங்கள், கோணங்கள், நகர்வுகள், சுற்றளவு, பரப்பளவு ஆகியவற்றை அறி.',
      te: 'స్థానాలు, రేఖలు, సమతల, ఘన ఆకృతులు, కోణాలు, కదలికలు, చుట్టుకొలత, వైశాల్యం తెలుసుకోండి.',
      tr: 'Konumları, çizgileri, düzlemsel ve katı şekilleri, açıları, hareketleri, çevreyi ve alanı keşfet.',
      uk: 'Досліджуй розташування, лінії, плоскі й об’ємні фігури, кути, переміщення, периметр і площу.',
      ur: 'مقام، لکیریں، ہموار اور ٹھوس شکلیں، زاویے، حرکت، محیط اور رقبہ دریافت کریں۔',
      vi: 'Khám phá vị trí, đường, hình phẳng, khối, góc, chuyển động, chu vi và diện tích.',
      zh: '探索位置、直线和平面及立体图形、角、图形变换、周长和面积。',
    },
  },
});
