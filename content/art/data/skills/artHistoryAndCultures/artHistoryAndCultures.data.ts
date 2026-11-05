import { buildSkillDomainConfig } from '@svitlo/engine/taxonomy';

import { asianArtisticTraditions_SkillGroup_Data } from './asianArtisticTraditions/asianArtisticTraditions.data';
import { culturalHeritage_SkillGroup_Data } from './culturalHeritage/culturalHeritage.data';
import { earlyImagesAndAntiquity_SkillGroup_Data } from './earlyImagesAndAntiquity/earlyImagesAndAntiquity.data';
import { historicalFilmMovements_SkillGroup_Data } from './historicalFilmMovements/historicalFilmMovements.data';
import { indigenousArtisticTraditionsOfTheAmericas_SkillGroup_Data } from './indigenousArtisticTraditionsOfTheAmericas/indigenousArtisticTraditionsOfTheAmericas.data';
import { lateModernAndContemporaryPractices_SkillGroup_Data } from './lateModernAndContemporaryPractices/lateModernAndContemporaryPractices.data';
import { latinAmericanArtMovements_SkillGroup_Data } from './latinAmericanArtMovements/latinAmericanArtMovements.data';
import { medievalAndEarlyModernArts_SkillGroup_Data } from './medievalAndEarlyModernArts/medievalAndEarlyModernArts.data';
import { modernArtMovements_SkillGroup_Data } from './modernArtMovements/modernArtMovements.data';
import { oceaniaArtisticTraditions_SkillGroup_Data } from './oceaniaArtisticTraditions/oceaniaArtisticTraditions.data';
import { performingArtTraditions_SkillGroup_Data } from './performingArtTraditions/performingArtTraditions.data';
import { socialContextAndExchange_SkillGroup_Data } from './socialContextAndExchange/socialContextAndExchange.data';
import { ukrainianArtisticTraditions_SkillGroup_Data } from './ukrainianArtisticTraditions/ukrainianArtisticTraditions.data';
import { westAndCentralAfricanTraditions_SkillGroup_Data } from './westAndCentralAfricanTraditions/westAndCentralAfricanTraditions.data';

