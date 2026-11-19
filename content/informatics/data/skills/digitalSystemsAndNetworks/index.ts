import { defineSkillDomain } from '@svitlo/engine/build';

import { digitalDeviceComponents } from './digitalDeviceComponents';
import { memoryAndStorage } from './memoryAndStorage';
import { networkModelsAndProtocols } from './networkModelsAndProtocols';
import { networks } from './networks';
import { numeralSystems } from './numeralSystems';
import { operatingSystems } from './operatingSystems';
import { representationAndStorage } from './representationAndStorage';
import { taskExecution } from './taskExecution';

export const digitalSystemsAndNetworks = defineSkillDomain({
  slug: 'digitalSystemsAndNetworks',
  id: 'c57456de-291c-4b19-bd67-bccbcf9bbaa7',
  title: {
    ar: 'الأنظمة الرقمية والشبكات',
    be: 'Лічбавыя сыстэмы і сеткі',
    bn: 'ডিজিটাল ব্যবস্থা ও নেটওয়ার্ক',
    de: 'Digitale Systeme und Netzwerke',
    en: 'Digital Systems and Networks',
    es: 'Sistemas digitales y redes',
    et: 'Digitaalsüsteemid ja võrgud',
    fr: 'Systèmes numériques et réseaux',
    he: 'מערכות דיגיטליות ורשתות',
    hi: 'डिजिटल प्रणालियाँ और नेटवर्क',
    id: 'Sistem digital dan jaringan',
    it: 'Sistemi e reti digitali',
    ja: 'デジタルシステムとネットワーク',
    ka: 'ციფრული სისტემები და ქსელები',
    kk: 'Sifrlyq jüieler men jelıler',
    ko: '디지털 시스템과 네트워크',
    lt: 'Skaitmeninės sistemos ir tinklai',
    lv: 'Digitālās sistēmas un tīkli',
    mr: 'डिजिटल प्रणाली आणि जाळी',
    ms: 'Sistem digital dan rangkaian',
    pl: 'Systemy cyfrowe i sieci',
    pt: 'Sistemas digitais e redes',
    qm: 'Raqamlı sistemalar ve ağlar',
    ta: 'எண்ம அமைப்புகளும் வலையமைப்புகளும்',
    te: 'డిజిటల్ వ్యవస్థలు మరియు నెట్‌వర్క్‌లు',
    tr: 'Dijital sistemler ve ağlar',
    uk: 'Цифрові системи та мережі',
    ur: 'ڈیجیٹل نظام اور نیٹ ورک',
    vi: 'Hệ thống số và mạng',
    zh: '数字系统与网络',
  },
  groups: {
    digitalDeviceComponents,
    memoryAndStorage,
    networkModelsAndProtocols,
    networks,
    numeralSystems,
    operatingSystems,
    representationAndStorage,
    taskExecution,
  },
  description: {
    methodological:
      'Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.',
    frontend: {
      ar: 'اكتشف كيف تعمل أجهزة الحوسبة والمعلومات الرقمية والشبكات معًا.',
      be: 'Даведайся, як вылічальныя прылады, лічбавая інфармацыя й сеткі працуюць разам.',
      bn: 'কম্পিউটিং যন্ত্র, ডিজিটাল তথ্য ও নেটওয়ার্ক কীভাবে একসঙ্গে কাজ করে জানো।',
      de: 'Entdecke, wie Computergeräte, digitale Informationen und Netzwerke zusammenarbeiten.',
      en: 'Discover how computing devices, digital information and networks work together.',
      es: 'Descubre cómo funcionan juntos los dispositivos informáticos, la información digital y las redes.',
      et: 'Uuri, kuidas arvutusseadmed, digitaalne teave ja võrgud koos töötavad.',
      fr: 'Découvre comment les appareils informatiques, les informations numériques et les réseaux fonctionnent ensemble.',
      he: 'גלו כיצד התקני מחשוב, מידע דיגיטלי ורשתות פועלים יחד.',
      hi: 'जानें कि कंप्यूटिंग उपकरण, डिजिटल जानकारी और नेटवर्क मिलकर कैसे काम करते हैं।',
      id: 'Pelajari bagaimana perangkat komputasi, informasi digital, dan jaringan bekerja bersama.',
      it: 'Scopri come dispositivi informatici, informazioni digitali e reti funzionano insieme.',
      ja: 'コンピューター機器、デジタル情報、ネットワークがどう連携するか学ぼう。',
      ka: 'გაიგე, როგორ მუშაობენ ერთად გამოთვლითი მოწყობილობები, ციფრული ინფორმაცია და ქსელები.',
      kk: 'Esepteu qūrylğylary, sifrlyq aqparat jäne jelıler qalai bırge jūmys ısteitının bıl.',
      ko: '컴퓨팅 기기, 디지털 정보, 네트워크가 어떻게 함께 작동하는지 알아보세요.',
      lt: 'Sužinok, kaip kompiuteriniai įrenginiai, skaitmeninė informacija ir tinklai veikia kartu.',
      lv: 'Uzzini, kā skaitļošanas ierīces, digitālā informācija un tīkli darbojas kopā.',
      mr: 'संगणकीय उपकरणे, डिजिटल माहिती आणि जाळी एकत्र कसे कार्य करतात ते जाणून घ्या.',
      ms: 'Terokai cara peranti pengkomputeran, maklumat digital dan rangkaian bekerjasama.',
      pl: 'Odkryj, jak urządzenia komputerowe, informacje cyfrowe i sieci współpracują ze sobą.',
      pt: 'Descubra como dispositivos de computação, informações digitais e redes funcionam juntos.',
      qm: 'Esaplav cihazları, raqamlı malümat ve ağlar bir yerde nasıl çalışqanını ögren.',
      ta: 'கணினி சாதனங்கள், எண்மத் தகவல், வலையமைப்புகள் எவ்வாறு இணைந்து செயல்படுகின்றன என்பதை அறிந்துகொள்.',
      te: 'కంప్యూటింగ్ పరికరాలు, డిజిటల్ సమాచారం, నెట్‌వర్క్‌లు కలిసి ఎలా పనిచేస్తాయో తెలుసుకోండి.',
      tr: 'Bilgi işlem cihazlarının, dijital bilgilerin ve ağların nasıl birlikte çalıştığını keşfet.',
      uk: 'Дізнайся, як обчислювальні пристрої, цифрова інформація й мережі працюють разом.',
      ur: 'جانیں کہ کمپیوٹنگ آلات، ڈیجیٹل معلومات اور نیٹ ورک مل کر کیسے کام کرتے ہیں۔',
      vi: 'Khám phá cách thiết bị tính toán, thông tin số và mạng hoạt động cùng nhau.',
      zh: '了解计算设备、数字信息和网络如何协同工作。',
    },
  },
});
