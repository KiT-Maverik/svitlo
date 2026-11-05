import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { digitalDeviceComponents_SkillGroup_Data } from './digitalDeviceComponents/digitalDeviceComponents.data';
import { memoryAndStorage_SkillGroup_Data } from './memoryAndStorage/memoryAndStorage.data';
import { networkModelsAndProtocols_SkillGroup_Data } from './networkModelsAndProtocols/networkModelsAndProtocols.data';
import { networks_SkillGroup_Data } from './networks/networks.data';
import { numeralSystems_SkillGroup_Data } from './numeralSystems/numeralSystems.data';
import { operatingSystems_SkillGroup_Data } from './operatingSystems/operatingSystems.data';
import { representationAndStorage_SkillGroup_Data } from './representationAndStorage/representationAndStorage.data';
import { taskExecution_SkillGroup_Data } from './taskExecution/taskExecution.data';

export const digitalSystemsAndNetworks_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'digitalSystemsAndNetworks',
  id: 'c57456de-291c-4b19-bd67-bccbcf9bbaa7',
  name: {
    en: 'Digital Systems and Networks',
    zh: '数字系统与网络',
    hi: 'डिजिटल प्रणालियाँ और नेटवर्क',
    es: 'Sistemas digitales y redes',
    ar: 'الأنظمة الرقمية والشبكات',
    fr: 'Systèmes numériques et réseaux',
    bn: 'ডিজিটাল ব্যবস্থা ও নেটওয়ার্ক',
    pt: 'Sistemas digitais e redes',
    ur: 'ڈیجیٹل نظام اور نیٹ ورک',
    id: 'Sistem digital dan jaringan',
    de: 'Digitale Systeme und Netzwerke',
    ja: 'デジタルシステムとネットワーク',
    ko: '디지털 시스템과 네트워크',
    tr: 'Dijital sistemler ve ağlar',
    vi: 'Hệ thống số và mạng',
    ta: 'எண்ம அமைப்புகளும் வலையமைப்புகளும்',
    te: 'డిజిటల్ వ్యవస్థలు మరియు నెట్‌వర్క్‌లు',
    mr: 'डिजिटल प्रणाली आणि जाळी',
    ms: 'Sistem digital dan rangkaian',
    he: 'מערכות דיגיטליות ורשתות',
    pl: 'Systemy cyfrowe i sieci',
    uk: 'Цифрові системи та мережі',
    lt: 'Skaitmeninės sistemos ir tinklai',
    lv: 'Digitālās sistēmas un tīkli',
    et: 'Digitaalsüsteemid ja võrgud',
    be: 'Лічбавыя сыстэмы і сеткі',
    ka: 'ციფრული სისტემები და ქსელები',
    kk: 'Цифрлық жүйелер мен желілер',
    qm: 'Raqamlı sistemalar ve ağlar',
  },
  groups: {
    digitalDeviceComponents: digitalDeviceComponents_SkillGroup_Data,
    memoryAndStorage: memoryAndStorage_SkillGroup_Data,
    networkModelsAndProtocols: networkModelsAndProtocols_SkillGroup_Data,
    networks: networks_SkillGroup_Data,
    numeralSystems: numeralSystems_SkillGroup_Data,
    operatingSystems: operatingSystems_SkillGroup_Data,
    representationAndStorage: representationAndStorage_SkillGroup_Data,
    taskExecution: taskExecution_SkillGroup_Data,
  },
  description: {
    methodological:
      'Explains interactions among hardware, software, encoding methods, and communication channels. These competencies concern the operation of digital infrastructure, not merely the use of devices.',
    frontend: {
      en: 'Discover how computing devices, digital information and networks work together.',
      zh: '了解计算设备、数字信息和网络如何协同工作。',
      hi: 'जानें कि कंप्यूटिंग उपकरण, डिजिटल जानकारी और नेटवर्क मिलकर कैसे काम करते हैं।',
      es: 'Descubre cómo funcionan juntos los dispositivos informáticos, la información digital y las redes.',
      ar: 'اكتشف كيف تعمل أجهزة الحوسبة والمعلومات الرقمية والشبكات معًا.',
      fr: 'Découvre comment les appareils informatiques, les informations numériques et les réseaux fonctionnent ensemble.',
      bn: 'কম্পিউটিং যন্ত্র, ডিজিটাল তথ্য ও নেটওয়ার্ক কীভাবে একসঙ্গে কাজ করে জানো।',
      pt: 'Descubra como dispositivos de computação, informações digitais e redes funcionam juntos.',
      ur: 'جانیں کہ کمپیوٹنگ آلات، ڈیجیٹل معلومات اور نیٹ ورک مل کر کیسے کام کرتے ہیں۔',
      id: 'Pelajari bagaimana perangkat komputasi, informasi digital, dan jaringan bekerja bersama.',
      de: 'Entdecke, wie Computergeräte, digitale Informationen und Netzwerke zusammenarbeiten.',
      ja: 'コンピューター機器、デジタル情報、ネットワークがどう連携するか学ぼう。',
      ko: '컴퓨팅 기기, 디지털 정보, 네트워크가 어떻게 함께 작동하는지 알아보세요.',
      tr: 'Bilgi işlem cihazlarının, dijital bilgilerin ve ağların nasıl birlikte çalıştığını keşfet.',
      vi: 'Khám phá cách thiết bị tính toán, thông tin số và mạng hoạt động cùng nhau.',
      ta: 'கணினி சாதனங்கள், எண்மத் தகவல், வலையமைப்புகள் எவ்வாறு இணைந்து செயல்படுகின்றன என்பதை அறிந்துகொள்.',
      te: 'కంప్యూటింగ్ పరికరాలు, డిజిటల్ సమాచారం, నెట్‌వర్క్‌లు కలిసి ఎలా పనిచేస్తాయో తెలుసుకోండి.',
      mr: 'संगणकीय उपकरणे, डिजिटल माहिती आणि जाळी एकत्र कसे कार्य करतात ते जाणून घ्या.',
      ms: 'Terokai cara peranti pengkomputeran, maklumat digital dan rangkaian bekerjasama.',
      he: 'גלו כיצד התקני מחשוב, מידע דיגיטלי ורשתות פועלים יחד.',
      pl: 'Odkryj, jak urządzenia komputerowe, informacje cyfrowe i sieci współpracują ze sobą.',
      uk: 'Дізнайся, як обчислювальні пристрої, цифрова інформація й мережі працюють разом.',
      lt: 'Sužinok, kaip kompiuteriniai įrenginiai, skaitmeninė informacija ir tinklai veikia kartu.',
      lv: 'Uzzini, kā skaitļošanas ierīces, digitālā informācija un tīkli darbojas kopā.',
      et: 'Uuri, kuidas arvutusseadmed, digitaalne teave ja võrgud koos töötavad.',
      be: 'Даведайся, як вылічальныя прылады, лічбавая інфармацыя й сеткі працуюць разам.',
      ka: 'გაიგე, როგორ მუშაობენ ერთად გამოთვლითი მოწყობილობები, ციფრული ინფორმაცია და ქსელები.',
      kk: 'Есептеу құрылғылары, цифрлық ақпарат және желілер қалай бірге жұмыс істейтінін біл.',
      qm: 'Esaplav cihazları, raqamlı malümat ve ağlar bir yerde nasıl çalışqanını ögren.',
    },
  },
});
