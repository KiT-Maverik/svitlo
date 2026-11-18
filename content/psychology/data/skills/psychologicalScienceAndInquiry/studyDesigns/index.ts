import { defineSkillGroup } from '@svitlo/engine/build';

import { blindingInResearch } from './blindingInResearch';
import { controlledExperiments } from './controlledExperiments';
import { correlationalStudies } from './correlationalStudies';
import { expectationEffects } from './expectationEffects';
import { questionnaireResearch } from './questionnaireResearch';
import { randomAssignment } from './randomAssignment';
import { researchableHypotheses } from './researchableHypotheses';
import { researchInterviews } from './researchInterviews';
import { systematicObservation } from './systematicObservation';

export const studyDesigns = defineSkillGroup({
  slug: 'studyDesigns',
  id: 'f5e74fc5-0e0f-47b7-a305-dd59686daabb',
  name: {
    ar: 'تصاميم البحث',
    be: 'Схемы дасьледаваньняў',
    bn: 'গবেষণার নকশা',
    de: 'Forschungsdesigns',
    en: 'Study Designs',
    es: 'Diseños de investigación',
    et: 'Uurimiskavandid',
    fr: 'Plans de recherche',
    he: 'מערכי מחקר',
    hi: 'अनुसंधान अभिकल्प',
    id: 'Rancangan Penelitian',
    it: 'Disegni di studio',
    ja: '研究デザイン',
    ka: 'კვლევის დიზაინები',
    kk: 'Zertteu jobalary',
    ko: '연구 설계',
    lt: 'Tyrimų planai',
    lv: 'Pētījumu plānojumi',
    mr: 'संशोधन आराखडे',
    ms: 'Reka Bentuk Penyelidikan',
    pl: 'Plany badań',
    pt: 'Desenhos de pesquisa',
    qm: 'Tetqiqat usulları',
    ta: 'ஆராய்ச்சி வடிவமைப்புகள்',
    te: 'పరిశోధన రూపకల్పనలు',
    tr: 'Araştırma Tasarımları',
    uk: 'Дизайни досліджень',
    ur: 'تحقیقی خاکے',
    vi: 'Thiết kế nghiên cứu',
    zh: '研究设计',
  },
  skills: {
    blindingInResearch,
    controlledExperiments,
    correlationalStudies,
    expectationEffects,
    questionnaireResearch,
    randomAssignment,
    researchableHypotheses,
    researchInterviews,
    systematicObservation,
  },
  description: {
    methodological:
      'Different ways of collecting evidence answer different questions and support different levels of causal inference.',
    frontend: {
      ar: 'تعرّف على سبب دعم تصاميم البحث المختلفة لاستنتاجات مختلفة.',
      be: 'Даведайся, чаму розныя схемы дасьледаваньняў дазваляюць рабіць розныя высновы.',
      bn: 'বিভিন্ন গবেষণার নকশা কেন ভিন্ন ধরনের সিদ্ধান্ত সমর্থন করে, তা জানো।',
      de: 'Erfahre, warum verschiedene Forschungsdesigns unterschiedliche Schlussfolgerungen erlauben.',
      en: 'Learn why different research designs support different conclusions.',
      es: 'Aprende por qué los distintos diseños de investigación permiten sacar conclusiones diferentes.',
      et: 'Saa teada, miks erinevad uurimiskavandid võimaldavad teha erinevaid järeldusi.',
      fr: 'Comprends pourquoi différents plans de recherche permettent de tirer des conclusions différentes.',
      he: 'למדו מדוע מערכי מחקר שונים מאפשרים להסיק מסקנות שונות.',
      hi: 'जानें कि अलग-अलग अनुसंधान अभिकल्प अलग तरह के निष्कर्षों का समर्थन क्यों करते हैं।',
      id: 'Pelajari mengapa rancangan penelitian yang berbeda mendukung kesimpulan yang berbeda.',
      it: 'Scopri perché disegni di ricerca diversi consentano conclusioni differenti.',
      ja: '研究デザインによって導き出せる結論がなぜ異なるのか学ぼう。',
      ka: 'გაიგე, რატომ იძლევა კვლევის სხვადასხვა დიზაინი განსხვავებული დასკვნების გამოტანის საშუალებას.',
      kk: 'Ärtürlı zertteu jobalarynyñ nege ärtürlı qorytyndylar jasauğa mümkındık beretının bıl.',
      ko: '연구 설계에 따라 뒷받침할 수 있는 결론이 왜 다른지 알아보세요.',
      lt: 'Sužinok, kodėl skirtingi tyrimų planai leidžia daryti skirtingas išvadas.',
      lv: 'Uzzini, kāpēc dažādi pētījumu plānojumi ļauj izdarīt atšķirīgus secinājumus.',
      mr: 'वेगवेगळ्या संशोधन आराखड्यांमधून वेगवेगळे निष्कर्ष का काढता येतात ते जाणून घ्या.',
      ms: 'Ketahui mengapa reka bentuk penyelidikan yang berbeza menyokong kesimpulan yang berbeza.',
      pl: 'Dowiedz się, dlaczego różne plany badań pozwalają formułować różne wnioski.',
      pt: 'Entenda por que diferentes desenhos de pesquisa permitem conclusões diferentes.',
      qm: 'Çeşit tetqiqat usulları ne içün çeşit neticelerni isbatlay bilgenini ögren.',
      ta: 'வெவ்வேறு ஆராய்ச்சி வடிவமைப்புகள் ஏன் வெவ்வேறு முடிவுகளை ஆதரிக்கின்றன என்பதை அறிந்துகொள்ளுங்கள்.',
      te: 'వేర్వేరు పరిశోధన రూపకల్పనలు వేర్వేరు నిర్ధారణలకు ఎందుకు ఆధారమవుతాయో తెలుసుకోండి.',
      tr: 'Farklı araştırma tasarımlarının neden farklı sonuçları desteklediğini öğren.',
      uk: 'Зрозумій, чому різні дизайни досліджень дають підстави для різних висновків.',
      ur: 'جانیے کہ تحقیق کے مختلف طریقۂ کار مختلف نتائج کی تائید کیوں کرتے ہیں۔',
      vi: 'Tìm hiểu vì sao những thiết kế nghiên cứu khác nhau cho phép rút ra các kết luận khác nhau.',
      zh: '了解为什么不同的研究设计能支持不同类型的结论。',
    },
  },
});
