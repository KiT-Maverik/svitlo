import { defineSkillGroup } from '@svitlo/engine/build';

import { distinguishIndividualChangesDuringLifeFromPopulationChanges } from './distinguishIndividualChangesDuringLifeFromPopulationChanges';
import { explainCommonAncestryOfSpecies } from './explainCommonAncestryOfSpecies';
import { explainHereditaryVariationAmongIndividuals } from './explainHereditaryVariationAmongIndividuals';
import { explainMechanismsOfEvolutionaryChange } from './explainMechanismsOfEvolutionaryChange';
import { explainNaturalSelection } from './explainNaturalSelection';
import { explainSpeciation } from './explainSpeciation';
import { explainTheTheoryOfEvolution } from './explainTheTheoryOfEvolution';
import { interpretEvidenceOfEvolution } from './interpretEvidenceOfEvolution';

export const evolutionaryChanges = defineSkillGroup({
  slug: 'evolutionaryChanges',
  id: '00e1ba26-ce3a-4517-8d04-c29f54960bc4',
  name: {
    ar: 'التغيرات التطورية',
    be: 'Эвалюцыйныя зьмены',
    bn: 'বিবর্তনীয় পরিবর্তন',
    de: 'Evolutionäre Veränderungen',
    en: 'Evolutionary Changes',
    es: 'Cambios evolutivos',
    et: 'Evolutsioonilised muutused',
    fr: 'Changements évolutifs',
    he: 'שינויים אבולוציוניים',
    hi: 'विकासवादी परिवर्तन',
    id: 'Perubahan evolusioner',
    it: 'Cambiamenti evolutivi',
    ja: '進化による変化',
    ka: 'ევოლუციური ცვლილებები',
    kk: 'Evoliutsialyq özgerıster',
    ko: '진화적 변화',
    lt: 'Evoliuciniai pokyčiai',
    lv: 'Evolucionārās pārmaiņas',
    mr: 'उत्क्रांतीतील बदल',
    ms: 'Perubahan evolusi',
    pl: 'Zmiany ewolucyjne',
    pt: 'Mudanças evolutivas',
    qm: 'Evolütsion deñişmeler',
    ta: 'பரிணாம மாற்றங்கள்',
    te: 'పరిణామ మార్పులు',
    tr: 'Evrimsel değişimler',
    uk: 'Еволюційні зміни',
    ur: 'ارتقائی تبدیلیاں',
    vi: 'Những biến đổi tiến hóa',
    zh: '进化变化',
  },
  skills: {
    distinguishIndividualChangesDuringLifeFromPopulationChanges,
    explainCommonAncestryOfSpecies,
    explainHereditaryVariationAmongIndividuals,
    explainMechanismsOfEvolutionaryChange,
    explainNaturalSelection,
    explainSpeciation,
    explainTheTheoryOfEvolution,
    interpretEvidenceOfEvolution,
  },
  description: {
    methodological:
      'Hereditary variation and differences in reproductive success alter the prevalence of traits in populations across generations; this is not the same as development of an individual organism.',
    frontend: {
      ar: 'اكتشف كيف يتغير التنوع الوراثي داخل الجماعات الحيوية عبر الأجيال.',
      be: 'Даведайся, як спадчынная зьменлівасьць у папуляцыях мяняецца на працягу пакаленьняў.',
      bn: 'প্রজন্মের পর প্রজন্ম ধরে জনসমষ্টিতে বংশগত বৈচিত্র্য কীভাবে বদলায়, তা জানো।',
      de: 'Entdecke, wie sich die erbliche Vielfalt in Populationen über viele Generationen verändert.',
      en: 'Discover how inherited variation changes within populations over generations.',
      es: 'Descubre cómo cambia la variación hereditaria de las poblaciones a lo largo de las generaciones.',
      et: 'Uuri, kuidas populatsioonide pärilik varieeruvus põlvkondade jooksul muutub.',
      fr: 'Découvre comment la variation héréditaire au sein des populations évolue au fil des générations.',
      he: 'גלו כיצד השונות התורשתית באוכלוסיות משתנה לאורך דורות.',
      hi: 'जानें कि आबादियों में वंशानुगत विविधता पीढ़ियों के दौरान कैसे बदलती है।',
      id: 'Temukan bagaimana variasi yang diwariskan dalam populasi berubah dari generasi ke generasi.',
      it: 'Scopri come la variabilità ereditaria cambia nelle popolazioni nel corso delle generazioni.',
      ja: '集団に見られる遺伝的な違いが、世代を経てどう変化するか学ぼう。',
      ka: 'გაიგე, როგორ იცვლება პოპულაციებში მემკვიდრეობითი მრავალფეროვნება თაობების განმავლობაში.',
      kk: 'Populiatsialardağy tūqym qualaityn özgergıştık ūrpaqtar boiy qalai özgeretının bıl.',
      ko: '개체군의 유전적 다양성이 여러 세대에 걸쳐 어떻게 변하는지 알아보세요.',
      lt: 'Sužinok, kaip populiacijų paveldima įvairovė kinta iš kartos į kartą.',
      lv: 'Uzzini, kā populāciju iedzimtā daudzveidība mainās paaudžu gaitā.',
      mr: 'जीवसमूहांमधील आनुवंशिक विविधता पिढ्यान्‌पिढ्या कशी बदलते ते जाणून घ्या.',
      ms: 'Ketahui bagaimana variasi yang diwarisi dalam populasi berubah merentas generasi.',
      pl: 'Dowiedz się, jak dziedziczna zmienność w populacjach zmienia się przez kolejne pokolenia.',
      pt: 'Descubra como a variação hereditária muda nas populações ao longo das gerações.',
      qm: 'Populyatsiyalardaki nesilden nesilge keçken farqlar zaman keçken sayın nasıl deñişkenini ögreniñiz.',
      ta: 'உயிரினக் கூட்டங்களுக்குள் மரபுவழி வேறுபாடுகள் தலைமுறைகளில் எவ்வாறு மாறுகின்றன என்பதை அறியுங்கள்.',
      te: 'జీవుల జనాభాల్లో వారసత్వ వైవిధ్యం తరతరాలకు ఎలా మారుతుందో తెలుసుకోండి.',
      tr: 'Popülasyonlardaki kalıtsal çeşitliliğin nesiller boyunca nasıl değiştiğini keşfet.',
      uk: 'Дізнайся, як спадкова мінливість у популяціях змінюється протягом багатьох поколінь.',
      ur: 'جانیں کہ جانداروں کی آبادیوں میں موروثی تنوع نسلوں کے دوران کیسے بدلتا ہے۔',
      vi: 'Tìm hiểu sự biến dị di truyền trong quần thể thay đổi ra sao qua các thế hệ.',
      zh: '了解遗传变异如何在种群中随着世代更替而发生变化。',
    },
  },
});
