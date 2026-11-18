import { defineSkillGroup } from '@svitlo/engine/build';

import { distinguishContinentsFromPartsOfTheWorld } from './distinguishContinentsFromPartsOfTheWorld';
import { explainTheConceptOfAContinent } from './explainTheConceptOfAContinent';
import { explainTheConceptOfAnOcean } from './explainTheConceptOfAnOcean';
import { explainTheConceptOfAPartOfTheWorld } from './explainTheConceptOfAPartOfTheWorld';
import { identifyEarthsGeographicHemispheres } from './identifyEarthsGeographicHemispheres';
import { locateContinentsOnAGlobe } from './locateContinentsOnAGlobe';
import { locateOceansOnAGlobe } from './locateOceansOnAGlobe';
import { locatePartsOfTheWorldOnAGlobe } from './locatePartsOfTheWorldOnAGlobe';

export const globalGeographicDivisions = defineSkillGroup({
  slug: 'globalGeographicDivisions',
  id: '004a7690-25f5-49d8-9e8f-b05f4a220638',
  name: {
    ar: 'التقسيمات الجغرافية العالمية',
    be: 'Глябальны геаграфічны падзел',
    bn: 'বিশ্বের ভৌগোলিক বিভাগ',
    de: 'Globale geografische Gliederungen',
    en: 'Global Geographic Divisions',
    es: 'Divisiones geográficas mundiales',
    et: 'Maailma geograafilised jaotused',
    fr: 'Grandes divisions géographiques du monde',
    he: 'חלוקות גאוגרפיות עולמיות',
    hi: 'वैश्विक भौगोलिक विभाजन',
    id: 'Pembagian geografis global',
    it: 'Grandi suddivisioni geografiche della Terra',
    ja: '世界の地理区分',
    ka: 'მსოფლიოს გეოგრაფიული დაყოფა',
    kk: 'Jahandyq geografiialyq bölınıster',
    ko: '세계의 지리적 구분',
    lt: 'Pasaulio geografinis skirstymas',
    lv: 'Pasaules ģeogrāfiskais iedalījums',
    mr: 'जागतिक भौगोलिक विभाग',
    ms: 'Pembahagian geografi dunia',
    pl: 'Globalne podziały geograficzne',
    pt: 'Divisões geográficas globais',
    qm: 'Dünyanıñ coğrafiy bölünişleri',
    ta: 'உலகளாவிய புவியியல் பிரிவுகள்',
    te: 'ప్రపంచ భౌగోళిక విభాగాలు',
    tr: 'Küresel coğrafi bölümler',
    uk: 'Глобальний географічний поділ',
    ur: 'عالمی جغرافیائی تقسیمات',
    vi: 'Các phân chia địa lý toàn cầu',
    zh: '全球地理区划',
  },
  skills: {
    distinguishContinentsFromPartsOfTheWorld,
    explainTheConceptOfAContinent,
    explainTheConceptOfAnOcean,
    explainTheConceptOfAPartOfTheWorld,
    identifyEarthsGeographicHemispheres,
    locateContinentsOnAGlobe,
    locateOceansOnAGlobe,
    locatePartsOfTheWorldOnAGlobe,
  },
  description: {
    methodological:
      'Different conventions divide Earth into continental landmasses, historically and culturally recognized parts of the world, ocean basins and hemispheres. These systems answer different geographic questions and should not be collapsed into one supposedly universal continent count.',
    frontend: {
      ar: 'استكشف القارات ومناطق العالم والمحيطات وأنصاف الكرة الأرضية وفق اصطلاحات واضحة.',
      be: "Дасьледуй кантынэнты, часткі сьвету, акіяны і паўшар'і паводле выразных умоўнасьцяў.",
      bn: 'স্পষ্ট নিয়ম মেনে মহাদেশ, বিশ্বের অঞ্চল, মহাসাগর ও গোলার্ধগুলো জানো।',
      de: 'Erkunde Kontinente, Weltregionen, Ozeane und Hemisphären anhand klarer Einteilungen.',
      en: 'Explore continents, world regions, oceans and hemispheres using stated conventions.',
      es: 'Explora continentes, regiones del mundo, océanos y hemisferios según criterios expresos.',
      et: 'Uuri mandreid, maailma piirkondi, ookeane ja poolkerasid selgelt määratletud kokkulepete järgi.',
      fr: 'Explore les continents, les régions du monde, les océans et les hémisphères selon des conventions précises.',
      he: 'חקרו יבשות, אזורי עולם, אוקיינוסים וחצאי כדור לפי מוסכמות מוגדרות.',
      hi: 'स्पष्ट परंपराओं के अनुसार महाद्वीपों, विश्व क्षेत्रों, महासागरों और गोलार्धों को समझें।',
      id: 'Jelajahi benua, wilayah dunia, samudra, dan belahan Bumi menurut konvensi yang jelas.',
      it: 'Esplora continenti, parti del mondo, oceani ed emisferi secondo convenzioni esplicite.',
      ja: '明示された区分方法で大陸、世界の地域、海洋、半球を調べよう。',
      ka: 'გამოიკვლიე კონტინენტები, მსოფლიოს რეგიონები, ოკეანეები და ნახევარსფეროები განსაზღვრული წესებით.',
      kk: 'Qūrlyqtardy, älem aimaqtaryn, mūhittar men jartyşarlardy körsetılgen jıkteu erejelerıne sai zertte.',
      ko: '명확한 기준에 따라 대륙, 세계 지역, 대양, 반구를 알아보세요.',
      lt: 'Tyrinėk žemynus, pasaulio regionus, vandenynus ir pusrutulius pagal aiškias konvencijas.',
      lv: 'Izpēti kontinentus, pasaules reģionus, okeānus un puslodes pēc skaidriem nosacījumiem.',
      mr: 'स्पष्ट संकेतांनुसार खंड, जगाचे प्रदेश, महासागर आणि गोलार्ध अभ्यासा.',
      ms: 'Terokai benua, rantau dunia, lautan dan hemisfera mengikut kaedah yang jelas.',
      pl: 'Poznaj kontynenty, regiony świata, oceany i półkule zgodnie z podanymi konwencjami.',
      pt: 'Explore continentes, regiões do mundo, oceanos e hemisférios segundo convenções explícitas.',
      qm: "Qıtalar, dünya regionları, okeanlar ve yarım kürelerni belgili qa'idelerge köre ögren.",
      ta: 'தெளிவாகக் கூறப்பட்ட மரபுப்படி கண்டங்கள், உலகப் பகுதிகள், பெருங்கடல்கள், அரைக்கோளங்களை ஆராய்.',
      te: 'స్పష్టమైన సంప్రదాయాల ప్రకారం ఖండాలు, ప్రపంచ ప్రాంతాలు, మహాసముద్రాలు, అర్ధగోళాలను పరిశీలించండి.',
      tr: 'Belirtilen sınıflandırma kurallarına göre kıtaları, dünya bölgelerini, okyanusları ve yarımküreleri incele.',
      uk: 'Досліди материки, частини світу, океани й півкулі за чітко визначеними умовностями.',
      ur: 'واضح اصولوں کے مطابق براعظموں، عالمی خطوں، سمندروں اور نصف کروں کو جانیں۔',
      vi: 'Khám phá các lục địa, khu vực thế giới, đại dương và bán cầu theo quy ước nêu rõ.',
      zh: '按照明确的分类惯例探索大陆、世界地区、大洋与半球。',
    },
  },
});
