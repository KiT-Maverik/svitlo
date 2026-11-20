import { defineSkillDomain } from '@svitlo/engine/build';

import { conductorsAndInsulators } from './conductorsAndInsulators';
import { currentVoltageAndResistance } from './currentVoltageAndResistance';
import { electricAndMagneticFields } from './electricAndMagneticFields';
import { electricChargesAndInteractions } from './electricChargesAndInteractions';
import { electricCircuits } from './electricCircuits';
import { electromagnetsAndInduction } from './electromagnetsAndInduction';
import { magneticEffectsInPhysicalSystems } from './magneticEffectsInPhysicalSystems';
import { magneticPropertiesAndInteractions } from './magneticPropertiesAndInteractions';

export const electromagnetism = defineSkillDomain({
  slug: 'electromagnetism',
  id: '5ca8345e-cfc6-4753-afd0-0143ba112479',
  title: {
    ar: 'الكهرومغناطيسية',
    be: 'Электрамагнетызм',
    bn: 'তড়িৎচুম্বকত্ব',
    de: 'Elektromagnetismus',
    en: 'Electromagnetism',
    es: 'Electromagnetismo',
    et: 'Elektromagnetism',
    fr: 'Électromagnétisme',
    he: 'אלקטרומגנטיות',
    hi: 'विद्युतचुंबकत्व',
    id: 'Elektromagnetisme',
    it: 'Elettromagnetismo',
    ja: '電磁気学',
    ka: 'ელექტრომაგნეტიზმი',
    kk: 'Elektromagnetizm',
    ko: '전자기학',
    lt: 'Elektromagnetizmas',
    lv: 'Elektromagnētisms',
    mr: 'विद्युतचुंबकत्व',
    ms: 'Elektromagnetisme',
    pl: 'Elektromagnetyzm',
    pt: 'Eletromagnetismo',
    qm: 'Elektromagnetizm',
    ta: 'மின்காந்தவியல்',
    te: 'విద్యుదయస్కాంతత్వం',
    tr: 'Elektromanyetizma',
    uk: 'Електромагнетизм',
    ur: 'برقی مقناطیسیت',
    vi: 'Điện từ học',
    zh: '电磁学',
  },
  groups: {
    conductorsAndInsulators,
    currentVoltageAndResistance,
    electricAndMagneticFields,
    electricChargesAndInteractions,
    electricCircuits,
    electromagnetsAndInduction,
    magneticEffectsInPhysicalSystems,
    magneticPropertiesAndInteractions,
  },
  description: {
    methodological:
      'Electric charges, currents, and magnetic fields describe related interactions; electricity and magnetism share underlying principles but begin with different observations.',
    frontend: {
      ar: 'استكشف كيف تتفاعل الشحنات والتيارات الكهربائية والمجالات المغناطيسية.',
      be: 'Дасьледуй, як узаемадзейнічаюць электрычныя зарады, токі і магнітныя палі.',
      bn: 'বৈদ্যুতিক আধান, বিদ্যুৎপ্রবাহ ও চৌম্বকক্ষেত্র কীভাবে পরস্পর ক্রিয়া করে, তা জানো।',
      de: 'Erkunde, wie elektrische Ladungen, Ströme und Magnetfelder zusammenwirken.',
      en: 'Explore how charges, electric currents and magnetic fields interact.',
      es: 'Explora cómo interactúan las cargas, las corrientes eléctricas y los campos magnéticos.',
      et: 'Uuri, kuidas elektrilaengud, voolud ja magnetväljad vastastikku mõjuvad.',
      fr: 'Découvre comment les charges, les courants électriques et les champs magnétiques interagissent.',
      he: 'חקרו כיצד מטענים חשמליים, זרמים ושדות מגנטיים פועלים זה על זה.',
      hi: 'जानें कि विद्युत आवेश, विद्युत धारा और चुंबकीय क्षेत्र कैसे परस्पर क्रिया करते हैं।',
      id: 'Jelajahi bagaimana muatan, arus listrik, dan medan magnet saling berinteraksi.',
      it: 'Esplora le interazioni tra cariche, correnti elettriche e campi magnetici.',
      ja: '電荷、電流、磁場がどのように相互作用するか調べよう。',
      ka: 'გამოიკვლიე, როგორ ურთიერთქმედებენ ელექტრული მუხტები, დენები და მაგნიტური ველები.',
      kk: 'Elektr zariadtary, toktar jäne magnit örısterı qalai ärekettesetının zertte.',
      ko: '전하, 전류, 자기장이 어떻게 상호 작용하는지 알아보세요.',
      lt: 'Tyrinėk, kaip sąveikauja elektros krūviai, srovės ir magnetiniai laukai.',
      lv: 'Izpēti, kā mijiedarbojas elektriskie lādiņi, strāvas un magnētiskie lauki.',
      mr: 'विद्युतभार, विद्युतप्रवाह आणि चुंबकीय क्षेत्र यांचा परस्पर संबंध शोधा.',
      ms: 'Terokai bagaimana cas elektrik, arus dan medan magnet saling berinteraksi.',
      pl: 'Poznaj wzajemne oddziaływania ładunków, prądów elektrycznych i pól magnetycznych.',
      pt: 'Explore como cargas, correntes elétricas e campos magnéticos interagem.',
      qm: 'Elektrik yükleri, elektrik aqımı ve magnit maydanları bir-birinen nasıl tesirleşkenini araştır.',
      ta: 'மின்னூட்டங்கள், மின்னோட்டங்கள் மற்றும் காந்தப்புலங்கள் எவ்வாறு தொடர்புகொள்கின்றன என்பதை ஆராயுங்கள்.',
      te: 'విద్యుదావేశాలు, విద్యుత్ ప్రవాహాలు, అయస్కాంత క్షేత్రాలు ఎలా పరస్పరం పనిచేస్తాయో తెలుసుకోండి.',
      tr: 'Elektrik yüklerinin, akımların ve manyetik alanların nasıl etkileştiğini keşfet.',
      uk: 'Досліджуй, як взаємодіють електричні заряди, струми й магнітні поля.',
      ur: 'جانیں کہ برقی بار، برقی رو اور مقناطیسی میدان آپس میں کیسے تعامل کرتے ہیں۔',
      vi: 'Khám phá cách điện tích, dòng điện và từ trường tương tác.',
      zh: '探索电荷、电流和磁场如何相互作用。',
    },
  },
});
