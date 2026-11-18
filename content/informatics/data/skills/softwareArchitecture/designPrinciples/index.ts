import { defineSkillGroup } from '@svitlo/engine/build';

import { deferUnnecessaryFeaturesYAGNI } from './deferUnnecessaryFeaturesYAGNI';
import { designDependenciesOnContractsDIP } from './designDependenciesOnContractsDIP';
import { extendBehaviorWithoutModifyingTheCoreOCP } from './extendBehaviorWithoutModifyingTheCoreOCP';
import { identifyUnnecessaryDuplicationDRY } from './identifyUnnecessaryDuplicationDRY';
import { isolateASingleResponsibilitySRP } from './isolateASingleResponsibilitySRP';
import { reduceUnnecessaryComplexityKISS } from './reduceUnnecessaryComplexityKISS';
import { separateNarrowInterfacesISP } from './separateNarrowInterfacesISP';
import { verifySubstitutabilityLSP } from './verifySubstitutabilityLSP';

export const designPrinciples = defineSkillGroup({
  slug: 'designPrinciples',
  id: '6fa9da4d-1357-4877-b577-1f45443b58f6',
  name: {
    ar: 'مبادئ التصميم',
    be: 'Прынцыпы праектаваньня',
    bn: 'নকশার নীতি',
    de: 'Entwurfsprinzipien',
    en: 'Design Principles',
    es: 'Principios de diseño',
    et: 'Disainipõhimõtted',
    fr: 'Principes de conception',
    he: 'עקרונות תכנון',
    hi: 'डिज़ाइन सिद्धांत',
    id: 'Prinsip Desain',
    it: 'Principi di progettazione',
    ja: '設計原則',
    ka: 'დიზაინის პრინციპები',
    kk: 'Jobalau qağidalary',
    ko: '설계 원칙',
    lt: 'Projektavimo principai',
    lv: 'Projektēšanas principi',
    mr: 'रचना तत्त्वे',
    ms: 'Prinsip Reka Bentuk',
    pl: 'Zasady projektowania',
    pt: 'Princípios de projeto',
    qm: 'Tasarlav printsipleri',
    ta: 'வடிவமைப்புக் கோட்பாடுகள்',
    te: 'రూపకల్పన సూత్రాలు',
    tr: 'Tasarım İlkeleri',
    uk: 'Принципи проєктування',
    ur: 'ڈیزائن کے اصول',
    vi: 'Nguyên tắc thiết kế',
    zh: '设计原则',
  },
  skills: {
    deferUnnecessaryFeaturesYAGNI,
    designDependenciesOnContractsDIP,
    extendBehaviorWithoutModifyingTheCoreOCP,
    identifyUnnecessaryDuplicationDRY,
    isolateASingleResponsibilitySRP,
    reduceUnnecessaryComplexityKISS,
    separateNarrowInterfacesISP,
    verifySubstitutabilityLSP,
  },
  description: {
    methodological:
      'Quality criteria for software structure: limiting duplication and unnecessary complexity, separating responsibilities, enabling extension, and managing dependencies. Each principle addresses a different reason why a program may need to change.',
    frontend: {
      ar: 'تعلّم المبادئ التي تجعل البرمجيات مفهومة وقابلة للتكيف.',
      be: 'Вывучай прынцыпы, што робяць праграмы зразумелымі й прыстасавальнымі.',
      bn: 'সফটওয়্যার সহজবোধ্য ও পরিবর্তনযোগ্য রাখার নীতিগুলো শেখো।',
      de: 'Lerne Prinzipien kennen, die Software verständlich und anpassbar halten.',
      en: 'Learn principles for keeping software understandable and adaptable.',
      es: 'Aprende principios para mantener el software comprensible y adaptable.',
      et: 'Õpi põhimõtteid, mis hoiavad tarkvara arusaadava ja kohandatavaina.',
      fr: 'Apprends des principes pour garder les logiciels compréhensibles et adaptables.',
      he: 'למדו עקרונות לשמירת תוכנה ברורה וגמישה לשינויים.',
      hi: 'सॉफ़्टवेयर को समझने योग्य और अनुकूलनीय रखने के सिद्धांत सीखें।',
      id: 'Pelajari prinsip agar perangkat lunak mudah dipahami dan dapat disesuaikan.',
      it: 'Impara i principi per mantenere il software comprensibile e adattabile.',
      ja: '理解しやすく変更に対応できるソフトウェアを保つ原則を学ぼう。',
      ka: 'ისწავლე პრინციპები, რომლებიც პროგრამებს გასაგებსა და ადაპტირებადს ხდის.',
      kk: 'Bağdarlamany tüsınıktı ärı özgerıske beiım saqtaityn qağidalardy üiren.',
      ko: '소프트웨어를 이해하기 쉽고 변경에 유연하게 유지하는 원칙을 배워 보세요.',
      lt: 'Mokykis principų, padedančių programinę įrangą išlaikyti suprantamą ir pritaikomą.',
      lv: 'Mācies principus, kas palīdz programmatūrai palikt saprotamai un pielāgojamai.',
      mr: 'सॉफ्टवेअर समजण्यास सोपे व बदलांसाठी अनुकूल ठेवणारी तत्त्वे शिका.',
      ms: 'Pelajari prinsip supaya perisian mudah difahami dan disesuaikan.',
      pl: 'Poznaj zasady tworzenia oprogramowania zrozumiałego i łatwego do dostosowania.',
      pt: 'Aprenda princípios para manter o software compreensível e adaptável.',
      qm: 'Programmalarnı añlaşılır ve deñişüvge uyğun saqlaycaq printsiplerni ögren.',
      ta: 'மென்பொருள் புரிந்துகொள்ள எளிதாகவும் மாற்றத்திற்குத் தகுந்ததாகவும் இருப்பதற்கான கோட்பாடுகளை அறி.',
      te: 'సాఫ్ట్‌వేర్ అర్థమయ్యేలా, మార్పులకు అనుకూలంగా ఉండే సూత్రాలు నేర్చుకోండి.',
      tr: 'Yazılımı anlaşılır ve uyarlanabilir tutan ilkeleri öğren.',
      uk: 'Вивчай принципи, завдяки яким програми залишаються зрозумілими та пристосовними до змін.',
      ur: 'سافٹ ویئر کو قابلِ فہم اور قابلِ تبدیلی رکھنے کے اصول سیکھیں۔',
      vi: 'Học những nguyên tắc giữ phần mềm dễ hiểu và dễ thích ứng.',
      zh: '学习让软件易于理解和适应变化的原则。',
    },
  },
});
