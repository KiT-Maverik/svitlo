import { defineSkillGroup } from '@svitlo/engine/build';

import { controlRelevantExperimentalConditions } from './controlRelevantExperimentalConditions';
import { evaluateResearchEthics } from './evaluateResearchEthics';
import { explainAPlaceboControl } from './explainAPlaceboControl';
import { explainDoubleBlinding } from './explainDoubleBlinding';
import { explainRandomAssignment } from './explainRandomAssignment';
import { explainSingleBlinding } from './explainSingleBlinding';
import { explainThePurposeOfAControlGroup } from './explainThePurposeOfAControlGroup';
import { identifyADependentVariable } from './identifyADependentVariable';
import { identifyAnIndependentVariable } from './identifyAnIndependentVariable';

export const experimentalDesign = defineSkillGroup({
  slug: 'experimentalDesign',
  id: '7cc7abaa-73ff-4500-b0b1-c18b01b22012',
  name: {
    ar: 'التصميم التجريبي',
    be: 'Плянаваньне экспэрымэнту',
    bn: 'পরীক্ষার নকশা',
    de: 'Versuchsplanung',
    en: 'Experimental Design',
    es: 'Diseño experimental',
    et: 'Katse kavandamine',
    fr: 'Plan expérimental',
    he: 'תכנון ניסוי',
    hi: 'प्रयोग की रूपरेखा',
    id: 'Rancangan eksperimen',
    it: 'Progettazione degli esperimenti',
    ja: '実験計画',
    ka: 'ექსპერიმენტის დაგეგმვა',
    kk: 'Eksperimenttı josparlau',
    ko: '실험 설계',
    lt: 'Eksperimento planavimas',
    lv: 'Eksperimenta plānošana',
    mr: 'प्रयोगाची रचना',
    ms: 'Reka bentuk eksperimen',
    pl: 'Projektowanie eksperymentu',
    pt: 'Planejamento experimental',
    qm: 'Tecribe leyhası',
    ta: 'சோதனை வடிவமைப்பு',
    te: 'ప్రయోగ రూపకల్పన',
    tr: 'Deney tasarımı',
    uk: 'Планування експерименту',
    ur: 'تجرباتی خاکہ بندی',
    vi: 'Thiết kế thí nghiệm',
    zh: '实验设计',
  },
  skills: {
    controlRelevantExperimentalConditions,
    evaluateResearchEthics,
    explainAPlaceboControl,
    explainDoubleBlinding,
    explainRandomAssignment,
    explainSingleBlinding,
    explainThePurposeOfAControlGroup,
    identifyADependentVariable,
    identifyAnIndependentVariable,
  },
  description: {
    methodological:
      'Controlled investigations attempt to isolate explanatory factors while managing confounding, expectations, and ethical constraints. Particular safeguards solve different problems and are not interchangeable.',
    frontend: {
      ar: 'اكتشف كيف تجعل تصميمات البحث المقارنات أكثر موثوقية.',
      be: 'Дасьледуй, як плян дасьледаваньня дапамагае рабіць параўнаньні надзейнейшымі.',
      bn: 'গবেষণার পরিকল্পনা কীভাবে তুলনাকে আরও নির্ভরযোগ্য করে তা জানো।',
      de: 'Entdecke, wie Forschungsdesigns Vergleiche verlässlicher machen.',
      en: 'Discover how research designs can make comparisons more trustworthy.',
      es: 'Descubre cómo los diseños de investigación hacen las comparaciones más fiables.',
      et: 'Uuri, kuidas uurimiskava aitab võrdlusi usaldusväärsemaks muuta.',
      fr: "Découvre comment la conception d'une étude peut rendre les comparaisons plus fiables.",
      he: 'גלו כיצד מערכי מחקר יכולים להפוך השוואות למהימנות יותר.',
      hi: 'जानें कि शोध की योजना तुलनाओं को अधिक विश्वसनीय कैसे बनाती है।',
      id: 'Pelajari bagaimana rancangan penelitian membuat perbandingan lebih dapat dipercaya.',
      it: 'Scopri come la progettazione della ricerca possa rendere più affidabili i confronti.',
      ja: '研究の設計によって比較の信頼性が高まる仕組みを学ぼう。',
      ka: 'შეისწავლე, როგორ ზრდის კვლევის დიზაინი შედარებების სანდოობას.',
      kk: 'Zertteu jobasy salystyrulardy qalai senımdırek etetının zertte.',
      ko: '연구 설계가 비교를 더 신뢰할 수 있게 만드는 방법을 알아보세요.',
      lt: 'Sužinok, kaip tyrimo planas padeda atlikti patikimesnius palyginimus.',
      lv: 'Uzzini, kā pētījuma plāns palīdz veikt ticamākus salīdzinājumus.',
      mr: 'संशोधन रचनेमुळे तुलना अधिक विश्वासार्ह कशी होते ते जाणून घ्या.',
      ms: 'Ketahui cara reka bentuk penyelidikan menjadikan perbandingan lebih boleh dipercayai.',
      pl: 'Poznaj, jak plan badania może zwiększyć wiarygodność porównań.',
      pt: 'Descubra como o desenho da pesquisa torna comparações mais confiáveis.',
      qm: 'Araştıruv planı qıyaslamalarnı nasıl daa işanıçlı etkenini ögren.',
      ta: 'ஆய்வு வடிவமைப்புகள் ஒப்பீடுகளை மேலும் நம்பகமாக்குவது எப்படி என ஆராயுங்கள்.',
      te: 'పరిశోధన రూపకల్పన పోలికలను మరింత నమ్మదగినవిగా ఎలా చేస్తుందో తెలుసుకోండి.',
      tr: 'Araştırma tasarımlarının karşılaştırmaları nasıl daha güvenilir kıldığını keşfet.',
      uk: 'Досліди, як дизайн дослідження допомагає робити порівняння надійнішими.',
      ur: 'جانیں کہ تحقیق کا ڈیزائن تقابل کو زیادہ قابلِ اعتماد کیسے بناتا ہے۔',
      vi: 'Tìm hiểu cách thiết kế nghiên cứu giúp các so sánh đáng tin cậy hơn.',
      zh: '探索研究设计如何使比较结果更加可靠。',
    },
  },
});
