import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { conductorsAndInsulators_SkillGroup_Data } from './conductorsAndInsulators/conductorsAndInsulators.data';
import { currentVoltageAndResistance_SkillGroup_Data } from './currentVoltageAndResistance/currentVoltageAndResistance.data';
import { electricAndMagneticFields_SkillGroup_Data } from './electricAndMagneticFields/electricAndMagneticFields.data';
import { electricChargesAndInteractions_SkillGroup_Data } from './electricChargesAndInteractions/electricChargesAndInteractions.data';
import { electricCircuits_SkillGroup_Data } from './electricCircuits/electricCircuits.data';
import { electromagnetsAndInduction_SkillGroup_Data } from './electromagnetsAndInduction/electromagnetsAndInduction.data';
import { magneticEffectsInPhysicalSystems_SkillGroup_Data } from './magneticEffectsInPhysicalSystems/magneticEffectsInPhysicalSystems.data';
import { magneticPropertiesAndInteractions_SkillGroup_Data } from './magneticPropertiesAndInteractions/magneticPropertiesAndInteractions.data';

export const electromagnetism_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'electromagnetism',
  id: '5ca8345e-cfc6-4753-afd0-0143ba112479',
  name: {
    en: 'Electromagnetism',
    qm: 'Elektromagnetizm',
    zh: '电磁学',
    hi: 'विद्युतचुंबकत्व',
    es: 'Electromagnetismo',
    ar: 'الكهرومغناطيسية',
    fr: 'Électromagnétisme',
    bn: 'তড়িৎচুম্বকত্ব',
    pt: 'Eletromagnetismo',
    ur: 'برقی مقناطیسیت',
    id: 'Elektromagnetisme',
    de: 'Elektromagnetismus',
    ja: '電磁気学',
    ko: '전자기학',
    tr: 'Elektromanyetizma',
    vi: 'Điện từ học',
    ta: 'மின்காந்தவியல்',
    te: 'విద్యుదయస్కాంతత్వం',
    mr: 'विद्युतचुंबकत्व',
    ms: 'Elektromagnetisme',
    he: 'אלקטרומגנטיות',
    pl: 'Elektromagnetyzm',
    uk: 'Електромагнетизм',
    lt: 'Elektromagnetizmas',
    lv: 'Elektromagnētisms',
    et: 'Elektromagnetism',
    be: 'Электрамагнетызм',
    ka: 'ელექტრომაგნეტიზმი',
    kk: 'Электромагнетизм',
  },
  groups: {
    conductorsAndInsulators: conductorsAndInsulators_SkillGroup_Data,
    currentVoltageAndResistance: currentVoltageAndResistance_SkillGroup_Data,
    electricAndMagneticFields: electricAndMagneticFields_SkillGroup_Data,
    electricChargesAndInteractions: electricChargesAndInteractions_SkillGroup_Data,
    electricCircuits: electricCircuits_SkillGroup_Data,
    electromagnetsAndInduction: electromagnetsAndInduction_SkillGroup_Data,
    magneticEffectsInPhysicalSystems: magneticEffectsInPhysicalSystems_SkillGroup_Data,
    magneticPropertiesAndInteractions: magneticPropertiesAndInteractions_SkillGroup_Data,
  },
  description: {
    methodological:
      'Electric charges, currents, and magnetic fields describe related interactions; electricity and magnetism share underlying principles but begin with different observations.',
    frontend: {
      en: 'Explore how charges, electric currents and magnetic fields interact.',
      qm: 'Elektrik yükleri, elektrik aqımı ve magnit maydanları bir-birinen nasıl tesirleşkenini araştır.',
      zh: '探索电荷、电流和磁场如何相互作用。',
      hi: 'जानें कि विद्युत आवेश, विद्युत धारा और चुंबकीय क्षेत्र कैसे परस्पर क्रिया करते हैं।',
      es: 'Explora cómo interactúan las cargas, las corrientes eléctricas y los campos magnéticos.',
      ar: 'استكشف كيف تتفاعل الشحنات والتيارات الكهربائية والمجالات المغناطيسية.',
      fr: 'Découvre comment les charges, les courants électriques et les champs magnétiques interagissent.',
      bn: 'বৈদ্যুতিক আধান, বিদ্যুৎপ্রবাহ ও চৌম্বকক্ষেত্র কীভাবে পরস্পর ক্রিয়া করে, তা জানো।',
      pt: 'Explore como cargas, correntes elétricas e campos magnéticos interagem.',
      ur: 'جانیں کہ برقی بار، برقی رو اور مقناطیسی میدان آپس میں کیسے تعامل کرتے ہیں۔',
      id: 'Jelajahi bagaimana muatan, arus listrik, dan medan magnet saling berinteraksi.',
      de: 'Erkunde, wie elektrische Ladungen, Ströme und Magnetfelder zusammenwirken.',
      ja: '電荷、電流、磁場がどのように相互作用するか調べよう。',
      ko: '전하, 전류, 자기장이 어떻게 상호 작용하는지 알아보세요.',
      tr: 'Elektrik yüklerinin, akımların ve manyetik alanların nasıl etkileştiğini keşfet.',
      vi: 'Khám phá cách điện tích, dòng điện và từ trường tương tác.',
      ta: 'மின்னூட்டங்கள், மின்னோட்டங்கள் மற்றும் காந்தப்புலங்கள் எவ்வாறு தொடர்புகொள்கின்றன என்பதை ஆராயுங்கள்.',
      te: 'విద్యుదావేశాలు, విద్యుత్ ప్రవాహాలు, అయస్కాంత క్షేత్రాలు ఎలా పరస్పరం పనిచేస్తాయో తెలుసుకోండి.',
      mr: 'विद्युतभार, विद्युतप्रवाह आणि चुंबकीय क्षेत्र यांचा परस्पर संबंध शोधा.',
      ms: 'Terokai bagaimana cas elektrik, arus dan medan magnet saling berinteraksi.',
      he: 'חקרו כיצד מטענים חשמליים, זרמים ושדות מגנטיים פועלים זה על זה.',
      pl: 'Poznaj wzajemne oddziaływania ładunków, prądów elektrycznych i pól magnetycznych.',
      uk: 'Досліджуй, як взаємодіють електричні заряди, струми й магнітні поля.',
      lt: 'Tyrinėk, kaip sąveikauja elektros krūviai, srovės ir magnetiniai laukai.',
      lv: 'Izpēti, kā mijiedarbojas elektriskie lādiņi, strāvas un magnētiskie lauki.',
      et: 'Uuri, kuidas elektrilaengud, voolud ja magnetväljad vastastikku mõjuvad.',
      be: 'Дасьледуй, як узаемадзейнічаюць электрычныя зарады, токі і магнітныя палі.',
      ka: 'გამოიკვლიე, როგორ ურთიერთქმედებენ ელექტრული მუხტები, დენები და მაგნიტური ველები.',
      kk: 'Электр зарядтары, токтар және магнит өрістері қалай әрекеттесетінін зертте.',
    },
  },
});
