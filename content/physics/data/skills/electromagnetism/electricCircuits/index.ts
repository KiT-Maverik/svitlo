import { defineSkillGroup } from '@svitlo/engine/build';

import { explainAnOpenCircuit } from './explainAnOpenCircuit';
import { explainCurrentBalanceAtACircuitNode } from './explainCurrentBalanceAtACircuitNode';
import { explainParallelConnectionsOfElectricCircuitComponents } from './explainParallelConnectionsOfElectricCircuitComponents';
import { explainSeriesConnectionsOfElectricCircuitComponents } from './explainSeriesConnectionsOfElectricCircuitComponents';
import { identifyAConsumerOfElectricalEnergy } from './identifyAConsumerOfElectricalEnergy';
import { identifyAnElectricalPowerSource } from './identifyAnElectricalPowerSource';
import { identifyTheFunctionOfASwitch } from './identifyTheFunctionOfASwitch';
import { predictTheEffectOfASwitchInACircuit } from './predictTheEffectOfASwitchInACircuit';
import { recognizeAClosedElectricCircuit } from './recognizeAClosedElectricCircuit';

export const electricCircuits = defineSkillGroup({
  slug: 'electricCircuits',
  id: 'd5d2a4a4-8869-4481-a1b1-b72ada3ac6bb',
  name: {
    ar: 'الدوائر الكهربائية',
    be: 'Электрычныя колы',
    bn: 'বৈদ্যুতিক বর্তনী',
    de: 'Elektrische Stromkreise',
    en: 'Electric Circuits',
    es: 'Circuitos eléctricos',
    et: 'Vooluringid',
    fr: 'Circuits électriques',
    he: 'מעגלים חשמליים',
    hi: 'विद्युत परिपथ',
    id: 'Rangkaian listrik',
    it: 'Circuiti elettrici',
    ja: '電気回路',
    ka: 'ელექტრული წრედები',
    kk: 'Elektr tızbekterı',
    ko: '전기 회로',
    lt: 'Elektros grandinės',
    lv: 'Elektriskās ķēdes',
    mr: 'विद्युतपरिपथ',
    ms: 'Litar elektrik',
    pl: 'Obwody elektryczne',
    pt: 'Circuitos elétricos',
    qm: 'Elektrik devreleri',
    ta: 'மின்சுற்றுகள்',
    te: 'విద్యుత్ వలయాలు',
    tr: 'Elektrik devreleri',
    uk: 'Електричні кола',
    ur: 'برقی سرکٹس',
    vi: 'Mạch điện',
    zh: '电路',
  },
  skills: {
    explainAnOpenCircuit,
    explainCurrentBalanceAtACircuitNode,
    explainParallelConnectionsOfElectricCircuitComponents,
    explainSeriesConnectionsOfElectricCircuitComponents,
    identifyAConsumerOfElectricalEnergy,
    identifyAnElectricalPowerSource,
    identifyTheFunctionOfASwitch,
    predictTheEffectOfASwitchInACircuit,
    recognizeAClosedElectricCircuit,
  },
  description: {
    methodological:
      'An electric circuit needs a conducting path, a source, and components whose interactions determine the operation of a safe model.',
    frontend: {
      ar: 'اكتشف كيف تعمل المصادر والمفاتيح والأحمال معًا في الدوائر البسيطة.',
      be: 'Дасьледуй, як крыніцы, выключальнікі і спажыўцы працуюць разам у простых колах.',
      bn: 'সহজ বর্তনীতে উৎস, সুইচ ও বিদ্যুৎ ব্যবহারকারী যন্ত্র কীভাবে কাজ করে, তা জানো।',
      de: 'Entdecke, wie Quellen, Schalter und Verbraucher in einfachen Stromkreisen zusammenarbeiten.',
      en: 'Discover how sources, switches and loads work together in simple circuits.',
      es: 'Descubre cómo fuentes, interruptores y receptores funcionan juntos en circuitos sencillos.',
      et: 'Uuri, kuidas allikad, lülitid ja tarbijad lihtsates vooluringides koos toimivad.',
      fr: 'Découvre comment sources, interrupteurs et récepteurs fonctionnent ensemble dans des circuits simples.',
      he: 'גלו כיצד מקורות מתח, מפסקים וצרכנים פועלים יחד במעגלים פשוטים.',
      hi: 'जानें कि सरल परिपथ में स्रोत, स्विच और विद्युत उपभोक्ता कैसे साथ काम करते हैं।',
      id: 'Jelajahi bagaimana sumber, sakelar, dan beban bekerja sama dalam rangkaian sederhana.',
      it: 'Scopri come generatori, interruttori e utilizzatori funzionano insieme nei circuiti semplici.',
      ja: '簡単な回路で電源、スイッチ、負荷がどう働くか調べよう。',
      ka: 'გამოიკვლიე, როგორ მუშაობენ ერთად წყაროები, ჩამრთველები და მომხმარებლები მარტივ წრედებში.',
      kk: 'Qarapaiym tızbekterde közder, ajyratqyştar men tūtynuşylar qalai bırge jūmys ısteitının zertte.',
      ko: '간단한 회로에서 전원, 스위치, 부하가 어떻게 함께 작동하는지 알아보세요.',
      lt: 'Tyrinėk, kaip šaltiniai, jungikliai ir imtuvai veikia paprastose grandinėse.',
      lv: 'Izpēti, kā avoti, slēdži un patērētāji darbojas vienkāršās ķēdēs.',
      mr: 'साध्या परिपथात स्रोत, स्विच आणि विद्युत उपकरणे कशी एकत्र कार्य करतात ते शोधा.',
      ms: 'Terokai bagaimana sumber, suis dan beban berfungsi bersama dalam litar ringkas.',
      pl: 'Poznaj, jak źródła, przełączniki i odbiorniki współdziałają w prostych obwodach.',
      pt: 'Descubra como fontes, interruptores e cargas funcionam juntos em circuitos simples.',
      qm: 'Elektrik menbaları, açqıçlar ve sarf eticiler sade devrelerde beraber nasıl çalışqanını araştır.',
      ta: 'எளிய மின்சுற்றுகளில் மின்மூலங்கள், சுவிட்சுகள், சுமைகள் எவ்வாறு சேர்ந்து இயங்குகின்றன என்பதை ஆராயுங்கள்.',
      te: 'సరళ విద్యుత్ వలయాల్లో మూలాలు, స్విచ్‌లు, విద్యుత్ లోడ్‌లు కలిసి ఎలా పనిచేస్తాయో తెలుసుకోండి.',
      tr: 'Basit devrelerde kaynakların, anahtarların ve yüklerin birlikte nasıl çalıştığını keşfet.',
      uk: 'Досліджуй, як джерела, вимикачі та споживачі працюють разом у простих колах.',
      ur: 'جانیں کہ سادہ سرکٹ میں ذرائع، سوئچ اور برقی بوجھ مل کر کیسے کام کرتے ہیں۔',
      vi: 'Khám phá cách nguồn điện, công tắc và tải hoạt động cùng nhau trong mạch đơn giản.',
      zh: '探索电源、开关和用电器如何在简单电路中共同工作。',
    },
  },
});
