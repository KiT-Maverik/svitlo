import { defineSkillGroup } from '@svitlo/engine/build';

import { diffusion } from './diffusion';
import { gasPressure } from './gasPressure';
import { gasPressureTemperatureRelationship } from './gasPressureTemperatureRelationship';
import { gasPressureVolumeRelationship } from './gasPressureVolumeRelationship';
import { gasVolumeAmountRelationship } from './gasVolumeAmountRelationship';
import { gasVolumeTemperatureRelationship } from './gasVolumeTemperatureRelationship';
import { idealGasModel } from './idealGasModel';
import { particleMotion } from './particleMotion';
import { particleNatureOfMatter } from './particleNatureOfMatter';

export const particleBehavior = defineSkillGroup({
  slug: 'particleBehavior',
  id: '0315ca26-35d1-45e8-8efd-bd940b5e71d6',
  name: {
    ar: 'سلوك الجسيمات',
    be: 'Паводзіны часьцінак',
    bn: 'কণার আচরণ',
    de: 'Teilchenverhalten',
    en: 'Particle Behavior',
    es: 'Comportamiento de las partículas',
    et: 'Osakeste käitumine',
    fr: 'Comportement des particules',
    he: 'התנהגות חלקיקים',
    hi: 'कणों का व्यवहार',
    id: 'Perilaku Partikel',
    it: 'Comportamento delle particelle',
    ja: '粒子のふるまい',
    ka: 'ნაწილაკების ქცევა',
    kk: 'Bölşekterdıñ mınez-qūlqy',
    ko: '입자의 행동',
    lt: 'Dalelių elgsena',
    lv: 'Daļiņu uzvedība',
    mr: 'कणांचे वर्तन',
    ms: 'Tingkah Laku Zarah',
    pl: 'Zachowanie cząstek',
    pt: 'Comportamento das partículas',
    qm: 'Parçacıqlarnıñ davranışı',
    ta: 'துகள்களின் நடத்தை',
    te: 'కణాల ప్రవర్తన',
    tr: 'Tanecik Davranışı',
    uk: 'Поведінка частинок',
    ur: 'ذرّات کا رویّہ',
    vi: 'Hành vi của hạt',
    zh: '粒子的行为',
  },
  skills: {
    diffusion,
    gasPressure,
    gasPressureTemperatureRelationship,
    gasPressureVolumeRelationship,
    gasVolumeAmountRelationship,
    gasVolumeTemperatureRelationship,
    idealGasModel,
    particleMotion,
    particleNatureOfMatter,
  },
  description: {
    methodological:
      'Models of matter distinguish constituent particles, the spaces between them and their collective motion.',
    frontend: {
      ar: 'اكتشف كيف تتحرك الجسيمات الدقيقة وتتفاعل وتكوّن المواد المحيطة بنا.',
      be: 'Даведайся, як малюсенькія часьцінкі рухаюцца, узаемадзейнічаюць і ўтвараюць рэчывы навокал.',
      bn: 'ক্ষুদ্র কণা কীভাবে চলে, মিথস্ক্রিয়া করে এবং চারপাশের বস্তু তৈরি করে, তা জানো।',
      de: 'Entdecke, wie winzige Teilchen sich bewegen, wechselwirken und die Stoffe unserer Umgebung bilden.',
      en: 'Discover how tiny particles move, interact and make up the materials around us.',
      es: 'Descubre cómo se mueven e interactúan las partículas diminutas que forman los materiales.',
      et: 'Saa teada, kuidas tillukesed osakesed liiguvad, üksteist mõjutavad ja meid ümbritsevaid aineid moodustavad.',
      fr: 'Découvre comment les particules minuscules se déplacent, interagissent et constituent les matériaux.',
      he: 'גלו כיצד חלקיקים זעירים נעים, פועלים זה עם זה ובונים את החומרים סביבנו.',
      hi: 'जानें कि सूक्ष्म कण कैसे चलते, परस्पर क्रिया करते और हमारे आसपास की वस्तुएँ बनाते हैं।',
      id: 'Temukan bagaimana partikel kecil bergerak, berinteraksi, dan membentuk bahan di sekitar kita.',
      it: 'Scopri come si muovono e interagiscono le minuscole particelle che compongono i materiali.',
      ja: '小さな粒子が動き、相互作用し、身の回りの物質を作る仕組みを学ぼう。',
      ka: 'გაიგე, როგორ მოძრაობენ და ურთიერთქმედებენ პატარა ნაწილაკები და ქმნიან ნივთიერებებს.',
      kk: 'Ūsaq bölşekterdıñ qozğalyp, özara äserlesıp, ainalamyzdağy zattardy qalai qūraitynyn bıl.',
      ko: '작은 입자가 움직이고 상호작용하며 주변 물질을 이루는 방법을 알아보세요.',
      lt: 'Išsiaiškink, kaip mažytės dalelės juda, sąveikauja ir sudaro aplinkines medžiagas.',
      lv: 'Izzini, kā sīkas daļiņas pārvietojas, mijiedarbojas un veido apkārtējās vielas.',
      mr: 'सूक्ष्म कण कसे हलतात, परस्परसंवाद करतात आणि आसपासचे पदार्थ बनवतात ते जाणून घे.',
      ms: 'Ketahui cara zarah kecil bergerak, berinteraksi dan membentuk bahan di sekitar kita.',
      pl: 'Dowiedz się, jak drobne cząstki poruszają się, oddziałują i tworzą otaczające nas materiały.',
      pt: 'Descubra como partículas minúsculas se movem, interagem e formam os materiais.',
      qm: 'Kiçik parçacıqlar nasıl areket etkenini, bir-birinen tesirleşkenini ve etraftaki maddelerni nasıl teşkil etkenini ögren.',
      ta: 'நுண்ணிய துகள்கள் எவ்வாறு நகர்ந்து, தொடர்புகொண்டு நம்மைச் சுற்றியுள்ள பொருட்களை உருவாக்குகின்றன என்பதை அறி.',
      te: 'చిన్న కణాలు కదిలి, పరస్పరం చర్య చేసి పదార్థాలను ఎలా ఏర్పరుస్తాయో తెలుసుకోండి.',
      tr: 'Küçük taneciklerin nasıl hareket ettiğini, etkileştiğini ve çevremizdeki maddeleri oluşturduğunu öğren.',
      uk: 'Дізнайся, як крихітні частинки рухаються, взаємодіють і утворюють матеріали навколо нас.',
      ur: 'دریافت کریں کہ ننھے ذرّات کیسے حرکت اور باہمی عمل کرتے ہوئے ہمارے گرد مواد بناتے ہیں۔',
      vi: 'Tìm hiểu cách các hạt nhỏ chuyển động, tương tác và cấu tạo vật chất quanh ta.',
      zh: '了解微小粒子如何运动、相互作用并构成周围的物质。',
    },
  },
});
