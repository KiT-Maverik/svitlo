import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { orientation_SkillGroup_Data } from './orientation/orientation.data';
import { figures_SkillGroup_Data } from './figures/figures.data';
import { solids_SkillGroup_Data } from './solids/solids.data';
import { lines_SkillGroup_Data } from './lines/lines.data';
import { angles_SkillGroup_Data } from './angles/angles.data';
import { circles_SkillGroup_Data } from './circles/circles.data';
import { transformations_SkillGroup_Data } from './transformations/transformations.data';
import { perimeter_SkillGroup_Data } from './perimeter/perimeter.data';
import { area_SkillGroup_Data } from './area/area.data';
import { perimeterArea_SkillGroup_Data } from './perimeterArea/perimeterArea.data';

export const geometry_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'geometry',
  id: '5586a9c0-8695-49c2-97b8-ea55899eab69',
  name: {
    en: 'Geometry',
    qm: 'Geometriya',
    lt: 'Geometrija',
    lv: 'Ģeometrija',
    et: 'Geomeetria',
    be: 'Геамэтрыя',
    ka: 'გეომეტრია',
    kk: 'Геометрия',
    zh: '几何',
    hi: 'ज्यामिति',
    es: 'Geometría',
    ar: 'الهندسة',
    fr: 'Géométrie',
    bn: 'জ্যামিতি',
    pt: 'Geometria',
    ur: 'علمِ ہندسہ',
    id: 'Geometri',
    de: 'Geometrie',
    ja: '幾何学',
    ko: '기하학',
    tr: 'Geometri',
    vi: 'Hình học',
    ta: 'வடிவியல்',
    te: 'జ్యామితి',
    mr: 'भूमिती',
    ms: 'Geometri',
    he: 'גאומטריה',
    pl: 'Geometria',
    uk: 'Геометрія',
  },
  groups: {
    orientation: orientation_SkillGroup_Data,
    figures: figures_SkillGroup_Data,
    solids: solids_SkillGroup_Data,
    lines: lines_SkillGroup_Data,
    angles: angles_SkillGroup_Data,
    circles: circles_SkillGroup_Data,
    transformations: transformations_SkillGroup_Data,
    perimeter: perimeter_SkillGroup_Data,
    area: area_SkillGroup_Data,
    perimeterArea: perimeterArea_SkillGroup_Data,
  },
  description: {
    methodological:
      'Spatial relationships, properties of plane figures and solids, lines and angles, geometric transformations, and measurement of perimeter and area.',
    frontend: {
      en: 'Explore positions, lines, flat and solid shapes, angles, movements, perimeter, and area.',
      qm: 'Yerleşüvlerni, sızıqlarnı, tüz ve hacımlı şekillerni, köşelerni, areketlerni, perimetr ve meydannı araştır.',
      zh: '探索位置、直线和平面及立体图形、角、图形变换、周长和面积。',
      hi: 'स्थान, रेखाएँ, सपाट और ठोस आकृतियाँ, कोण, गति, परिमाप और क्षेत्रफल समझें।',
      es: 'Explora posiciones, líneas, figuras planas y cuerpos, ángulos, movimientos, perímetros y áreas.',
      ar: 'استكشف المواقع والخطوط والأشكال المستوية والمجسّمات والزوايا والحركات والمحيط والمساحة.',
      fr: 'Explore les positions, lignes, figures planes et solides, angles, déplacements, périmètres et aires.',
      bn: 'অবস্থান, রেখা, সমতল ও ঘন আকৃতি, কোণ, নড়াচড়া, পরিসীমা ও ক্ষেত্রফল জানো।',
      pt: 'Explore posições, linhas, figuras planas e sólidos, ângulos, movimentos, perímetros e áreas.',
      ur: 'مقام، لکیریں، ہموار اور ٹھوس شکلیں، زاویے، حرکت، محیط اور رقبہ دریافت کریں۔',
      id: 'Jelajahi posisi, garis, bangun datar dan ruang, sudut, perpindahan, keliling, serta luas.',
      de: 'Entdecke Positionen, Linien, ebene Figuren und Körper, Winkel, Bewegungen, Umfang und Fläche.',
      ja: '位置、線、平面図形と立体、角、図形の動き、周りの長さ、面積を学びます。',
      ko: '위치, 선, 평면도형과 입체도형, 각, 이동, 둘레, 넓이를 알아봅니다.',
      tr: 'Konumları, çizgileri, düzlemsel ve katı şekilleri, açıları, hareketleri, çevreyi ve alanı keşfet.',
      vi: 'Khám phá vị trí, đường, hình phẳng, khối, góc, chuyển động, chu vi và diện tích.',
      ta: 'இடங்கள், கோடுகள், தட்டையான மற்றும் திண்ம வடிவங்கள், கோணங்கள், நகர்வுகள், சுற்றளவு, பரப்பளவு ஆகியவற்றை அறி.',
      te: 'స్థానాలు, రేఖలు, సమతల, ఘన ఆకృతులు, కోణాలు, కదలికలు, చుట్టుకొలత, వైశాల్యం తెలుసుకోండి.',
      mr: 'स्थाने, रेषा, सपाट व घन आकृत्या, कोन, हालचाली, परिमिती व क्षेत्रफळ शोधा.',
      ms: 'Terokai kedudukan, garis, bentuk rata dan pepejal, sudut, pergerakan, perimeter serta luas.',
      he: 'גלו מיקומים, קווים, צורות מישוריות וגופים, זוויות, תנועות, היקפים ושטחים.',
      pl: 'Odkrywaj położenia, linie, figury płaskie i bryły, kąty, przekształcenia, obwody i pola.',
      uk: 'Досліджуй розташування, лінії, плоскі й об’ємні фігури, кути, переміщення, периметр і площу.',
      lt: 'Tyrinėk padėtis, linijas, plokščias figūras ir kūnus, kampus, judesius, perimetrą bei plotą.',
      lv: 'Izpēti atrašanās vietas, līnijas, plaknes figūras un ķermeņus, leņķus, kustības, perimetru un laukumu.',
      et: 'Uuri asukohti, jooni, tasapinnalisi kujundeid ja kehi, nurki, liikumist, ümbermõõtu ning pindala.',
      be: "Дасьледуй разьмяшчэньне, лініі, плоскія й аб'ёмныя фігуры, куты, перамяшчэньні, пэрымэтар і плошчу.",
      ka: 'შეისწავლე მდებარეობა, ხაზები, ბრტყელი ფიგურები და სხეულები, კუთხეები, მოძრაობები, პერიმეტრი და ფართობი.',
      kk: 'Орындарды, сызықтарды, жазық фигуралар мен денелерді, бұрыштарды, қозғалысты, периметр мен ауданды зертте.',
    },
  },
});
