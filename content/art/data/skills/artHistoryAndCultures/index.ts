import { defineSkillDomain } from '@svitlo/engine/build';

import { asianArtisticTraditions } from './asianArtisticTraditions';
import { culturalHeritage } from './culturalHeritage';
import { earlyImagesAndAntiquity } from './earlyImagesAndAntiquity';
import { historicalFilmMovements } from './historicalFilmMovements';
import { indigenousArtisticTraditionsOfTheAmericas } from './indigenousArtisticTraditionsOfTheAmericas';
import { lateModernAndContemporaryPractices } from './lateModernAndContemporaryPractices';
import { latinAmericanArtMovements } from './latinAmericanArtMovements';
import { medievalAndEarlyModernArts } from './medievalAndEarlyModernArts';
import { modernArtMovements } from './modernArtMovements';
import { oceaniaArtisticTraditions } from './oceaniaArtisticTraditions';
import { performingArtTraditions } from './performingArtTraditions';
import { socialContextAndExchange } from './socialContextAndExchange';
import { ukrainianArtisticTraditions } from './ukrainianArtisticTraditions';
import { westAndCentralAfricanTraditions } from './westAndCentralAfricanTraditions';

export const artHistoryAndCultures = defineSkillDomain({
  slug: 'artHistoryAndCultures',
  id: '08efb56e-fef3-43ba-8661-d47866a92834',
  title: {
    ar: 'تاريخ الفن والثقافات',
    be: 'Гісторыя мастацтва і культуры',
    bn: 'শিল্পের ইতিহাস ও সংস্কৃতি',
    de: 'Kunstgeschichte und Kulturen',
    en: 'Art History and Cultures',
    es: 'Historia del arte y culturas',
    et: 'Kunstiajalugu ja kultuurid',
    fr: 'Histoire de l’art et cultures',
    he: 'תולדות האמנות והתרבויות',
    hi: 'कला इतिहास और संस्कृतियाँ',
    id: 'Sejarah Seni dan Budaya',
    it: "Storia dell'arte e culture",
    ja: '美術史と文化',
    ka: 'ხელოვნების ისტორია და კულტურები',
    kk: 'Öner tarihy men mädenietter',
    ko: '미술사와 문화',
    lt: 'Meno istorija ir kultūros',
    lv: 'Mākslas vēsture un kultūras',
    mr: 'कला इतिहास आणि संस्कृती',
    ms: 'Sejarah Seni dan Budaya',
    pl: 'Historia sztuki i kultury',
    pt: 'História da arte e culturas',
    qm: 'Sanat tarihı ve medeniyetler',
    ta: 'கலை வரலாறும் பண்பாடுகளும்',
    te: 'కళా చరిత్ర మరియు సంస్కృతులు',
    tr: 'Sanat Tarihi ve Kültürler',
    uk: 'Історія мистецтва та культури',
    ur: 'فن اور ثقافتوں کی تاریخ',
    vi: 'Lịch sử nghệ thuật và văn hóa',
    zh: '艺术史与文化',
  },
  groups: {
    asianArtisticTraditions,
    culturalHeritage,
    earlyImagesAndAntiquity,
    historicalFilmMovements,
    indigenousArtisticTraditionsOfTheAmericas,
    lateModernAndContemporaryPractices,
    latinAmericanArtMovements,
    medievalAndEarlyModernArts,
    modernArtMovements,
    oceaniaArtisticTraditions,
    performingArtTraditions,
    socialContextAndExchange,
    ukrainianArtisticTraditions,
    westAndCentralAfricanTraditions,
  },
  description: {
    methodological:
      'Artworks and artistic practices develop within particular communities, historical debates, patrons and material technologies. Study of art history distinguishes movements and named traditions through their own works and contexts rather than treating an entire continent or historical era as a single skill. This domain examines art-historical interpretation, not general political chronology.',
    frontend: {
      ar: 'استكشف كيف تعكس الأعمال الفنية أماكن ومجتمعات وفترات ونقاشات فنية محددة.',
      be: 'Даследуйце, як творы мастацтва адлюстроўваюць пэўныя месцы, супольнасці, перыяды і мастацкія дыскусіі.',
      bn: 'জানুন কীভাবে শিল্পকর্ম নির্দিষ্ট স্থান, সম্প্রদায়, সময়কাল ও শিল্পবিষয়ক বিতর্ককে প্রতিফলিত করে।',
      de: 'Entdecke, wie Kunstwerke bestimmte Orte, Gemeinschaften, Epochen und Kunstdiskurse widerspiegeln.',
      en: 'Explore how works of art reflect particular places, communities, periods and artistic debates.',
      es: 'Explora cómo las obras de arte reflejan lugares, comunidades, épocas y debates artísticos concretos.',
      et: 'Uuri, kuidas kunstiteosed peegeldavad kindlaid paiku, kogukondi, ajastuid ja kunstialaseid arutelusid.',
      fr: 'Découvrez comment les œuvres reflètent des lieux, des communautés, des périodes et des débats artistiques précis.',
      he: 'גלו כיצד יצירות אמנות משקפות מקומות, קהילות, תקופות ודיונים אמנותיים מסוימים.',
      hi: 'जानें कि कलाकृतियाँ विशिष्ट स्थानों, समुदायों, कालखंडों और कलात्मक बहसों को कैसे दर्शाती हैं।',
      id: 'Jelajahi bagaimana karya seni mencerminkan tempat, komunitas, periode, dan perdebatan seni tertentu.',
      it: "Esplora come le opere d'arte riflettono luoghi, comunità, epoche e dibattiti artistici specifici.",
      ja: '美術作品が特定の場所、共同体、時代、芸術的議論をどのように反映するかを探ります。',
      ka: 'შეისწავლეთ, როგორ ასახავს ხელოვნების ნიმუშები კონკრეტულ ადგილებს, თემებს, პერიოდებსა და მხატვრულ დისკუსიებს.',
      kk: 'Öner tuyndylarynyñ naqty oryndardy, qauymdastyqtardy, kezeñder men öner pıkırtalastaryn qalai beineleitının zertteñız.',
      ko: '미술 작품이 특정 장소, 공동체, 시대, 예술적 논쟁을 어떻게 반영하는지 살펴보세요.',
      lt: 'Tyrinėkite, kaip meno kūriniai atspindi konkrečias vietas, bendruomenes, laikotarpius ir meno diskusijas.',
      lv: 'Izpētiet, kā mākslas darbi atspoguļo konkrētas vietas, kopienas, laikmetus un mākslas diskusijas.',
      mr: 'कलाकृती विशिष्ट ठिकाणे, समुदाय, कालखंड आणि कलाविषयक चर्चांचे प्रतिबिंब कशा दाखवतात ते जाणून घ्या.',
      ms: 'Terokai bagaimana karya seni mencerminkan tempat, komuniti, zaman dan perbahasan seni tertentu.',
      pl: 'Poznaj, jak dzieła sztuki odzwierciedlają konkretne miejsca, społeczności, epoki i debaty artystyczne.',
      pt: 'Explore como as obras de arte refletem lugares, comunidades, períodos e debates artísticos específicos.',
      qm: 'Sanat eserlerinin belirli yerleri, cemaatleri, devirleri ve sanat münakaşalarını nasıl aksettirdiğini keşfediñiz.',
      ta: 'கலைப்படைப்புகள் குறிப்பிட்ட இடங்கள், சமூகங்கள், காலகட்டங்கள் மற்றும் கலை விவாதங்களை எவ்வாறு பிரதிபலிக்கின்றன என்பதை ஆராயுங்கள்.',
      te: 'కళాకృతులు నిర్దిష్ట ప్రదేశాలు, సమాజాలు, కాలాలు, కళా చర్చలను ఎలా ప్రతిబింబిస్తాయో తెలుసుకోండి.',
      tr: 'Sanat eserlerinin belirli yerleri, toplulukları, dönemleri ve sanatsal tartışmaları nasıl yansıttığını keşfedin.',
      uk: 'Досліджуйте, як твори мистецтва відображають певні місця, спільноти, періоди й мистецькі дискусії.',
      ur: 'دریافت کریں کہ فن پارے مخصوص مقامات، برادریوں، ادوار اور فنّی مباحث کی عکاسی کیسے کرتے ہیں۔',
      vi: 'Khám phá cách tác phẩm nghệ thuật phản ánh những địa điểm, cộng đồng, thời kỳ và tranh luận nghệ thuật cụ thể.',
      zh: '探索艺术作品如何反映特定地点、社群、时代和艺术论争。',
    },
  },
});
