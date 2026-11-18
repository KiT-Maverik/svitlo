import { defineSkillGroup } from '@svitlo/engine/build';

import { classifyAPropositionUsingATruthTable } from './classifyAPropositionUsingATruthTable';
import { constructATruthTable } from './constructATruthTable';
import { distinguishAtomicFromCompoundPropositions } from './distinguishAtomicFromCompoundPropositions';
import { interpretLogicalBiconditional } from './interpretLogicalBiconditional';
import { interpretLogicalConjunction } from './interpretLogicalConjunction';
import { interpretLogicalDisjunction } from './interpretLogicalDisjunction';
import { interpretLogicalNegation } from './interpretLogicalNegation';
import { interpretMaterialImplication } from './interpretMaterialImplication';
import { testDeductiveValidityUsingATruthTable } from './testDeductiveValidityUsingATruthTable';

export const propositionalLogic = defineSkillGroup({
  slug: 'propositionalLogic',
  id: '27fc05a1-0fee-4c85-bcef-0198a9b54055',
  name: {
    ar: 'المنطق القضي',
    be: 'Лёгіка выказваньняў',
    bn: 'বচনগত যুক্তিবিদ্যা',
    de: 'Aussagenlogik',
    en: 'Propositional Logic',
    es: 'Lógica proposicional',
    et: 'Lausearvutus',
    fr: 'Logique propositionnelle',
    he: 'לוגיקה פסוקית',
    hi: 'प्रस्तावनात्मक तर्कशास्त्र',
    id: 'Logika Proposisional',
    it: 'Logica proposizionale',
    ja: '命題論理',
    ka: 'გამონათქვამთა ლოგიკა',
    kk: 'Pıkırler logikasy',
    ko: '명제 논리',
    lt: 'Teiginių logika',
    lv: 'Izteikumu loģika',
    mr: 'विधान तर्कशास्त्र',
    ms: 'Logik Proposisi',
    pl: 'Logika zdań',
    pt: 'Lógica proposicional',
    qm: 'Fikirler mantığı',
    ta: 'கூற்று தருக்கம்',
    te: 'ప్రతిపాదన తర్కం',
    tr: 'Önermeler Mantığı',
    uk: 'Логіка висловлювань',
    ur: 'قضیاتی منطق',
    vi: 'Logic mệnh đề',
    zh: '命题逻辑',
  },
  skills: {
    classifyAPropositionUsingATruthTable,
    constructATruthTable,
    distinguishAtomicFromCompoundPropositions,
    interpretLogicalBiconditional,
    interpretLogicalConjunction,
    interpretLogicalDisjunction,
    interpretLogicalNegation,
    interpretMaterialImplication,
    testDeductiveValidityUsingATruthTable,
  },
  description: {
    methodological:
      'Truth-functional connections between propositions determine the logical properties of compound statements. Symbolic operators and truth tables clarify implications independent of the subject matter used in examples.',
    frontend: {
      ar: 'اكتشف كيف تعمل شروط الصدق للعبارات المرتبطة بروابط منطقية.',
      be: 'Даведайся, пры якіх умовах праўдзівыя выказваньні, злучаныя лёгічнымі апэратарамі.',
      bn: 'যৌক্তিক সংযোগে যুক্ত বক্তব্যের সত্যতার শর্ত কীভাবে কাজ করে তা জানো।',
      de: 'Entdecke, wann Aussagen wahr sind, die durch logische Operatoren verbunden werden.',
      en: 'Discover how truth conditions work for statements joined by logical operators.',
      es: 'Descubre cómo funcionan las condiciones de verdad de enunciados unidos por operadores lógicos.',
      et: 'Uuri, millal on tõesed laused, mis on ühendatud loogiliste tehetega.',
      fr: 'Découvre les conditions de vérité des énoncés reliés par des opérateurs logiques.',
      he: 'גלו כיצד נקבעים תנאי האמת של פסוקים המחוברים בקשרים לוגיים.',
      hi: 'जानें कि तार्किक संयोजकों से जुड़े कथनों की सत्य-शर्तें कैसे काम करती हैं।',
      id: 'Pelajari syarat kebenaran pernyataan yang dihubungkan oleh operator logika.',
      it: 'Scopri come funzionano le condizioni di verità delle proposizioni collegate da operatori logici.',
      ja: '論理演算子で結ばれた命題が真になる条件を探ろう。',
      ka: 'გაიგე, როგორ განისაზღვრება ლოგიკური ოპერატორებით შეერთებული წინადადებების ჭეშმარიტება.',
      kk: 'Logikalyq amaldarmen bailanysqan pıkırlerdıñ şyndyq şarttaryn zertte.',
      ko: '논리 연산자로 연결된 명제의 참 조건을 알아보세요.',
      lt: 'Sužinok, kaip nustatomos loginiais jungtukais sujungtų teiginių teisingumo sąlygos.',
      lv: 'Uzzini, kā darbojas ar loģiskiem operatoriem savienotu izteikumu patiesuma nosacījumi.',
      mr: 'तार्किक संयोजकांनी जोडलेल्या विधानांच्या सत्यतेच्या अटी समजून घ्या.',
      ms: 'Ketahui syarat kebenaran pernyataan yang digabungkan dengan pengendali logik.',
      pl: 'Poznaj warunki prawdziwości zdań połączonych operatorami logicznymi.',
      pt: 'Descubra como funcionam as condições de verdade de afirmações ligadas por operadores lógicos.',
      qm: 'Mantıqlı işaretlernen birleştirilgen fikirlerniñ doğrulıq şartlarını ögren.',
      ta: 'தருக்க இணைப்பிகளால் சேர்ந்த கூற்றுகளின் உண்மை நிபந்தனைகள் எவ்வாறு இயங்குகின்றன என அறி.',
      te: 'తార్కిక ఆపరేటర్లతో కలిసిన ప్రకటనల సత్య షరతులు ఎలా పనిచేస్తాయో తెలుసుకోండి.',
      tr: 'Mantık bağlaçlarıyla birleştirilen önermelerin doğruluk koşullarını keşfet.',
      uk: 'Дізнайся, за яких умов істинні висловлювання, поєднані логічними операторами.',
      ur: 'جانیں کہ منطقی رابطوں سے جڑے بیانات کی صداقت کی شرائط کیسے کام کرتی ہیں۔',
      vi: 'Khám phá điều kiện đúng sai của các mệnh đề nối bằng toán tử logic.',
      zh: '了解通过逻辑运算符连接的陈述，其真假条件如何变化。',
    },
  },
});
