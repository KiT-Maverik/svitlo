import { defineSkillGroup } from '@svitlo/engine/build';

import { applyLogicalAND } from './applyLogicalAND';
import { applyLogicalNOT } from './applyLogicalNOT';
import { applyLogicalOR } from './applyLogicalOR';
import { detectContradictoryRules } from './detectContradictoryRules';
import { evaluateASimpleCondition } from './evaluateASimpleCondition';
import { evaluateCompoundLogicalExpressions } from './evaluateCompoundLogicalExpressions';
import { predictAnOutcomeFromARule } from './predictAnOutcomeFromARule';
import { recognizeAPattern } from './recognizeAPattern';

export const logicAndPatterns = defineSkillGroup({
  slug: 'logicAndPatterns',
  id: '34b0bd60-2c4f-483a-abab-e2cccd6892ec',
  name: {
    ar: 'المنطق والأنماط',
    be: 'Лёгіка й заканамернасьці',
    bn: 'যুক্তি ও ধরন',
    de: 'Logik und Muster',
    en: 'Logic and Patterns',
    es: 'Lógica y patrones',
    et: 'Loogika ja mustrid',
    fr: 'Logique et régularités',
    he: 'לוגיקה ודפוסים',
    hi: 'तर्क और पैटर्न',
    id: 'Logika dan pola',
    it: 'Logica e schemi',
    ja: '論理とパターン',
    ka: 'ლოგიკა და კანონზომიერებები',
    kk: 'Logika jäne zañdylyqtar',
    ko: '논리와 패턴',
    lt: 'Logika ir dėsningumai',
    lv: 'Loģika un likumsakarības',
    mr: 'तर्क आणि नमुने',
    ms: 'Logik dan pola',
    pl: 'Logika i wzorce',
    pt: 'Lógica e padrões',
    qm: 'Mantıq ve qanunlıqlıqlar',
    ta: 'தர்க்கமும் முறைகளும்',
    te: 'తర్కం మరియు నమూనాలు',
    tr: 'Mantık ve örüntüler',
    uk: 'Логіка та закономірності',
    ur: 'منطق اور نمونے',
    vi: 'Logic và mẫu hình',
    zh: '逻辑与模式',
  },
  skills: {
    applyLogicalAND,
    applyLogicalNOT,
    applyLogicalOR,
    detectContradictoryRules,
    evaluateASimpleCondition,
    evaluateCompoundLogicalExpressions,
    predictAnOutcomeFromARule,
    recognizeAPattern,
  },
  description: {
    methodological:
      'Reasoning from explicit rules includes finding patterns, evaluating simple statements, applying independent logical operations, combining conditions, and detecting contradictions. The focus is on truth and consequences, not necessarily executable code.',
    frontend: {
      ar: 'اكتشف كيف تساعد القواعد والأنماط والشروط المنطقية في حل المشكلات.',
      be: 'Даведайся, як правілы, заканамернасьці й лягічныя ўмовы дапамагаюць разьвязваць задачы.',
      bn: 'নিয়ম, ধরন ও যৌক্তিক শর্ত কীভাবে সমস্যা সমাধানে সাহায্য করে তা জানো।',
      de: 'Entdecke, wie Regeln, Muster und logische Bedingungen beim Lösen von Problemen helfen.',
      en: 'Discover how rules, patterns and logical conditions support problem solving.',
      es: 'Descubre cómo las reglas, los patrones y las condiciones lógicas ayudan a resolver problemas.',
      et: 'Avasta, kuidas reeglid, mustrid ja loogilised tingimused aitavad probleeme lahendada.',
      fr: 'Découvre comment les règles, les régularités et les conditions logiques aident à résoudre des problèmes.',
      he: 'גלו כיצד כללים, דפוסים ותנאים לוגיים מסייעים בפתרון בעיות.',
      hi: 'जानें कि नियम, पैटर्न और तार्किक शर्तें समस्याएँ हल करने में कैसे मदद करती हैं।',
      id: 'Temukan bagaimana aturan, pola, dan kondisi logis membantu menyelesaikan masalah.',
      it: 'Scopri come regole, schemi e condizioni logiche aiutano a risolvere i problemi.',
      ja: '規則、パターン、論理条件が問題解決にどう役立つか学ぼう。',
      ka: 'გაიგე, როგორ ეხმარება წესები, კანონზომიერებები და ლოგიკური პირობები ამოცანების ამოხსნას.',
      kk: 'Erejeler, zañdylyqtar men logikalyq şarttar mäselelerdı şeşuge qalai kömektesetının bıl.',
      ko: '규칙, 패턴, 논리적 조건이 문제 해결에 어떻게 도움이 되는지 알아보세요.',
      lt: 'Sužinok, kaip taisyklės, dėsningumai ir loginės sąlygos padeda spręsti problemas.',
      lv: 'Uzzini, kā noteikumi, likumsakarības un loģiski nosacījumi palīdz risināt problēmas.',
      mr: 'नियम, नमुने आणि तार्किक अटी समस्या सोडवण्यात कशा मदत करतात ते जाणून घ्या.',
      ms: 'Terokai cara peraturan, pola dan syarat logik membantu menyelesaikan masalah.',
      pl: 'Odkryj, jak reguły, wzorce i warunki logiczne pomagają rozwiązywać problemy.',
      pt: 'Descubra como regras, padrões e condições lógicas ajudam a resolver problemas.',
      qm: 'Qaideler, qanunlıqlıqlar ve mantıqiy şartlar meselelerni çözmege nasıl yardım etkenini ögren.',
      ta: 'விதிகள், வடிவங்கள், தர்க்க நிபந்தனைகள் பிரச்சினைகளைத் தீர்க்க எவ்வாறு உதவுகின்றன என்பதை அறிந்துகொள்.',
      te: 'నియమాలు, నమూనాలు, తార్కిక షరతులు సమస్యలను పరిష్కరించడంలో ఎలా సహాయపడతాయో తెలుసుకోండి.',
      tr: 'Kuralların, örüntülerin ve mantıksal koşulların problem çözmeye nasıl yardım ettiğini keşfet.',
      uk: "Дізнайся, як правила, закономірності й логічні умови допомагають розв'язувати задачі.",
      ur: 'جانیں کہ اصول، نمونے اور منطقی شرائط مسائل حل کرنے میں کیسے مدد دیتی ہیں۔',
      vi: 'Khám phá cách các quy tắc, mẫu hình và điều kiện logic hỗ trợ giải quyết vấn đề.',
      zh: '探索规则、模式和逻辑条件如何帮助解决问题。',
    },
  },
});
