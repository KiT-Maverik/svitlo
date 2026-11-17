import { defineSkillGroup } from '@svitlo/engine/build';

import { analyzeConstructivism } from './analyzeConstructivism';
import { analyzeCubism } from './analyzeCubism';
import { analyzeGermanExpressionistPainting } from './analyzeGermanExpressionistPainting';
import { analyzeImpressionism } from './analyzeImpressionism';
import { analyzePostImpressionism } from './analyzePostImpressionism';
import { analyzeRealistPainting } from './analyzeRealistPainting';
import { analyzeRomanticPainting } from './analyzeRomanticPainting';
import { analyzeSurrealism } from './analyzeSurrealism';

export const modernArtMovements = defineSkillGroup({
  slug: 'modernArtMovements',
  id: 'f39c14cf-8aa4-448c-b0ed-b5e60f78d161',
  name: {
    ar: 'حركات الفن الحديث',
    be: 'Мастацкія плыні мадэрнізму',
    bn: 'আধুনিক শিল্প আন্দোলন',
    de: 'Moderne Kunstbewegungen',
    en: 'Modern Art Movements',
    es: 'Movimientos del arte moderno',
    et: 'Moodsa kunsti liikumised',
    fr: 'Mouvements de l’art moderne',
    he: 'תנועות אמנות מודרנית',
    hi: 'आधुनिक कला आंदोलन',
    id: 'Gerakan Seni Modern',
    it: "Movimenti dell'arte moderna",
    ja: '近代美術運動',
    ka: 'მოდერნისტული ხელოვნების მიმდინარეობები',
    kk: 'Modernistık öner qozğalystary',
    ko: '현대 미술 운동',
    lt: 'Moderniojo meno judėjimai',
    lv: 'Modernās mākslas kustības',
    mr: 'आधुनिक कला चळवळी',
    ms: 'Gerakan Seni Moden',
    pl: 'Nurty sztuki nowoczesnej',
    pt: 'Movimentos da arte moderna',
    qm: 'Modern sanat areketleri',
    ta: 'நவீனக் கலை இயக்கங்கள்',
    te: 'ఆధునిక కళా ఉద్యమాలు',
    tr: 'Modern Sanat Akımları',
    uk: 'Мистецькі напрями модернізму',
    ur: 'جدید آرٹ کی تحریکیں',
    vi: 'Các trào lưu nghệ thuật hiện đại',
    zh: '现代艺术运动',
  },
  skills: {
    analyzeConstructivism,
    analyzeCubism,
    analyzeGermanExpressionistPainting,
    analyzeImpressionism,
    analyzePostImpressionism,
    analyzeRealistPainting,
    analyzeRomanticPainting,
    analyzeSurrealism,
  },
  description: {
    methodological:
      'These named movements generated differing responses to social modernity and established visual conventions. Mastery of one movement does not imply mastery of its neighbors.',
    frontend: {
      ar: 'اكتشف كيف تحدّت الحركات الفنية الحديثة الأعراف الفنية المألوفة.',
      be: 'Даследуйце, як мастацкія плыні мадэрнізму аспрэчвалі звыклыя мастацкія нормы.',
      bn: 'আধুনিক শিল্প আন্দোলন কীভাবে প্রচলিত শিল্পরীতিকে চ্যালেঞ্জ করেছে তা জানুন।',
      de: 'Entdecke, wie moderne Kunstbewegungen vertraute künstlerische Konventionen infrage stellten.',
      en: 'Explore how different modern art movements challenged familiar artistic conventions.',
      es: 'Descubre cómo distintos movimientos modernos desafiaron las convenciones artísticas conocidas.',
      et: 'Uuri, kuidas moodsa kunsti liikumised seadsid kahtluse alla väljakujunenud kunstinormid.',
      fr: 'Découvrez comment les mouvements modernes ont remis en question les conventions artistiques établies.',
      he: 'גלו כיצד תנועות אמנות מודרניות ערערו על מוסכמות אמנותיות מוכרות.',
      hi: 'जानें कि आधुनिक कला आंदोलनों ने प्रचलित कलात्मक परंपराओं को कैसे चुनौती दी।',
      id: 'Pelajari bagaimana gerakan seni modern menantang konvensi artistik yang sudah dikenal.',
      it: 'Esplora come diversi movimenti artistici moderni hanno messo in discussione le convenzioni artistiche tradizionali.',
      ja: '近代美術の諸運動が既存の芸術慣習にどう挑んだかを探ります。',
      ka: 'გაიგეთ, როგორ უპირისპირდებოდა თანამედროვე ხელოვნების მოძრაობები დამკვიდრებულ მხატვრულ წესებს.',
      kk: 'Modernistık öner qozğalystary qalyptasqan körkemdık qağidalarğa qalai qarsy şyqqanyn zertteñız.',
      ko: '여러 현대 미술 운동이 익숙한 예술 관습에 어떻게 도전했는지 살펴봅니다.',
      lt: 'Sužinokite, kaip moderniojo meno judėjimai metė iššūkį įprastoms meno konvencijoms.',
      lv: 'Uzziniet, kā modernās mākslas kustības apstrīdēja ierastās mākslas konvencijas.',
      mr: 'आधुनिक कला चळवळींनी प्रस्थापित कलात्मक संकेतांना कसे आव्हान दिले ते पाहा.',
      ms: 'Ketahui bagaimana gerakan seni moden mencabar kebiasaan seni yang telah mantap.',
      pl: 'Odkryj, jak nowoczesne ruchy artystyczne podważały utrwalone konwencje sztuki.',
      pt: 'Descubra como diferentes movimentos modernos desafiaram convenções artísticas estabelecidas.',
      qm: 'Modern sanat areketleriniñ yerleşken sanat kaidelerine nasıl meydan oquğanını ögreniñiz.',
      ta: 'நவீனக் கலை இயக்கங்கள் வழக்கமான கலை மரபுகளை எவ்வாறு சவால் செய்தன என்பதை அறியுங்கள்.',
      te: 'ఆధునిక కళా ఉద్యమాలు సుపరిచిత కళా సంప్రదాయాలను ఎలా సవాలు చేశాయో తెలుసుకోండి.',
      tr: 'Modern sanat akımlarının yerleşik sanatsal geleneklere nasıl meydan okuduğunu keşfedin.',
      uk: 'Досліджуйте, як мистецькі напрями модернізму кидали виклик усталеним художнім нормам.',
      ur: 'جانیں کہ جدید فن کی مختلف تحریکوں نے مانوس فنّی اصولوں کو کیسے چیلنج کیا۔',
      vi: 'Tìm hiểu cách các trào lưu nghệ thuật hiện đại thách thức những quy ước quen thuộc.',
      zh: '探索不同现代艺术运动如何挑战熟悉的艺术惯例。',
    },
  },
});
