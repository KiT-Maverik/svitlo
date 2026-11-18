import { defineSkillDomain } from '@svitlo/engine/build';

import { dictionaries } from './dictionaries';
import { graphs } from './graphs';
import { queue } from './queue';
import { sequences } from './sequences';
import { sets } from './sets';
import { stack } from './stack';
import { structureSelection } from './structureSelection';
import { trees } from './trees';

export const dataStructures = defineSkillDomain({
  slug: 'dataStructures',
  id: '5babb94d-b2d6-45b8-9ccf-c81e976de325',
  title: {
    ar: 'هياكل البيانات',
    be: 'Структуры зьвестак',
    bn: 'ডেটা কাঠামো',
    de: 'Datenstrukturen',
    en: 'Data Structures',
    es: 'Estructuras de datos',
    et: 'Andmestruktuurid',
    fr: 'Structures de données',
    he: 'מבני נתונים',
    hi: 'डेटा संरचनाएँ',
    id: 'Struktur Data',
    it: 'Strutture dati',
    ja: 'データ構造',
    ka: 'მონაცემთა სტრუქტურები',
    kk: 'Derekter qūrylymdary',
    ko: '자료 구조',
    lt: 'Duomenų struktūros',
    lv: 'Datu struktūras',
    mr: 'डेटा संरचना',
    ms: 'Struktur Data',
    pl: 'Struktury danych',
    pt: 'Estruturas de dados',
    qm: 'Malümat yapıları',
    ta: 'தரவுக் கட்டமைப்புகள்',
    te: 'డేటా నిర్మాణాలు',
    tr: 'Veri Yapıları',
    uk: 'Структури даних',
    ur: 'ڈیٹا کے ڈھانچے',
    vi: 'Cấu trúc dữ liệu',
    zh: '数据结构',
  },
  groups: {
    dictionaries,
    graphs,
    queue,
    sequences,
    sets,
    stack,
    structureSelection,
    trees,
  },
  description: {
    methodological:
      'Organization of values in sequences, stacks, queues, dictionaries, sets, trees, and graphs, including access, modification, and selection of appropriate structures. A structure is not an algorithm for processing it.',
    frontend: {
      ar: 'تعرّف كيف تنظّم المجموعات والمفاتيح والأشجار والشبكات البيانات لتنفيذ عمليات مختلفة.',
      be: 'Даведайся, як калекцыі, ключы, дрэвы і сеткі ўпарадкоўваюць зьвесткі для розных апэрацыяў.',
      bn: 'বিভিন্ন কাজের জন্য সংগ্রহ, কী, ট্রি ও নেটওয়ার্ক কীভাবে ডেটা সাজায়, তা জানো।',
      de: 'Entdecke, wie Sammlungen, Schlüssel, Bäume und Netzwerke Daten für unterschiedliche Operationen organisieren.',
      en: 'Learn how collections, keys, trees and networks organize data for different operations.',
      es: 'Aprende cómo las colecciones, las claves, los árboles y las redes organizan los datos para distintas operaciones.',
      et: 'Õpi, kuidas kogumid, võtmed, puud ja võrgud korraldavad andmeid erinevate toimingute jaoks.',
      fr: 'Découvre comment les collections, les clés, les arbres et les réseaux organisent les données pour différentes opérations.',
      he: 'גלו כיצד אוספים, מפתחות, עצים ורשתות מארגנים נתונים לצורך פעולות שונות.',
      hi: 'जानें कि संग्रह, कुंजियाँ, वृक्ष और नेटवर्क अलग-अलग कार्यों के लिए डेटा को कैसे व्यवस्थित करते हैं।',
      id: 'Pelajari bagaimana koleksi, kunci, pohon, dan jaringan mengatur data untuk berbagai operasi.',
      it: 'Scopri come collezioni, chiavi, alberi e reti organizzano i dati per operazioni diverse.',
      ja: 'コレクション、キー、木構造、ネットワークが、さまざまな操作のためにデータをどう整理するか学びましょう。',
      ka: 'გაიგე, როგორ აწყობენ კოლექციები, გასაღებები, ხეები და ქსელები მონაცემებს სხვადასხვა ოპერაციისთვის.',
      kk: 'Jinaqtar, kıltter, ağaştar men jelıler ärtürlı äreketter üşın derekterdı qalai ūiymdastyratynyn bıl.',
      ko: '컬렉션, 키, 트리와 네트워크가 다양한 작업에 맞게 데이터를 어떻게 구성하는지 알아보세요.',
      lt: 'Sužinok, kaip rinkiniai, raktai, medžiai ir tinklai tvarko duomenis įvairioms operacijoms.',
      lv: 'Uzzini, kā kolekcijas, atslēgas, koki un tīkli organizē datus dažādām darbībām.',
      mr: 'संग्रह, किल्ल्या, वृक्ष आणि जाळी वेगवेगळ्या क्रियांसाठी डेटा कसा मांडतात ते जाणून घे.',
      ms: 'Ketahui bagaimana koleksi, kekunci, pokok dan rangkaian menyusun data untuk operasi yang berbeza.',
      pl: 'Dowiedz się, jak kolekcje, klucze, drzewa i sieci porządkują dane na potrzeby różnych operacji.',
      pt: 'Aprenda como coleções, chaves, árvores e redes organizam dados para diferentes operações.',
      qm: 'Toplamlar, anahtarlar, terekler ve şebekeler çeşit ameller içün malümatnı nasıl tertip etkenini ögren.',
      ta: 'தொகுப்புகள், திறவுகோல்கள், மரங்கள், வலைப்பின்னல்கள் ஆகியவை வெவ்வேறு செயல்களுக்காகத் தரவை எவ்வாறு ஒழுங்கமைக்கின்றன என்பதை அறிந்துகொள்.',
      te: 'వివిధ కార్యకలాపాల కోసం సేకరణలు, కీలు, వృక్షాలు, నెట్‌వర్క్‌లు డేటాను ఎలా క్రమబద్ధీకరిస్తాయో తెలుసుకోండి.',
      tr: 'Koleksiyonların, anahtarların, ağaçların ve ağların farklı işlemler için verileri nasıl düzenlediğini öğren.',
      uk: 'Дізнайся, як колекції, ключі, дерева та мережі впорядковують дані для різних операцій.',
      ur: 'جانیں کہ مجموعے، کلیدیں، درخت اور نیٹ ورک مختلف کارروائیوں کے لیے ڈیٹا کو کیسے منظم کرتے ہیں۔',
      vi: 'Tìm hiểu cách tập hợp, khóa, cây và mạng tổ chức dữ liệu cho các thao tác khác nhau.',
      zh: '了解集合、键、树和网络如何组织数据，以便执行不同的操作。',
    },
  },
});
