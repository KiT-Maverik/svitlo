import { defineSkillDomain } from '@svitlo/engine/build';

import { dictionaries_SkillGroup_Data } from './dictionaries/dictionaries.data';
import { graphs_SkillGroup_Data } from './graphs/graphs.data';
import { queue_SkillGroup_Data } from './queue/queue.data';
import { sequences_SkillGroup_Data } from './sequences/sequences.data';
import { sets_SkillGroup_Data } from './sets/sets.data';
import { stack_SkillGroup_Data } from './stack/stack.data';
import { structureSelection_SkillGroup_Data } from './structureSelection/structureSelection.data';
import { trees_SkillGroup_Data } from './trees/trees.data';

export const dataStructures_SkillDomain_Data = defineSkillDomain({
  slug: 'dataStructures',
  id: '5babb94d-b2d6-45b8-9ccf-c81e976de325',
  title: {
    en: 'Data Structures',
    zh: '数据结构',
    hi: 'डेटा संरचनाएँ',
    es: 'Estructuras de datos',
    ar: 'هياكل البيانات',
    fr: 'Structures de données',
    bn: 'ডেটা কাঠামো',
    pt: 'Estruturas de dados',
    ur: 'ڈیٹا کے ڈھانچے',
    id: 'Struktur Data',
    de: 'Datenstrukturen',
    ja: 'データ構造',
    ko: '자료 구조',
    tr: 'Veri Yapıları',
    vi: 'Cấu trúc dữ liệu',
    ta: 'தரவுக் கட்டமைப்புகள்',
    te: 'డేటా నిర్మాణాలు',
    mr: 'डेटा संरचना',
    ms: 'Struktur Data',
    he: 'מבני נתונים',
    pl: 'Struktury danych',
    uk: 'Структури даних',
    lt: 'Duomenų struktūros',
    lv: 'Datu struktūras',
    et: 'Andmestruktuurid',
    be: 'Структуры зьвестак',
    ka: 'მონაცემთა სტრუქტურები',
    kk: 'Деректер құрылымдары',
    qm: 'Malümat yapıları',
  },
  groups: [
    dictionaries_SkillGroup_Data,
    graphs_SkillGroup_Data,
    queue_SkillGroup_Data,
    sequences_SkillGroup_Data,
    sets_SkillGroup_Data,
    stack_SkillGroup_Data,
    structureSelection_SkillGroup_Data,
    trees_SkillGroup_Data,
  ],
  description: {
    methodological:
      'Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.',
    frontend: {
      en: 'Learn how collections, keys, trees and networks organize data for different operations.',
      zh: '了解集合、键、树和网络如何组织数据，以便执行不同的操作。',
      hi: 'जानें कि संग्रह, कुंजियाँ, वृक्ष और नेटवर्क अलग-अलग कार्यों के लिए डेटा को कैसे व्यवस्थित करते हैं।',
      es: 'Aprende cómo las colecciones, las claves, los árboles y las redes organizan los datos para distintas operaciones.',
      ar: 'تعرّف كيف تنظّم المجموعات والمفاتيح والأشجار والشبكات البيانات لتنفيذ عمليات مختلفة.',
      fr: 'Découvre comment les collections, les clés, les arbres et les réseaux organisent les données pour différentes opérations.',
      bn: 'বিভিন্ন কাজের জন্য সংগ্রহ, কী, ট্রি ও নেটওয়ার্ক কীভাবে ডেটা সাজায়, তা জানো।',
      pt: 'Aprenda como coleções, chaves, árvores e redes organizam dados para diferentes operações.',
      ur: 'جانیں کہ مجموعے، کلیدیں، درخت اور نیٹ ورک مختلف کارروائیوں کے لیے ڈیٹا کو کیسے منظم کرتے ہیں۔',
      id: 'Pelajari bagaimana koleksi, kunci, pohon, dan jaringan mengatur data untuk berbagai operasi.',
      de: 'Entdecke, wie Sammlungen, Schlüssel, Bäume und Netzwerke Daten für unterschiedliche Operationen organisieren.',
      ja: 'コレクション、キー、木構造、ネットワークが、さまざまな操作のためにデータをどう整理するか学びましょう。',
      ko: '컬렉션, 키, 트리와 네트워크가 다양한 작업에 맞게 데이터를 어떻게 구성하는지 알아보세요.',
      tr: 'Koleksiyonların, anahtarların, ağaçların ve ağların farklı işlemler için verileri nasıl düzenlediğini öğren.',
      vi: 'Tìm hiểu cách tập hợp, khóa, cây và mạng tổ chức dữ liệu cho các thao tác khác nhau.',
      ta: 'தொகுப்புகள், திறவுகோல்கள், மரங்கள், வலைப்பின்னல்கள் ஆகியவை வெவ்வேறு செயல்களுக்காகத் தரவை எவ்வாறு ஒழுங்கமைக்கின்றன என்பதை அறிந்துகொள்.',
      te: 'వివిధ కార్యకలాపాల కోసం సేకరణలు, కీలు, వృక్షాలు, నెట్‌వర్క్‌లు డేటాను ఎలా క్రమబద్ధీకరిస్తాయో తెలుసుకోండి.',
      mr: 'संग्रह, किल्ल्या, वृक्ष आणि जाळी वेगवेगळ्या क्रियांसाठी डेटा कसा मांडतात ते जाणून घे.',
      ms: 'Ketahui bagaimana koleksi, kekunci, pokok dan rangkaian menyusun data untuk operasi yang berbeza.',
      he: 'גלו כיצד אוספים, מפתחות, עצים ורשתות מארגנים נתונים לצורך פעולות שונות.',
      pl: 'Dowiedz się, jak kolekcje, klucze, drzewa i sieci porządkują dane na potrzeby różnych operacji.',
      uk: 'Дізнайся, як колекції, ключі, дерева та мережі впорядковують дані для різних операцій.',
      lt: 'Sužinok, kaip rinkiniai, raktai, medžiai ir tinklai tvarko duomenis įvairioms operacijoms.',
      lv: 'Uzzini, kā kolekcijas, atslēgas, koki un tīkli organizē datus dažādām darbībām.',
      et: 'Õpi, kuidas kogumid, võtmed, puud ja võrgud korraldavad andmeid erinevate toimingute jaoks.',
      be: 'Даведайся, як калекцыі, ключы, дрэвы і сеткі ўпарадкоўваюць зьвесткі для розных апэрацыяў.',
      ka: 'გაიგე, როგორ აწყობენ კოლექციები, გასაღებები, ხეები და ქსელები მონაცემებს სხვადასხვა ოპერაციისთვის.',
      kk: 'Жинақтар, кілттер, ағаштар мен желілер әртүрлі әрекеттер үшін деректерді қалай ұйымдастыратынын біл.',
      qm: 'Toplamlar, anahtarlar, terekler ve şebekeler çeşit ameller içün malümatnı nasıl tertip etkenini ögren.',
    },
  },
});
