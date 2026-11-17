import { defineSkillGroup } from '@svitlo/engine/build';

import { explainDigestionOfNutrients } from './explainDigestionOfNutrients';
import { explainGasExchangeInTheLungs } from './explainGasExchangeInTheLungs';
import { explainLungVentilation } from './explainLungVentilation';
import { explainNutrientAbsorption } from './explainNutrientAbsorption';
import { explainTheHeartsRoleInCirculation } from './explainTheHeartsRoleInCirculation';
import { explainThePassageOfFoodThroughTheDigestiveSystem } from './explainThePassageOfFoodThroughTheDigestiveSystem';
import { explainTheRoleOfTheKidneysInExcretion } from './explainTheRoleOfTheKidneysInExcretion';
import { identifyBreathingChangesDuringPhysicalActivity } from './identifyBreathingChangesDuringPhysicalActivity';

export const maintainingLifeProcesses = defineSkillGroup({
  slug: 'maintainingLifeProcesses',
  id: '135fbe86-2e20-4fdb-9e90-07e3c347fd0b',
  name: {
    ar: 'استمرار العمليات الحيوية',
    be: 'Падтрыманьне жыцьцёвых працэсаў',
    bn: 'জীবনধারণের প্রক্রিয়া বজায় রাখা',
    de: 'Aufrechterhaltung der Lebensvorgänge',
    en: 'Maintaining Life Processes',
    es: 'Mantenimiento de los procesos vitales',
    et: 'Eluprotsesside säilitamine',
    fr: 'Maintien des fonctions vitales',
    he: 'קיום תהליכי החיים',
    hi: 'जीवन प्रक्रियाओं को बनाए रखना',
    id: 'Pemeliharaan Proses Kehidupan',
    it: 'Mantenimento dei processi vitali',
    ja: '生命活動の維持',
    ka: 'სიცოცხლის პროცესების შენარჩუნება',
    kk: 'Tırşılık üderısterın qamtamasyz etu',
    ko: '생명 유지 과정',
    lt: 'Gyvybinių procesų palaikymas',
    lv: 'Dzīvības procesu uzturēšana',
    mr: 'जीवनप्रक्रिया टिकवणे',
    ms: 'Mengekalkan proses kehidupan',
    pl: 'Utrzymywanie procesów życiowych',
    pt: 'Manutenção dos processos vitais',
    qm: 'Yaşayış protsessleriniñ devamını temin etmek',
    ta: 'உயிர் செயல்முறைகளைப் பேணுதல்',
    te: 'జీవ ప్రక్రియలను కొనసాగించడం',
    tr: 'Yaşamsal süreçlerin sürdürülmesi',
    uk: 'Підтримання життєвих процесів',
    ur: 'زندگی کے عمل کو برقرار رکھنا',
    vi: 'Duy trì các quá trình sống',
    zh: '维持生命的过程',
  },
  skills: {
    explainDigestionOfNutrients,
    explainGasExchangeInTheLungs,
    explainLungVentilation,
    explainNutrientAbsorption,
    explainTheHeartsRoleInCirculation,
    explainThePassageOfFoodThroughTheDigestiveSystem,
    explainTheRoleOfTheKidneysInExcretion,
    identifyBreathingChangesDuringPhysicalActivity,
  },
  description: {
    methodological:
      'Nutrients, oxygen, and blood travel along different pathways; their coordinated operation provides cells with resources.',
    frontend: {
      ar: 'ابحث كيف يمد الهضم والتنفس والدورة الدموية خلايا الجسم بما تحتاج إليه.',
      be: 'Дасьледуйце, як страваваньне, дыханьне й кровазварот забясьпечваюць клеткі арганізму.',
      bn: 'পরিপাক, শ্বাসপ্রশ্বাস ও রক্তসঞ্চালন কীভাবে দেহের কোষগুলিকে প্রয়োজনীয় উপাদান জোগায়, তা জানো।',
      de: 'Untersuche, wie Verdauung, Atmung und Blutkreislauf die Körperzellen versorgen.',
      en: "Investigate how digestion, breathing and circulation supply the body's cells.",
      es: 'Investiga cómo la digestión, la respiración y la circulación abastecen las células del cuerpo.',
      et: 'Uuri, kuidas seedimine, hingamine ja vereringe varustavad keharakke vajalike ainetega.',
      fr: 'Étudiez comment la digestion, la respiration et la circulation approvisionnent les cellules du corps.',
      he: 'חקרו כיצד עיכול, נשימה ומחזור הדם מספקים חומרים לתאי הגוף.',
      hi: 'जानें कि पाचन, श्वसन और रक्त संचार शरीर की कोशिकाओं तक आवश्यक पदार्थ कैसे पहुँचाते हैं।',
      id: 'Selidiki bagaimana pencernaan, pernapasan, dan peredaran darah memasok sel-sel tubuh.',
      it: 'Esamina come digestione, respirazione e circolazione riforniscono le cellule del corpo.',
      ja: '消化、呼吸、循環が体の細胞に必要な物質を届ける仕組みを調べましょう。',
      ka: 'შეისწავლეთ, როგორ ამარაგებს საჭმლის მონელება, სუნთქვა და სისხლის მიმოქცევა სხეულის უჯრედებს.',
      kk: 'As qorytu, tynys alu jäne qan ainalymy dene jasuşalaryn qalai qamtamasyz etetının zertteñız.',
      ko: '소화, 호흡, 혈액 순환이 몸의 세포에 필요한 물질을 어떻게 공급하는지 알아보세요.',
      lt: 'Tyrinėkite, kaip virškinimas, kvėpavimas ir kraujotaka aprūpina kūno ląsteles.',
      lv: 'Izpētiet, kā gremošana, elpošana un asinsrite apgādā ķermeņa šūnas.',
      mr: 'पचन, श्वसन आणि रक्ताभिसरण शरीराच्या पेशींना आवश्यक पदार्थ कसे पुरवतात ते अभ्यासा.',
      ms: 'Kaji bagaimana pencernaan, pernafasan dan peredaran darah membekalkan bahan kepada sel badan.',
      pl: 'Zbadaj, jak trawienie, oddychanie i krążenie dostarczają substancji komórkom ciała.',
      pt: 'Investigue como digestão, respiração e circulação abastecem as células do corpo.',
      qm: 'Azıqnı siñdirüv, nefes aluv ve qan aylanuvı beden üceyrelerine kerekli maddelerni nasıl yetkizgenini ögreniñiz.',
      ta: 'செரிமானம், சுவாசம், இரத்த ஓட்டம் ஆகியவை உடல் உயிரணுக்களுக்கு வேண்டியவற்றை எவ்வாறு வழங்குகின்றன என்பதை ஆராயுங்கள்.',
      te: 'జీర్ణక్రియ, శ్వాసక్రియ, రక్త ప్రసరణ శరీర కణాలకు అవసరమైన పదార్థాలను ఎలా అందిస్తాయో పరిశీలించండి.',
      tr: 'Sindirim, solunum ve dolaşımın vücut hücrelerine gerekli maddeleri nasıl sağladığını araştırın.',
      uk: 'Дослідіть, як травлення, дихання та кровообіг постачають клітинам організму необхідні речовини.',
      ur: 'جانیں کہ ہاضمہ، سانس اور خون کی گردش جسم کے خلیوں کو ضروری مادے کیسے پہنچاتے ہیں۔',
      vi: 'Tìm hiểu cách tiêu hóa, hô hấp và tuần hoàn cung cấp chất cần thiết cho tế bào cơ thể.',
      zh: '研究消化、呼吸和血液循环如何为人体细胞提供所需物质。',
    },
  },
});