export const artHistoryAndCultures_SkillDomain_Data = buildSkillDomainConfig({
  slug: 'artHistoryAndCultures',
  id: '08efb56e-fef3-43ba-8661-d47866a92834',
  name: {
    en: 'Art History and Cultures',
    zh: '艺术史与文化',
    hi: 'कला इतिहास और संस्कृतियाँ',
    es: 'Historia del arte y culturas',
    ar: 'تاريخ الفن والثقافات',
    fr: 'Histoire de l’art et cultures',
    bn: 'শিল্পের ইতিহাস ও সংস্কৃতি',
    pt: 'História da arte e culturas',
    ur: 'فن اور ثقافتوں کی تاریخ',
    id: 'Sejarah Seni dan Budaya',
    de: 'Kunstgeschichte und Kulturen',
    ja: '美術史と文化',
    ko: '미술사와 문화',
    tr: 'Sanat Tarihi ve Kültürler',
    vi: 'Lịch sử nghệ thuật và văn hóa',
    ta: 'கலை வரலாறும் பண்பாடுகளும்',
    te: 'కళా చరిత్ర మరియు సంస్కృతులు',
    mr: 'कला इतिहास आणि संस्कृती',
    ms: 'Sejarah Seni dan Budaya',
    he: 'תולדות האמנות והתרבויות',
    pl: 'Historia sztuki i kultury',
    uk: 'Історія мистецтва та культури',
    lt: 'Meno istorija ir kultūros',
    lv: 'Mākslas vēsture un kultūras',
    et: 'Kunstiajalugu ja kultuurid',
    be: 'Гісторыя мастацтва і культуры',
    ka: 'ხელოვნების ისტორია და კულტურები',
    kk: 'Өнер тарихы мен мәдениеттер',
    qm: 'Sanat tarihı ve medeniyetler',
  },
  groups: {
    asianArtisticTraditions: asianArtisticTraditions_SkillGroup_Data,
    culturalHeritage: culturalHeritage_SkillGroup_Data,
    earlyImagesAndAntiquity: earlyImagesAndAntiquity_SkillGroup_Data,
    historicalFilmMovements: historicalFilmMovements_SkillGroup_Data,
    indigenousArtisticTraditionsOfTheAmericas: indigenousArtisticTraditionsOfTheAmericas_SkillGroup_Data,
    lateModernAndContemporaryPractices: lateModernAndContemporaryPractices_SkillGroup_Data,
    latinAmericanArtMovements: latinAmericanArtMovements_SkillGroup_Data,
    medievalAndEarlyModernArts: medievalAndEarlyModernArts_SkillGroup_Data,
    modernArtMovements: modernArtMovements_SkillGroup_Data,
    oceaniaArtisticTraditions: oceaniaArtisticTraditions_SkillGroup_Data,
    performingArtTraditions: performingArtTraditions_SkillGroup_Data,
    socialContextAndExchange: socialContextAndExchange_SkillGroup_Data,
    ukrainianArtisticTraditions: ukrainianArtisticTraditions_SkillGroup_Data,
    westAndCentralAfricanTraditions: westAndCentralAfricanTraditions_SkillGroup_Data,
  },
  description: {
    methodological:
      'Artworks and artistic practices develop within particular communities, historical debates, patrons and material technologies. Study of art history distinguishes movements and named traditions through their own works and contexts rather than treating an entire continent or historical era as a single skill. This domain examines art-historical interpretation, not general political chronology.',
    frontend: {
      en: 'Explore how works of art reflect particular places, communities, periods and artistic debates.',
      zh: '探索艺术作品如何反映特定地点、社群、时代和艺术论争。',
      hi: 'जानें कि कलाकृतियाँ विशिष्ट स्थानों, समुदायों, कालखंडों और कलात्मक बहसों को कैसे दर्शाती हैं।',
      es: 'Explora cómo las obras de arte reflejan lugares, comunidades, épocas y debates artísticos concretos.',
      ar: 'استكشف كيف تعكس الأعمال الفنية أماكن ومجتمعات وفترات ونقاشات فنية محددة.',
      fr: 'Découvrez comment les œuvres reflètent des lieux, des communautés, des périodes et des débats artistiques précis.',
      bn: 'জানুন কীভাবে শিল্পকর্ম নির্দিষ্ট স্থান, সম্প্রদায়, সময়কাল ও শিল্পবিষয়ক বিতর্ককে প্রতিফলিত করে।',
      pt: 'Explore como as obras de arte refletem lugares, comunidades, períodos e debates artísticos específicos.',
      ur: 'دریافت کریں کہ فن پارے مخصوص مقامات، برادریوں، ادوار اور فنّی مباحث کی عکاسی کیسے کرتے ہیں۔',
      id: 'Jelajahi bagaimana karya seni mencerminkan tempat, komunitas, periode, dan perdebatan seni tertentu.',
      de: 'Entdecke, wie Kunstwerke bestimmte Orte, Gemeinschaften, Epochen und Kunstdiskurse widerspiegeln.',
      ja: '美術作品が特定の場所、共同体、時代、芸術的議論をどのように反映するかを探ります。',
      ko: '미술 작품이 특정 장소, 공동체, 시대, 예술적 논쟁을 어떻게 반영하는지 살펴보세요.',
      tr: 'Sanat eserlerinin belirli yerleri, toplulukları, dönemleri ve sanatsal tartışmaları nasıl yansıttığını keşfedin.',
      vi: 'Khám phá cách tác phẩm nghệ thuật phản ánh những địa điểm, cộng đồng, thời kỳ và tranh luận nghệ thuật cụ thể.',
      ta: 'கலைப்படைப்புகள் குறிப்பிட்ட இடங்கள், சமூகங்கள், காலகட்டங்கள் மற்றும் கலை விவாதங்களை எவ்வாறு பிரதிபலிக்கின்றன என்பதை ஆராயுங்கள்.',
      te: 'కళాకృతులు నిర్దిష్ట ప్రదేశాలు, సమాజాలు, కాలాలు, కళా చర్చలను ఎలా ప్రతిబింబిస్తాయో తెలుసుకోండి.',
      mr: 'कलाकृती विशिष्ट ठिकाणे, समुदाय, कालखंड आणि कलाविषयक चर्चांचे प्रतिबिंब कशा दाखवतात ते जाणून घ्या.',
      ms: 'Terokai bagaimana karya seni mencerminkan tempat, komuniti, zaman dan perbahasan seni tertentu.',
      he: 'גלו כיצד יצירות אמנות משקפות מקומות, קהילות, תקופות ודיונים אמנותיים מסוימים.',
      pl: 'Poznaj, jak dzieła sztuki odzwierciedlają konkretne miejsca, społeczności, epoki i debaty artystyczne.',
      uk: 'Досліджуйте, як твори мистецтва відображають певні місця, спільноти, періоди й мистецькі дискусії.',
      lt: 'Tyrinėkite, kaip meno kūriniai atspindi konkrečias vietas, bendruomenes, laikotarpius ir meno diskusijas.',
      lv: 'Izpētiet, kā mākslas darbi atspoguļo konkrētas vietas, kopienas, laikmetus un mākslas diskusijas.',
      et: 'Uuri, kuidas kunstiteosed peegeldavad kindlaid paiku, kogukondi, ajastuid ja kunstialaseid arutelusid.',
      be: 'Даследуйце, як творы мастацтва адлюстроўваюць пэўныя месцы, супольнасці, перыяды і мастацкія дыскусіі.',
      ka: 'შეისწავლეთ, როგორ ასახავს ხელოვნების ნიმუშები კონკრეტულ ადგილებს, თემებს, პერიოდებსა და მხატვრულ დისკუსიებს.',
      kk: 'Өнер туындыларының нақты орындарды, қауымдастықтарды, кезеңдер мен өнер пікірталастарын қалай бейнелейтінін зерттеңіз.',
      qm: 'Sanat eserlerinin belirli yerleri, cemaatleri, devirleri ve sanat münakaşalarını nasıl aksettirdiğini keşfediñiz.',
    },
  },
});
